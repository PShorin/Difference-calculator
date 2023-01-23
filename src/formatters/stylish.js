import _ from 'lodash';

const indentForSign = 2;
const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - indentForSign);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const depthStep = 1;
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + depthStep)}`);

  return `{\n${lines.join('\n')}\n  ${getIndent(depth)}}`;
};

const stylish = (nodes, depth) => nodes.map((node) => {
  switch (node.type) {
    case 'nested':
      const depthStep = 1;
      const lines = stylish(node.children, depth + depthStep);
      return `${getIndent(depth)}  ${node.name}: {\n${lines.join('\n')}\n${getIndent(depth)}  }`;
    case 'added':
      return `${getIndent(depth)}+ ${node.name}: ${stringify(node.value, depth)}`;
    case 'removed':
      return `${getIndent(depth)}- ${node.name}: ${stringify(node.value, depth)}`;
    case 'updated':
      const lineRemoved = `${getIndent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}`;
      const lineAdded = `${getIndent(depth)}+ ${node.name}: ${stringify(node.value, depth)}`;
      return `${lineRemoved}\n${lineAdded}`;
    default: // case: 'unchanged'
      return `${getIndent(depth)}  ${node.name}: ${stringify(node.value, depth)}`;
  }
});

const initialDepth = 1;
export default (tree) => `{\n${stylish(tree, initialDepth).join('\n')}\n}`;
