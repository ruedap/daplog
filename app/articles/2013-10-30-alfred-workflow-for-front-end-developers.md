# <span>フロントエンド開発者向けの</span><span>Alfred Workflow</span>

1ヶ月前に、Web開発者にオススメな[Alfred](http://www.alfredapp.com/)用のWorkflowをまとめた[GitHubリポジトリが2,000 starsを超える人気](https://github.com/zenorocha/alfred-workflows)を博していて、その中に自作の[Font Awesome Workflow](https://github.com/ruedap/alfred2-font-awesome-workflow)も選ばれていて、それをきっかけに開発者向けのWorkflowが盛り上がっていることを知った。

つい最近だと、Googleのエンジニアで著名な[Addy Osmani](https://github.com/addyosmani)がプレゼンで紹介していたり、フロントエンド向け情報サイトとして有名な[Smashing Magazine](http://www.smashingmagazine.com/)が特集記事にしていた。

<cite>[Automating Front-end Workflow // Speaker Deck](https://speakerdeck.com/addyosmani/automating-front-end-workflow?slide=148)</cite>
<cite>[Hidden Productivity Secrets With Alfred \| Smashing Coding](http://coding.smashingmagazine.com/2013/10/25/hidden-productivity-secrets-with-alfred/)</cite>

<small>上の各記事で取り上げられている拙作のFont Awesome Workflowについては、既にバージョンが古くなってしまっているので、もしダウンロードする場合は[最新版をこちらから](https://github.com/ruedap/alfred2-font-awesome-workflow)</small>

というわけで、その辺りの情報をベースにしつつ、自分でも使っていて便利だと思うAlfred Workflowを、主に**フロントエンド開発者向けのものに絞って紹介**してみる。


## Alfred Workflowとは

最初に、そもそもAlfred Workflowをよく知らない人に向けて、[Font Awesome Workflow](https://github.com/ruedap/alfred2-font-awesome-workflow)を例に紹介。まず、以下のスクリーンキャスト（GIFアニメ）を見てもらうと良さそう。

[![screencast.gif](https://github.com/ruedap/alfred2-font-awesome-workflow/raw/master/screenshots/screencast.gif)](https://github.com/ruedap/alfred2-font-awesome-workflow#font-awesome-workflow-for-alfred-2)

[Font Awesome](http://fontawesome.io/icons/)という370種類のアイコンフォントをHTMLで手軽に使えるフリーの素材集があって、そのアイコンフォントをインクリメンタルサーチした上で、選択したアイコンのCSS用のクラス名を最前面のアプリ（エディタ）に自動でペーストする、というのが上のWorkflowで、基本的に多くのWorkflowがこれと同じような流れの動作をする。つまり、

1. まず、そのWorkflow専用のキーワードを入力して呼び出す。上記の場合は`fa`
2. その後ろに検索ワードを入力すると、その下に検索結果が表示されるのでどれかを選択する
3. 確定時の挙動はそれぞれで、コピーだったり、アプリの起動だったり、サイト表示だったりする

上記のようにローカル(Workflow)内で完結してるタイプもあれば、インターネット越しに情報を拾ってきて結果を表示するタイプもある。だいたいはそんなかんじ。


## Dashをさらに素早く検索

[![Dash.alfredworkflow](/assets/2013/10/30/alfred-workflow-for-front-end-developers-01.png)](https://github.com/willfarrell/alfred-dash-workflow)

[Dash.alfredworkflow](https://github.com/willfarrell/alfred-dash-workflow)は、[Dash](http://kapeli.com/dash)の公式Workflowをさらに素早く検索するためのラッパーで、公式の場合は`dash css:first-child`と入力しなければいけないところを、上記のキャプチャ画像のように`css first-child`と省略できるようにしてくれる。現在対応しているキーワードは、html, css, js, jquery, jqueryui, angularjs, bootstrap, svg, nodejs, php, redis, mysql, man, cpp, sass, compass, backbone, underscore, wordpress, drupal, django, python, python2, elisp, android, yui, ruby, rails, gem, bourbon, neatなど。


## Can I use...を検索

[![caniuse](/assets/2013/10/30/alfred-workflow-for-front-end-developers-02.png)](https://github.com/willfarrell/alfred-caniuse-workflow)

[caniuse](https://github.com/willfarrell/alfred-caniuse-workflow)は、フロントエンド開発者ならお世話になる、HTML/CSSのブラウザサポート状況を調べられる[Can I use...](http://caniuse.com/)を検索して一覧表示し、選択した項目をブラウザで開ける。


## Stack Overflowを検索

[![StackOverflow on Alfred](/assets/2013/10/30/alfred-workflow-for-front-end-developers-03.png)](https://github.com/xhinking/Alfred)

[StackOverflow on Alfred](https://github.com/xhinking/Alfred)は、[Stack Overflow](http://stackoverflow.com/)を検索して一覧表示し、選択した項目をブラウザで開ける。


## 色のRGB/HSL/HEX/カラーネームを変換


[![Colors](/assets/2013/10/30/alfred-workflow-for-front-end-developers-04.png)](http://www.alfredforum.com/topic/805-colors%E2%80%94a-css-color-conversion-workflow-with-color-picker-support/)

[Colors](http://www.alfredforum.com/topic/805-colors%E2%80%94a-css-color-conversion-workflow-with-color-picker-support/)は、色の16進コード、RGB値、HSL値、[CSSのカラーネーム](http://www.w3.org/TR/css3-color/)を変換して一覧表示し、選択した項目の値をクリップボードにコピーできる。


## HTML/URL/Base64のエンコード・デコード

[![Encode/Decode](/assets/2013/10/30/alfred-workflow-for-front-end-developers-05.png)](https://github.com/willfarrell/alfred-encode-decode-workflow)

[Encode/Decode](https://github.com/willfarrell/alfred-encode-decode-workflow)は、HTML/URL/Base64のエンコード・デコード結果を一覧表示し、選択した項目の値をクリップボードにコピーできる。上記キャプチャ画像でアイコンが表示されていないのは不具合っぽいけど、使用上は特に問題なし。


## パッケージマネージャーを検索

[![Package Managers](/assets/2013/10/30/alfred-workflow-for-front-end-developers-06.png)](https://github.com/willfarrell/alfred-pkgman-workflow)

[Package Managers](https://github.com/willfarrell/alfred-pkgman-workflow)は、パッケージマネージャーのパッケージを検索して、選択したパッケージのページをブラウザで表示できる。現在対応しているパッケージマネージャーは、bower, grunt, npm, composer, pear, gems, pypi, alcatraz, cocoa, brew, rpm, maven, dockerなど。上記のキャプチャ画像のようにgemsやnpmはバージョンも表示されるので、最新版のバージョン番号を調べる時にも重宝する。

## GitHubに素早くアクセス

[![GitHub Workflow](/assets/2013/10/30/alfred-workflow-for-front-end-developers-07.png)](https://github.com/gharlan/alfred-github-workflow)

[GitHub Workflow](https://github.com/gharlan/alfred-github-workflow)は、GitHubのリポジトリに素早くアクセスできる。自分のアカウント以外にも、`rails/rails`のようによく使われている「ユーザー（オーガナイゼーション）名／リポジトリ名」の書式でもアクセスできる。他にもコマンドがあるので詳しくは[README](https://github.com/gharlan/alfred-github-workflow/blob/master/README.md)を参照のこと。


## VirtualBox/VMware/Parallelsを操作

[![VMware Fusion](/assets/2013/10/30/alfred-workflow-for-front-end-developers-08.png)](https://github.com/ctwise/alfred-workflows)

[VirtualBox](https://github.com/aiyodk/Alfred-Extensions/tree/master/AlfredApp_2.x/VirtualBox-Control) / [VMware](https://github.com/ctwise/alfred-workflows) / [Parallels](https://github.com/BigLuck/alfred2-parallels)の各種Workflowは、仮想マシンのアプリを操作するためのもので、上記キャプチャのように自分は普段VMware Fusionを使っていて、これは起動・停止をはじめ各種コマンドを発動できるようになっている。


## iOSシミュレータを起動

[![Launch iOS Simulator](/assets/2013/10/30/alfred-workflow-for-front-end-developers-09.png)](http://www.alfredforum.com/topic/2126-launch-ios-simulator/)

[Launch iOS Simulator](http://www.alfredforum.com/topic/2126-launch-ios-simulator/)は、名前の通りiOSシミュレータを起動できるWorkflowで、ただそれだけなんだけど意外と便利。


## IPアドレスを表示

[![IP Address Workflow](/assets/2013/10/30/alfred-workflow-for-front-end-developers-10.png)](http://dferg.us/ip-address-workflow/)

[IP Address Workflow](http://dferg.us/ip-address-workflow/)は、グローバルIPアドレスとプライベートIPアドレスを表示できるWorkflowで、選択したIPアドレスを最前面アプリにペーストできる。localhostとして立ち上げている確認用サーバーにモバイル端末などからアクセスする時に確認したりしてる。


## 空きドメインを検索

[![Domainr](/assets/2013/10/30/alfred-workflow-for-front-end-developers-11.png)](https://github.com/dingyi/Alfred-Workflows)

[Domainr](https://github.com/dingyi/Alfred-Workflows)は、空きドメインを検索できるWorkflowで、上記のように取得済みのドメインは赤色のアイコン、未取得のドメインは緑色のアイコンで表示される。新しいサービスなどを考えている時に、そのサービス名のドメインが空いているかをすぐに調べられて重宝する。


## タイムゾーンを表示

[![TimeZones](/assets/2013/10/30/alfred-workflow-for-front-end-developers-12.png)](http://www.alfredforum.com/topic/491-timezones-a-world-clock-script-filter-updated-to-v161/)

[TimeZones](http://www.alfredforum.com/topic/491-timezones-a-world-clock-script-filter-updated-to-v161/)は、タイムゾーンごとの時刻を表示できるWorkflowで、自分の場合は主にUTC時間を調べるのに使用している。


## AirDropを開く

[![Alfred AirDrop Workflow](/assets/2013/10/30/alfred-workflow-for-front-end-developers-13.png)](https://github.com/paulheyer/Alfred-AirDrop-Workflow)

[Alfred AirDrop Workflow](https://github.com/paulheyer/Alfred-AirDrop-Workflow)は、[AirDrop](http://ja.wikipedia.org/wiki/AirDrop)のウィンドウを開くためだけのWorkflowで、Mac間でデータをやりとりする時に使っている。

* * *

以上、フロントエンドに限らないものも混じっているけど、Web系の開発時に役立ちそうなAlfred Workflowをまとめてみた。

ちなみにAlfredには、PreferencesからUsageを開くと、自分のAlfredの使用状況（回数）を見ることができ、さらにそれを[ツイート](https://twitter.com/ruedap/status/395229215995359232)する機能がある。これを利用したWebサービスで[Alfred Stats](http://alfred-stats.herokuapp.com/)というのがあり、他の人に比べて自分はどれくらい活用しているか、また、自分自身でも[時間経過によってどれくらい変わったか](http://alfred-stats.herokuapp.com/u/ruedap)を知ることができるので、Workflowと併せてこちらも使ってみるとより楽しめるかもしれない。

