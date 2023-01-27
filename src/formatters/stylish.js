import _ from 'lodash';

const indentForSign = 2;
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - indentForSign);
const depthStep = 1;

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + depthStep)}`);

  return `{\n${lines.join('\n')}\n  ${getIndent(depth)}}`;
};

const stylish = (nodes, depth) => nodes.map((node) => {
  const {
    name, value, type, children, oldValue,
  } = node;
  switch (type) {
    case 'nested':
    { const lines = stylish(children, depth + depthStep);
      return `${getIndent(depth)}  ${name}: {\n${lines.join('\n')}\n${getIndent(depth)}  }`; }
    case 'added':
      return `${getIndent(depth)}+ ${name}: ${stringify(value, depth)}`;
    case 'removed':
      return `${getIndent(depth)}- ${name}: ${stringify(value, depth)}`;
    case 'updated':
    { const lineRemoved = `${getIndent(depth)}- ${name}: ${stringify(oldValue, depth)}`;
      const lineAdded = `${getIndent(depth)}+ ${name}: ${stringify(value, depth)}`;
      return `${lineRemoved}\n${lineAdded}`; }
    case 'unchanged':
      return `${getIndent(depth)}  ${name}: ${stringify(value, depth)}`;
    default:
      throw new Error(`Type ${type} is not supported`);
  }
});

const initialDepth = 1;
export default (tree) => `{\n${stylish(tree, initialDepth).join('\n')}\n}`;
