---
layout: article
title: "<span>SinatraからDataMapperを使う(1)</span> 動作チェック用のコード"
date: 2011-02-12
comments: true
categories: ruby
tags: ruby
published: true
---

[Herokuで作った名言Twitter Bot](/2011/02/09/ruby-heroku-twitter-bot)で、名言を投稿するロジックがただの順番（iPodで言うところのリピート再生的なもの）なので、これをシャッフル再生的なものに変えたい。ランダムではなくシャッフル、という点が重要。1度発言した名言は、全名言が発言し終わるまで出てこない仕様にしたい。`rand`で生成してその都度乱数で選ぶと、確率的には同じものが連続してしまう可能性が十分あるので、ランダムはこの場合適さない。

それでこの機能を実装するためにデータベースを扱う必要があるので、Ruby製O/Rマッパー[DataMapper](http://datamapper.org/)の使い方を調べた。以下はそのメモ。数回に渡って連載となる予定。

<!-- READMORE -->


## DataMapperとは

以下のページがわかりやすかった。

<cite>[Ruby Freaks Lounge：第14回　DataMapperの使い方｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/ruby/0014)</cite>
<cite>[DataMapper を使う - KrdLabの不定期日記](http://d.hatena.ne.jp/KrdLab/20090503/1241331627)</cite>

## DataMapperのインストール

ローカルではSQLite3を使ってテストするので、SQLite用アダプタもインストールする。

~~~ sh
$ gem install dm-core
$ gem install dm-sqlite-adapter
~~~


## SQLiteビューアー

Railsとかがそうだけど、データベースのデフォルト設定にはSQLite3が使われることが多い気がする。そんな時に重宝するSQLiteファイルを閲覧するビューアーが以下。

<cite>[Lita - SQLite Administration Tool \| David Deraedt](http://www.dehats.com/drupal/?q=node/58)</cite>

Adobe AIR製なのでWin/Macどちらでも使えるし、UTF-8なら日本語も表示される。


## 最小限のDataMapperコード

テーブル定義・作成、データの書き込み、データの読み込み、の3つを行う最小限の構成だとこんな感じかな。まだ勉強中なので間違ってるかも。`auto_upgrade!`や`create`後の戻り値判定あたりは自信なし。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'dm-core'
require 'dm-migrations'
DataMapper.setup(:default, 'sqlite3:db.sqlite3')
class Post
  include DataMapper::Resource
  property :id, Serial
  property :title, String
  property :tweet_num, Integer
  property :created_at, DateTime
  auto_upgrade!
end
get '/' do
  Post.all.map {|r| "#{r.id}, #{r.tweet_num}, #{r.created_at}, #{r.title} <br>" }
end
get '/create' do
  Post = Post.create(
    :title      => "DataMapperからHello world!",
    :tweet_num  => 0,
    :created_at => Time.now
  )
  "Post.createに成功!" unless post.nil? # 失敗したらnilになる？未調査の当てずっぽう
end
~~~

Postクラスがテーブル定義。`DataMapper::Resource`をインクルードしたクラスがそうなる。`property`は各カラムの定義。
`auto_upgrade!`はたぶん、生成も追加もよしなにやってくれる、という意味だと思うけど、よくわかってない。ここを`auto_migrate!`にしてしまうと、毎回レコードが初期化される。今回は1ファイルで全部やってて、毎回リロードするので`auto_upgrade!`じゃないと消えてしまう。

初めてWebアプリにアクセスがあったときに、`auto_upgrate!`も実行されて`db.sqlite3`ファイルがローカルに生成される。また、<http://127.0.0.1:9393/create>にアクセス[^1]したときには、レコードが追加される。<http://127.0.0.1:9393/>にアクセスすると、その時点でのすべてのレコードを一覧で表示する。

[次回](/2011/02/13/ruby-sinatra-datamapper-2-migrate-model)は、マイグレーション部分とモデル部分を分離してコードを書きたい。

* * *

(via) [DataMapper - Getting started with DataMapper](http://datamapper.org/getting-started)

[^1]: URLはshotgunで起動した場合
