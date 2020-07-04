import styled, { css } from 'styled-components'
import Styles from '@/styles'
import Link from 'next/link'
import HeaderLogo from '@/components/atoms/header_logo'
import { suitNames } from '@/utils/string'

const Component = ({ className }: {className?: string}) => {
  const { element } = suitNames(String(className))
  return (
    <header>
      <div className={ element('inner') }>
        <div className={ element('heading') }>
          <Link href="/" passHref>
            <a className={ element('logoLink') }>
              <div className={ element('logoSpacer') } />
              <div className={ element('logoOuter') }>
                <HeaderLogo />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

const StyledComponent = styled(Component)`
  ${({ theme }) => css`
    &-inner {
      ${Styles.mixins.container}
      background-color: #fff;
    }
    
    &-heading {
      margin: 0;
      padding-bottom: 11.854%;
    }
    
    &-logoLink {
      display: block;
      position: relative;
      width: 100%;
    }
    
    &-logoSpacer {
      display: block;
      font-size: 0;
      margin-top: -50%;
      padding-bottom: 100%;
      position: relative;
      width: 100%;
    }
    
    &-logoOuter {
      background-color: ${theme.colors.bg.body};
      background-image: radial-gradient(${theme.colors.bg.body}, ${theme.colors.key[3]});
      border-radius: 100%;
      bottom: 0;
      display: block;
      height: auto;
      left: 0;
      margin: auto;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }
  `}
`

export const Header = StyledComponent
