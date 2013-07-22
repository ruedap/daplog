---
layout: article
title: "<span>SinatraからActiveRecord 3を使う(1)</span> マイグレーション"
date: 2011-04-16
comments: true
categories: ruby
tags: ruby
published: true
---

以前[SinatraからDataMapperを使う記事](/2011/02/12/ruby-sinatra-datamapper-1-orm-sqlite)を書いたけど、今回はSinatraのO/Rマッパー部分にActiveRecord 3を使ってみる。ActiveRecord 3自体の使い方については、[この記事](http://www.atmarkit.co.jp/fcoding/rails/posts/rails3/03/rails303a.html)がすごくわかりやすかった。

<!-- READMORE -->


## Sinatraアプリに必要なファイルを用意する

まずは、Sinatraアプリを実行するのに必要な最低限のファイル群（`Gemfile`と`config.ru`と`app.rb`）を作成する。今回は基本的にすべてBundler経由で操作するので、システム側にBundlerのgemがインストールされている必要がある。

### Gemfile

今回使用するgemはこんな感じ。とりあえずSinatraでActiveRecord 3を使う場合は`activerecord`と`sinatra-activerecord`と`sqlite3`が必要で、今回使ったバージョンはそれぞれ、3.0.6、0.1.3、1.3.1。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'slim'
gem 'activesupport', :require => 'active_support/all'
gem 'activerecord'
gem 'sinatra-activerecord', :require => 'sinatra/activerecord'
gem 'sqlite3'
gem 'rake'
~~~

で`$ bundle install`する

~~~ sh
$ bundle install --path vendor/bundle
~~~

`vendor/bundle`フォルダに指定したgemがインストールされて、`Gemfile.lock`が生成される。


### config.ru

次に`config.ru`を用意する。ここで全部`require`するようにしておく。

~~~ ruby
require 'rubygems'
require 'bundler'
Bundler.require
require './app.rb'
run Sinatra::Application
~~~


### app.rb

本体となる`app.rb`を用意する。とりあえず、ほぼ空っぽ状態で。

~~~ ruby
get '/' do
  'hoge'
end
~~~

これで最低限のファイルが揃ったので、

~~~ sh
$ bundle exec rackup config.ru
~~~

でラックアップするとSinatraアプリを起動できる。<http://localhost:9292/>にアクセスして「hoge」と表示されれば準備おｋ


## rakeタスクを使ってテーブル作成（マイグレーション）

`Rakefile`を作成して、`rake`を使ってテーブル作成（マイグレーション）する。

### Rakefile

マイグレーション用ファイルを生成するための`Rakefile`を作成する。

~~~ ruby
require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
~~~

このパッケージを`require`するだけで、以下の2つの`rake`タスクが追加される。

~~~ sh
$ bundle exec rake -T
rake db:create_migration  # create an ActiveRecord migration in ./db/migrate
rake db:migrate           # migrate your database
~~~


### db:create\_migration

試しに、`rake db:create_migration`をしてみると、

~~~ sh
$ bundle exec rake db:create_migration
no NAME specified. use `rake db:create_migration NAME=create_users`
~~~

名前を指定して実行してね、って言われるので、その通りにする。今回はとりあえず、単にカウントするためだけのテーブルを作成するので、「create\_」にcountを複数形にして「counts」を足した。このときはこのファイル名の命名は重要かと思ったけど、あとから振り返ってみると、それほど重要でもなかったっぽい。

~~~ sh
$ bundle exec rake db:create_migration NAME=create_counts
~~~

これでプロジェクトディレクトリを覗いてみると、`db/migrate`フォルダが生成されて、その中にマイグレーション用ファイル`20110416111646_create_counts.rb`が作られている。開いてみるとこんな感じ。まだ空っぽ。

~~~ ruby
class CreateCounts < ActiveRecord::Migration
  def self.up
  end
  def self.down
  end
end
~~~

このファイルをベースに、次のように`self.up`メソッド内に必要なカラムを書き足していく。

~~~ ruby
class CreateCounts < ActiveRecord::Migration
  def self.up
    create_table :counts do |t|  #=> この引数名「:counts」がテーブル名になる
      t.string :user
      t.integer :count, :default => 0
      t.timestamps  #=> この一行でcreated_atとupdated_atのカラムが定義される
    end
  end
  def self.down
    drop_table :counts
  end
end
~~~

### db:migrate

マイグレーション用ファイルができたら、`$ rake db:migrate`を実行してマイグレーション（テーブル作成）する。

~~~ sh
$ bundle exec rake db:migrate
~~~

うまくいくと、プロジェクトディレクトリに`development.db`のSQLite3ファイルが生成されて、Litaなどビューアーで中身を覗くと、ちゃんと先ほど`create_migration`ファイルで指定したカラムが準備されている。

ここまででDBファイルとテーブルの準備が完了したので、次回はそれを使って実際にデータを保存したり読み込んだりする[CRUD](/2011/04/17/ruby-sinatra-active-record-3-crud)について。

* * *

<cite>[「ActiveRecord」の基本とデータの参照 － ＠IT](http://www.atmarkit.co.jp/fcoding/rails/posts/rails3/03/rails303a.html)</cite>
<cite>[第2回 Active Recordの使い方 | Think IT](http://thinkit.co.jp/story/2010/10/13/1804)</cite>
