# /copilot:debate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-model research/debate feature: a topic is reasoned over independently by opus-4.8, gpt-5.5, and gemini-3.1-pro, who then debate their disagreements over a fixed two rounds, and Claude Code synthesizes a final report.

**Architecture:** Claude Code is the neutral conductor (a markdown skill). It fans out three voices per round — opus via the CC `Agent` tool, gpt via a new read-only `copilot ask` node command, gemini via the `agy -p` Antigravity CLI — then builds a disagreement brief, runs round two, and synthesizes. No debate backend touches the filesystem; all context is injected as text by the conductor.

**Tech Stack:** TypeScript → esbuild CJS bundle (`@github/copilot-sdk` only); markdown skill; `agy` CLI.

## Global Constraints

- **No new dependencies.** `@github/copilot-sdk` is the only runtime dep. (`package.json` global rule.)
- **CJS output.** Source uses ESM imports with `.js` extensions; esbuild bundles to `dist/copilot-companion.cjs`. Rebuild after any `src/` change.
- **stdout/stderr contract.** `ask` emits the model's answer verbatim on **stdout**; all progress, metrics, and logs go to **stderr**. (Same rule as `review`.)
- **Fixed two rounds, fixed routing.** Round count and per-model backend are NOT configurable. (Spec requirement.)
- **Only gpt-5.5 consumes Copilot quota.** opus → Claude sub, gemini → Google sub.
- **Verification = `npm run typecheck` + `npm run build` + a live smoke invocation.** There is no test runner in this repo and none is to be added; the runnable check for node code is the command itself.

---

### Task 1: `copilot ask` command — read-only single-prompt reasoning

A stripped `review`: arbitrary prompt in, verbatim assistant markdown out, no
git, no worktree, no findings. This is the gpt-5.5 backend for the debate skill,
and is independently useful as a generic "ask Copilot a question" command.

**Files:**
- Create: `src/commands/ask.ts`
- Modify: `src/lib/system-message.ts:20` (add `'ask'` to `SessionKind`) and `src/lib/system-message.ts:29` (`FRAMING` entry)
- Modify: `src/copilot-companion.ts` (import `runAsk`; add `case 'ask'`; add a usage/help line)

**Interfaces:**
- Consumes: `makePermissionHandler({readOnly:true})`, `attachStream`, `buildSystemMessage`, `resolveExtraContext`, `checkAuth`, quota helpers (`readSnapshot`, `evaluateGate`, `isPremiumModel`, `summarize`, `fmtNum`, `fetchQuota`) — all already exported and used by `src/commands/review.ts`.
- Produces: `export async function runAsk(cwd: string, options: AskOptions): Promise<void>` where
  `AskOptions = { prompt: string; model?: string; reasoning?: ReasoningEffort; timeout?: number; minQuota?: number; context?: string; jobId?: string }`.
  Emits the answer on stdout; no JSON envelope.

- [ ] **Step 1: Add the `ask` session kind and framing**

In `src/lib/system-message.ts`, extend the type and the framing map:

```ts
export type SessionKind = 'implement' | 'fix' | 'review' | 'ask';
```

Add to the `FRAMING` record (keep the existing entries):

```ts
  ask: [
    'You are one independent voice being consulted on a question or topic.',
    'Reason carefully and state your own honest conclusion. Use only the context',
    'provided in the prompt — do not explore the filesystem or run tools.',
    'Be concrete and decisive; surface key assumptions and the strongest',
    'counter-argument to your own position.',
  ].join(' '),
```

- [ ] **Step 2: Create `src/commands/ask.ts`**

