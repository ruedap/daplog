# Rubyのヒアドキュメントは高機能

YAMLについて調べてて[Rubyのリファレンスマニュアル](http://rurema.clear-code.com/1.8.7/method/YAML/s/load.html)を見たら、かっこいい記述がされててRubyのヒアドキュメントが高機能な事を知った。以下まとめ。

<!-- READMORE -->


## Rubyのヒアドキュメント

普通のヒアドキュメント

~~~ ruby
puts <<EOS
普通のヒアドキュメント
EOS
~~~

インデント対応

~~~ ruby
def hoge(word = nil)
  puts <<-EOS
    <<- のようにマイナス記号を付加すると
    終了ラベルをインデントしてもおｋになる
    細かいことだけどこれは#{word}重要
  EOS
end
hoge 'とても'
~~~

複数指定可能

~~~ ruby
puts <<HOGE, <<FUGA
こんな感じで1つの行に複数の開始ラベルを書くことで
HOGE
複数のヒアドキュメントを定義できる
FUGA
~~~

オブジェクトとして扱える

~~~ ruby
puts <<EOS.split("\n")[2..3].join
一番面白いと思ったのは
開始ラベルの <<EOS は式なので
戻り値のStringに対してメソッドを
呼び出せること
EOS
~~~

上の出力結果は以下

~~~ sh
戻り値のStringに対してメソッドを呼び出せること
~~~


## PHPで書くと

PHPのヒアドキュメントは上記のRubyと比べると、終了ラベルのインデントはできない、1行に複数は書けない、開始ラベルがオブジェクトにはならないのでメソッドは呼び出せない、あたりに違いがあるっぽい。あと終了ラベルの最後にセミコロンが必要（一部除く）。

~~~ php
<?php
echo <<<EOS
普通のヒアドキュメント
EOS;
~~~

インデントは不可

~~~ php
<?php
echo <<<EOS
終了ラベルはインデントできないので、これはParse error
  EOS;
~~~

複数定義も不可

~~~ php
<?php
echo <<<HOGE, <<<FUGA
ひとつの行に複数ヒアドキュメントを定義するのはできないので
HOGE;
これもParse errorになる
FUGA;
~~~

関数の引数に指定可能

~~~ php
<?php
var_dump(array(<<<EOS
関数の引数に使用することは可能
その時は終了ラベルにセミコロンを付けると
Parse errorになってしまうので注意
EOS
));
~~~

変数への代入も可能

~~~ php
<?php
$hoge = <<<EOS
変数に入れることも可能
EOS;
echo $hoge;
~~~

ただし、[こちらの記事](http://www.msng.info/archives/2010/12/reasons-to-avoid-here-document.php)でも触れられているように、インデントできないというのは、サンプルコードと違って実際のコード上ではかなり見た目が崩れることになってしまうので、なかなか使いづらいかもしれない。

* * *

<cite>[ヒアドキュメント (行指向文字列リテラル)](http://rurema.clear-code.com/1.8.7/doc/spec=2fliteral.html#here)</cite>
<cite>[PHP: 文字列 - Manual](http://www.php.net/manual/ja/language.types.string.php#language.types.string.syntax.heredoc)</cite>
