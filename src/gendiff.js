/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

  if (keys.length === 0) {
    return '{}';
  }

  const result = {};

  for (const key of keys) {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      result[key] = genDiff(obj1[key], obj2[key]);
    } else if (!_.has(obj1, key)) {
      result[key] = '+';
    } else if (!_.has(obj2, key)) {
      result[key] = '-';
    } else {
      result[key] = obj1[key] === obj2[key] ? '=' : '-+';
    }
  }
  console.log(result);

  return result;
};

export default genDiff;
