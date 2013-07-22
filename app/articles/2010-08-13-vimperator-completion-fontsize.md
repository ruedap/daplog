---
layout: article
title: "Vimperatorの補完リストの文字が小さいので直す"
date: 2010-08-13
comments: true
categories: vimperator
tags: vimperator
published: true
---

[前回](/2010/08/12/vimperator-statusbar-fontsize)の時に変更できなかった以下の部分をカスタマイズ出来るようになったのでメモ。

コマンドラインの表示時（\-\- CARET \-\-とか）や補完時（検索エンジンのリスト表示とか）のフォントは小さいままで、ここを変える方法がまだわかっていない。

あと、指定の仕方も前回より若干スマートに書けたっぽいけど、statuslineのフォント指定だけstyleコマンドの方法でしかうまく書けなかったので、全highlightコマンド化は力及ばず出来なかった。残念。

<!-- READMORE -->


## 補完リストの文字

`.vimperatorrc`に以下を記述。

~~~ vim
"" ステータスバーのフォントサイズを大きくする
style chrome://* <<EOM
#liberator-statusline {
    font-family: Menlo, Consolas, Monaco, monospace !important;
    font-weight: normal !important;
    font-size: 10pt !important;
    padding:2px 2px !important;
}
EOM
"" ステータスバー
hi StatusLine color: #000; background: #BBB; font-weight: normal; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace;
hi StatusLineSecure color: #000; background: #9CF; font-weight: normal;
hi StatusLineExtended color: #000; background: #9FF; font-weight: normal;
hi StatusLineBroken color: #FFF; background: #900; font-weight: normal;
"" コマンドライン
hi CmdLine color: #000; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; padding: 2px;
hi Normal color: #000; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " 通常時テキスト
hi InfoMsg color: #000; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; "通知メッセージ
hi ModeMsg color: #000; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; "モード表示
hi MoreMsg color: #000; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; "さらにモード表示
hi ErrorMsg color: #FFF; background: #F00; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " エラーメッセージ
hi LineNr color: #F00; background: #FFF; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " エラーの行番号
"" 補完リスト
hi CompTitle font-weight: bold; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " タイトル
hi CompResult width: 45%; overflow: hidden; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " 結果欄（左側）
hi CompDesc width: 50%; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " 説明欄（右側）
hi CompItem font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " 補完リストの1行
hi CompItem[selected] color: #FFF; background: #000; font-weight: normal; font-size: 10pt; font-family: Menlo, Consolas, Monaco, monospace; " 補完リストの選択している行
hi Filter color: #06E; font-weight: bold; " 補完リストでマッチしたテキスト
~~~

フォント（ちいさい文字）周りはこれである程度満足できる状態になった。

* * *

<cite>[うちのvimperator設定を晒してみる Ver.2.0 - Vivre Revive](http://d.hatena.ne.jp/lillilife/20090423/1240489978)</cite>
