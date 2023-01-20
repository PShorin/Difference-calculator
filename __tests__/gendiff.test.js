import { expect, test, beforeAll } from '@jest/globals';
import fs from 'fs';
import gendiff, { getFixturesPath } from '../src/index.js';

let resultFlat;
let resultNested;

beforeAll(() => {
  resultFlat = fs.readFileSync(getFixturesPath('resultFlat.txt'), 'utf8');
  resultNested = fs.readFileSync(getFixturesPath('resultNested.txt'), 'utf8');
});

test('Flat JSON files comparison', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(resultFlat);
});

test('Flat YML files comparison', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(resultFlat);
});

test('Flat YML and JSON files comparison', () => {
  expect(gendiff('file1.yml', 'file2.json')).toEqual(resultFlat);
  expect(gendiff('file1.json', 'file2.yml')).toEqual(resultFlat);
});

// TODO дописать тесты для пограничных случаев

test('Nested JSON files comparison', () => {
  expect(gendiff('file1nested.json', 'file2nested.json')).toEqual(resultNested);
});

test('Nested YML files comparison', () => {
  expect(gendiff('file1nested.yml', 'file2nested.yml')).toEqual(resultNested);
});

test('Nested YML and JSON files comparison', () => {
  expect(gendiff('file1nested.yml', 'file2nested.json')).toEqual(resultNested);
  expect(gendiff('file1nested.json', 'file2nested.yml')).toEqual(resultNested);
});
