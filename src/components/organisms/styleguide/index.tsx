import Styled from './styled'

const Styleguide = () => {
  return (
    <>
      <Styled.Tag1>Cool Styles</Styled.Tag1>
      <Styled.Tag2>
        With <code>:hover</code>.
      </Styled.Tag2>
      <Styled.Tag3 animation={Styled.bounce}>Let's bounce.</Styled.Tag3>
      <Styled.Tag3 animation={Styled.shake}>Let's shake.</Styled.Tag3>
    </>
  )
}

export default Styleguide
