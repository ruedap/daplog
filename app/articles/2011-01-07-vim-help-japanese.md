---
layout: article
title: "Vimのヘルプを日本語にする"
date: 2011-01-07
comments: true
categories: vim
tags: vim
published: true
---

1. [Vim Documents in Japanese](http://www.kaoriya.net/vimdoc_j/) から「Vim日本語ドキュメント」のスナップショット版（vimdoc_ja-snapshot.tar.bz2）をダウンロードする
2. 解凍してできた`doc`フォルダと`syntax`フォルダを、`.vim`内[^1]にコピーする（Macの場合はペーストで置き換えにならないように注意）
3. Vimを起動して、以下のコマンドを実行する

~~~ vim
:helptags $HOME/.vim/doc  " Macの場合
:helptags $VIM/vimfiles/doc  " Windowsの場合
~~~

* * *

<cite>[日本語に翻訳されたvimエディタのヘルプをインストールして使用する。 ― 名無しのvim使い](http://nanasi.jp/posts/howto/help/help_ja.html)</cite>

[^1]: Windowsならvimfiles内
