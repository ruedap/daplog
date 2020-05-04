export type TArticlesJson = Readonly<{
  fileMap: TArticles,
  sourceFileArray: string[],
}>

type TArticles = Readonly<{
  [key:string]: TArticle,
}>

export type TArticle = Readonly<{
  title: string,
  dir: string,
  base: string,
  ext: string,
  sourceBase: string,
  sourceExt: string,
}>
