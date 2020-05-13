# Herokuでステージング環境を作る

[![プロダクションとステージングのHerokuアプリ](/images/2011/02/20/ruby-heroku-staging-enviroment-01.png)](/images/2011/02/20/ruby-heroku-staging-enviroment-01.png)

Herokuはフリーミアムモデルを採用しているので、無料範囲内のHerokuアプリ[^1]であれば、まったく同じ内容の[ステージング環境](http://www.weblio.jp/content/%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0%E7%92%B0%E5%A2%83)を無料で構築することができる。ということを[この記事](http://blog.exdesign.jp/heroku)で知ってなるほどと思ったので、実際にやってみた。

<!-- READMORE -->


## ステージング用Herokuアプリの追加

既にHerokuアプリがあるGitリポジトリに、ステージング環境用にもう一つHerokuアプリを追加する。追加方法は、普通にheroku createするだけ。

~~~ sh
$ heroku create heroku-hello-world-staging --remote staging
~~~

上記のように`--remote`オプションを指定すると、その名前でremote先を追加できる。

~~~ sh
$ git remote -v
heroku  git@heroku.com:heroku-hello-world.git (fetch)
heroku  git@heroku.com:heroku-hello-world.git (push)
staging git@heroku.com:heroku-hello-world-staging.git (fetch)
staging git@heroku.com:heroku-hello-world-staging.git (push)
~~~

ちなみに、2個目のHerokuアプリの`--remote`オプションを省略した場合は、git remoteには何も追加されず、元のHerokuアプリのgit remote情報を上書きしたりもしないので、忘れても大丈夫。


## 環境変数ENVの変更

次に、Herokuアプリの環境変数`ENVのRACK_ENV`の値を`production`から`staging`に忘れずに変更しておく。この値を使って、本番用かステージング用なのかをコード内で判別する。

~~~ sh
$ heroku config:add RACK_ENV=staging --app heroku-hello-world-staging
Adding config vars:
  RACK_ENV => staging
Restarting app...done.
~~~

また、ここからは常に、`heroku`コマンドを使ってステージング用Herokuアプリに対して何かを行う場合は、以下のように`--app heroku-hello-world-staging`と指定する必要がある。[^2] 指定しないと、本番用Herokuアプリの情報を参照・変更してしまうので注意。例えば、今設定した`RACK_ENV`の値を参照する場合はこんな感じに。

~~~ sh
$ heroku config --app heroku-hello-world-staging
BUNDLE_WITHOUT      => development:test
DATABASE_URL        => postgres://aowho...s.com/aowhownobg
LANG                => en_US.UTF-8
RACK_ENV            => staging
SHARED_DATABASE_URL => postgres://aowho...s.com/aowhownobg
~~~

このように、Herokuアプリの環境変数`ENV`は、アプリごとに保持されていて、例えばTwitter BotのOAuth認証用トークンなどを別のものに分けておけるので、全く同じソースコードを本番用アプリ／ステージング用アプリの両方にアップしていても、`ENV`の設定さえ間違えていなければ、ステージング用Herokuアプリが本番用Twitterアカウントでツイートしてしまう、なんてことは起こらない。


## ステージング用をBasic認証

さきほど変更した`RACK_ENV`の値を使って、ステージング用アプリの方にBasic認証でアクセス制限をかける。SinatraでのBasic認証の使い方は[以前の記事](/2011/02/19/ruby-sinatra-rack-heroku-basic-auth)を参考にこんな感じで。

~~~ ruby
configure :staging do
  use Rack::Auth::Basic do |username, password|
    username == ENV['STAGING_BASIC_AUTH_USERNAME'] && password == ENV['STAGING_BASIC_AUTH_PASSWORD']
  end
end
~~~

もちろん上記に該当する環境変数の追加を忘れずに。追加先はステージング用のほう。

~~~ sh
$ heroku config:add STAGING_BASIC_AUTH_USERNAME="staging" STAGING_BASIC_AUTH_PASSWORD="staging" --app heroku-hello-world-staging
Adding config vars:
  STAGING_BASIC_AUTH_PASSWORD => staging
  STAGING_BASIC_AUTH_USERNAME => staging
Restarting app...done.
~~~

最終的に、ステージング用アプリの方の環境変数`ENV`はこんな感じに。

~~~ sh
$ heroku config --app heroku-hello-world-staging
BASIC_AUTH_PASSWORD         => fuga
BASIC_AUTH_USERNAME         => hoge
BUNDLE_WITHOUT              => development:test
DATABASE_URL                => postgres://aowho...s.com/aowhownobg
LANG                        => en_US.UTF-8
RACK_ENV                    => staging
SHARED_DATABASE_URL         => postgres://aowho...s.com/aowhownobg
STAGING_BASIC_AUTH_PASSWORD => staging
STAGING_BASIC_AUTH_USERNAME => staging
~~~


## デプロイ

デプロイはリモート先を`staging`にするだけでおｋ

~~~ sh
$ git commit -am 'create staging enviroment'
$ git push staging master
$ heroku open --app heroku-hello-world-staging
Opening [http://heroku-hello-world-staging.heroku.com/](http://heroku-hello-world-staging.heroku.com/)
~~~

ページを開いたら、Basic認証になるはず。問題がなければ本番環境にもデプロイする。

~~~ sh
$ git push heroku master
$ heroku open
~~~

---

<cite>[Herokuで認証付きのステージング環境を構築する - exdesign](http://blog.exdesign.jp/heroku)</cite>

[^1]: 有料でもアプリ毎で課金するタイプのアドオン等じゃなければ大丈夫かも？課金したことないのでわからず。
[^2]: gitのcheckoutみたいに切り替えて固定するようなコマンドが欲しい
