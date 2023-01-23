import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return makeStylish(tree);
  }
  if (format === 'plain') {
    return makePlain(tree);
  }
  throw new Error(`Unknown format: ${format}`);
};
