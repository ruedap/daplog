import { useContext } from 'react'
import { AppStateContext, SetAppStateContext } from '@/contexts/app_state'

export const useAppState = () => {
  return useContext(AppStateContext)
}

export const useSetAppState = () => {
  return useContext(SetAppStateContext)
}
