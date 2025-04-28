import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe.each([
  {file1: 'json1.json', file2: 'json2.json', fileExpected: 'expected12Stylish.txt', type: 'stylish'},
  {file1: 'json1.json', file2: 'emptyJSON.json', fileExpected: 'expected1eStylish.txt', type: 'stylish'},
  {file1: 'emptyJSON.json', file2: 'json1.json', fileExpected: 'expectede1Stylish.txt', type: 'stylish'},
  {file1: 'emptyJSON.json', file2: 'emptyJSON.json', fileExpected: 'emptyJSON.json', type: 'stylish'},
  {file1: 'yaml1.yaml', file2: 'yaml2.yml', fileExpected: 'expected12Stylish.txt', type: 'stylish'},
  {file1: 'yaml1.yaml', file2: 'emptyYAML.yml', fileExpected: 'expected1eStylish.txt', type: 'stylish'},
  {file1: 'emptyYAML.yml', file2: 'yaml1.yaml', fileExpected: 'expectede1Stylish.txt', type: 'stylish'},
  {file1: 'emptyYAML.yml', file2: 'emptyYAML.yml', fileExpected: 'emptyYAML.yml', type: 'stylish'},
  {file1: 'json1.json', file2: 'json2.json', fileExpected: 'expected12Plain.txt', type: 'plain'},
  {file1: 'json1.json', file2: 'emptyJSON.json', fileExpected: 'expected1ePlain.txt', type: 'plain'},
  {file1: 'emptyJSON.json', file2: 'json1.json', fileExpected: 'expectede1Plain.txt', type: 'plain'},
  {file1: 'emptyJSON.json', file2: 'emptyJSON.json', fileExpected: 'expectedEmpty.txt', type: 'plain'},
  {file1: 'yaml1.yaml', file2: 'yaml2.yml', fileExpected: 'expected12Plain.txt', type: 'plain'},
  {file1: 'yaml1.yaml', file2: 'emptyYAML.yml', fileExpected: 'expected1ePlain.txt', type: 'plain'},
  {file1: 'emptyYAML.yml', file2: 'yaml1.yaml', fileExpected: 'expectede1Plain.txt', type: 'plain'},
  {file1: 'emptyYAML.yml', file2: 'emptyYAML.yml', fileExpected: 'expectedEmpty.txt', type: 'plain'},
  {file1: 'json1.json', file2: 'json2.json', fileExpected: 'expected12Json.txt', type: 'json'},
  {file1: 'json1.json', file2: 'emptyJSON.json', fileExpected: 'expected1eJson.txt', type: 'json'},
  {file1: 'emptyJSON.json', file2: 'json1.json', fileExpected: 'expectede1Json.txt', type: 'json'},
  {file1: 'emptyJSON.json', file2: 'emptyJSON.json', fileExpected: 'emptyJSON.json', type: 'json'},
  {file1: 'yaml1.yaml', file2: 'yaml2.yml', fileExpected: 'expected12Json.txt', type: 'json'},
  {file1: 'yaml1.yaml', file2: 'emptyYAML.yml', fileExpected: 'expected1eJson.txt', type: 'json'},
  {file1: 'emptyYAML.yml', file2: 'yaml1.yaml', fileExpected: 'expectede1Json.txt', type: 'json'},
  {file1: 'emptyYAML.yml', file2: 'emptyYAML.yml', fileExpected: 'emptyJSON.json', type: 'json'},
])('gendiff', ({file1, file2, fileExpected, type}) => {
  test(`${file1} ${file2} ${type} ${fileExpected}`, () => {
    const filepath1 = path.join(__dirname, '..', '__fixtures__', file1);
    const filepath2 = path.join(__dirname, '..', '__fixtures__', file2);
    const filepathExpected = path.join(__dirname, '..', '__fixtures__', fileExpected);
    const expected = fs.readFileSync(filepathExpected, 'utf8');

    expect(gendiff(filepath1, filepath2, type)).toBe(expected);
  });
});

