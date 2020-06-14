import { merge } from '@/libs'
import { primitives as p } from './_primitives'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const colors_light = {
  key: {
    ...p.colors.key
  },
  text: {
    body: '#21272d'
  },
  bg: {
    body: p.colors.key[1],
    content: p.colors.white
  },
  link: {
    normal: p.colors.key[4],
    visited: p.colors.key[5],
    focus: p.colors.key[3],
    hover: p.colors.key[3],
    active: p.colors.key[2]
  },
  state: {
    primary: p.colors.blue,
    secondary: p.colors.gray[600],
    success: p.colors.green,
    info: p.colors.cyan,
    warning: p.colors.orange,
    danger: p.colors.red
  }
} as const

type TColors = typeof colors_light

// eslint-disable-next-line @typescript-eslint/naming-convention
export const colors_dark: TColors = {
  ...merge<any, TColors, any>({}, colors_light, {
    text: {
      body: p.colors.white
    },
    bg: {
      content: p.colors.black
    }
  } as const)
} as const
