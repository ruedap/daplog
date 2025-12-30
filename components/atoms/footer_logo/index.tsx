import { PORTFOLIO_SITE_NAME } from '@/utils/constants'

// TODO: inline svg
export const FooterLogo = ({ className }: { className?: string }) => (
  <img
    src="/images/common/footer-logo.svg"
    alt={ PORTFOLIO_SITE_NAME }
    className={ `opacity-[0.55] transition-opacity duration-300 hover:opacity-[0.89] ${className ?? ''}` }
  />
)
