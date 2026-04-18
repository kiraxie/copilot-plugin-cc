/**
 * status command — shows quota + background job status.
 *
 * Adapted from the sibling gemini plugin. The key addition is a "## Copilot
 * Quota" block at the top of the default listing.
 */

import {
  resolveStateDir, listJobs, readJobFile, readLogTail, getSessionId,
  type JobRecord,
} from '../lib/state.js';
import { readSnapshot, summarize } from '../lib/quota.js';

export interface StatusOptions {
  jobId?: string;
  all?: boolean;
  json?: boolean;
}

export async function runStatus(cwd: string, options: StatusOptions = {}): Promise<void> {
  const stateDir = resolveStateDir(cwd);
  const sessionId = options.all ? undefined : getSessionId();

  if (options.jobId) {
    const job = readJobFile(stateDir, options.jobId);
    if (!job) {
      console.error(`Job not found: ${options.jobId}`);
      process.exit(1);
    }
    if (options.json) {
      console.log(JSON.stringify(job, null, 2));
      return;
    }
    const logTail = readLogTail(stateDir, job.id, 15);
    console.log(renderJobDetail(job, logTail));
    return;
  }

  const jobs = listJobs(stateDir, sessionId);
  const snapshot = readSnapshot(stateDir);
  const quota = summarize(snapshot);

  if (options.json) {
    console.log(JSON.stringify({ quota, jobs }, null, 2));
    return;
  }

  const sections: string[] = [];

  sections.push(renderQuotaBlock(snapshot !== null, quota));

  const running = jobs.filter((j) => j.status === 'queued' || j.status === 'running');
  const finished = jobs.filter((j) => j.status === 'completed' || j.status === 'failed');

  if (running.length > 0) {
    const rows: string[] = ['## Running'];
    for (const job of running) {
      const logTail = readLogTail(stateDir, job.id, 3);
      const lastLine = logTail[logTail.length - 1] ?? '';
      rows.push(`- **${job.id}** \`${job.kind}\` — ${job.summary} [${job.status}] ${lastLine}`);
    }
    sections.push(rows.join('\n'));
  }

  if (finished.length > 0) {
    const rows: string[] = ['## Recent'];
    for (const job of finished.slice(0, 10)) {
      const icon = job.status === 'completed' ? '✓' : '✗';
      rows.push(`- ${icon} **${job.id}** \`${job.kind}\` — ${job.summary} [${job.status}]`);
    }
    sections.push(rows.join('\n'));
  }

  if (running.length === 0 && finished.length === 0) {
    sections.push('_No background jobs._');
  }

  console.log(sections.join('\n\n'));
}

function renderQuotaBlock(haveSnapshot: boolean, q: ReturnType<typeof summarize>): string {
  const lines: string[] = ['## Copilot Quota'];
  if (!haveSnapshot) {
    lines.push('- No snapshot yet. One will be captured on the next `implement` run.');
    return lines.join('\n');
  }
  if (q.unlimited) {
    lines.push('- Unlimited entitlement.');
    return lines.join('\n');
  }
  const pct = typeof q.percentage === 'number' ? `${q.percentage.toFixed(1)}%` : '?';
  lines.push(`- ${q.premium ?? '?'} premium request(s) remaining (${pct})`);
  if (q.resetAt) lines.push(`- Resets at ${q.resetAt}`);
  return lines.join('\n');
}

function renderJobDetail(job: JobRecord, logTail: string[]): string {
  const sections: string[] = [];
  sections.push(`## Job: ${job.id}`);
  sections.push(`**Kind:** ${job.kind}`);
  sections.push(`**Status:** ${job.status}`);
  sections.push(`**Phase:** ${job.phase}`);
  sections.push(`**Summary:** ${job.summary}`);
  sections.push(`**Created:** ${job.createdAt}`);
  if (job.startedAt) sections.push(`**Started:** ${job.startedAt}`);
  if (job.completedAt) sections.push(`**Completed:** ${job.completedAt}`);
  if (job.errorMessage) sections.push(`**Error:** ${job.errorMessage}`);

  if (logTail.length > 0) {
    sections.push('\n### Recent Log');
    sections.push('```');
    sections.push(logTail.join('\n'));
    sections.push('```');
  }

  return sections.join('\n');
}
