import _ from 'lodash'

const replacer = ' '
const spacesCount = 4
const prefix = {
  added: '+ ',
  removed: '- ',
  'not updated': '  ',
  'children updated': '  ',
}

const getLine = (value, depth) => {
  if (_.isObject(value)) {
    const indentSize = depth * spacesCount
    const currentIndent = `${replacer.repeat(indentSize - 2)}`
    const bracketIndent = replacer.repeat(indentSize - spacesCount)
    const lines = Object.entries(value).map(
      ([key, val]) => `${currentIndent}  ${key}: ${getLine(val, depth + 1)}`,
    )
    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }

  return value
}

const iter = (diffItem, depth) => {
  const indentSize = depth * spacesCount
  const currentIndent = `${replacer.repeat(indentSize - 2)}`
  const bracketIndent = replacer.repeat(indentSize - spacesCount)

  const { type, key } = diffItem

  if (type === 'children updated') {
    const { children } = diffItem
    return [
      `${currentIndent}${prefix[type]}${key}: {`,
      `${children.map(child => iter(child, depth + 1)).join('\n')}`,
      `${bracketIndent}${replacer.repeat(spacesCount)}}`,
    ].join('\n')
  }

  if (_.includes(['added', 'removed', 'not updated'], type)) {
    const { value } = diffItem
    return `${currentIndent}${prefix[type]}${key}: ${getLine(value, depth + 1)}`
  }

  if (type === 'updated') {
    const { oldValue, newValue } = diffItem
    return [
      `${currentIndent}${prefix.removed}${key}: ${getLine(
        oldValue,
        depth + 1,
      )}`,
      `${currentIndent}${prefix.added}${key}: ${getLine(
        newValue,
        depth + 1,
      )}`,
    ].join('\n')
  }

  throw new Error(`Unknown type ${type}`)
}

const stylish = (diff) => {
  if (_.isEmpty(diff)) {
    return '{}'
  }

  return `{\n${diff.map(diffItem => iter(diffItem, 1)).join('\n')}\n}`
}

export default stylish
