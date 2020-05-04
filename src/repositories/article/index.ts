import { axiosJson } from 'utils/axios'
import { TArticleJson, TArticleParams } from 'types'

const PATH_PREFIX = '/articles/'

type TArticleRepository = Readonly<{
  get(arg: TArticleParams): Promise<TArticleJson>
}>

const path = (arg: TArticleParams): string => {
  return `${PATH_PREFIX}${arg.year}-${arg.month}-${arg.day}-${arg.title}.json`
}

const repo: TArticleRepository = {
  async get(arg: TArticleParams) {
    return await axiosJson.get<TArticleJson>(path(arg)).then(({data}) => data)
  }
}

export default repo
