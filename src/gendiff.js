import _ from 'lodash';

const genDiff = (json1, json2) => {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);

  const result = [];

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());
  for (let i = 0; i < keys.length; i += 1) {
    if (obj1[keys[i]] === obj2[keys[i]]) {
      result.push(`\t  ${keys[i]}: ${obj1[keys[i]]}`);
    } else if (!_.has(obj1, keys[i]) && _.has(obj2, keys[i])) {
      result.push(`\t+ ${keys[i]}: ${obj2[keys[i]]}`);
    } else if (_.has(obj1, keys[i]) && !_.has(obj2, keys[i])) {
      result.push(`\t- ${keys[i]}: ${obj1[keys[i]]}`);
    } else if (_.has(obj1, keys[i]) && _.has(obj2, keys[i])) {
      result.push(`\t- ${keys[i]}: ${obj1[keys[i]]}`);
      result.push(`\t+ ${keys[i]}: ${obj2[keys[i]]}`);
    }
  }

  return result.length > 0 ? `{\n${result.join('\n')}\n}` : '{}';
};

export default genDiff;
