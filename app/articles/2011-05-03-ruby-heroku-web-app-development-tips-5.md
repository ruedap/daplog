---
layout: article
title: "<span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(5) 環境変数ENV</span>"
date: 2011-05-03
comments: true
categories: ruby
tags: ruby
published: true
---

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第5回では、実際にHerokuを利用する上で知っておくと便利な「環境変数ENV」について書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## 環境変数ENVが便利

この環境変数ENVって、Heroku以外にも普通に備わっているものでしょうか？ 自分は他のPaaS環境やVPSなどを詳しく知らないので、どの環境にも備わっている常識的なことを力説してたらちょっと恥ずかしいんですが、Herokuで初めて知って便利だと思ったので書きます。これからHerokuを使い始めるなら知っておいて損はないです。

Herokuでは、Herokuアプリ単位で環境変数を設定することが可能です。コマンドプロンプトから`heroku`コマンドで設定することができ、その値をRubyコード内からは、`ENV['HOGEHOGE']`というハッシュ（連想配列）で参照することができます。この値はHerokuアプリ（サーバー）側に保存されます。これを使うと何が便利なのかというと、以下の2点を実現できます。

- パスワードやAPIキーなどのコード内に埋め込みたくない情報を外部化できる
- 別々のアプリで同じ値を参照することで、汎用的なコードを書ける


## コード内に埋め込みたくない情報を外部化

1つ目は、このような使い方をできます。例えば、パスワードなどは直接コード内に書きたくありません。

~~~ ruby
password = 'hero+haiku'  # パスワードを直接コード内に書きたくない
~~~

以下のように、実際の値を直接書かずに、Rubyコード内では環境変数ENV（連想配列）を参照するように書いておき、

~~~ ruby
password = ENV['PASSWORD']
~~~

実際の値は、`heroku`コマンドを使ってHerokuアプリ側の環境変数ENVに持たせておくことができます。

~~~ sh
$ heroku config:add PASSWORD="hero+haiku"
Adding config vars:
  PASSWORD => hero+haiku
Restarting app...done.
~~~

上記はconfigのaddで変数の値を追加していますが、`heroku config`コマンドを使えば、そのHerokuアプリに現在登録されている環境変数の一覧を見ることができます。

~~~ sh
$ heroku config
BUNDLE_WITHOUT      => development:test
DATABASE_URL        => postgres:// （省略）
LANG                => en_US.UTF-8
PASSWORD            => hero+haiku （前述のaddで追加したパスワード）
RACK_ENV            => production
SHARED_DATABASE_URL => postgres:// （省略）
~~~

このように*秘密にしたい値を外部化*しておけば、GitHubなどにソースコードを公開する場合でも安心です。実際にHerokuとGitHubで同じソースコードをプッシュする場合の環境変数ENVについて、詳しくはこちらの記事を参考にしてください。

<cite>[HerokuとGitHubの両方にプッシュする時の秘密にしたい値の扱い](/2011/01/30/git-heroku-github-push-secret-value)</cite>


## 汎用的なコードを書ける

2つ目は、環境変数ENVの使い方はまったく同じなのですが、Herokuアプリごとに別の値を持つことで、ソースコードの汎用化ができるようになります。具体例としては、[Nekostagramのソースコード](/2011/03/09/nekostagram-inustagram-ruby-source-code-push-github)を見てもらうのがわかりやすいです。

[Nekostagram](http://nekostagram.heroku.com/)と[Inustagram](http://inustagram.heroku.com/)の2つのサイトを見比べてもらうと明らかですが、基本機能はまったく同じです。実際、Rubyのソースコードもまったく同一のコードを使用しており、Herokuアプリの環境変数ENVの値で、ネコ(cat)なのかイヌ(dog)なのかを判断しています。Rubyコード側では以下のようにその値を取得しています。

~~~ ruby
@target_tag  = ENV['INSTAGRAM_TARGET_TAG'] || 'cat'
~~~

あらかじめherokuコマンドを使って`ENV['INSTAGRAM_TARGET_TAG']`の値を、Nekostagramのアプリ側では`cat`、Inustagramのアプリ側では`dog`と指定してあるので、Rubyコード内ではその環境変数を参照して、その値を元にコード内で分岐させています。こうすることで、2つのアプリのソースコードを1つで管理することができ、修正が必要になった場合に1箇所を直すだけで良いという楽をできています。

* * *

今回は、Herokuアプリごとに設定できる「環境変数ENV」の便利さについて書きました。
次回は、[Herokuなら簡単に作れる動作チェック用のサイト「ステージング環境」](/2011/05/04/ruby-heroku-web-app-development-tips-6)について書きます。
