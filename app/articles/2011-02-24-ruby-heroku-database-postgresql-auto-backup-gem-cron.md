---
layout: article
title: "HerokuでDBのデータを自動でバックアップする"
date: 2011-02-24
comments: true
categories: ruby
tags: ruby
published: true
---

[昨日のHerokuのDBバックアップ記事](/2011/02/23/ruby-heroku-database-postgresql-backup)をベースに、Herokuのcronを使って自動でバックアップを取る方法(gem)があるので試してみる。

<!-- READMORE -->

## cronでDBのバックアップを自動化

前提として、cronアドオンが有効になっている必要がある。なってなければ、以下のコマンドを実行して有効化する。

~~~ sh
$ heroku addons:add cron:daily
~~~

そして、以下のgemを使うと、HerokuのcronでDBのバックアップを自動化してくれるみたい。

<cite>[ddollar/heroku\_backup\_task - GitHub](https://github.com/ddollar/heroku_backup_task)</cite>

まず、`Gemfile` に上記のgemを追加して、`bundle install`する

~~~ ruby
gem 'heroku_backup_task'
~~~

そして、`Rakefile`のcronタスクで、先ほどの`heroku_backup_task`ライブラリを実行するコードを追加する。

~~~ ruby
require 'heroku_backup_task'
task :cron do
  HerokuBackupTask.execute
end
~~~

これでHerokuにpushすれば、定期的（無料版cronなら1日1回）に古いほうを捨てて新しいバックアップを取ってくれる。念のため手動でcronを発動して確認すると、

~~~ sh
$ heroku pgbackups --app heroku-hello-world
ID   | Backup Time         | Size   | Database
b002 | 2011/02/22 05:29.41 | 23.6KB | SHARED_DATABASE_URL
b003 | 2011/02/22 05:33.22 | 23.6KB | SHARED_DATABASE_URL
~~~

~~~ sh
$ heroku rake cron --app heroku-hello-world
(in /app/435b605b-2a16-40c7-9cb5-e5a93eea6749/home)
[Tue Feb 22 06:10:00 -0800 2011] starting heroku backup task
[Tue Feb 22 06:10:00 -0800 2011] backing up: DATABASE_URL
~~~

~~~ sh
$ heroku pgbackups --app heroku-hello-world
ID   | Backup Time         | Size   | Database
b003 | 2011/02/22 05:33.22 | 23.6KB | SHARED_DATABASE_URL
b004 | 2011/02/22 06:10.00 | 23.6KB | DATABASE_URL
~~~

ちゃんとb002が消えてb004が生成されてるね。

* * *

<cite>[herokuでデータベースのバックアップ(pgbackups)を自動化する - nabehiro Try and Error](http://d.hatena.ne.jp/nabehiro/20110126/1296060550)</cite>
<cite>[Automating pgbackups - Heroku | Google Groupsでは、先日リリースされたHeroku PG Bac... - Sooey](http://journal.sooey.com/58)</cite>
