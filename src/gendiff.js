import _ from 'lodash';
import format from './formatters/index.js';
import parsers from './parsers.js';

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
        type: 'updated',
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
  const obj1 = parsers(filepath1);
  const obj2 = parsers(filepath2);

  const diffTree = genDiffTree(obj1, obj2);

  return format(diffTree, formatName);
};

export default genDiff;
export { genDiffTree };
