---
description: Delegate a substantial implementation task to GitHub Copilot. Runs in an isolated git worktree; returns a branch for review.
---

Delegate the implementation task to GitHub Copilot. Execute:

```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" implement $ARGUMENTS
```

Supports:
- `--model <id>` — override the default `claude-opus-4.6`
- `--reasoning <low|medium|high>` — reasoning effort
- `--no-worktree` — run in the current working directory instead of an isolated branch (dangerous)
- `--allow-shell` — permit Copilot to run shell commands inside the worktree (needed for tests/builds)
- `--allow-url` — permit Copilot to fetch URLs
- `--timeout <ms>` — hard timeout for the session (default 30 min)
- `--background` — enqueue as a background job; returns a job id
- `--write <path>` — also write the final report to a file

The stdout is a single-line JSON envelope. Parse it and give the user a short human summary (2–4 lines) — do NOT paste the raw JSON, it is noisy and the host already shows it collapsed.

- `completed` → state the branch name, files modified, quota remaining, and `summary`. Suggest reviewing the branch or merging it.
- `queued` → state the `jobId` and point to `/copilot:status <jobId>` and `/copilot:result <jobId>`.
- `blocked` → relay `resetAt`, `remaining`, and `message`. Do not retry.
- `failed` → relay `error` and mention the branch (if any) so partial work can be salvaged.
