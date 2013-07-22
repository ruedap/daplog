---
layout: article
title: "HerokuでNode.jsとExpressを使ってHello worldする"
date: 2011-06-19
comments: true
categories: node.js
tags: node.js
published: true
---

普段自分は[Heroku+Sinatra+Slim+Sass](/2011/06/09/sassience-ruby-source-code-push-github)でWebアプリを作っているんだけど、Node.jsやCoffeeScriptについてちょっと調べてたら、Herokuを使う前提で、Node.js(Express)+Jade+Sassという組み合わせでCoffeeScriptで書けば、前述のSinatraアプリとほぼ同じような感覚で書けそうなことに気づいて、ぐっとNode.jsに興味が沸いた。

ということで、さっそくHerokuを使ってNode.jsアプリを作ってHello worldしてみた。今回の記事を最後まで行くと、[これ](http://node-hello-world.herokuapp.com/)が出来上がる。ソースコードは[GitHub](https://github.com/ruedap/node-hello-world/tree/0.0.1)に。

<!-- READMORE -->


## 各種インストール

この記事ではNode.jsとExpressだけを使ってHello worldする。今回はJadeやSass, CoffeScriptは出てこない。まず、Node.jsとExpressを使うのに必要なものをインストールする。あと、今回の手順はMac環境でやっていて、Windows環境では試していない。いずれ試すつもりではいるけど、もしWindows環境でうまくいった人がいれば教えてもらえると嬉しいです。


### Node.jsのインストール

Node.jsは、以前Powを使うためにインストールしたので既に入ってた。

<cite>[PowをSinatraアプリで使う](/20110420/ruby-pow-sinatra-rack-app/)</cite>

上記の方法でインストールした状態のままで、バージョンは0.4.5だった。

~~~ sh
$ node -v
v0.4.5
~~~


### npmのインストール

npmはNode.js関連のパッケージマネージャで、RubyでいうRubyGemsだと思うたぶん。以下のコマンドでインストールする。

~~~ sh
$ sudo curl [http://npmjs.org/install.sh](http://npmjs.org/install.sh) | sh
~~~

途中でYes/Noと聞かれるので、Yesと答えたらなんか色々削除された。よくわからず。正常にインストールされれば、npmコマンドが利用可能になる。バージョンは1.0.13だった。

~~~ sh
$ npm -v
1.0.13
~~~


### expressのインストール

んで、フレームワークの[express](http://expressjs.com/)をインストールする。RubyでいうSinatraに相当する。というか、Sinatraに影響を受けたフレームワーク。npmコマンドを使うと、パッケージはプロジェクトフォルダごとにインストールされるっぽい(?)ので、まずプロジェクトフォルダ`node-hello-world`を作って、そこでインストールコマンドを実行する。バージョンは2.3.11だった。

~~~ sh
$ mkdir node-hello-world
$ cd node-hello-world
$ npm install express .
express@2.3.11 ./node_modules/express 
├── mime@1.2.2
├── connect@1.4.5
└── qs@0.1.0
~~~


## 各種ファイルの作成

Node.jsアプリを構成する上で必要な各種ファイルを作成する。


### web.js

まずメインのコードとなる`web.js`を作る。Sinatraアプリで言う`app.rb`に相当する。

~~~ coffeescript
var express = require('express');

var app = express.createServer();

app.get('/', function(req, res) {
    res.send('HerokuでNode.jsとExpressを使ってHello world!');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});
~~~


### package.json

次にNode.jsアプリの情報や使用するパッケージの情報を記述する`package.json`を記述する。Sinatraアプリで言うGemfileに相当しそうだけど、アプリ自体の情報も含んでいるのでちょっと違うかな？

~~~ json
{
  "name": "node-hello-world",
  "version": "0.0.1",
  "dependencies": {
    "express": "2.3.11"
  }
}
~~~


### Procfile

次に新Heroku環境（新スタック）であるCedarから採用された`Procfile`を作成する。これは今までのHerokuアプリには無かったもので、[Herokuアプリの動作方法（プロセスモデル）](http://devcenter.heroku.com/posts/process-model)を指定するもの。web, worker, clockの3種類があるんだけど、webが今までのWebアプリで、他の2つはよくわからない。今回はWebアプリを作っているので`web`を指定する`Procfile`を作成する。

~~~ sh
web: node web.js
~~~


### .gitignore

最後に`.gitignore`を作る。先ほどexpressをプロジェクトディレクトリ直下の`node_modules`フォルダにインストールしたので、これをコミットに含めないように指定しておく。

~~~ git
node_modules
~~~


以上の4ファイルが作成できれば準備は完了。

~~~ sh
.
├── .gitignore
├── Procfile
├── package.json
└── web.js
~~~


## ローカルプレビュー

上述の4ファイル＋パッケージ（`node_modules`フォルダ）で作ったNode.jsアプリをローカルでプレビューするには、`node`コマンドを使って、

~~~ sh
$ node web.js
Listening on 3000
~~~

として、<http://localhost:3000/>にアクセスする。もしくは、Procfileファイル経由で起動する場合は[foreman](https://github.com/ddollar/foreman)というgemを使うとできる。`$ foreman start`すると、`Procfile`の中身を参照してアプリを起動してくれる。

~~~ sh
$ gem install foreman
$ foreman start
01:06:59 web.1     | started with pid 3756
01:06:59 web.1     | Listening on 5000
~~~

上述のとおり5000番ポートで起動しているので、<http://localhost:5000/>にアクセスすると「HerokuでNode.jsとExpressを使ってHello world!」と表示されるはず。上記どちらかの方法で、Node.jsアプリの動作が確認できたら、Ctrl+CでNode.jsアプリを終了する。


## Herokuへデプロイ

最後にHerokuへNode.jsアプリをデプロイするけど、*従来のようにHerokuアプリを新規作成してはNode.jsアプリを動かすことはできないので注意。* 新しいStackで作る必要がある。さらに、*heroku gemのバージョンが古いと新しいStackのHerokuアプリを新規作成できないので要注意。* これでちょっとハマった。まずはheroku gemのアップデートをしておこう。

~~~ sh
$ gem update heroku
$ gem list heroku
###  LOCAL GEMS ***

heroku (2.3.3)
~~~

heroku gemをアップデートしたら、新しいCedarスタックでHerokuアプリを新規作成する。

~~~ sh
$ heroku create node-hello-world --stack cedar
Creating node-hello-world... done, stack is cedar
[http://node-hello-world.herokuapp.com/](http://node-hello-world.herokuapp.com/) | git@heroku.com:node-hello-world.git
~~~

このように`--stack cedar`と新しいStackを指定して作成する必要があり、Cedarスタックを指定して作ったHerokuアプリは、従来の「アプリ名.heroku.com」というドメインではなく、「アプリ名.herokuapp.com」のドメインで作成される。heroku.comとherokuapp.comの違いは[ここ](http://devcenter.heroku.com/posts/http-routing)に書いてあるっぽいけど英語よくわからん。良くなってる感はなんとなく伝わってくる。以降の部分は、従来のデプロイと同じ手順。

~~~ sh
$ git add .
$ git commit -m 'first commit'
$ git push heroku master
$ heroku open
~~~

これでデプロイが完了。<http://node-hello-world.herokuapp.com/>を開けば「HerokuでNode.jsとExpressを使ってHello world!」と表示されているはず。ここまでのソースコード一式をGitHubに置いた。

<cite>[ruedap/node-hello-world at 0.0.1 - GitHub](https://github.com/ruedap/node-hello-world/tree/0.0.1)</cite>


## まとめ

まだHello worldしただけなので、どうこう言えるレベルではないのだけど、Herokuへデプロイするまでの流れは、今までのSinatraアプリと大差なく行えた。あとはコーディング周りでRuby+Sinatraの簡単さ・簡潔さをどれだけCoffeScript+Node.jsで実現できるか、が自分にとっては重要なので、これから触って試してみたい。

ただ、1点困ってるのが「Node.js使うと何が嬉しいの？」が自分の中で明確になっていないので、使うモチベーションがあがらない。よく聞く「リアルタイムやプッシュ型のWebアプリに適している」「JavaScriptで書ける」などは自分には今のところ大きなメリットにはなっておらず、
<i>ふつーのWebアプリを、Ruby+Sinatraで作るときに比べて、メリットは何か？</i>
がわからなくてモヤモヤしてる感じ。これが見つけられると、グッと傾きそうな予感がしないでもない。逆に言えば、これが無い限りは、今まで通り使い慣れたRuby+Sinatraで作ったほうが効率が良いということになりそう。


### 追記

はてブのコメント欄で教えていただいた[@hide\_o\_55](http://twitter.com/#!/hide_o_55)さんのNode.jsメリット・デメリットの記事がわかりやすかった。

<cite>[Node.jsの使いどころ - WebService::Blog->new( user => ’hide\_o\_55’ )](http://d.hatena.ne.jp/hide_o_55/20110223/1298476056)</cite>

現状はやはり、リアルタイムやプッシュ型のWebアプリを作成するのに適していて、無理に利用するものではないし、今すぐ既存の技術をリプレースするものでは無い模様。念の為に言っておくと、Node.jsを否定しているわけじゃなく、すごく賑わっていて注目されてて気になっているんだけど、それを使った場合の自分の中でのメリットをちゃんと把握できてない、ってだけの話なので誤解なきよう。

ノンブロッキングI/Oと言われてもしっくりこない人は多いんじゃないかな？ 今の自分がそう。色々な記事を読んだりして、どういう場面で使えるか？ 自分が使っている今の技術に比べてどんな利点があるか？ を調べている段階。中でも以下の2つの記事はとてもわかりやすかった。

<cite>[node.js とは何か - I am Bad at Math](http://d.hatena.ne.jp/badatmath/20101020/1287587240)</cite>
<cite>[Node.jsとは何か、開発者ライアン・ダール氏が語る（前編）～ノンブロッキングとはどういうことか？ － Publickey](http://www.publickey1.jp/blog/11/nodejs.html)</cite>

* * *

<cite>[Express - node Webフレームワーク \| 日本語ドキュメンテーション](http://hideyukisaito.com/doc/expressjs/)</cite>
<cite>[Heroku + Node.js + ExpressでHelloWorldを書いてみた。 \| EIPラボ](http://www.eiplab.com/2011/06/heroku-node-js-express-helloworld/)</cite>
<cite>[Heroku \| Dev Center \| Getting started with Node.js on Heroku/Cedar](http://devcenter.heroku.com/posts/node-js)</cite>
