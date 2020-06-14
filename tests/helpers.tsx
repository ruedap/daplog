import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles/theme'

export const renderWithTheme = (component: JSX.Element) => {
  return renderer.create(
    <ThemeProvider theme={ lightTheme }>
      { component }
    </ThemeProvider>
  )
}
