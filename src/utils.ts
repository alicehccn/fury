export function toKebabCase (name: string) {
  let slug = ''
  name.split(' ').forEach((word) => {
    slug += word[0].toLowerCase()
  })
  return slug
}
