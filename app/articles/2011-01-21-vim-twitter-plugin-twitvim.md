---
layout: article
title: "<span>VimがTwitterクライアントになる</span>TwitVimプラグインを使う"
date: 2011-01-21
comments: true
categories: vim
tags: vim
published: true
---

[世の中を変えるにはTwitterをやってちゃダメ](http://el.jibun.atmarkit.co.jp/rails/2011/01/twitter-c545.html)っぽいけど、ぼくはTwitterがけっこう好きなのでVimからでもツイートできるようにするためのプラグイン[TwitVim](http://www.vim.org/scripts/script.php?script_id=2204)を使ってみる。

いつものようにGoogle先生にお尋ねしてTwitVimのインストールや設定方法を調べていたのだけど、古い情報[^1]では`.vimrc`に直接IDとパスワードを記述する方法で説明されていた。Base64にエンコードうんぬんってのもそれ。

今のバージョンのやつはOAuthに対応しているので、その必要はなくなったみたい。

<!-- READMORE -->


## Windowsの場合はcURL/OpenSSLの準備が必要

[こちら](http://www.limber.jp/?Software%2FOpenSSL%20for%20Windows)から、curl-7.15.5-win32-ssl.zipとopenssl-0.9.8q-win32-bin_dynamic.zipをダウンロードして、解凍して出てきたcurl.exe、libeay32.dll、openssl.exe、ssleay32.dllの4つのファイルをパスが通ったところにコピーしておく。


## TwitVimのインストール

<cite>[TwitVim - Twitter client for Vim : vim online](http://www.vim.org/scripts/script.php?script_id=2204)</cite>

から最新のtwitvim-0.6.1.vbaをダウンロードしてきてそのファイルをVimで開く。んでコマンドラインモードで、以下を実行してインストールする。

~~~ vim
:so %
~~~

自分は`pathogen.vim`を使っているので、各フォルダに散らばったTwitVim関連のファイルを1つにまとめて`bundle`フォルダの中に移動する。Vimを再起動。


## TwitVimの設定とTwitterの認証

コマンドラインモードで、

~~~ vim
:SetLoginTwitter
~~~

と入力すると、

~~~ text
Received response from is.gd.
Visit the following URL in your browser to authenticate TwitVim:
http://is.gd/○○○○
Enter Twitter OAuth PIN:
~~~

と表示されるので、3行目のURLにジャンプすると、「TwitVimによるアクセスを許可しますか？」とでるので許可する。するとページには7桁の暗証番号が表示されるので、それを上記の4行目（Enter Twitter OAuth PIN:）のところに入力する。

暗証番号を入力すると、認証処理が行われて「Twitter login succeeded.」とコマンドラインに表示されればセットアップ完了。ためしに、

~~~ sh
:FriendsTwitter
~~~

と打ってみるとタイムラインが表示された。


## TwitVimの.vimrc設定

今のところこんな感じ。デフォルトの動作ではタイムラインを表示したバッファにカーソルが移らないので、キーマップついでに移動するようにしてみた。

~~~ vim
""" twitvim
let twitvim_count = 40
nnoremap ,tp :<C-u>PosttoTwitter<CR>
nnoremap ,tf :<C-u>FriendsTwitter<CR><C-w>j
nnoremap ,tu :<C-u>UserTwitter<CR><C-w>j
nnoremap ,tr :<C-u>RepliesTwitter<CR><C-w>j
nnoremap ,tn :<C-u>NextTwitter<CR>
autocmd FileType twitvim call s:twitvim_my_settings()
function! s:twitvim_my_settings()
  set nowrap
endfunction
~~~


* * *

<cite>
  [aruy.net &#187; Blog Archive &#187; twitvim](http://aruy.net/archives/565)
</cite>

[^1]: 特に2010年8月のBasic認証廃止前
