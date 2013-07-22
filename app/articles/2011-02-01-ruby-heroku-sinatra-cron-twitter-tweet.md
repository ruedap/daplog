---
layout: article
title: "Herokuのcronを使って自動でTwitterにつぶやく"
date: 2011-02-01
comments: true
categories: ruby
tags: ruby
published: true
---

[前回は手動でTwitterにつぶやく処理を書いた](/2011/01/31/ruby-heroku-sinatra-twitter-tweet)けど、今回はcronを使って自動でつぶやくようにする。これでやっとTwitter Botらしくなる。Herokuのcronは、無料で使えるのは1日1回発動のみ。月3ドル払うと、1時間1回発動を使えるようになるみたい。

<!-- READMORE -->


## コードの修正

まず、cron用にツイートする処理を別クラスに分離する。
ツイート処理のクラスとして、`tweet.rb`を以下のように作成した。

~~~ ruby
require 'rubygems'
require 'twitter'
class Tweet
  def initialize
    Twitter.configure do |config|
      config.consumer_key       = ENV['CONSUMER_KEY']
      config.consumer_secret    = ENV['CONSUMER_SECRET']
      config.oauth_token        = ENV['OAUTH_TOKEN']
      config.oauth_token_secret = ENV['OAUTH_TOKEN_SECRET']
    end
  end
  def simple_tweet
    t = Time.now # 同一内容投稿エラーの防止用
    Twitter.update("HerokuのSinatraからHello world! at #{t}")
    "tweet complete!"
  end
end
~~~

`app.rb`はこんな感じに修正した。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'tweet.rb'
before do
  @tweet = Tweet.new
end
get '/' do
  'HerokuでSinatraを使ってHello world!'
end
get '/hoge' do
  ENV['HOGE']
end
get '/tweet' do
  @tweet.simple_tweet
end
~~~

動作自体は今までと同じ。


## Herokuでcronを有効化

[Herokuのアドオンページ](http://addons.heroku.com/cron)から、cronのアドオンを有効にする。1日単位のcronなら無料で利用できるが、無料利用でもクレジットカード情報の登録が必要。
クレジットカード番号や住所・電話番号などの個人情報入力が終わって、Account verified.となったらおｋ

もういちど[cronアドオンのページ](http://addons.heroku.com/cron)に行き、Daily Cronの方のAddボタンを押す。Herokuアプリの選択画面になるので、heroku-hello-worldを選択してSelectボタンを押す。実は、このSelectボタンを押してcronアドオンを追加した時の時間が、cronが発動する時間になる。詳しくは後述。

アドオンを有効にするのは、以下のコマンドラインからも可能（クレジットカード情報の登録は別）っぽい。

~~~ sh
$ heroku addons:add cron:daily
~~~


## cron指示書を作成

プロジェクトディレクトリ直下に、cronの指定をする`Rakefile`を作成する

~~~ ruby
require 'tweet.rb'
task :cron do
  Tweet.new.simple_tweet
end
~~~

これで設定完了。commit & push してHerokuにデプロイする。アドオン追加ボタンを押した24時間後から、毎日その時間に、cron処理が走って自動でツイートされるはず。


## cronが発動する時間の指定

Herokuのcronが発動する時間は、cronアドオンが有効になった時の時間が使われる模様。なので、たとえば毎日0時にcronを発動させたいのなら、cronアドオンが無効になっている状態で、0時にHerokuの管理画面でcronアドオンを有効にするボタンをポチっとする。もしくは上述のコマンドラインからの有効化コマンドを打つ。

コマンドラインから有効化できるなら、ついでに時間指定もできそうな気がするけど、ちょっと調べてみたけどわからなかった。わざわざその時間に有効化ボタンを押さなきゃならないというのは不便な気がするので、何か方法はありそうだけど…。情報募集中。

ちなみに、Herokuの管理画面で表示される時間は、[太平洋標準時(PST)](http://ja.wikipedia.org/wiki/%E5%A4%AA%E5%B9%B3%E6%B4%8B%E6%A8%99%E6%BA%96%E6%99%82)なので、日本との時差は-17時間ある。


## 手動でcronを発動するには

cron指示書の`Rakefile`をプッシュ後に、

~~~ sh
heroku rake cron
~~~

で手動でcronを発動できる。これを実行しても前述のcronが発動される時間には影響はないっぽい。


## cronのログ

cronの実行ログは、以下で閲覧可能。

~~~ sh
heroku logs:cron
~~~

らしいんだけど、何度かcronが発動されている状態で`heroku logs:cron`とやってみたら、

~~~ sh
(in /disk1/home/slugs/3b4bc698-91cd-4159-8c27-1c4ec558bf76/mnt)
~~~

の1行が表示されただけだった。これがなにを意味するのかよくわからず…。情報募集中。


### cronのログについて

cronのログについて情報を頂いたので、再度自分の環境でも新しいHerokuアプリと最新のheroku gem(1.17.16)にして試してみたところ、以下のように`heroku logs:cron`がdeprecatedになっていた。

~~~ sh
$ heroku logs:cron
 !   logs:cron is deprecated, your cron process will log to your regular log stream as cron.1
~~~

で警告に書かれてるとおりに、普通のログの方を見てみると「cron.1」があった。

~~~ sh
$ heroku logs
（中略）
2011-02-18T19:43:10-08:00 heroku[cron.1]: State changed from created to down
~~~

上記のはcronアドオンをHeroku管理画面から追加した時のログっぽい。
ちなみに既にcronが稼動しているHerokuアプリで見てみると、確かにそれっぽいのがあった。

~~~ sh
2011-02-18T16:00:39-08:00 heroku[cron.1]: State changed from created to starting
2011-02-18T16:00:40-08:00 app[cron.1]: (in /app/xxxxxxxxxx-xxxxxxxxxx-xxxxxxxxx/home)
2011-02-18T16:00:42-08:00 heroku[cron.1]: State changed from starting to up
2011-02-18T16:00:43-08:00 heroku[cron.1]: State changed from up to complete
2011-02-18T16:00:43-08:00 heroku[cron.1]: State changed from complete to down
~~~

というわけで、今後はcronのログも`heroku logs`で見るようになるみたい。

* * *

<cite>[Read It Later の RSS にタイトルと本文つける Web サービスの裏側 - mallowlabsの備忘録](http://d.hatena.ne.jp/mallowlabs/20100909/read_it_later_rss_inside)</cite>