```ts
/**
 * ask command — sends an arbitrary prompt to GitHub Copilot and prints the
 * assistant's markdown verbatim. Read-only: no worktree, no file writes, no
 * shell. The reasoning backend for the `/copilot:debate` skill's gpt-5.5 voice,
 * and a generic single-prompt query command.
 */

import { CopilotClient } from '@github/copilot-sdk';

import { resolveStateDir, generateJobId, appendLog, jobLogPath } from '../lib/state.js';
import { readSnapshot, evaluateGate, summarize, isPremiumModel, fetchQuota, fmtNum } from '../lib/quota.js';
import { checkAuth } from '../lib/copilot-auth.js';
import { makePermissionHandler } from '../lib/permission.js';
import { attachStream } from '../lib/event-stream.js';
import { buildSystemMessage, resolveExtraContext } from '../lib/system-message.js';
import { CLIENT_NAME, PLUGIN_VERSION } from '../lib/version.js';
import type { ReasoningEffort } from './implement.js';

export interface AskOptions {
  prompt: string;
  model?: string;
  reasoning?: ReasoningEffort;
  timeout?: number;
  minQuota?: number;
  context?: string;
  jobId?: string;
}

const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;
const DEFAULT_MODEL = 'gpt-5.5';
const DEFAULT_EFFORT: ReasoningEffort = 'high';

function progressFactory(): (message: string) => void {
  return (message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    process.stderr.write(`[${time}] ${message}\n`);
  };
}

export async function runAsk(cwd: string, options: AskOptions): Promise<void> {
  const progress = progressFactory();
  const model = options.model ?? DEFAULT_MODEL;
  const reasoning = options.reasoning ?? DEFAULT_EFFORT;
  const timeout = options.timeout ?? DEFAULT_TIMEOUT_MS;
  const minQuota = options.minQuota ?? 1;

  const prompt = options.prompt.trim();
  if (!prompt) throw new Error('ask: empty prompt');

  const stateDir = resolveStateDir(cwd);
  const jobId = options.jobId ?? generateJobId();
  const log = (msg: string): void => appendLog(stateDir, jobId, msg);
  log(`ask start: model=${model} effort=${reasoning} promptChars=${prompt.length}`);

  // Quota gate — only when the chosen model meters premium requests.
  const snapshot = readSnapshot(stateDir);
  if (isPremiumModel(model)) {
    const gate = evaluateGate(snapshot, { minRemaining: minQuota });
    if (!gate.ok) {
      log(`quota blocked: remaining=${gate.remaining} resetAt=${gate.resetAt}`);
      throw new Error(`Quota exhausted — ask not started. Resets at ${gate.resetAt || 'unknown'}.`);
    }
    if (gate.ok && 'warning' in gate && gate.warning) progress(gate.warning);
  } else {
    log(`quota gate skipped: model ${model} is not premium-metered`);
  }

  const client = new CopilotClient({ workingDirectory: cwd, env: process.env });
  let cleanupDone = false;
  let aborted = false;

  const finalize = async (errorMessage?: string): Promise<void> => {
    if (cleanupDone) return;
    cleanupDone = true;
    try { await client.forceStop(); } catch { /* ignore */ }
    if (errorMessage) process.stderr.write(`Ask failed: ${errorMessage}\n`);
  };

  const onSignal = async (): Promise<void> => {
    if (aborted) return;
    aborted = true;
    progress('Received interrupt; aborting ask.');
    log('interrupt');
    await finalize('Interrupted by signal');
    process.exit(130);
  };
  process.on('SIGINT', () => void onSignal());
  process.on('SIGTERM', () => void onSignal());

  try {
    await client.start();
  } catch (err) {
    const msg = `Failed to start Copilot CLI: ${(err as Error).message}`;
    await finalize(msg);
    throw new Error(msg);
  }

  const auth = await checkAuth(client);
  if (!auth.ok) {
    log(`auth failed: ${auth.message}`);
    const msg = `Not authenticated: ${auth.message}`;
    await finalize(msg);
    await client.stop().catch(() => { /* ignore */ });
    throw new Error(msg);
  }
  log(`auth ok: ${auth.authType}${auth.login ? ` as ${auth.login}` : ''}`);

  const permissionHandler = makePermissionHandler({
    allowShell: false,
    allowUrl: false,
    worktreePath: cwd,
    appendLog: log,
    readOnly: true,
  });

  const extraContext = resolveExtraContext(cwd, {
    context: options.context,
    onWarn: (m) => { progress(m); log(m); },
  });

  let session;
  try {
    session = await client.createSession({
      clientName: `${CLIENT_NAME}/${PLUGIN_VERSION}`,
      model,
      reasoningEffort: reasoning,
      workingDirectory: cwd,
      infiniteSessions: { enabled: false },
      onPermissionRequest: permissionHandler,
      systemMessage: { mode: 'append', content: buildSystemMessage('ask', { extraContext }) },
    });
  } catch (err) {
    const msg = `Failed to create Copilot session: ${(err as Error).message}`;
    log(msg);
    await client.stop().catch((e) => log(`client.stop warn: ${(e as Error).message}`));
    await finalize(msg);
    throw new Error(msg);
  }

  const stream = attachStream({ session, stateDir, appendLog: log, progress });

  let completionResult: Awaited<typeof stream.completion> | null = null;
  let premiumRequestCost: number | undefined;
  let timedOut = false;
  let sessionTorn = false;
  const timeoutHandle = setTimeout(() => {
    timedOut = true;
    progress(`Timeout after ${timeout}ms — aborting session.`);
    log(`timeout ${timeout}ms`);
    session.abort().catch((e) => log(`abort error: ${(e as Error).message}`));
  }, timeout);

  const tearDownSession = async (): Promise<void> => {
    if (sessionTorn) return;
    sessionTorn = true;
    clearTimeout(timeoutHandle);
    await session.disconnect().catch((e) => log(`disconnect warn: ${(e as Error).message}`));
    stream.dispose();
    await fetchQuota(client, stateDir).catch(() => null);
    await client.stop().catch((e) => log(`client.stop warn: ${(e as Error).message}`));
  };

  try {
    progress(`Sending prompt to Copilot (model=${model}, effort=${reasoning})…`);
    await session.send({ prompt });
    completionResult = await stream.completion;
    progress('Answer complete; collecting usage metrics.');
    try {
      const metrics = await session.rpc.usage.getMetrics();
      premiumRequestCost = metrics.totalPremiumRequestCost;
    } catch (e) {
      log(`usage.getMetrics failed: ${(e as Error).message}`);
    }
  } catch (err) {
    const msg = (err as Error).message;
    log(`session error: ${msg}`);
    await tearDownSession();
    await finalize(msg);
    throw new Error(msg);
  } finally {
    await tearDownSession();
  }

  const body =
    stream.getLastAssistantMessage()?.trim() ||
    (completionResult?.summary && completionResult.summary.trim()) ||
    '_(Copilot returned an empty answer.)_';

  const success = completionResult?.success !== false && !timedOut;
  if (!success) {
    const reason = timedOut ? `Timed out after ${timeout}ms.` : 'Ask did not complete successfully.';
    process.stdout.write(`${body}\n`);
    log(`ask failed: ${reason}`);
    throw new Error(reason);
  }

  // Verbatim model answer on stdout.
  process.stdout.write(`${body.trim()}\n`);

  const quotaRemaining = summarize(readSnapshot(stateDir));
  const premium = premiumRequestCost ?? 0;
  progress(`Ask done — model=${model} effort=${reasoning} premium-cost=${fmtNum(premium)}`);
  log(`ask done: premium=${premium}`);
  progress(`Job log: ${jobLogPath(stateDir, jobId)}`);
}
```

