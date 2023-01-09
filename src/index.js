import _ from 'lodash';
import { file1JSON, file2JSON } from '../__fixtures__/example.js';

const makeObject = (name, value, type, oldValue = '') => ({
  name,
  value,
  type,
  oldValue,
});

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keysTogether = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keysTogether);
  const objects = sortedKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return makeObject(key, file2[key], 'added');
    } else if (!Object.hasOwn(file2, key)) {
      return makeObject(key, file1[key], 'removed');
    } else if (file1[key] !== file2[key]) {
      return makeObject(key, file2[key], 'updated', file1[key]);
    } else {
      return makeObject(key, file2[key], 'unchanged');
    }
  })
  return objects;
};

const symbols = {
  removed: '-',
  added: '+',
  unchanged: ' ',
};

const renderDifference = (tree) => {
  const gendiff = tree.map((element) => {
    const { name, value, type, oldValue } = element;
    if (type === 'updated') {
      return `  - ${name}: ${value}\n  + ${name}: ${oldValue}`;
    }
    return `  ${symbols[type]} ${name}: ${value}`;
  })
  return `{\n${gendiff.join('\n')}\n}`;
}

const tree = buildTree(file1JSON, file2JSON);
console.log(renderDifference(tree));

