import fs from 'fs';
import yaml from 'js-yaml';
import path from 'node:path';

export const fileFormat = (file) => {
  const format = path.extname(file).slice(1);
  return format;
};

export const fileContent = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  return content;
};

export const parseFile = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Extension ${format} is not supported`);
  }
};
