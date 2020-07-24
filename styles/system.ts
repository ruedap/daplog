import { TTheme } from './theme'

type TMarginValue = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TPaddingValue = TMarginValue
type TSpaceValue = TMarginValue & TPaddingValue

export interface TMarginProps {
  $m?: TMarginValue
  $mt?: TMarginValue
  $mr?: TMarginValue
  $mb?: TMarginValue
  $ml?: TMarginValue
  $mx?: TMarginValue
  $my?: TMarginValue
}

export interface TPaddingProps {
  $p?: TPaddingValue
  $pt?: TPaddingValue
  $pr?: TPaddingValue
  $pb?: TPaddingValue
  $pl?: TPaddingValue
  $px?: TPaddingValue
  $py?: TPaddingValue
}

export type TSpaceProps = TMarginProps & TPaddingProps

const getThemeValue = (theme: TTheme) => (value: TSpaceValue) => {
  return value === '0' ? '0' : theme.space[value].px()
}

export const margin = (props: any) => {
  let result = {}
  if (!props.theme) return result
  const _get = getThemeValue(props.theme)
  if (props.$m) { result = { ...result, margin: _get(props.$m) } }
  if (props.$mt) { result = { ...result, marginTop: _get(props.$mt) } }
  if (props.$mr) { result = { ...result, marginRight: _get(props.$mr) } }
  if (props.$mb) { result = { ...result, marginBottom: _get(props.$mb) } }
  if (props.$ml) { result = { ...result, marginLeft: _get(props.$ml) } }
  if (props.$mx) { result = { ...result, marginLeft: _get(props.$mx), marginRight: _get(props.$mx) } }
  if (props.$my) { result = { ...result, marginTop: _get(props.$my), marginBottom: _get(props.$my) } }

  return result
}

export const padding = (props: any) => {
  let result = {}
  if (!props.theme) return result
  const _get = getThemeValue(props.theme)
  if (props.$p) { result = { ...result, padding: _get(props.$p) } }
  if (props.$pt) { result = { ...result, paddingTop: _get(props.$pt) } }
  if (props.$pr) { result = { ...result, paddingRight: _get(props.$pr) } }
  if (props.$pb) { result = { ...result, paddingBottom: _get(props.$pb) } }
  if (props.$pl) { result = { ...result, paddingLeft: _get(props.$pl) } }
  if (props.$px) { result = { ...result, paddingLeft: _get(props.$px), paddingRight: _get(props.$px) } }
  if (props.$py) { result = { ...result, paddingTop: _get(props.$py), paddingBottom: _get(props.$py) } }

  return result
}
