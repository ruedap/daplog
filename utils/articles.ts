import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import footnotes from 'remark-footnotes'
import { stripHtmlTags, id2DateString, fileName2Id, id2Prams } from '@/utils/string'
import { TArticleItem } from '@/types'

const PATH = 'articles'
const articlesDirectory = path.join(process.cwd(), PATH)
const articleFileNames = fs.readdirSync(articlesDirectory)

const readContents = (id: string) => {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
}

export const getSortedArticleList = (fileNames = articleFileNames) => {
  const allArticlesData = fileNames.map(fileName => {
    const id = fileName2Id(fileName)
    const fileContents = readContents(id)
    const contentHtml = markdown2Html(fileContents)
    const title = stripHtmlTags(splitTitleAndBody(contentHtml).title)
    const date = id2DateString(id)

    return { id, date, title } as TArticleItem
  })
  
  // TODO: sort
  return allArticlesData.reverse()
}

export function getAllArticlePathParams(fileNames = articleFileNames) {
  return fileNames.map(fileName => {
    const id = fileName2Id(fileName)
    const params = id2Prams(id)
    return { params }
  })
}

export function getArticleData(id: string) {
  const fileContents = readContents(id)
  const contentHtml = markdown2Html(fileContents)
  const title = splitTitleAndBody(contentHtml).title
  const body = splitTitleAndBody(contentHtml).body
  const date = id2DateString(id)

  return { id, title, date, body }
}

const markdown2Html = (markdownStr: string): string => {
  const processedContent = remark()
    .use(footnotes, {inlineNotes: true})
    .use(highlight)
    .use(html)
    .processSync(markdownStr)
  
  return processedContent.toString()
}

const splitTitleAndBody = (htmlStr: string) => {
  const r = htmlStr.match(/<h1>(.+)<\/h1>([\s\S]*)/)
  if (!Array.isArray(r)) { throw new Error ('invalid argument')}

  return { title: r[1], body: r[2]}
}
