export type TArticlesJson = Readonly<{
  fileMap: TArticlesList,
  sourceFileArray: string[],
}>

type TArticlesList = Readonly<{
  [key:string]: TArticlesItem,
}>

export type TArticlesItem = Readonly<{
  title: string,
  dir: string,
  base: string,
  ext: string,
  sourceBase: string,
  sourceExt: string,
}>

export type TArticleJson = TArticlesItem & Readonly<{
  bodyContent: string,
  bodyHtml: string,
}>

export type TArticleParams = Readonly<{
  year: string,
  month: string,
  day: string,
  title: string
}>
