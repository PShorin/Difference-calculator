import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { type: 'nested', name: key, children: buildTree(file1[key], file2[key]) };
    }
    if (!Object.hasOwn(file1, key)) {
      return { type: 'added', name: key, value: file2[key] };
    }
    if (!Object.hasOwn(file2, key)) {
      return { type: 'removed', name: key, value: file1[key] };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        type: 'updated', name: key, value: file2[key], oldValue: file1[key],
      };
    }
    return { type: 'unchanged', name: key, value: file2[key] };
  });
};

export default buildTree;
