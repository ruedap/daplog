import styles from './layout.module.scss'

const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Layout
