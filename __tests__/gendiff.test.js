import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, test, beforeAll } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filepath) => fs.readFileSync(getFixturesPath(filepath), 'utf-8').trim();

let resultFlat;
let resultNested;
let resultPlain;
let resultJSON;

const file1nestedJSON = getFixturesPath('file1nested.json');
const file2nestedJSON = getFixturesPath('file2nested.json');
const file1nestedYML = getFixturesPath('file1nested.yml');
const file2nestedYML = getFixturesPath('file2nested.yml');

beforeAll(() => {
  resultFlat = readFixture('resultFlat.txt');
  resultNested = readFixture('resultNested.txt');
  resultPlain = readFixture('resultPlain.txt');
  resultJSON = readFixture('resultJSON.txt');
});

test('1. Stylish, Flat YML and JSON files comparison', () => {
  const file1JSON = getFixturesPath('file1.json');
  const file2JSON = getFixturesPath('file2.json');
  const file1YML = getFixturesPath('file1.yml');
  const file2YML = getFixturesPath('file2.yml');

  expect(gendiff(file1JSON, file2JSON)).toEqual(resultFlat);
  expect(gendiff(file1YML, file2YML)).toEqual(resultFlat);
  expect(gendiff(file1YML, file2JSON)).toEqual(resultFlat);
  expect(gendiff(file1JSON, file2YML)).toEqual(resultFlat);
});

test('2. Stylish, Nested YML and JSON files comparison', () => {
  expect(gendiff(file1nestedJSON, file2nestedJSON)).toEqual(resultNested);
  expect(gendiff(file1nestedYML, file2nestedYML)).toEqual(resultNested);
  expect(gendiff(file1nestedYML, file2nestedJSON)).toEqual(resultNested);
  expect(gendiff(file1nestedJSON, file2nestedYML)).toEqual(resultNested);
});

test('3. Plain, Nested YML and JSON files comparison', () => {
  expect(gendiff(file1nestedJSON, file2nestedJSON, 'plain')).toEqual(resultPlain);
  expect(gendiff(file1nestedYML, file2nestedYML, 'plain')).toEqual(resultPlain);
  expect(gendiff(file1nestedYML, file2nestedJSON, 'plain')).toEqual(resultPlain);
  expect(gendiff(file1nestedJSON, file2nestedYML, 'plain')).toEqual(resultPlain);
});

test('4. JSON, Nested YML and JSON files comparison', () => {
  expect(gendiff(file1nestedJSON, file2nestedJSON, 'json')).toEqual(resultJSON);
  expect(gendiff(file1nestedYML, file2nestedYML, 'json')).toEqual(resultJSON);
  expect(gendiff(file1nestedYML, file2nestedJSON, 'json')).toEqual(resultJSON);
  expect(gendiff(file1nestedJSON, file2nestedYML, 'json')).toEqual(resultJSON);
});

test('5. Test Error (Wrong extension)', () => {
  const file1TXT = getFixturesPath('resultFlat.txt');
  const file2TXT = getFixturesPath('resultNested.txt');
  expect(() => { gendiff(file1TXT, file2TXT, 'json'); }).toThrow('Extension txt is not supported');
});

test('6. Test Error (Wrong formatter)', () => {
  expect(() => { gendiff(file1nestedJSON, file2nestedJSON, 'jso'); }).toThrow('Format jso is not supported');
});
