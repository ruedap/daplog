---
layout: article
title: "<span>Instagram APIを使って</span>ねこ大好き専用の「Nekostagram」を作ってみた"
date: 2011-02-28
comments: true
categories: ruby
tags: ruby
published: true
---

[![Nekostagram - ねこ大好き専用Instagram](/assets/2011/02/28/instagram-api-of-exclusive-use-for-cat-lovers-nekostagram-01.png)](http://nekostagram.heroku.com/)

ドヤッてな感じのWebアプリ名を付けちゃったけど、そんな大層なものではなく、ページを読み込むたびに[Instagram](http://instagr.am/)の[API](http://instagram.com/developer/)でネコ写真をちょっとずつ取ってきて、そのネコ写真と撮影者のコメントを一覧表示してるだけのペライチなサイトでございます。

マッタリとかわいいネコたちを見ながら、鼻歌交じりで次へボタンをクリックする感じのネコビューアー。

<!-- READMORE -->


## そもそもInstagramって？

そもそも[Instagram](http://instagr.am/)って何？という方へ、誤解を恐れずにズバリひとことで、

**InstagramはiPhone専用の写真版Twitter**

サービス公開から4ヶ月たらずで既にユーザー数は200万人もいるんだとか。iPhone専用のサービスなのに。さらにInstagramについて詳しくは、以下のページなどから。

<cite>[人気の『Instagram』は「写真のTwitter」 | WIRED VISION](http://wiredvision.jp/news/201010/2010101521.html)</cite>
<cite>[急成長する写真共有アプリ「Instagram」の舞台裏　 | 世界を変えるスタートアップ](http://gendai.ismedia.jp/posts/-/1447)</cite>
<cite>[Instagramのファウンダー：「サービスはシンプルな機能を中心に始めるのがベスト」](http://jp.techcrunch.com/archives/20110203founder-stories-instagram-products/)</cite>


## ネコを見るだけ

今回作ったこの[Nekostagram](http://nekostagram.heroku.com/)は、冒頭での説明通り、Instagramに投稿されているネコ写真を見るだけのサイト。それ以上でも以下でもなく、詳しく説明するまでもないけど、詳しく説明すると以下のとおり。

- [Nekostagramのトップページ](http://nekostagram.heroku.com/)にアクセスしたら、最新のネコ写真20枚をInstagramから取ってきて、一覧表示する
- 各ネコ写真には、Instagram本家へのリンクと投稿者（撮影者）のコメントがあれば記載している
- また、各ネコ写真はクリックすることで拡大表示できる（単純に引き延ばしているだけなので画質は悪い）
- ページ下部までいったら、右下の1枠が次の20件を表示するためのリンク（more...ボタン）になっているので、クリックすると次のネコ写真20枚を見られる

つまり、一言で言うとかわいいネコ写真を満喫するためだけのサイトでございます。


## InstagramのAPI公開

これを作ったキッカケは、[InstagramのAPI](http://instagram.com/developer/)が公開されたのを知ったので、このAPIを使って何か作ってみたいなぁと。んで、金曜夜に帰宅してから考えて始めて、土日を使ってなんとかカタチになったので、Nekostagramのサイトを公開してみた。

ちなみにInstagramのAPIは、まだプライベートベータ版だそうで、Instagramの都合で途中で停止したり、アクセス過多なAPI利用者をアクセス禁止にしたりすることがある、みたい。APIの正式リリースまでは、サイトの動作が不安定になったり、繋がらなくなったりすることもあるかもしれない。


## 技術的な話

ちょっと技術的な話になるけど、このNekostagramはRuby(Sinatra)で書いてて、InstagramのAPIには既に[Ruby用とPython用のラッパーライブラリ](http://instagram.com/developer/libraries/)が公開されていたんだけど、Ruby用の方をインストールして触ってみたけどなんかよくわかんなくて、結局自分でJSONをパースする処理を書いた。ライブラリをちゃんと使えれば、もっと手軽に時間を掛けずに作れたとおもう。ライブラリをうまく使えるようになったら書き直したいところ。

もっと技術的な話になるけど、このNekostagramは[Heroku](/2011/02/09/ruby-heroku-twitter-bot)というPaaSの無料プラン内で作ったのですべて無料で出来ている。このHerokuがもうめちゃステキなサービスで、最近自分はブログでHerokuの記事ばかり書いてるくらいハマってる。みんなもHerokuを使うといいよ！


## Instagram API関連記事へのリンク

今回Nekostagramを作るにあたって、Instagram APIの情報を探したけどまだAPI公開後間もないので少なかった。それでもいくつか日本語情報で公開してくれているブログがあってとても参考になった。感謝。

<cite>[［観］ instagram API の概要(速報版)](http://watcher.moe-nifty.com/memo/2011/02/instagram-api.html)</cite>
<cite>[さらにオープンなプラットフォームへ： Instagram API - 蟹亭奇譚](http://d.hatena.ne.jp/kanimaster/20110208/1297174137)</cite>
<cite>[A More Open Platform: The Instagram API を訳してみた - s.t.Mind](http://d.hatena.ne.jp/satojkovic/20110208/1297175847)</cite>
<cite>[Instagram APIを触ってみる &#171; trace](http://www.mrlittlebig.com/blog/040/)</cite>
<cite>[Instagram API が面白いかも - すぎゃーんメモ](http://d.hatena.ne.jp/sugyan/20110227/1298773953)</cite>
<cite>[InstagramのURLからサムネールを取得する方法 - Okiraku Programming](http://d.hatena.ne.jp/NeoCat/20110225/1298656117)</cite>


## Nekostagramを作ってみた感想

つくってみての感想は、制作期間2日にしては上出来かなと。かなりの部分が既存のモノ（サービス、ライブラリ、フォント等）の組み合わせだけど、っていうか、ぶっちゃけSinatra部分のRubyコード以外は全部それに該当するけど、てっとり早く作ることも時には重要で、そういう時の[Heroku](http://heroku.com/)+[Sinatra](http://www.sinatrarb.com/intro-jp.html)+[Slim](http://slim-lang.com/)はすごいかも？ ねこ大好き


## Nekostagramの関連リンク

Nekostagramを紹介してくれているサイトを追記しておきます。紹介してくれたサイトの方々ありがとうございます。

<cite>[PCからInstagramをもっと楽しむためのWebサービス25個まとめ\*二十歳街道まっしぐら](http://20kaido.com/archives/2720145.html)</cite>
<cite>[猫や美女、被災地への祈りも　人気アプリ「Instagram」の写真をまとめたサービス](http://b.hatena.ne.jp/posts/201104/3594)</cite>
<cite>[もっふもふ！　柴犬写真だらけの「SHIBASTAGRAM」 - ねとらぼ](http://nlab.itmedia.co.jp/nl/posts/1104/07/news011.html)</cite>
<cite>[Asiajin &raquo; Nekostagram &#8211; Cats Only Instagram Viewer](http://asiajin.com/blog/2011/03/01/nekostagram-cats-only-instagram-viewer/)</cite>
<cite>[Necostagram と Callist Calendar というカレンダーアプリがなかなか良さそう - AppBank](http://www.appbank.net/2011/03/01/iphone-news/227697.php)</cite>
<cite>[全部ねこだらけ！猫大好き専用画像サイト「Nekostagram」 : ついけん](http://tuiken.jp/archives/2324339.html)</cite>
<cite>[続・"Instagram"をもっと楽しく便利にする７つのウェブサービス+おまけ - Gadget Girl](http://d.hatena.ne.jp/spring_mao/20110306/1299390981)</cite>
<cite>[まなめはうす](http://homepage1.nifty.com/maname/index.html#070631p3)</cite>
<cite>[今ホットなウェブサービスの3領域―写真共有、グループチャット、Q&A](http://www.ikedahayato.com/?p=2892)</cite>
<cite>[Asiajin &#187; Bijostagram &#8211; Shows Only Beautiful Girls From Instagram](http://asiajin.com/blog/2011/03/10/bijostagram-shows-only-beautiful-girls-from-instagram/)</cite>
<cite>[10 Totally New Ways to Play with Instagram | Photojojo](http://content.photojojo.com/websites/10-rad-new-instagram-apps-and-sites/)</cite>
