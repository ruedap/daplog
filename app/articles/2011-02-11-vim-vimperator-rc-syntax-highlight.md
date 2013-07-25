---
layout: article
title: "<span>Vimで.vimperatorrcファイルを</span><span>シンタックスハイライトする</span>"
date: 2011-02-11
comments: true
categories: vim
tags: vim
published: true
---

デフォルトの状態では、Vimperatorの設定ファイル`.vimperatorrc`をVimで開いてもシンタックスハイライトしないので、毎回とりあえず`:set ft=vim`としてシンタックスハイライトさせていた。

だけど、厳密にはvimrcとvimperatorrcのシンタックスは違うので、結構正常にハイライトされないところ（qmarkとかjavascript部分とか）があって気になってた。
そしたら、ちゃんと`.vimperatorrc`ファイルを[シンタックスハイライトさせる方法の記事](http://d.hatena.ne.jp/superbrothers/20100920/1284951292)を見かけたので、真似して自分の環境でも色が付くようにしてみた。

<!-- READMORE -->


## Mercurialが入ってる場合

Mercurialが入ってる場合は、リポジトリから最新版を持ってきて`make`する。

~~~ sh
$ hg clone [https://vimperator-labs.googlecode.com/hg/vimperator-labs](https://vimperator-labs.googlecode.com/hg/vimperator-labs)
$ cd vimperator-labs/vimperator/contrib/vim/
$ make
$ ls
Makefile	ftdetect	mkvimball.txt	syntax		vimperator.vba
~~~

んで、`vimperator.vba`をVimで開いて、`:so %`を実行してインストールして完了。


## Mercurialが入ってない場合

Mercurialが入ってない場合は、以下の`vimperator.vba`をダウンロードする。

<cite>[Issue 7 - vimperator-labs - Vim runtime files for the Vimperator filetype](http://code.google.com/p/vimperator-labs/issues/detail?id=7&q=project%3ALiberator%2CVimperator%20type%3Aplugin&colspec=ID%20Summary%20Project%20Type%20Status%20Priority%20Stars%20Owner)</cite>

んで、`vimperator.vba`をVimで開いて、`:so %`を実行してインストールして完了。

* * *

<cite>[続・Vim で .vimperatorrc を syntax-highlight する - すぱぶらの日記](http://d.hatena.ne.jp/superbrothers/20100920/1284951292)</cite>
<cite>[vimで.vimperatorrcのシンタックスハイライト - vimpがあればなんでもできるっ！](http://vimperator.g.hatena.ne.jp/snaka72/20100506/1273162257)</cite>
