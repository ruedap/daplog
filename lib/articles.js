import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PATH = 'articles'
const articlesDirectory = path.join(process.cwd(), PATH)

export function getSortedArticlesData() {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
