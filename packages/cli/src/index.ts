#!/usr/bin/env node
import { program } from 'commander';
import { render } from 'ink';
import React from 'react';
import { EnhanceCommand } from './commands/enhance.jsx';
// Read version from package.json
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf8')
);
const version = packageJson.version;

// Set up the main program
program
  .name('prompt-enhance')
  .description('CLI tool for enhancing AI prompts using advanced language models')
  .version(version, '-v, --version', 'Output the current version')
  .addHelpCommand('help [command]', 'Display help for command');

// Enhance command
program
  .command('enhance')
  .description('Enhance a prompt with AI-powered improvements')
  .argument('<prompt>', 'The prompt text to enhance')
  .option('-t, --type <type>', 'Enhancement type (clarity, context, specificity, structure)', 'clarity')
  .option('-m, --model <model>', 'Specify the AI model to use', 'claude-3-opus-20240229')
  .option('--debug', 'Enable debug output')
  .action(async (prompt, options) => {
    try {
      render(React.createElement(EnhanceCommand, { prompt, options }));
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'An unknown error occurred');
      process.exit(1);
    }
  });

// Examples
program.addHelpText('after', `
Examples:
  $ prompt-enhance enhance "Write a story about a dragon"
  $ prompt-enhance enhance -t specificity "Create a landing page"
  $ prompt-enhance enhance -t context --model claude-3-opus "Design a database schema"
`);

program.parse();
