import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parsers from './parsers.js';

const types = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
};

const genDiffTree = (obj1, obj2) => {
  const sortedKeys = _.sortBy([...Object.keys(obj1), ...Object.keys(obj2)]);
  const keys = _.sortedUniq(sortedKeys);

  if (keys.length === 0) {
    return {};
  }

  const genDiffItem = (key, value1, value2) => {
    if (value1 === undefined) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (value2 === undefined) {
      return {
        key,
        type: 'removed',
        value: value1,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'not updated',
        value: value1,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        type: 'children updated',
        children: genDiffTree(value1, value2),
      };
    }
    return {
      key,
      type: 'updated',
      oldValue: value1,
      newValue: value2,
    };
  };

  return keys.map((key) => genDiffItem(key, obj1[key], obj2[key]));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = fs.readFileSync(path.resolve(filepath1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(filepath2), 'utf8');

  const type1 = types[path.extname(filepath1)];
  const type2 = types[path.extname(filepath2)];

  const obj1 = parsers(data1, type1);
  const obj2 = parsers(data2, type2);

  const diffTree = genDiffTree(obj1, obj2);

  return format(diffTree, formatName);
};

export default genDiff;
export { genDiffTree };
