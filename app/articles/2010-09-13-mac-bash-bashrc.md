---
layout: article
title: "ターミナル起動時に.bashrcを読み込むようにする"
date: 2010-09-13
comments: true
categories: mac
tags: mac
published: true
---

Mac OS Xのデフォルトでは、HOMEに`.bashrc`を作成してもターミナル起動時に自動で読み込むようにはなっていないようなので、自動で読み込むように`.bash_profile`に記述すると良い模様。

<!-- READMORE -->


## .bash\_profileを作成

HOMEに`.bash_profile`を作成して以下を記述。

~~~ sh
if [ -f ~/.bashrc ] ; then
. ~/.bashrc
fi
~~~

これでターミナルを再起動すれば、起動時に自動的に`.bashrc`を読み込んでくれる。

* * *

<cite>[とあるプログラマーの覚書 OSXでのbashrcの設定](http://memo358.blog18.fc2.com/blog-entry-30.html)</cite>
