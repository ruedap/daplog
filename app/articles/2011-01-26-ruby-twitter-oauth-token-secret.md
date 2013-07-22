---
layout: article
title: "<span>RubyでTwitterのOAuth認証に必要な</span>トークンを取得する"
date: 2011-01-26
comments: true
categories: ruby
tags: ruby
published: true
---

Twitter関連のWebアプリを作る際に、OAuth認証で必要になるトークンやらシークレットやらを取得する手順の備忘録。最近Rubyライブラリ側の仕様変更があったみたいで結構ハマった。

<!-- READMORE -->


## Twitter側での準備

[Twitterのアプリ登録申請のページ](http://twitter.com/oauth_clients/)から、新規アプリを登録する。必須項目は以下の5つ。

|アプリケーション名|GAE Hello world|
|アプリケーションの説明|GAE Hello world|
|アプリケーションのウェブサイトURL|<http://gae-hello-world.appspot.com/>|
|アプリケーションの種類|ブラウザアプリケーション|
|標準のアクセスタイプ|Read & Write|

定期的につぶやくTwitterBotを作る前提で、このような設定にしてみた。でアプリを作成すると、*Consumer key*と*Consumer secret*が表示されるのでメモる。


## Ruby側での準備

OAuth認証を行う[oauthライブラリ](https://github.com/oauth/oauth-ruby)と、TwitterでのOAuth認証に必要なトークンを簡単に取得できるようにしてくれる[get-twitter-oauth-tokenライブラリ](https://github.com/jugyo/get-twitter-oauth-token)をインストールする。

~~~ sh
$ gem install oauth get-twitter-oauth-token
~~~

これで`get-twitter-oauth-token`コマンドが使用可能になる。

## TwitterのOAuth認証に必要なトークンを取得

~~~ sh
$ get-twitter-oauth-token
~~~

ターミナルから上記コマンドを実行すると*Consumer key*と*Consumer secret*を聞かれるのでコピペする。するとブラウザが開いて、Twitterのページが表示され、アプリを許可しますか？と聞かれるので許可すると、暗証番号が表示される。

ターミナル側ではその暗証番号の入力待ち状態（PIN:）になっているのでコピペする。すると、TwitterのOAuth認証に必要な*Token*と*Secret*が表示されるのでメモる。


## RubyからTwitterにツイート

~~~ sh
$ gem install twitter
~~~

[twitterライブラリ](https://github.com/jnunemaker/twitter)をインストールして、さきほどメモった4つのキーをそれぞれ該当する箇所に挿入した上で、下記のコードを実行するとツイートされるはず。

~~~ ruby
require 'rubygems'
require 'twitter'
Twitter.configure do |config|
  config.consumer_key = "Consumer key"
  config.consumer_secret = "Consumer secret"
  config.oauth_token = "Token"
  config.oauth_token_secret = "Secret"
end
Twitter.update("Hello world")
~~~


## ハマったところ

Twitter::OAuthというtwitterライブラリ内蔵のOAuth部分は最近のバージョンでは削除されたらしく、ネットの情報を参考にしていた時それを使っているコードは動かなかった。OAuthはoauthライブラリですべて処理して、必要なキーをすべて揃えた上で、twitterライブラリでOAuth認証を行うという流れになったみたい？ まだちょっとよくわかってない。

* * *

<cite>[メールで Twitter、OAuth - Rubyとか Illustratorとか SFとか折紙とか](http://d.hatena.ne.jp/hs9587/20110109/1294540788)</cite>
