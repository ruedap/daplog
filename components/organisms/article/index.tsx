import Link from 'next/link'
import cn from 'classnames'
import { TArticleData } from '@/types'
import Time from '@/components/atoms/time'
import TimeSvg from '@/components/atoms/time_svg'
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
        <TimeSvg date={articleData.date} />
      </div>
      <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: articleData.title }} />
      <a className={styles.githubLink} href={githubLink(articleData.id)} target="_blank" />
      <section className={cn(styles.body, 'e-articleBody')} dangerouslySetInnerHTML={{ __html: articleData.body }} />
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.navLink}>home</a>
        </Link>
      </nav>
    </article>
  )
}

export default Article
