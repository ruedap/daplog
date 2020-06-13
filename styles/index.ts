import * as funcs from './abstracts/funcs'
import * as mixins from './abstracts/mixins'
import * as mq from './abstracts/mq'
import CustomProperties from './basics/custom_properties'
import Elements from './basics/elements'

const Styles = {
  funcs,
  mixins,
  mq,
  CustomProperties,
  Elements
} as const

export default Styles
