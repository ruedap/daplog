const TimeSvg = ({ date }) => {
  return (
    <Svg version="1.1" viewBox="0 0 987 610">
      <Circle cx={173} cy={377} r={116} />
      <Text x={173} y={377} textAnchor="middle" dy={7} stroke="none">
        { date.replace(/-/g, '.') }
      </Text>
    </Svg>
  )
}

export default TimeSvg

import styled from 'styled-components'
import Styles from '@/styles'

const Svg = styled.svg`
  display: block;
  left: 0;
  position: absolute;
  top: 0;
`

const Circle = styled.circle`
  fill: rgba(var(--b-rgb-base), ${Styles.funcs.fibo('sm', 'alpha')});
`

const Text = styled.text`
  ${Styles.mixins.fontSmoothing()};
  fill: #fff;
  font-family: var(--b-fontFamily-fjalla);
  font-size: ${Styles.funcs.fibo('xs', 'rem')};
  letter-spacing: 0.1em;
`
