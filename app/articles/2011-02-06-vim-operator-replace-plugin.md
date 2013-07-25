---
layout: article
title: "<span>Vimでヤンクした文字列と対象を簡単に入れ替える</span><span>operator-replaceプラグインを使う</span>"
date: 2011-02-06
comments: true
categories: vim
tags: vim
published: true
---

[参考にした記事](http://vim.g.hatena.ne.jp/yamazakiccs/20090913)でも書かれているけど、このプラグインは文章では説明しづらいけど、使ってみるととても便利だと納得できる系。おすすめ。
大雑把に言うと、普段3ステップでやっているコピペ作業を、2ステップで出来るようにするプラグイン、という感じ。
<!-- READMORE -->

## インストール＆セットアップ
以下の2つのプラグインをインストールする。

<cite>[operator-user - Define your own operator easily : vim online](http://www.vim.org/scripts/script.php?script_id=2692)</cite>
<cite>[operator-replace - Operator to replace text with register content : vim online](http://www.vim.org/scripts/script.php?script_id=2782)</cite>

`.vimrc`には以下のように記述する。

~~~ vim
" _wなどでYankしてるもので置き換える
nmap _ <Plug>(operator-replace)
~~~

割り当てるキーは上記である必要はなく、[参考にした記事](http://vim.g.hatena.ne.jp/yamazakiccs/20090913)や[いつもvimrcの参考にさせてもらっているyuroyoroさんの記事](http://d.hatena.ne.jp/yuroyoro/20101104/1288879591)では<kbd>R</kbd>に割り当てていた。たしかにR(eplace)のほうが覚えやすいかもしれないけれど、上書きモードを潰すのはちょっと勿体無い気がしたので、とりあえずアンダースコアにした。


## operator-replaceプラグインの使い方

例えばこんなコードがあったとして、"you win."と出力させるために、`hoge`の値を"yay! yay!"に変えたくなったとする。

~~~ ruby
hoge = "booo! booo!"
if hoge == "yay! yay!"
  "you win."
end
~~~

普通は、

1. 3行目のif文の"yay! yay!"の中にカーソルを持って行き、<kbd>yi"</kbd>と打ってヤンクする
2. 1行目の変数hogeの"booo! booo!"の中にカーソルを持って行き、<kbd>di"</kbd>と打って中身を削除する
3. そのまま同じ位置で、<kbd>"0P</kbd>と打ってペーストする

という3ステップでコピペを完了させる。というか自分はそうしてる。これをoperator-replaceプラグインを使って操作すると、

1. 3行目のif文の"yay! yay!"の中にカーソルを持って行き、<kbd>yi"</kbd>と打ってヤンクする
2. 1行目の変数hogeの"booo! booo!"の中にカーソルを持って行き、<kbd>_i"</kbd>と打って中身を入れ替える

の2ステップでコピペができるようになる。地味だけど、かなり便利になる！

* * *

<cite>[vim神のplugin operator-replaceを導入してみて思ったこと - yamazakiccsのvim日記](http://vim.g.hatena.ne.jp/yamazakiccs/20090913)</cite>
