# Node.jsアプリをCoffeeScriptで記述する

[Node.jsでのHello world](/2011/06/19/heroku-node-js-express-hello-world)を済ませて、[expressコマンドでアプリの雛形を自動生成](/2011/06/20/node-js-express-app-generate)できるようになったので、自分がNode.jsに興味を持った当初の目的である以下について実行してみる。 <i>普段自分がRubyで使っているSinatra+Slim+Sassと似たような開発環境を、Node.jsでも*Express(CoffeeScript)+Jade+Sass*を使えば実現できるかも？</i>

個人的には、上記の憶測がなかったらNode.jsをやってみようと思わなかったと言っても過言ではないので、できるだけ早い段階でこの組み合わせをやってみたくて、まずはCoffeeScriptを触ってみた。

<!-- READMORE -->


## Node.jsアプリの雛形を自動生成

まずはNode.jsアプリの雛形を自動生成する。`-c`オプションでCSSにはSassを使うことを指定する。HTMLはデフォルトでJadeが選ばれるので指定はなし。

~~~ sh
$ express -c sass
destination is not empty, continue? y
   create : .
   create : ./package.json
   create : ./app.js
   create : ./public/stylesheets
   create : ./public/stylesheets/style.sass
   create : ./public/images
   create : ./public/javascripts
   create : ./pids
   create : ./views
   create : ./views/layout.jade
   create : ./views/index.jade
   create : ./logs
~~~

既にExpress, Jade, Sassはインストール済みなので、それらへのリンクを貼る。

~~~ sh
$ npm link express jade sass
./node_modules/sass -> /Users/ruedap/.node/v0.4.5/lib/node_modules/sass
./node_modules/express -> /Users/ruedap/.node/v0.4.5/lib/node_modules/express
./node_modules/jade -> /Users/ruedap/.node/v0.4.5/lib/node_modules/jade
~~~

これでNode.js雛形アプリを起動できるようになったはず。

~~~ sh
$ node-dev app.js
21 Jun 18:28:03 - [INFO] Started
Express server listening on port 3000
~~~

ここまでが[前回](/2011/06/20/node-js-express-app-generate)、[前々回](/2011/06/19/heroku-node-js-express-hello-world)のおさらい。


## ExpressをCoffeeScriptで

ExpressのコードをCoffeeScriptで書くための手順について。


### CoffeeScriptのインストール

CoffeeScriptをまだインストールしてなかったら、まずはインストール。

~~~ sh
$ npm install -g coffee-script
/Users/ruedap/.node/v0.4.5/bin/coffee -> /Users/ruedap/.node/v0.4.5/lib/node_modules/coffee-script/bin/coffee
/Users/ruedap/.node/v0.4.5/bin/cake -> /Users/ruedap/.node/v0.4.5/lib/node_modules/coffee-script/bin/cake
coffee-script@1.1.1 /Users/ruedap/.node/v0.4.5/lib/node_modules/coffee-script 
~~~

これで*coffeeコマンド*が利用可能になる。

~~~ sh
$ coffee -v
CoffeeScript version 1.1.1
~~~


### app.jsをapp.coffeeに変換

次に、*既存のJavaScriptをCoffeeScriptのコードに自動変換*できるツール`js2coffee`をインストールする。これは、先ほどexpressコマンドを使って自動生成したapp.jsを、わざわざ手書きでCoffeeScriptに書き直すのではなく、機械的に一発変換するため。

~~~ sh
$ npm install -g js2coffee
/Users/ruedap/.node/v0.4.5/bin/js2coffee -> /Users/ruedap/.node/v0.4.5/lib/node_modules/js2coffee/bin/js2coffee
js2coffee@0.1.0 /Users/ruedap/.node/v0.4.5/lib/node_modules/js2coffee 
~~~

インストールできたら、`js2coffee`コマンドを使って、`app.js`をCoffeeScriptのコードに変換して`app.coffee`として保存する。

~~~ sh
$ js2coffee app.js > app.coffee
~~~

すると`app.coffee`はこんな感じになった。

~~~ coffeescript
express = require("express")
app = module.exports = express.createServer()
app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.compiler(
    src: __dirname + "/public"
    enable: [ "sass" ]
  )
  app.use app.router
  app.use express.static(__dirname + "/public")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

app.get "/", (req, res) ->
  res.render "index", title: "Express"

app.listen 3000
console.log "Express server listening on port %d", app.address().port
~~~


コメント行は消されちゃうんだね。


### app.coffeeを自動変換

今作成した`app.coffee`をベースにしてコーディングしていくんだけど、更新(保存)したら`app.js`を自動で書き出すように設定する。ターミナルをもう1枚立ち上げておいて、`coffee`コマンドでapp.coffeeが更新されてるかどうかを監視しておく。

~~~ sh
$ coffee -wc app.coffee
20:14:15 - compiled app.coffee
~~~

こうしておくと、以降`app.coffee`が更新されるたびに自動でコンパイルされて`app.js`が上書き保存される。


## JadeとSass

HTMLをJadeで記述するのと、CSSをSassで記述するのは、expressコマンドの自動生成時に指定してあるので、基本的には何も設定することはないかな。

- views/layout.jade と views/index.jade
- public/stylesheets/style.sass

それぞれjadeファイルとsassファイルを適当に編集していけば良さそう。…と思ったら！ *なんとExpressで使えるSassは、Sinatraで使えるSassとは違うシロモノだった！*  
以降、[次回](/2011/06/22/node-js-express-app-css-template-stylus)に続く。

* * *

<cite>[jsをcoffeeに変換する - komagata](http://docs.komagata.org/4808)</cite>
<cite>[CoffeeScriptはじめの一歩 - 223 Software](http://www.223soft.net/37)</cite>
