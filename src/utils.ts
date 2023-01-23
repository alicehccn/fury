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
  let string = ''
  if (times > 0) {
    string += 'X'.repeat(times)
  }
  string += map[num % 10]
  return string
}

export function isPOV (character: string) {
   return [
    'Arya',
    'Samwell',
    'Bran',
    'Tyrion',
    'Jaime',
    'Jon',
    'Davos',
    'Catelyn',
    'Theon',
    'Daenerys',
    'Cersei',
    'Alayne',
    'Reek',
  ].indexOf(character) > -1
}