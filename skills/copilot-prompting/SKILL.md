---
name: copilot-prompting
description: Internal guidance for composing prompts for the Copilot implementation agent
user-invocable: false
---

# Copilot Prompt Crafting

When composing the `<task>` string for `copilot-companion implement`:

## Structure

Lead with the outcome the user wants, then list concrete deliverables and acceptance criteria. Copilot runs agentically — it will plan its own steps, so you do not need to enumerate them.

## Good prompts

- "Add a `POST /api/jobs` endpoint that accepts `{ name, schedule }`, validates with zod, persists to the `jobs` table via the existing `JobsRepository`, returns the new job's id. Add integration tests in `tests/jobs.test.ts`. Follow the repository pattern used by `UsersRepository`."

- "Migrate all callers of `oldLogger` (grep for imports) to `newLogger` from `src/logging/new-logger.ts`. Keep the semantic log level; rename `warn` → `notify`. Update any snapshot tests that assert log output."

- "Fix the race condition in `order-processor.ts` where two simultaneous requests can create duplicate orders. Root cause: the idempotency key check is not inside the transaction. Move it in. Add a regression test."

## Bad prompts

- "Fix the bug" — no context, Copilot will flail.
- "Improve the code" — unscoped, will burn premium requests.
- "Refactor everything in `src/`" — too large; break into per-subsystem tasks.
- "What does this code do?" — Copilot implements; investigations go to `/gemini:investigate` if you have that plugin.

## Include in the prompt

- **File paths** you already know are involved (Copilot will re-derive them otherwise and waste tool calls).
- **Existing patterns** to follow (point to a reference file: "match the style of `src/users/users.repository.ts`").
- **Acceptance criteria** — what "done" looks like (tests pass, lint clean, specific endpoint returns specific shape).
- **Out-of-scope guardrails** — "do not change the database schema", "do not touch `src/legacy/`".

## Do NOT include

- Implementation steps — Copilot plans its own.
- "Please" / politeness padding — wastes tokens.
- Context Claude already derived via investigation but isn't strictly necessary — the prompt should be self-contained but not verbose.

## After delegation

The `session.task_complete` event returns a `data.summary`. The companion surfaces it in the final JSON envelope's `summary` field. Trust that summary as the authoritative record of what Copilot thinks it did — but always cross-check against `filesModified` and the actual diff.
