---
layout: article
title: "<span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(10) 参考リンク集</span>"
date: 2011-05-08
comments: true
categories: ruby
tags: ruby
published: true
---

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの最終回である第10回では、自分がこれまでのHerokuアプリを作成する過程で書いた記事へのリンクと、参考にしたページのリンク集を載せます。
このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。


<!-- READMORE -->

## このブログ内のHerokuアプリ制作行程記事

ここでは、自分が過去に公開した4つのHerokuアプリを制作する過程で、HerokuやRuby、Webフレームワークやライブラリの使い方など、個々に取り組んだ課題についての記事だけを抽出してまとめました。

### チャップリン名言Twitter Bot

[チャップリン名言Twitter Bot](http://twitter.com/#!/chaplin_bot)は、初めて作ったHerokuアプリだったので、調べることがいっぱいあり、制作行程記事もたくさん書きました。最初はGoogle App Engineで作ろうとして、それに失敗してHerokuを選んだので、GAEでの失敗がなかったらここまでHerokuを使うことは無かったかもしれません。

- [Herokuを使って1日1回名言をツイートするTwitter Botの作り方](/2011/02/09/ruby-heroku-twitter-bot)
    - [Google App EngineのJRubyでSinatraを使ってHello worldする](/2011/01/24/google-app-engine-jruby-sinatra-hello-world)
    - [RubyでTwitterのOAuth認証に必要なトークンを取得する](/2011/01/26/ruby-twitter-oauth-token-secret)
    - [Google App EngineのJRubyでSinatraからTwitterにつぶやけなかった](/2011/01/27/ruby-goole-app-engine-jruby-sinatra-twitter-rubytter)
    - [HerokuでSinatraを使ってHello worldする](/2011/01/28/ruby-heroku-sinatra-hello-world)
    - [HerokuアプリをGitHubにもプッシュする](/2011/01/29/git-heroku-app-push-github)
    - [HerokuとGitHubの両方にプッシュする時の秘密にしたい値の扱い](/2011/01/30/git-heroku-github-push-secret-value)
    - [HerokuのSinatraでTwitterにつぶやく](/2011/01/31/ruby-heroku-sinatra-twitter-tweet)
    - [Herokuのcronを使って自動でTwitterにつぶやく](/2011/02/01/ruby-heroku-sinatra-cron-twitter-tweet)
    - [Herokuのタイムゾーンを日本時間に設定する](/2011/02/10/heroku-timezone-japan-jst)
    - [SinatraからDataMapperを使う (1)動作チェック用のコード](/2011/02/12/ruby-sinatra-datamapper-1-orm-sqlite)
    - [SinatraからDataMapperを使う (2)マイグレーションとモデルの分離](/2011/02/13/ruby-sinatra-datamapper-2-migrate-model)
    - [SinatraからDataMapperを使う (3)バリデーション](/2011/02/14/ruby-sinatra-datamapper-3-validation)
    - [SinatraからDataMapperを使う (4)シャッフルツイート機能](/2011/02/15/ruby-sinatra-datamapper-4-shuffle-tweet)
    - [SinatraからDataMapperを使う (5)HerokuのPostgreSQLで使う](/2011/02/16/ruby-sinatra-datamapper-5-heroku-postgresql-rakefile)
    - [Herokuでデータベースの接続情報を調べる](/2011/02/18/ruby-heroku-database-url)
    - [HerokuでDBのデータをダウンロードしたりアップロードしたり](/2011/02/22/ruby-heroku-database-sqlite3-download-upload)
    - [HerokuでDBのデータをバックアップする](/2011/02/23/ruby-heroku-database-postgresql-backup)
    - [HerokuでDBのデータを自動でバックアップする](/2011/02/24/ruby-heroku-database-postgresql-auto-backup-gem-cron)


### Nekostagram

[Nekostagram](http://nekostagram.heroku.com/)は、公開時の記事にも書いてあるとおり、約2日間の制作期間で一気に作ったのであまり制作行程記事はありません。最初のTwitter Bot制作で得た知識を総動員して作った感じです。

- [Instagram APIを使ってねこ大好き専用の「Nekostagram」を作ってみた](/2011/02/28/instagram-api-of-exclusive-use-for-cat-lovers-nekostagram)
    - [HerokuのSinatraでBasic認証を使ってアクセス制限をかける](/2011/02/19/ruby-sinatra-rack-heroku-basic-auth)
    - [Herokuでステージング環境を作る](/2011/02/20/ruby-heroku-staging-enviroment)
    - [Sinatraを使ってInstagram APIのアクセストークンを取得する](/2011/03/03/ruby-sinatra-instagram-api-get-access-token)
    - [Sinatraでi18nする](/2011/03/31/ruby-sinatra-i18n-r18n)
    - [HTTPメソッドのPOSTとPUTの使い分け](/2011/03/24/http-method-post-put)
    - [HTTPメソッドのPOSTとPUTの冪等性](/2011/03/25/http-method-post-put-idempotence)


### Inustagram

[Inustagram](http://inustagram.heroku.com/)は、Nekostagramをそのまま複製したようなアプリなので、さらに制作行程記事が少ないですが、NekostagramとInustagramでソースコードを共通化するための作り直しやGitHubへの公開などをしました。

- [二匹目のどじょうを狙っていぬ大好き専用の「Inustagram」を作ってみた](/2011/03/05/instagram-api-of-exclusive-use-for-dog-lovers-inustagram)
    - [NekostagramとInustagramで個々の写真にツイートボタンを付けてみた](/2011/03/07/nekostagram-inustagram-tweet-button)
    - [NekostagramとInustagramのソースコードをGitHubに公開してみた](/2011/03/09/nekostagram-inustagram-ruby-source-code-push-github)


### はてなスターカウンター

[はてなスターカウンター](/2011/05/07/ruby-heroku-web-app-development-tips-9)でも取り上げたように、AWS障害発生の当日にリリースしてしまうというハプニングはあったものの、Webアプリ的に自分としてはそこそこ新しいことに挑戦していて、RMagickやActiveRecordに関する制作行程記事などを書きました。

- [はてなスターの総数を表示できる「はてなスターカウンター」を作ってみた](/2011/04/21/hatenastar-counter)
    - [MacでImageMagickとRMagickをインストールする](/2011/03/20/mac-ruby-imagemagick-rmagick-install)
    - [RubyのRMagickで画像をリサイズする](/2011/03/21/ruby-rmagick-imagemagick-resize-scale-thumbnail-sample)
    - [RubyのRMagickで縦横比固定でリサイズしたり切り抜いたり](/2011/03/22/ruby-rmagick-imagemagick-resize-crop)
    - [WindowsでImageMagickとRMagickをインストールする](/2011/04/09/windows-ruby-imagemagick-rmagick-install)
    - [HerokuでRMagickを使おうとしてrequireでハマった](/2011/04/10/ruby-heroku-use-rmagick-bundler-require)
    - [RMagickで使用可能なフォント名の一覧を出力する](/2011/04/11/ruby-rmagick-output-font-name-list)
    - [HerokuでSinatraを使ってRMagickの使用可能フォント名を出力する](/2011/04/12/ruby-heroku-sinatra-rmagick-output-font-list)
    - [RMagickでフォント名を指定して文字列を描画する](/2011/04/13/ruby-rmagick-font-draw-string-annotate)
    - [RMagickを使って生成した画像をHerokuで表示する2つの方法](/2011/04/14/ruby-heroku-rmagick-display-generate-image)
    - [SinatraからActiveRecord 3を使う(1) マイグレーション](/2011/04/16/ruby-sinatra-active-record-3-migrate)
    - [SinatraからActiveRecord 3を使う(2) CRUD操作](/2011/04/17/ruby-sinatra-active-record-3-crud)
    - [SinatraからActiveRecord 3を使う(3) バリデーション](/2011/04/18/ruby-sinatra-active-record-3-validate)
    - [SinatraからActiveRecord 3を使う(4) 比較演算が簡単になるMetaWhere](/2011/04/19/ruby-sinatra-active-record-3-meta-where)
    - [PowをSinatraアプリで使う](/2011/04/20/ruby-pow-sinatra-rack-app)
    - [Sinatraでブラウザーのバージョン判定](/2011/04/22/ruby-sinatra-browser-version-check)


## Herokuに関する参考になった外部リンク

ここでは、自分がHerokuアプリを制作する過程で調べ物をしたり、Twitter上などで見かけたHerokuに関するページの中で、特に参考になったものをまとめました。


### Herokuに関する連載モノ

- [連載：Herokuで作るFacebookアプリ｜gihyo.jp … 技術評論社](http://gihyo.jp/dev/serial/01/heroku)
- [ARCによるWebアプリの新しいつくり方 \| Think IT](http://thinkit.co.jp/book/2011/03/02/2035)

### Heroku製アプリに関する記事（ソースコード含む）

- [FJORDのWebサービスはオープンソースです \| FJORD, LLC（合同会社フィヨルド）](http://fjord.jp/love/534.html)
- [Herokuを利用したナントカstagramの作り方 - Rewish](http://rewish.org/ruby/nantokastagram)
- [日本への祈りを集めるサイト pray4japan.heroku.com をつくりました - とある技術の備忘録](http://d.hatena.ne.jp/r7kamura/20110313/1299977317)
- [InstagramのReal-time APIを使ってみた - 223 Software](http://www.223soft.net/18)
- [開発コンテスト24に参加 - 223 Software](http://www.223soft.net/26)
- [ツイッターに匿名で投稿できるサービスを作りました - func09](http://www.func09.com/wordpress/archives/939)
- [SinatraでTwitter Streaming APIにアクセスする超簡単なWebアプリのつくりかた:Kenn's Clairvoyance - CNET Japan](http://japan.cnet.com/blog/kenn/2010/03/20/entry_27038355/)


### Herokuに関するチュートリアル記事

- [Ruby on Rails向けPaaS「Heroku」って、こんな感じです（スクリーンキャスト）](http://el.jibun.atmarkit.co.jp/rails/2010/12/rubypaasheroku-.html)
- [１時間でツイッターサービスを作ろう！ \| KRAY Inc](http://kray.jp/blog/twitter_service_in_1hours/)
- [デザイナーも１時間でツイッターサービスを作ろう！（準備編） - KUROIGAMEN(黒い画面)](http://kuroigamen.com/34)
- [デザイナーもHerokuを使ってみよう！Herokuを使って静的ページを無料で作る](http://kuroigamen.com/22)
- [Padrino＋MongoDB＋Herokuを使って、5分でWikiアプリ作成する &#171; blog.udzura.jp](http://blog.udzura.jp/2011/02/23/app-in-5-min-with-padrino-mongodb-heroku/)
- [10分でできるPadrinoとMongoDBを使ったAPI作成 - Meltdown Countdown](http://d.hatena.ne.jp/marutanm/20110416/p1)
- [HerokuでRuby1.9とRails3を使う - それはBooks](http://hamasyou.com/archives/000348)
- [rono23: Lokkaさわってみた](http://rono23.blogspot.com/2011/02/lokka.html)


### Herokuに関するTIPS記事

- [herokuでデータベースのバックアップ(pgbackups)を自動化する - nabehiro Try and Error](http://d.hatena.ne.jp/nabehiro/20110126/1296060550)
- [Herokuのpgbackupsからデータをリストアする - komagata](http://docs.komagata.org/4708)
- [HerokuにPG Backupsというアドオンが加わり、Heroku上のPostgreSQLからダンプ取得・リストアが簡単にできるようにな... - Sooey](http://journal.sooey.com/29)
- [heroku の db バックアップ周り - HsbtDiary(2011-01-12)](http://www.hsbt.org/diary/20110112.html)
- [Herokuを使った場合のファイルアップロード - Heroku-ja \| Google グループ](http://groups.google.com/group/heroku-ja/browse_thread/thread/7fd33e25db24c301)
- [エラーページのカスタマイズが可能になりました - Heroku-ja \| Google グループ](http://groups.google.com/group/heroku-ja/browse_thread/thread/bca65754e51c9868)
- [Heroku - ソース中のパスワードなどの処理 - komagata](http://docs.komagata.org/4548)
- [Herokuコマンド - study_heroku](http://studyheroku.wiki.fc2.com/wiki/Heroku%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [heroku + sinatraでメールフォームを作ってみる - 223 Software](http://www.223soft.net/5)
- [フレクト CTOのブログ: Herokuについて調べたことのまとめ](http://blog.flect.co.jp/cto/2011/01/heroku-dbdd.html)
- [Heroku + MongoHQ が素晴らしい - Masatomo Nakano Blog](http://blog.madoro.org/mn/86)
- [HerokuにRailsアプリを上げるメモ - modkaの日記](http://d.hatena.ne.jp/modka/20101205/1291562055)
- [in a state of ease: Herokuに画像をアップロードする Rails 3 + Paperclip + Amazon S3](http://wine4u.seesaa.net/post/170193214.html)
- [無料から始められるRailsのホスティングサービス「Heroku」の記事をWEB+DBに書きました](http://route477.net/d/?date=20101024)
- [［Heroku］タイムゾーンを設定する - func09](http://www.func09.com/wordpress/archives/951)
- [Heroku を使い倒す(バックアップ編) \| つくる社LLC](http://tsukurusha.com/2010/07/heroku-%E3%82%92%E4%BD%BF%E3%81%84%E5%80%92%E3%81%99%E3%83%90%E3%83%83%E3%82%AF%E3%82%A2%E3%83%83%E3%83%97%E7%B7%A8/)
- [HerokuにあるLokkaのDBをローカルに持ってくる方法（LokkaのDBのバックアップ）](http://kuroigamen.com/31)
- [Rubyでtempfileのエンコーディングを指定する。 - このブログは証明できない。](http://d.hatena.ne.jp/shunsuk/20110320/1300610643)
- [heroku consoleが原因でブラウザからのアクセスがブロックされる場合がある。 - Sooey](http://journal.sooey.com/99)
- [herokuのデータベースインポート/エクスポートツール Taps - 森薫の日記](http://d.hatena.ne.jp/kaorumori/20090831/1251766159)


### Herokuに関するニュース・インタビュー

- [なぜSalesforceはHerokuを買収したのか？ － ＠IT](http://www.atmarkit.co.jp/news/201103/03/heroku.html)
- [【レポート】Heroku元CEO現Salesforce VPのSebastian氏、プラットフォーム戦略を説明](http://journal.mycom.co.jp/posts/2011/03/01/salesforce/index.html)
- [Rubyの開発者を「ヒーロー」にしたい、「Heroku」責任者が語る - インタビュー：ITpro](http://itpro.nikkeibp.co.jp/post/Interview/20110302/357882/)
- [Google App Engineは敷居が高いのがメリット？ セールスフォースは開発生産性が高いが制限にも苦しむ ～ クラウドごった煮パネルディスカッション（PaaS編 前編） － Publickey](http://www.publickey1.jp/blog/11/google_app_engine_paas.html)
- [共同購入型クーポンサービス、RailsのPaaS「Heroku」上に構築 － ＠IT](http://www.atmarkit.co.jp/news/201006/21/minawari.html)
- [グルーポン系サービスをRoRのPaaS「Heroku」で開発した「ミナワリ」。開発者に利点と使い勝手をインタビュー － Publickey](http://www.publickey1.jp/blog/10/rorpaasheroku.html)
- [RubyフレームワークSinatra の作者 Blake Mizerany氏のインタビューを翻訳してみた。](http://d.hatena.ne.jp/u16s/20110430/1304158119)


### AWS大規模障害に関する記事

- [AWSの障害に起因したHerokuの障害について、Heorkuによるレポートが公開されたので要点を翻訳しました（全訳ではありません）。「だ、... - Sooey](http://journal.sooey.com/130)
- [Amazonクラウドの大規模障害を経て、これからは「データセンターはいつか落ちる」ことがサービス設計の前提となる － Publickey](http://www.publickey1.jp/blog/11/amazon_10.html)

* * *

今回は、自分がこれまでのHerokuアプリを作成する過程で書いた記事へのリンクと、参考にしたページのリンク集を載せました。
次回は、この「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズ10回分のまとめ記事を書きます。
