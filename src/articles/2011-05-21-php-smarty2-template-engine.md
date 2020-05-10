# PHPでSmartyを使う

PHP 5.1.xで[Smarty](http://www.smarty.net/)（テンプレートエンジン）を使う必要が出てきたので、使い方を調べてみた。Smartyの最新版である*バージョン3はPHP 5.2以上が必要*なので、今回は必然的にSmarty 2になった。バージョン2系の最新版であるSmarty 2.6.26を使う。

<!-- READMORE -->


## とりあえず設置

[Smarty公式サイト](http://www.smarty.net/download)からSmarty 2.6.26をダウンロードしてきて解凍、中にある`libs`フォルダーーをSmarty2というフォルダーーにしておく。それと同じ階層に`index.php`を用意して、以下のコードを記述して、Smartyの読み込みが正常に行われていることを確認する。

~~~ php
<?php
    require_once("./Smarty2/Smarty.class.php");
    $smarty = new Smarty();
    var_dump($smarty);
?>
~~~


## Hello world

同梱されている`demo`フォルダーーが参考になる。けど、構造がちょっと複雑なので、単純化して最低限の構造でHello worldしてみる。まず、先ほど確認した`index.php`をベースに、以下のように内容を書き換える。

~~~ php
<?php
    require_once("./Smarty2/Smarty.class.php");
    $smarty = new Smarty();
    $smarty->assign("name", "Smarty2");
    $smarty->display("index.tpl");
?>
~~~

`index.php`と同じ階層に、`templates`フォルダーと`templates_c`フォルダーを作成する。両方必須。
`templates`フォルダーの方に`index.tpl`を作成し、内容を以下のように記述する。

~~~ php
<h1>Hello {$name}!</h1>
~~~

`templates_c`フォルダーの方はコンパイル用のフォルダーなので、中身は空っぽのままでおｋ これで`index.php`にアクセスすると、h1のHello Smarty2!が表示される。


## tplからtplを読み込む

[RailsやSinatraで言うパーシャル](/2011/05/18/ruby-sinatra-slim-partial)に相当するのかな？ `demo`フォルダーのtplまんまの構造だけど、`index.tpl`からヘッダーとフッターを分離して、`header.tpl`、`footer.tpl`を作成し、`index.tpl`からは`include`を使って以下のように読み込む。

~~~ php
{include file="header.tpl"}
<h1>Hello {$name}!</h1>
{include file="footer.tpl"}
~~~

基本的に波括弧で囲んだところはPHPコードとして実行されるっぽい。


## CSSやJavaScriptの波括弧をtplに含むには

最初にハマったのはこれ。例えば、テンプレート化したHTMLを含む`index.tpl`に、以下のようなCSSが書かれていたとする。

~~~ html
<style type="text/css">
<!--
p * {
margin: 0;
}
    - >
</style>
~~~

これをこのまま実行すると、前述のとおり本来波括弧はテンプレート内ではPHPコードを埋め込むために使われるので、エラーとなる。

~~~ sh
Fatal error: Smarty error: [in index.tpl line 16]: syntax error: unrecognized tag: margin: 0;
~~~

これを回避するための[専用のタグ](http://www.smarty.net/docs/ja/language.function.literal.tpl)が用意されていて、それが`{literal}{/literal}`とのこと。このリテラルタグで囲ったゾーンは、PHPコード用の波括弧とは認識しなくなる。

~~~ php
<style type="text/css">
<!--
{literal}
p * {
margin: 0;
}
{/literal}
    - >
</style>
~~~

Smarty 3以降なら通常これは考えなくて良いみたいで、良しなに解釈してくれるっぽい。でも今回使っているのはSmarty 2なので、上記のように専用の対策が必要。ちょっと面倒。Smartyの基本操作はこんな感じで、あとはどんな便利機能があるのかわからないけど、自分が普段個人でWebアプリを作っているときに使っているSinatra+Slimの組み合わせの[Slimテンプレート](http://slim-lang.com/)みたいな感じっぽいかな。

---

<cite>[早わかりSmarty3～PHP次世代テンプレートエンジンの予習とSmarty入門 - 遥か彼方の彼方から](http://d.hatena.ne.jp/tek_koc/20100423/1272010917)</cite>
