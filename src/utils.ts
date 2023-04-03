export function toKebabCase (name: string) {
  let slug = ''
  name.split(' ').forEach((word) => {
    slug += word[0].toLowerCase()
  })
  return slug
}

export function romanizedInt(num: number) {
  const map = { 
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
  }
  num += 1
  const times = Math.floor(num / 10)
  let string = map[10].repeat(times)
  if (map[num % 10]) {
    string += map[num % 10]
  }
  return string
}

export function getPrevNextChapter (current: number, total: number) {
  let prev:number
  let next:number
  if (current > 0) {
    prev = current-1
  } else {
    prev = null
  }
  if (current < total) {
    next = current+1
  } else {
    next = null
  }
  return [prev, next]
}