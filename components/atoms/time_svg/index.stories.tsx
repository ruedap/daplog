import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles/theme'
import { TimeSvg } from '.'

export default {
  title: 'components/atoms/time_svg/index',
  component: TimeSvg
}

export const Default = () =>
  <ThemeProvider theme={ lightTheme }>
    <TimeSvg date="2020-07-26" className="foo" />
  </ThemeProvider>
