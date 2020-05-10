# HerokuのSinatraでTwitterにつぶやく

過去記事をベースに、今回はHerokuのSinatraからTwitterに手動でつぶやく処理を書く。

<cite>[RubyでTwitterのOAuth認証に必要なトークンを取得する](/2011/01/26/ruby-twitter-oauth-token-secret)</cite>
<cite>[HerokuでSinatraを使ってHello worldする](/2011/01/28/ruby-heroku-sinatra-hello-world)</cite>
<cite>[HerokuアプリをGitHubにもプッシュする](/2011/01/29/git-heroku-app-push-github)</cite>
<cite>[HerokuとGitHubの両方にプッシュする時の秘密にしたい値の扱い](/2011/01/30/git-heroku-github-push-secret-value)</cite>

[Google App Engineの時に失敗](/2011/01/27/ruby-goole-app-engine-jruby-sinatra-twitter-rubytter)した、[twitterライブラリ](https://github.com/jnunemaker/twitter)を使用する。
結果的に今回はうまくいった。完成形は[これ](http://heroku-hello-world.heroku.com/tweet)だけど、今回のはあまり公開に向いていない作りなので、アップしてあるツイート部分の処理はコメントアウトしてある。

<!-- READMORE -->


## app.rbを編集

`app.rb`を以下のように書き換える。[ENVの値はこのやり方](/2011/01/30/git-heroku-github-push-secret-value)で作っておく。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'twitter'
before do
  Twitter.configure do |config|
    config.consumer_key       = ENV['CONSUMER_KEY']
    config.consumer_secret    = ENV['CONSUMER_SECRET']
    config.oauth_token        = ENV['OAUTH_TOKEN']
    config.oauth_token_secret = ENV['OAUTH_TOKEN_SECRET']
  end
end
get '/' do
  'HerokuでSinatraを使ってHello world!'
end
get '/hoge' do
  ENV['HOGE']
end
get '/tweet' do
  t = Time.now # 同一内容投稿エラーの防止用
  Twitter.update("HerokuのSinatraからHello world! at #{t}")
  "tweet complete"
end
~~~

`tweet`メソッドを作って、<http://heroku-hello-world.heroku.com/tweet>にアクセスするとつぶやくようにする。


## Gemfileを編集

twitterライブラリを使用するので、`Gemfile`に追加する。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'twitter'
~~~

`bundle install`して`Gemfile.lock`を生成する。

~~~ sh
$ bundle install
~~~


## デプロイ

`commit`する。

~~~ sh
$ git add .
$ git commit -a -m 'add tweet method'
~~~

Herokuに`push`する。

~~~ sh
$ git push heroku master
$ heroku open
~~~

<http://heroku-hello-world.heroku.com/tweet>にアクセスすると「tweet complete」と表示され、Twitter側には「HerokuのSinatraからHello world! at Sat Jan 22 21:08:15 -0800 2011」のような感じでつぶやかれる。


## オマケ

GitHubに`push`してタグを付ける。

~~~ sh
$ git push origin master
$ git tag -a 0.5 -m 'blog update'
$ git push --tags
~~~

こうするとGitHub上でタグごとにダウンロードできるようになる。

---

<cite>[GitHub でタグを打って tgz/zip アーカイブ をダウンロードできるようにする：Goodpic](http://www.goodpic.com/mt/archives2/2010/08/github_tgzzip.html)</cite>
