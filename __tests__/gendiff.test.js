import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';

import gendiff, { parsers } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('gendiff json as module use', () => {
  expect(gendiff({}, {})).toBe('{}');

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

  expect(gendiff(obj1, obj2)).toBe(
    `{\n\t${[
      '- follow: false',
      '  host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
      '+ timeout: 20',
      '+ verbose: true',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff(obj1, {})).toBe(
    `{\n\t${[
      '- follow: false',
      '- host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff({}, obj1)).toBe(
    `{\n\t${[
      '+ follow: false',
      '+ host: hexlet.io',
      '+ proxy: 123.234.53.22',
      '+ timeout: 50',
    ].join('\n\t')}\n}`,
  );
});

test('gendiff json as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'json1.json');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'json2.json');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyJSON.json');

  const json1 = parsers(filepath1);
  const json2 = parsers(filepath2);
  const emptyJSON = parsers(filepath3);

  expect(gendiff(emptyJSON, emptyJSON)).toBe('{}');

  expect(gendiff(json1, json2)).toBe(
    `{\n\t${[
      '- follow: false',
      '  host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
      '+ timeout: 20',
      '+ verbose: true',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff(json1, emptyJSON)).toBe(
    `{\n\t${[
      '- follow: false',
      '- host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff(emptyJSON, json1)).toBe(
    `{\n\t${[
      '+ follow: false',
      '+ host: hexlet.io',
      '+ proxy: 123.234.53.22',
      '+ timeout: 50',
    ].join('\n\t')}\n}`,
  );
});

test('gendiff yaml as lib use', () => {
  const filepath1 = path.join(__dirname, '..', '__fixtures__', 'yaml1.yaml');
  const filepath2 = path.join(__dirname, '..', '__fixtures__', 'yaml2.yml');
  const filepath3 = path.join(__dirname, '..', '__fixtures__', 'emptyYAML.yml');

  const yaml1 = parsers(filepath1);
  const yaml2 = parsers(filepath2);
  const emptyYAML = parsers(filepath3);

  expect(gendiff(emptyYAML, emptyYAML)).toBe('{}');

  expect(gendiff(yaml1, yaml2)).toBe(
    `{\n\t${[
      '- follow: false',
      '  host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
      '+ timeout: 20',
      '+ verbose: true',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff(yaml1, emptyYAML)).toBe(
    `{\n\t${[
      '- follow: false',
      '- host: hexlet.io',
      '- proxy: 123.234.53.22',
      '- timeout: 50',
    ].join('\n\t')}\n}`,
  );

  expect(gendiff(emptyYAML, yaml1)).toBe(
    `{\n\t${[
      '+ follow: false',
      '+ host: hexlet.io',
      '+ proxy: 123.234.53.22',
      '+ timeout: 50',
    ].join('\n\t')}\n}`,
  );
});