- [ ] **Step 3: Wire dispatch in `src/copilot-companion.ts`**

Add the import beside the others (near line 8-12):

```ts
import { runAsk } from './commands/ask.js';
```

Add a `case` in the `switch (command)` block (place it after the `review` case):

```ts
    case 'ask': {
      const reasoning = flagEnum(flags, 'reasoning', ['low', 'medium', 'high', 'xhigh'] as const);
      const prompt = extractTask(args, flags); // reuse positional/`--task`/stdin extraction
      await runAsk(process.cwd(), {
        prompt,
        model: flagString(flags, 'model'),
        reasoning,
        timeout: flagNumber(flags, 'timeout'),
        minQuota: flagNumber(flags, 'min-quota'),
        context: flagString(flags, 'context'),
      });
      break;
    }
```

Add a usage line in the help/usage array (near the existing `implement`/`review` usage strings):

```ts
      '  copilot-companion ask "<prompt>" [--model <id>] [--reasoning <low|medium|high|xhigh>] [--context <text|@file|@->]',
```

And a command-summary line (near line 41-45):

```ts
      '  ask         Ask Copilot a single prompt (read-only) and print the answer',
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors. (If `extractTask` is not in scope, check how `implement`'s case imports it and mirror that — it is already used by the `implement` case in this same file.)

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: writes `dist/copilot-companion.cjs`, exits 0.

- [ ] **Step 6: Live smoke test**

Run:
```bash
node dist/copilot-companion.cjs ask "In one sentence: is a linked list or array better for random access? Answer decisively." --model gpt-5.5 --reasoning high
```
Expected: a one-sentence answer on **stdout** (array, O(1) random access); timestamped progress lines on **stderr**; process exits 0. Confirm stdout contains ONLY the answer (pipe through `2>/dev/null` to verify):
```bash
node dist/copilot-companion.cjs ask "say exactly: PONG" --model gpt-5.5 2>/dev/null
```
Expected stdout: `PONG`

- [ ] **Step 7: Commit**

```bash
git add src/commands/ask.ts src/lib/system-message.ts src/copilot-companion.ts dist/copilot-companion.cjs
git commit -m "Add read-only \`ask\` command for single-prompt Copilot reasoning"
```

---

### Task 2: `/copilot:debate` orchestration skill

The conductor. Markdown instructions Claude Code follows to run the fixed
two-round debate. Depends on Task 1 (`ask` command) being built.

**Files:**
- Create: `skills/debate/SKILL.md`

**Interfaces:**
- Consumes (backends): CC `Agent` tool (`model: opus`); `node <plugin>/dist/copilot-companion.cjs ask "<prompt>" --model gpt-5.5 --reasoning high` (from Task 1); `agy -p "<prompt>" --model "Gemini 3.1 Pro (High)"`.
- Produces: a final synthesis printed to the user; no files written.

- [ ] **Step 1: Write `skills/debate/SKILL.md`**

Use this exact content (adjust the plugin path resolution note to match how
sibling skills reference `dist/copilot-companion.cjs` — check `skills/copilot-companion/SKILL.md`):

````markdown
---
name: debate
description: Run a three-model research debate — opus, gpt-5.5, and gemini-3.1-pro think independently, debate their disagreements over two fixed rounds, then Claude Code synthesizes the result. Use when the user wants multiple frontier models to deliberate a topic, "debate", "council", "second opinions", or "have the models argue X".
---

# Three-Model Debate

You are the **neutral conductor**. You do not argue a side — you orchestrate
three independent voices, surface their disagreements, make them debate, and
synthesize. The structure is **fixed at two rounds**; do not add or skip rounds.

## The three voices (fixed routing — do not substitute)

| Voice | How you call it |
|-------|-----------------|
| `opus` | Dispatch a subagent via the Agent tool, `model: opus`. Prompt it to "ultrathink". |
| `gpt` | Bash: `node "$COPILOT_CLI" ask "<prompt>" --model gpt-5.5 --reasoning high` |
| `gemini` | Bash: `agy -p "<prompt>" --model "Gemini 3.1 Pro (High)"` |

`$COPILOT_CLI` is this plugin's `dist/copilot-companion.cjs` (same path sibling
skills invoke). Pass prompts via a heredoc or a temp file if they contain quotes
or are long — these are single-shot stateless calls, so the **entire** prompt
(including all prior-round context) must be in that one string.

## Permissions (do not widen)

No voice touches the filesystem. YOU read any needed files (you already have read
permission) and inject them as text. Do not pass `--add-dir`,
`--dangerously-skip-permissions`, or any write/shell flag to `agy`. The `ask`
command is already read-only.

## Input

The user gives a topic. Optional `--context`:
- `--context "<text>"` — literal context for all three voices.
- `--context @<path>` — read that file's content as context.
- `--context @-` — summarize the **prior conversation** in this session into a
  context blob.
- If the topic concerns this repo, you may additionally read the relevant
  working-directory files yourself and fold concise excerpts into the context.

Build ONE shared `CONTEXT` text block from the above before Round 1.

## Round 1 — independent (run all three in parallel)

Send each voice the SAME framing. Dispatch the Agent call and both Bash calls in
a single message so they run concurrently.

Prompt template (identical for all three):
```
TOPIC:
<topic>

