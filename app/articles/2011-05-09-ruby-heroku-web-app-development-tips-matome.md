---
layout: article
title: "<span>HerokuでWebアプリ開発を始めるなら</span>知っておきたい10のこと"
date: 2011-05-09
comments: true
categories: ruby
tags: ruby
published: true
---

[Heroku](http://www.heroku.com/)というPaaSについて、*これからWebアプリを作ってみたいと思っている人*に向けて、役に立ちそうな情報や入門記事をまとめてみました。

<!-- READMORE -->


## まえがき

今年のはじめから2011年8月8日までで、個人で作ったWebアプリを6つリリースしていて、その*すべてのWebアプリのプラットフォームとしてHerokuを利用*しています。

1. [チャップリン名言Twitter Bot](http://twitter.com/#!/chaplin_bot)
    - [Herokuを使って1日1回名言をツイートするTwitter Botの作り方](/2011/02/09/ruby-heroku-twitter-bot)
2. [Nekostagram - ねこ大好き専用Instagram](http://nekostagram.heroku.com/)
    - [Instagram APIを使ってねこ大好き専用の「Nekostagram」を作ってみた](/2011/02/28/instagram-api-of-exclusive-use-for-cat-lovers-nekostagram)
3. [Inustagram - いぬ大好き専用Instagram](http://inustagram.heroku.com/)
    - [二匹目のどじょうを狙っていぬ大好き専用の「Inustagram」を作ってみた](/2011/03/05/instagram-api-of-exclusive-use-for-dog-lovers-inustagram)
4. [はてなスターカウンター](http://hatenastar.heroku.com/)
    - [はてなスターの総数を表示できる「はてなスターカウンター」を作ってみた](/2011/04/21/hatenastar-counter)
5. [SASSIENCE ～ 世界が嫉妬するCSSへ](http://sassience.com/)
    - [CSSのインデントを綺麗にするサービス「SASSIENCE」を作ってみた](/2011/05/26/css-indent-nest-beauty-service-sassience)
6. [ウタダヒカループ](http://uhloop.com/)
    - [宇多田ヒカル大好き専用「ウタダヒカループ」を作ってみた](/2011/08/11/uhloop)

これらのWebアプリを作る過程で得た情報や失敗したこと、今では理解できているけど当時疑問だったことなどが、Herokuを使い始めてからの4ヶ月間を振り返ってみるといくつも思い当たります。それらのことをブログにまとめることで、これから始める人の役に立てればいいなぁと思って書いたのが以下のシリーズです。


## 知っておきたい10のこと

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」と題して、2011年4月29日から5月8日までの10回で連載し、それらの記事を以下にまとめました。

1. [無料のスペック](/2011/04/29/ruby-heroku-web-app-development-tips-1)  
  無料の範囲で使えるHerokuの基本スペックについて
2. [アドオン](/2011/04/30/ruby-heroku-web-app-development-tips-2)  
  基本スペックのHerokuプラットフォームに機能を追加できる「アドオン」について
3. [デプロイが簡単](/2011/05/01/ruby-heroku-web-app-development-tips-3)  
  Webアプリを公開状態にする作業「デプロイ」の簡単さについて
4. [Sinatraも使える](/2011/05/02/ruby-heroku-web-app-development-tips-4)  
  Herokuで使えるWebフレームワーク「Sinatra」について
5. [環境変数ENV](/2011/05/03/ruby-heroku-web-app-development-tips-5)  
  実際にHerokuを利用する上で知っておくと便利な「環境変数ENV」について
6. [ステージング環境](/2011/05/04/ruby-heroku-web-app-development-tips-6)  
  Herokuなら簡単に作れる動作チェック用のサイト「ステージング環境」について
7. [ブログならLokka](/2011/05/05/ruby-heroku-web-app-development-tips-7)  
  ブログを簡単に設置できるRuby純正クラウド用CMS「Lokka」について
8. [最新技術に触れる](/2011/05/06/ruby-heroku-web-app-development-tips-8)  
  Herokuを利用するともれなく最新技術に触れることになる点について
9. [Heroku以外の選択肢](/2011/05/07/ruby-heroku-web-app-development-tips-9)  
  Herokuはとても便利だけど依存しすぎてしまうとちょっと危険だよ、という実体験について
10. [参考リンク集](/2011/05/08/ruby-heroku-web-app-development-tips-10)  
  自分がこれまでのHerokuアプリを作成する過程で書いた記事へのリンクと、参考にした外部ページのリンク集


## まずは作り始めよう

上記のような長々とした連載記事を書いておいてこんなことを言うのもアレですが、これらの情報や知識も大事ですが、個人的には何よりもまず*Webアプリを作り始めてみることが重要*だと思っています。強くそう思うようになったのは、[37signals](http://37signals.com/)の[小さなチーム、大きな仕事](http://www.amazon.co.jp/dp/415209267X/ruedap-22)という本のこの一節を読んでからです。

> まずは作り始めよう  
> スタンリー・キューブリックは、野心的な映画監督に「カメラとフィルムを持ち出して、なんでもいいから映画を撮れ」とアドバイスする。キューブリックは、不慣れなら作り始めることが必要だと知っている。一番重要なのは、始めることだ。だからカメラを手にとり、録画ボタンを押し、撮り始めなければならない。

何かひらめいても空想するだけで、なかなか実際に手が動き始めないときに、この一節を思い出して自分を奮い立たせるようにしています。37signalsの本の中には、これ以外にもグッと来るセンテンスがたくさん散りばめられていて、Webアプリの作り始めや何か新しいことを始めるときに、いつも読み返したいと思っています。

* * *

<cite>[「小さなチーム、大きな仕事―37シグナルズ成功の法則」を読み終えて](/2011/03/18/rework-37signals-dhh-book-sentence)</cite>


