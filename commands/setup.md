---
description: Check GitHub Copilot authentication status, available models, and current quota.
---

Check the Copilot plugin setup status. Execute:

```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" setup
```

Return the stdout verbatim in your text response so the user does not have to expand the collapsed tool-output block. If authentication is missing, append a note telling the user to run `gh auth login` and confirm an active GitHub Copilot subscription.
