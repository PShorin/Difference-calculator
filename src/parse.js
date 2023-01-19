import fs from 'fs';
import yaml from 'js-yaml';
import path from 'node:path';

const fileFormat = (file) => {
  const format = path.extname(file);
  return format;
};

// The parser function is selected depending on the file extension
export default (file) => {
  const format = fileFormat(file).slice(1);
  const fileContent = fs.readFileSync(file, 'utf8');
  if (format === 'json') {
    return JSON.parse(fileContent);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(fileContent);
  }
  throw new Error('Wrong format');
};
