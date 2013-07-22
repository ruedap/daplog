---
layout: article
title: "SinatraとSlimの組み合わせでPartialする"
date: 2011-05-18
comments: true
categories: ruby
tags: ruby
published: true
---

Sinatraで[Slim](http://slim-lang.com/)というテンプレートエンジンを利用した場合にPartialする方法について。前からやりたかったんだけど、やり方がわからなくて、過去に自分で作ったWebアプリは結構HTMLコードを重複させていた。今回やっとやり方がわかったので、今後はちょっと重複を減らせるかも。[Sinatraのバージョン1.1でパーシャル機能が追加された](http://www.sinatrarb.com/faq.html#partials)ようで、結構シンプルな方法で使える模様。昔（ver.1.1より前）はこの機能は無かったので、自分でヘルパーメソッドを定義する必要があったみたい。

<!-- READMORE -->


## Partial（パーシャル）とは

PartialとはRailsにある機能で、通常のテンプレートファイルの中で使うさらに小さい単位のテンプレートファイル（とその展開方法）という感じかな？ 似たような機能に`layout.slim`と`== yield`を使ったレイアウト機能があって、これは対象のテンプレートの外側を包み込む動作をするけど、パーシャル機能はその逆で、対象のテンプレートの内側（内部）で展開する動作をする。両方の機能をSlimで使った場合のファイル構成としては、

- `layout.slim` （サイト全体で共通化できそうなレイアウト部分のテンプレート）
- `index.slim` （通常のテンプレート）
- `_partial.slim` （通常テンプレート間で共通化できそうな部分を外部化した部分テンプレート）

という感じになる。


## Sinatra+SlimでPartial

例えばパーシャル部分を`_fuga.slim`ファイルとして、中身のSlimコードは以下のように記述する。

~~~ slim
a href='http://nekostagram.heroku.com' Nekostagram!
~~~

パーシャル用のファイル名はアンダースコアで開始するのがRailsの習慣っぽいけど、Sinatraでは特にそういうのは無いみたい。アンダースコアで開始しなくても普通に使えた。ただ、パッと見ですぐパーシャル用ファイルとわかるので、自分はアンダースコアを付けた。あとCSSを書くときの[Sass](http://sass-lang.com/)のインポート用ファイル名がアンダースコアを付けるので、それと揃えたいってのもあるかな。

そんで、通常のテンプレートが`hoge.slim`だったとして、その中で先ほど作成したパーシャル用ファイル`_fuga.slim`を使いたい場合は、例えば`hoge.slim`の中で以下のように記述する。

~~~ slim
h1 My Favorite Links!
ul
  li
    a href='http://www.google.com' Google!
  li == slim :_fuga  # これ
  li
    a href='http://twitter.com' Twitter!
~~~

[Sinatraが対応しているテンプレートエンジン](http://www.sinatrarb.com/intro-jp.html#%E3%83%93%E3%83%A5%E3%83%BC%20/%20%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)なら、すべて上記のようにテンプレート名のメソッドが用意されてると思う。たぶん。Hamlなら`haml :_fuga`、ERBなら`erb :_fuga`になるんじゃないかな。たぶん。Railsの場合、ファイル名にはアンダースコアをつけて、呼び出すシンボル名にはアンダースコアをつけなかったりするけど、Sinatraはパーシャル用ファイル名にアンダースコアをつけることを義務付けられているわけではないので、ファイル名にアンダースコアを付けたら、呼び出し時のシンボル名にも付ける必要がある。

あとは、いつもどおりに`app.rb`内のどこかで、テンプレートを実行するメソッドを書いて実行する。要は、このいつも使ってたやつと同じ記法でSlimコード内でも書けばパーシャル出来るようになるってわけだったのね。シンプルでいい。

~~~ ruby
get '/' do
  slim :hoge
end
~~~

これでSinatraアプリを実行すると、`hoge.slim`の中で指定しているパーシャル`_fuga.slim`がちゃんと展開された上で、`hoge.slim`が表示される。もちろん、この`_fuga.slim`は`hoge.slim`以外のファイルでも利用可能。というかそれが目的。


## 注意点

注意点としては、Slimはデフォルトで出力時にHTMLエスケープするので、PartialのときはそのデフォルトのHTMLエスケープをOFFにする記法「==」を使わなければいけない。エスケープする方の「=」を使うと、以下のような出力になってしまうので注意されたし。

~~~ text
My Favorite Links!
Google!
<a href="http://nekostagram.heroku.com">Nekostagram!</a>
Twitter!
~~~

これでHTMLもちょっとはDRYにできるかな！

* * *

<cite>[Sinatra: Frequently Asked Questions](http://www.sinatrarb.com/faq.html#partials)</cite>
