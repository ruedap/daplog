---
layout: article
title: "Herokuで使用するRubyのバージョンを変更する"
date: 2011-05-11
comments: true
categories: ruby
tags: ruby
published: true
---

Herokuは、[6月1日からRubyのバージョン1.9.2がデフォルトになる](http://blog.heroku.com/archives/2011/4/28/defaulting-to-ruby-192/)みたいなので、今から1.9.2に慣れる準備をしておこうかなと。現状HerokuでRuby 1.9.2を使うには、herokuコマンドを使って変更する必要がある。

<!-- READMORE -->


## Herokuで使用するRubyのバージョンを変更する

まず、現在使用しているRubyのバージョンを調べるには、`heroku stack`コマンドを実行する。現在のデフォルトでは下記の通り1.8.7が選択されている。

~~~ sh
$ heroku stack
  aspen-mri-1.8.6
* bamboo-ree-1.8.7
  bamboo-mri-1.9.2
~~~

使用するRubyのバージョンを変更するには、`heroku stack:migrate`コマンドを使って、変更するバージョンを指定する。今回は1.9.2にするので、`bamboo-mri-1.9.2`を指定する。

~~~ sh
$ heroku stack:migrate bamboo-mri-1.9.2
                - > Preparing to migrate heroku-hello-world
       bamboo-ree-1.8.7 -> bamboo-mri-1.9.2
       NOTE: You must specify ALL gems (including Rails) in manifest
       Please read the migration guide:
       [http://docs.heroku.com/bamboo](http://docs.heroku.com/bamboo)
                - > Migration prepared.
       Run 'git push heroku master' to execute migration.
~~~

この時点では変更の予約がされた状態で、実際に変更されるのは次に`git push`した時になる。Herokuに`git push`すると、ログの中に以下のような表示が含まれる。

~~~ sh
                - > Heroku receiving push
                - > Migrating from bamboo-ree-1.8.7 to bamboo-mri-1.9.2
~~~

これでRubyバージョンの変更が完了。

* * *

<cite>[lokkaをherokuのruby1.9.2で動かす - tyabeの日記](http://www.nilidea.com/11)</cite>
