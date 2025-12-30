import { FooterLogo } from '@/components/atoms/footer_logo'
import { PORTFOLIO_SITE_NAME } from '@/utils/constants'

const Footer = ({ className }: {className?: string}) => {
  return (
    <footer className={ className }>
      <div className="max-w-container mx-auto bg-gradient-to-b from-key-3 to-key-4 lg:relative">
        <div className="m-0 relative lg:before:content-['ruedap'] lg:before:absolute lg:before:text-key-2 lg:before:font-dapicons lg:before:text-md lg:before:top-[377px] lg:before:left-1/2 lg:before:-translate-x-1/2 lg:before:-translate-y-full lg:before:antialiased lg:before:leading-none">
          <div className="block font-[0] w-full relative pb-[114.387%]">
            { PORTFOLIO_SITE_NAME }
          </div>
          <a href="https://ruedap.com" className="block absolute top-0 bottom-0 left-0 right-0 m-auto h-auto">
            <FooterLogo />
          </a>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
