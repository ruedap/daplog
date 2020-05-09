import Link from 'next/link'
import styles from './styles.module.scss'
import HeaderLogo from '@src/components/atoms/header_logo'

const Header = () => {
  return (
    <header>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoSpacer} />
              <div className={styles.logoOuter}>
                <HeaderLogo />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
