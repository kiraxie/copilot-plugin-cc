#!/usr/bin/env node

/**
 * copilot-companion — CLI entry point for the Copilot Claude Code plugin.
 */

import process from 'node:process';
import { runSetup } from './commands/setup.js';
import { runImplement } from './commands/implement.js';
import { runStatus } from './commands/status.js';
import { runResult } from './commands/result.js';
import { enqueueBackground, runWorker } from './commands/background.js';

function printUsage(): void {
  console.log(
    [
      'Usage:',
      '  copilot-companion setup [--check] [--json]',
      '  copilot-companion implement "<task>" [--model <id>] [--reasoning <low|medium|high>]',
      '                               [--no-worktree] [--allow-shell] [--allow-url]',
      '                               [--timeout <ms>] [--min-quota <n>]',
      '                               [--background] [--write <path>]',
      '  copilot-companion status [job-id] [--all] [--json]',
      '  copilot-companion result [job-id] [--json]',
      '',
      'Commands:',
      '  setup       Check GitHub Copilot authentication, available models, quota',
      '  implement   Delegate an implementation task to GitHub Copilot',
      '  status      Show quota plus background job status',
      '  result      Retrieve a background job\'s output',
    ].join('\n'),
  );
}

interface ParsedArgs {
  command: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const command = argv[0] ?? 'help';
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      args.push(arg);
    }
  }

  return { command, args, flags };
}

function flagString(flags: Record<string, string | boolean>, key: string): string | undefined {
  const v = flags[key];
  return typeof v === 'string' ? v : undefined;
}

function flagNumber(flags: Record<string, string | boolean>, key: string): number | undefined {
  const v = flags[key];
  if (typeof v !== 'string') return undefined;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

async function main(): Promise<void> {
  const { command, args, flags } = parseArgs(process.argv.slice(2));

  switch (command) {
    case 'setup':
      await runSetup({
        check: flags['check'] === true,
        json: flags['json'] === true,
      });
      break;

    case 'implement': {
      if (flags['background'] === true) {
        const jobId = enqueueBackground('implement', args, flags, process.cwd());
        console.log(JSON.stringify({ status: 'queued', jobId }));
        break;
      }
      const task = args.join(' ') || flagString(flags, 'task') || '';
      const reasoning = flagString(flags, 'reasoning');
      await runImplement(task, process.cwd(), {
        model: flagString(flags, 'model'),
        reasoning:
          reasoning === 'low' || reasoning === 'medium' || reasoning === 'high'
            ? reasoning
            : undefined,
        timeout: flagNumber(flags, 'timeout'),
        worktree: flags['no-worktree'] !== true,
        allowShell: flags['allow-shell'] === true,
        allowUrl: flags['allow-url'] === true,
        minQuota: flagNumber(flags, 'min-quota'),
        writePath: flagString(flags, 'write'),
      });
      break;
    }

    case 'status':
      await runStatus(process.cwd(), {
        jobId: args[0],
        all: flags['all'] === true,
        json: flags['json'] === true,
      });
      break;

    case 'result':
      await runResult(process.cwd(), {
        jobId: args[0],
        json: flags['json'] === true,
      });
      break;

    // Internal: background worker entry point.
    case '_worker': {
      const jobId = flagString(flags, 'job-id');
      const workerCwd = flagString(flags, 'cwd') ?? process.cwd();
      if (!jobId) {
        console.error('Worker requires --job-id');
        process.exit(1);
      }
      await runWorker(jobId, workerCwd);
      break;
    }

    case 'help':
    case '--help':
    case '-h':
      printUsage();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
}

main().catch((err: Error) => {
  console.error(`\nFatal error: ${err.message}`);
  if (process.env['DEBUG']) console.error(err.stack);
  process.exit(1);
});
