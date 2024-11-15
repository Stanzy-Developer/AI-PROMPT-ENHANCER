#!/usr/bin/env node
import { program } from 'commander';
import { render } from 'ink';
import React from 'react';
import { EnhanceCommand } from './commands/enhance.js';

program
  .name('prompt-enhance')
  .description('CLI tool for enhancing AI prompts')
  .version('0.1.0');

program
  .command('enhance')
  .description('Enhance a prompt')
  .argument('<prompt>', 'The prompt to enhance')
  .option('-t, --type <type>', 'Enhancement type (clarity, context, specificity, structure)')
  .action(async (prompt, options) => {
    render(React.createElement(EnhanceCommand, { prompt, options }));
  });

program.parse();
