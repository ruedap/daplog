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
