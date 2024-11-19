#!/usr/bin/env node
import { createProgram } from './commands/index.js';

const program = createProgram();
program.parse(process.argv);
