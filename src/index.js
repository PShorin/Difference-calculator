import path from 'node:path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { buildTree } from './make-tree.js';
import parseFile from './parse.js';
import formatTree from './formatters/choose-Format.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export const getFixturesPath = (filename)=> path.join(__dirname, '..', '__fixtures__', filename);

export const getFixturesPath = (filename) => path.resolve(process.cwd(), filename);

const dataInFile = (filepath) => {
  const fullPath = getFixturesPath(filepath);
  const content = parseFile(fullPath);
  return content;
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const tree = buildTree(dataInFile(filepath1), dataInFile(filepath2));
  return formatTree(tree, formatName);
};
