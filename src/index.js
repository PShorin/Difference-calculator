import _ from 'lodash';

const makeObject = (name, value, type, oldValue = '') => ({
  name,
  value,
  type,
  oldValue,
});

export const buildTree = (files) => {
  const [file1, file2] = files;
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keysTogether = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keysTogether);
  const objects = sortedKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return makeObject(key, file2[key], 'added');
    }
    if (!Object.hasOwn(file2, key)) {
      return makeObject(key, file1[key], 'removed');
    }
    if (file1[key] !== file2[key]) {
      return makeObject(key, file2[key], 'updated', file1[key]);
    }
    return makeObject(key, file2[key], 'unchanged');
  });
  return objects;
};

const symbols = {
  removed: '-',
  added: '+',
  unchanged: ' ',
};

export const renderDifference = (tree) => {
  const gendiff = tree.map((element) => {
    const {
      name, value, type, oldValue,
    } = element;
    if (type === 'updated') {
      return `  - ${name}: ${oldValue}\n  + ${name}: ${value}`;
    }
    return `  ${symbols[type]} ${name}: ${value}`;
  });
  return `{\n${gendiff.join('\n')}\n}`;
};
