import { POV, RomanizeNumberMapping } from './constants';
import pug from 'pug'

export function countIndex(characters: {key?: number}, chapter: Chapter): number {
  if (POV.indexOf(chapter.name) < 0) {
    return;
  }
  if (characters[chapter.name]) {
    characters[chapter.name] += 1
  } else {
    characters[chapter.name] = 1
  }
  return characters[chapter.name];
}

export function romanizeNumber(num: number): string {
  let str = '';
  if (typeof num !== 'number') {
    return str;
  }
  for (const i of Object.keys(RomanizeNumberMapping)) {
    const q = Math.floor(num / RomanizeNumberMapping[i]);
    num -= q * RomanizeNumberMapping[i];
    str += i.repeat(q);
  }
  return str;
}

export function compileHtml(filename: string, chapters: Chapter[]) {
  const compile = pug.renderFile(filename, {chapters: chapters});
  return compile;
}
