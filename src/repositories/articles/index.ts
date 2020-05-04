import { axiosJson } from '../../utils/axios'

const PATH = '/articles.json'

type TArticlesJson = Readonly<{
  fileMap: TArticles,
  sourceFileArray: string[],
}>

type TArticles = Readonly<{
  [key:string]: TArticle,
}>

type TArticle = Readonly<{
  title: string,
  dir: string,
  base: string,
  ext: string,
  sourceBase: string,
  sourceExt: string,
}>

type TArticlesRepository = Readonly<{
  list(): Promise<TArticlesJson>
}>

const repo: TArticlesRepository = {
  async list() {
    return await axiosJson.get<TArticlesJson>(PATH).then(({data}) => data)
  }
}

export default repo
