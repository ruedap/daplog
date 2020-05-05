export const stripHtmlTags = (htmlStr: string): string => {
  return htmlStr.replace(/(<([^>]+)>)/ig, '')
}

const removeExt = (str: string, ext: string = '.md'): string => {
  return str.replace(ext, '')
}

const id2Url = (id: string): string => {
  return id.replace(/(\d{4})-(\d{2})-(\d{2})-(.*)/, '$1/$2/$3/$4')
}

export const normalizeArticleUrl = (path: string, ext: string = '.md'): string => {
  return id2Url(removeExt(path, ext))
}

export const id2DateString = (id: string):string => {
  return id.slice(0, 10)
}
