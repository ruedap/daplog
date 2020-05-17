import { createGlobalStyle } from 'styled-components'
import { fibo } from '../abstractions/funcs'

export default createGlobalStyle`
  :root {
    /* Color */
    --b-rgb-base: 24, 63, 83;
    --b-color-key1: rgba(var(--b-rgb-base), ${fibo('xs2', 'alpha')});
    --b-color-key2: rgba(var(--b-rgb-base), ${fibo('xs', 'alpha')});
    --b-color-key3: rgba(var(--b-rgb-base), ${fibo('sm', 'alpha')});
    --b-color-key4: rgba(var(--b-rgb-base), ${fibo('md', 'alpha')});

    --b-color-body: #21272d;
    --b-bgColor-body: var(--b-color-key1);
    --b-bgColor-content: #fff;
    
    --b-color-link: rgba(var(--b-rgb-base), ${fibo('md', 'alpha')});
    --b-color-link-visited: rgba(var(--b-rgb-base), ${fibo('lg', 'alpha')});
    --b-color-link-focus: rgba(var(--b-rgb-base), ${fibo('sm', 'alpha')});
    --b-color-link-hover: rgba(var(--b-rgb-base), ${fibo('sm', 'alpha')});
    --b-color-link-active: rgba(var(--b-rgb-base), ${fibo('xs', 'alpha')});
    
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
