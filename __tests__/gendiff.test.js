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

beforeAll(() => {
  resultFlat = readFixture('resultFlat.txt');
  resultNested = readFixture('resultNested.txt');
  resultPlain = readFixture('resultPlain.txt');
  resultJSON = readFixture('resultJSON.txt');
});

test('Stylish, Flat YML and JSON files comparison', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(resultFlat);
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(resultFlat);
  expect(gendiff('file1.yml', 'file2.json')).toEqual(resultFlat);
  expect(gendiff('file1.json', 'file2.yml')).toEqual(resultFlat);
});

test('Stylish, Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json')).toEqual(resultNested);
  expect(gendiff('file1nested.yml', 'file2nested.yml')).toEqual(resultNested);
  expect(gendiff('file1nested.yml', 'file2nested.json')).toEqual(resultNested);
  expect(gendiff('file1nested.json', 'file2nested.yml')).toEqual(resultNested);
});

test('Plain, Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.yml', 'file2nested.yml', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.yml', 'file2nested.json', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.json', 'file2nested.yml', 'plain')).toEqual(resultPlain);
});

test('JSON, Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json', 'json')).toEqual(resultJSON);
  expect(gendiff('file1nested.yml', 'file2nested.yml', 'json')).toEqual(resultJSON);
  expect(gendiff('file1nested.yml', 'file2nested.json', 'json')).toEqual(resultJSON);
  expect(gendiff('file1nested.json', 'file2nested.yml', 'json')).toEqual(resultJSON);
});

test('Test Error (Wrong extension)', () => {
  expect(() => { gendiff('resultFlat.txt', 'resultNested.txt', 'json'); }).toThrow('Extension txt is not supported');
});

test('Test Error (Wrong formatter)', () => {
  expect(() => { gendiff('file1nested.json', 'file2nested.json', 'jso'); }).toThrow('Format jso is not supported');
});
