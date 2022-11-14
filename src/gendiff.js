import _ from 'lodash';
import format from './formatters/index.js';
import parsers from './parsers.js';

const genDiffTree = (obj1, obj2) => {
  const sortedKeys = _.sortBy([...Object.keys(obj1), ...Object.keys(obj2)]);
  const keys = _.sortedUniq(sortedKeys);

  if (keys.length === 0) {
    return {};
  }

  return keys.map((key) => {
    const diffItem = { key };
    if (!_.has(obj1, key)) {
      diffItem.type = 'added';
      diffItem.value = obj2[key];
    } else if (!_.has(obj2, key)) {
      diffItem.type = 'removed';
      diffItem.value = obj1[key];
    } else if (_.isEqual(obj1[key], obj2[key])) {
      diffItem.type = 'not updated';
      diffItem.value = obj1[key];
    } else {
      diffItem.type = 'updated';
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        diffItem.children = genDiffTree(obj1[key], obj2[key]);
      } else {
        diffItem.oldValue = obj1[key];
        diffItem.newValue = obj2[key];
      }
    }
    return diffItem;
  });
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parsers(filepath1);
  const obj2 = parsers(filepath2);

  const diffTree = genDiffTree(obj1, obj2);

  return format(diffTree, formatName);
};

export default genDiff;
export { genDiffTree };
