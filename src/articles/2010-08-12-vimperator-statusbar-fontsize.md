# <span>Vimperatorのステータスバーの</span><span>文字が小さいので直す</span>

コメント欄でid:teramakoさんにアドバイスいただいた方法で調べてみたら、`.vimperatorrc`で設定できたっぽいのでそちらの方法をメモ。

<!-- READMORE -->


## ステータスバーの文字

`.vimperatorrc`に以下を記述。

~~~ css
style chrome://* <<EOM
#liberator-commandline { /* command line */
    font-family: Menlo, "M+1VM+IPAG circle", Monaco, monospace !important;
    background-color: #222 !important;
    color: #fff !important;
    font-weight: normal !important;
    font-size: 12pt !important;
}
#liberator-statusline { /* url, progress arrow, [n/n] n% */
    font-family: Menlo, "M+1VM+IPAG circle", Monaco, monospace !important;
    font-weight: normal !important;
    font-size: 10pt !important;
    padding:2px 2px !important;
}
.hl-StatusLine { /* regular page */
    background-color: #000 !important;
    color: #B0FF00 !important;
}
.hl-StatusLineSecure { /* secure page */
    background-color: #B0FF00 !important; /* light green */
    color: black !important;
}
EOM
~~~

ちなみにステータスバーの入力時には望みどおりのフォント・フォントサイズになってるけど、表示時（`-- CARET --`とか）や補完時（検索エンジンのリスト表示とか）のフォントは小さいままで、ここを変える方法がまだわかっていない。たぶん指定するIDかクラスがあるんだろうけど、まぁそのうち。それにしてもVimperatorは初期状態のフォントサイズが全部ちいさい。

* * *

<cite>[CSS関連まとめ - vimpめも - vimperatorグループ](http://vimperator.g.hatena.ne.jp/blue_ring/20100307/1267923384)</cite>
