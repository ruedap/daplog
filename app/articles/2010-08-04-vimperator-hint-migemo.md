---
layout: article
title: "<span>Vimperatorのfで</span><span>Migemo絞り込み</span>"
date: 2010-08-04
comments: true
categories: vimperator
tags: vimperator
published: true
---

- [XUL/Migemo](https://addons.mozilla.org/ja/firefox/addon/5239) の導入
- [migemo\_hint.js](http://coderepos.org/share/browser/lang/javascript/vimperator-plugins/trunk/migemo_hint.js) の導入
- `.vimperatorrc`ファイルに以下を追記

~~~ vim
" migemo_hint.js
set hintmatching=custom
~~~

通常（アルファベット）の絞り込みはスラッシュのあとにバックスラッシュして検索。

~~~ sh
/\vimperator
~~~

動作が結構重くなるので、バックスラッシュ検索をデフォルトにして、Migemoの方を何か足したときにMigemo検索、としたいところ。

* * *

<cite>[Vimpeartor の導入を考えている人へ - orz blog](http://d.hatena.ne.jp/masa138/20091012/1255357640)</cite>
