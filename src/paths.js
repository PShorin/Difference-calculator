import { buildTree } from './index.js';
import { renderDifference } from './index.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// const getFixturesPath = (filename) => path.resolve(process.cwd(), filename);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const gendiff = (filepath1, filepath2) => {
  const paths = [filepath1, filepath2];
  const dataInFile = paths.map((filepath) => {
    const fullPath = getFixturesPath(filepath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  });
  const tree = buildTree(dataInFile);
  return renderDifference(tree);
};