import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff json as module use', () => {
  expect(gendiff(JSON.stringify({}), JSON.stringify({}))).toBe('{}');

  const obj1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const obj2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expect(gendiff(JSON.stringify(obj1), JSON.stringify(obj2))).toBe(`{\n\t${[
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ].join('\n\t')}\n}`);

  expect(gendiff(JSON.stringify(obj1), JSON.stringify({}))).toBe(`{\n\t${[
    '- follow: false',
    '- host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
  ].join('\n\t')}\n}`);

  expect(gendiff(JSON.stringify({}), JSON.stringify(obj1))).toBe(`{\n\t${[
    '+ follow: false',
    '+ host: hexlet.io',
    '+ proxy: 123.234.53.22',
    '+ timeout: 50',
  ].join('\n\t')}\n}`);
});

test('gendiff json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const json2 = fs.readFileSync(path.resolve(filepath2), 'utf8');
  const emptyJSON = fs.readFileSync(path.resolve(filepath3), 'utf8');

  expect(gendiff(emptyJSON, emptyJSON)).toBe('{}');

  expect(gendiff(json1, json2)).toBe(`{\n\t${[
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ].join('\n\t')}\n}`);

  expect(gendiff(json1, emptyJSON)).toBe(`{\n\t${[
    '- follow: false',
    '- host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
  ].join('\n\t')}\n}`);

  expect(gendiff(emptyJSON, json1)).toBe(`{\n\t${[
    '+ follow: false',
    '+ host: hexlet.io',
    '+ proxy: 123.234.53.22',
    '+ timeout: 50',
  ].join('\n\t')}\n}`);
});
