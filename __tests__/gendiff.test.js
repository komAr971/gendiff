import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff, { parsers } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath12 = path.join(__dirname, '..', '__fixtures__', 'expected12.txt');
const filepath1e = path.join(__dirname, '..', '__fixtures__', 'expected1e.txt');
const filepathe1 = path.join(__dirname, '..', '__fixtures__', 'expectede1.txt');
const expected12 = fs.readFileSync(filepath12, 'utf8');
const expected1e = fs.readFileSync(filepath1e, 'utf8');
const expectede1 = fs.readFileSync(filepathe1, 'utf8');

test('gendiff json as module use', () => {
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

  expect(gendiff({}, {})).toBe('{}');
  expect(gendiff(obj1, obj2)).toBe(expected12);
  expect(gendiff(obj1, {})).toBe(expected1e);
  expect(gendiff({}, obj1)).toBe(expectede1);
});

test('gendiff json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = parsers(filepath1);
  const json2 = parsers(filepath2);
  const emptyJSON = parsers(filepath3);

  expect(gendiff(emptyJSON, emptyJSON)).toBe('{}');
  expect(gendiff(json1, json2)).toBe(expected12);
  expect(gendiff(json1, emptyJSON)).toBe(expected1e);
  expect(gendiff(emptyJSON, json1)).toBe(expectede1);
});

test('gendiff yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const yaml1 = parsers(filepath1);
  const yaml2 = parsers(filepath2);
  const emptyYAML = parsers(filepath3);

  expect(gendiff(emptyYAML, emptyYAML)).toBe('{}');
  expect(gendiff(yaml1, yaml2)).toBe(expected12);
  expect(gendiff(yaml1, emptyYAML)).toBe(expected1e);
  expect(gendiff(emptyYAML, yaml1)).toBe(expectede1);
});
