import he from 'he'

export const stripHtmlTags = (htmlStr: string): string => {
  const d = document.createElement('div')
  d.innerHTML = he.unescape(htmlStr)
  const result = String(d.textContent || d.innerText)

  return result
}
