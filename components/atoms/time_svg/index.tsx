import * as Styled from './styled'

const TimeSvg = ({ date }: { date: string }) => {
  return (
    <Styled.Svg version="1.1" viewBox="0 0 987 610">
      <Styled.Circle cx={173} cy={377} r={116} />
      <Styled.Text x={173} y={377} textAnchor="middle" dy={7} stroke="none">
        { date.replace(/-/g, '.') }
      </Styled.Text>
    </Styled.Svg>
  )
}

export default TimeSvg
