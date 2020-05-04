import { axiosJson } from 'utils/axios'
import { TArticlesJson } from 'types'

const PATH = '/articles.json'

type TArticlesRepository = Readonly<{
  list(): Promise<TArticlesJson>
}>

const repo: TArticlesRepository = {
  async list() {
    return await axiosJson.get<TArticlesJson>(PATH).then(({data}) => data)
  }
}

export default repo
