import { suitNames, getStyledComponentsClassName } from '@/utils/string'

export const TimeSvg = ({ date, className }: { date: string, className?: string }) => {
  const scClassName = getStyledComponentsClassName(String(className))
  const { element } = suitNames(scClassName)
  return (
    <svg version="1.1" viewBox="0 0 987 610" className={ `block left-0 absolute top-0 ${className ?? ''}` }>
      <circle
        cx={ 173 }
        cy={ 377 }
        r={ 116 }
        className={ `${element('circle')} fill-[rgba(24,63,83,0.34)]` }
      />
      <text
        x={ 173 }
        y={ 377 }
        textAnchor="middle"
        dy={ 7 }
        stroke="none"
        className={ `${element('text')} antialiased fill-white font-['Fjalla_One','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[1.3125rem] tracking-[0.1em]` }
      >
        { date.replace(/-/g, '.') }
      </text>
    </svg>
  )
}
