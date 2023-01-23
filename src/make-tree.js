import _ from 'lodash';

const makeObject = (name, value, type, children = '', oldValue = '') => ({
  name,
  value,
  type,
  children,
  oldValue,
});

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return makeObject(key, '', 'nested', buildTree(file1[key], file2[key]));
    }
    if (!Object.hasOwn(file1, key)) {
      return makeObject(key, file2[key], 'added');
    }
    if (!Object.hasOwn(file2, key)) {
      return makeObject(key, file1[key], 'removed');
    }
    if (file1[key] !== file2[key]) {
      return makeObject(key, file2[key], 'updated', '', file1[key]);
    }
    return makeObject(key, file2[key], 'unchanged');
  });
};

export default buildTree;
