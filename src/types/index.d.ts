export type TArticleItem = Readonly<{
  id: string
  date: string
  title: string
}>

export type TArticlePath = Readonly<{
  year: string
  month: string
  date: string
  title: string
}>

export type TArticleData = TArticleItem & Readonly<{
  body: string
}>

export type TMetaTags = Readonly<{
  title: string
  description: string
  keywords: string[]
  image: string
  url: string
}>
