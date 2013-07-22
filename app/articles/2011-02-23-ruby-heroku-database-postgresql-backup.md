---
layout: article
title: "HerokuでDBのデータをバックアップする"
date: 2011-02-23
comments: true
categories: ruby
tags: ruby
published: true
---

HerokuアプリのDBをバックアップするには[pgbackups](http://addons.heroku.com/pgbackups)というアドオンを利用する。[昨日書いた方法](/2011/02/22/ruby-heroku-database-sqlite3-download-upload)との主な違いは、今回のはHerokuのサーバー上にバックアップされることと、フォーマットの変換はできないこと、あたりかな。[バックアップ処理を自動化](/2011/02/24/ruby-heroku-database-postgresql-auto-backup-gem-cron)する場合は今回の方法が良いみたい。

<!-- READMORE -->


## アドオン追加

まず、`heroku`コマンドが使えるgemの[heroku](https://rubygems.org/gems/heroku)を最新の状態にする。

~~~ sh
$ gem update heroku
~~~

次に、対象のHerokuアプリに[pgbackups](http://addons.heroku.com/pgbackups)アドオンを追加する。Basicタイプは無料。

~~~ sh
$ heroku addons:add pgbackups:basic --app heroku-hello-world
~~~

これで準備完了。


## バックアップ

Heroku(Amazon S3)のサーバー上にバックアップするには以下のようにコマンドを実行する。

~~~ sh
$ heroku pgbackups:capture --app heroku-hello-world
DATABASE_URL  --backup-->  b001
Capturing... done
Storing... done
~~~

以下のコマンドで、現在保存されているバックアップの一覧を見ることが出来る。

~~~ sh
$ heroku pgbackups --app heroku-hello-world
ID   | Backup Time         | Size   | Database
b001 | 2011/02/22 04:54.43 | 23.6KB | SHARED_DATABASE_URL
~~~


### 無料では2個まで

無料のBasicタイプでは、バックアップできるファイル数の上限は2個。

~~~ sh
$ heroku pgbackups --app heroku-hello-world
ID   | Backup Time         | Size   | Database
b001 | 2011/02/22 04:54.43 | 23.6KB | SHARED_DATABASE_URL
b002 | 2011/02/22 05:29.41 | 23.6KB | SHARED_DATABASE_URL
~~~

上のように既にバックアップファイルが2個ある状態で、さらにバックアップをしようとすると、以下のようにエラーとなる。

~~~ sh
$ heroku pgbackups:capture --app heroku-hello-world
DATABASE_URL  --backup-->  error
 !    must delete a backup before creating a new one
~~~

なので、古いほうを捨てて新しいファイルでバックアップをする。その場合は、以下のように`--expire`オプションを付ける。

~~~ sh
$ heroku pgbackups:capture --expire --app heroku-hello-world
DATABASE_URL  --backup-->  b003
Capturing... done
Storing... done
$ heroku pgbackups --app heroku-hello-world
ID   | Backup Time         | Size   | Database
b002 | 2011/02/22 05:29.41 | 23.6KB | SHARED_DATABASE_URL
b003 | 2011/02/22 05:33.22 | 23.6KB | SHARED_DATABASE_URL
~~~


### 手動で削除

バックアップされているファイルを手動で削除する場合は、以下の`destroy`を使う。

~~~ sh
$ heroku pgbackups:destroy b003 --app heroku-hello-world
Backup b003 deleted.
~~~


## リストア

現在バックアップされているファイルから、HerokuアプリのDBにリストアする場合は、以下のようにコマンドを実行する。

~~~ sh
$ heroku pgbackups:restore b004 --app heroku-hello-world
SHARED_DATABASE_URL (DATABASE_URL)  <--restore--  b004
 !    WARNING: Potentially Destructive Action
 !    This command will affect the app: heroku-hello-world
 !    To proceed, type "heroku-hello-world" or re-run this command with --confirm heroku-hello-world
> heroku-hello-world
Retreiving... done
Restoring... done
~~~


## ダウンロード

Heroku上でバックアップしたデータを、ローカルにダウンロードするには以下のように実行する。

~~~ sh
$ heroku pgbackups:url b004 --app heroku-hello-world
[http://s3.amazonaws.com/hkpgbackups/...](http://s3.amazonaws.com/hkpgbackups/...)
$ curl "http://s3.amazonaws.com/hkpgbackups/..." -o b004.dump
~~~

上記のようにダウンロード用のURLが表示されるので、ブラウザを使って直接アクセスしてもダウンロード可能。

## ダンプファイルをローカルのPostgreSQLにリストア

[Herokuのドキュメント](http://devcenter.heroku.com/posts/pgbackups)を参考に、以下の`pg_restore`コマンドを使って、ダウンロードしたダンプファイルをローカルのPostgreSQLにリストアする。

~~~ sh
$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -U ruedap -d mydb b004.dump
~~~

`-h`でホスト名（通常はlocalhost）、`-U`でユーザー名、`-d`でDB名を指定して、最後にリストアしたいダンプファイルを指定する。Railsアプリであれば、`config/database.yml`にユーザー名やDB名は指定してあるはず。

* * *

<cite>[HerokuにPG Backupsというアドオンが加わり、Heroku上のPostgreSQLからダンプ取得・リストアが簡単にできるようにな... - Sooey](http://journal.sooey.com/29)</cite>
<cite>[heroku の db バックアップ周り - HsbtDiary(2011-01-12)](http://www.hsbt.org/diary/20110112.html)</cite>
<cite>[Herokuのpgbackupsからデータをリストアする - komagata ［p0t］](http://docs.komagata.org/4708)</cite>
