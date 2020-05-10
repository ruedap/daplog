# PowをSinatraアプリで使う

先日37signalsが公開したMac OS X専用の開発環境用Rackサーバー[Pow](http://pow.cx/)について、[この記事](http://d.hatena.ne.jp/marutanm/20110418/p1)の導入解説がわかりやすかったので自分もインストールして使ってみた。自分の場合、主にSinatraを使うので、Sinatraでサンプルを作って複数のアプリを同時に動かしてみた。

<!-- READMORE -->


## nvmのインストール

Powを使用するにはNode.jsが必要になるので、Rubyで言うところのrvmに相当するバージョン管理ツール[nvm](https://github.com/creationix/nvm)を使ってNode.jsをインストールする。nvmのインストール方法は[こちらの記事](http://blog.summerwind.jp/archives/1464)を参考にした。

~~~ sh
$ git clone git://github.com/creationix/nvm.git ~/.node
$ . ~/.node/nvm.sh
$ nvm install v0.4.5
$ nvm use v0.4.5
$ node -v
~~~

`.bashrc`に以下の一行を追加して、bash起動時に自動実行するようにしておく。

~~~ sh
# nvm
. ~/.node/nvm.sh
~~~

あと、nvmで*デフォルトで使用するバージョン*を決めておく。これを指定しておけば、bashを起動したときにこのバージョンが自動で選択される。rvmでの`rvm use 1.8.7 --default`に相当するもの。

~~~ sh
$ nvm alias default v0.4.5
~~~


## Powのインストール

Pow自体のインストールは下記の1行で完了する。途中でパスワード入力を求められて、あとなんかの許可も求められた。インストールされたPowのバージョンは0.2.2だった。

~~~ sh
$ curl get.pow.cx | sh
~~~

インストールが完了すると、ホームディレクトリに`.pow`フォルダが出来上がっているので、ここでアプリを登録したりするんだけど、そのまえにまずは*Macを再起動*する。環境によっては再起動なしでもいいみたいだけど、自分の場合は再起動しないとダメだった。


## Sinatraアプリの作成

とりあえずSinatraアプリを2つ作る。アプリを作る場所はどこでもいいけど、今回の例では以下のパスに作った。

~~~ sh
~/Projects/Test/sinatra1/
~/Projects/Test/sinatra2/
~~~

サンプルのSinatraアプリは、`rackup`するための`config.ru`と、

~~~ ruby
require 'rubygems'
require 'sinatra'
require './app.rb'
run Sinatra::Application
~~~

アプリ本体となる`app.rb`を作る。

~~~ ruby
get '/' do
  'sinatra1' # sinatra2のフォルダの方は2にする
end
~~~

これでいつもなら、`$ rackup`としてアプリを起動するわけだけど、今回は違う。


## アプリの登録

Powで起動させておきたいアプリに、`~/.pow`のフォルダからのシンボリックリンクを張る。Macでのシンボリックリンクの作成については以前[この記事](/2011/03/01/vim-vimrc-vimperator-dropbox-windows-mac-share)で触れた。

~~~ sh
$ cd ~/.pow
$ ln -s ~/Projects/Test/sinatra1
~~~

これで<http://sinatra1.dev/>にアクセスすると「sinatra1」と表示される。すばらし。ここまでだと、普通にsinatra1フォルダで`rackup`するのとあまり違いはないのだけど、さきほど作ったsinatra2の方も追加して、Powの簡単さを実感してみる。

~~~ sh
$ cd ~/.pow
$ ln -s ~/Projects/Test/sinatra2
~~~

これで<http://sinatra2.dev/>にアクセスすると「sinatra2」と表示される。すばらし。


## アプリの再起動

起動している状態で*アプリのコードを書き換えたらどうなるか*を試してみた。予想では、`app.rb`本体のファイル書き換えは自動では書き換わらないと思った。なぜなら`rackup`した場合がそうだから。`app.rb`を以下のように書き換えてみる。

~~~ ruby
get '/' do
  'sinatra1, yay!'
end
~~~

んで<http://sinatra1.dev/>をリロードしてみる。結果は「sinatra1」のままで書き換わってない。予想通り。んじゃどうやって再起動するのか、と思ったら、ちょっと変わった方法で再起動するみたい。Passengerもこの方法らしいんだけど、使ったこと無いのでしらなかった。プロジェクトディレクトリ直下に`tmp`フォルダを作り、その中に`restart.txt`のファイルを作成する。

~~~ sh
$ touch tmp/restart.txt
~~~

そうすると、Powはそのファイルの有無と*タイムスタンプをチェック*して再起動すべきかどうかを判定するらしい。実際に上記ファイルを作成後に<http://sinatra1.dev/>をリロードしてみると、表示が「sinatra1, yay!」に書き換わってた。yay!

でもこれ、コードを修正するたびに手動でやってたら面倒なので、Shotgunのようなファイルに変更が加わったら自動でリロードするモードが欲しい。

<ins>[@june29](http://twitter.com/june29)さんに[watchr](http://d.hatena.ne.jp/secondlife/20110121/1295609110)で自動リロードする方法（後述）を教えてもらいました。あざっす!</ins>


## ドメイン名の変更

「http://ドメイン名.dev」のドメイン名部分は、一見プロジェクトのフォルダ名が使われているように見えるけど、<span style="font-weight:bold;">シンボリックリンクの名前</span>に依存しているだけっぽいので簡単に変更が可能。シンボリックリンクを作成する時、もしくは、作成後にそのシンボリックリンク名を変えてあげればいいだけなので、試しに前述のsinatra2アプリ用のシンボリックリンクの名前を「rails3」に変えてみる。

~~~ sh
$ mv sinatra2 rails3
~~~

これで、前述のsinatra2アプリは<http://sinatra2.dev/>では繋がらなくなって、<http://rails3.dev/>でつながるようになる。すばらしい。新規に作る場合は、こんな感じでシンボリックリンク名を指定する。一気に3つ作ってみる。

~~~ sh
$ ln -s ~/Projects/Test/sinatra1 hoge
$ ln -s ~/Projects/Test/sinatra1 fuga
$ ln -s ~/Projects/Test/sinatra1 piyo
~~~

というわけで、同じアプリに違うドメイン名を複数つけることは可能。あと、「.dev」のトップレベルドメイン部分を変えてみたいと思ったけど、変える方法がわからなかった。簡単にできたりするのかな？


## その他のポイント

- サブドメインを設定して違うアプリに割り当てることが可能（やってないけど）
- 1アプリ当たり、最大2ワーカーが起動し、15分間アクセスがないとアプリを終了
- アプリのディレクトリに`.rvmrc`を作って`rvm 1.8.7`とか書くと、そこで指定したRubyを使用できる
- Powのアクセスログやアプリのログは、`~/Library/Logs/Pow`配下に作成される
- `.powrc`というファイルで、Pow全体での共通設定を記述できる


## watchrを使って自動リロードする

[@june29](http://twitter.com/june29)さんに[watchr](http://d.hatena.ne.jp/secondlife/20110121/1295609110)を使って自動リロードする方法を教えてもらったのでその手順を追記。まず、watchrのgemをインストールしておく。

~~~ sh
$ gem install watchr
~~~

次に、プロジェクトディレクトリ直下に`restart.watchr`などのファイル名（任意）でファイルを作成し、以下のRubyスクリプトを記述する。監視する対象はワイルドカードなどを使って複数も可能。

~~~ ruby
watch('app.rb') { system('touch tmp/restart.txt') }
~~~

最後に、ターミナルからさきほど作成したwatchrを起動してファイルを監視しておく

~~~ sh
$ watchr restart.watchr
~~~

この状態で`app.rb`を編集して保存すれば、自動で`touch tmp/restart.txt`が実行されるので、<http://hoge.dev/>にアクセスすればアプリを再起動後の状態で閲覧できるようになる。すばらし。

---

<cite>[Rackアプリ開発するならPowはもう常識だよね～ - Meltdown Countdown](http://d.hatena.ne.jp/marutanm/20110418/p1)</cite>
<cite>[Rails Hub情報局: Node.js＋CoffeeScriptで書かれた「Pow」がカッコ良すぎる件](http://el.jibun.atmarkit.co.jp/rails/2011/04/powrails-1d0e.html)</cite>
<cite>[powを使ってdevelopment環境で複数のrailsアプリを同時に動かす](http://memo.yomukaku.net/entries/261)</cite>
