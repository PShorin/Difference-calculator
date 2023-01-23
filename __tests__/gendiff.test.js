import { expect, test, beforeAll } from '@jest/globals';
import fs from 'fs';
import gendiff, { getFixturesPath } from '../src/index.js';

let resultFlat;
let resultNested;
let resultPlain;

beforeAll(() => {
  resultFlat = fs.readFileSync(getFixturesPath('resultFlat.txt'), 'utf8');
  resultNested = fs.readFileSync(getFixturesPath('resultNested.txt'), 'utf8');
  resultPlain = fs.readFileSync(getFixturesPath('resultPlain.txt'), 'utf8');
});

test('Stylish, Flat JSON files comparison', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(resultFlat);
});

test('Stylish, Flat YML files comparison', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(resultFlat);
});

test('Stylish, Flat YML and JSON files comparison', () => {
  expect(gendiff('file1.yml', 'file2.json')).toEqual(resultFlat);
  expect(gendiff('file1.json', 'file2.yml')).toEqual(resultFlat);
});

// TODO дописать тесты для пограничных случаев

test('Stylish, Nested JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json')).toEqual(resultNested);
});

test('Stylish, Nested YML files comparison', () => {
  expect(gendiff('file1nested.yml', 'file2nested.yml')).toEqual(resultNested);
});

test('Stylish, Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.yml', 'file2nested.json')).toEqual(resultNested);
  expect(gendiff('file1nested.json', 'file2nested.yml')).toEqual(resultNested);
});

test('Plain, Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.yml', 'file2nested.yml', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.yml', 'file2nested.json', 'plain')).toEqual(resultPlain);
  expect(gendiff('file1nested.json', 'file2nested.yml', 'plain')).toEqual(resultPlain);
});
