import makeStylish from './stylish.js';

export default (tree, format) => {
  if (format === 'stylish') {
    return makeStylish(tree);
  }
  throw new Error(`Unknown format: ${format}`);
};
