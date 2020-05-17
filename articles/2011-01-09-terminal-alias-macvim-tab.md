# <span>ターミナルから</span><span>MacVimを起動するときはタブで開く</span>

[以前Vimperator用にmvimコマンドを入れた](/2010/08/10/vimperator-macvim-mvim)けど、これはMacVimの環境設定で「外部からファイルを開くときにはタブで開く」の設定にしておいても、mvimコマンドからだと新規ウィンドウで開いてしまう。すでにMacVimのウィンドウが開かれている場合はウィンドウが2個になる。これの解決方法について。

<!-- READMORE -->


## ターミナルからMacVimを起動

この動作はVimperatorから<kbd>C-i</kbd>で開く場合には、入力後にMacVimのウィンドウを閉じることでVimperator側に反映させるので新規ウィンドウの方が都合が良いんだけど、ターミナルから普通にコマンドラインで指定して開く場合はタブで開いてほしい。どうしたものかなと調べていたら、そのものズバリの[解決方法を紹介してくれているページ](http://d.hatena.ne.jp/namutaka/20100116/1263666287)があった。

> 単にmvimコマンドを使うと、実行ごとに新しいウインドウが開いてしまう。
> せっかくタブ化できるんだから、タブで開きたい。
> そういうときは、mvimのオプションの--remote系を使うと、既存のVIMウインドウ内で、ファイルを開くことができる。
>
> <cite>[MacVimの起動方法いろいろ - namutakaの日記](http://d.hatena.ne.jp/namutaka/20100116/1263666287)</cite>

というわけで、このページで紹介されている方法で、`.bashrc`に設定を記述する。

~~~ sh
alias macvim="mvim --remote-tab-silent"
~~~

保存後に設定を反映させれば、

~~~ sh
$ source ~/.bashrc  # 設定を反映
$ macvim hoge.rb
~~~

みたいな感じで開ける。このオプション付きのコマンドを使った場合、MacVim側では環境設定の設定に左右されずにタブで開かれる。新規ウィンドウで開きたい場合は、従来通り`mvim`コマンドを使えばおｋ。


## 普通のエイリアスだとワイルドカード指定ができない？

~~~ sh
alias macvim2="open -a MacVim"
~~~

のような普通のエイリアス指定だと、ワイルドカード指定で複数ファイルを一気に開けないっぽいので、そういう意味でも上記の`mvim`経由の方が便利。

~~~ sh
$ macvim *.html  #=> mvim経由なら、該当するファイルがすべてタブ単位で開かれる
$ macvim2 *.html  #=> 普通のエイリアス指定だと、1個しか開かれない
~~~

---

<cite>[MacVimの起動方法いろいろ - namutakaの日記](http://d.hatena.ne.jp/namutaka/20100116/1263666287)</cite>