import fs from 'fs'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { stripHtmlTags, getTitleHtml, id2DateString } from '@src/utils/string'
import { TArticleItem } from '@src/types'

const PATH = 'src/articles'
const articlesDirectory = path.join(process.cwd(), PATH)

export const getSortedArticleList = () => {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const contentHtml = markdown2Html(fileContents)
    const title = stripHtmlTags(getTitleHtml(contentHtml))
    const date = id2DateString(id)

    return {
      id,
      date,
      title
    } as TArticleItem
  })
  
  // TODO: sort
  return allArticlesData.reverse()
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getArticleData(id: string) {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const contentHtml = markdown2Html(fileContents)
  const title = getTitleHtml(contentHtml)
  const date = id2DateString(id)

  return {
    id,
    title,
    date,
    contentHtml,
  }
}

const markdown2Html = (markdownString: string): string => {
  const processedContent = remark()
    .use(html)
    .processSync(markdownString)
  const contentHtml = processedContent.toString()
  
  return contentHtml
}
