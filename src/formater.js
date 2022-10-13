import _ from 'lodash';

const stylish = (diff) => {
  if (diff === '{}') {
    return '{}';
  }

  const replacer = ' ';
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    if (Array.isArray(currentValue)) {
      const lines = currentValue.map((line) => iter(line, depth));
      return lines.join('\n');
    }

    const indentSize = depth * spacesCount;
    const currentIndent = `${replacer.repeat(indentSize - 2)}`;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const type = currentValue?.type;
    if (type === 'added') {
      return `${currentIndent}+ ${currentValue.key}: ${iter(
        currentValue.value,
        depth + 1,
      )}`;
    }
    if (type === 'deleted') {
      return `${currentIndent}- ${currentValue.key}: ${iter(
        currentValue.value,
        depth + 1,
      )}`;
    }
    if (type === 'not changed') {
      return `${currentIndent}  ${currentValue.key}: ${iter(
        currentValue.value,
        depth + 1,
      )}`;
    }
    if (type === 'changed') {
      return [
        `${currentIndent}- ${currentValue.key}: ${iter(
          currentValue.oldValue,
          depth + 1,
        )}`,
        `${currentIndent}+ ${currentValue.key}: ${iter(
          currentValue.newValue,
          depth + 1,
        )}`,
      ].join('\n');
    }
    if (type === 'changed inside') {
      return [
        `${currentIndent}  ${currentValue.key}: {`,
        `${iter(currentValue.children, depth + 1)}`,
        `${bracketIndent}${replacer.repeat(spacesCount)}}`,
      ].join('\n');
    }

    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 1)}`,
    );
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return ['{', iter(diff, 1), '}'].join('\n');
};

export default stylish;
