---
layout: article
title: "<span>Herokuアプリで</span>ドメイン単位のリダイレクトをするには"
date: 2011-05-17
comments: true
categories: ruby
tags: ruby
published: true
---

以前の記事、[Herokuアプリに独自ドメインを割り当てる](/2011/05/15/ruby-heroku-web-app-value-domain)の最後に書いたHerokuでのドメイン単位の転送に関する疑問点2つについて、解決したので備忘録。

<!-- READMORE -->


## 疑問点2つ

[Herokuアプリに独自ドメインを割り当てた](/2011/05/15/ruby-heroku-web-app-value-domain)後、2つの疑問点が浮上した。

1. `www.ruedap.com` にアクセスしたら、`ruedap.com` に転送するようにしたい
    - `www.ruedap.com` でも同じ内容を表示するだけなら、前述のAレコードの設定で「www」も設定すれば良いんだろうけど、転送したいのでちょっと違う。こういう場合は独自ドメイン側じゃなく、リダイレクトをHerokuアプリ側でするのかな？
2. 独自ドメイン設定後は、`ruedap.heroku.com` にアクセスしたら、`ruedap.com` に転送するようにしたい
    - このLokka用プラグイン[Redirect_if_heroku](http://blog.champierre.com/archives/911)のRubyコードが参考になりそう

これについて、記事のコメント欄にて[@uzdura](http://twitter.com/#!/udzura)さんがアドバイスしてくれて「rack-rewriteというgemを使うと簡単に解決できるよ」と教えてもらった。さらに、そのrack-rewriteのreadmeを日本語訳した記事まで書いてくれているので、このgemを使うなら必見。

<cite>[Rack::Rewrite の README を超訳してみました &#171; blog.udzura.jp](http://blog.udzura.jp/2011/05/15/rack-rewrite-readme-in-japanese/)</cite>

で、さっそくrack-rewriteを使って試してみたところ、上記の疑問点2つともサクっと解決できた。


## Rack::Rewriteを使う

今回は、自分がよく作る[Heroku用Sinatraアプリ](https://github.com/ruedap/heroku-sinatra-app-template)の構造をベースに[Rack::Rewrite](https://github.com/jtrupiano/rack-rewrite)を使ってみる。既に稼動しているSinatraアプリを前提に、`Gemfile`と`config.ru`の2ファイルを修正する。


### Gemfile

Gemfileには、普通にrack-rewriteのgemを追加するだけ。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'slim'
gem 'sass'
gem 'rack-rewrite'  # これを追加
~~~


### config.ru

`config.ru`には、前述の[Rack::Rewriteのreadme](https://gist.github.com/972903)の「CNAME の代わり」の項目を参考に、`use`メソッドを追加する。

~~~ ruby
require 'rubygems'
require 'bundler'
Bundler.require
# このメソッドを追加
if ENV['RACK_ENV'] == 'production'
  use Rack::Rewrite do
    r301 %r{.*}, 'http://ruedap.com$&', :if => Proc.new {|rack_env|
      rack_env['SERVER_NAME'] != 'ruedap.com'
    }
  end
end
require './app.rb'
run Sinatra::Application
~~~

`use`メソッド部分を文章で書くと、

- アクセスしてきたドメインが「ruedap.com」じゃなかったら、「ruedap.com」に置き換えた上で、それ以降のパスを付け足す（リダイレクトする）

という感じかな？ なんで引数がProcなのか、とか詳しいことはよくわからないけど動いた。あと、このリダイレクト処理が、例えばローカルでの動作チェック時の`localhost:9292`(rackup)や`ruedap.dev`(Pow)などで起動した時も`ruedap.com`にリダイレクトされたり、ステージング環境でも本番サイトにリダイレクトされてしまうのは問題がある。なので`RACK_ENV`が`production`の時だけ実行するように`if`で囲う。これでHerokuにデプロイすると、以下の疑問点(2)の方が解決できる。

- 独自ドメイン設定後は、`ruedap.heroku.com` にアクセスしたら、`ruedap.com` に転送するようにしたい

疑問点(1)の方は、www付きドメイン`www.ruedap.com`をHerokuへ向ける設定をしていないので、そもそもアクセスできない。ので、次の設定を加えることで解決する。


## www付きドメインをwww無しドメインにリダイレクト

これは単に、www無しドメイン`ruedap.com`の時と同じように、www付きドメイン`www.ruedap.com`もHerokuのAレコード用IPアドレスを追加してHerokuへ向かうように設定してあげれば良いだけ。そうすればHerokuアプリ側では、さきほどRack::Rewriteを使って設定した条件の

- アクセスしてきたドメインが`ruedap.com`じゃなかったら、`ruedap.com`に置き換えた上で、それ以降のパスを付け足す（リダイレクトする）

が発動するので、www無しドメインにリダイレクトされる。`ruedap.com`はバリュードメインで取得したドメインなので、以下はバリュードメインでの設定手順。


### バリュードメイン側の設定

バリュードメインの管理画面にログインしている状態で、以降の設定を行う。

1. まず、[取得済みドメイン一覧](https://www.value-domain.com/modall.php)のページから、対象のドメイン（今回の場合は`ruedap.com`）の「DNSレコードの変更/URL転送の変更」（緑色のDNSボタン）をクリックして、DNS設定画面を開く。
2. DNS設定画面の設定フィールドで、www無しドメインの設定（上3行）の後ろに、www付きドメインの設定（下3行）を付け加えて保存する。

~~~ text
a @ 75.101.163.44
a @ 75.101.145.87
a @ 174.129.212.2
a www 75.101.163.44
a www 75.101.145.87
a www 174.129.212.2
~~~

これで`www.ruedap.com` でもアクセスできるようになり、アクセスすればHeroku側でリダイレクトされるので`ruedap.com`になる。はず。というわけで疑問点(2)も解決。めでたしめでたし、となる予定が、まだめでたくなかった…。`www.ruedap.com`にアクセス出来るようになったら、エラー画面になってしまった。

[![エラー画面](/assets/2011/05/17/ruby-heroku-domain-redirect-rack-rewrite-01.png)](/assets/2011/05/17/ruby-heroku-domain-redirect-rack-rewrite-01.png)


## Heroku側のドメイン設定も必要

Heroku側でのドメイン設定も必要だった。大前提として`www.ruedap.com`を`ruedap.heroku.com`で受けて、その後に先ほどのRack::Rewriteの処理が走るので、その大前提が抜け落ちてた！

~~~ sh
$ heroku domains:add www.ruedap.com
Added www.ruedap.com as a custom domain name to ruedap.heroku.com
~~~

これでおｋ `www.ruedap.com` にアクセスしたら、`ruedap.com`に飛ばされた。というわけで疑問点(2)も解決。めでたしめでたし。教えてくれた[@udzura](http://twitter.com/#!/udzura)さんあざっす！


## Sinatra上でも出来るけど

上記の疑問点2つは、Sinatraアプリで使える組み込み変数`request.host`を使って、アクセスしてきたドメイン名を調べて同じようなことをやれば、おそらくSinatra上でも解決できそうだと思った。けど、

1. 自分で全部書くよりは、既にライブラリ化されているコードに任せたほうがミスが少なそう
2. Sinatraより一段低いレイヤーであるRack層で処理したほうが良い気がする
3. Rack::Rewriteのreadmeには「rackupファイル（config.ru）にこうやって書くよ」と書かれているので、このライブラリを利用する人の多くは同じ場所に書きそう＝config.ruを見ればrewriteルールが集まってると期待できそう

などの理由（妄想）により、このライブラリを使ったほうが良いかなーと思ったけど、どうなんだろう？ こういう時Railsなら、やり方が決まってて悩まなくても良いんだろうか。ということを、Railsを知らずにSinatraを使っていると良く思う。 Railsも使えるようにならねば…。

* * *

<cite>[Rack::Rewrite の README を超訳してみました &#171; blog.udzura.jp](http://blog.udzura.jp/2011/05/15/rack-rewrite-readme-in-japanese/)</cite>
<cite>[rack-rewrite README in japanese ― Gist](https://gist.github.com/972903)</cite>
