import _ from 'lodash';

const genDiff = (json1, json2) => {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);

  const result = []

  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)].sort())
  for (const key of keys) {
    if (obj1[key] === obj2[key]) {
      result.push(`    ${key}: ${obj1[key]}`);
      continue;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      result.push(`  + ${key}: ${obj2[key]}`);
      continue;
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      result.push(`  - ${key}: ${obj1[key]}`);
      continue;
    }

    result.push(`  - ${key}: ${obj1[key]}`)
    result.push(`  + ${key}: ${obj2[key]}`)
  }
  
  return `{\n${result.join('\n')}\n}`
}

export default genDiff;