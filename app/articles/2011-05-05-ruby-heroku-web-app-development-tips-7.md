# <span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(7) ブログならLokka</span>

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第7回では、ブログを簡単に設置できるRuby純正クラウド用CMS「Lokka」について書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## Herokuにブログを設置するならLokka

ある程度Herokuの基本操作に慣れてきたら、いきなりWebアプリ開発はなかなかハードルが高いので、まずはブログあたりをHeroku上に設置してみたくなると思います。Herokuに対応したアプリケーション、ツール、ライブラリは存在し、いくつか便利に使わせてもらっているのですが、ブログ／CMSの作成であれば[Lokka](http://lokka.org/)をオススメします。


## Lokkaの要チェックな3つのポイント

Lokkaを知ってからまだ日が浅いですが、それでも使ってみて良いと思ったところがいくつもあり、その中でも特に知っておきたいこととして挙げるとしたら以下の3つのポイントがあります。

### 1.デザイン

Lokkaの素晴らしいポイントの1つに、オープンソースプロジェクトではなかなか少ない(?)と思うんですが、最初から開発陣に本職のデザイナーが参加していて、デフォルトのテーマ（上述のURL）を含めて同梱されているテーマがちゃんとデザインされた美しいものであるということです。

一般的なオープンソースプロジェクトのよくある光景として、プログラマー1人または数人でプロジェクトが始まり、コンセプトやプログラムは素晴らしいのに、デザインできる人がいなくてインターフェイスやグラフィックが残念なことになっているというのを時々見かけます。こういうのはプロジェクト（プロダクト）の知名度があがってから、後からデザイナーが参加してデザイン部分も良くなるというパターンが多いでしょうか。その点Lokkaは、最初からデザイナーが参加していてデザインやインターフェイスが洗練されており、ブログツール・ブログサービスを使い始めるとありがちなデフォルトのテーマは使い物にならないからテーマ選びから開始しなければならないということもありません。同梱テーマはしっかりデザインされており、利用するテーマの候補として十分入る実用レベルです。

### 2.設置の簡単さ

Lokkaの衝撃的なポイントの1つに、数分でHeorku上に新しいLokkaブログを設置できてしまうことです。[第3回のデプロイの簡単さ](/2011/05/01/ruby-heroku-web-app-development-tips-3)で「以降のシリーズでもこの点について触れる」と書いたのはこのことで、HerokuとGitをある程度理解できていれば、Lokkaの設置に関して同じことを効率良く達成できるという意味での簡単さはもの凄いです。これほど簡単に設置できるブログツール（サービスではなく）を自分は他に知りません。

[Lokka公式サイトの「はじめよう」](http://lokka.org/getting-started)の「Herokuの場合」に書かれている下記のコマンド、最初見たときには省略してあるのかと思いましたが、ホントにこれだけでブログの設置が完了します。

~~~ sh
$ gem install heroku bundler
$ git clone git://github.com/komagata/lokka.git
$ cd lokka
$ heroku create
$ git push heroku master
$ heroku rake db:setup
$ heroku open  （ブログをブラウザで開くための1行を追加）
~~~

たった7行のコマンド、herokuやbundlerのgemがインストールされているならたった6行でLokkaブログのHerokuへの設置が完了します。2年くらい前にWordPressをレンタルサーバーに設置しようとしたときは、特にデータベースの設定でやたら手こずった記憶がありますが、Lokka＋Herokuならそういう設定も要りません。

設置の簡単さの力説はこれくらいにして、実際にHeroku上にLokkaを設置して時間を測ってみましたが、4分42秒で設置できました。めちゃくちゃ簡単です。

<ins>@komagataさんが、Lokkaインストールのスクリーンキャストを公開されてたので追記します。さすがLokka作者、設置速度が余裕の2分台です!</ins>

<cite>[LokkaをHerokuにインストールするスクリーンキャスト - komagata](http://docs.komagata.org/4782)</cite>


### 3.開発者と日本語で話せる

Lokkaの個人的に嬉しいポイントの1つに、主要開発者と日本語で話せるという点があります。オープンソースで開発されているLokkaの開発参加者は、プログラマーの[@komagata](http://twitter.com/#!/komagata)さん、デザイナーの[@machida](http://twitter.com/#!/machida)さんを筆頭に多くの方が日本人です。以前自分がLokkaについて困ったときに[LingrのLokka用チャットルーム](http://lingr.com/room/lokka_ja/)で質問（もちろん日本語で）したら、そこに参加されている方々に解決策を教えていただけました。以下はその質問したときのチャットのログです。

<cite>[February 13, 2011 - Lokka(ja) &#8211; Lingr](http://lingr.com/room/lokka_ja/archives/2011/02/13)</cite>

英語が苦手な自分にはとてもありがたかったです。


## Herokuには日本語のメーリングリストがある

Lokkaから少し話が逸れますが、日本語つながりで知っておきたいこととして、Herokuには日本語のメーリングリストがあります。

<cite>[Heroku-ja \| Google グループ](https://groups.google.com/group/heroku-ja?hl=ja)</cite>

[@junya](http://twitter.com/#!/junya)さんが作成されたGoogleグループで、有志による日本語でのHerokuの情報交換を目的としています。例えば、

<cite>[Herokuの読み方 - Heroku-ja \| Google グループ](https://groups.google.com/group/heroku-ja/browse_thread/thread/e55b89f46567da2e?hl=ja)</cite>
<cite>[Herokuの日本語スクリーンキャスト作りました - Heroku-ja \| Google グループ](https://groups.google.com/group/heroku-ja/browse_thread/thread/bdf3a89221a7c5e9?hl=ja)</cite>
<cite>[Heroku障害レポートの要約 - Heroku-ja \| Google グループ](https://groups.google.com/group/heroku-ja/browse_thread/thread/1f575173873d7ba0?hl=ja)</cite>

あたりはこのメーリングリストで初めて知った情報もしくは詳しく知った情報です。Herokuに関する日本語情報を得たい場合、このメーリングリストに参加しないのは勿体無いので、まだ参加されていなかったら購読をオススメします。

* * *

今回は、ブログを簡単に設置できるLokkaと、Herokuの日本語メーリングリストについて書きました。次回は、[Herokuを利用すると漏れなく最新技術に触れることになる点](/2011/05/06/ruby-heroku-web-app-development-tips-8)について書きます。
