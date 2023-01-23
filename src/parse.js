import fs from 'fs';
import yaml from 'js-yaml';
import path from 'node:path';

const fileFormat = (file) => {
  const format = path.extname(file);
  return format;
};

export default (file) => {
  const format = fileFormat(file).slice(1);
  const fileContent = fs.readFileSync(file, 'utf8');
  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
    case 'yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Extension ${format} is not supported`);
  }
};
