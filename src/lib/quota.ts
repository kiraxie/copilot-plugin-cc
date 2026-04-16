/**
 * Quota snapshot cache + gate evaluation.
 *
 * The Copilot SDK emits `assistant.usage` events carrying live
 * `quotaSnapshots`. We persist the most recent view so the `implement` command
 * can refuse work before opening a session when quota is exhausted.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

export interface QuotaEntry {
  entitlementRequests: number;
  usedRequests: number;
  remainingPercentage: number;
  resetDate: string;
  isUnlimitedEntitlement: boolean;
  usageAllowedWithExhaustedQuota: boolean;
}

export interface QuotaSnapshot {
  checkedAt: string; // ISO
  quotas: Record<string, QuotaEntry>;
}

function snapshotPath(stateDir: string): string {
  return join(stateDir, 'quota.json');
}

export function readSnapshot(stateDir: string): QuotaSnapshot | null {
  const path = snapshotPath(stateDir);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as QuotaSnapshot;
  } catch {
    return null;
  }
}

/**
 * Merge an `assistant.usage.quotaSnapshots` payload into the cache. Accepts
 * loosely-typed input so we do not have to depend on the SDK's exact shape
 * here — the event-stream module hands us a Record of QuotaEntry-compatible
 * values.
 */
export function recordSnapshot(
  stateDir: string,
  quotas: Record<string, Partial<QuotaEntry>>,
): QuotaSnapshot {
  const existing = readSnapshot(stateDir);
  const merged: QuotaSnapshot = {
    checkedAt: new Date().toISOString(),
    quotas: { ...(existing?.quotas ?? {}) },
  };
  for (const [id, entry] of Object.entries(quotas)) {
    if (!entry) continue;
    merged.quotas[id] = {
      entitlementRequests: entry.entitlementRequests ?? 0,
      usedRequests: entry.usedRequests ?? 0,
      remainingPercentage: entry.remainingPercentage ?? 100,
      resetDate: entry.resetDate ?? '',
      isUnlimitedEntitlement: entry.isUnlimitedEntitlement ?? false,
      usageAllowedWithExhaustedQuota: entry.usageAllowedWithExhaustedQuota ?? false,
    };
  }
  mkdirSync(dirname(snapshotPath(stateDir)), { recursive: true });
  writeFileSync(snapshotPath(stateDir), JSON.stringify(merged, null, 2), 'utf-8');
  return merged;
}

export type GateDecision =
  | { ok: true; reason: 'unlimited' | 'overage_allowed' | 'available' | 'no_cache'; warning?: string }
  | { ok: false; reason: 'quota_exhausted'; remaining: number; resetAt: string };

export interface GateOptions {
  minRemaining: number; // Block if remaining premium requests <= this value.
  staleAfterMs?: number; // Emit a warning when the snapshot is older than this.
}

/**
 * Decide whether a new `implement` session may proceed given the cached quota
 * snapshot. `null` snapshot -> allow (optimistic bootstrap; first session may
 * consume one request before we learn the real quota).
 */
export function evaluateGate(
  snapshot: QuotaSnapshot | null,
  opts: GateOptions,
): GateDecision {
  if (!snapshot || Object.keys(snapshot.quotas).length === 0) {
    return { ok: true, reason: 'no_cache' };
  }

  const entries = Object.values(snapshot.quotas);

  if (entries.some((q) => q.isUnlimitedEntitlement)) {
    return { ok: true, reason: 'unlimited' };
  }

  if (
    entries.every((q) => q.remainingPercentage <= 0) &&
    entries.some((q) => q.usageAllowedWithExhaustedQuota)
  ) {
    return { ok: true, reason: 'overage_allowed' };
  }

  // Use the tightest quota: minimum absolute remaining across all metered entries.
  let minRemainingAbs = Number.POSITIVE_INFINITY;
  let tightestReset = '';
  for (const q of entries) {
    const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
    if (remaining < minRemainingAbs) {
      minRemainingAbs = remaining;
      tightestReset = q.resetDate;
    }
  }

  if (minRemainingAbs <= opts.minRemaining) {
    return {
      ok: false,
      reason: 'quota_exhausted',
      remaining: minRemainingAbs === Number.POSITIVE_INFINITY ? 0 : minRemainingAbs,
      resetAt: tightestReset,
    };
  }

  const staleMs = opts.staleAfterMs ?? 2 * 60 * 1000;
  const ageMs = Date.now() - new Date(snapshot.checkedAt).getTime();
  const warning = ageMs > staleMs ? `Quota snapshot is ${Math.round(ageMs / 1000)}s old; may be out of date.` : undefined;

  return warning ? { ok: true, reason: 'available', warning } : { ok: true, reason: 'available' };
}

/**
 * Summary view used by the status command and the completed envelope.
 */
export function summarize(snapshot: QuotaSnapshot | null): {
  premium?: number;
  percentage?: number;
  resetAt?: string;
  unlimited?: boolean;
} {
  if (!snapshot) return {};
  const entries = Object.values(snapshot.quotas);
  if (entries.length === 0) return {};
  if (entries.some((q) => q.isUnlimitedEntitlement)) return { unlimited: true };

  let minRemaining = Number.POSITIVE_INFINITY;
  let minPct = 100;
  let tightestReset = '';
  for (const q of entries) {
    const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
    if (remaining < minRemaining) {
      minRemaining = remaining;
      tightestReset = q.resetDate;
    }
    if (q.remainingPercentage < minPct) minPct = q.remainingPercentage;
  }
  return {
    premium: minRemaining === Number.POSITIVE_INFINITY ? undefined : minRemaining,
    percentage: minPct,
    resetAt: tightestReset || undefined,
  };
}
