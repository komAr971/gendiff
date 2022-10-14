import _ from 'lodash';
import stylish from './formater';

const genDiffTree = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

  if (keys.length === 0) {
    return '{}';
  }

  return keys.map((key) => {
    const diffItem = { key };
    if (!_.has(obj1, key)) {
      diffItem.type = 'added';
      diffItem.value = obj2[key];
    } else if (!_.has(obj2, key)) {
      diffItem.type = 'deleted';
      diffItem.value = obj1[key];
    } else if (_.isEqual(obj1[key], obj2[key])) {
      diffItem.type = 'not changed';
      diffItem.value = obj1[key];
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      diffItem.type = 'changed inside';
      diffItem.children = genDiffTree(obj1[key], obj2[key]);
    } else {
      diffItem.type = 'changed';
      diffItem.oldValue = obj1[key];
      diffItem.newValue = obj2[key];
    }
    return diffItem;
  });
};

const genDiff = (obj1, obj2, formatName = 'stylish') => {
  const diffTree = genDiffTree(obj1, obj2);

  if (diffTree === '{}') {
    return diffTree;
  }

  if (formatName === 'stylish') {
    return stylish(diffTree);
  }

  return diffTree;
};

export default genDiff;
