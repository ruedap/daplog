import styled from 'styled-components';
import logo from './footer-logo.svg';

// TODO: Inline SVG
const FooterLogo = styled.img.attrs({src: logo, alt: 'logo'})`
  opacity: 0.6;
  /* transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  } */
`

export default FooterLogo;
