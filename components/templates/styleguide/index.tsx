import { Index2 } from './index2'
import { FooBar, FooBarTag4 } from './_foo_bar'
import styled, { css, keyframes, Keyframes } from 'styled-components'
import { StyledTag4 } from './_styled_tag4'
import { useSetAppState, useAppState } from '@/hooks/app_state'

const hover = css`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`

const prop = css`
  font-size: 200%;
  color: indigo;
`

const Styleguide = () => {
  const setAppState = useSetAppState()
  console.log(useAppState())
  return (
    <>
      <Index2 />
      <FooBar />
      <FooBarTag4 />
      <StyledTitle>Styleguide</StyledTitle>
      <div css={ prop }>This is css prop</div>
      <StyledTag1>Cool Styles</StyledTag1>
      <StyledTag2>
        With <code>:hover</code>.
      </StyledTag2>
      <StyledTag3 animation={ bounce }>Let&apos;s bounce.</StyledTag3>
      <StyledTag3 animation={ shake }>Let&apos;s shake.</StyledTag3>
      <StyledTag4>This is Styled.Tag4</StyledTag4>
      <button onClick={ () => setAppState({ themeName: 'dark' }) }>
        dark mode
      </button>
      <button onClick={ () => setAppState({ themeName: 'light' }) }>
        light mode
      </button>
    </>
  )
}

export default Styleguide

const StyledTitle = styled.h1`
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

const StyledTag1 = styled.div`
  ${base};
`

const StyledTag2 = styled.div`
  ${base};
  ${hover};
  & code {
    background-color: linen;
  }
`

const StyledTag3 = styled.div<{ animation: Keyframes }>`
  ${base};
  ${hover};
  & code {
    background-color: linen;
  }
  animation: ${({ animation }) => animation} 0.2s infinite ease-in-out alternate;
  content: "${({ theme }) => theme.colors.primary}";
`
