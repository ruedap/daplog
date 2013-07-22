---
layout: article
title: "Macにwgetをインストールする"
date: 2010-12-29
comments: true
categories: mac
tags: mac
published: true
---

~~~ sh
$ curl -O ftp://ftp.gnu.org/pub/gnu/wget/wget-1.9.tar.gz
$ tar zxvf wget-1.9.tar.gz
$ cd wget-1.9
$ ./configure
$ make
$ sudo make install
$ which wget
~~~

* * *

<cite>[Snowleopardでwgetコマンドをインストールして使用する方法](http://d.hatena.ne.jp/qloog/20100410/1270827611)</cite>
