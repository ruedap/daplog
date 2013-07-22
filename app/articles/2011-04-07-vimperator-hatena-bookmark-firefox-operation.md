---
layout: article
title: "<span>はてなブックマークFirefox拡張を</span><span>Vimperatorで操作する</span>"
date: 2011-04-07
comments: true
categories: vimperator
tags: vimperator
published: true
---

[はてなブックマークFirefox拡張](http://b.hatena.ne.jp/guide/firefox_addon)にはデフォルトで[Vimperatorから操作するためのプラグイン](https://github.com/hatena/hatena-bookmark-xul/wiki/Vimperator-%E3%81%A7%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E6%8B%A1%E5%BC%B5%E3%82%92%E4%BD%BF%E3%81%86)が同梱されていることを最近知った。なんてこった…今まではてブコメント見たりする時マウスで操作してた！ というわけで、その同梱プラグインを利用して、はてなブックマークFirefox拡張をキーボードから操作できるようにする。利用している環境はFirefox 4とVimperator 3の組み合わせ。

<!-- READMORE -->

## .vimperatorrcに記述

はてなブックマークFirefox拡張がインストールされている前提で、以下のように`.vimperatorrc`に記述した。

~~~ vim
"" hatenabookmark
" [https://github.com/hatena/hatena-bookmark-xul/wiki/Vimperator-%E3%81%A7%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E6%8B%A1%E5%BC%B5%E3%82%92%E4%BD%BF%E3%81%86](https://github.com/hatena/hatena-bookmark-xul/wiki/Vimperator-%E3%81%A7%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E6%8B%A1%E5%BC%B5%E3%82%92%E4%BD%BF%E3%81%86)
javascript if (typeof hBookmark != 'undefined') liberator.loadScript('chrome://hatenabookmark/content/vimperator/plugin/hatenabookmark.js', {__proto__: this});
nnoremap s :hbt<Space>
nnoremap S :hbtc<Space>
set complete+=H
~~~

3行目のjavascriptの行があれば、はてなブックマークFirefox拡張のVimperator用プラグインが利用可能になる。主な機能は以下。

|コマンド|説明|
|:-|:-|
|c|はてブ編集パネル表示|
|C|はてブコメント表示[^1]|
|:hb<CR>|はてブのトップページを新しいタブで開く|
|:hb hoge|hogeをはてブから検索してリストアップ|

個人的には、はてブへの登録は主にTomblooを経由して行っているので必要ないのだけど、表示しているページのはてブコメントを見ることと、過去に登録したはてブの検索は、わざわざそれらのページにジャンプして行っていたので、Vimperator上で一発で出来るようになってかなり楽になった。はてブコメントの表示が[公式解説にはトグル](https://github.com/hatena/hatena-bookmark-xul/wiki/Vimperator-%E3%81%A7%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E6%8B%A1%E5%BC%B5%E3%82%92%E4%BD%BF%E3%81%86)と書かれていたけど、自分の環境では表示がされるだけで、`Shift+C`を押しても閉じることはできなかった。普段`ESC`的に使っている`Ctrl+[`でも閉じることができず、本当の`ESC`キーの場合だけ閉じることができた。この点がちょっと残念。

`.vimperatorrc`に記述した下3行は個人的な設定で、とくに最後の`set complete+=H`が便利で、これを行っておくと、ノーマルモード時の`t`や`o`で新しいページを開くときに、検索対象としてはてブを含めることができる。例えば「hoge」で検索する場合、わざわざ`:hb hoge`とか、最初に設定した`s hoge`とかしなくても、普段使っている`t hoge`とすれば同じ結果を得られる。新しくコマンドを覚える必要もないので、シームレスに利用できてすばらしー。

* * *

<cite>[Vimperator ではてなブックマーク拡張を使う - GitHub](https://github.com/hatena/hatena-bookmark-xul/wiki/Vimperator-%E3%81%A7%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E6%8B%A1%E5%BC%B5%E3%82%92%E4%BD%BF%E3%81%86)</cite>
<cite>[vimpとはてなブックマーク拡張 - Vimple Star Sprites - vimperatorグループ](http://vimperator.g.hatena.ne.jp/teramako/20090803/1249303437)</cite>

[^1]: 公式ページにはトグルと書いてあるが、自分の環境では表示は出来るが閉じることができなかった
