import React from 'react'
import { Markdown } from '.'

export default {
  title: 'components/atoms/markdown/index',
  component: Markdown
}

// TODO: Implement each pattern of markdown styles
const body = `
  <h1>h1 見出し</h1>
  <h2>h2 見出し</h2>
  <h3>h3 見出し</h3>
  <h4>h4 見出し</h4>
  <h5>h5 見出し</h5>
  <h6>h6 見出し</h6>

  <p>Mattis curabitur penatibus pulvinar consequat taciti nunc aptent libero feugiat, vitae platea accumsan tristique ligula viverra sollicitudin dolor mollis est, tempor nibh hac netus adipiscing felis odio rutrum.</p>

  <p>Mattis curabitur penatibus pulvinar <a href="#">consequat</a> taciti nunc aptent libero feugiat, vitae platea accumsan tristique ligula viverra sollicitudin dolor mollis est, tempor nibh hac netus adipiscing felis odio rutrum.</p>
`

export const Default = () =>
  <Markdown body={ body } />
