import React from 'react';
import Header from './components/molecules/header'
import './App.css';
import styled from 'styled-components'

const Wrapper = styled.div`
  color: #333;
  background-color: #fff;
  background-color: #000;
`

const App = () => (
  <Wrapper>
    <Header />
  </Wrapper>
);

export default App;
