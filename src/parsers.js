import yaml from 'js-yaml';

const parsers = (data, type) => {
  if (type === 'json') {
    return JSON.parse(data);
  }

  if (type === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unknown type ${type}`);
};

export default parsers;
