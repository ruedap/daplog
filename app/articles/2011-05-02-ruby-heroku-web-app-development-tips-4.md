---
layout: post
title: "<span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(4) Sinatraも使える</span>"
date: 2011-05-02
comments: true
categories: ruby
tags: ruby
published: true
---

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第4回では、Herokuで使えるWebフレームワーク「Sinatra」について書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## RailsもSinatraも使える

HerokuはRails専用のPaaSと思われがちですが、厳密にはそうではなく、RackというWebサーバーインターフェイス上で動作するものなら何でも動くようです。そしてこのおかげで[Sinatra](/2011/02/28/instagram-api-of-exclusive-use-for-cat-lovers-nekostagram)のような数ページしか存在しない低機能な場合には、Railsは重厚すぎるのでおそらく向きません。
こういった小さなWebアプリを目的として、**とりあえず試してみたい**や**小さな状態から必要なものを積み上げていきたい**場合に最適なのが、最小労力で手早くWebアプリを作成するためのフレームワークSinatraです

<cite>[Sinatra: README (Japanese)](http://www.sinatrarb.com/intro-jp.html)</cite>

SinatraのHello worldは4行で書けます。しかもそのコードはとても簡潔で、無駄なものがありません。

~~~ ruby
require 'sinatra'
get '/' do
  'Hello world!'
end
~~~

必要なものを、必要なときに追加していくタイプのWebフレームワークがSinatraです。以前話題になった[遅延評価的](http://blog.livedoor.jp/kensuu/archives/50555054.html)に学習・制作していくのに最適です。また、Railsが理解できなくて挫折した人にも超オススメです。Railsのチュートリアルを読みながら、Scaffoldで10分でブログを作ってみたけど、その先何をすればいいのかわからなかった人でも、Sinatraならきっと理解できます。自分がまさにそれでした。自分はRailsを未だに理解できていませんが、Sinatraはすんなり理解できて、自分の作りたいWebアプリをいくつか作ることができました。

もちろん、超有名でフルスタック、情報量もダントツのRailsもHerokuで使えるので、好みや状況に合わせてフレームワークを選ぶことができます。このSinatraとRailsの比較は、[前回述べた「2種類の簡単さ」](/2011/05/01/ruby-heroku-web-app-development-tips-3)に当てはまると思います。

- とっつきやすさのSinatra
- 高い利便性・生産性を誇るRails

おそらくフレームワークを触る時間が長く、量が多くなるほど、Railsのほうが効率的になっていくのだと予想していますが、まず最初の一歩はSinatraで始めてみるのもいいかもしれません。


## Padrinoも使える

もうひとつ、知っておきたいWebフレームワークとして[Padrino](http://www.padrinorb.com/)というものがあります。自分はまだちゃんと使ったことが無いので詳しい説明をできませんが、ざっくり言うと*SinatraとRailsの良いとこどりをしたWebフレームワーク*です。下記の記事やチュートリアルを見ているとPadrinoは、基本はSinatraで、そこにRails風の自動生成機能やテスト・国際化を追加したもののような感じです。

<cite>[Padrino＋MongoDB＋Herokuを使って、5分でWikiアプリ作成する &#171; blog.udzura.jp](http://blog.udzura.jp/2011/02/23/app-in-5-min-with-padrino-mongodb-heroku/)</cite>
<cite>[10分でできるPadrinoとMongoDBを使ったAPI作成 - Meltdown Countdown](http://d.hatena.ne.jp/marutanm/20110416/p1)</cite>

確かにSinatraをそれなりに使っていると、*ページネーションはどうするんだろう？*や*認証機能を実装するならどれが定番だろう？*や*英語と日本語ページを自動で振り分けるには？*などなど、Sinatra単体で持っていない機能を追加する方法やプラグインについて悩むことがあります。また、それらについてググッても、欲しい情報を得られることは多くはなく、その点のRailsのプラグイン・情報量の多さをいつも実感しています。

Padrinoはそういったよく使う機能については最初から含められているものもあり、Sinatraのシンプルさを多少犠牲にすることで高い利便性・生産性を持たせようとしているフレームワークのようです。SinatraとRailsのちょうど中間の位置づけですね。


## 他の言語にも影響を与えるSinatra

SinatraはRubyのためのWebフレームワークですが、その簡潔な設計思想は他のプログラミング言語にも影響を与え、Sinatra風に記述できるWebフレームワークが多くあります。
有名どころではJavaScriptの[Express](http://expressjs.com/)、Scalaの[Scalatra](http://www.infoq.com/jp/news/2010/10/scalatra)，Pythonの[Flask](http://ja.wikipedia.org/wiki/Flask)、PHPでは複数あるSinatra風フレームワークの比較記事が書かれるほどです。

<cite>[Sinatra風PHPマイクロフレームワーク5つ - ttaka/tmp](http://d.hatena.ne.jp/ttaka_tmp/20110428/1303973792)</cite>

SinatraはRailsほどの圧倒的な知名度・情報量では無いものの、マイナー過ぎて使う人の少ないWebフレームワークでも無いので、これから情報が増えることに期待でき、個人的には今後は**まずSinatraで入門し、さらに大きなアプリや複数人で開発する時にRailsやPadrinoを選ぶ**というのが初心者向けの定番ルートになるのではないのかな、と思っています。もちろん、Sinatraをそのまま使い続けることも選択肢のひとつとしてあると思います。


## 参考リンク

- [Sinatra: README (Japanese)](http://www.sinatrarb.com/intro-jp.html)
- [FLASHer のためのSinatra入門 ［導入編］ - func09](http://www.func09.com/wordpress/archives/764)
- [Ruby Freaks Lounge：第7回　小規模Webアプリのためのフレームワーク，Sinatra](http://gihyo.jp/dev/serial/01/ruby/0007)
- [Ruby Freaks Lounge：第9回　SinatraとSequel・Hamlで掲示板アプリを作る](http://gihyo.jp/dev/serial/01/ruby/0009)
- [Ruby Freaks Lounge：第41回　Sinatra 1.0の世界にようこそ](http://gihyo.jp/dev/serial/01/ruby/0041)
- [Ruby Freaks Lounge：第42回　実世界のSinatra](http://gihyo.jp/dev/serial/01/ruby/0042)
- [Sinatra と OAuth を使って Twitter のタイムラインを取得してみた](http://www.machu.jp/diary/20090818.html#p01)
- [GoogleAppEngine + JRubyでクリスマスまでに彼女をつくる方法](http://tech.kayac.com/archive/gae-jruby-twitter-bot.html)
- [text.ssig33.com - このサイトを Sinatra で書き直した。](http://text.ssig33.com/19)
- [System.Exit &#8211; GAE で Sinatra を使って “foo” を表示する最速の方法](http://jugyo.org/blog/3760)
- [GAE + JRuby + Sinatra + Ruby Twitter GemでTwitterのBotを作成する - 愛と勇気と缶ビール](http://d.hatena.ne.jp/zentoo/20090928/1254156587)
- [自己流でSinatraとRSpecとWebratとCucumber使ってみた。あとDataMapperも](http://d.hatena.ne.jp/mothprog/20090706/1246897103)
- [広告系エンジニア &#187; Blog Archive &#187; Ruby のフレームワークSinatraとデータベースPOSTGISによる小規模なアプリケーションの例](http://techknowledge.ngigroup.com/20100409/621)
- [RubyフレームワークSinatra の作者 Blake Mizerany氏のインタビューを翻訳してみた。](http://d.hatena.ne.jp/u16s/20110430/1304158119)


* * *

今回は、小さなWebアプリ作成に向いているフレームワーク「Sinatra」について書きました。
次回は、[実際にHerokuを利用する上で知っておくと便利な「環境変数ENV」](/2011/05/03/ruby-heroku-web-app-development-tips-5)について書きます。
