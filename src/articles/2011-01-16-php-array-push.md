# PHPで配列のpush

PHPerな人には当たり前なんだろうけど、配列要素の追加（push）にこういう（[]=）シンタックスシュガーがあるとは知らなくて、PHPのマニュアルで関数探して、

~~~ php
<?php
$a = array('hoge');
array_push($a, 'fuga');
~~~

って[書いてた](/2010/12/27/php-array)。「なんて冗長なpushの仕方なんだ！」とか思ってた自分はずかしい。

<!-- READMORE -->

## PHPで書くと

というわけで、PHPでの配列のpushに関しては以下の記法が一般的っぽいかな。結構曖昧な書き方してもちゃんと認識してくれるっぽい。

~~~ php
<?php
$a = array('hoge', 'fuga');
$a[] = 'piyo';
$a[] = 'poyo';
// 最初の代入であれば初期化もやってくれる
$b[] = 1;  // 初期化＆代入
$b[] = 2;
$b[] = 3;
// 記述の仕方もかなりアバウト（空白あり・なし）でもおｋっぽい
$c[]=1;
$c[]= 2;
$c[] =3;
$c [] = 4;
$c []= 5;
~~~



## Rubyで書くと

Rubyだと上記のシンタックスシュガーに近いものだとArray#<<になるかな。ただし、PHPと違って最初に変数の初期化が必要。

~~~ ruby
a = []
a << 'piyo'
a << 'poyo'
p a
b << 1  #=> 初期化してないと NameError
# Rubyも意外とアバウトな書き方しても大丈夫っぽい
c = []
c<< 1
c <<2
c<<3
c < < 4  #=> さすがにこれは駄目だった syntax error
p c
# 連続して書けるみたい
d = []
d << 1 << 2 << 3 << 4
p d
# ふつーのpush
e = []
e.push 1
e.push 2
e.push 3
e.push 4, 'piyo', 'poyo'  #=> pushも連続して書けるみたい
p e
~~~

連続して書けるのは知らなかった！

* * *

<cite>[instance method Array#&lt;&lt;](http://rurema.clear-code.com/1.8.7/method/Array/i/=3c=3c.html)</cite>
