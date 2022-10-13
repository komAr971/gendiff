import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

  if (keys.length === 0) {
    return '{}';
  }

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }

    if (!_.has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      if (_.isEqual(obj1[key], obj2[key])) {
        return {
          key,
          type: 'not changed',
          value: obj1[key],
        };
      }

      return {
        key,
        type: 'changed inside',
        children: genDiff(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        key,
        type: 'not changed',
        value: obj1[key],
      };
    }

    return {
      key,
      type: 'changed',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};

export default genDiff;
