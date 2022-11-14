import stylish from './stylish.js';
import plain from './plain.js';

const format = (diffTree, formatName) => {
  if (formatName === 'plain') {
    return plain(diffTree);
  }

  return stylish(diffTree);
};

export default format;
