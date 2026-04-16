/**
 * Wires Copilot session event listeners to:
 *   - stderr progress log + job log file
 *   - quota cache (on every `assistant.usage`)
 *   - a completion signal resolving on `session.task_complete` or timeout
 *   - a shutdown-capture promise resolving on `session.shutdown`
 *
 * The caller (src/commands/implement.ts) awaits these promises to drive the
 * implementation lifecycle, then assembles the final stdout envelope.
 */

import type { CopilotSession, SessionEvent } from '@github/copilot-sdk';
import { recordSnapshot } from './quota.js';

export interface AttachOptions {
  session: CopilotSession;
  stateDir: string;
  /** Job log writer — called for every significant event. */
  appendLog: (message: string) => void;
  /** Stderr progress writer for foreground runs; no-op for background jobs. */
  progress: (message: string) => void;
}

export interface AttachedStream {
  /** Last `assistant.message` content seen. Fallback summary if task_complete.summary is empty. */
  getLastAssistantMessage: () => string | undefined;
  /** Resolves when `session.task_complete` fires. Rejects on `session.error`. */
  completion: Promise<TaskCompletion>;
  /** Resolves when `session.shutdown` fires (may happen only after disconnect). */
  shutdown: Promise<SessionShutdown>;
  /** Detach all listeners. */
  dispose: () => void;
}

export interface TaskCompletion {
  summary?: string;
  success?: boolean;
}

export interface SessionShutdown {
  shutdownType: 'routine' | 'error';
  errorReason?: string;
  totalPremiumRequests: number;
  codeChanges: {
    linesAdded: number;
    linesRemoved: number;
    filesModified: string[];
  };
  currentModel?: string;
}

function truncate(text: string, max: number): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

export function attachStream(opts: AttachOptions): AttachedStream {
  const { session, stateDir, appendLog, progress } = opts;

  let lastAssistantMessage: string | undefined;

  let resolveCompletion!: (value: TaskCompletion) => void;
  let rejectCompletion!: (err: Error) => void;
  const completion = new Promise<TaskCompletion>((res, rej) => {
    resolveCompletion = res;
    rejectCompletion = rej;
  });

  let resolveShutdown!: (value: SessionShutdown) => void;
  const shutdown = new Promise<SessionShutdown>((res) => {
    resolveShutdown = res;
  });

  const unsubscribers: Array<() => void> = [];

  const handler = (event: SessionEvent): void => {
    switch (event.type) {
      case 'assistant.message': {
        const content = event.data.content ?? '';
        if (content) {
          lastAssistantMessage = content;
          progress(`[assistant] ${truncate(content, 160)}`);
          appendLog(`assistant.message: ${truncate(content, 400)}`);
        }
        break;
      }

      case 'assistant.usage': {
        const snapshots = event.data.quotaSnapshots;
        if (snapshots) {
          recordSnapshot(stateDir, snapshots);
          const keys = Object.keys(snapshots);
          for (const k of keys) {
            const q = snapshots[k]!;
            const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
            progress(`[quota:${k}] ${remaining}/${q.entitlementRequests} remaining (${(q.remainingPercentage * 100).toFixed(1)}%)`);
          }
        }
        const reqId = event.data.providerCallId ?? event.data.apiCallId;
        appendLog(`assistant.usage model=${event.data.model}${reqId ? ` request=${reqId}` : ''}`);
        break;
      }

      case 'session.task_complete': {
        appendLog(`session.task_complete success=${event.data.success ?? 'unknown'}`);
        progress(`[task_complete] ${event.data.success === false ? 'failed' : 'ok'}`);
        resolveCompletion({ summary: event.data.summary, success: event.data.success });
        break;
      }

      case 'session.shutdown': {
        const d = event.data;
        appendLog(
          `session.shutdown type=${d.shutdownType} premium=${d.totalPremiumRequests} files=${d.codeChanges.filesModified.length} +${d.codeChanges.linesAdded}/-${d.codeChanges.linesRemoved}`,
        );
        resolveShutdown({
          shutdownType: d.shutdownType,
          errorReason: d.errorReason,
          totalPremiumRequests: d.totalPremiumRequests,
          codeChanges: {
            linesAdded: d.codeChanges.linesAdded,
            linesRemoved: d.codeChanges.linesRemoved,
            filesModified: [...d.codeChanges.filesModified],
          },
          currentModel: d.currentModel,
        });
        break;
      }

      case 'session.error': {
        const msg = event.data.message ?? 'unknown session error';
        appendLog(`session.error: ${msg}`);
        progress(`[error] ${msg}`);
        rejectCompletion(new Error(msg));
        break;
      }

      case 'session.warning': {
        const msg = event.data.message ?? '';
        if (msg) {
          appendLog(`session.warning: ${msg}`);
          progress(`[warning] ${truncate(msg, 160)}`);
        }
        break;
      }

      case 'session.info': {
        const msg = event.data.message ?? '';
        if (msg) {
          appendLog(`session.info: ${truncate(msg, 200)}`);
        }
        break;
      }

      case 'session.compaction_start': {
        appendLog('session.compaction_start');
        progress('[compaction] started');
        break;
      }

      case 'session.compaction_complete': {
        appendLog('session.compaction_complete');
        progress('[compaction] complete');
        break;
      }

      case 'tool.execution_start': {
        const toolName = (event.data as { toolName?: string }).toolName ?? 'unknown';
        appendLog(`tool.execution_start ${toolName}`);
        progress(`[tool] ${toolName} …`);
        break;
      }

      case 'tool.execution_complete': {
        const toolName = (event.data as { toolName?: string }).toolName ?? 'unknown';
        appendLog(`tool.execution_complete ${toolName}`);
        break;
      }

      case 'subagent.started': {
        const name = (event.data as { agentName?: string; name?: string }).agentName ?? (event.data as { name?: string }).name ?? 'subagent';
        appendLog(`subagent.started ${name}`);
        progress(`[subagent:${name}] started`);
        break;
      }

      case 'subagent.completed': {
        const name = (event.data as { agentName?: string; name?: string }).agentName ?? (event.data as { name?: string }).name ?? 'subagent';
        appendLog(`subagent.completed ${name}`);
        break;
      }

      case 'subagent.failed': {
        const name = (event.data as { agentName?: string; name?: string }).agentName ?? (event.data as { name?: string }).name ?? 'subagent';
        appendLog(`subagent.failed ${name}`);
        progress(`[subagent:${name}] failed`);
        break;
      }

      case 'permission.requested': {
        const req = event.data.permissionRequest;
        const kind = req.kind;
        if (kind === 'shell') {
          appendLog(`permission.requested shell: ${(req as { fullCommandText?: string }).fullCommandText ?? ''}`);
        } else if (kind === 'write') {
          appendLog(`permission.requested write: ${(req as { fileName?: string }).fileName ?? ''}`);
        } else if (kind === 'read') {
          appendLog(`permission.requested read: ${(req as { path?: string }).path ?? ''}`);
        } else if (kind === 'url') {
          appendLog(`permission.requested url: ${(req as { url?: string }).url ?? ''}`);
        } else {
          appendLog(`permission.requested ${kind}`);
        }
        break;
      }

      default:
        // Ignore other events (turn_start, streaming_delta, message_delta, etc.)
        break;
    }
  };

  const unsub = session.on(handler);
  unsubscribers.push(unsub);

  return {
    getLastAssistantMessage: () => lastAssistantMessage,
    completion,
    shutdown,
    dispose: () => {
      for (const u of unsubscribers) u();
    },
  };
}
