---
layout: article
title: "<span>Node.jsアプリで</span><span>CSSテンプレートにStylusを使う</span>"
date: 2011-06-22
comments: true
categories: node.js
tags: node.js
published: true
---

[前回](/2011/06/21/node-js-express-app-coffee-script)のつづき。Node.js(Express)で使えるSassは、1つ前の旧型のSassシンタックスで、現在最新のバージョン3形式での記述が出来なかったという話。これを改善する情報をいろいろ探し回った末、[Stylus](http://learnboost.github.com/stylus/)という新しいCSSテンプレートに出会ったぁ（ウルルン風に）

<!-- READMORE -->

## 旧型Sass問題

[Sass](http://sass-lang.com/)は、現在最新版のバージョン3でのシンタックスと、それ以前のシンタックスで微妙に書き方が違う。さらに、バージョン3からはSCSS形式も導入されたので、結構ややこしい。expressコマンドの-cオプションを使って、Sassを指定した場合に自動生成されるstyle.sassはこんな感じ。これは旧型のSassシンタックス。

~~~ sass
body
  :padding 50px
  :font 14px "Lucida Grande", Helvetica, Arial, sans-serif
a
  :color #00B7FF
~~~

一方、現在のバージョン3のSass形式はこんな感じで書く（もちろん、古いほうでも書ける）。GitHubは両方とも色が付くので、Sass 3.0が使われてるみたい。

~~~ sass
body
  padding: 50px
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif
a
  color: #00B7FF
~~~

上記で比較すると、コロンの位置しか違わないけど、他にも細かいところで違うっぽい。「っぽい」というのは自分は新しいバージョン3からSassを使い始めたので、古いほうの書き方を知らないから。で、*Expressで使えるSassは旧型の方のみ*。 これは困った。


## 新星Stylus

困ったなぁと色々情報を探してたんだけど、上記の点について日本語で言及されているところは見つけられなくて、渋々英語ページを覗いたりしてて、最後に辿りついたのがNode.js版Sassの作者のGitHubページ。

<cite>[visionmedia/sass.js - GitHub](https://github.com/visionmedia/sass.js)</cite>

その中で作者は「Stylusっていう別プロジェクトでもっとスゴイの作ってるからこっちがおすすめだよ！」的なことを書いていたので見てみたら、たしかに凄かった。

<cite>[Stylus](http://learnboost.github.com/stylus/)</cite>

Sassのバージョン3よりもさらに簡潔で省略しまくりで書けるっぽい。ここまで省略しちゃうとシンタックスカラーリングが無いと意味が分からなくなりそう…。[Vimのはあった](https://github.com/wavded/vim-stylus)。とりあえず面白そうなのでこのStylusを使ってみることにした。というわけで早速インストール。現在のバージョンは0.13.3みたい。

~~~ sh
$ npm install -g stylus
/Users/ruedap/.node/v0.4.5/bin/stylus -> /Users/ruedap/.node/v0.4.5/lib/node_modules/stylus/bin/stylus
stylus@0.13.3 /Users/ruedap/.node/v0.4.5/lib/node_modules/stylus 
~~~


## 試しにexpressコマンドで

ものは試しと、ダメ元でexpressコマンドの`-c`オプションでstylusを指定してみたら...できた。 さっき「新星Stylus」とか書いちゃったけど、既にExpressで採用されているところをみると、もしかして既にメジャーだったり？ とにもかくにも、これは嬉しい誤算。猛烈にめんどくさがりなので、デフォルト状態で*expressコマンドで雛形を自動生成できる*のはありがたい。

~~~ sh
$ express hoge -c stylus
   create : hoge
   create : hoge/package.json
   create : hoge/app.js
   create : hoge/views
   create : hoge/views/layout.jade
   create : hoge/views/index.jade
   create : hoge/public/stylesheets
   create : hoge/public/stylesheets/style.styl
   create : hoge/public/images
   create : hoge/public/javascripts
   create : hoge/logs
   create : hoge/pids
~~~

というわけで、自動生成で.stylファイルが生成された。拡張子は`.styl`なんだね。style.stylってなんか気に入った。中身を見てみると、ちゃんとStylus式っぽい内容（コロンが無い）で書かれてた。

~~~ sass
body
  padding 50px
  font 14px "Lucida Grande", Helvetica, Arial, sans-serif
a
  color #00B7FF
~~~

app.jsの方を見てみると、こちらもなんかStylusを使うためのそれっぽい指定がちゃんとある。すばらしー。

~~~ javascript
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
~~~

「node-dev app.js」でNode.jsアプリを起動してみたらすんなり動いたし、.stylファイルを書き換えてアクセスするたびに*.cssファイルへの自動変換*もちゃんとされてる模様。まだStylusがExpressで動くことを確認しただけで、Stylus自体については全然ちゃんと書いたことないんだけど、とりあえず形から入るタイプなので、すんなりStylusが使えるようになって良かった。


## 現在の開発環境

昨日、自分がNode.jsに興味を持った開発環境周りについて、<i>普段自分がRubyで使っているSinatra, Slim, Sassと似たような開発環境を、Node.jsでもExpress(CoffeeScript), Jade, Sassを使えば実現できるかも？</i>
と思っていたのが、今回のStylusさんの参入で、<i>Express(CoffeeScript), Jade, *Stylus*を使えば、Sinatra, Slim, Sassにかなり近い環境になるかも？</i> に一歩前進したのでした。めでたし。

というわけでかなり理想に近い環境が整ったっぽいので、手始めに小さなNode.jsアプリとかつくってみたいところ。ただ、そもそも言語が違ったりするので、いつも使ってるRubyに比べたらやっぱ難しいし、色々ハマったりしてるけど、新しい環境でやるのは学ぶことが多くて楽しい。以降、次回に続くかも。

* * *

<cite>[Stylus](http://learnboost.github.com/stylus/)</cite>
<cite>[visionmedia/sass.js - GitHub](https://github.com/visionmedia/sass.js)</cite>
<cite>[wavded/vim-stylus - GitHub](https://github.com/wavded/vim-stylus)</cite>
