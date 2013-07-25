---
layout: article
title: "<span>SinatraからDataMapperを使う(5)</span><span> HerokuのPostgreSQLで使う</span>"
date: 2011-02-16
comments: true
categories: ruby
tags: ruby
published: true
---

[前回](/2011/02/15/ruby-sinatra-datamapper-4-shuffle-tweet)までで、ローカルのSinatra＋DataMapper＋SQLite3の環境で、シャッフルツイート機能の実装が完了した。今回は、これを実際の運用サーバーであるHeroku上で動作させるためにコードを修正する。Herokuで使えるデフォルトのデータベースはPostgreSQLなので、ここでもPostgreSQLを使う。

<!-- READMORE -->


## PostgreSQL関連のgemを指定する

まず、前提として使ってるマシンにPosgreSQL自体が入ってないとダメっぽい。自分の環境では、PostgreSQLが入ってないと、DataMapperのPostgreSQL用アダプターをインストールする時にコケた。PostgreSQLのインストールはWin/Macそれぞれ以下のような感じで。

<cite>[WindowsでPostgreSQLをXAMPPのPHPから使う](/2011/01/06/windowx-postgresql-xampp-php)</cite>
<cite>[HomebrewをインストールしてMacPortsをアンインストールする](/2011/02/17/mac-install-homebrew-uninstall-macports)</cite>


### Gemfile
Bundler用の`Gemfile`ファイルは以下のような感じになる。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'twitter'
gem 'dm-core'
gem 'dm-migrations'
gem 'dm-validations'
gem 'dm-validations-i18n'
gem 'dm-postgres-adapter'
~~~

で`bundle install`して、`Gemfile.lock`ファイルを生成する。


## PostgresSQL用に修正

次に、`app.rb`に記述していた`DataMapper.setup`メソッドを`tweet.rb`に移動し、なおかつHerokuのPostgreSQLでも使えるように修正する。


### tweet.rb

`app.rb`にあった以下の行を、

~~~ ruby
DataMapper.setup(:default, 'sqlite3:db.sqlite3')
~~~

`tweet.rb`のコンストラクタに移動して、以下のように修正する。

~~~ ruby
class Tweet
  def initialize
    DataMapper.setup(:default, ENV['DATABASE_URL'] || 'sqlite3:db.sqlite3')
# （以下省略）
~~~

`heroku create`コマンドを実行したときに、環境変数としてデータベースのURLが挿入されている[^1]ので、そこを参照するように変えるだけ。環境変数が無ければ後者が使われるので、ローカル上では今まで通りSQLite3が使われる。

PostgreSQLとSQLite3の違いはO/RマッパーであるDataMapperが良しなにやってくれるので、コードに変更はない。


## マイグレーション用Rakefile

前回までのローカルプレビュー時は、マイグレーションは直接`migrate.rb`スクリプトを、

~~~ sh
$ ruby migrate.rb
~~~

として実行していた。が、こういうやり方はHeroku上ではできない（ということをこの段階になって知った）ので、マイグレーションを実行出来るようにするための`Rakefile`を作成する。実はこの情報を知るのに結構苦労して、理解するまでどうすれば良いのかわからずフラフラとネット上を彷徨っていた。最終的に理解できたのは、直接その処理を行なっているRubyコードを見ることが出来たから。

