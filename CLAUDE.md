# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development

```bash
npm run typecheck     # tsc --noEmit
npm run build         # esbuild → dist/copilot-companion.cjs (rebuild after any src/ change)
```

Test locally in Claude Code:
```bash
claude --plugin-dir .
```
Then `/reload-plugins` after rebuilding.

## Architecture

This plugin delegates **implementation** tasks (write-capable) to GitHub Copilot via `@github/copilot-sdk`. It is the sibling of the read-only `gemini-plugin-cc` at `reference/` (symlink); many infrastructure modules are ported from there.

TypeScript source in `src/` is bundled by esbuild into a single CJS file (`dist/copilot-companion.cjs`) which is committed. The SDK is bundled **inside** the output; Node built-ins stay external.

### CLI entry

`src/copilot-companion.ts` parses argv and dispatches to:
- `implement` → `src/commands/implement.ts`
- `setup` → `src/commands/setup.ts`
- `status` / `result` → ported from the reference plugin
- `_worker` → `src/commands/background.ts` (internal, spawned by `--background`)

### Why no agent loop

Unlike the Gemini plugin, this plugin does **not** own the agent loop. `@github/copilot-sdk` manages orchestration over JSON-RPC with the Copilot CLI server. Our role is: wire the SDK's event stream into stderr progress + stdout envelope, gate on quota, and manage the worktree.

### SDK event → output mapping (`src/lib/event-stream.ts`)

- `assistant.usage` → no longer carries quota (as of SDK 1.0). It reports a per-call `cost` (the model's premium-request multiplier), which we log for visibility. Quota is fetched **actively** via `client.rpc.account.getQuota({})` (see `fetchQuota` in `src/lib/quota.ts`), persisted to `{stateDir}/quota.json`.
- `session.idle` → **primary completion signal** — fires when the session finishes processing the prompt (all tool calls done, final response emitted). This is what `sendAndWait` uses internally.
- `session.task_complete` → **optional summary enrichment** — carries the agent's structured `summary` if emitted, but NOT all tasks emit this event. We capture it but do not block on it.
- `session.shutdown` → captures `codeChanges` and sums per-model `requests.cost` into `premiumRequestCost` (a fallback for `session.rpc.usage.getMetrics().totalPremiumRequestCost`, which we query while the session is still alive)
- `session.error` → rejects the completion promise
- `permission.requested` → logged (decisions are made in `src/lib/permission.ts`, not here)

### Billing model (Copilot multiplier-based premium requests)

Premium usage is metered as a **cost** with per-model multipliers, so usage/entitlement/remaining numbers may be **fractional** (e.g. one Opus call can cost more than 1). The plugin reports `premiumRequestCost` (not an integer request count). `quota.ts` formats fractional numbers via `fmtNum` and surfaces `overage` (usage billed beyond the entitlement) when present.

### Stdout envelope

The `implement` command always emits a single JSON line on stdout, parseable by the `copilot-rescue` subagent:
- `{"status":"completed", branch, summary, filesModified, linesAdded, linesRemoved, premiumRequestCost, model, quotaRemaining}`
- `{"status":"queued", jobId}` (from `--background`)
- `{"status":"blocked", reason, resetAt, remaining, message}` (quota gate)
- `{"status":"failed", jobId, error, branch?}`

Progress and tool chatter go to stderr; they never appear on stdout.

### Worktree lifecycle (`src/lib/worktree.ts`)

- Path: `{stateDir}/worktrees/<jobId>` (fallback: `<repoRoot>/.git/copilot-worktrees/<jobId>` if on a different filesystem)
- Branch: `copilot/<jobId>`
- Base commit: current HEAD of main cwd
- On success: `git clean -fdX` then `git worktree remove`; branch is kept as the deliverable
- On failure / abort: `git worktree remove --force` + delete the branch **only** if it has no commits beyond baseline
- `pruneOrphans` runs at `setup` time to clean up merged `copilot/*` branches older than 7 days

### Permission policy (`src/lib/permission.ts`)

Default-deny for shell, URL, and custom tools. Auto-approve: read, mcp, and write **inside the worktree**. Power users opt in via `--allow-shell` / `--allow-url`. Every decision is logged.

### State persistence

Ported from the reference plugin. `{stateDir}` is `$CLAUDE_PLUGIN_DATA/state/<slug>-<hash>` (workspace-scoped). Layout: `state.json`, `jobs/<jobId>.json`, `jobs/<jobId>.log`, `quota.json`, `worktrees/<jobId>/`.

## Important Patterns

- **Envelope shape is a hard contract** with the `copilot-rescue` subagent. Do not add/remove top-level fields without updating both sides.
- **`sendAndWait` is NOT used** — we wire event listeners manually so we can capture quota, permission, and tool events alongside the completion signal (`session.idle`).
- **Default model** is `claude-opus-4.8`; confirmed present at `setup` time but not enforced. If unavailable, the user is told to pass `--model`.
- **`approveAll` is not used** from the SDK. Our selective handler is the safety boundary that makes proactive orchestrator delegation safe.
- **Dependencies**: `@github/copilot-sdk` only. No Google libs, no custom HTTP. CJS output (`"type": "module"` in package.json, `.cjs` output).
