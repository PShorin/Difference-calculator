import _ from 'lodash';

const makeString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (nodes) => {
  const iter = (node, parent = '') => {
    const {
      name, value, type, children, oldValue,
    } = node;
    switch (type) {
      case 'nested':
        return children.flatMap((child) => iter(child, `${parent}${name}.`)).join('\n');
      case 'removed':
        return `Property '${parent}${name}' was removed`;
      case 'added':
        return `Property '${parent}${name}' was added with value: ${makeString(value)}`;
      case 'updated':
        return `Property '${parent}${name}' was updated. From ${makeString(oldValue)} to ${makeString(value)}`;
      case 'unchanged':
        return [];
      default: throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = nodes.map((node) => iter(node));
  return `${result.join('\n')}`;
};
