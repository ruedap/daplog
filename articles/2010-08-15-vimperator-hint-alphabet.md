# <span>Vimperatorのfで表示するヒントを</span><span>アルファベットに変更する</span>

[char-hints-mod2.js](http://coderepos.org/share/browser/lang/javascript/vimperator-plugins/trunk/char-hints-mod2.js)をダウンロードして、`~/.vimperatorrc/plugin`に配置した上で、`.vimperatorrc`で以下のように設定する。

~~~ vim
"" char-hints-mod2.js
let g:hintsio="iO"  "ヒント表示時は大文字で、押すときは小文字
let g:hintchars="JKLASDFHGUIONMERWC"
~~~
