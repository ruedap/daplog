import Link from 'next/link'
import { HeaderLogo } from '@/components/atoms/header_logo'

const Header = ({ className }: {className?: string}) => {
  return (
    <header className={ className }>
      <div className="max-w-[987px] mx-auto bg-white">
        <div className="m-0 pb-[11.854%]">
          <Link href="/" passHref>
            <a className="block relative w-full">
              <div className="block font-[0] -mt-[50%] pb-[100%] relative w-full" />
              <div
                className="rounded-full bottom-0 block h-auto left-0 m-auto absolute right-0 top-0 w-full"
                style={ {
                  backgroundImage: 'radial-gradient(rgba(24, 63, 83, 0.13), rgba(24, 63, 83, 0.34))',
                  backgroundColor: 'rgba(24, 63, 83, 0.13)'
                } }
              >
                <HeaderLogo />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export { Header }
