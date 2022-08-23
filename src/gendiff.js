import _ from 'lodash';

const gendiffString = (key, value1, value2) => {
  if (value1 === value2) {
    return [`\t  ${key}: ${value1}`];
  }

  const result = [];

  if (value1 !== undefined) {
    result.push(`\t- ${key}: ${value1}`);
  }
  if (value2 !== undefined) {
    result.push(`\t+ ${key}: ${value2}`);
  }

  return result;
};

const genDiff = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

  if (keys.length === 0) {
    return '{}';
  }

  const result = [];

  for (let i = 0; i < keys.length; i += 1) {
    result.push(...gendiffString(keys[i], obj1[keys[i]], obj2[keys[i]]));
  }

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
