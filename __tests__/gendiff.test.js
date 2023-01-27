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

const resultNested = readFixture('resultNested.txt');
const resultPlain = readFixture('resultPlain.txt');
const resultJSON = readFixture('resultJSON.txt');
const file1json = getFixturesPath('file1nested.json');
const file2json = getFixturesPath('file2nested.json');
const file1yml = getFixturesPath('file1nested.yml');
const file2yml = getFixturesPath('file2nested.yml');

test.each([
  { a: file1json, b: file2json, expected: resultNested }, // case format not specified
  {
    a: file1yml, b: file2yml, f: 'stylish', expected: resultNested,
  },
  {
    a: file1yml, b: file2json, f: 'stylish', expected: resultNested,
  },
  {
    a: file1json, b: file2json, f: 'plain', expected: resultPlain,
  },
  {
    a: file1yml, b: file2yml, f: 'plain', expected: resultPlain,
  },
  {
    a: file1yml, b: file2json, f: 'plain', expected: resultPlain,
  },
  {
    a: file1json, b: file2json, f: 'json', expected: resultJSON,
  },
  {
    a: file1yml, b: file2yml, f: 'json', expected: resultJSON,
  },
  {
    a: file1yml, b: file2json, f: 'json', expected: resultJSON,
  },
])('Format $f', ({
  a, b, f, expected,
}) => {
  expect(gendiff(a, b, f)).toBe(expected);
});

test('Wrong extension', () => {
  const file1TXT = getFixturesPath('resultFlat.txt');
  const file2TXT = getFixturesPath('resultNested.txt');
  expect(() => { gendiff(file1TXT, file2TXT, 'json'); }).toThrow('Extension txt is not supported');
});

test('Wrong formatter', () => {
  expect(() => { gendiff(file1json, file2json, 'jso'); }).toThrow('Format jso is not supported');
});

const testNode = [{ type: 'newType' }];

test('Wrong type in formatters', () => {
  expect(() => { makePlain(testNode); }).toThrow('Type newType is not supported');
  expect(() => { makeStylish(testNode); }).toThrow('Type newType is not supported');
});
