import * as funcs from './abstractions/funcs'
import * as mixins from './abstractions/mixins'
import * as mq from './abstractions/mq'
import CustomProperties from './basics/custom_properties'
import Elements from './basics/elements'

const Styles = {
  funcs,
  mixins,
  mq,
  CustomProperties,
  Elements,
} as const

export default Styles
