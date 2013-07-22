---
layout: article
title: "<span>はてなスターの総数を表示できる</span><span>「はてなスターカウンター」を作ってみた</span>"
date: 2011-04-21
comments: true
categories: web
tags: web
published: true
---

<ins>4月21日23時頃から3日間ほど、利用している[Heroku(Amazon EC2)の障害](http://itpro.nikkeibp.co.jp/post/NEWS/20110421/359696/)により、はてなスターカウンターのトップページおよびカウンターにアクセスしづらい・できない状況が続いていました。利用してくださっている方にはご迷惑をおかけして申し訳ありません。</ins>

[![はてなスターカウンターのロゴ](/assets/common/logo-hatenastar-counter.gif)](http://hatenastar.heroku.com/)

[ねこすた](http://nekostagram.heroku.com/)、[いぬすた](http://inustagram.heroku.com/)の次は[はてすた](http://hatenastar.heroku.com/)という*すた*つながりなのはまったくの偶然なんだけど、自分のブログに貼り付ける用に欲しかったので、はてなスターの総数を表示できる[はてなスターカウンター](http://hatenastar.heroku.com/)を作ってみた。

<!-- READMORE -->


## みんな大好きはてなスター

[はてなスター](http://s.hatena.ne.jp/)って良いサービスだと思うんだけど、いまいちパッとしないというか、地味というか、微妙に使いづらいというか、まぁそういうところも含めて好きなんだけど。

はてなブックマークと役割が若干かぶってて、最近TwitterのTweetボタンやFacebookのいいね！などに押され気味で、なおかつ、もうすぐGoogle先生が+1ボタンというのを出してくるので、今後さらに目立たなくなってしまいそうなはてなスター。それでも自分の書いたブログ記事にスターを付けてもらえると嬉しいし、使う側から見ても前述の他のサービスに比べるとはてなスターは最も気軽に使えるサービスだと思う。昨今流行りの魔法の言葉じゃないけど、気軽にスターを付けて「読んだよ！」「だよね！」「ありがとう！」などのいろいろな意味やシチュエーションで今後も使っていきたい。そんなはてなスターという素敵なサービスに、この「[はてなスターカウンター](http://hatenastar.heroku.com/)」がちょっとでもお力添えできればこれ幸い。


## カウンターが公式に無かった

このカウンターを作ろうと思ったのは、最近ちょくちょくこのブログでスターをもらえるようになったので、[はてなブックマークカウンター](http://b.hatena.ne.jp/help/bcounter)のように、自分のブログにブログパーツとしてはてなスターのカウンターも付けたいなぁと思ったのがキッカケ。

なぜかはてな公式には、前述の「[はてなブックマークカウンター](http://b.hatena.ne.jp/help/bcounter)」はあるのに、はてなスター用のカウンターが無かった。2007年頃からその要望は出ているみたいだけど、まだ実現していないっぽい。

<cite>[はてなアイデア - 【再要望】「ブログ」上に付けられたはてなスターの総数を表示できるscounterモジュール](http://i.hatena.ne.jp/idea/17915)</cite>

で、ググッてみたら、はてな公式ではなく、個人が作っているはてなスター用のカウンターを見つけたんだけど、カウンターの色が1色だけだったのと、実際使ってみたらカウンターの数値がゼロしか表示されなくて、使用を断念。

さらにググッてみたら、[Groovyで作っている人](http://d.hatena.ne.jp/orangeclover/20100917/1284733347)がいて、その人のブログ経由で、はてな公式に[はてなスターカウントAPI](http://developer.hatena.ne.jp/ja/documents/star/apis/count)が用意されていることを知ったので、自分で作れそうだと思って、Rubyで作り始めた。


## APIを使う部分は超簡単

[Instagram](/2011/02/28/instagram-api-of-exclusive-use-for-cat-lovers-nekostagram)の時より簡単だった。Rubyだと以下のような感じでスター数を取れる。

~~~ ruby
uri = 'http://d.hatena.ne.jp/hatenastar/'
str = open("http://s.hatena.ne.jp/blog.json/#{uri}") do |data|
  data.read
end
json = JSON.parse(str)
star_count = json['star_count']
~~~

カウンターの基本部分となるこの処理は簡単ですぐ動いたんだけど、そこから先のカウンター画像を生成する部分や、自分用だけではなく公開して多くの人に使ってもらえるようにする部分が結構むずかしかった。


## カウンター画像の生成

カウンター画像の生成にはImageMagick/RMagickを使う必要があって、これが今回のWebサービスを作る上での1つの課題だった。というか、使う以前にインストール周りでつまずきまくった。
そこらへんのImageMagick/RMagickについての試行錯誤は、ここらへんの記事にまとめてある。いちおうこれでカウンター画像の生成はできるようになった。

<cite>[MacでImageMagickとRMagickをインストールする](/2011/03/20/mac-ruby-imagemagick-rmagick-install)</cite>
<cite>[RubyのRMagickで画像をリサイズする](/2011/03/21/ruby-rmagick-imagemagick-resize-scale-thumbnail-sample)</cite>
<cite>[RubyのRMagickで縦横比固定でリサイズしたり切り抜いたり](/2011/03/22/ruby-rmagick-imagemagick-resize-crop)</cite>
<cite>[WindowsでImageMagickとRMagickをインストールする](/2011/04/09/windows-ruby-imagemagick-rmagick-install)</cite>
<cite>[HerokuでRMagickを使おうとしてrequireでハマった](/2011/04/10/ruby-heroku-use-rmagick-bundler-require)</cite>
<cite>[RMagickで使用可能なフォント名の一覧を出力する](/2011/04/11/ruby-rmagick-output-font-name-list)</cite>
<cite>[HerokuでSinatraを使ってRMagickの使用可能フォント名を出力する](/2011/04/12/ruby-heroku-sinatra-rmagick-output-font-list)</cite>
<cite>[RMagickでフォント名を指定して文字列を描画する](/2011/04/13/ruby-rmagick-font-draw-string-annotate)</cite>
<cite>[RMagickを使って生成した画像をHerokuで表示する2つの方法](/2011/04/14/ruby-heroku-rmagick-display-generate-image)</cite>


## 一般公開するためのつくり

自分専用に使う分には、リクエストがあるたびに毎回APIを叩いて、毎回画像を生成するだけの書き殴ったコードで十分だったけど（実際これで1週間ほど自分のブログだけで運用してみたけど問題なかった）、それを多くの人に使ってもらうために、ちゃんと*Webサービスとしての対策を施したものに作り直す*のが、今回大きな課題だった。

たとえば、前述の既存のカウンターでは、自分が使ったときは毎回数字がゼロしか表示されなかった。これは何が原因だろうかと考えたとき、はてなスターカウントAPIのAPIリクエスト回数制限[^1]に引っかかってしまって、正確な値が取れていないのではないか、と想像した。だとすると、*極力APIへのリクエスト数を減らすための対策*を取る必要があり、今回はデータベースに一旦スター数などの情報を保存して、最後のリクエストから1時間以上経過していたら再度APIから最新のデータを取ってくる、というような処理に書きなおした。

また、前述のカウンター画像の生成にしても、毎回同じ画像を生成していてはサーバー側のリソースを無駄にしまくるので、アクセス数が増えたときにはメモリー不足などで正常にカウンター画像を生成出来なくなることが予想される。そうならないために、キャッシュファイルや事前に静的ファイルを用意するなどして対策を取った。


## デザイン

一般公開するためのつくりとして、もう1つ重要そうなのがデザイン。今回このWebサービスを作った時間の約半分は、このデザイン部分に使った気がする。

何かのWebサービスを自分が使う側になって考えてみたとき、やっぱり何もデザインされてないWebサービスを使うよりは、*パキっとデザインされたWebサービスのほうが使いたい気になる*し、はてブしたいと思うし、スターを付けたいと思うし、さらに人に伝えたいと思う。できるだけ多くの人に使ってもらいたいなら、デザインは避けられない要素だというのはいつも痛感している。

そういう意味で今回は、できる限りかっこよさげな、こういっちゃ失礼かもしれないけど、あまり*はてなっぽくないビビッドな感じ*で作りたかった。はてなスターに少しだけシャレオツ感を出したかった。雰囲気イケメンになりたかった。そういう部分が今回のデザインで、少しでも醸し出されていれば嬉しいのだけど。


## プロモーション

あとWebサービスを広く使ってもらうための重要そうな要素にプロモーションがある。これは[Nekostgram](http://nekostagram.heroku.com/)の時に目の当たりにしたのだけど、*Twitter上でものすごい勢いでRTが連鎖していくバイラル効果*は恐ろしいものがあり、あれを引き起こせると、個人が作ったちっぽけなWebサービスでも、まったくお金を掛けずに広く告知できるというのを実感した。幸運なことに今回は、既に多くの有名な方々にツイートやはてブをしてもらえており、中でもはてな社長のid:jkondoさんにこのWebサービスについてツイートしてもらえたので、幸先の良いスタートを切れた気がする。

<blockquote class="twitter-tweet"><p>なんか出てる / はてなスターカウンター http://htn.to/ngZ2En</p>&mdash; 近藤淳也 (@jkondo) <a href="https://twitter.com/jkondo/statuses/60929113678032896">April 21, 2011</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この[はてなスターカウンター](http://hatenastar.heroku.com/)が多くの人に使ってもらえると嬉しい。ぽぽぽぽーん！

[^1]: 実はこのはてなスターカウントAPIのAPIリクエスト回数制限について、はてなのサポート窓口に4月7日に問い合わせたのだけど、まだ回答を得られてません。もし、詳しく知っている人がいたら教えてください。→サポートの方から回答をいただけました。回数制限は明確には決まってないとのことでした。
