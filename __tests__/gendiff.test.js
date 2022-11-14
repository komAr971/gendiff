import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff(stylish) json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

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
  const expected12Stylish = fs.readFileSync(filepath12Stylish, 'utf8');
  const expected1eStylish = fs.readFileSync(filepath1eStylish, 'utf8');
  const expectede1Stylish = fs.readFileSync(filepathe1Stylish, 'utf8');

  expect(gendiff(filepath3, filepath3, 'stylish')).toBe('{}');
  expect(gendiff(filepath1, filepath2, 'stylish')).toBe(expected12Stylish);
  expect(gendiff(filepath1, filepath3, 'stylish')).toBe(expected1eStylish);
  expect(gendiff(filepath3, filepath1, 'stylish')).toBe(expectede1Stylish);
});

test('gendiff(stylish) yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

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
  const expected12Stylish = fs.readFileSync(filepath12Stylish, 'utf8');
  const expected1eStylish = fs.readFileSync(filepath1eStylish, 'utf8');
  const expectede1Stylish = fs.readFileSync(filepathe1Stylish, 'utf8');

  expect(gendiff(filepath3, filepath3, 'stylish')).toBe('{}');
  expect(gendiff(filepath1, filepath2, 'stylish')).toBe(expected12Stylish);
  expect(gendiff(filepath1, filepath3, 'stylish')).toBe(expected1eStylish);
  expect(gendiff(filepath3, filepath1, 'stylish')).toBe(expectede1Stylish);
});

test('gendiff(plain) json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

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
  const expected12Plain = fs.readFileSync(filepath12Plain, 'utf8');
  const expected1ePlain = fs.readFileSync(filepath1ePlain, 'utf8');
  const expectede1Plain = fs.readFileSync(filepathe1Plain, 'utf8');

  expect(gendiff(filepath3, filepath3, 'plain')).toBe('');
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(expected12Plain);
  expect(gendiff(filepath1, filepath3, 'plain')).toBe(expected1ePlain);
  expect(gendiff(filepath3, filepath1, 'plain')).toBe(expectede1Plain);
});

test('gendiff(plain) yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

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
  const expected12Plain = fs.readFileSync(filepath12Plain, 'utf8');
  const expected1ePlain = fs.readFileSync(filepath1ePlain, 'utf8');
  const expectede1Plain = fs.readFileSync(filepathe1Plain, 'utf8');

  expect(gendiff(filepath3, filepath3, 'plain')).toBe('');
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(expected12Plain);
  expect(gendiff(filepath1, filepath3, 'plain')).toBe(expected1ePlain);
  expect(gendiff(filepath3, filepath1, 'plain')).toBe(expectede1Plain);
});

test('gendiff(json) json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const filepath12Json = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected12Json.txt',
  );
  const filepath1eJson = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected1eJson.txt',
  );
  const filepathe1Json = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expectede1Json.txt',
  );
  const expected12Json = fs.readFileSync(filepath12Json, 'utf8');
  const expected1eJson = fs.readFileSync(filepath1eJson, 'utf8');
  const expectede1Json = fs.readFileSync(filepathe1Json, 'utf8');

  expect(gendiff(filepath3, filepath3, 'json')).toBe('{}');
  expect(gendiff(filepath1, filepath2, 'json')).toBe(expected12Json);
  expect(gendiff(filepath1, filepath3, 'json')).toBe(expected1eJson);
  expect(gendiff(filepath3, filepath1, 'json')).toBe(expectede1Json);
});

test('gendiff(json) yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const filepath12Json = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected12Json.txt',
  );
  const filepath1eJson = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected1eJson.txt',
  );
  const filepathe1Json = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expectede1Json.txt',
  );
  const expected12Json = fs.readFileSync(filepath12Json, 'utf8');
  const expected1eJson = fs.readFileSync(filepath1eJson, 'utf8');
  const expectede1Json = fs.readFileSync(filepathe1Json, 'utf8');

  expect(gendiff(filepath3, filepath3, 'json')).toBe('{}');
  expect(gendiff(filepath1, filepath2, 'json')).toBe(expected12Json);
  expect(gendiff(filepath1, filepath3, 'json')).toBe(expected1eJson);
  expect(gendiff(filepath3, filepath1, 'json')).toBe(expectede1Json);
});
