---
layout: article
title: "<span>VimperatorがTwitterクライアントになる</span>Twittperatorプラグインを使う"
date: 2011-01-22
comments: true
categories: vimperator
tags: vimperator
published: true
---

[世の中を変えるにはTwitterをやってちゃダメ](http://el.jibun.atmarkit.co.jp/rails/2011/01/twitter-c545.html)っぽいけど、ぼくはTwitterがけっこう好きなのでVimperatorからでもツイートできるプラグイン[Twittperator](http://vimperator.g.hatena.ne.jp/teramako/20100702/1278104239)を使ってみる。

セットアップの流れは[昨日のTwitVim](/2011/01/21/vim-twitter-plugin-twitvim)とほぼ同じ。クライアント側で認証申請→Twitter側で許可して認証番号取得→クライアント側で認証番号入力。

キーマップもTwitVimと同じに設定することで、PCを使っているときにもっとも長時間使うエディタとブラウザ、どちらでも同じショートカットキーでTwitterにつぶやける環境を構築できて最強になる。海賊王にもなる。

<!-- READMORE -->


## Twittperatorのインストール

<cite>[twittperator.js at master from vimpr's vimperator-plugins - GitHub](https://github.com/vimpr/vimperator-plugins/blob/master/twittperator.js)</cite>

をダウンロードして`.vimperator/plugin`に配置する。Firefoxを再起動。


## Twittperatorのセットアップ

~~~ sh
:tw -getPIN
~~~

とコマンドラインモードで打ち込むと、Twitterの認証ページが表示されるので、許可して暗証番号を取得する。

~~~ sh
:tw -setPIN XXXXXXX
~~~

をして、XXXXXXXの部分にさきほど取得した暗証番号を入力する。

~~~ sh
[Twittperator] getting access token in success
~~~

と表示されればセットアップ完了。


## Twittperatorの基本操作

タイムラインを取得する。

~~~ sh
:tw
~~~

タイムラインを取得する。（強制リロード）

~~~ sh
:tw!
~~~

ツイートする。

~~~ sh
:tw ほげほげ
~~~


## 今見てるページについてツイートする

せっかくブラウザを使っているんだから、今見ているページへのリンクと共に、ツイートしたいと思うのが人情。どうやってやるんだろうと、Google先生に尋ねてみたら[既に同じ疑問を持った人](http://d.hatena.ne.jp/zenpou/20101114/1289739386)がいて、しかもそのブログのコメント欄に作者さんがサンプルコードを載せてくれていたので、それを使わせてもらった。感謝。

~~~ vim
nnoremap ,tt :<C-u>js commandline.open(":",["tw",buffer.title,buffer.URI].join(" "),modes.EX)<CR><C-a><Right><Right><Right><Space>/<Space><Left><Left><Left>
~~~

こんな感じで.vimperatorrcに書いておく。


## Twittperatorの.vimperatorrc設定

ってことで今のところのTwittperatorの`.vimperatorrc`はこんなかんじ。基本的にTwitVimもTwittperatorもつぶやきメインの目的で使う予定なので、タイムラインを見るための設定とかはほとんどしてない。

~~~ vim
""" twittperator.js
nnoremap ,tp :<C-u>tw 
nnoremap ,tf :<C-u>tw!<CR>
nnoremap ,tu :<C-u>tw!@<CR>
nnoremap ,tt :<C-u>js commandline.open(":",["tw",buffer.title,buffer.URI].join(" "),modes.EX)<CR><C-a><Right><Right><Right><Space>/<Space><Left><Left><Left>
~~~

* * *

<cite>[OAuth対応Twitterクライアント： twittperator.js - Vimple Star Sprites - vimperatorグループ](http://vimperator.g.hatena.ne.jp/teramako/20100702/1278104239)</cite>
