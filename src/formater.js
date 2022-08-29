/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const stylish = (diff, obj1, obj2) => {
  const keys = Object.keys(diff);

  for (const key of keys) {
    if (_.isObject(diff[key])) {
    }
  }
};

export default stylish;
