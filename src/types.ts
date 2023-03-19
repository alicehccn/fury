/* eslint-disable @typescript-eslint/no-unused-vars */
interface Chapter {
  id?: string,
  name: string
  page: number
  suffix?: string,
  title: string,
}

interface Title {
  id?: string,
  title: string
  slug: string
}

interface Character {
  id?: string,
  name: string,
  role?: string[],
  house?: string,
}
