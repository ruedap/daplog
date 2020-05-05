import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <h1>
        <Link href="/">
          <a>アインシュタインの電話番号</a>
        </Link>
      </h1>
    </header>
  )
}

export default Header
