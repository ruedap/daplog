import React from 'react'
import { HeaderLogo } from '.'

export default {
  title: 'components/atoms/header_logo/index',
  component: HeaderLogo
}

export const Default = () =>
  <div style={ { background: '#000', width: '100%' } }>
    <HeaderLogo />
  </div>
