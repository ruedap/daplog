import FooterLogo from '@/components/atoms/footer_logo'
import styles from './styles.module.scss'
import { PORTFOLIO_SITE_NAME } from '@/utils/constants'

const Footer = () => {
  return (
    <footer className={styles.Root}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.logoSpacer}>{PORTFOLIO_SITE_NAME}</div>
          <a className={styles.logo} href="https://ruedap.com" target="_blank">
            <FooterLogo />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
