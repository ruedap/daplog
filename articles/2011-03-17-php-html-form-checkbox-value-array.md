# <span>PHPでフォームのチェックボックスの値を</span><span>配列で受け取る</span>

フォームのcheckboxで複数選択された状態を、PHP側でどうやって受け取るのか知らなくて調べたら、配列っぽい名前を付ければ良いらしい。

<!-- READMORE -->


## PHPで書くと

HTML側でnameのところで末尾に `[]` を付けて配列っぽく書けば、

~~~ html
<input type="checkbox" name="foo[]" value="hoge" />hoge<br />
<input type="checkbox" name="foo[]" value="fuga" />fuga<br />
<input type="checkbox" name="foo[]" value="piyo" />piyo<br />
~~~

PHP側で配列で受け取れた。

~~~ php
<?php
$foo = $_post['foo'];
var_dump($foo);
~~~

~~~ php
array(3) {
  [0]=>
  string(4) "hoge"
  [1]=>
  string(4) "fuga"
  [2]=>
  string(4) "piyo"
}
~~~

あやうく知らずに無駄なコードを書いちゃうところだった。for文とか回して。

<cite>[崖っぷちWEBデザイナーブログ \| PHP checkboxの受け渡し](http://www.y-tti.com/blog/2007/10/php_checkbox.php)</cite>


## Ruby(Sinatra)で書くと

フレームワークを使わずに、素のRubyでWebアプリを書いたことがないからわからない。最近ハマってるSinatraで調べてみたらこんな感じ？言語とフレームワークの対比だとちょっとズルイけど。あれ、Sinatraでもやっぱり配列っぽい名前を付けるんだ。もしかして、Webアプリ全般の常識だったり…？

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'slim'
get '/' do
  slim :index
end
post '/' do
  params[:foo]
end
__END__
@@ index
! doctype html
html
  body
    form action='/' method='post'
      input type='checkbox' name='foo[]' value='hoge'
      input type='checkbox' name='foo[]' value='fuga'
      input type='checkbox' name='foo[]' value='piyo'
      input type='submit'
~~~

調べてみると、Railsでも同じ書き方をするみたい。

<cite>[rails check_boxで複数選択 - プログラマ 福重 伸太朗 ～基本へ帰ろう～](http://d.hatena.ne.jp/japanrock_pg/20070916/1189936732)</cite>

でも、Pythonは違うみたい。デフォルトで配列っぽいのに入れてくれるみたい。

<cite>[フォームのデータを取得する at wonder on server side](http://perl.wonder-boys.net/?p=151)</cite>

必ずしもこういう命名にすれば配列で受け取れる、というわけでは無いみたい。

---

<cite>[はじめてのSinatra - どっかのBlogの前置きのような](http://d.hatena.ne.jp/parrot_studio/20091211/1260503235)</cite>
