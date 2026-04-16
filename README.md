# copilot-plugin-cc

A [Claude Code](https://claude.ai/code) plugin that delegates substantial, self-contained implementation tasks to GitHub Copilot via the [`@github/copilot-sdk`](https://github.com/github/copilot-sdk).

Copilot runs inside an isolated git worktree, so Claude Code's main working tree is never modified. A quota gate reads live usage from the SDK and refuses work when premium requests are exhausted — making it safe for Claude Code's orchestrator to **auto-delegate** sizable tasks without silently burning your quota.

## Prerequisites

- [Claude Code](https://claude.ai/code)
- Node.js 20 or later
- GitHub Copilot subscription
- Authentication via one of:
  - `gh auth login` (recommended)
  - `GH_TOKEN` / `GITHUB_TOKEN` / `COPILOT_GITHUB_TOKEN` env vars

## Installation

```bash
claude plugin marketplace add kiraxie/copilot-plugin-cc
claude plugin install copilot@copilot-plugin-cc
```

## Commands

| Command | Description |
|---|---|
| `/copilot:implement "<task>"` | Delegate an implementation task. Returns a branch name, summary, and diff stats. |
| `/copilot:setup` | Check auth, list available models, show quota snapshot. |
| `/copilot:status [job-id]` | Show quota + background job status. |
| `/copilot:result [job-id]` | Fetch a completed background job's output. |

### `implement` flags

- `--model <id>` — override the default `claude-opus-4.6`
- `--reasoning <low|medium|high>` — reasoning effort
- `--no-worktree` — run in the main working directory (dangerous)
- `--allow-shell` — permit Copilot to run shell commands (needed for tests/builds/installs)
- `--allow-url` — permit Copilot to fetch URLs
- `--timeout <ms>` — wall-clock timeout (default 30 min)
- `--background` — enqueue; returns `{"status":"queued","jobId":"..."}`
- `--write <path>` — also write the envelope to a file

## How it works

1. **Quota gate** — The plugin reads cached `assistant.usage.quotaSnapshots` (captured from prior Copilot sessions). If premium requests are exhausted, it emits a `{"status":"blocked"}` envelope without opening a session.
2. **Worktree sandbox** — Creates `copilot/<jobId>` branch in an isolated worktree checkout. HEAD is copied from the main cwd's HEAD; uncommitted changes are **not** carried over (you get a warning).
3. **Selective permissions** — Auto-approves file reads and writes within the worktree. Shell/URL access is **denied by default** and requires `--allow-shell` / `--allow-url`. Every permission request is logged.
4. **Structured output** — On success, emits a JSON envelope with `branch`, `summary`, `filesModified`, `linesAdded`, `linesRemoved`, `premiumRequests`, and `quotaRemaining`. The main Claude Code thread reviews and decides whether to merge.

## Proactive delegation

The `copilot-rescue` subagent (bundled with the plugin) is configured to proactively delegate when:

- The task would modify 3+ files OR span multiple subsystems
- It is substantially self-contained (describable in 1–2 paragraphs)
- It would cost Claude Code 10+ turns to complete manually

For single-file edits, typo fixes, or exploratory questions, the orchestrator keeps the work in the main thread.

## License

ISC
