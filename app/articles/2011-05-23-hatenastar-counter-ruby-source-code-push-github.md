---
layout: article
title: "<span>はてなスターカウンターのソースコードを</span>GitHubに公開してみた"
date: 2011-05-23
comments: true
categories: ruby
tags: ruby
published: true
---

[はてなスターカウンターの公開](/2011/04/21/hatenastar-counter)から既に1ヶ月以上が経過しているので今更感はあるけれど、はてなスターカウンターのソースコードを[GitHubに公開](https://github.com/ruedap/hatenastar-counter)してみた。

<!-- READMORE -->


## 今回もHeroku+Sinatra+Slim+Sass

[はてなスターカウンター](http://hatenastar.heroku.com/)のソースコードを公開しているリポジトリはこちら。

<cite>[ruedap/hatenastar-counter - GitHub](https://github.com/ruedap/hatenastar-counter)</cite>

今回も過去の自作Webアプリと同じで、[Heroku](http://www.heroku.com/)、[Sinatra](http://www.sinatrarb.com/)、[Slim](http://slim-lang.com/)、[Sass](http://sass-lang.com/)の組み合わせで作っている。

自分の中ではこの組み合わせはほぼ鉄板となりつつあって、よほどの理由が無い限りはまずこのセットでどう作るかを考え始める。この前の[Herokuの大規模障害](/2011/05/07/ruby-heroku-web-app-development-tips-9)によって、Heroku以外の代替プラットフォームを探したりしてみたけど、今のところHerokuより便利そうなのは見つけられていない。

また、WebフレームワークのSinatraも小さいアプリを作るには最適で、これからちょっとずつ大きなものに移行していくなら、RailsやPadrinoを勉強したいと思っているけど、必要にならないとなかなか重い腰が上がらない…。ちなみに近日リリース予定の新作Webアプリも、上述の組み合わせで作った。


## RMagickとActiveRecord 3

[はてなスターカウンター](http://hatenastar.heroku.com/)で新しく挑戦したことは、画像処理のRMagickと、O/RマッパーのActiveRecord 3を使ったこと。そこらへんの試行錯誤については、以下の記事にまとめてあるけど、感想をざっくり一言でいうと*RMagick(ImageMagick)は使うまでのセッティングの方が難しい*、*ActiveRecord 3は以前触ったDataMapperにそっくり*という印象だった。


### RMagick

- [MacでImageMagickとRMagickをインストールする](/2011/03/20/mac-ruby-imagemagick-rmagick-install)
- [RubyのRMagickで画像をリサイズする](/2011/03/21/ruby-rmagick-imagemagick-resize-scale-thumbnail-sample)
- [RubyのRMagickで縦横比固定でリサイズしたり切り抜いたり](/2011/03/22/ruby-rmagick-imagemagick-resize-crop)
- [WindowsでImageMagickとRMagickをインストールする](/2011/04/09/windows-ruby-imagemagick-rmagick-install)
- [HerokuでRMagickを使おうとしてrequireでハマった](/2011/04/10/ruby-heroku-use-rmagick-bundler-require)
- [RMagickで使用可能なフォント名の一覧を出力する](/2011/04/11/ruby-rmagick-output-font-name-list)
- [HerokuでSinatraを使ってRMagickの使用可能フォント名を出力する](/2011/04/12/ruby-heroku-sinatra-rmagick-output-font-list)
- [RMagickでフォント名を指定して文字列を描画する](/2011/04/13/ruby-rmagick-font-draw-string-annotate)
- [RMagickを使って生成した画像をHerokuで表示する2つの方法](/2011/04/14/ruby-heroku-rmagick-display-generate-image)


### ActiveRecord 3

- [SinatraからActiveRecord 3を使う(1) マイグレーション ](/2011/04/16/ruby-sinatra-active-record-3-migrate)
- [SinatraからActiveRecord 3を使う(2) CRUD操作 ](/2011/04/17/ruby-sinatra-active-record-3-crud)
- [SinatraからActiveRecord 3を使う(3) バリデーション ](/2011/04/18/ruby-sinatra-active-record-3-validate)
- [SinatraからActiveRecord 3を使う(4) 比較演算が簡単になるMetaWhere ](/2011/04/19/ruby-sinatra-active-record-3-meta-where)


## Facebookいいね！のカウンター表示がリセットされてしまう

今回ソースコードを公開するために整理整頓してて気がついたんだけど、[はてなスターカウンター](http://hatenastar.heroku.com/)のサイト内に設置しているソーシャルボタン類の中で、Facebookのいいね！ボタンに以下のようなおかしな現象が起きていた。

> Facebookのいいねボタンを押すとグレーアウトしてカウントが「1」になるけど、*ページをリロードするとまた押してない状態に戻ってしまう。*Facebook内の自分のページを見るとちゃんといいねを押したと流れてきているので、*いいねボタンが押されていることは間違いない。*なぜだろう？

[Nekostagram](http://nekostagram.heroku.com/)や[Inustagram](http://inustagram.heroku.com/)でほとんど同じコードを使っているにも関わらず、はてなスターカウンターだけこの現象はおきているっぽい。はてなスターカウンターとネコスタでのコードの違いは、[OGPタグ](http://d.hatena.ne.jp/amachang/20110117/1295233078)をはてなスターカウンターの方では埋め込んでみているんだけど、これが原因かと考えてすべて消して試してみたけど結果は同じだった。

はてなスターカウンターとNekostagram、どちらも[jQuery.socialbuttonプラグイン](http://itra.jp/jquery_socialbutton_plugin/)を使わせてもらっているけど、これを使わずに[Facebook公式のコードジェネレータ](http://developers.facebook.com/docs/reference/plugins/like/)を使って生成したiframeコードを埋めこんでみても、この現象は解消されなかった。普段Facebookを使ってないのもあって原因がよくわからず…。詳しい人や解決方法をご存じの方がいたら教えてくださいませ。

* * *

<cite>[ruedap/hatenastar-counter - GitHub](https://github.com/ruedap/hatenastar-counter)</cite>
<cite>[はてなスターの総数を表示できる「はてなスターカウンター」を作ってみた](/2011/04/21/hatenastar-counter)</cite>
<cite>[NekostagramとInustagramのソースコードをGitHubに公開してみた](/2011/03/09/nekostagram-inustagram-ruby-source-code-push-github)</cite>
