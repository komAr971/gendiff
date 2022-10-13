#!/usr/bin/env node
import { Command } from 'commander';

import gendiff, { parsers, stylish } from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const obj1 = parsers(filepath1);
    const obj2 = parsers(filepath2);
    if (program.opts().format === 'stylish') {
      console.log(stylish(gendiff(obj1, obj2)));
    } else {
      console.log(gendiff(obj1, obj2));
    }
  });

program.parse(process.argv);
