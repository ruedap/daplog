---
layout: article
title: "PHPの可変変数"
date: 2011-01-14
comments: true
categories: php
tags: php
published: true
---

PHPには可変変数というのがあって、文字列を別の変数の識別子として処理してその変数にアクセスする方法がある。

~~~ php
<?php
$hoge = 'hello, world';
$fuga = 'hoge';
echo $$fuga, PHP_EOL;
~~~

でちゃんと「hello, world」と出力される。ちょっとトリッキーな感じ。ところで、可変変数って言葉として合ってるのかな？ 変数ってそもそも可変なんじゃないかと最初見たとき思ったんだけども。可変変数の英語を調べると「Variable variables」とかこっちもちょっと変な感じだしｗ あとPHPにはスーパーグローバルとか、なんか違和感ある単語がちらほら出てくる。


## Rubyで書くと

Rubyだとこういう構文は用意されてないと思うから、[eval](http://rurema.clear-code.com/1.8.7/function/eval.html)を使うことになるのかなあ。

~~~ ruby
hoge = 'hello, world'
fuga = 'hoge'
puts eval fuga
~~~
