---
layout: article
title: "Sinatraでファイルのアップロード"
date: 2011-02-27
comments: true
categories: ruby
tags: ruby
published: true
---

Sinatraでファイルのアップロードをする場合、Rackのparamsを使って行うみたい。

<!-- READMORE -->

## Sinatra 1.1.xでSlim
まず、Sinatraでテンプレートエンジンに[Slim](http://slim-lang.com/)を使いたい場合は、Sinatra 1.2まで待つか、以下の記事を参考にモジュールを再オープンしてモンキーパッチングすると使えるようになるみたい。

<cite>[Hamlとたいして変わらないSlim - komagata ［p0t］](http://docs.komagata.org/4703)</cite>

~~~ ruby
# Sinatra 1.1.x 以前で Slim を使う
module Sinatra
  module Templates
    def slim(template, options={}, locals={})
      render :slim, template, options, locals
    end
  end
end
Slim::Engine.set_default_options :pretty => true
~~~

このパッチを使った場合は`@@ layout`は使えないようなので、毎回頭から全部Slimを書いてる。今のところ自分はSlimを本格的には使えてないので問題ないかな。本格的に使えるほど慣れてきた頃には、Sinatra 1.2が出てそう。現在Slim練習中。シンプルすぎてキモかわいい。


## ファイルアップロードのサンプル

フォームからファイルを送信して、そのファイルの情報を`params`から参照して表示する簡単なサンプルコード。
`params`の`file`の値を見て、なんか入ってたら`slim`テンプレートを、`nil`ならエラーを表示する。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'slim'
# Sinatra 1.1.x 以前で Slim を使う
module Sinatra
  module Templates
    def slim(template, options={}, locals={})
      render :slim, template, options, locals
    end
  end
end
Slim::Engine.set_default_options :pretty => true
get '/' do
    slim :index
end
put '/upload' do
  if @f = params[:file]
    slim :upload
  else
    "アップロードに失敗しました"
  end
end
__END__
@@ index
! doctype html
html
  body
    form action='/upload' method='post' enctype='multipart/form-data'
      input type='file' name='file'
      input type='submit' value='upload'
      input type='hidden' name='_method' value='put'
@@ upload
! doctype html
html
  body
    p = "filename : #{@f[:filename]}"
    p = "type: #{@f[:type]}"
    p = "name: #{@f[:name]}"
    p = "tempfile: #{@f[:tempfile]}"
    p = "head: #{@f[:head]}"
~~~

Sinatraで`put`を使う場合は、フォームで`hidden`を使って、`_method`という名前で値`put`を送るのがお作法みたい。あと受け取ったファイルは、[Tempfileクラス](http://rurema.clear-code.com/1.8.7/class/Tempfile.html)になっている。余談だけど、Heroku単体ではファイルのアップロードが出来ないのは残念だなあ。ファイルをアップロードしたい場合は、[Amazon S3とかを使う](http://groups.google.com/group/heroku-ja/browse_thread/thread/7fd33e25db24c301)みたい。

* * *

<cite>[rack上でのファイルアップロード - daigotoの備忘録](http://d.hatena.ne.jp/daigoto/20100119/1263916254)</cite>
<cite>[Sinatraでファイルアップロード | ゆーすけぶろぐ](http://yusukezzz.net/blog/archives/1388)</cite>
