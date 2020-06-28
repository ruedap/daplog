import styled, { css } from 'styled-components'
import { suitNames } from '@/utils/string'
import Styles from '@/styles'

const Component = ({ date, className }: { date: string, className?: string }) => {
  const { element } = suitNames(String(className))
  return (
    <svg version="1.1" viewBox="0 0 987 610" className={ className }>
      <circle cx={ 173 } cy={ 377 } r={ 116 } className={ element('circle') } />
      <text x={ 173 } y={ 377 } textAnchor="middle" dy={ 7 } stroke="none" className={ element('text') }>
        { date.replace(/-/g, '.') }
      </text>
    </svg>
  )
}

export const StyledComponent = styled(Component)`
  ${({ theme }) => css`
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    
    &-circle {
      fill: ${theme.colors.key[3]};
    }
    
    &-text {
      ${Styles.mixins.fontSmoothing()};
      fill: #fff;
      font-family: var(--b-fontFamily-fjalla);
      font-size: ${theme.fontSizes.xs.rem}; 
      letter-spacing: 0.1em;
    }
  `}
`

export const TimeSvg = StyledComponent
