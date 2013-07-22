---
layout: article
title: "<span>Vimで現在割り当てられている</span>ショートカットキーの一覧を見る"
date: 2011-01-11
comments: true
categories: vim
tags: vim
published: true
---

Vimでどのキーに既にショートカットキーが割り当てられていて、どのキーが空いてるのか、をどうやって調べるんだろうと疑問に思ってた。
[昨日の記事](/2011/01/10/vim-unite-plugin)で、「Vimに割り当てられてるショートカットキーを調べる方法ってあるの？」と聞いてみたところ、[unite.vimの設定を参考](http://blog.remora.cx/2010/12/vim-ref-with-unite.html)にさせてもらった[delphinus35](http://blog.remora.cx/)さんに教えてもらえた。ので自分の備忘録と、同じ疑問を持ってる人がいるかも知れないのでエントリー化しておく。

<!-- READMORE -->


## デフォルトで割り当てられているショートカットキー

Vimのデフォルトのショートカットキー割り当てを調べるには、以下のテキストを`help`コマンドで参照する。

~~~ vim
:help index.txt
~~~

[Vimのヘルプを日本語化](/2011/01/07/vim-help-japanese)していれば、日本語で一覧が表示される。たとえば、ノーマルモードでのデフォルトの割り当ては以下のような感じ。

|タグ|文字|注|ノーマルモードでの動作|
|-|-|:-:|-|
| |CTRL-@| |未使用|
|CTRL-A|CTRL-A|2|カーソル位置/カーソルより後ろにある数字に N を加える。|
|CTRL-B|CTRL-B|1|ウィンドウを N 画面上へスクロール。|
|CTRL-C|CTRL-C| |現在の(検索)コマンドを中断する。|
|CTRL-D|CTRL-D| |ウィンドウを N 行下へスクロールする。(省略時は半画面)|
|CTRL-E|CTRL-E| |ウィンドウを N 行下へスクロールする。|
|CTRL-F|CTRL-F|1|ウィンドウを N 画面下へスクロール。|
|CTRL-G|CTRL-G| |現在のファイル名とカーソル位置を表示する。|
| | | |（以下省略）|

ショートカットキーの動作のさらに詳しい説明を知りたい場合は、一番左のタグの部分を使ってヘルプを参照すれば、詳しい情報が出てくる。（`:help CTRL-A`とか）


## 自分またはプラグインが割り当てたショートカットキー

`.vimrc`に記述することで自分で割り当てた、または、プラグインをインストールすることで自動で割り当てられたショートカットキーを調べるには、以下のコマンドを使う。

~~~ vim
:map
~~~

~~~ vim
:nmap   " ノーマルモードだけ表示
:imap   " インサートモードだけ表示
:vmap   " ビジュアルモードだけ表示
~~~

~~~ vim
:verbose nmap   " そのショートカットキーの定義元ファイル情報も表示
~~~

たとえば一番最後の`:verbose nmap`を実行すると、以下のような一覧が表示される。

|n|\<C-E\>A|\<Plug\>ZenCodingAnchorizeSummary|
| | |Last set from ~/.vim/bundle/zencoding-vim/plugin/zencoding.vim|
|n|\<C-E\>a|\<Plug\>ZenCodingAnchorizeURL|
| | |Last set from ~/.vim/bundle/zencoding-vim/plugin/zencoding.vim|
|n|\<C-E\>k|\<Plug\>ZenCodingRemoveTag|
| | |Last set from ~/.vim/bundle/zencoding-vim/plugin/zencoding.vim|
| | |（以下省略）|

この部分は[zencodingのプラグイン](http://www.vim.org/scripts/script.php?script_id=2981)を入れたことによって、自動で定義されたショートカットキーで、`verbose`コマンドを入れることで「Last set from～」の部分が表示されるようになる。ちなみにこのzencodingプラグインは、デフォルトでは`<C-Y>`が設定されているが、自分の場合`.vimrc`で`<C-E>`に変える設定を書いてあるので上記の様にそれが反映されて表示されている。


## まとめ

ということで、[昨日の記事](/2011/01/10/vim-unite-plugin)でも書いた疑問、

> いつも新しいプラグインを入れて、`.vimrc`にショートカットキーを割り当てる記述をするときに、どのキーが空いてて、どのキーがデフォルトで埋まってて、どのキーに自分がキーを割り当てたか、がすぐにわからなくて悩む。

を解決するには、

`:h index.txt`でVimデフォルトで割り当てられていないかを確認後、`:verb map`で自分またはプラグインが割り当てていないかを確認すればおｋ
