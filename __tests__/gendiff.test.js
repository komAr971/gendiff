import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

test('gendiff json as lib use', () => {
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

  const result = [
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ];

  const resultStr = `{\n\t${result.join('\n\t')}\n}`;

  expect(gendiff(JSON.stringify(obj1), JSON.stringify(obj2))).toBe(resultStr);

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
