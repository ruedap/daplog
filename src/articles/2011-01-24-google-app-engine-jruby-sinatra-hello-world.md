# <span>Google App EngineのJRubyで</span><span>Sinatraを使ってHello worldする</span>

Google App EngineのJRubyでSinatraを使って、Hello worldと表示するだけの準備～デプロイまでの最低限の流れをメモった。それでも結構長い工程になった。最終的にはTwitter Botとかを作りたいんだけど、けっこう難しそうだなあ。

とりあえず今回の工程の完成形は[これ](http://gae-hello-world.appspot.com/)。GAEアプリは初回起動にめっちゃ時間かかるので、誰もアクセスしていない状態だと、表示されるまでに数秒～数十秒かかることも。

<!-- READMORE -->


## JRubyのインストールとgemのセットアップ

まずは[RVM](/2011/01/12/ruby-version-manager-rvm-install)を使ってJRubyをインストールする。結構時間掛かる。今回使用するJRubyのバージョンは1.5.6。

~~~ sh
$ rvm install jruby
~~~

GAE用にgemsetを作る。

~~~ sh
$ rvm gemset list
gemsets for jruby-1.5.6 (found in /Users/ruedap/.rvm/gems/jruby-1.5.6)
global
$ rvm gemset create gae
'gae' gemset created (/Users/ruedap/.rvm/gems/jruby-1.5.6@gae).
$ rvm gemset use gae
Now using gemset 'gae'
$ rvm gemdir
/Users/ruedap/.rvm/bin/rvm: fork: Resource temporarily unavailable
/Users/ruedap/.rvm/gems/jruby-1.5.6@gae
~~~

google-appengineライブラリのインストールする。

~~~ sh
$ gem --version
1.3.6
$ gem search -r google-appengine
###  REMOTE GEMS ***
google-appengine (0.0.19)
$ gem install google-appengine
~~~


## GAE用プロジェクトを作成

`appcfg.rb`を使ってGAE用プロジェクトを作成する。

~~~ sh
$ rvm use jruby@gae --default
Using /Users/ruedap/.rvm/gems/jruby-1.5.6 with gemset gae
$ appcfg.rb generate_app gae-hello-world
~~~

`dev_appserver.rb`を使ってローカルサーバーを起動して動作を確認する。

~~~ sh
$ dev_appserver.rb gae-hello-world/
~~~

[http://localhost:8080/](http://localhost:8080/) にアクセスして「Hello」と表示されればおｋ。ターミナルに戻って<kbd>Ctrl+C</kbd>でローカルサーバー終了。


## GAEにアクセスしてアプリを作成

ブラウザで[Google App Engine](http://appengine.google.com/start/createapp)にアクセスしてアプリを作成する。作成にはGoogleのアカウントが必要。今回はこんな感じで入力した。

|Application Identifier:|gae-hello-world|
|Application Title:|GAE Hello world|

Application Identifierに入力した文字列がサブドメインになるので、公開されるアプリのURLは今回の場合だと<http://gae-hello-world.appspot.com/>となる。Application Titleは良くわからないけど、管理画面で表示する名前に使われる程度かな？

サブドメインとアプリ名が決まったらCreate Applicationボタンを押してアプリを作成する。この時点で [http://gae-hello-world.appspot.com/](http://gae-hello-world.appspot.com/) にアクセス可能になるが、アクセスしても「Error: Not Found」と表示される。


## GAE上に作成したアプリ情報をローカルのプロジェクトに追加

`gae-hello-world/WEB-INF/app.yaml`内の`application`の項目を、さきほどGAE上で作成したApplication Identifierと同じ文字列に修正する。

~~~ yaml
application: gae-hello-world
version: 1
runtime: jruby
~~~

今回はGAE用プロジェクト名とGAE上のアプリ名(Application Identifier)が同じなので変更はなし。


## GAE上にプロジェクトをデプロイ

デプロイするには`appcfg.rb`を使って`update`を実行する。

~~~ sh
$ appcfg.rb update gae-hello-world/
~~~

コマンド実行中にGAE(Google)のE-mailアドレスとパスワードを聞かれるので入力する。最後のほうで*Success.*と表示されればおｋ。

[http://gae-hello-world.appspot.com/](http://gae-hello-world.appspot.com/) にアクセスすると今度はちゃんと「Hello」と表示される。ここまでで、第一段階終了。


## Sinatraのインストールとデプロイ用のセットアップ

上記の「Hello」は`config.ru`に書かれたRackの処理で、Sinatraはまだ使ってない。というかインストールすらしていないのでまずインストールする。

~~~ sh
$ gem install sinatra
Successfully installed tilt-1.2.2
Successfully installed sinatra-1.1.2
2 gems installed
~~~

デプロイ用に`Gemfile`を開いて、gemの部分にSinatraの行を追加する。

~~~ ruby
# Critical default settings:
disable_system_gems
disable_rubygems
bundle_path ".gems/bundler_gems"
# List gems to bundle here:
gem 'appengine-rack'
gem 'sinatra'  # これを追加
~~~

次に`config.ru`を開いて、Sinatraを起動するように書き換える。

~~~ ruby
require 'app'
run Sinatra::Application
~~~

最後に`app.rb`を作成して、SinatraでHello worldするコードを記述する。

~~~ ruby
require 'sinatra'
get '/' do
  'Google App Engine上のJRubyでSinatraを使ってHello world!'
end
~~~

`dev_appserver.rb`を使ってローカルサーバーを起動して動作を確認する。

~~~ sh
$ dev_appserver.rb gae-hello-world/
~~~

[http://localhost:8080/](http://localhost:8080/)にアクセスして「Google App Engine上のJRubyでSinatraを使ってHello world!」と表示されればOK。ターミナルに戻って<kbd>Ctrl+C</kbd>で終了。


## GAE上にプロジェクトをデプロイ

本日2回目のデプロイ。やり方は1回目と同じ。

~~~ sh
$ appcfg.rb update gae-hello-world/
~~~

2回目なのでE-mailアドレスとパスワードはたぶん聞かれない。再起動したりすると聞かれるっぽい。最後のほうで*Success.*と表示されればおｋ。

[http://gae-hello-world.appspot.com/](http://gae-hello-world.appspot.com/)にアクセスすると「Google App Engine上のJRubyでSinatraを使ってHello world!」と表示される。ここまでで今回の全行程完了。おつかれさまでした。

参考にした以下の公式チュートリアルは、DataMapperでBigTableを使ったりしてもっと高度なことをやってるっぽいけど、それはまた今度。

* * *

<cite>[GettingStarted - appengine-jruby - Getting Started with JRuby on Google App Engine - Project Hosting on Google Code](http://code.google.com/p/appengine-jruby/wiki/GettingStarted)</cite>