[Lokka](http://lokka.org/)の以下の部分のRubyコードを参考にさせてもらって、DataMapperでのマイグレーション用`Rakefile`を作ることが出来た。

<cite>[Rakefile at master from komagata's lokka - GitHub](https://github.com/komagata/lokka/blob/master/Rakefile)</cite>
<cite>[lib/lokka.rb at master from komagata's lokka - GitHub](https://github.com/komagata/lokka/blob/master/lib/lokka.rb)</cite>
<cite>[lib/lokka/entry.rb at master from komagata's lokka - GitHub](https://github.com/komagata/lokka/blob/master/lib/lokka/entry.rb)</cite>


### database.rb

というわけで、前回まで`migrate.rb`として使用していたファイルを、まず`database.rb`にリネームする。そして`Rakefile`から実行するのに適したクラスとメソッドに修正する。`create`メソッドは、ちょっと悪いネーミングな気がするけど、とりあえずこれで。[^2]

~~~ ruby
require 'rubygems'
require 'dm-core'
require 'dm-migrations'
require 'model.rb'
class Database
  def connect
    DataMapper.setup(:default, ENV['DATABASE_URL'] || 'sqlite3:db.sqlite3')
    self
  end
  def migrate
    DataMapper.auto_migrate!
    self
  end
  def create
    WORDS.each do |data|
      post = Post.create(:title => data, :created_at => Time.now)
      puts post.errors.map {|e| "* * * #{e} :\n#{data}" } unless post.errors.empty?
    end
    self
  end
  WORDS = <<-EOF.split("\n")
私の最高傑作は次回作だ。
（中略）
"You?" "You can see now?" "Yes, I can see now."
  EOF
end
~~~

### Rakefile

で`rake`コマンドで実行するマイグレーション用`Rakefile`は以下のような感じになる。cron用タスクは元々あったもので、それに手動ツイートする`bot:tweetタスク`と、マイグレーションと初期レコードの追加を行う`db:setタスク`を追加した。

~~~ ruby
require 'tweet.rb'
task :cron do
  Tweet.new.tweet
end
desc 'Bot Tweet'
task 'bot:tweet' do
  puts 'Bot Tweeting...'
  Tweet.new.tweet
end
require 'database.rb'
desc 'Setup Database'
task 'db:set' do
  puts 'Setup Database...'
  Database.new.connect.migrate.create
end
~~~

`database.rb`と`Rakefile`が修正できたら準備完了。


## rakeコマンドの実行

まずローカルで、この`Rakefile`による`rake`コマンドが正常に動作するか確認する。既存の`db.sqlite3`ファイルがあれば、それをゴミ箱に捨ててから以下のコマンドを実行する。

~~~ sh
$ rake db:set
~~~

これで`db.sqlite3`ファイルが生成されて、各レコードにデータが挿入されていれば成功。さらに、以下の手動ツイートの`rake`コマンドを実行すると、実際にTwitterにツイートが投稿される。

~~~ sh
$ rake bot:tweet
~~~

以上がローカルで確認できていればOK


## デプロイ

作成・修正したファイルをコミットして、Herokuにプッシュする。

~~~ sh
$ git add .
$ git commit -m 'lupin the third!'
$ git push heroku master
$ heroku open
~~~

この時点では、データベースのマイグレーションが行われていないので、サイトを開いてもInternal Server Errorが表示される。


## Heroku上でrakeコマンドの実行

ローカルで試した`rake`コマンドの頭に`heroku`と付けるだけでOK

~~~ sh
$ heroku rake db:set
$ heroku rake bot:tweet
~~~

これでちゃんとTwitterに投稿されれば、おそらくcronでも正しく投稿が行われるはず。果報は寝て待つ。また、

~~~ sh
$ heroku open
~~~

でサイトを開くと、今度はローカルで表示したときと同じように、正常に一覧が表示される。
ちなみに、このアクセスするとシャッフルツイートが行われて残りの名言が一覧表示される動作は、あくまでも動作チェック用なので最終的には削除しておく。


## ここまでのソースコード

ここまでの[chaplin\_bot](https://github.com/ruedap/chaplin/)のソースコードをversion 2.0 としてタグを切ったので、GitHubからダウンロード可能。

<cite>[ruedap/chaplin at 2.0 - GitHub](https://github.com/ruedap/chaplin/tree/2.0)</cite>

以上で、単なるリピートツイートだったHeroku上のTwitter Botに、無事シャッフルツイート機能を実装できたので、このシリーズはこれで完結する。

[^1]: heroku configコマンドで見られる
[^2]: そもそもメソッドの配置場所もこのクラスには適さない気がするけど、とりあえずこれで。
