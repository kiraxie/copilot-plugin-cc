/**
 * Selective permission handler for the Copilot session.
 *
 * The plugin must be safe enough to be invoked proactively by Claude Code's
 * orchestrator, which means `approveAll` is not acceptable (shell execution
 * inside a worktree still runs with the user's privileges). We approve the
 * low-risk categories automatically and gate shell/url behind explicit flags.
 *
 * All requests — whether approved or denied — are logged so the reviewer can
 * see exactly what the agent tried to do.
 */

import type { PermissionHandler, PermissionRequest, PermissionRequestResult } from '@github/copilot-sdk';
import { resolve } from 'node:path';

export interface PermissionOptions {
  /** If true, permit Copilot to execute shell commands. */
  allowShell: boolean;
  /** If true, permit Copilot to fetch URLs. */
  allowUrl: boolean;
  /** Worktree path — write permissions are only auto-approved inside this directory. */
  worktreePath: string;
  /** Hook for logging every permission decision. */
  appendLog: (message: string) => void;
}

function approved(): PermissionRequestResult {
  return { kind: 'approved' };
}

function denied(feedback: string): PermissionRequestResult {
  return { kind: 'denied-interactively-by-user', feedback };
}

function isPathInside(child: string, parent: string): boolean {
  const c = resolve(child);
  const p = resolve(parent);
  return c === p || c.startsWith(p + '/');
}

export function makePermissionHandler(opts: PermissionOptions): PermissionHandler {
  return (request: PermissionRequest): PermissionRequestResult => {
    const kind = request.kind;

    switch (kind) {
      case 'read': {
        const path = (request as { path?: string }).path ?? '';
        opts.appendLog(`permission.read approved: ${path}`);
        return approved();
      }

      case 'write': {
        const fileName = (request as { fileName?: string }).fileName ?? '';
        if (!fileName) {
          opts.appendLog('permission.write denied: no fileName provided');
          return denied('Permission request missing fileName.');
        }
        const absolute = fileName.startsWith('/') ? fileName : resolve(opts.worktreePath, fileName);
        if (isPathInside(absolute, opts.worktreePath)) {
          opts.appendLog(`permission.write approved: ${fileName}`);
          return approved();
        }
        opts.appendLog(`permission.write denied (outside worktree): ${absolute}`);
        return denied(`Writes outside the worktree (${opts.worktreePath}) are not permitted by the Claude Code Copilot plugin.`);
      }

      case 'mcp': {
        const { serverName, toolName, readOnly } = request as {
          serverName?: string;
          toolName?: string;
          readOnly?: boolean;
        };
        opts.appendLog(`permission.mcp approved: ${serverName}/${toolName} (readOnly=${readOnly ?? false})`);
        return approved();
      }

      case 'shell': {
        const { fullCommandText, intention } = request as {
          fullCommandText?: string;
          intention?: string;
        };
        const preview = (fullCommandText ?? '').slice(0, 160);
        if (opts.allowShell) {
          opts.appendLog(`permission.shell approved: ${preview}${intention ? ` — ${intention}` : ''}`);
          return approved();
        }
        opts.appendLog(`permission.shell DENIED: ${preview}${intention ? ` — ${intention}` : ''}`);
        return denied('Shell execution is disabled for this Copilot session. Re-run the implement command with --allow-shell if you want to permit shell commands.');
      }

      case 'url': {
        const { url } = request as { url?: string };
        if (opts.allowUrl) {
          opts.appendLog(`permission.url approved: ${url}`);
          return approved();
        }
        opts.appendLog(`permission.url DENIED: ${url}`);
        return denied('URL fetching is disabled for this Copilot session. Re-run with --allow-url to permit it.');
      }

      case 'custom-tool': {
        const { toolName } = request as { toolName?: string };
        opts.appendLog(`permission.custom-tool DENIED: ${toolName}`);
        return denied(`Custom tool ${toolName} requires explicit user approval; not permitted in automated Copilot sessions.`);
      }

      default: {
        opts.appendLog(`permission.${kind} DENIED (unknown kind, conservative default)`);
        return denied(`Permission kind "${kind}" is not auto-approved by the Claude Code Copilot plugin.`);
      }
    }
  };
}
