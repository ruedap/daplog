---
layout: article
title: "PHPでゼロパディング"
date: 2011-01-18
comments: true
categories: php
tags: php
published: true
---

他の言語でも一般的なsprintf関数を使う。

<!-- READMORE -->


## PHPでゼロパディング

~~~ php
<?php
for ($i = 1; $i <= 5; $i++) {
    echo sprintf('hoge_%05d.jpg', $i), PHP_EOL;
}
~~~

~~~ php
hoge_00001.jpg
hoge_00002.jpg
hoge_00003.jpg
hoge_00004.jpg
hoge_00005.jpg
~~~


## Rubyで書くと

Rubyにも[sprintf](http://rurema.clear-code.com/1.8.7/doc/print_format.html)はあるけど、この書き方のほうが短くて好き

~~~ ruby
1.upto 5 do |i|
  puts 'hoge_%05d.jpg' % i
end
~~~

* * *

<cite>[PHP: sprintf - Manual](http://jp.php.net/manual/ja/function.sprintf.php)</cite>
<cite>[instance method String#%](http://rurema.clear-code.com/1.8.7/method/String/i/=25.html)</cite>
