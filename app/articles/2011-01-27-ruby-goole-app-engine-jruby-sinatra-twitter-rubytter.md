# <span>Google App EngineのJRubyで</span><span>SinatraからTwitterにつぶやけなかった</span>

[Google App EngineのJRubyでSinatraを使ってHello world](/2011/01/24/google-app-engine-jruby-sinatra-hello-world)を済ませたので、目的のTwitter Botを作り始めようと、まず手始めに手動でGAE上からTwitterにつぶやいてみようとしたんだけど、結果的にそれすらできなかった。

RubyのTwitterライブラリだと、そのままの名前の[twitter](https://github.com/jnunemaker/twitter)と[rubytter](https://github.com/jugyo/rubytter)の2つが有名だと思うんだけど、どちらも失敗した。原因はそれぞれ違うっぽいけども。おそらく自分の設定・デプロイ方法が悪かったんだと思うんだけど、JRuby特有の部分もあるのかなあ。

というわけで今回は、まったくもって何一つ解決出来ていない内容だけど備忘録。

<!-- READMORE -->


## twitterライブラリ

twitter 1.1.1ライブラリを`require`しただけで以下のエラーが出てしまった。以下はメインとなる`app.rb`のコード。OAuthに必要な各キーの文字列部分は変えてある。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'twitter'
before do
  Twitter.configure do |config|
    config.consumer_key       = "Consumer key"
    config.consumer_secret    = "Consumer secret"
    config.oauth_token        = "OAuth token"
    config.oauth_token_secret = "OAuth token secret"
  end
end
get '/' do
  'Google App Engine上のJRubyでSinatraを使ってHello world!'
end
get '/tweet' do
  t = Time.now # 同一内容投稿エラーの防止用
  Twitter.update("Google App EngineからHello world! at #{t}")
  "tweet complete"
end
~~~

`dev_appserver`で起動中にエラーが発生。[http://loaclhost:8080/](http://loaclhost:8080/) にアクセスしても以下のようなエラー。

~~~ sh
Internal Server Error (500)
Request Method: 	GET
Request URL: 	http://localhost:8080/500.html

no such file to load -- twitter from ./app.rb:3 from ./app.rb:1:in `require' from config.ru:1
~~~

ライブラリをロードできてないっぽい。いろいろ試行錯誤したけどこのエラーを解決できず、ここから一歩も進めずに終了。


## rubytterライブラリ

次にrubytterを使って同じことをやってみる。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'rubytter'
before do
  consumer = OAuth::Consumer.new(
    'Consumer key',
    'Consumer secret',
    :site => 'http://twitter.com'
  )
  access_token = OAuth::AccessToken.new(
    consumer,
    'OAuth token',
    'OAuth token secret'
  )
  @rubytter = OAuthRubytter.new(access_token)
end
get '/' do
  'Google App Engine上のJRubyでSinatraを使ってHello world!'
end
get '/tweet' do
  t = Time.now # 同一内容投稿エラーの防止用
  @rubytter.update("Google App EngineからHello world! at #{t}")
  "tweet complete"
end
~~~

`dev_appserver`でエラーが出ず起動した！期待age!
[http://localhost:8080/](http://localhost:8080/) には正常にアクセスできる！
[http://localhost:8080/tweet](http://localhost:8080/tweet) にアクセスするとエラー！くそー… 以下がエラー内容。

~~~ sh
LoadError at /tweet
no such file to load -- openssl

    * file: ssl.rb
    * location: require
    * line: 6
~~~

お、これならopensslを`require`すればいいだけじゃね？ってことで、`Gemfile`に`gem "jruby-opennssl"`を追加して、`app.rb`に`require "opennssl"`を追加して、さきほどと同じように、`dev_appserver`を起動して [http://localhost:8080/tweet](http://localhost:8080/tweet) にアクセスするとまたエラー！

~~~ sh
ArgumentError at /tweet
wrong # of arguments(3 for 2)

    * file: base.rb
    * location: digest
    * line: 12
~~~

引数が足りないとか言われても、全然知らないファイルのことを言っている。もうお手上げだー！JRubyむずい！ というわけで、GAEからTwitterへは一言もつぶやけずにTwitter Bot作戦は終了。

* * *

<cite>[10分ではじめる GAE/JRuby (OAuth + Sinatraのサンプル) - まちゅダイアリー(2009-09-03)](http://www.machu.jp/diary/20090903.html#p01)</cite>
<cite>[LoadErrorに心が折れそうなときに試したい2つのこと - 勇気があれば何でも動く!](http://d.hatena.ne.jp/tsua/20100504)</cite>
