import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildTree, renderDifference } from './index.js';
import parseFile from './parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export default (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const dataInFile = paths.map((filepath) => {
    const fullPath = getFixturesPath(filepath);
    const content = parseFile(fullPath);
    return content;
  });
  const tree = buildTree(dataInFile);
  return renderDifference(tree);
};
