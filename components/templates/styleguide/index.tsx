import styled, { css, keyframes, Keyframes } from 'styled-components'

const Styleguide = () => {
  return (
    <>
      <Title>Styleguide</Title>
      <Tag1>Cool Styles</Tag1>
      <Tag2>
        With <code>:hover</code>.
      </Tag2>
      <Tag3 animation={bounce}>Let's bounce.</Tag3>
      <Tag3 animation={shake}>Let's shake.</Tag3>
    </>
  )
}

export default Styleguide

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`

const base = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 0 3rem 3rem;
  padding: 1rem 0.5rem;
`

const hover = css`
  &:hover {
    color: ${({theme}) => theme.colors.primary};
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`

const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

const shake = keyframes`
  10%, 90% { transform: translateY(-1px); }
  20%, 80% { transform: translateY(2px); }
  30%, 50%, 70% { transform: translateY(-4px); }
  40%, 60% { transform: translateY(4px); }
`

const Tag1 = styled.div`
  ${base};
`

const Tag2 = styled.div`
  ${base};
  ${hover};
  & code {
    background-color: linen;
  }
`

const Tag3 = styled.div<{ animation: Keyframes }>`
  ${base};
  ${hover};
  & code {
    background-color: linen;
  }
  animation: ${({ animation }) => animation } 0.2s infinite ease-in-out alternate;
`