# <span>Pull RequestとCIを使った</span><span>GitHub Flowなブログ環境を作ってみた</span>

[![GitHub Flow Blog](/images/2013/11/11/github-flow-blog-01.png)](https://github.com/ruedap/daplog)

今から1年ほど前に、自分でお気に入りのブログ環境を構築する記事が話題になっていて、それを読んだ時から、自分用のブログ環境を作りたいと思っていた。

<cite>[俺の最強ブログ システムが火を噴くぜ - てっく煮ブログ](http://tech.nitoyon.com/ja/blog/2012/09/20/moved-completed/)</cite>
<cite>[俺の最強ブログシステムも火を噴いてたぜ - Webtech Walker](http://webtech-walker.com/archive/2012/09/fired-myblog.html)</cite>

当時は[それどころではなかった](/2013/08/22/imakoko)こともあって、なかなか着手できずにいたんだけど、[今年の7月頃](/2013/07/26/reboooot)から作り始めて、最近そこそこ希望通りの形になったので、まだやり残しはたくさんあるけれど、一旦ここで一区切りということでその内容を記事にしてみる。


## GitHub Flow

この手の話では静的なブログツールが主流で、当時は[Jekyll](http://jekyllrb.com/)や[Octopress](http://octopress.org/)が流行っていて、最近では[Middleman](http://middlemanapp.com/)を使うのが流行りつつある印象。でも自分が作ってみたかったのは、**Webサービスを開発するのと同じフローで、ブログも更新できるようにする**というもの。そのフローとは、表題の通りPull RequestとCIを使ったGitHub Flowのこと。

<cite>[GitHub Flow (Japanese translation)](https://gist.github.com/Gab-km/3705015)</cite>
<cite>[Webサービス開発現場から / 近頃の開発のやり方 ･･･ Github と Pull Request とコードレビュー - naoyaのはてなダイアリー](http://d.hatena.ne.jp/naoya/20131013/1381651545)</cite>
<cite>[github を用いた開発フロー テンプレート](http://paperboy-all.github.io/docs/github/workflow.html)</cite>
<cite>[非開発者もGitHub Flowに巻き込んでみんなハッピーになった話 - Masatomo Nakano Blog](http://blog.madoro.org/mn/93)</cite>

もしPull RequestやGitHub Flowについてまだ馴染みがなければ、上記の記事が参考になると思うけど、GitHubの浸透によって当たり前になりつつあるこの開発スタイルを、ブログを書く環境にも適用してみたいと以前から考えていた。もっと言うなら、前述のような既存のブログツールを使うのではなく、**自分が使いたいブログ環境そのものを自分で開発・運用しつつ、並行してその中でブログ記事も書いていくスタイル**というのをやってみたかった。めんどそう。でも面白そうなのでやってみた。で、今見てるこのブログがそれでござる。

<cite>[ruedap/daplog · GitHub](https://github.com/ruedap/daplog)</cite>


## GitHub Flow Blog

<figure>
<a href="/images/2013/11/11/github-flow-blog-02.png">
<img src="/images/2013/11/11/github-flow-blog-02.png" alt="GitHub Flow Blog Workflow">
<figcaption>Pull RequestとCIを使ったGitHub Flowなブログ環境</figcaption>
</a>
</figure>

仕組みとしては、上のワークフロー図がほぼすべてで、既にGitHub Flowで開発している人にとっては説明するまでもない感じにそのまんま。ちょっとだけ特殊なのは、staging環境でのプレビュー用にstagingブランチを専用ブランチにしていて、**このブランチでGitHubにpushするとstaging環境へ自動でデプロイされる**という点。この仕組みは[Travis CIの機能](http://about.travis-ci.org/docs/user/deployment/heroku/#Branch-to-deploy-from)を利用していて、`staging`以外のトピックブランチ名だとstaging環境への自動デプロイは行われない。ブログアプリ開発と記事執筆を[ごちゃまぜにしてコミットを進めている](https://github.com/ruedap/daplog/commits/master)ので、staging環境でも確認したい時と、ローカルでの確認だけで十分な場合があり、その選択をこのstagingブランチを含めたトピックブランチの運用で行っている。

言うまでもないけど、これを使っているのは自分だけなので**プルリもマージも全部自分**。masterブランチへのマージが行われると、stagingブランチの時と同様にTravis CIがそれを検知して自動でデプロイしてくれる。イコールこれが**ブログ記事の公開作業**でもある。

よって、ブログ記事を書く時のフローとしては開発フローの時とまったく同じで、

1. [Railsアプリ内にMarkdownで記事を書いて](https://github.com/ruedap/daplog/tree/b7d65e07dac7dc92c0d4540a2ca23128f53142c5/app/articles)コミットする
2. トピック(staging)ブランチでGitHubにpushしてPull Requestにする
3. stagingブランチの場合はstaging環境にデプロイされるので確認する
4. 問題なければPull Requestをmaterブランチにマージする
5. マージすると自動でデプロイ（記事公開）されるのでproduction環境で確認する

この手順で行える。**新しく覚えることは何もなく、開発と執筆を区別する必要もない**。

ワークフロー図にある通りプラットフォームとしては[Heroku](https://heroku.com/)を使っていて、本番用ブログも確認用ブログもフリーの範囲内に収まっているので無料で使えている。現在利用している主なHerokuアドオンは以下で、こちらも今のところ全部無料の範囲内。

- [New Relic](https://addons.heroku.com/newrelic) - 死活監視やアプリのパフォーマンスを計測できる
- [Redis Cloud](https://addons.heroku.com/rediscloud) - Markdownから読み取った記事データはすべてRedis上に載せている
- [Deploy Hooks](https://addons.heroku.com/deployhooks) - メールやチャットでデプロイ完了を通知できる

上記以外に利用している周辺サービスとしては、以下のようなものがある。

- [Code Climate](https://codeclimate.com/github/ruedap/daplog) - コードの品質をチェックしてくれる
- [Gemnasium](https://gemnasium.com/ruedap/daplog) - gemのバージョンが最新の状態を保てているかをチェックしてくれる
- [HipChat](https://www.hipchat.com/) - チャットツールをGitHub/Heroku等からの通知・ログ収集に使用している

[Coveralls](https://coveralls.io/)も使ってたんだけど、途中から[APIのエラーが出るようになって](https://travis-ci.org/ruedap/daplog/builds/13725891#L224)いろいろ試してみたけど解決できなかった。これの解決方法を知ってる人がいたら情報求む。とても。

上記の各サービスについては以前記事にまとめたので、そちらも参考までに。

<cite>[Travis CIとCoverallsとCode Climateを使ってGitHubリポジトリにバッジを付ける](/2013/09/02/travis-ci-coveralls-code-climate-github-badge)</cite>
<cite>[Travis CIのテスト結果をHipChatに通知する](/2013/09/12/travis-ci-hipchat-notifications)</cite>
<cite>[Travis CIを使ってHerokuへのデプロイを自動化する](/2013/09/25/continuous-deployment-to-heroku-from-travis-ci)</cite>


## Sloooooooooow

このブログ環境には1つ、とても大きな欠点がある。Travis CIでのビルドとデプロイは早くて[9分](https://travis-ci.org/ruedap/daplog/builds/12703962)、遅いと[25分](https://travis-ci.org/ruedap/daplog/builds/12582743)掛かる。これは混み具合にも依存するので、平均でだいたい10〜15分掛かっている印象。なので、記事を書き終わって、さぁ公開しようという段階になっても、そこから実際に公開されるまでには、さらに15分くらいは掛かるのである。また、1文字の修正を加えたい時も、やはり反映までにはそれくらい掛かることになる。笑ってしまう。

だがしかし、この15分間ボーっと待ってるわけではない。前述した通り、[Travis CIの通知機能](/2013/09/12/travis-ci-hipchat-notifications)やHerokuアドオンの[Deploy Hooks](https://addons.heroku.com/deployhooks)を使ってHipChatやメールで通知するようにしているので、その間は他のことをしている。それでも時間が空くことには違いないけど…。

これは人によっては耐えられない・即却下な欠点になると思う。自分も使っていてちょっと遅すぎると思うこともある。ただ、これは欠点だけとは言えない。というのは、修正を反映させるのに時間が掛かることがわかっているので、一度で済ませようと注意深くなり、それによって少し落ち着いて文章を見直すことができる利点がある。[真夜中のラブレター現象](http://d.hatena.ne.jp/keyword/%BF%BF%CC%EB%C3%E6%A4%CE%A5%E9%A5%D6%A5%EC%A5%BF%A1%BC)を回避できる可能性が少し上がる。なんでもすぐに炎上する昨今なので、自分だけは大丈夫と思わず、全世界に公開するものには細心の注意を払って目を通したいし、再読したい。


## Commit Every Day, Blog Every Week

以前に[毎日のようにブログを更新していた時期](/2011/05/20/blog-hotentry-yay)があり、それはそれで得るものがあったんだけれど、だいぶ重荷になっていて、また、自分は文章をさらっと書けるタイプではないことも痛感した。文章が良くなっているかどうかは別として、性格的に何度も読み返して推敲を重ねないと気が済まないらしく、1つの記事を書き終えるのに多くの時間を消費する。その日に書き始めて、その日のうちに公開することはほとんどない。例えばこの記事も、最初にテーマとしてのタイトルを付けたのは9月19日とずいぶん昔。

そんな感じで、いくつかの記事を同時進行でちょっとずつ書いていき、すぐには公開しないタイプなので、今回のブログ環境の最大の欠点である遅さにも今のところ耐えられている。また、希望的観測ではあるけれど、このあたりの速度は1〜2年もすればハードやソフトの進化で半分以下になるんじゃないかなと思っているので、偉い人がんばってください。

最近Twitterで見かけて気に入ったフレーズに**Commit Every Day, Blog Every Week**というのがあって、目指すべきはまさにこれだなぁと思ったので、このブログのdescriptionにも採用した。このフレーズを考えた人の「Commit」はおそらくコードの意味で使っていると思うけど、自分にとっては記事を書く上でも当てはまって、前述のように考えていることを日々ちょっとずつそれぞれの記事に書き足したり削ったりしてコミットを刻んでいき、その中からまとまったと思えるものを週に1本くらいのペースで公開できると理想的だなぁと。


## History

何度も読み返して推敲を重ねないと気が済まないというのは、記事を公開した後にも続いてしまうことが多く、誤字脱字はもちろん、**文意を正反対の意味に変えてしまいたくなる**ということも稀にある。自分の中で考えがまとまってなかった未熟さの表れではあるけれど、もう一度改めて考え直した結果でそうなってしまうのは仕方がない。

だからといって公開後にこっそり変えてしまうのは後ろめたさがあり、かといって、誠実さをアピールするために打ち消し線を引いたりして記事本文をごちゃごちゃにはしたくないと思っていた。冒頭で紹介した記事ではその点に触れていて、良い解決策を提示している。

> ブログの記事をこっそりと書き換えると、不信感を招きます。最悪のケースでは炎上してしまうかもしれません。かといって、追記や補足のたびに「○月○日追記」のように書くと、逆に、初めて見る人は読みにくくなります。2 回目に見る人に誠実になるために、初見の人に不便を強いるのは何か違います。
>
> そこで、GitHub の履歴です。履歴を公開していることを言い訳にすれば、思い切って記事を書き換えやすくなる気がします。将来的には、それぞれの記事ページから「編集履歴」として GitHub のページへのリンクを貼ることも検討しています。
>
> <cite>[俺の最強ブログ システムが火を噴くぜ - てっく煮ブログ](http://tech.nitoyon.com/ja/blog/2012/09/20/moved-completed/)</cite>

このブログでは上のアイデアを全面的に採用してみた。ブログの記事タイトルの直下には、真円が2つ重なった大きめの装飾が付けてあるけれど、そこに**GitHubリポジトリで該当するMakrdownファイルへのリンク**が設定されていて、リンク先の右上にあるHistoryボタンをクリックすれば、その記事の改訂履歴（コミットログ）が見られるようになっている。

例えば最近だと、[BEMという命名規則を紹介した記事](/2013/10/29/block-element-modifier)は、公開前に何度も推敲を重ねて準備万端にしたつもりだったけど、それでも[公開後にもいくつかの小さな修正を重ねている](https://github.com/ruedap/daplog/commits/master/app/articles/2013-10-29-block-element-modifier.md)。


このように、記事の改訂履歴をすべて公開していくのは少々恥ずかしさもあるけれど、前述の後ろめたさや記事を修正した場合のごちゃごちゃ感を回避できるのなら、このアイデアは十分良いものに思えた。


## Web UI

この[GitHubリポジトリ内で直接Markdownファイルとして管理する](https://github.com/ruedap/daplog/tree/b7d65e07dac7dc92c0d4540a2ca23128f53142c5/app/articles)メリットはもうひとつあって、ここ最近でGitHubのWeb UIはだいぶ進化して、[GitHub Flowに関するひと通りの操作をWeb上だけでできるようになっている](https://github.com/blog/1557-github-flow-in-the-browser)ので、その選択肢も使えるようになる。

例えば1文字修正するだけなら、前述と同じようにブログの記事タイトルの直下からGitHubリポジトリに飛んで、そこの右上にあるEditボタン（リポジトリの管理者のみ）を押して、その場で直接編集してしまった方が早い。誤字脱字を直す場合はこの方法をよく使う。

<figure>
<a href="/images/2013/11/11/github-flow-blog-03.png">
<img src="/images/2013/11/11/github-flow-blog-03.png" alt="Edit">
<figcaption>GitHub Web UIの編集画面</figcaption>
</a>
</figure>

さらに前述の通り、やろうと思えば、ゼロの状態から新しい記事を書いてstagingブランチでコミットする、ということもWeb上だけから行うことが可能。例えば[この記事](/2013/09/25/continuous-deployment-to-heroku-from-travis-ci)や[この記事](/2013/10/01/vim-sass-convert)はWeb UIだけを使って書かれたもので、以下のIssueを先に作って記事を下書きし、それを元にWeb上でブランチを切ってコミットを行っている。ログから違いはわからないけど。

- [2013-09-25-continuous-deployment-to-heroku-from-travis-ci.md · Issue #16](https://github.com/ruedap/daplog/issues/16)
- [2013-10-01-vim-sass-convert.md · Issue #23](https://github.com/ruedap/daplog/issues/23)

ただ、画像を直接コミットする方法はまだ無いようなので、画像を使った記事を書く場合は何らかの外部サービスと連携する必要がありそう。一番簡単なのはDropboxかな。

このGitHubのWeb UIを使う方法が、よくあるブログの編集画面と違うのは、**Web上からの操作でもちゃんとコミットが刻まれる点**で、この操作を行っても、先ほどの改訂履歴を公開するアイデアを潰してしまわないのも良いところ。

自分の場合は出先でブログを書いたりすることはまず無いけれど、CLIを使わずに更新する方法がある・いつもとは別の選択肢がある、というのは悪いことでは無さそう。

---

今回作ってみたブログ環境はこんな感じで運用している真っ最中で、絶賛試行錯誤中。

GitHubやGitHub Flowというのは、話として聞いているだけではその良さがなかなか実感しにくくて、実際に触ってみないとわからない部分が多いような気がする。でも一度触れてわかってしまえば、よく出来た開発フローだと感心でき、今回のように**コーディングだけでなく他のものにも応用**したくなる。また、**今後自分が参加するかもしれないプロジェクトでも採用されていて欲しい**と思うので、こうやって人にも薦めたくなる。これぞクチコミ。

というわけで、荒削りだけど**ブログを書く環境にGitHub Flowを適用して運用してみてるよ**という紹介をしてみた。このブログアプリの詳細など、続きはGitHubリポジトリで。

<cite>[ruedap/daplog · GitHub](https://github.com/ruedap/daplog)</cite>
