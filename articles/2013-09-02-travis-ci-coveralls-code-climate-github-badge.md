# <span>Travis CIとCoverallsとCode Climateを使って</span><span>GitHubリポジトリにバッジを付ける</span>

先月に公開した超ニッチなツール[Font Awesome Workflow for Alfred 2](https://github.com/ruedap/alfred2-font-awesome-workflow)が意外と好評で、そこにオクラホマ州から[これOS X Mavericksで動いとらんよ](https://github.com/ruedap/alfred2-font-awesome-workflow/issues/1)とお便りが届いたりした。

そんなわけで[少々テストを書いた](https://github.com/ruedap/alfred2-font-awesome-workflow/blob/master/workflow/test/font_awesome_test.rb)上で、Mountain Lion以前に入っている*Ruby 1.8.7*と、Mavericks以降に入る*Ruby 2.0.0*の両方で常に動作確認しておくようにしたいと考えて、まず[Travis CI](http://travis-ci.com/)を、その後[Coveralls](https://coveralls.io/)と[Code Climate](https://codeclimate.com/)を導入した。この記事はその備忘録。

[![Build Status](https://travis-ci.org/ruedap/alfred2-font-awesome-workflow.png?branch=master)](https://travis-ci.org/ruedap/alfred2-font-awesome-workflow) [![Coverage Status](https://coveralls.io/repos/ruedap/alfred2-font-awesome-workflow/badge.png)](https://coveralls.io/r/ruedap/alfred2-font-awesome-workflow) [![Code Climate](https://codeclimate.com/github/ruedap/alfred2-font-awesome-workflow.png)](https://codeclimate.com/github/ruedap/alfred2-font-awesome-workflow)
{: .ArtcleBody-inlineImage .u-textCenter }

それらを導入すると、こんなかんじのバッジを表示できる。GitHubでよく見かけるやつ。今回使ったサービスはどれも、**オープンソースなら無料**で使わせてもらえる。

<!-- READMORE -->

## Travis CI
[Travis CI](http://travis-ci.com/)は名前の通り[継続的インテグレーション(Continuous Integration)](http://ja.wikipedia.org/wiki/%E7%B6%99%E7%B6%9A%E7%9A%84%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)のためのもの。似たようなサービスはいくつかあって、その中で[drone.io](https://drone.io/)や[Snap CI](https://snap-ci.com/)あたりも注目しているんだけど、今回の用途ではTravis CIのほうが適しているのでそちらを選択した。

まずは[travis gem](https://rubygems.org/gems/travis)をインストールする。このgemは、Travis CIに関する各種操作をCLIから実行できるもので、無くても使えるけどあると便利。このgemの`travis init`コマンドを使用して、Ruby用の`.travis.yml`を生成し、対象のリポジトリのTravis CIを有効化する。

~~~ sh
$ ruby -v
ruby 2.0.0p247 (2013-06-27 revision 41674) [x86_64-darwin12.4.0]
$ gem install travis
$ cd [PROJECT ROOT]
$ travis init ruby --rvm 1.8.7 --rvm 2.0.0
.travis.yml file created!
ruedap/alfred2-font-awesome-workflow: enabled :)
~~~

この`.travis.yml`は、テストを実行するサーバーの設定を指定・カスタマイズできる。

~~~ yaml
language: ruby
rvm:
- 1.8.7
- 2.0.0
~~~

前述の`travis init`コマンドの内容で「Rubyの1.8.7と2.0.0の環境でテストを実行する」という今回の目的の動作をしてくれるけど、さらに細かい設定を行いたい場合は、こちらのドキュメントなどを参考に`.travis.yml`に記述する。

<cite>[Travis CI: Building a Ruby Project](http://about.travis-ci.org/docs/user/languages/ruby/)</cite>

この`.travis.yml`の記述の仕方が間違っていると、何度もGitHubリポジトリに修正pushをしなくちゃならなくて、コミットログが汚くなってカッコ悪いことになる。それを少しでも回避するために`.travis.yml`専用のバリデーションツールがあるので、その[gem](https://rubygems.org/gems/travis-lint)を入れて記述の仕方が間違ってないかを事前にチェックしておく。

~~~ sh
$ gem install travis-lint
$ travis-lint
Hooray, /Users/ruedap/alfred2-font-awesome-workflow/.travis.yml seems to be solid!
~~~

これで、生成された`.travis.yml`をコミットしてリモートリポジトリにプッシュすれば、以降プッシュする度にTravis CI上でテストが実行されるようになる。

~~~ sh
$ git add .travis.yml
$ git commit -m "Add .travis.yml"
$ git push origin master
$ travis open
~~~

`travis open`コマンドで対象のTravisページを開けるので、[Build Historyタブ](https://travis-ci.org/ruedap/alfred2-font-awesome-workflow/builds)を見れば、今プッシュしたコミットでのテストが実行されているはず。また、右側の設定ボタンからStatus Imagesを選べば、バッジ用のコードを取得できるので`README.md`等に貼り付ける。直近で実行されたテストが、成功なら緑(passing)で、失敗なら赤(failing)で表示される。

[![Build Status](https://travis-ci.org/ruedap/alfred2-font-awesome-workflow.png?branch=master)](https://travis-ci.org/ruedap/alfred2-font-awesome-workflow)

また、Pull Requestが届いた際にもテストが実行されるので、そのPull Requestのコードがテストに成功する内容かどうかが、Pull Requestのページ上で視覚的にわかるようになる。

[![Pull Request (Travis CI)](/images/2013/09/02/travis-ci-coveralls-code-climate-github-badge-01.png)](/images/2013/09/02/travis-ci-coveralls-code-climate-github-badge-01.png)

上記のキャプチャ画像は[このPull Requestページ](https://github.com/ruedap/alfred2-font-awesome-workflow/pull/11)のもので、一番下のコミットの状態でテストが実行されて無事に成功していることが、それを表す緑のチェックマークで判断できる。これによって、テストに成功しないコードはマージしない判断が容易にできるようになる。


## Coveralls

[Coveralls](https://coveralls.io/)は、*コードカバレッジ*と呼ばれる[テストのカバー率](http://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%BC%E3%83%89%E7%B6%B2%E7%BE%85%E7%8E%87)を計測してくれるサービス。これを利用することで、まだテストを書いていないコードの場所が明確になる。

まずは最初に、Coverallsのサイトで対象のGitHubリポジトリを有効化しておく。そして `.coveralls.yml`をプロジェクトルートに作成して、サービス名にTravis CIを指定する。[^1]

[^1]: 試してみたところ`.coveralls.yml`は無くても動くみたいなんだけど、[ドキュメント](https://coveralls.io/docs/ruby)には置いておいたほうが良いような書き方がされていたので一応

~~~ sh
$ cd [PROJECT ROOT]
$ touch .coveralls.yml
$ echo "service_name: travis-ci" > .coveralls.yml
~~~

次に、`Gemfile`に[coveralls gem](https://rubygems.org/gems/coveralls)を指定して`bundle install`する。

~~~ ruby
group :test do
  gem 'coveralls', :require => false
end
~~~

最後に、`test_helper.rb`にCoverallsを実行させるコードを挿入する。挿入する位置は対象にしたいコードの`require`行より上にする。通常は一番上で大丈夫なはず。

~~~ ruby
require 'coveralls'
Coveralls.wear!
~~~

もし、ローカルでのテスト実行時にも[SimpleCov](https://github.com/colszowka/simplecov)の詳細な結果を得たいのであれば、以下のような感じにして計測結果のHTMLファイルを出力するように変更する。詳しくは[こちら](https://coveralls.io/docs/ruby)。

~~~ ruby
require 'simplecov'
require 'coveralls'

SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter[
  SimpleCov::Formatter::HTMLFormatter,
  Coveralls::SimpleCov::Formatter
]
SimpleCov.start do
  add_filter '.bundle/'
end
~~~

これらの変更をリモートにプッシュすれば、コードカバレッジが計測されているはず。

~~~ sh
$ git add -A
$ git commit -m 'Add Coveralls'
$ git push origin master
$ open https://coveralls.io/r/ruedap/alfred2-font-awesome-workflow
~~~

[Coverallsページ](https://coveralls.io/r/ruedap/alfred2-font-awesome-workflow)のTECHNICAL DETAILSのところからバッジ用のコードを取得できるので`README.md`等に貼り付ける。ちゃんとテストコードでカバーできていれば*100%*になる。

[![Coverage Status](https://coveralls.io/repos/ruedap/alfred2-font-awesome-workflow/badge.png?branch=master)](https://coveralls.io/r/ruedap/alfred2-font-awesome-workflow?branch=master)

また、Pull Requestが届いた際にもカバレッジが計測されて、その結果がコメントとしてPull Requestページに投稿される。この機能はオプションでオフにすることも可能。

[![Pull Request (Travis CI)](/images/2013/09/02/travis-ci-coveralls-code-climate-github-badge-02.png)](/images/2013/09/02/travis-ci-coveralls-code-climate-github-badge-02.png)

上記キャプチャは[前述と同じPull Requestページ](https://github.com/ruedap/alfred2-font-awesome-workflow/pull/11)のもので、このPull Requestのカバレッジが100%であることがわかる。これはカバレッジを維持するためのいいプレッシャーに…!


## Code Climate

[Code Climate](https://codeclimate.com/)は、コードの品質をチェックするためのRuby専用[^2]のサービスで、リファクタリング関係の書籍などでよく目にする[コードの臭い](http://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E8%87%AD%E3%81%84)に関する兆候を指摘してくれる。

[^2]: 近日中に[JavaScript対応バージョンがリリース](https://codeclimate.com/js)される模様

このサービスは、公開されているGitHubリポジトリのRubyコードを解析するだけなので、前述の2つのサービスのように新たにコード等を追加する必要は無くて、Code Climateのサイトにログインして自分のGitHubアカウントと連携させてから、[チェック対象にしたいGitHubリポジトリを登録する](https://codeclimate.com/github/signup)だけで準備が完了する。対象のリポジトリを登録できたら、[右上に表示されているバッジ](https://codeclimate.com/github/ruedap/alfred2-font-awesome-workflow)をクリックすれば、バッジ用のコードを取得できる。

[![Code Climate](https://codeclimate.com/github/ruedap/alfred2-font-awesome-workflow.png)](https://codeclimate.com/github/ruedap/alfred2-font-awesome-workflow)

この数値は*4.0*が最も良い状態で、コードの臭いの兆候が増えると数値が下がっていく。

## Gemnasium

[Gemnasium](https://gemnasium.com)は、使用しているgemのバージョンが最新の状態を保てているかをチェックしてくれるRuby専用のサービス。今回これは使用してないけど、GitHubでのバッジとして、前述の3つのサービスとセットでよく見かける。これもオープンソースなら無料。

Code Climate同様、チェック対象のGitHubリポジトリを指定するだけなので設定は簡単。今回このサービスを使用してない理由は、プロジェクトルートにGemfileが配置されてないとそもそも使えないようで、使いたくても使えなかった…。[^3] 設定画面でGemfileの場所を指定できようになると嬉しいんだけど。

[^3]: 今回このバッジを設置したかったリポジトリでは、[workflowディレクトリにGemfileを配置している](https://github.com/ruedap/alfred2-font-awesome-workflow/tree/master/workflow)ため、Gemnasiumで設定してみたけど認識できなかった

使用しているライブラリを最新に保つことは、RubyやRailsのバージョンを最新に保つことと同じくらい大事なことだと最近実感できるようになってきて、Railsのエコシステムではそれが顕著な感じ。自分が参加しているRailsプロジェクトではほぼ毎日のようにGemfileがメンテナンスされているし、例えば[この記事](http://blog.kyanny.me/entry/2013/06/02/RubyKaigi_2013)を読んでも、その大切さがよく伝わってくる。

ただ、それは結構面倒なことなので怠ってしまいがちで、そういう意味でもこのサービスのように状態を見える化してくれるとありがたくて、出来ればこのバッジも付けたいところ。もしくは、サービスでは無いけどコンセプトが近い[tachikoma](https://github.com/sanemat/tachikoma)というgemもあるみたい。

---

今回は、とても小さなコードのほんの少しのテストのために、いくつもサービスを利用して大がかりとも言えそうな環境を作ったけど、小さいからこそカバー率を高めるのが容易で、臭いもまず醸さないので、簡単に高評価を得られて自己満足度が高い。個人で始めるなら、こういう小さなものから少しずつ試してみるのが良さそうだなぁと思った。

<cite>[ruedap/alfred2-font-awesome-workflow · GitHub](https://github.com/ruedap/alfred2-font-awesome-workflow)</cite>
