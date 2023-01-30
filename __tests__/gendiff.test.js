import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/index.js';
import makeStylish from '../src/formatters/stylish.js';
import makePlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filepath) => fs.readFileSync(getFixturesPath(filepath), 'utf-8').trim();

test.each([
  { file1: 'file1.json', file2: 'file2.json', expected: 'resultStylish.txt' }, // case format not specified
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'stylish', expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.json', format: 'stylish', expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.json', format: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'json', expected: 'resultJSON.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', expected: 'resultJSON.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.json', format: 'json', expected: 'resultJSON.txt',
  },
])('Format $format', ({
  file1, file2, format, expected,
}) => {
  expect(gendiff(getFixturesPath(file1), getFixturesPath(file2), format))
    .toBe(readFixture(expected));
});

test('Wrong extension', () => {
  const file1TXT = getFixturesPath('resultJSON.txt');
  const file2TXT = getFixturesPath('resultPlain.txt');
  expect(() => { gendiff(file1TXT, file2TXT, 'json'); }).toThrow('Extension txt is not supported');
});

test('Wrong formatter', () => {
  const file1 = getFixturesPath('file1.json');
  const file2 = getFixturesPath('file2.json');
  expect(() => { gendiff(file1, file2, 'jso'); }).toThrow('Format jso is not supported');
});

const testNode = [{ type: 'newType' }];

test('Wrong type in formatters', () => {
  expect(() => { makePlain(testNode); }).toThrow('Type newType is not supported');
  expect(() => { makeStylish(testNode); }).toThrow('Type newType is not supported');
});
