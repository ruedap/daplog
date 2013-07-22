---
layout: article
title: "Node.js(Express)アプリの雛形を自動生成する"
date: 2011-06-20
comments: true
categories: node.js
tags: node.js
published: true
---

[昨日の記事](/2011/06/19/heroku-node-js-express-hello-world)では、Node.jsアプリでHello worldする際に、それに必要なファイル(web.js, package.json, Procfile, .gitignore)を1個ずつ新規作成してたけど、`express`コマンドを使えばその雛形を自動生成できることに後から気づいた。これを使うと、web.js(=app.js)とpackage.jsonの2つは自動生成できる。Sinatra単体には無い機能だね。

あと、Sinatraアプリ開発時に使われる自動リロード機能(ShotgunやSinatraReloaderなど)に相当する`node-dev`をちょっと使ってみたので、それについてもメモ。

<!-- READMORE -->


## expressをグローバルインストール

expressコマンドを使うには、Expressパッケージをグローバルインストールする。

~~~ sh
$ npm install -g express
/Users/ruedap/.node/v0.4.5/bin/express -> /Users/ruedap/.node/v0.4.5/lib/node_modules/express/bin/express
express@2.3.11 /Users/ruedap/.node/v0.4.5/lib/node_modules/express 
~~~

これでexpressコマンドが使えるようになる。

~~~ sh
$ express -v
2.3.11
~~~


## Node.js(Express)アプリの雛形を生成

expressコマンドを使って、今回は「hoge」アプリを作ってみる。

~~~ sh
$ express hoge
   create : hoge
   create : hoge/package.json
   create : hoge/app.js
   create : hoge/pids
   create : hoge/public/javascripts
   create : hoge/public/stylesheets
   create : hoge/public/stylesheets/style.css
   create : hoge/logs
   create : hoge/views
   create : hoge/views/layout.jade
   create : hoge/views/index.jade
   create : hoge/public/images
~~~

これでhogeフォルダと、その中にNode.js(Express)アプリに必要なファイルが自動生成される。
hogeフォルダに移動して、アプリを起動するのに必要なパッケージをインストールする。ここでは*Express*と*Jade*が必要。

~~~ sh
$ cd hoge
$ npm install express jade
jade@0.12.2 ./node_modules/jade 
express@2.3.11 ./node_modules/express 
├── mime@1.2.2
├── connect@1.4.6
└── qs@0.1.0
~~~

Expressパッケージをさきほどのグローバルと今のローカルの**2箇所にインストールしてる**のがちょっと謎なんだけど、こうしないとアプリを動かせられなかった。最初にグローバルインストールしたExpressパッケージを使うようにもできるのかな？ 要調査

<ins>コメント欄にてnak2kさんに`$ npm link express`とすれば、グローバルインストールされたパッケージへのリンクが貼られてそっちを使うようにできるよと教えてもらいました。これで2回インストールせずに済む模様。ありがとうございます。</ins>

これでもうNode.jsアプリ（雛形）を起動できるので、nodeコマンドを使って起動する。

~~~ sh
$ node app.js
~~~

<http://localhost:3000/> にアクセスして「Welcome to Express」と表示されていれば成功。Ctrl+Cでアプリを終了する。


## 自動リロードツールを使う

例えば、今作ったNode.js製Hogeアプリの「Welcome to Express」と表示されているところを「Welcome to Hoge」に変更したとする。Hogeアプリだからね。通常、その変更部分をアプリで確認したい場合、

1. nodeコマンドでアプリを起動していたら、一旦終了する
2. 再度nodeコマンドを使ってアプリを起動する

と、*変更を加えるたびにアプリを再起動する*必要がある。これはめんどい。これを自動で行ってくれるリロードツールが`node-dev`で、SinatraでいうとShotgunやSinatraReloaderに相当する。たぶん。これもExpressパッケージの時と同じように、グローバルインストールして`node-dev`コマンドを使えるようにする。

~~~ sh
$ npm install -g node-dev
/Users/ruedap/.node/v0.4.5/bin/node-dev -> /Users/ruedap/.node/v0.4.5/lib/node_modules/node-dev/node-dev
node-dev@0.1.6 /Users/ruedap/.node/v0.4.5/lib/node_modules/node-dev 
~~~

これでnode-devコマンドが使えるようになるので、node-devコマンドを使ってアプリを起動する。

~~~ sh
$ node-dev app.js
~~~

先ほどと同じように、<http://localhost:3000/> にアクセスすると「Welcome to Express」と表示されるはず。ここまでは同じ。で、さっそくapp.jsのウェルカム部分に修正を加えてみる。

~~~ javascript
app.get('/', function(req, res){
  res.render('index', {
    title: 'Hoge' // ここを変えた
  });
});
~~~

このように修正を加えて保存、<http://localhost:3000/> にもう一度アクセス（既に開いていればブラウザを更新）すると「Welcome to Hoge」に変更される。便利。

* * *

<cite>[CoffeeScriptはじめの一歩 - 223 Software](http://www.223soft.net/37)</cite>
<cite>[node.jsのプログラムを自動で再起動してくれるnode-devコマンド - 大人になったら肺呼吸](http://d.hatena.ne.jp/replication/20110224/1298474534)</cite>

