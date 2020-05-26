import { Index2 } from './index2'
import { FooBar, FooBarTag4 } from './foo_bar'
import * as Styled from './styled'

const Styleguide = () => {
  return (
    <>
      <Index2 />
      <FooBar />
      <FooBarTag4 />
      <Styled.Title>Styleguide</Styled.Title>
      <div css={Styled.prop}>This is css prop</div>
      <Styled.Tag1>Cool Styles</Styled.Tag1>
      <Styled.Tag2>
        With <code>:hover</code>.
      </Styled.Tag2>
      <Styled.Tag3 animation={Styled.bounce}>Let's bounce.</Styled.Tag3>
      <Styled.Tag3 animation={Styled.shake}>Let's shake.</Styled.Tag3>
      <Styled.Tag4>This is Styled.Tag4</Styled.Tag4>
    </>
  )
}

export default Styleguide
