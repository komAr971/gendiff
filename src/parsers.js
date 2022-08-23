import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  const extention = path.extname(filepath);
  const data = fs.readFileSync(path.resolve(filepath), 'utf8');

  if (extention === '.json') {
    return JSON.parse(data);
  }

  if (extention === '.yaml' || extention === '.yml') {
    return yaml.load(data);
  }

  return data;
};

export default parsers;
