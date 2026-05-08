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

/**
 * Whether a Copilot model ID consumes the premium request pool. Known
 * premium-metered family today is `claude-opus-*`; everything else (Sonnet,
 * Haiku, GPT-5.x, GPT-4.1) is Standard or Fast tier and does not increment
 * `premium_interactions`. Conservative default: unknown IDs are treated as
 * premium so the gate still protects the user.
 */
export function isPremiumModel(modelId: string | undefined): boolean {
  if (!modelId) return true;
  const id = modelId.toLowerCase();
  if (id.startsWith('claude-opus-')) return true;
  if (id.startsWith('claude-sonnet-')) return false;
  if (id.startsWith('claude-haiku-')) return false;
  if (id.startsWith('gpt-')) return false;
  // Unknown family — fail closed.
  return true;
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

  // Only consider metered quotas (where entitlementRequests > 0 and not unlimited).
  // Some quotas like "chat" and "completions" report entitlementRequests=-1
  // with isUnlimitedEntitlement=true — we skip those and focus on the real
  // constrained quota like "premium_interactions".
  const metered = entries.filter(
    (q) => !q.isUnlimitedEntitlement && q.entitlementRequests > 0,
  );

  if (metered.length === 0) {
    // All quotas are unlimited — no gate needed.
    return { ok: true, reason: 'unlimited' };
  }

  if (
    metered.every((q) => q.remainingPercentage <= 0) &&
    metered.some((q) => q.usageAllowedWithExhaustedQuota)
  ) {
    return { ok: true, reason: 'overage_allowed' };
  }

  // Use the tightest metered quota.
  let minRemainingAbs = Number.POSITIVE_INFINITY;
  let tightestReset = '';
  for (const q of metered) {
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

/** One entry per pool the SDK has reported, both metered and unlimited. */
export interface PoolView {
  id: string;
  label: string;
  unlimited: boolean;
  /** Metered pools only — undefined when unlimited. */
  used?: number;
  total?: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt?: string;
}

export interface QuotaSummary {
  /** Per-pool views (every observed pool, not just the tightest one). */
  pools: PoolView[];
  /** True when every observed pool is unlimited. */
  allUnlimited: boolean;

  // ── Tightest-pool aggregate (backwards-compatible fields) ─────────────────
  // These reflect the pool with the fewest remaining requests so callers that
  // just want a single number (e.g. the review footer's "X remaining") keep
  // working. Per-pool detail is in `pools`.
  premium?: number;
  entitlement?: number;
  percentage?: number;
  resetAt?: string;
  /** Legacy alias preserved for status/setup renderers. */
  unlimited?: boolean;
}

const POOL_LABELS: Record<string, string> = {
  premium_interactions: 'Premium requests',
  chat: 'Chat',
  completions: 'Completions',
};

function labelFor(id: string): string {
  if (POOL_LABELS[id]) return POOL_LABELS[id];
  return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Summary view used by the status command and the completed envelope.
 */
export function summarize(snapshot: QuotaSnapshot | null): QuotaSummary {
  if (!snapshot) return { pools: [], allUnlimited: false };
  const entries = Object.entries(snapshot.quotas);
  if (entries.length === 0) return { pools: [], allUnlimited: false };

  const pools: PoolView[] = entries.map(([id, q]) => {
    const isMetered = !q.isUnlimitedEntitlement && q.entitlementRequests > 0;
    if (!isMetered) {
      return { id, label: labelFor(id), unlimited: true };
    }
    const remaining = Math.max(0, q.entitlementRequests - q.usedRequests);
    return {
      id,
      label: labelFor(id),
      unlimited: false,
      used: q.usedRequests,
      total: q.entitlementRequests,
      remaining,
      remainingPercentage: q.remainingPercentage,
      resetAt: q.resetDate || undefined,
    };
  });

  const metered = pools.filter((p) => !p.unlimited);
  if (metered.length === 0) {
    return { pools, allUnlimited: true, unlimited: true };
  }

  let minRemaining = Number.POSITIVE_INFINITY;
  let minPct = 100;
  let tightestReset = '';
  let tightestEntitlement = 0;
  for (const p of metered) {
    if (p.remaining !== undefined && p.remaining < minRemaining) {
      minRemaining = p.remaining;
      tightestReset = p.resetAt ?? '';
      tightestEntitlement = p.total ?? 0;
    }
    if (p.remainingPercentage !== undefined && p.remainingPercentage < minPct) {
      minPct = p.remainingPercentage;
    }
  }
  return {
    pools,
    allUnlimited: false,
    premium: minRemaining === Number.POSITIVE_INFINITY ? undefined : minRemaining,
    entitlement: tightestEntitlement || undefined,
    percentage: minPct,
    resetAt: tightestReset || undefined,
  };
}

const BAR_WIDTH = 30;

function renderBar(usedPct: number): string {
  const clamped = Math.max(0, Math.min(100, usedPct));
  const filled = Math.round((clamped / 100) * BAR_WIDTH);
  return '█'.repeat(filled) + '░'.repeat(BAR_WIDTH - filled);
}

function daysUntil(iso: string): number | null {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  const diffMs = t - Date.now();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
}

/**
 * Render the quota block with a usage bar per metered pool. Shared by
 * `status` and `setup`. Unlimited pools are listed at the end so the user can
 * still see them, but they do not get a bar (no meaningful percentage).
 */
export function renderQuotaBar(
  q: QuotaSummary,
  haveSnapshot: boolean,
): string[] {
  if (!haveSnapshot) {
    return ['- No snapshot yet. One will be captured on the next `implement` run.'];
  }
  if (q.allUnlimited && q.pools.length > 0) {
    return [`- Unlimited entitlement (${q.pools.map((p) => p.label).join(', ')}).`];
  }
  if (q.pools.length === 0) {
    return ['- No quota information reported by Copilot yet.'];
  }

  const metered = q.pools.filter((p) => !p.unlimited);
  const unlimited = q.pools.filter((p) => p.unlimited);
  const lines: string[] = [];

  for (const p of metered) {
    const remainingPct = p.remainingPercentage ?? 0;
    const usedPct = 100 - remainingPct;
    const total = p.total ?? '?';
    const remaining = p.remaining ?? 0;
    lines.push(`${p.label}`);
    lines.push(`  Usage      ${renderBar(usedPct)}  ${usedPct.toFixed(1)}%`);
    lines.push(`  Remaining  ${remaining} / ${total}`);
    if (p.resetAt) {
      const days = daysUntil(p.resetAt);
      const suffix = days === null ? '' : days === 0 ? '  (resets today)' : `  (in ~${days} days)`;
      lines.push(`  Resets     ${p.resetAt}${suffix}`);
    }
    lines.push('');
  }
  // Drop trailing blank line introduced by the loop.
  if (lines[lines.length - 1] === '') lines.pop();

  if (unlimited.length > 0) {
    if (lines.length > 0) lines.push('');
    lines.push(`Unlimited: ${unlimited.map((p) => p.label).join(', ')}`);
  }

  return lines;
}
