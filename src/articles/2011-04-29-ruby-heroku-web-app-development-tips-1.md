# <span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(1) 無料のスペック</span>

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第1回では、無料の範囲で使えるHerokuの基本スペックについて書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## Herokuとは

まず本題に入る前に、さらっとHerokuについてご紹介します。
[Heroku](http://www.heroku.com/)は、ヘロクと[読みます](http://www.salesforce.com/jp/company/news-press/press-releases/2010/12/101210-1.jsp)。[HeroとHaikuを掛け合わせた造語](http://groups.google.com/group/heroku-ja/browse_thread/thread/e55b89f46567da2e)だそうです。私は「ヘ↑ロ→ク↓」と発音してしまいがちですが、他の人の発音を聞いていると「ヘ→ロ→ク→」が多いような気がします。

<ins>2011年7月7日に行われた「[Heroku-ja meetup #1](http://atnd.org/events/17223)」というイベントでは「ヘ↑ロ→ク↓」と発音する人が多かったです。</ins>

Herokuを誤解を恐れずにものすごく大雑把かつ極端に説明すると*いまどきのレンタルサーバー*や*いまどきのホームページスペース*です。2010年代の[ジオシティーズ](http://ja.wikipedia.org/wiki/%E3%82%B8%E3%82%AA%E3%82%B7%E3%83%86%E3%82%A3%E3%83%BC%E3%82%BA)です。年齢がバレますね。

もう少し技術者向けに説明すると、最近流行りのPaaSの1つで、例えるならGoogle App Engine、Force.com、Windows AzureのRuby版です。クラウドってやつです。おそらく。先ほどジオシティーズを例に挙げたように、Herokuでも無料で使える部分があり、その範囲だけでそれなりのWebアプリ（ホームページ）が作れます。しかも、ジオシティーズの時のような*無料だとページ内やポップアップウィンドウでバナー広告が表示される*みたいなことはありません。

ではHerokuはどうやって収益をあげているのかと気になりますが、無料範囲を超えて高機能な部分を使う場合や、無料範囲には含まれない新機能（アドオン）を使う場合に料金が発生する仕組みなので、フリーミアムってやつです。

また、Herokuはベンチャー企業でしたが、昨年末に[Salesforceに買収](http://www.atmarkit.co.jp/news/201103/03/heroku.html)されて箔がつきました。この買収には、サービスの今後について賛否両論があるみたいですが、個人的には「あのセールスフォースが買収したサービスで～」と人に説明しやすくなったと思っています。

<ins>2011年7月13日、Rubyの作者まつもとゆきひろ氏が、Heroku社のRubyチーフアーキテクトに就任しました。</ins>

<cite>[Heroku \| Matz氏がHerokuに入社](http://blog.heroku.com/archives/2011/7/12/matz_joins_heroku_japanese/)</cite>


## 無料部分のスペック

それではさっそく、第1回の今回はHerokuアプリの無料部分の基本スペックについてです。
メールアドレスを登録して自分のアカウントをつくってHerokuにログインすると、Herokuアプリを作れるようになります。

Herokuは、コマンドラインからアプリを簡単に準備できる機能を備えていて、ほんの数十秒（早ければ数秒）で新規アプリ（スペース）を作成できます。なので、簡単にポコポコとつくることができて、自分のアカウントでも今20個くらいアプリが登録されています。Google App Engineでは作成できるアプリ数に上限があった覚えがありますが、Herokuではそういう話を聞かないので、もしかしたら上限が無いのかもしれません。少なくとも20個は作れます。

で、そのHerokuアプリ1個の無料部分の基本スペックは、以下のような感じになります。このデータは2011年4月現在のものです。

|容量|圧縮状態で100MBまで (gitやgem関連のファイルは含まず)|
|データベース|PostgreSQLで5MBまで (有料で他のDBも使用可能)|
|cron|1日に1回 (有料で1時間に1回)|
|ログ|直近の100行までを閲覧可能|
|プロセス|1dyno分が無料 (dynoはHeroku独自の単位)|
|リクエスト|1dynoで秒間10-50リクエストを処理可能|
|メモリー|1dynoで最大300MBまで|
|Rubyのバージョン|1.8.6, 1.8.7, 1.9.2が利用可能|


### 容量

レンタルサーバーやホームページスペースといえば、まず気になるのが利用可能な容量（ハードディスク）ですが、こちらは圧縮した状態で100MBまで利用可能なようです。圧縮というのは自分でするのではなく、Herokuにアップロードするときに自動で圧縮が掛かります。そのアップロード時に圧縮後のサイズが表示されます。また、アプリの管理画面でも現在のファイルサイズ（Slug Size）を見ることができます。これには、Herokuを使う上で利用することになるgitのファイルや、Rubyのライブラリのファイルは含まれず、それらを除外したファイルを圧縮したサイズになります。最大で100MBまで可能なようですが、[Herokuのドキュメントでは10MB以下を推奨](http://devcenter.heroku.com/posts/slug-size)しています。


### データベース

データベースは、無料範囲ではPostgreSQLのみ使用可能で、容量は5MBまでです。有料オプションで、データベースの種類や容量を変更することが可能です。


### cron

自動実行できるcronは、無料範囲では1日1回の実行が可能です。有料オプションで1時間に1回にできますが、それ以下に間隔を短くすることは現状できません。


### ログ

Herokuアプリに関するログは、無料範囲では直近の100行までを閲覧することが可能です。このログには[Webサーバやルーティングのログも含まれる](http://thinkit.co.jp/story/2011/03/23/2060?page=0,1)らしいです。


### プロセスとリクエスト

「dyno」とはHeroku独自の単位で、アプリケーションサーバーの1プロセスを表す単位のようです。そこらへんのHerokuの構造については、[こちらの記事](http://blog.flect.co.jp/cto/2011/01/heroku-dbdd.html)の解説が詳しいです。

無料範囲ではこのdynoを1個分与えられます。これは処理できるリクエスト数を増減させるための単位なので、アクセスが殺到するようなサイトになったら、dynoの個数を有料で追加して処理できるリクエスト数をアップさせるイメージです。アップさせずに無料（1dyno）のままで大量のアクセスが来たら、上限以上のリクエストは処理されないのでページが正しく表示されない、または、エラーページということになります。自分が操作しない限りは、勝手にdynoをアップされていきなりお金を取られるというようなことはなく、1dynoのままです。


### メモリー

メモリーもdyno数と連動していて、1dynoでは最大で300MBまで利用可能です。Railsで使う場合「256MBでは厳しく512MBは欲しい」と聞いたりしますが、実際のところHerokuの無料範囲でRailsを使う場合はどうなんでしょうか。自分はRailsではなく、SinatraでしかHerokuを使ったことがないのでよくわかりません。


### Rubyのバージョン

Rubyのバージョンは、1.8.6、1.8.7、1.9.2が利用可能で、Herokuコマンドで切り替えられます。デフォルトでは1.8.7が選択されます。また、[6月1日からは1.9.2がデフォルトで選択される](http://blog.heroku.com/archives/2011/4/28/defaulting-to-ruby-192/)ように変更される予定です。


## 参考リンク

<cite>[Ruby on Rails向けPaaS「Heroku」って、こんな感じです（スクリーンキャスト）](http://el.jibun.atmarkit.co.jp/rails/2010/12/rubypaasheroku-.html)</cite>
<cite>[第3回 クラウドプラットフォーム「Heroku」の活用 \| Think IT](http://thinkit.co.jp/story/2011/03/23/2060?page=0,1)</cite>
<cite>[フレクト CTOのブログ: Herokuについて調べたことのまとめ](http://blog.flect.co.jp/cto/2011/01/heroku-dbdd.html)</cite>
<cite>[無料から始められるRailsのホスティングサービス「Heroku」の記事をWEB+DBに書きました](http://route477.net/d/?date=20101024)</cite>
<cite>[Heroku the Ruby Cloud](http://www.slideshare.net/juno/heroku-the-ruby-cloud)</cite>
<cite>[Heroku \| Dev Center \| Dynos](http://devcenter.heroku.com/posts/dynos)</cite>
<cite>[Heroku \| Dev Center \| Slug Size](http://devcenter.heroku.com/posts/slug-size)</cite>

* * *

以上が、Herokuアプリを新規作成したときに与えられる無料部分のスペックです。ちょっとしたWebアプリやブログ・CMSなどを作る分には十分なスペックだと思います。次回は、この[基本スペックに機能を追加できる「アドオン」](/2011/04/30/ruby-heroku-web-app-development-tips-2)について書きます。

