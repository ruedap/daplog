import React from 'react'
import { FooterLogo } from '.'

export default {
  title: 'components/atoms/footer_logo/index',
  component: FooterLogo
}

export const Default = () =>
  <div style={ { background: '#000', width: '100%' } }>
    <FooterLogo />
  </div>
