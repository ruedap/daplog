import he from 'he'

export const stripHtmlTags = (htmlStr: string): string => {
  const d = document.createElement('div')
  d.innerHTML = he.unescape(htmlStr)
  const result = String(d.textContent || d.innerText)

  return result
}

const removeExt = (str: string, ext: string): string => {
  // return str.split('.').slice(0, -1).join('.')
  return str.replace(ext, '')
}

const dateHyphen2slash = (str: string): string => {
  return str.replace(/(\d{4})-(\d{2})-(\d{2})-(.*)/, '$1/$2/$3/$4')
}

export const normalizeArticlePath = (base: string, ext: string): string => {
  return dateHyphen2slash(removeExt(base, ext))
}
