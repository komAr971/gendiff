import _ from 'lodash';

const stylish = (diff) => {
  if (_.isEmpty(diff)) {
    return '{}';
  }

  const replacer = ' ';
  const spacesCount = 4;
  const prefix = {
    added: '+ ',
    removed: '- ',
    'not updated': '  ',
  };

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    if (Array.isArray(currentValue)) {
      return currentValue.map((line) => iter(line, depth)).join('\n');
    }

    const indentSize = depth * spacesCount;
    const currentIndent = `${replacer.repeat(indentSize - 2)}`;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const { type, key, value } = currentValue;

    if (_.includes(['added', 'removed', 'not updated'], type)) {
      return `${currentIndent}${prefix[type]}${key}: ${iter(value, depth + 1)}`;
    }

    if (type === 'updated') {
      if (currentValue.children) {
        return [
          `${currentIndent}${prefix['not updated']}${key}: {`,
          `${iter(currentValue.children, depth + 1)}`,
          `${bracketIndent}${replacer.repeat(spacesCount)}}`,
        ].join('\n');
      }
      return [
        `${currentIndent}${prefix.removed}${key}: ${iter(
          currentValue.oldValue,
          depth + 1,
        )}`,
        `${currentIndent}${prefix.added}${key}: ${iter(
          currentValue.newValue,
          depth + 1,
        )}`,
      ].join('\n');
    }

    const lines = Object.entries(currentValue).map(
      ([Key, Val]) => `${currentIndent}  ${Key}: ${iter(Val, depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return ['{', iter(diff, 1), '}'].join('\n');
};

export default stylish;
