---
description: Check GitHub Copilot authentication status, available models, and current quota.
---

Check the Copilot plugin setup status. Execute:

```bash
node "${CLAUDE_PLUGIN_ROOT}/dist/copilot-companion.cjs" setup
```

Return the output verbatim. If authentication is missing, guide the user to run `gh auth login` and ensure they have an active GitHub Copilot subscription.
