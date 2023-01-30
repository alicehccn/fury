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

interface Audible {
  id?: string,
  chapter: string,
  type: string,
  url: string,
}

interface AudibleChapter extends Chapter {
  url?: string,
}
