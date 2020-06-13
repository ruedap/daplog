import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '@/styles/theme'

interface AppState {
  // TODO: Add null
  themeName: 'light' | 'dark'
}

const initialAppState: AppState = {
  themeName: 'light'
}

export const AppStateContext = createContext<AppState>(initialAppState)
export const SetAppStateContext = createContext<
Dispatch<SetStateAction<AppState>>
>(() => {})

export const AppStateProvider = (props: {
  initialAppState?: AppState
  children: React.ReactNode
}) => {
  const [appState, setAppState] = useState<AppState>(
    props.initialAppState ?? initialAppState
  )
  return (
    <AppStateContext.Provider value={ appState }>
      <SetAppStateContext.Provider value={ setAppState }>
        <AppStateContext.Consumer>
          { value => (
            <ThemeProvider theme={ value.themeName === 'light'
              ? lightTheme : darkTheme
            }>
              { props.children }
            </ThemeProvider>
          ) }
        </AppStateContext.Consumer>
      </SetAppStateContext.Provider>
    </AppStateContext.Provider>
  )
}
