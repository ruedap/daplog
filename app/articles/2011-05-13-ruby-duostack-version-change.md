---
layout: article
title: "<span>Duostackで使用するRubyのバージョンを</span><span>1.9.2に変更する</span>"
date: 2011-05-13
comments: true
categories: ruby
tags: ruby
published: true
---

昨日の[DuostackでHello world記事](/2011/05/12/ruby-duostack-sinatra-hello-world)で、初出時に間違って「DuostackはRuby 1.8系しか使えない」と書いてしまったけど、その後Duostackのドキュメントを見てたら[バージョンを変更する方法](http://docs.duostack.com/ruby/config-options#command-line-client-examples)の記述を見つけて、試してみたらちゃんとRuby 1.9.2も使えた。今回は備忘録がてらその方法を記事に。これまた[HerokuでRubyのバージョンを変更する手順](/2011/05/11/ruby-heroku-version-change)と良く似てるけど、微妙に違う。

<!-- READMORE -->


## Duostackで使用するRubyのバージョンを変更する

まず、Duostackアプリで現在使用しているRubyのバージョンを調べるには、`duostack config stack`コマンドを実行する。デフォルトでは下記の通り`autodetect`が選択されていて、自動判別されるっぽい？ 何を元に自動判別をするかはわからない。

~~~ sh
$ duostack config stack
* autodetect
  ruby-ree-1.8.7
  ruby-mri-1.9.2
  node-0.2.5
  node-0.4.0
  node-0.4.2
~~~

明示的に使用するRubyのバージョンを変更するには、`duostack config stack`コマンドの後ろに、変更したいバージョンの文字列を指定する。今回は1.9.2にするので、`ruby-mri-1.9.2`を指定する。

~~~ sh
$ duostack config stack ruby-mri-1.9.2
App will be migrated to ruby-mri-1.9.2 during next Git push.
~~~

~~~ sh
$ duostack config stack
  autodetect
  ruby-ree-1.8.7
* ruby-mri-1.9.2
  node-0.2.5
  node-0.4.0
  node-0.4.2
~~~

この時点ではバージョン変更の予約がされた状態で、実際に変更されるのは次に`git push`した時になる。試しに、[昨日使ったHello worldのコード](https://github.com/ruedap/duostack-hello-world/tree/1.0)に追加して、1.9.2を使うようにしてみる。`app.rb`を以下のように修正して、`git push`する。

~~~ ruby
# coding: utf-8
get '/' do
  'DuostackでSinatraを使ってHello world!'
end
get '/ruby_version' do
  "RUBY_VERSION = #{RUBY_VERSION}"
end
~~~

利用しているRubyのバージョンを返す組み込み定数を表示するためのパスを追加する。これでデプロイして、<http://duohelloworld.duostack.net/ruby_version>にアクセスすると、1.9.2にちゃんと変わっているのがわかる。

* * *

<cite>[Duostack &#183; Docs: Configuration Options](http://docs.duostack.com/ruby/config-options#command-line-client-examples)</cite>
<cite>[Herokuそっくり！DuostackでSinatraを使ってHello worldする](/2011/05/12/ruby-duostack-sinatra-hello-world)</cite>
