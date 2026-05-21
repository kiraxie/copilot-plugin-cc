---
description: Run a Copilot code review against local git state. Read-only; no file edits. Pass --adversarial for a stricter design-challenge review.
argument-hint: '[--adversarial] [--wait|--background] [--base <ref>] [--scope auto|working-tree|branch] [--model <id>] [--reasoning low|medium|high|xhigh] [focus...]'
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(node:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git rev-parse:*), Bash(git symbolic-ref:*), Bash(git show-ref:*), Bash(git ls-files:*), Bash(git branch:*), AskUserQuestion
---

Run a Copilot review through the plugin runtime.

Raw slash-command arguments:
`$ARGUMENTS`

Core constraint:
- This command is review-only. Copilot is run with file writes, shell, and URL fetches all denied.
- Do not fix issues, apply patches, or suggest that you are about to make changes.
- Your only job is to run the review and return Copilot's output verbatim to the user.

Mode selection:
- Default mode is a focused defect review (`gpt-5.3-codex`, medium effort).
- `--adversarial` switches to a design-challenge review (`gpt-5.4`, high effort) that questions the approach, not just the implementation.
- `--model` and `--reasoning` override the defaults.

Execution mode rules:
- If the raw arguments include `--wait`, do not ask. Run the review in the foreground.
- If the raw arguments include `--background`, do not ask. Run the review in a Claude background task.
- Otherwise, estimate the review size before asking:
  - For working-tree review, start with `git status --short --untracked-files=all`.
  - Also inspect both `git diff --shortstat --cached` and `git diff --shortstat`.
  - For base-branch review, use `git diff --shortstat <base>...HEAD`.
  - Treat untracked files or directories as reviewable work even when `git diff --shortstat` is empty.
  - Recommend waiting only when the review is clearly tiny (roughly 1–2 files total and no sign of a broader directory-sized change).
  - In every other case, including unclear size, recommend background.
  - When in doubt, run the review instead of declaring there is nothing to review.
- Then use `AskUserQuestion` exactly once with two options, putting the recommended option first and suffixing its label with `(Recommended)`:
  - `Wait for results`
  - `Run in background`

Argument handling:
- Preserve the user's arguments exactly. Do not strip `--wait`, `--background`, or `--adversarial`.
- Anything that is not a known flag is treated as focus text and forwarded to the review prompt verbatim.

Foreground flow:
- Run:
```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" review $ARGUMENTS
```
- Return the command stdout verbatim, exactly as-is. It is markdown.
- Do not paraphrase, summarize, or add commentary before or after it.
- Do not fix any issues mentioned in the review output.

Background flow:
- Launch the review with `Bash` using the harness's own background mode. Do NOT pass `--background` to the node process — run it foreground so the bash call completes when (and only when) the review is actually done. The harness will then auto-notify this session.
```typescript
Bash({
  command: `node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" review $ARGUMENTS`,
  description: "Copilot review",
  run_in_background: true
})
```
- Strip `--background` from `$ARGUMENTS` if the user passed it explicitly — harness background supersedes it.
- Do not wait for completion in this turn. Tell the user: "Copilot review running in the background. You'll be notified when it finishes; the output will be returned verbatim."
- When the harness notifies completion, read the captured stdout and return it verbatim, exactly as the foreground flow would.
