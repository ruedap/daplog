import styles from './styles.module.scss'

const TimeSvg = ({ date }) => {
  return (
    <svg className={styles.datetimeSVG} version="1.1" viewBox="0 0 987 610">
      <circle className={styles.datetimeSVGCircle} cx={173} cy={377} r={116} />
      <text className={styles.datetimeSVGText} x={173} y={377} textAnchor="middle" dy={7} stroke="none">
        { date.replace(/-/g, '.') }
      </text>
    </svg>
  )
}

export default TimeSvg
