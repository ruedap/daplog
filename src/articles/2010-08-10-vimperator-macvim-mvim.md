# <span>VimperatorでMacVimを</span><span>set editorするためにmvimを導入</span>

テキストエリアなどで<kbd>ctrl+i</kbd>するとMacVimで編集できるように。

- [mvimファイル](http://repo.or.cz/w/MacVim/KaoriYa.git/blob_plain/HEAD:/src/MacVim/mvim)をダウンロードする
- ダウンロードした`mvim`を`/usr/bin`に入れる
- `mvim`に実行権限を付ける

~~~ sh
chmod u+x mvim
~~~

- `.vimperatorrc`にエディタ指定を記述する

~~~ vim
set editor=set editor='/usr/bin/mvim -f'
~~~

---

<cite>[MacVimをいれたら、mvimコマンドもいれるべし - namutakaの日記](http://d.hatena.ne.jp/namutaka/20100419/1271694518)</cite>
<cite>[Vimperatorの外部エディタでmacvim-kaoriyaを使う - vimまっしぐら★ - vimグループ](http://vim.g.hatena.ne.jp/tokorom/20090728/1248807395)</cite>
