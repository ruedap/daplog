import Link from 'next/link'
import { TArticleData } from '@src/types'
import Time from '@src/components/atoms/time'
import styles from './styles.module.scss'

const githubLink = (id: string) => {
  const baseUrl = 'https://github.com/ruedap/daplog/blob/master/src/articles/'
  return `${baseUrl}${id}.md`
}

const Article = ({ articleData }: { articleData: TArticleData }) => {
  return (
    <article>
      <div className={styles.datetimeContainer}>
        <div className={styles.datetimeSpacer}>
          <Time date={articleData.date} />
        </div>
        {/* TODO: TimeSVG tag */}
      </div>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: articleData.title }} />
      <a className={styles.githubLink} href={githubLink(articleData.id)} />
      <section className={styles.body} dangerouslySetInnerHTML={{ __html: articleData.body }} />
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.navLink}>home</a>
        </Link>
      </nav>
    </article>
  )
}

export default Article
