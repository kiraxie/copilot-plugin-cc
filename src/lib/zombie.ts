/**
 * Zombie job sweeper.
 *
 * If a background worker dies without writing an exit status (process killed
 * with SIGKILL, OOM, host reboot, or a `process.exit` path that bypasses the
 * worker's catch handler), its state.json entry stays at `running`/`queued`
 * indefinitely. The exit handler installed by `runWorker` covers the common
 * `process.exit(nonzero)` path, but cannot help if the process was killed
 * abruptly.
 *
 * This sweeper is the last line of defense. It is called by `runStatus` and
 * `runResult` (read-only entrypoints) so any user-visible inspection of jobs
 * also reconciles stale state.
 */

import { statSync, existsSync } from 'node:fs';
import {
  jobLogPath, listJobs, updateJob, appendLog, type JobRecord,
} from './state.js';

/** A job is considered a zombie if its declared pid is dead AND no log
 *  activity has occurred for this many milliseconds. The grace period
 *  guards against transient races (process briefly suspended, pid wrap on
 *  long-uptime hosts, etc.). 60 seconds matches the worker's startup
 *  budget. */
const STALE_LOG_MS = 60_000;

/** Test whether a pid is still alive on the current host. */
function isProcessAlive(pid: number): boolean {
  try {
    // signal 0 == probe only; throws ESRCH if the process is gone.
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/** mtime in ms for `path`, or null if it does not exist or cannot be statted. */
function logMtimeMs(path: string): number | null {
  try {
    if (!existsSync(path)) return null;
    return statSync(path).mtimeMs;
  } catch {
    return null;
  }
}

/**
 * Decide whether a single job looks like a zombie. Exposed for testing /
 * future callers; `sweepZombieJobs` is the main entrypoint.
 */
export function isZombie(job: JobRecord, logFile: string, now: number = Date.now()): boolean {
  if (job.status !== 'running' && job.status !== 'queued') return false;
  // A worker without a recorded pid hasn't progressed past enqueue. Without a
  // pid we cannot probe liveness, so we fall back to log staleness alone.
  if (job.pid != null && isProcessAlive(job.pid)) return false;

  const mtime = logMtimeMs(logFile);
  if (mtime == null) {
    // No log file at all. Use createdAt/startedAt as the reference instead.
    const refIso = job.startedAt ?? job.createdAt;
    const ref = Date.parse(refIso);
    if (!Number.isFinite(ref)) return false;
    return now - ref > STALE_LOG_MS;
  }
  return now - mtime > STALE_LOG_MS;
}

/**
 * Scan all jobs in `stateDir` and mark any zombie workers as `failed`. Safe
 * to call repeatedly; idempotent.
 *
 * Returns the list of job ids that were reaped, primarily for testing /
 * diagnostics.
 */
export function sweepZombieJobs(stateDir: string): string[] {
  const reaped: string[] = [];
  const now = Date.now();
  const jobs = listJobs(stateDir);
  for (const job of jobs) {
    const logFile = jobLogPath(stateDir, job.id);
    if (!isZombie(job, logFile, now)) continue;
    updateJob(stateDir, job.id, {
      status: 'failed',
      phase: 'failed',
      completedAt: new Date().toISOString(),
      errorMessage: job.errorMessage ?? 'worker process died without writing exit status',
    });
    appendLog(stateDir, job.id, 'Zombie sweeper: marked failed (pid dead + log stale).');
    reaped.push(job.id);
  }
  return reaped;
}
