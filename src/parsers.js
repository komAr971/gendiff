import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  const extention = path.extname(filepath);
  const data = fs.readFileSync(path.resolve(filepath), 'utf8');

  if (extention === '.json') {
    return data;
  }

  if (extention === '.yaml' || extention === '.yml') {
    return JSON.stringify(yaml.load(data));
  }

  return data;
};

export default parsers;
