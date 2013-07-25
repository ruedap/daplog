---
layout: article
title: "<span>Vimperatorのビジュアルモードで</span><span>選択した文字列をGoogle検索する</span>"
date: 2010-12-31
comments: true
categories: vimperator
tags: vimperator
published: true
---

検索したい文字列の選択は[caret-hint.js](http://coderepos.org/share/browser/lang/javascript/vimperator-plugins/trunk/caret-hint.js?rev=36960)が便利過ぎるので必須。

<!-- READMORE -->

`.vimperatorrc`に以下を記述。

~~~ vim
"ビジュアルモードで選択文字列を<C-g>でGoogle検索
vmap <silent> <C-g> y<Esc><Esc>P
~~~

これWindowsのVimperatorだと動かないっぽい？

* * *

<cite>[めも - Vimperatorでビジュアルモードから一発でGoogle検索](http://memo.officebrook.net/20090803.html)</cite>
