# HerokuでSinatraを使ってHello worldする

[Google App EngineのJRubyでTwitter Botを作る](/2011/01/24/google-app-engine-jruby-sinatra-hello-world)つもりだったんだけど、[Twitterライブラリ関連でうまくできなかった](/2011/01/27/ruby-goole-app-engine-jruby-sinatra-twitter-rubytter)ので、環境を変えてHerokuでやってみることにした。

<cite>[Heroku \| Ruby Cloud Platform as a Service](http://heroku.com/)</cite>

Herokuでは無料プランだとcronを1日1回しか使えない[^1]ので、あまりTwitter Botには向いてないと思うんだけど、とりあえずデプロイが簡単なのと、JRubyのような互換性とかに悩まされることはないので、入門には向いているかもしれない。最終的には、超低機能Twitter Botの完成まで持って行きたい。

今回はHeroku上にHello worldと表示するだけの準備～デプロイまでの最低限の流れ。この記事での完成形は[これ](http://heroku-hello-world.heroku.com/)。

<!-- READMORE -->


## 環境

まず前提として以下の2つがあって、

- [Heroku](https://heroku.com/)にサインアップ済みであること
- [Git](/2010/08/14/git-install)が利用できる環境であること

今回利用するRuby環境はこんなかんじ。[RVM](/2011/01/12/ruby-version-manager-rvm-install)を利用している。

- Ruby 1.8.7 p330
- Rack 1.2.1
- Bundler 1.0.7
- Heroku 1.17.0
- Sinatra 1.1.2
- Shotgun 0.8


## インストール

RackとBundlerとHerokuとSinatraが必要なので、それらをインストールする。

~~~ sh
$ gem install rack bundler heroku sinatra
~~~

必須ではないけど、Sinatraアプリのローカルプレビューで便利なのでShotgunをインストールする。名前かっこいい。

~~~ sh
$ gem install shotgun
~~~


## Heroku用プロジェクトを作成

フォルダを作って、Gitリポジトリを作成する。Herokuを使う上でGitは必須になる。

~~~ sh
$ mkdir heroku-hello-world
$ cd heroku-hello-world
$ git init
~~~

`heroku`コマンドを使ってHeroku用アプリをHeroku上に作成する。

~~~ sh
$ heroku create heroku-hello-world
~~~

希望する名前を指定すると、それが使用可能ならサブドメイン名になる。

もし、

~~~ sh
No ssh public key found in /Users/ruedap/.ssh/id_[rd]sa.pub.  You may want to specify the full path to the keyfile.
~~~

と出た場合は、

~~~ sh
$ git gui
~~~

でGUIなGitを起動して、ヘルプメニューから「SSHキーを表示」を選んで、「鍵を生成」ボタンを押してパスフレーズを入力。鍵が生成されてからもう一度、

~~~ sh
$ heroku create heroku-hello-world
~~~

すると、<http://heroku-hello-world.heroku.com/>にアクセスできるようになり、[Herokuの管理画面](https://api.heroku.com/myapps)にも新しいアプリが生成されているはず。これで下準備が完了。


## 各種ファイルを作成

プロジェクトフォルダ直下に3つのファイルを作成する。

~~~ sh
$ tree
.
├── Gemfile
├── app.rb
└── config.ru
0 directories, 3 files
~~~

まず、Bundler用の`Gemfile`ファイルを作成する。

~~~ ruby
source :rubygems
gem 'sinatra'
~~~

次に、Rack用の`config.ru`ファイルを作成する。

~~~ ruby
require 'app'
run Sinatra::Application
~~~

最後に、Sinatraの処理を記述する`app.rb`ファイルを作成する。

~~~ ruby
require 'rubygems'
require 'sinatra'
get '/' do
  'HerokuでSinatraを使ってHello world!'
end
~~~


## ローカルプレビュー

Shotgunを使ってローカルで確認する。[^2]

~~~ sh
$ shotgun -O app.rb
~~~

`shotgun`コマンドに`-O`オプションをつけると、サーバー起動後に自動的にブラウザで [http://127.0.0.1:9393/](http://127.0.0.1:9393/) を開いてくれる。便利。「HerokuでSinatraを使ってHello world!」と表示されればローカルでの準備は完了。


## bundle

デプロイに向けて、まず利用するgemの仕様書を整える儀式。

~~~ sh
$ bundle install
~~~

`Gemfile.lock`が生成されれば完了。


## commit

コミット前に、ローカルでは最終的にこんな配置になっていればOK。

~~~ sh
$ tree
.
├── Gemfile
├── Gemfile.lock
├── app.rb
└── config.ru
0 directories, 4 files
~~~

でコミットする。

~~~ sh
$ git add .
$ git commit -m 'heroku hello world!'
~~~


## デプロイ

~~~ sh
$ git push heroku master
~~~

でデプロイされる。ちょうかんたん。

~~~ sh
$ heroku open
~~~

`open`すると、<http://heroku-hello-world.heroku.com/>をブラウザで開いてくれるので、そこに「HerokuでSinatraを使ってHello world!」と表示されていればおｋ。基本的な流れは以上で終わり。 

以降の実際のアプリ開発は、Shotgunでローカルプレビュー環境を起動しておいて、`app.rb`にアプリに追加したい機能を記述してはブラウザで確認する、を繰り返す。デプロイ前には、利用するgemが追加されたならそれを`Gemfile`に追加して`bundle install`しなおして、gitでadd, commit, pushする。で良いはず。このあとのライブラリ周りなどでハマらないことを祈りつつ、続きは次回。

---

<cite>[Ruby版PaaSの"Heroku"で無料Railsホスティング環境を手に入れよう - Social Change!](http://kuranuki.sonicgarden.jp/2009/05/rubypaasherokurails.html)</cite>

[^1]: さらに支払いは発生しないけどクレジットカード情報の登録が必要
[^2]: GAE/JRubyのdev_appserver.rbコマンドのように、Heroku専用のローカルプレビュー方法があったりするのかな？ちょっとわからなかったので、Shotgunを使って普通にプレビューした
