---
layout: article
title: "<span>ターミナルからアプリを起動する</span><span>エイリアスを設定する</span>"
date: 2011-01-08
comments: true
categories: mac
tags: mac
published: true
---

ターミナルから、希望のアプリでファイルを開くためのエイリアスを設定しておくと便利、というページを見てなるほどと思ったので真似してみた。

<!-- READMORE -->


## エイリアスを設定

~~~ sh
$ alias firefox="open -a Firefox"
$ alias safari="open -a Safari"
$ alias prev="open -a Preview"
~~~

という設定を`.bashrc`に記述して、

~~~ sh
$ source ~/.bashrc
~~~

設定を反映させたら、

~~~ sh
$ firefox hoge.html
$ firefox *.html  # ワイルドカード指定もおｋ
~~~

な感じでコマンドを実行出来る。

* * *

<cite>[Macのアプリを、ターミナルから起動すると意外と便利だった：Goodpic](http://www.goodpic.com/mt/archives2/2007/09/mac_2.html)</cite>
