import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff, { parsers, stylish } from '../index.js';

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
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };

  const obj2 = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };

  expect(stylish(gendiff({}, {}))).toBe('{}');
  expect(stylish(gendiff(obj1, obj2))).toBe(expected12);
  expect(stylish(gendiff(obj1, {}))).toBe(expected1e);
  expect(stylish(gendiff({}, obj1))).toBe(expectede1);
});

test('gendiff json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = parsers(filepath1);
  const json2 = parsers(filepath2);
  const emptyJSON = parsers(filepath3);

  expect(stylish(gendiff(emptyJSON, emptyJSON))).toBe('{}');
  expect(stylish(gendiff(json1, json2))).toBe(expected12);
  expect(stylish(gendiff(json1, emptyJSON))).toBe(expected1e);
  expect(stylish(gendiff(emptyJSON, json1))).toBe(expectede1);
});

test('gendiff yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const yaml1 = parsers(filepath1);
  const yaml2 = parsers(filepath2);
  const emptyYAML = parsers(filepath3);

  expect(stylish(gendiff(emptyYAML, emptyYAML))).toBe('{}');
  expect(stylish(gendiff(yaml1, yaml2))).toBe(expected12);
  expect(stylish(gendiff(yaml1, emptyYAML))).toBe(expected1e);
  expect(stylish(gendiff(emptyYAML, yaml1))).toBe(expectede1);
});
