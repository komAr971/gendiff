import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const format = (diffTree, formatName) => {
  if (formatName === 'json') {
    return json(diffTree)
  }

  if (formatName === 'plain') {
    return plain(diffTree)
  }

  return stylish(diffTree)
}

export default format
