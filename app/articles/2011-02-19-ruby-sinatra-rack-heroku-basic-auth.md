---
layout: article
title: "<span>HerokuのSinatraで</span>Basic認証を使ってアクセス制限をかける"
date: 2011-02-19
comments: true
categories: ruby
tags: ruby
published: true
---

Heroku上にデプロイするSinatraで、Basic認証を使ってアクセス制限をかける方法について調べたのでメモ。特にHerokuに限らない方法だとは思うけど。ここだけの秘密だけど、最初普通のウェブサイトのように`.htaccess`と`.htpasswd`を用意して、Herokuアプリ直下または`public`ディレクトリに入れればいけるんだろうと思って、`heroku console`から `pwd` とか実行してパスを取得して`.htaccess`に`.htpasswd`までのパスを書いて…とか壮大に明後日の方向な手順を踏んでた。

[SinatraでのBasic認証の方法](http://www.sinatrarb.com/faq.html#auth)は全然違って、Rackの機能を使うみたい。

<!-- READMORE -->


## サイト全体をアクセス制限

Sinatraアプリの起動ファイル（`config.ru`から呼び出しているrbファイル）のどこかに、以下のような感じで書けばおｋ あ、もちろんトップレベルに書く必要はある。あと`configure`メソッド内でもいいみたい。

~~~ ruby
use Rack::Auth::Basic do |username, password|
  username == ENV['BASIC_AUTH_USERNAME'] && password == ENV['BASIC_AUTH_PASSWORD']
end
~~~

ユーザー名やパスワードは直に書いてもいいんだけど、Herokuの環境変数`ENV`に入れておくのがセキュリティ的にはよさそうかな。ローカルで試すときに煩雑になるデメリットはあるけど。ここらへん、いい方法あるのかな？

~~~ sh
$ heroku config:add BASIC_AUTH_USERNAME="hoge" BASIC_AUTH_PASSWORD="fuga"
~~~

これでサイト上のどのページにアクセスしてもBasic認証のウィンドウが開く。


## 特定のパスだけ部分的にアクセス制限

特定のパスだけアクセス制限を掛ける場合は、`helpers`メソッドでヘルパー化して、それを呼び出すのが良いみたい。

~~~ ruby
require 'rubygems'
require 'sinatra'
helpers do
  def protect!
    unless authorized?
      response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
      throw(:halt, [401, "Not authorized\n"])
    end
  end
  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    username = ENV['BASIC_AUTH_USERNAME']
    password = ENV['BASIC_AUTH_PASSWORD']
    @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == [username, password]
  end
end
get '/' do
  'アクセス制限なし'
end
get '/protect' do
  protect!
  'アクセス制限あり'
end
~~~

実際やってみたページは[これ](http://heroku-hello-world.heroku.com/protect)。ユーザー名とパスワードは上述のとおり`hoge`と`fuga`で。

* * *

<cite>[Basic認証を行う簡単なサンプル - うなの日記](http://d.hatena.ne.jp/unageanu/20090519/1242745626)</cite>
<cite>[Sinatra: Frequently Asked Questions](http://www.sinatrarb.com/faq.html#auth)</cite>
<cite>[Sinatraで使える認証ライブラリのメモ - Hello, world! - s21g](http://blog.s21g.com/posts/1635)</cite>
