import SvgFooterLogo from './footer_logo';
import styled from 'styled-components';

// TODO: link
const FooterLogo = styled(SvgFooterLogo)`
  .footer_logo_svg__circle {
    cursor: pointer;
    fill: rgba(255,255,255,0.55);
    transition: fill 0.3s;

    &:hover {
      fill: rgba(255,255,255,0.89);
    }
  }
`

export default FooterLogo;
