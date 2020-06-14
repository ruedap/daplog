import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    /* Color */
    
    /* Size */
    --b-maxWidth-container: 987px;
    --b-ratio-golden: 1.618;
    
    /* Font */
    --b-fontFamily-gothic: "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    --b-fontFamily-helvetica: "Helvetica Neue", Helvetica, Arial, var(--b-fontFamily-gothic);
    --b-fontFamily-lucida: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", var(--b-fontFamily-helvetica);
    --b-fontFamily-avenir: "Avenir Next", "Avenir", var(--b-fontFamily-helvetica);
    --b-fontFamily-fjalla: "Fjalla One", "Helvetica Neue", Helvetica, Arial, sans-serif;
    --b-fontFamily-montserrat: "Montserrat", var(--b-fontFamily-avenir);
    --b-fontFamily-mono: Consolas, "Liberation Mono", Courier, "Hiragino Kaku Gothic ProN", Meiryo, monospace;
    --b-fontFamily-georgia: Georgia, Cambria, "Times New Roman", Times, serif;
    --b-fontFamily-crimson: "Crimson Text", "YuMin", "Hiragino Mincho ProN", "Hiragino Mincho Pro", "MS PMincho", var(--b-fontFamily-georgia);
    --b-fontFamily-android: Roboto, "Droid Sans";
  }
`
