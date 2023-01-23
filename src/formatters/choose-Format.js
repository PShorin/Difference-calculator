import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Format ${format} is not supported`);
  }
};
