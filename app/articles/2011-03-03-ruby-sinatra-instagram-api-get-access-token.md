---
layout: article
title: "<span>Sinatraを使って</span>Instagram APIのアクセストークンを取得する"
date: 2011-03-03
comments: true
categories: ruby
tags: ruby
published: true
---

[Instagram API](http://instagr.am/developer/)に関する日本語情報は、現時点では[このページ](http://tech.kayac.com/archive/instagramapi.html)が一番良くまとまっていて素晴らしい。ただ、アクセストークンを取得する具体的な例は載っていなかったので（記事を読む限りPHPを使って取ってるっぽい？）、自分が取得した方法を備忘録がてらにまとめてみた。Instagram公式の[Ruby用APIラッパーライブラリ](https://github.com/Instagram/instagram-ruby-gem)を使って、さらにSinatraで記述するととても簡単にOAuth認証できる例が載っているので、これを少し書き換えて、アクセストークンを表示するようにした。

<!-- READMORE -->

## Sinatraでアクセストークン取得

[Instagram API](http://instagr.am/developer/)のページのManageから、アクセストークンを取得したいアプリを新規作成にして、「OAuth redirect_uri」に <http://localhost:4567/oauth/callback> と入れる。あとは、表示されている「Client ID」と「Client Secret」をメモっておく。

次に、ローカルでSinatraを動かしてアクセストークンを取得するコードは、Instagram公式なRuby用APIラッパーが公開されている[GitHub](https://github.com/Instagram/instagram-ruby-gem)にサンプルコードがあるので、それをベースにする。最後の部分だけちょっと書き換えて、認証後にアクセストークンを表示するようにしたのが以下のコード。

コード内の`YOUR_CLIENT_ID`と`YOUR_CLIENT_SECRET`に、先ほどメモった「Client ID」と「Client Secret」を入力するのを忘れずに。

~~~ ruby
require "rubygems"
require "sinatra"
require "instagram"
enable :sessions
CALLBACK_URL = "http://localhost:4567/oauth/callback"
Instagram.configure do |config|
  config.client_id = "YOUR_CLIENT_ID"
  config.client_secret = "YOUR_CLIENT_SECRET"
end
get "/" do
  '<a href="/oauth/connect">Connect with Instagram</a>'
end
get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
end
get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
  response.access_token
end
~~~

このSinatraコードを`token.rb`とか名前をつけて保存しておく。このアプリを実行するには、`sinatra`と`instagram`のgemが必要なのでインストールする。

~~~ sh
$ gem install sinatra instagram
~~~

あとは、以下のコマンドを実行して起動して、

~~~ sh
$ ruby token.rb
~~~

<http://localhost:4567/> にアクセスして表示される「Connect with Instagram」のリンクを踏めば、Instagramに飛ばされてInstagramの通常アカウントでのログイン画面になる。んで、ログイン後に上記のアプリを認証すればコールバックURLに戻されて[^1]、アクセストークンが表示される。

* * *

<cite>[Instagram/instagram-ruby-gem - GitHub](https://github.com/Instagram/instagram-ruby-gem)</cite>
<cite>[instagramAPI公開！OAuth触りました | tech.kayac.com - KAYAC engineers' blog](http://tech.kayac.com/archive/instagramapi.html)</cite>

[^1]: 最初に設定した<http://localhost:4567/oauth/callback>
