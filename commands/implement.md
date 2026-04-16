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

Return the stdout verbatim. It is a JSON envelope — the `copilot-rescue` agent parses it and relays the branch name plus summary, or handles `blocked` / `failed` states.
