---
layout: article
title: "<span>HerokuでDBのデータを</span>ダウンロードしたりアップロードしたり"
date: 2011-02-22
comments: true
categories: ruby
tags: ruby
published: true
---

Herokuでデータベース上のデータを、主にSQLite3を使用してダウンロードしたりアップロードする手順のメモ。

<!-- READMORE -->


## インストール

まずHerokuにデータベースファイルをアップロードしたり、Herokuからダウンロードしたりするには[taps](https://rubygems.org/gems/taps)というgemが必要になるのでインストールする。これをインストールすると、rack、sequel、sinatra、sqlite3、sqlite3-rubyなどが一緒にインストールされるので、gemの管理に気を使っている場合は注意が必要。

~~~ sh
$ gem install taps
~~~

ちなみに、こういう依存関係のgemを対象gemのインストール前に知る方法ってあるのかな？
`gem dependency`コマンドはインストール後のgemの依存関係を表示してくれるけど、インストール前に何が一緒にインストールされるのかはわからない。とググってたら、いちおう[RubyGems](http://rubygems.org/)のサイトに行けば調べられるみたい。

<cite>[taps \| RubyGems.org \| your community gem host](http://rubygems.org/gems/taps/versions/0.3.15)</cite>

これを見ると、tapsをインストールすると、上記の他にrest-clientやjsonも一緒にインストールされるっぽい。たしかに`gem list`してみたら入ってた。毎回こうやってRubyGemsのサイトを探して見るしかないのかな？ `gem`コマンドから調べられると嬉しいんだけど… とりあえず、tapsをインストールできたら準備完了。


## ダウンロード

Heroku上のDBファイルを、ローカルにダウンロードするには以下のように`heroku db:pull`コマンドを実行する。

~~~ sh
$ heroku db:pull sqlite://保存したいファイル名 --app Herokuアプリ名
$ heroku db:pull sqlite://dump.sqlite3 --app heroku-hello-world
~~~

すると、Herokuさんが「マジで実行するならアプリ名もっかい入力して？」と聞いてくるので、もう一度Herokuアプリ名をタイプしてエンターを押すと、ダウンロードが開始される。で、ローカルのカレントディレクトリに`dump.sqlite3`が生成される。


## アップロード

ローカルのDBファイル（`.sqlite3`ファイル）を、Heroku上にアップロードするには以下のように`heroku db:push`コマンドを実行する。

~~~ sh
$ heroku db:push sqlite://現在のディレクトリからのDBファイルへの相対パス --app Herokuアプリ名
$ heroku db:push sqlite://db/development.sqlite3 --app heroku-hello-world
~~~

すると、Herokuさんが「マジで実行するならアプリ名もっかい入力して？」と聞いてくるので、もう一度Herokuアプリ名をタイプしてエンターを押すと、アップロードが開始される。

* * *

<cite>[Heroku \| Dev Center \| Importing and Exporting Your Data](http://devcenter.heroku.com/posts/taps)</cite>
<cite>[Heroku \| Push and Pull Databases To and From Heroku](http://blog.heroku.com/archives/2009/3/18/push_and_pull_databases_to_and_from_heroku/)</cite>
<cite>[Ruby 1.8.7とjson1.5.1 x86-mswin32で、「msvcrt-ruby191.dllが見つからない」エラー - モンテカットの開発日記](http://d.hatena.ne.jp/MonteCut/20110219/1298103067)</cite>
