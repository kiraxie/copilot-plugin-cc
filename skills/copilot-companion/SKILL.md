---
name: copilot-companion
description: Internal helper contract for calling the copilot-companion runtime from Claude Code
user-invocable: false
---

# Copilot Runtime

Use this skill only inside the `copilot:copilot-rescue` subagent.

Primary helper:

```
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" implement "<task>" [flags]
```

Flags:

- `--model <id>` — default `claude-opus-4.6`
- `--reasoning <low|medium|high>` — reasoning effort
- `--no-worktree` — dangerous; do not pass unless the user explicitly asked
- `--allow-shell` — required for any task that will run tests / builds / installs
- `--allow-url` — required for any task that will fetch URLs
- `--timeout <ms>` — hard wall clock timeout; default 30 min
- `--background` — enqueue; stdout returns `{"status":"queued","jobId":"..."}`

Output contract:

Stdout is always a single JSON envelope. See the subagent's response-parsing section for shape.

Stderr streams `[HH:MM:SS] ...` progress lines: tool calls, permission decisions, warnings. The subagent does not need to relay stderr.

General rules:

- Use exactly one Bash call per rescue handoff.
- Do not call `setup`, `status`, or `result` from this subagent.
- The companion handles auth, quota gating, worktree lifecycle, and permission policy. Do not duplicate any of that logic in the subagent.
- If the command exits non-zero, surface the raw stderr to the user and stop.
