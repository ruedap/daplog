import React from 'react'
import { Time } from '.'

export default {
  title: 'atoms/time',
  component: Time
}

export const Default = () => <Time date="2020-07-26" />

Default.story = {
  name: 'to Storybook'
}
