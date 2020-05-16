import styled from 'styled-components'

const Styleguide = () => {
  return (
    <>
      <Title>Styleguide</Title>
    </>
  )
}

export default Styleguide

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary}
`
