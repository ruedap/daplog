---
layout: article
title: "<span>ターミナルでディレクトリやファイルの構造を</span><span>ツリー表示する</span>"
date: 2011-01-15
comments: true
categories: mac
tags: mac
published: true
---

そのまんまの名前で`tree`コマンド。表示したいカレントディレクトリでコマンドを打つとこんな感じに表示してくれる。

<!-- READMORE -->


## treeコマンド

~~~ sh
$ tree
.
├── controllers
│&#160;&#160; ├── application_controller.rb
│&#160;&#160; └── cards_controller.rb
├── helpers
│&#160;&#160; ├── application_helper.rb
│&#160;&#160; └── cards_helper.rb
├── models
│&#160;&#160; └── card.rb
└── views
    ├── cards
    │&#160;&#160; ├── edit.html.erb
    │&#160;&#160; ├── index.html.erb
    │&#160;&#160; ├── new.html.erb
    │&#160;&#160; └── show.html.erb
    └── layouts
        └── cards.html.erb
6 directories, 10 files
~~~

インストール。

~~~ sh
$ sudo port search tree #確認
$ sudo port install tree
~~~

ディレクトリだけ表示したい場合は`-d`オプションを付ける。

~~~ sh
$ tree -d
~~~

その他にも、ドットファイルも出力する`-a`、サイズを表示する`-h`、何階層目まで出力するか指定する`-L`オプションなどがある。

* * *

<cite>[UNIXの部屋 コマンド検索:tree (*BSD/Linux)](http://x68000.q-e-d.net/~68user/unix/pickup?tree)</cite>
