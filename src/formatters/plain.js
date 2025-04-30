import _ from 'lodash'

const getStrValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }
  return _.isString(value) ? `'${value}'` : value
}

const iter = (currentValue, prefix = '') => {
  if (Array.isArray(currentValue)) {
    return currentValue
      .filter(item => item.type !== 'not updated')
      .map(line => iter(line, `${prefix === '' ? '' : `${prefix}.`}`))
      .join('\n')
  }

  const { type, key } = currentValue

  if (type === 'added') {
    const { value } = currentValue
    return `Property '${prefix}${key}' was added with value: ${getStrValue(value)}`
  }
  if (type === 'removed') {
    return `Property '${prefix}${key}' was removed`
  }
  if (currentValue.children) {
    return iter(currentValue.children, `${prefix}${key}`)
  }
  return `Property '${prefix}${key}' was updated. From ${getStrValue(
    currentValue.oldValue,
  )} to ${getStrValue(currentValue.newValue)}`
}

const plain = (diff) => {
  if (_.isEmpty(diff)) {
    return ''
  }

  return iter(diff)
}

export default plain
