# <span>Vimで正規表現をRubyっぽく書ける</span><span>eregex.vimプラグインを使う</span>

Vimデフォルトの正規表現はエスケープしまくらないといけないけど、それを軽減してRubyっぽい正規表現の書き方をできるようにしてくれるプラグイン。

<!-- READMORE -->


## eregex.vimプラグイン

<cite>[eregex.vim](http://www.vector.co.jp/soft/unix/writing/se265654.html)</cite>

例えば以下のテキストを一括してすべてfooに置き換える場合、

~~~ sh
hoge
fuga
piyo
poyo
~~~

Vimデフォルトの正規表現だと、

~~~ vim
:%s/\(hoge\|fuga\|piyo\|poyo\)/foo/g
~~~

とバックスラッシュ祭りになるけど、今回のeregex.vimなら、

~~~ vim
:%S/(hoge|fuga|piyo|poyo)/foo/g
~~~

のように書ける。`:%s`の部分を大文字の`:%S`にすればいいだけ。検索の場合は`/`が`:M/`になる。`?`はなし。これは個人的に必須プラグインになりそう。

* * *

<cite>[vimでPerlやRubyの拡張正規表現の置換や検索などを実現するeregex.vim](http://kaworu.jpn.org/kaworu/2010-11-28-1.php)</cite>
