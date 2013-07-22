---
layout: article
title: "Rubyの正規表現で使える組み込み変数"
date: 2011-03-19
comments: true
categories: ruby
tags: ruby
published: true
---

似たような記号が多くて覚えづらいので書き出してみた。

<!-- READMORE -->


## 正規表現用の組み込み変数

以下のコードを実行した場合の出力結果を横にコメントで書いてみた。最低限覚えておいたほうがいいのは「$&」と「$数字」かな。ほかは使わないとすぐ忘れそう、というか使いたい時に思い出せなさそう。

~~~ ruby
"hoge fuga piyo poyo" =~ /(f\w+)\s(\w+)/
p $~  #=> #<MatchData "fuga piyo" 1:"fuga" 2:"piyo">
p $&  #=> "fuga piyo"
p $`  #=> "hoge "
p $'  #=> " poyo"
p $+  #=> "piyo"
p $1  #=> "fuga"
p $2  #=> "piyo"
~~~

それぞれの記号の解説と覚え方を、リファレンスマニュアルから抜粋。

|変数|覚え方|クラスメソッド|説明|
|-|-|-|-|
|`$~`|「~」はマッチに使われる|Regexp.last\_match|現在のスコープで最後に成功したマッチに関する MatchData オブジェクト|
|`$&`|いくつかのエディタでの「&」と同じ|Regexp.last\_match[0]|現在のスコープで最後に成功した正規表現のパターンマッチでマッチした 文字列|
|`` $` ``|「\`」は文字列の前に置かれる|Regexp.last\_match.pre\_match|現在のスコープで最後に成功した正規表現のパターンマッチでマッチした 部分より前の文字列|
|`$'`|「\`」は文字列の後ろに置かれる|Regexp.last\_match.post\_match|現在のスコープで最後に成功した正規表現のパターンマッチでマッチした 部分より後ろの文字列|
|`$+`|be positive and forward looking.|Regexp.last\_match[-1]|現在のスコープで最後に成功した正規表現のパターンマッチでマッチした 中で最後の括弧に対応する部分文字列|
|`$1`|「\1」のようなもの|Regexp.last\_match[1]|最後に成功したパターンマッチで1番目の括弧にマッチした値|
|`$2`|「\2」のようなもの|Regexp.last\_match[2]|最後に成功したパターンマッチで2番目の括弧にマッチした値|

* * *

<cite>[組み込み変数 - Rubyリファレンスマニュアル](http://www.ruby-lang.org/ja/man/html/_C1C8A4DFB9FEA4DFCAD1BFF4.html)</cite>