CONTEXT:
<CONTEXT, or "(none)">

Think independently and give your own honest, decisive position on this topic.
State your conclusion first, then your reasoning, key assumptions, and the
single strongest counter-argument to your own view. ~300-500 words.
```

Collect the three answers as `R1.opus`, `R1.gpt`, `R1.gemini`.

## Build the disagreement brief

Compare the three R1 answers. Write a short `BRIEF` listing each contested
point and where the three diverge:
```
CONTESTED POINTS:
1. <point> — opus: <stance> | gpt: <stance> | gemini: <stance>
2. ...
(Points all three already agree on: list briefly so they aren't re-litigated.)
```
If R1 answers are very long, condense each to its core claims when quoting them
in Round 2; otherwise pass them in full.

## Round 2 — debate (run all three in parallel)

Send each voice its own R1, the other two R1s, and the BRIEF. Dispatch all three
concurrently again.

Prompt template (per voice — fill `<self>` with that voice's name):
```
You are <self>. This is round 2 of a 3-model debate. Below are all three
round-1 positions and the contested points.

YOUR ROUND-1 POSITION:
<R1.self>

OTHER POSITIONS:
- opus: <R1.opus>
- gpt: <R1.gpt>
- gemini: <R1.gemini>   (omit your own line)

CONTESTED POINTS:
<BRIEF>

Reconsider in light of the others. For each contested point: defend your view
with a sharper argument, OR update it and say why. End with your final position.
~300-500 words.
```

Collect `R2.opus`, `R2.gpt`, `R2.gemini`.

## Synthesis — your final report to the user

Read the three R2 answers and produce exactly these sections:
```
## 共識
<points all three converged on>

## 殘留分歧
- <point>: opus … / gpt … / gemini …

## 三方最終立場
- **opus**: <one paragraph>
- **gpt**: <one paragraph>
- **gemini**: <one paragraph>

## CC 綜合建議
<your neutral synthesis and recommendation, calling out which argument is
strongest on each contested point and why>
```

Do not write transcripts to disk. Only print this report.
````

- [ ] **Step 2: Verify the skill is discoverable**

Run: `claude --plugin-dir .` then in the session `/reload-plugins`, and confirm
`/copilot:debate` appears in the skill list. (If the plugin's skill manifest
needs an explicit entry, mirror how `skills/copilot-companion` is registered —
check `.claude-plugin/` / `plugin.json` for a skills array and add `debate` if
the others are listed there.)

- [ ] **Step 3: Live end-to-end dry run**

In a `claude --plugin-dir .` session run:
```
/copilot:debate Should a small TypeScript CLI bundle its dependencies into a single file, or ship node_modules?
```
Expected observable behavior:
1. Three Round-1 answers are gathered (you see one Agent subagent + two Bash `ask`/`agy` calls dispatched together).
2. A disagreement brief is produced.
3. Three Round-2 answers are gathered (another concurrent batch).
4. A final report with the four `##` sections in Traditional Chinese headers.
Confirm only ~2 Copilot premium requests were spent (gpt × 2): run
`/copilot:status` before and after and check the remaining delta.

- [ ] **Step 4: Commit**

```bash
git add skills/debate/SKILL.md
git commit -m "Add /copilot:debate three-model orchestration skill"
```

---

### Task 3: Documentation

**Files:**
- Modify: `README.md` (add a `/copilot:debate` entry + `ask` command to the command list)
- Modify: `src/commands/setup.ts` (add a next-steps line) and rebuild

- [ ] **Step 1: Add README entries**

In the commands/features section of `README.md`, add (match surrounding style):
```markdown
- **`/copilot:debate <topic>`** — three models (opus-4.8, gpt-5.5, gemini-3.1-pro) reason independently, debate their disagreements over two fixed rounds, then Claude Code synthesizes a verdict. Only gpt-5.5 uses Copilot quota (~2 premium requests/debate); opus runs on your Claude subscription, gemini on your Google subscription via `agy`. Requires the `agy` (Antigravity) CLI on PATH.
- **`copilot ask "<prompt>"`** — ask Copilot a single prompt read-only and print the answer (the gpt-5.5 backend behind `/copilot:debate`).
```

- [ ] **Step 2: Add a setup next-step line**

In `src/commands/setup.ts`, find the "Next steps" block (the `/copilot:implement` / `/copilot:status` lines) and add:
```ts
'- `/copilot:debate "<topic>"` for a three-model debate (needs the `agy` CLI for the Gemini voice)',
```

- [ ] **Step 3: Rebuild and sanity-check**

Run: `npm run build && node dist/copilot-companion.cjs setup | tail -8`
Expected: the new debate line appears under Next steps; exits 0.

- [ ] **Step 4: Commit**

```bash
git add README.md src/commands/setup.ts dist/copilot-companion.cjs
git commit -m "Document /copilot:debate and ask command"
```

---

## Self-Review

**Spec coverage:**
- Three-voice routing table → Task 1 (`ask`/gpt) + Task 2 (Agent/opus, `agy`/gemini). ✓
- Fixed two rounds → Task 2 skill, stated and enforced. ✓
- `--context` (text/`@file`/`@-` + cwd code) → Task 2 Input section; `ask` passes `--context` through `resolveExtraContext` (Task 1). ✓
- Minimal permission surface (no backend touches FS) → Task 1 `readOnly` handler + `ask` framing; Task 2 Permissions section. ✓
- Disagreement brief + synthesis output format → Task 2 Synthesis section (4 `##` sections). ✓
- Fixed routing, no quota threshold → Task 2 routing table ("do not substitute"); no threshold logic anywhere. ✓
- Only gpt-5.5 on Copilot quota → Task 1 quota gate is premium-aware; Task 2/3 state the ~2-request cost. ✓
- Out of scope (config rounds, dynamic routing, agents reading repo, transcript persistence) → none implemented. ✓

**Placeholder scan:** No TBD/TODO. The two "mirror how sibling skills do X" notes (plugin path in Task 2 Step 1; skill manifest in Task 2 Step 2) are concrete verification instructions pointing at exact files to check, not deferred logic.

**Type consistency:** `runAsk`/`AskOptions` defined in Task 1 Step 2 match the dispatch call in Task 1 Step 3. `SessionKind` gains `'ask'` (Step 1) before `buildSystemMessage('ask', …)` is called (Step 2). `ReasoningEffort` imported from `./implement.js` as in `review.ts`.
