---
layout: article
title: "<span>MacVimで</span>デフォルトのvimrcとgvimrcを読み込まない"
date: 2010-08-11
comments: true
categories: vim
tags: vim
published: true
---

`.vimrc`にほとんどの設定を記述するようにしておくと、優先順位的にデフォルトの`.gvimrc`が邪魔をしたりするので、あらかじめデフォルトの`.vimrc`と`.gvimrc`が読み込まないように設定しておく。

~~~ sh
$ echo "let g:vimrc_local_finish = 1\nset langmenu=ja_ja.utf-8.macvim" > /Applications/MacVim.app/Contents/Resources/vim/vimrc_local.vim && echo "let g:gvimrc_local_finish = 1" > /Applications/MacVim.app/Contents/Resources/vim/gvimrc_local.vim
~~~

* * *

<cite>[ぼちぼち散歩 MacVim-Kaoriyaでデフォルトのvimrcとgvimrcを読まないようにする](http://relaxedcolumn.blog8.fc2.com/blog-entry-153.html)</cite>
