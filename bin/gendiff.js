#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import fs from 'fs';
import path from 'path';

import gendiff from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const json1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
    const json2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
    console.log(gendiff(json1, json2));
  });

program.parse(process.argv);
