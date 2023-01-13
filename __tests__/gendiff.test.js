import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff, { getFixturesPath } from '../src/paths.js';

const resultFlat = fs.readFileSync(getFixturesPath('resultFlat.txt'), 'utf8');

test('Flat JSON files comparison', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(resultFlat);
});
