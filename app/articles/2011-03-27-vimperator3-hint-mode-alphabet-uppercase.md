---
layout: article
title: "<span>Vimperator 3のヒントモードで</span>アルファベットを使う"
date: 2011-03-27
comments: true
categories: vimperator
tags: vimperator
published: true
---

Vimperator 2系では、[char-hints-mod2.js](http://d.hatena.ne.jp/hogelog/20081219/p1)プラグインにお世話になっていた「ヒントモードでのアルファベット指定」が、Vimperator 3ではデフォルトのオプションで出来るようになったみたい。初期設定の数字指定はやっぱり使いづらかったのでアルファベットに変えた。その時に、指定した文字の*1文字目が無視される*挙動があったのと、*表示はアルファベットの大文字*にしたかったので、それぞれ解決してみた。

<!-- READMORE -->

## hintcharsオプション

Vimperator 3では、デフォルトで備わっている*hintchars*オプションでヒントモードで表示したい文字を指定できるみたい。

~~~ vim
set hintchars=abcde
~~~

ちなみに、Vimperator 2系で自分の環境では、char-hints-mod2.jsプラグインを使って以下のように指定していた。

~~~ vim
"" char-hints-mod2.js
let g:hintsio="iO"  "ヒント表示時は大文字で、押すときは小文字
let g:hintchars="FJKLASDHGUIONMERWC"
~~~

これと同じようにしたかったので、Vimperator 3で`.vimperatorrc`にとりあえずアルファベットを同じように指定してみた。

~~~ vim
set hintchars=fjklasdhguionmerwc
~~~

これで一応動作はしたんだけど、以下の2点が思い通りにならなかった。

1. 指定したアルファベットの1文字目が無視されるが、2周目の2文字目では出現する
2. 表示は大文字、押すのは小文字にしたかったけど、デフォルトではどちらも小文字のまま
応急措置的ではあるけど、以下の方法で2つとも解決できた。


## 1文字目が無視される現象

1つ目のは、指定した文字の1文字目が無視されるようで、しかも、2周目の2文字目には出現する、という<del datetime="2011-03-27T01:22:30+09:00">バグっぽい挙動をすることに気づいた。</del>数字で動作させる場合、0ではなく1から開始するために最初の1文字目は無視される、というのが現在の仕様でバグでは無いと、Twitterで[@rincaisui](https://twitter.com/#!/rincaisui/status/51669043853266945)さんと[@anekos](http://twitter.com/#!/anekos/status/51670690839011328)さんに教えてもらった。ありがとうございます。どういうことかというと、例えば以下のように指定した場合、

~~~ vim
set hintchars=abc
~~~

ヒントモードで割り振られるアルファベットは、従来[^1]は「a」「b」「c」「aa」「ab」となっていたけど、今回のバージョン3.0のhintcharsオプションだと1文字目のaが使用されずに「b」「c」「ba」「bb」「bc」となる。なので、アルファベットを指定する場合は、従来の感覚で指定してしまうと一番使用頻度を高くしたいはずの「a」が全然出てこないことになる。とりあえず回避策として、指定する1文字目を表示の2周目の2文字目に来ても良い文字にすることで違和感を無くした。

~~~ vim
set hintchars=ifjklasdhguonmerwc
~~~

自分は上記のように「i」を1文字目に置いてみた。2文字目以降が本来の優先的に表示してほしいアルファベット順。あと、細かいことだけど同じアルファベットを2個指定すると引数エラーになるので、「i」を2回指定する、みたいなことはできない。


## 表示は大文字、押すのは小文字

2つ目のは、ヒントモードに移ったときに画面に表示されるアルファベットは大文字だけど、キーを押すのはアルファベットの小文字（Shiftキーは押さない）にしたい、というもの。char-hints-mod2.jsプラグインでは、hintsioオプションで自由に組み合わせをすることができた。これは`.vimperatorrc`でヒントの表示部分を単にスタイルシートで大文字で表示するように`text-transform: uppercase;`を追加することで解決できた。該当箇所の1行はこんな感じ。

~~~ vim
hi Hint z-index:5000; font-size:14px; color:white; background-color:red; border-color:ButtonShadow; border-width:0px; border-style:solid; padding:0px 2px 0px 2px; position:absolute; font-family: Menlo, Consolas, Monaco, monospace; text-transform: uppercase;
~~~

ただし、Vimperator 3では、画像にリンクが貼られている場合などはalt属性を一緒に表示するようになったようで、このCSSを適用するとその文字列まで大文字化してしまう諸刃の剣。まぁこれは個人的には大丈夫だ問題ない。

これでVimperator 2系の時にchar-hints-mod2.jsプラグインを使っていたときとほぼ同じ動作・見た目になった。めでたしめでたし。

* * *

<cite>[Vimperator3.0 (Firefox4) の vimperatorrc:ファーファな日々](http://blog.livedoor.jp/bowlkun/archives/50435315.html)</cite>

[^1]: char-hints-mod2.js使用時
