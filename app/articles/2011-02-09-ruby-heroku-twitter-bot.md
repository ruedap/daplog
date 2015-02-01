# <span>Herokuを使って1日1回名言をツイートする</span><span>Twitter Botの作り方</span>

ここ最近、[Google App Engine](https://appengine.google.com/)や[Heroku](http://heroku.com/)を使ってTwitter Botを作ろうと、いろいろ実験していた。以下はその関連記事。

<cite>[Google App EngineのJRubyでSinatraを使ってHello worldする](/2011/01/24/google-app-engine-jruby-sinatra-hello-world)</cite>
<cite>[RubyでTwitterのOAuth認証に必要なトークンを取得する](/2011/01/26/ruby-twitter-oauth-token-secret)</cite>
<cite>[Google App EngineのJRubyでSinatraからTwitterにつぶやけなかった](/2011/01/27/ruby-goole-app-engine-jruby-sinatra-twitter-rubytter)</cite>
<cite>[HerokuでSinatraを使ってHello worldする](/2011/01/28/ruby-heroku-sinatra-hello-world)</cite>
<cite>[HerokuアプリをGitHubにもプッシュする](/2011/01/29/git-heroku-app-push-github)</cite>
<cite>[HerokuとGitHubの両方にプッシュする時の秘密にしたい値の扱い](/2011/01/30/git-heroku-github-push-secret-value)</cite>
<cite>[HerokuのSinatraでTwitterにつぶやく](/2011/01/31/ruby-heroku-sinatra-twitter-tweet)</cite>
<cite>[Herokuのcronを使って自動でTwitterにつぶやく](/2011/02/01/ruby-heroku-sinatra-cron-twitter-tweet)</cite>

で、これらを踏まえた試行錯誤の結果、Herokuと[Sinatra](http://www.sinatrarb.com/intro-jp.html)の組み合わせで目的のものが作れたので、その工程（情報）をキレイに1つにまとめてみる。それがこのエントリー。

<!-- READMORE -->


## 完成品

まずは[これ](http://twitter.com/chaplin_bot)が完成品。喜劇王[チャップリン](http://ja.wikipedia.org/wiki/%E3%83%81%E3%83%A3%E3%83%BC%E3%83%AB%E3%82%BA%E3%83%BB%E3%83%81%E3%83%A3%E3%83%83%E3%83%97%E3%83%AA%E3%83%B3)の名言をツイートする全自動Twitter Bot。この記事を通して完成するのはこのレベルのTwitter Botで、黙々と1日1回つぶやくだけ。

<blockquote class="c-tweet"><p>人生に必要なものは、勇気と想像力とほんの少しのお金だ。</p>&mdash; チャーリー・チャップリン (@chaplin_bot) <a href="https://twitter.com/chaplin_bot/statuses/29181947871764480">January 23, 2011</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<cite>[チャーリー・チャップリン (chaplin_bot) on Twitter](http://twitter.com/chaplin_bot)</cite>
<cite>[Rubyのソースコード一式](https://github.com/ruedap/chaplin/tree/1.0)</cite>

自分は昔からチャップリンが好きで、出勤途中のiPhone片手にTwitterを見てるときに、そのタイムライン上にチャップリンの名言が流れてきたらいいなぁと思ってこのTwitter Botを作ってみた。そういう理由でツイートする時間帯も毎朝9時頃に設定してある。


## 参考になる2つの動画

今回のTwitter Botを制作する際に必要な各ツールやサービスを利用する上で、ネット上の色々な記事を見て回ったけど、中でも以下の2つの解説ビデオが特に参考になった。映像の力はすごい。ので、もし時間に余裕があれば事前に見ておくと、制作がより捗るかもしれない。両方見ても20分程度。

<cite>[8分21秒で分かるRubyとOAuthによるTwitterAPIの使い方（動画）](http://d.hatena.ne.jp/mirakui/20100505/1272961897)</cite>

この動画は、TwitterでのOAuthの認証に必要なアプリ登録からアクセストークン取得までの一連の操作をわかりやすく解説してくれる。[^1]

<cite>[Ruby on Rails向けPaaS「Heroku」って、こんな感じです（スクリーンキャスト）](http://el.jibun.atmarkit.co.jp/rails/2010/12/rubypaasheroku-.html)</cite>

この動画は、プロジェクト作成からウェブ公開までのHerokuの一連の操作をわかりやすく解説してくれる。[^2]


## 必要なもの

今回の制作に必要な環境は以下のとおり。

- Ruby環境（今回使用したバージョンは1.8.7）
- Git環境（Webアプリの公開に必要。Windowsの場合は[msysGit](/2011/02/07/git-windows-msysgit-github)など）
- Bot用のTwitterアカウント
- Botがツイートする言葉（31個あると都合が良いが、それ以下でもOK）
- Herokuのアカウント（未取得なら[サインアップ](https://api.heroku.com/signup)）
- クレジットカード（お金はかからないけど、Herokuで1日1回自動でつぶやくためのアドオンを有効化するのに必要）

個人的には、クレジットカード情報の登録が一番ハードルが高いと感じた。[^3]
ちなみに、自動でツイートさせる必要がなかったり、Heroku上だけで完結させる必要がなかったり[^4]するなら、クレジットカード情報の登録は必要ない。

ただ、Herokuには[色々と便利なアドオン](http://addons.heroku.com/)が用意されており、無料で使えるものもたくさんある。例えばメール配信機能だとか、バックアップ機能だとかの無料アドオンを使う場合でも、やはりクレジットカード情報の登録が必要になるので、たとえ無料部分しか使わないとしても、長く使っていくにはいずれ通る道な気がする。


## 開発の流れ（目次）

全体の流れを大雑把に説明すると以下の5ステップ。

1. プロジェクトの準備［Git］
2. Twitterとの認証［Twitter］
3. プログラミング［Ruby］
4. 公開［Heroku］
5. 自動化［Heroku］


## 1. プロジェクトの準備

それでは始めよう。まず、この第1ステップでは、必要なRubyライブラリのインストールや、プロジェクト用フォルダの作成、Gitの初期化などを行う。全ステップの中で最も簡単な工程なので安心されたし。


### 必要なgemのインストール

今回必要になるgemをここで一気にインストールしてしまおう。コマンドプロンプトまたはターミナル（以降「コマンドプロンプト」と記述）で、タイプミスの無いように、以下の`gem install`コマンドを実行する。コピペ推奨。

~~~ sh
$ gem install heroku sinatra bundler get-twitter-oauth-token --no-rdoc --no-ri
~~~

<small>RVMを利用していない場合など、環境によってはインストール時にsudoが必要になることもあります。</small>

インストールにはそんなに時間は掛からないはず。サクサク進もう。


### Bot用フォルダを作成

次に、ローカルのHDD上にBot用のプロジェクトフォルダを作成する。

~~~ sh
$ mkdir chaplin_bot
$ cd chaplin_bot
$ git init
~~~

今後の作業はすべて、この`chaplin_bot`フォルダをベースに行う。`git init`は必須。これがないと最終的にHerokuでWebアプリを公開できない。


### 現時点でのプロジェクト構成

この時点での`chaplin_bot`フォルダの構成はこんなかんじ。

~~~ sh
.
└── .git
1 フォルダ
~~~

最初は`.git`フォルダだけ。これで第1ステップは完了。


## 2. Twitterとの認証

ここからはTwitterとOAuthでの認証処理を行う。この認証をすることで、WebアプリからTwitterにツイートできるようになる。以下は冒頭でも紹介したが、これからやる一連の認証作処理の雰囲気を掴むのに適しているので、8分21秒の時間の余裕があれば是非。

<cite>[8分21秒で分かるRubyとOAuthによるTwitterAPIの使い方（動画）](http://d.hatena.ne.jp/mirakui/20100505/1272961897)</cite>

<small>ここからの工程には、Twitterのサイトに訪れて登録・認証を行うものが含まれていますが、普段メインで使用しているTwitterアカウントと、今回のBot用アカウントが混同しないように十分注意してください。普段使っているブラウザでメインのTwitterアカウントがログイン状態の場合は、事前にログアウトしておくことをおすすめします。</small>


### Twitter側での準備

Bot用Twitterアカウントにログインして、[Twitterのアプリケーション登録申請のページ](http://dev.twitter.com/apps/new)から、「新しいアプリケーションを追加」をクリックして新規アプリを登録する。項目の中で必須なのは、以下の5つ。

|アプリケーション名|チャップリン|
|アプリケーションの説明|チャップリンBotは、喜劇王Charlie Chaplinの名言をつぶやく全自動Botです。|
|アプリケーションのウェブサイトURL|<http://twitter.com/chaplin_bot>|
|アプリケーションの種類|ブラウザアプリケーション|
|標準のアクセスタイプ|Read & Write|

で作成すると*Consumer key*と*Consumer secret*が表示されるので2つともメモる。


### TwitterのOAuth認証に必要なトークンを取得

次に、第1ステップでインストールした[get-twitter-oauth-tokenライブラリ](https://github.com/jugyo/get-twitter-oauth-token)を使用して、TwitterのOAuthでの認証に必要なトークンを取得する。

~~~ sh
$ get-twitter-oauth-token
~~~

コマンドプロンプトから上記コマンドを実行する。`get-twitter-oauth-token`コマンドを実行すると、さきほどメモった*Consumer key*と*Consumer secret*を聞かれるのでペーストする。するとウェブブラウザが自動で開いて（Windowsの場合は手動でアドレスを入力して開いて）、Twitterのページが表示され「アプリを許可しますか？」と聞かれる。

許可すると、*暗証番号（PIN）*が表示されるのでそれをコピる。コマンドプロンプト側では、その暗証番号の入力待ち状態（PIN:）になっているのでペーストする。

すると、TwitterのOAuth認証に必要な*Token*と*Secret*が表示されるので2つともメモる。これでこの第2ステップは完了。


## 3. プログラミング

やっとプログラミングの段階に入る。ここではコード自体の説明は触れずに、作成する必要があるファイルのみを列挙する。ファイルは*すべてUTF-8*で作成する。コードの内容や、Ruby/Sinatraについて詳しく知りたい場合は、ページ末尾の参考リンクを参照されたし。


### 各種ファイルを作成

`chaplin_bot`フォルダ直下に、新しく4つのファイルを作成する。最終的に以下のようなファイル構成になればOK

~~~ sh
.
├── .git
├── Gemfile
├── app.rb
├── config.ru
└── tweet.rb
1 フォルダ, 4 ファイル
~~~

拡張子のないファイルもあるのでWindowsの場合は注意。まったく同じファイル名にすること。まず1つ目、Bundler用の`Gemfile`ファイルを作成する。ファイルの中身は以下。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'twitter'
~~~

2つ目、Rack用の`config.ru`ファイルを作成する。中身は以下。

~~~ ruby
require 'app.rb'
run Sinatra::Application
~~~

3つ目、Sinatraの処理を記述する`app.rb`ファイルを作成する。中身は以下。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'tweet.rb'
get '/' do
  'under construction'
end
get '/random_tweet' do
  Tweet.new.random_tweet  # 動作チェックが終わったらコメントアウトすること
end
~~~

最後4つ目、Twitterに投稿する言葉（名言）やロジックを記述する`tweet.rb`ファイルを作成する。中身は以下。

~~~ ruby
require 'rubygems'
require 'twitter'
class Tweet
  def initialize
    @text = <<-EOF.split("\n")
私の最高傑作は次回作だ。
映画の目的は笑わせることだ。しかし、そのなかには、二十世紀の世界に通じるシリアスな内容が含まれている。
いつも大人のなかにまぎれこんでしまった子供のような気がする。
孤児院にいたときでも、食べ物を求めて通りをうろつきまわっていたときでも、自分は世界一の俳優だと信じていた。自分自身にたいする揺るぎない自信に身をひたしている必要があった。それがなければ人生に押しつぶされていただろう。
母のパントマイムは私の見たかぎりにおいて、もっともすばらしいものであった。母の所作を見ているうちに、私は感情を手や顔で表現する技術ばかりでなく、人間というものを学びとることができた。
私は悲劇を愛する。悲劇の底にはなにかしら美しいものがあるからこそ悲劇を愛するのだ。
人生は恐れなければ、とても素晴らしいものなんだよ。
世の中には貪欲に知識を求める人間がいる。私もその一人だった。ただし動機から言うと、私のはそれほど純粋ではなかった。知識愛から求めたのではなく、ただ無知な人間にたいする世間の侮蔑から身を護るためにそうしたのだった。そんなわけで、暇さえあれば、古本屋漁りをしていた。
もし虹を探すのなら、下を見ては見つからない。
人生はクローズアップで見れば悲劇。ロングショットで見れば喜劇。
時は偉大な作家だ。つねに完璧な結末を書く。
笑いのない一日は無駄な一日である。
死と同じように避けられないものがある。それは生きることだ。
人生に必要なものは、勇気と想像力とほんの少しのお金だ。
幸福を手にするための戦いは美しいものです。
長い間の経験から、アイデアというものは、それを一心に求めてさえいれば必ずくるということを発見した。たえず求めているうちに、いわば心が想像力を刺激するような出来事を見張る一種の物見やぐらになってしまうのである。
私たちはみんなおたがいに助けあいたいと望んでいます。人間とはそういうものです。私たちは他人の不幸によってではなく、他人の幸福によって生きたいのです。
一人を殺せば殺人者だが、百万人を殺せば英雄だ。殺人は数によって神聖化させられる。
あなた方は機械ではない、人間です。人間を愛する心を持った人間です。憎んではいけません。愛を知らぬ人間、愛されたこともない人間だけが憎むのです。隷属のために戦ってはいけません。自由のために戦ってください。あなた方はこの人生をすばらしいものにする力を持っているのです。
人間には憎悪や不快を忘れさせてしまう性質がある。
大量殺人については、世界はそれを奨励しているのではありませんか。大量殺人という唯一の目的のために、破壊兵器を製造しているのではありませんか。
愛国心というものは、かつて世界に存在した最大の狂気である。愛国心がもてはやされた結果は、また新たな戦争である。
生きて行くことは美しく素晴らしい。クラゲにとってもね。
人生は願望だ、意味じゃない。
僅かな人間が決めた賞なんて、そうたいした名誉ではない。私のほしいものは大衆の喝采だ。大衆が私の仕事を賞賛してくれたならば、それで十分だ。
私は支配したくない。私は人の幸福を願いながら生きたい。貪欲が人類に憎悪をもたらし悲劇と流血をもたらした。思想だけがあって感情がなければ人間性は失われてしまう。
最初から多くのことを成し遂げようとして極端な努力をすると、たちまちのうちに全てを放棄することになる。
失敗は重要ではない。自分自身を馬鹿にするのは勇気がいる。
どうやってアイデアをつかむか？ それには、ほとんど発狂一歩手前というほどの忍耐力がいる。苦痛に耐え、長期間にわたって熱中できる能力を身につけねばならぬ。
そうだ人生はすばらしい。何より大切なのは勇気だ、想像力だ。
"You?" "You can see now?" "Yes, I can see now."
EOF
    Twitter.configure do |config|
      config.consumer_key       = 'メモったConsumer keyを挿入する'
      config.consumer_secret    = 'メモったConsumer secretを挿入する'
      config.oauth_token        = 'メモったTokenを挿入する'
      config.oauth_token_secret = 'メモったSecretを挿入する'
    end
  end
  def random_tweet
    tweet = @text[rand(@text.length)]
    update(tweet)
  end
  def daily_tweet
    tweet = @text[Time.now.day - 1]
    update(tweet)
  end
  private
  def update(tweet)
    return nil unless tweet
    begin
      Twitter.update(tweet.chomp)
    rescue => ex
      nil # todo
    end
  end
end
~~~

4つ目の`tweet.rb`は、*以下の2点を編集する必要*がある。


### ツイートする言葉の編集

まず見ての通り、Botがツイートする言葉（名言）が埋めこまれているのがわかる。8行目～38行目の文字列がそれで、1行あたり1ツイートに相当し、31個用意してある。この31個は1ヶ月の31日と対応しており、1日には1行目が、2日には2行目が、31日には31行目がツイートするようにプログラムされている。

なので、用意できる名言が31個より少なければ、重複しても良いので増やして31個になるように調整する。逆に、現時点では31個以上用意してもツイートされないので意味が無い。この仕様はあまり良いとは思ってないので、将来的にはたくさんある候補の中からランダムで1つツイートするように改善したいところ。とりあえず今回は上記のとおり、1行分＝1日分の仕様で進める。


### Twitter認証に必要な4つのキーを挿入

上記のツイートする言葉（名言）が埋めこまれている場所のすぐ下に、Twitter認証に必要な4つのキーを挿入する以下のコードがある。行数で言うと41行目～46行目。

~~~ ruby
    Twitter.configure do |config|
      config.consumer_key       = 'メモったConsumer keyを挿入する'
      config.consumer_secret    = 'メモったConsumer secretを挿入する'
      config.oauth_token        = 'メモったTokenを挿入する'
      config.oauth_token_secret = 'メモったSecretを挿入する'
    end
~~~

シングルクォートで囲まれた文字列に書いてある通り、2ステップ目のTwitter認証でメモったそれぞれのキーを該当する場所[^5]に挿入する。ここが間違っているとTwitterに正常に投稿されない。

`tweet.rbの`上記の2点を編集し終えたら、この第3ステップは完了。


## 4. 公開

ついにステップ1～3までで制作したものを、Heroku側に送信してウェブに公開する。この第4ステップは、冒頭で紹介したHeroku解説ビデオを事前に見ておくとグッと理解が深まるので、時間に余裕があれば是非。

<cite>[Ruby on Rails向けPaaS「Heroku」って、こんな感じです（スクリーンキャスト）](http://el.jibun.atmarkit.co.jp/rails/2010/12/rubypaasheroku-.html)</cite>


### Heroku上にWebアプリを新規作成

まず、`heroku`コマンドを使って、Heroku上にWebアプリを新規作成する。Windowsの場合は、[msysGit](/2011/02/07/git-windows-msysgit-github)上での操作を推奨。ここで指定した名前が、他で使われていないものであればHerokuに登録され、それが*サブドメイン*となる。この名前（サブドメイン）は後からでも変更可能なので、とりあえず適当な名前でも大丈夫。[^6]

~~~ sh
$ heroku create chaplin
~~~

初回は、Herokuアカウントに登録したE-mailアドレスとパスワードを求められるので入力する。 正常にWebアプリを作成できると、*Git remote heroku added*と表示され、gitコマンドのremote先にHerokuが追加される。

また、すぐに<http://登録したアプリ名.heroku.com/>にアクセスできるようになり、[Herokuの管理画面](https://api.heroku.com/myapps)にも今作成した新しいWebアプリが登録される。これでHerokuでのWebアプリの新規作成が完了。


### 公開する前の準備

公開に向けて、まず利用するgemの仕様書を整える儀式を行う。`chaplin_bot`フォルダ内で以下のコマンドを実行する。

~~~ sh
$ bundle install
~~~

*Your bundle is complete!*と表示されて、`chaplin_bot`フォルダ内に`Gemfile.lock`が生成されれば準備完了。`chaplin_bot`フォルダ内がこんな配置になっていればOK

~~~ sh
.
├── .git
├── Gemfile
├── Gemfile.lock  # これが追加
├── app.rb
├── config.ru
└── tweet.rb
1 フォルダ, 5 ファイル
~~~


### Gitを使ってHerokuに送信

まず、ローカルのGitリポジトリにコミットする。

~~~ sh
$ git add .
$ git commit -m 'first commit!'
~~~

Windowsの場合は、改行コードに関する警告（CRLFをLFに変換する云々）が出るが、とりあえずスルーでOK。そしてHerokuに向けてプッシュする。つまり*ネット上に公開*する。

~~~ sh
$ git push heroku master
~~~

これだけ。ちょうかんたん。


### 手動でツイート

プッシュが完了したら、もうウェブサイトにアクセスできるので、

~~~ sh
$ heroku open
~~~

`heroku open`コマンドをすると、<http://登録したアプリ名.heroku.com/>をブラウザで開いてくれる。開いたページに*under construction*と表示されていればOK。それでブラウザのアドレス欄で、アドレスの末尾に`random_tweet`を追加して、<http://登録したアプリ名.heroku.com/random_tweet>にアクセスしてみよう。

英語の文字列がいっぱい表示されればTwitterへの発言は*成功*！  
何も表示されず真っ白なページなら*失敗*！

成功していれば、Bot用Twitterアカウントのタイムラインを見てみよう。31個の中からランダムに選択された言葉がちゃんとツイートされているはず。ちゃんとツイートされていれば、この第4ステップは完了。


## 5. 自動化

最後に、手動ではなく自動でツイートするように設定する。ここでHerokuへの*クレジットカード情報の登録*が必要になる。


### Herokuでcronアドオンを有効化

[Herokuのアドオン一覧](http://addons.heroku.com/)から、[cronアドオン](http://addons.heroku.com/cron)のページを開く。1日単位のcronなら無料で利用できるが、無料利用でもクレジットカード情報の登録が必要。というわけで、[verify your account](http://api.heroku.com/verify)のリンクをクリックして、クレジットカード番号や住所・電話番号などの情報を登録する。登録が終わって*Account verified.*となったらOK

もういちど[cronアドオンのページ](http://addons.heroku.com/cron)に行き、「Daily Cron」の方のAddボタンを押す。Herokuアプリの選択画面が出た場合は、登録したアプリ名を選択してSelectボタンを押す。実は、このSelectボタンを押してcronアドオンを追加した時の時間が、*cronが発動する時間＝自動でツイートする時間*になる。

アドオンを有効にするのは、以下のコマンドラインからも可能（クレジットカード情報の登録は別）。

~~~ sh
$ heroku addons:add cron:daily
~~~


### 手動ツイート機能を消す

動作チェックのために<http://登録したアプリ名.heroku.com/random_tweet>にアクセスしてツイートした機能を消す。`app.rb`ファイルの10行目の行頭に半角のシャープ記号を挿入してコメントアウトする。

~~~ ruby
get '/random_tweet' do
#  Tweet.new.random_tweet  # 動作チェックが終わったらコメントアウトすること
end
~~~

こうすれば、<http://登録したアプリ名.heroku.com/random_tweet>にアクセスしてもつぶやかれなくなる。真っ白なページが表示されるだけ。この機能を消す理由は、自分以外の人が上記のURLにアクセスして、Bot用Twitterにツイートされてしまう危険性を無くすため。

もし残したままにして、上記のURLを見つけた人が仮に連打したりすると、最悪の場合Bot用Twitterアカウントが凍結されてしまうこともある。


### 自動ツイート機能を追加

`chaplin_bot`フォルダに、1日1回自動で投稿するHerokuへの指示を記述する`Rakefile`ファイルを作成する。いわゆる[cronジョブ](http://ja.wikipedia.org/wiki/Crontab)。中身は以下。

~~~ ruby
require 'tweet.rb'
task :cron do
  Tweet.new.daily_tweet
end
~~~

最終的に`chaplin_bot`フォルダの構成は以下のようになる。

~~~ sh
.
├── .git
├── Gemfile
├── Gemfile.lock
├── Rakefile  # これが追加
├── app.rb
├── config.ru
└── tweet.rb
1 フォルダ, 6 ファイル
~~~


### もういちど公開

第5ステップで加えた変更点を、まずローカルのGitリポジトリにコミットする。

~~~ sh
$ git add .
$ git commit -m 'second impact!'
~~~

そしてHerokuに向けてプッシュする。

~~~ sh
$ git push heroku master
~~~

これで、さきほどcronアドオンのSelectボタンを押した時間の24時間後から、毎日cron処理（Rakefile）が走って自動でツイートされる。本当にツイートされるかどうかを確認するには、1日待ってみるしかない。果報は寝て待て。

<blockquote class="c-tweet"><p>私の最高傑作は次回作だ。</p>&mdash; チャーリー・チャップリン (@chaplin_bot) <a href="https://twitter.com/chaplin_bot/statuses/30641519614500864">January 27, 2011</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

このcronアドオンについて、さらに詳しい情報はこちらの記事を参照されたし。

<cite>[Herokuのcronを使って自動でTwitterにつぶやく](/2011/02/01/ruby-heroku-sinatra-cron-twitter-tweet)</cite>
<cite>[Herokuのタイムゾーンを日本時間に設定する](/2011/02/10/heroku-timezone-japan-jst)</cite>


### ここまでのソースコード

この時点でのchaplin\_botのソースコードを、*version 1.0*としてタグを切ったので、GitHubからダウンロード可能。

<cite>[ruedap/chaplin at 1.0 - GitHub](https://github.com/ruedap/chaplin/tree/1.0)</cite>

これで全ステップが完了。無事、1日1回名言をツイートするTwitter Botが完成。  
おつかれさまでしたー


## バージョンアップ

この記事を公開以降もTwitter Botに機能追加などを行ってバージョンアップしているので、興味のある方は以下の記事などからどぞー。

<cite>[SinatraからDataMapperを使う(1) 動作チェック用のコード](/2011/02/12/ruby-sinatra-datamapper-1-orm-sqlite)</cite>
<cite>[SinatraからDataMapperを使う(2) マイグレーションとモデルの分離](/2011/02/13/ruby-sinatra-datamapper-2-migrate-model)</cite>
<cite>[SinatraからDataMapperを使う(3) バリデーション](/2011/02/14/ruby-sinatra-datamapper-3-validation)</cite>
<cite>[SinatraからDataMapperを使う(4) シャッフルツイート機能](/2011/02/15/ruby-sinatra-datamapper-4-shuffle-tweet)</cite>
<cite>[SinatraからDataMapperを使う(5) HerokuのPostgreSQLで使う](/2011/02/16/ruby-sinatra-datamapper-5-heroku-postgresql-rakefile)</cite>


## 参考リンク

最後に、この記事を書くにあたって参考になったり、各ツールの使い方を勉強するのにとても役立ったページをまとめておく。情報を公開してくれている各ページの作者さんに感謝！


### Ruby

- [Ruby Freaks Lounge：第39回　RVM（Ruby Version Manager）による環境構築](http://gihyo.jp/dev/serial/01/ruby/0039)
- [Ruby Freaks Lounge：第40回　RVM（Ruby Version Manager）による環境構築（2）](http://gihyo.jp/dev/serial/01/ruby/0040)
- [Ruby Freaks Lounge：第23回　Rackとは何か（1）Rackの生まれた背景](http://gihyo.jp/dev/serial/01/ruby/0023)
- [Ruby Freaks Lounge：第24回　Rackとは何か（2）Rackの使い方](http://gihyo.jp/dev/serial/01/ruby/0024)
- [Ruby Freaks Lounge：第25回　Rackとは何か（3）ミドルウェアのすすめ](http://gihyo.jp/dev/serial/01/ruby/0025)
- [8分21秒で分かるRubyとOAuthによるTwitterAPIの使い方（動画）](http://d.hatena.ne.jp/mirakui/20100505/1272961897)
- [gem管理の新標準ツール"Bundler"のTips - 床のトルストイ、ゲイとするとのこと](http://d.hatena.ne.jp/mirakui/20100703/1278165723)
- [Ruby Advent Calendar jp 2010](http://cielquis.net/advent-calendar/ruby-jp-2010.html)
- [IRB　それはRubyistの魔法のランプ - hp12c](http://d.hatena.ne.jp/keyesberry/20101116/p1)


### Sinatra

- [Sinatra: README (Japanese)](http://www.sinatrarb.com/intro-jp.html)
- [Ruby Freaks Lounge：第7回　小規模Webアプリのためのフレームワーク，Sinatra](http://gihyo.jp/dev/serial/01/ruby/0007)
- [Ruby Freaks Lounge：第9回　SinatraとSequel・Hamlで掲示板アプリを作る](http://gihyo.jp/dev/serial/01/ruby/0009)
- [Ruby Freaks Lounge：第41回　Sinatra 1.0の世界にようこそ](http://gihyo.jp/dev/serial/01/ruby/0041)
- [Ruby Freaks Lounge：第42回　実世界のSinatra](http://gihyo.jp/dev/serial/01/ruby/0042)
- [Sinatra と OAuth を使って Twitter のタイムラインを取得してみた](http://www.machu.jp/diary/20090818.html#p01)
- [GoogleAppEngine + JRubyでクリスマスまでに彼女をつくる方法](http://tech.kayac.com/archive/gae-jruby-twitter-bot.html)
- [text.ssig33.com - このサイトを Sinatra で書き直した。](http://text.ssig33.com/19)
- [System.Exit &#8211; GAE で Sinatra を使って “foo” を表示する最速の方法](http://jugyo.org/blog/3760)
- [GAE + JRuby + Sinatra + Ruby Twitter GemでTwitterのBotを作成する](http://d.hatena.ne.jp/zentoo/20090928/1254156587)
- [自己流でSinatraとRSpecとWebratとCucumber使ってみた。あとDataMapperも](http://d.hatena.ne.jp/mothprog/20090706/1246897103)
- [Ruby のフレームワークSinatraとデータベースarticleGISによる小規模なアプリケーションの例](http://techknowledge.ngigroup.com/20100409/621)


### Heroku

- [Ruby on Rails向けPaaS「Heroku」って、こんな感じです（スクリーンキャスト）](http://el.jibun.atmarkit.co.jp/rails/2010/12/rubypaasheroku-.html)
- [デザイナーもHerokuを使ってみよう！Herokuを使って静的ページを無料で作る](http://kuroigamen.com/22)
- [１時間でツイッターサービスを作ろう！ \| KRAY Inc](http://kray.jp/blog/twitter_service_in_1hours/)
- [フレクト CTOのブログ: Herokuについて調べたことのまとめ](http://blog.flect.co.jp/cto/2011/01/heroku-dbdd.html)
- [Herokuコマンド - study_heroku](http://studyheroku.wiki.fc2.com/wiki/Heroku%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [HerokuにRailsアプリを上げるメモ - modkaの日記](http://d.hatena.ne.jp/modka/20101205/1291562055)
- [無料から始められるRailsのホスティングサービス「Heroku」の記事をWEB+DBに書きました](http://route477.net/d/?date=20101024)
- [Heroku を使い倒す(バックアップ編) \| つくる社LLC](http://tsukurusha.com/2010/07/heroku-%e3%82%92%e4%bd%bf%e3%81%84%e5%80%92%e3%81%99%e3%83%90%e3%83%83%e3%82%af%e3%82%a2%e3%83%83%e3%83%97%e7%b7%a8/)
- [［Heroku］タイムゾーンを設定する - func09](http://www.func09.com/wordpress/archives/951)
- [HerokuでRuby1.9とRails3を使う - それはBooks](http://hamasyou.com/archives/000348)
- [Heroku で Rack アプリケーションを動かしてみた - PB memo](http://d.hatena.ne.jp/nagachika/20101106/rack_on_heroku)
- [Rails Hub情報局: Heroku向けオートスケーリング「Hero Scale」登場](http://el.jibun.atmarkit.co.jp/rails/2010/12/herokuhero-scal.html)
- [Herokuで作るFacebookアプリ：第1回　Herokuを使ってFacebookアプリを作ろう](http://gihyo.jp/dev/serial/01/heroku/0001)


### Git

- [はじめてgitをつかったのでコマンドを復習します \| KRAY Inc](http://kray.jp/blog/review-git-commands/)
- [はじめてのgit - IDEA\*IDEA ～ 百式管理人のライフハックブログ](http://www.ideaxidea.com/archives/2008/04/git.html)
- [gitのプロジェクトホスティングサービス gituhub に挑戦（準備編）](http://kuroigamen.com/12)
- [自分のgitリポジトリに他人のリポジトリの更新部分を取り込む。](http://kuroigamen.com/16)
- [github で fork と pull request に挑戦。 - KUROIGAMEN(黒い画面)](http://kuroigamen.com/15)
- [GitHub でタグを打って tgz/zip アーカイブ をダウンロードできるようにする：Goodpic](http://www.goodpic.com/mt/archives2/2010/08/github_tgzzip.html)
- [まだ使っていない人にこれだけは伝えたいgitの便利機能 - (ﾟ∀ﾟ)o彡 sasata299's blog](http://blog.livedoor.jp/sasata299/archives/51521252.html)
- [Gitを使いこなすための20のコマンド - SourceForge.JP Magazine : オープンソースの話題満載](http://sourceforge.jp/magazine/09/03/16/0831212)
- [.gitconfigに設定してるaliasなどのまとめ - ゆろよろ日記](http://d.hatena.ne.jp/yuroyoro/20101008/1286531851)
- [git introduction, git introduction rails meeting @ tokyo yugui on USTREAM. コンピュータ](http://www.ustream.tv/recorded/746377)
    - [iwamatsu/git-study - GitHub](https://github.com/iwamatsu/git-study)
- [gitで一度行った変更をなかったことにする方法4つ - TIM Labs](http://labs.timedia.co.jp/2011/02/git-various-undo.html)


[^1]: リンク先の動画では作者オリジナルスクリプト、このエントリーではget-twitter-oauth-tokenライブラリと、使っているトークン取得スクリプトが違うものの、認証処理自体はあまり違わないので大丈夫
[^2]: リンク先の動画ではRails3、このエントリーではSinatraと、使っているフレームワークが違うものの、Heroku自体の使い方自体はあまり違わないので大丈夫
[^3]: GAEで成功していればこれは要らなかったはず…
[^4]: たとえば別のサーバーやPCにcronジョブを仕込んでおいて、そこからHerokuアプリのツイート用URLを叩くとか
[^5]: シングルクォートで囲まれた内側
[^6]: この例での“chaplin”は既に使用されているので、他のフレーズを入力してください
[^7]: 自分の環境では「Y」を選んでSSH鍵の生成をしたらエラーが表示されたので「n」で自分で作る手順を選んだ
