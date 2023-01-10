import { romanizeNumberMapping } from './constants';
import pug from 'pug'

export function countIndex(characters: {key?:string}, chapter: Chapter):number {
  if (characters[chapter.name]) {
    characters[chapter.name] += 1
  } else {
    characters[chapter.name] = 1
  }
  return characters[chapter.name]
}

export function romanizeNumber(num: number) {
  let str = '';
  for (const i of Object.keys(romanizeNumberMapping)) {
    const q = Math.floor(num / romanizeNumberMapping[i]);
    num -= q * romanizeNumberMapping[i];
    str += i.repeat(q);
  }
  return str;
}

export function compileHtml(filename: string, chapters: Chapter[]) {
  const compile = pug.renderFile(filename, {chapters: chapters});
  return compile
}
