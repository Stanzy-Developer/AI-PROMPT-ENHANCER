import { Command } from 'commander';
import { EnhancementType } from '@prompt-enhancer/core';
import { startCommandLoop } from '../commandLoop.js';
import { EnhanceCommand } from './enhance.js';
import { render } from 'ink';

export const createProgram = () => {
  const program = new Command();

  program
    .name('prompt-enhance')
    .description('CLI tool to enhance prompts for better results')
    .version('0.1.0');

  program
    .command('enhance [prompt]')
    .description('Enhance a given prompt')
    .option('-t, --type <type>', 'Enhancement type (clarity, specificity, context, structure)', 'clarity')
    .action(async (prompt, options) => {
      if (prompt) {
        // Direct enhance command
        const { waitUntilExit } = render(
          React.createElement(EnhanceCommand, {
            prompt: prompt,
            options: {
              type: options.type as EnhancementType
            }
          })
        );
        await waitUntilExit();
      } else {
        // Interactive mode
        await startCommandLoop();
      }
    });

  return program;
};
