import React from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles/theme'

export const Wrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={ lightTheme }>
      { children }
    </ThemeProvider>
  )
}
