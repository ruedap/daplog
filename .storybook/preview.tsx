import React from 'react'
import { addDecorator } from '@storybook/react'
import { Wrapper } from './wrapper'

addDecorator(storyFn => <Wrapper>{ storyFn() }</Wrapper>)
