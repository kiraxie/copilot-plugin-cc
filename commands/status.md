---
description: Show GitHub Copilot quota and background implementation job status. Optionally specify a job ID for details.
---

Check Copilot quota and background job status. Execute:

```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" status $ARGUMENTS
```

Use `--all` to show jobs from all sessions.

Return the stdout verbatim in your text response so the user does not have to expand the collapsed tool-output block. If there is a warning worth flagging (quota near exhaustion, a failed job the user may not have noticed), append a short one-line note after the output.
