# <span>Herokuそっくり！</span><span>DuostackでSinatraを使ってHello worldする</span>

RubyとNode.jsが使えるPaaSという触れ込みの「[Duostack](http://www.duostack.com/)」をRubyのSinatraで使ってみた。操作体系が驚くほどHerokuにそっくりで、今回の記事は以前Heroku用に書いた[HerokuでSinatraを使ってHello worldする](/2011/01/28/ruby-heroku-sinatra-hello-world)をベースにしていて、この記事の中に出てくる`heroku`コマンドのところを`duostack`コマンドに置き換えるだけでだいたい使えるようになってしまうくらいのレベル。今回の完成品は[こちら](http://duohelloworld.duostack.net/)。ちなみに、DuostackをNode.jsで使うチュートリアル記事は[こちら](http://ukstudio.jp/2011/05/10/duostack_nodejs/)が詳しくてわかりやすかった。

<!-- READMORE -->


## 聞きかじったDuostackの前知識

Twitterやブログなどで、Duostackを使う以前から聞きかじっていた情報が以下。

- 操作体系がHeorkuにクリソツらしい
- デフォルトのDBはMySQLらしい （HerokuはPostgreSQL）
- アプリ名(URL)にハイフンが使えないらしい （Herokuでは使える）
- 使えるRubyのバージョンは1.8系だけらしい （Herokuは1.8.6/1.8.7/1.9.2が利用可能）
    - Duostackでも使用できるRubyのバージョンは[1.8.7と1.9.2で選択可能](http://docs.duostack.com/ruby/config-options#command-line-client-examples)でした。

今回のチュートリアル記事で、実際に試してみたら<del datetime="2011-05-12T21:09:41+09:00">4つとも</del>3つだけその通りだった。

<ins>Rubyのバージョンは1.9.2も利用可能でした。初出時に間違った情報を載せてしまいました、ごめんなさい。</ins>


## Ruby環境

前提としては以下の2つ。

- [Duostack](http://www.duostack.com/)にサインアップ済みであること
- Gitが利用できる環境であること

今回利用するRuby環境とGem。試したのはMacで[RVM](/2011/01/12/ruby-version-manager-rvm-install)を利用している。

- Ruby 1.8.7 p334
- Bundler 1.0.13
- Duostack 0.5.0
- Sinatra 1.2.6 （Bundlerで入れる）

現状Windows（でRubyの場合）では、Cygwinを使わないと利用できないと[Duostackのサイト](/2011/02/07/git-windows-msysgit-github)やコマンドプロンプトでやってみたところ、確かにduostack createコマンドでアプリを作成するところでエラーになってしまってその先に進めなかった。今後の対応待ちかな。自分はCygwinを使ってないので、Cygwin環境での利用は試してない。ちなみに、HerokuではWindowsのmsysGitやコマンドプロンプトでも普通に利用できる。


## gemのインストール

ここから先は、実際にDuostackでSinatraを使ってHello worldするまでの手順となる。まず、BundlerとDuostackが必要なので、それらをインストールする。

~~~ sh
$ gem install bundler duostack
~~~


## Duostack用のフォルダ（gitリポジトリ）を作成

Duostack用のフォルダを作って、gitリポジトリを作成する。Duostackを使う上でGitは必須になる。

~~~ sh
$ mkdir duostack-hello-world
$ cd duostack-hello-world
$ git init
~~~

次に、`duostack`コマンドを使ってDuostackアプリを作成する。最後のアプリ名は任意で、好きな名前を付けられる。ここで付けた名前がURLになり、http://*アプリ名*.duostack.net/ でアクセスできるようになる。

~~~ sh
$ duostack create duostack-hello-world
~~~

初回は、Duostackサインアップ時に登録したメールアドレスとパスワードを聞かれるので入力する。

~~~ sh
First-time Duostack client setup
Email: 
Password: 
Completed initial setup... waiting for sync...
~~~

噂通り、アプリ名にハイフンが使えないようで、`duostack-hello-world` と入力したらエラーが出た。

~~~ sh
$ duostack create duostack-hello-world
duostack: invalid app name, see app name restrictions in help docs
~~~

仕方ないのでアプリ名を`duohelloworld` にして、再度Duostackアプリの作成を試みる。

~~~ sh
$ duostack create duohelloworld
App created
Git remote added, to push: 'git push duostack master'
~~~

Duostackアプリの作成に成功すると、git remoteにduostackが自動で追加される。

~~~ sh
$ git remote -v
duostack	git@duostack.net:duohelloworld.git (fetch)
duostack	git@duostack.net:duohelloworld.git (push)
~~~

この時点で、既に<http://duohelloworld.duostack.net/>にはアクセスできるようになっており、アクセスすると「No Duostack app configured」と表示される。また、[Duostackサイト上のアプリ管理画面](https://www.duostack.com/apps)にも生成したアプリ名が出現する。

[![Duostackの画面](/assets/2011/05/12/ruby-duostack-sinatra-hello-world-01.png)](/assets/2011/05/12/ruby-duostack-sinatra-hello-world-01.png)


## 各種Rubyファイルを作成

Duostack上にアプリのスペースを確保したので、そこにアップするSinatraアプリのコードを書く。最終的に、以下のようにプロジェクトフォルダ直下に4つのファイルを作成する。

~~~ sh
.
├── Gemfile
├── config.ru
├── app.rb
└── .gitignore
0 directories, 4 files
~~~


### 1. Gemfile

まず、`Gemfile`ファイルを作成する。Sinatraが必要なので、その指定を記述する。

~~~ ruby
source :rubygems
gem 'sinatra'
~~~

で`bundle install`する。

~~~ sh
$ bundle install --path vendor/bundle
Fetching source index for [http://rubygems.org/](http://rubygems.org/)
Installing rack (1.2.2) 
Installing tilt (1.3) 
Installing sinatra (1.2.6) 
Using bundler (1.0.13) 
Your bundle is complete! It was installed into ./vendor/bundle
~~~

`vendor/bundle`フォルダにgemがインストールされて、`Gemfile.lock`が生成される。


### 2. config.ru

次に、Rack用の`config.ru`ファイルを作成する。ここで全部requireするようにしておく。

~~~ ruby
require 'rubygems'
require 'bundler'
Bundler.require
require './app.rb'
run Sinatra::Application
~~~


### 3. app.rb

そしてアプリの本体となる、Sinatraの処理を記述する`app.rb`ファイルを作成する。今回はトップページにアクセスしたらHello worldと表示する処理だけを記述。

~~~ ruby
get '/' do
  'DuostackでSinatraを使ってHello world!'
end
~~~


### 4. .gitignore

最後に、gitリポジトリに含めなくて良いファイルを指定する`.gitignore`ファイルを作っておく。中身は例えば以下のような感じ。このファイルは必須ではないので無くてもOK

~~~ git
.DS_Store
/.bundle
/vendor
~~~

Bundler関連のファイルはgitリポジトリに含めなくて良いので、それを指定しておく。


## ローカルでプレビュー

上記で作成したデプロイ予定のSinatraアプリを、まずはローカルでプレビューしてみる。ローカルでアプリを起動するには、Bundler経由で`rackup`コマンドを実行する。

~~~ sh
$ bundle exec rackup
[2011-05-12 00:13:44] INFO  WEBrick 1.3.1
[2011-05-12 00:13:44] INFO  ruby 1.8.7 (2011-02-18) [i686-darwin10.7.0]
[2011-05-12 00:13:44] INFO  WEBrick::HTTPServer#start: pid=66511 port=9292
~~~

この状態で、<http://localhost:9292/>にアクセスして「DuostackでSinatraを使ってHello world!」と表示されれば準備オッケー。`Ctrl+C`でローカルプレビューのSinatraアプリを終了しておく。


## デプロイ

それではDuostack上に作ったアプリの<http://duohelloworld.duostack.net/>に向けてデプロイする。まずは今まで作ったファイルを全部、gitリポジトリにコミットする。

~~~ sh
$ git add .
$ git commit -m 'first commit'
~~~

コミットができたら、Duostackにgit pushでデプロイする。

~~~ sh
$ git push duostack master
~~~

初回はRSA鍵がらみでこのまま実行しておｋ？的なことを聞かれる。多分オッケーなのでyesと答えておく。

~~~ sh
Are you sure you want to continue connecting (yes/no)?
~~~

あとはデプロイが完了するのを待つだけ。以下はその時のログ。DBで使うMySQL用gemをインストールしているのがみえるので、デフォルトのDBは噂通りMySQLっぽい。

~~~ sh
====  Duostack deploy received for duohelloworld
====  Detected Gemfile; running Bundler to install gems...
      Fetching source index for [http://rubygems.org/](http://rubygems.org/)
      Installing mysql2 (0.3.2) with native extensions 
      Installing rack (1.2.2) 
      Installing tilt (1.3) 
      Installing sinatra (1.2.6) 
====  Installed 4 new and 1 existing gems successfully
====  Compiling app... done
      Compressed size is 1.5MB
====  Launching first instances...... done
====  App successfully deployed to [http://duohelloworld.duostack.net](http://duohelloworld.duostack.net)
To git@duostack.net:duohelloworld.git
 * [new branch]      master -> master
~~~

デプロイが完了したら、<http://duohelloworld.duostack.net/>にアクセスしてみると「DuostackでSinatraを使ってHello world!」と表示されているはず。これでSinatraアプリのDuostackへのデプロイが完了！ここまでのソースコードの状態をGitHubに置いたので参考までに。

<cite>[ruedap/duostack-hello-world at 1.0 - GitHub](https://github.com/ruedap/duostack-hello-world/tree/1.0)</cite>


## 感想

ほんとにおそろしいほどHerokuにソックリでビックリする。既にHerokuを使っている人なら、ほとんど学習コストも無くDuostackを利用できるのではないだろうか。まだHello worldしかしてないけど、Herokuと比較した場合、Herokuのほうが高機能・便利な印象を受けた。Duostackは新しくできたばっかりなので今後に期待。

また、以前の記事で触れている[AWS障害対策という意味でのHerokuの代替PaaS](/2011/05/07/ruby-heroku-web-app-development-tips-9)としては、Duostackも裏側でAWSを利用しているので対策にならない。AWS以外の障害・バックアップ対策のHeroku代替としては、操作体系がクリソツなのでかなり有力だと思った。

* * *

<cite>[Duostack &#183; Docs: Quick Start Guide](http://docs.duostack.com/ruby/quick-start-guide)</cite>
<cite>[HerokuでSinatraを使ってHello worldする](/2011/01/28/ruby-heroku-sinatra-hello-world)</cite>
