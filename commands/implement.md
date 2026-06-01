---
description: Delegate a substantial implementation task to GitHub Copilot. Runs in an isolated git worktree; returns a branch for review.
---

Delegate the implementation task to GitHub Copilot. Execute:

```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" implement $ARGUMENTS
```

Supports:
- `--model <id>` — override the default `claude-opus-4.8`
- `--reasoning <low|medium|high>` — reasoning effort
- `--no-worktree` — run in the current working directory instead of an isolated branch (dangerous)
- `--allow-shell` — permit Copilot to run shell commands inside the worktree (needed for tests/builds)
- `--allow-url` — permit Copilot to fetch URLs
- `--context <text>` — extra context/intent injected into Copilot's system message. Use this to pass decisions or constraints that live only in this Claude Code conversation (Copilot already reads the repo's CLAUDE.md/AGENTS.md on its own, so don't repeat those).
- `--instructions <file>` — same as `--context`, but the content is read from a file
- `--timeout <ms>` — hard timeout for the session (default 30 min)
- `--background` — enqueue as a persistent background job (returns immediately with a job id; survives session end, but does NOT auto-notify the main session — the user must run `/copilot:status` manually). Prefer harness background (see below) unless persistence across sessions is required.
- `--write <path>` — also write the final report to a file

## Wanting auto-notification while doing other work

If the user wants this session to keep working in parallel and be notified when Copilot finishes, do NOT pass `--background`. Instead, run the foreground command via `Bash({ run_in_background: true })` — the bash call only completes when the implement run actually finishes, and the harness then auto-notifies this session. This is the recommended pattern for "fire and forget but tell me when done."

The stdout is a single-line JSON envelope. Parse it and give the user a short human summary (2–4 lines) — do NOT paste the raw JSON, it is noisy and the host already shows it collapsed.

- `completed` → state the branch name, files modified, quota remaining, and `summary`. Suggest reviewing the branch or merging it.
- `queued` → state the `jobId` and point to `/copilot:status <jobId>` and `/copilot:result <jobId>`.
- `blocked` → relay `resetAt`, `remaining`, and `message`. Do not retry.
- `failed` → relay `error` and mention the branch (if any) so partial work can be salvaged.
