---
layout: article
title: "MacのFinderで不可視ファイルを見えるようにする"
date: 2011-04-03
comments: true
categories: mac
tags: mac
published: true
---

Mac OS Xを再インストールして、Finderでドットファイルが見えなくなっているのに気づいて、どうやって表示させたか思い出せなくてググった。てっきりFinderのメニューとかから表示させられるのかと思ってたけど、ターミナルからコマンド打たないとできないんだね…。

<!-- READMORE -->


## ターミナルでコマンド実行

以下のコマンドをターミナルから実行すると、Finderが再起動されて不可視ファイルが表示されるようになる。

~~~ sh
$ defaults write com.apple.finder AppleShowAllFiles TRUE
$ killall Finder
~~~

戻す場合はTRUEの部分をFALSEに変えて再度実行すればおｋ こんなコマンド打った覚えさっぱり無いけど、再インストール前は表示されてたからやったってことだよなぁ。上記のようにターミナルから設定する以外にも[GUIで設定できるツール](http://kuroigamen.com/5)もあるみたい。今回は不可視ファイルだけ見られればよかったのでターミナルからコマンドを実行したけど、このツールの場合はそれ以外にもいろいろカスタマイズできるっぽい。

* * *

<cite>[MacのFinderで隠しファイルを表示する方法2つ - このブログは証明できない。](http://d.hatena.ne.jp/shunsuk/20090714/1247567640)</cite>
