
const TimeSvg = ({ date }) => {
  return (
    <svg className="Article-datetimeSVG" version="1.1" viewBox="0 0 987 610">
      <circle className="Article-datetimeSVGCircle" cx={173} cy={377} r={116} />
      <text className="Article-datetimeSVGText" x={173} y={377} textAnchor="middle" dy={7} stroke="none">
        { date }
      </text>
    </svg>
  )
}

export default TimeSvg
