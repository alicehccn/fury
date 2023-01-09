export function inspectData(chapter: Chapter) {
  let divider = '' ;
  const minLength = 5
  const charLen = chapter.name?.length
  for (let i = 0; i < minLength - charLen + minLength; i++) {
    divider += ' '
  }
  divider += '... ... ... ...   '
  console.log(chapter.name, chapter.suffix, divider, chapter.page)
}

export function countIndex(characters: {key?:string}, chapter: Chapter):number {
  if (characters[chapter.name]) {
    characters[chapter.name] += 1
  } else {
    characters[chapter.name] = 1
  }
  return characters[chapter.name]
}

export function romanizeNumber(num: number) {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  let str = '';

  for (const i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
}