# Design: `/copilot:debate` — three-model research & debate

**Date:** 2026-06-25
**Status:** Approved (brainstorming) — pending implementation plan

## Purpose

Given a topic, run three frontier models as independent thinkers, then have them
debate their disagreements, and present the user a synthesized result. The three
voices are deliberately cross-vendor so their blind spots differ:

| Voice | Model | Backend | Billed to |
|-------|-------|---------|-----------|
| `opus` | claude-opus-4.8 (high / ultrathink) | Claude Code `Agent` tool (`model: opus`) | Claude subscription |
| `gpt` | gpt-5.5 (high) | `copilot ask` (new command) | Copilot premium quota |
| `gemini` | gemini-3.1-pro (high) | `agy -p` (Antigravity CLI) | Google subscription |

**Fixed two rounds. Not configurable.** (Round 1 = independent, Round 2 = debate.)

## Routing decision (settled)

Fixed routing, no quota threshold. Rationale: the user holds Claude + Google
subscriptions, so the *only* model that must consume Copilot quota is gpt-5.5.
opus and gemini run on already-paid subscriptions. A whole debate costs **~2
Copilot premium requests** (gpt × 2 rounds), which never approaches any limit —
so the originally-considered "switch backends when quota < 30%" logic is dropped
as unnecessary complexity (one fewer quota check, no dual route per model).

## Orchestration

**Claude Code is the neutral conductor** (a markdown skill, not the node CLI).
This is forced by the `opus → cc Agent tool` route: a spawned node process cannot
spawn a Claude Code subagent, so orchestration must live in the CC main loop.
opus speaks through a *separate* subagent so the conductor stays neutral and is
never also a debater.

```
[--context]  CC summarizes prior session / packs cwd files into a context blob
   │
   ▼
Round 1 — independent (3 calls in parallel, mutually blind)
   prompt = topic + context           (identical framing for all three)
   opus   ← Agent(model: opus, "ultrathink")
   gpt    ← copilot ask --model gpt-5.5
   gemini ← agy -p --model "Gemini 3.1 Pro (High)"
   │
   ▼
CC computes the DISAGREEMENT BRIEF — contested points + each side's R1 stance
   │
   ▼
Round 2 — debate (3 calls in parallel)
   prompt = own R1 + other two R1s + disagreement brief
            → "reconsider, defend, or update your position"
   │
   ▼
CC SYNTHESIZES R2 → final report to user
```

**Parallelism:** each round's three calls are independent → dispatched
concurrently in a single message (1× Agent + 2× Bash). A debate = 6 model calls
total; only 2 hit Copilot quota.

**State model:** the two CLI backends (`agy -p`, `copilot ask`) are stateless
single-shot calls. Context is carried by **re-injecting full text into every
prompt** (R2 prompt embeds all three R1 answers + brief), not by session memory.
This keeps all three voices symmetric, stateless, and easy to debug. Trade-off:
R2 input grows with R1 length; acceptable for high-tier models. If R1 answers are
very long, CC may condense them when building the brief, but the default is to
pass full R1 text (maximum fidelity).

## Context & permissions (minimal-surface principle)

**No debate backend touches the filesystem.** All external context — prior
session summary *and* working-directory code — is read by **CC** (which already
holds read permission for this session) and injected as **text** through one
channel: `--context`.

| Source | Form |
|--------|------|
| literal text | `--context "..."` |
| file | `--context @path` |
| stdin | `--context @-` |
| working-dir code | CC selects relevant files, reads them, folds into the context blob |

Resulting permission surface per backend (all read-only reasoning):

- **gpt `ask`** — deny *all* tools incl. read (reuses `permission.ts` `readOnly`
  mode; no worktree exists so reads resolve to nothing). Pure completion.
- **gemini `agy -p`** — no `--add-dir`, no `--dangerously-skip-permissions`,
  no `--sandbox` needed; it has nothing to read.
- **opus `Agent`** — can read inherently, but the prompt instructs "reason only
  from the provided context, do not explore the filesystem" to stay symmetric.

Letting the three agents freely explore the repo is explicitly **out of scope**
(YAGNI, and a much larger permission-risk surface). cwd context is pre-selected
by the conductor only.

## Output format (final report to user)

```
## 共識 (consensus)
## 殘留分歧 (remaining disagreements)
  - <point>: opus … / gpt … / gemini …
## 三方最終立場 (each voice's final position — one paragraph each)
## CC 綜合建議 (conductor's synthesis & recommendation)
```

The per-round transcripts are **not** persisted to disk by default — only the
final synthesis is returned. (Add file output later if needed.)

## Components to build

1. **`skills/debate/SKILL.md`** — the orchestration. Owns: optional context
   packing, the fixed two-round fan-out, disagreement-brief construction, and
   final synthesis. Defines the exact prompts/framing for R1 and R2.
2. **`src/commands/ask.ts`** + dispatch in `src/copilot-companion.ts` — a
   read-only, no-worktree Copilot reasoning call returning assistant text on
   stdout. Derived from `src/commands/review.ts` (same `readOnly` permission +
   no-worktree path) minus diff gathering. Accepts `--model`, prompt, and a
   `--context` passthrough.
3. **Docs** — one line in README + a note in `setup` next-steps listing the new
   command/skill.

## Backend facts (verified this session)

- `agy` at `~/.local/bin/agy`; `agy -p "<prompt>" --model "Gemini 3.1 Pro (High)"`
  returns plain text headlessly (smoke-tested). `agy models` lists the high
  variant. `--print-timeout` default 5m.
- Copilot models list includes `gpt-5.5`, `gemini-3.1-pro-preview`,
  `claude-opus-4.8`. (We only route gpt-5.5 through Copilot.)
- `src/lib/permission.ts` already supports `readOnly` mode (used by `review`).
- `src/lib/event-stream.ts` resolves completion on `session.idle` and exposes the
  last `assistant.message` — the text source for `ask`.

## Explicitly out of scope (YAGNI)

- Configurable round count (fixed at 2 by requirement).
- Quota-threshold dynamic routing (fixed routing chosen).
- Agents reading the repo directly / tool use during reasoning.
- Persisting debate transcripts to disk.
- More than three voices, or swappable model roster.
