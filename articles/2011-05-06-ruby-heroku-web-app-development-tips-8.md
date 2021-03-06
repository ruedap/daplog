# <span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(8) 最新技術に触れる</span>

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第8回では、Herokuを利用するともれなく最新技術に触れることになる点について書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## 新しい技術に必然的に触れる

このシリーズも終盤で、そろそろまとめの段階に入ります。今回はHerokuというシステム全体を見たときに良いと思った「最新技術に触れること」について書きます。これは新しい技術をちゃんと使いこなせていない私が言うのはちょっと説得力に欠けてしまいますが、ただそれほど的外れでもないと思っています。

Heorkuは、使い始めることで必然的・結果的に現在の最新技術に触れることになります。具体例を挙げると、例えば、

- 従来のレンタルサーバーではなく、必要になれば“スケーリング”が可能なクラウド（PaaS）
- 従来のFTPによるファイルアップロードではなく、Gitの“バージョン管理”を含めたデプロイ

などです。細かく言えばもっとたくさんあると思いますが、特にわかりやすいのは上の2つです。自分の場合、Herokuを使い始めるまで、スケーリングの意味がわかってなかったですし、クラウドやPaaSと呼べるようなサービスはほとんど使ったことがありませんでした。バージョン管理についても興味本位でSubversionをTortoiseSVNでちょろっと触ってみて「ワケワカンネー」という程度でした。

さらに、Herokuを使い始めて4ヶ月が経過した今でも、スケーリング機能（dyno数の増加、詳しくは[第1回](/2011/04/29/ruby-heroku-web-app-development-tips-1)参照）はまだ使ったことはありませんし、Gitも最低限のコマンドしか覚えておらず未だにバージョン管理を出来ているとは言えない状態です。

それでも、Herokuを使い始めることで、現状良いプラクティスだとされているこれらの技術に必然的に触れることになります。特に後者のGitは、バージョン管理をするつもりがまったく無くても、Herokuでデプロイすること＝その時の状態をコミットすること＝バックアップすること、となり、結果的にバックアップが積み重ねられたバージョン管理がされることになります。良いプラクティスを開発工程の流れの中で自然に、あまり意識せずに行えます。ライブラリ管理ツールであるBundlerについてもこれと同じことが言えます。

Herokuを使い始める以前の段階で、スケーリングの意味がわからなかったり、Subversionを理解できなかったのは、それほど使う理由が無かったことと、継続的に使っていなかったことが原因だと思います。業務で使うならまだしも、個人が趣味で使うならよほど便利だったりしないと使い続ける理由にはなりません。その点Herokuでは、Herokuが提供するプラットフォームの[無料スペック](/2011/04/29/ruby-heroku-web-app-development-tips-1/)や[アドオン](/2011/04/30/ruby-heroku-web-app-development-tips-2/)がまず魅力的で、これを利用するために前述の最新技術に触れることになり、まずは必要最低限を覚え、本格的に使う理由が出てきたら真剣に学ぶという[遅延学習的](http://blog.livedoor.jp/kensuu/archives/50555054.html)に使うことができて、Herokuというシステムを全体的に見た場合でもとても良く出来ているなぁと感心します。


## GitHubに公開されているソースコードで学ぶ

ブログに開発工程を残しておくことは書く側にも色々とメリットがあり、また読む側も情報が得られるという意味でメリットがありますが、ソースコードを直接読むこともとても勉強になります。Herokuからはちょっと話が逸れますが、Rubyにはソースコードを公開することを奨励する文化というか雰囲気があるっぽい気がしていて、実際に[GitHubでの言語別の集計](https://github.com/languages)では、JavaScriptに次いでRubyは2番目に多いです。

このGitHubで公開されているRubyコードの中には、もちろんHerokuアプリとして作られたものもあって、最近自分はそのコードを読むことで学んだりもしています。例えば、[前回の記事](/2011/05/05/ruby-heroku-web-app-development-tips-7)で紹介したクラウド用ブログツール[Lokka](http://lokka.org/)もGitHubにソースコードが公開されていて読むことが出来ます。

<cite>[komagata/lokka - GitHub](https://github.com/komagata/lokka)</cite>

この規模のアプリのコード全部を読んで理解するのは自分にはまだ難しいですが、部分的であれば読むことができ、実際に[Lokkaのソースコードを読むことでRakefileの書き方を学んだり](/2011/02/16/ruby-sinatra-datamapper-5-heroku-postgresql-rakefile)しました。ちなみに、このLokkaの開発者が所属する[フィヨルド](http://fjord.jp/)という会社は、自社で作っているWebアプリをオープンソースとして公開していて、今のところすべてHeroku製アプリのようです。個人的に、Herokuアプリを作る上でGitHub上のソースコードを参考にするなら、真っ先に見に行くところです。

<cite>[FJORDのWebサービスはオープンソースです \| FJORD, LLC（合同会社フィヨルド）](http://fjord.jp/love/534.html)</cite>

ここ以外にも、自分がHerokuアプリを作る上で参考にさせてもらったGitHub上のRubyコードはたくさんあり、さらに詳しくは[私のGitHubアカウントのフォローしているプロジェクト](https://github.com/ruedap/following)あたりを見てもらえれば、Ruby/Heroku関連のプロジェクトがいくつもあると思います。また、もし他にも参考になるプロジェクトやHerokuアプリを公開している人などご存知でしたらぜひ教えてください。

---

今回は、Herokuを利用するともれなく最新技術に触れることになる点と、GitHubのソースコードで学べる点について書きました。
次回は、[Herokuはとても便利だけど依存しすぎてしまうとちょっと危険だよ、という実体験](/2011/05/07/ruby-heroku-web-app-development-tips-9)について書きます。
