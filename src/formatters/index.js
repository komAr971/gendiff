import stylish from './stylish';
import plain from './plain';

const format = (diffTree, formatName) => {
  if (formatName === 'plain') {
    return plain(diffTree);
  }

  return stylish(diffTree);
};

export default format;
