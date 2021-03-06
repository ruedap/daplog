import { parseISO, format } from 'date-fns'

export function Time ({ date }: { date: string }) {
  const d = parseISO(date)
  return <time dateTime={ date }>{ format(d, 'yyyy/MM/dd') }</time>
}
