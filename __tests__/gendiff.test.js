import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff, { parsers } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let expected12Stylish;
let expected1eStylish;
let expectede1Stylish;
let expected12Plain;
let expected1ePlain;
let expectede1Plain;

beforeAll(() => {
  const filepath12Stylish = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected12Stylish.txt',
  );
  const filepath1eStylish = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected1eStylish.txt',
  );
  const filepathe1Stylish = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expectede1Stylish.txt',
  );
  expected12Stylish = fs.readFileSync(filepath12Stylish, 'utf8');
  expected1eStylish = fs.readFileSync(filepath1eStylish, 'utf8');
  expectede1Stylish = fs.readFileSync(filepathe1Stylish, 'utf8');
  const filepath12Plain = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected12Plain.txt',
  );
  const filepath1ePlain = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected1ePlain.txt',
  );
  const filepathe1Plain = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expectede1Plain.txt',
  );
  expected12Plain = fs.readFileSync(filepath12Plain, 'utf8');
  expected1ePlain = fs.readFileSync(filepath1ePlain, 'utf8');
  expectede1Plain = fs.readFileSync(filepathe1Plain, 'utf8');
});

test('gendiff(stylish) json as module use', () => {
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

  expect(gendiff({}, {}, 'stylish')).toBe('{}');
  expect(gendiff(obj1, obj2, 'stylish')).toBe(expected12Stylish);
  expect(gendiff(obj1, {}, 'stylish')).toBe(expected1eStylish);
  expect(gendiff({}, obj1, 'stylish')).toBe(expectede1Stylish);
});

test('gendiff(stylish) json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = parsers(filepath1);
  const json2 = parsers(filepath2);
  const emptyJSON = parsers(filepath3);

  expect(gendiff(emptyJSON, emptyJSON, 'stylish')).toBe('{}');
  expect(gendiff(json1, json2, 'stylish')).toBe(expected12Stylish);
  expect(gendiff(json1, emptyJSON, 'stylish')).toBe(expected1eStylish);
  expect(gendiff(emptyJSON, json1, 'stylish')).toBe(expectede1Stylish);
});

test('gendiff(stylish) yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const yaml1 = parsers(filepath1);
  const yaml2 = parsers(filepath2);
  const emptyYAML = parsers(filepath3);

  expect(gendiff(emptyYAML, emptyYAML, 'stylish')).toBe('{}');
  expect(gendiff(yaml1, yaml2, 'stylish')).toBe(expected12Stylish);
  expect(gendiff(yaml1, emptyYAML, 'stylish')).toBe(expected1eStylish);
  expect(gendiff(emptyYAML, yaml1, 'stylish')).toBe(expectede1Stylish);
});

test('gendiff(plain) json as module use', () => {
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

  expect(gendiff({}, {}, 'plain')).toBe('');
  expect(gendiff(obj1, obj2, 'plain')).toBe(expected12Plain);
  expect(gendiff(obj1, {}, 'plain')).toBe(expected1ePlain);
  expect(gendiff({}, obj1, 'plain')).toBe(expectede1Plain);
});

test('gendiff(plain) json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = parsers(filepath1);
  const json2 = parsers(filepath2);
  const emptyJSON = parsers(filepath3);

  expect(gendiff(emptyJSON, emptyJSON, 'plain')).toBe('');
  expect(gendiff(json1, json2, 'plain')).toBe(expected12Plain);
  expect(gendiff(json1, emptyJSON, 'plain')).toBe(expected1ePlain);
  expect(gendiff(emptyJSON, json1, 'plain')).toBe(expectede1Plain);
});

test('gendiff(plain) yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const yaml1 = parsers(filepath1);
  const yaml2 = parsers(filepath2);
  const emptyYAML = parsers(filepath3);

  expect(gendiff(emptyYAML, emptyYAML, 'plain')).toBe('');
  expect(gendiff(yaml1, yaml2, 'plain')).toBe(expected12Plain);
  expect(gendiff(yaml1, emptyYAML, 'plain')).toBe(expected1ePlain);
  expect(gendiff(emptyYAML, yaml1, 'plain')).toBe(expectede1Plain);
});
