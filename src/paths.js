import _ from 'lodash';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildTree } from './index.js'; // renderDifference
import parseFile from './parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const str = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default (filepath1, filepath2) => {
  const dataInFile = (filepath) => {
    const fullPath = getFixturesPath(filepath);
    const content = parseFile(fullPath);
    return content;
  };

  const tree = buildTree(dataInFile(filepath1), dataInFile(filepath2));
  // return renderDifference(tree);
  // return tree;
  return str(tree, ' ', 2);
};
