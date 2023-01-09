#!/usr/bin/env node
import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format <type>', 'output format');

program.parse();
