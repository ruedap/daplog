import { TArticlePath } from '@src/types'

export const stripHtmlTags = (htmlStr: string): string => {
  return htmlStr.replace(/(<([^>]+)>)/ig, '')
}

export const id2Url = (id: string): string => {
  return id.replace(/(\d{4})-(\d{2})-(\d{2})-(.*)/, '$1/$2/$3/$4')
}

export const fileName2Id = (fileName: string): string => {
  return fileName.replace(/\.md$/, '')
}

export const id2Prams = (id: string): TArticlePath => {
  const a = id2Url(id).split('/')
  return { year: a[0], month: a[1], date: a[2], title: a[3]} as TArticlePath
}

export const id2DateString = (id: string):string => {
  return id.slice(0, 10)
}