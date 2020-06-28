import { FooterLogo } from '@/components/atoms/footer_logo'
import { PORTFOLIO_SITE_NAME } from '@/utils/constants'
import styled, { css } from 'styled-components'
import Styles from '@/styles'
import { suitNames } from '@/utils/string'

const Component = ({ className }: {className?: string}) => {
  const { element } = suitNames(String(className))
  return (
    <footer className={ className }>
      <div className={ element('container') }>
        <div className={ element('heading') }>
          <div className={ element('logoSpacer') }>{ PORTFOLIO_SITE_NAME }</div>
          <a href="https://ruedap.com" className={ element('logoLink') }>
            <FooterLogo />
          </a>
        </div>
      </div>
    </footer>
  )
}

export const StyledComponent = styled(Component)`
  ${({ theme }) => css`
    display: block;
    position: relative;
  
    &-container {
      ${Styles.mixins.container};
      background-image: linear-gradient(
        ${theme.colors.key[3]} 0,
        ${theme.colors.key[4]} 100%
      );

      ${theme.mq.up.lg} {
        &::before {
          ${Styles.mixins.dapicons};
          color: ${theme.colors.key[2]};
          content: "ruedap";
          font-size: ${theme.fontSizes.md.rem};
          left: 50%;
          position: absolute;
          top: 377px;
          transform: translate(-50%, -100%);
        }
      }
    }
    
    &-heading {
      margin: 0;
      position: relative;
    }

    &-logoSpacer {
      display: block;
      font-size: 0;
      /* 1129 / 987 = 1.143870314 */
      padding-bottom: 114.387%;
      position: relative;
      width: 100%;
    }
    
    &-logoLink {
      bottom: 0;
      display: block;
      height: auto;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
    }
  `}
  
`

export const Footer = StyledComponent
