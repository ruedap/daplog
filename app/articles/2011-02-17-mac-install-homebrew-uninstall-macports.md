---
layout: article
title: "<span>Homebrewをインストールして</span>MacPortsをアンインストールする"
date: 2011-02-17
comments: true
categories: mac
tags: mac
published: true
---

ちょっと前から時々[Homebrew](http://mxcl.github.com/homebrew/)の名前を見かけていて、MacPortsより速くインストールできるとか、Ruby製だとかで気になってた。ので、HomebrewをインストールしてMacPortsをアンインストールしてみた。

<!-- READMORE -->


## Homebrewのインストール

Xcodeがインストールされていることが前提。入ってなければインストールする。

<cite>[Homebrew ― MacPorts driving you to drink? Try Homebrew!](http://mxcl.github.com/homebrew/)</cite>

なお、Mac OS Xをクリーンインストールしたばかりの状態だと、`/usr/local`のフォルダが存在しないので、先に作っておく。

~~~ sh
$ sudo mkdir /usr/local
~~~

Xcodeが入っている状態で、以下のコマンドでHomebrewをインストールする。

~~~ sh
/usr/bin/ruby -e "$(curl -fsSL [https://raw.github.com/gist/323731](https://raw.github.com/gist/323731))"
~~~

最後に、`/usr/bin`より`/usr/local/bin` （こちらにHomebrew経由でインストールされる）を優先するために、`~/.bashrc`に以下を追加する。

~~~ sh
export PATH=/usr/local/bin:$PATH
~~~


## Homebrewの基本


### Formula

インストールできるパッケージ用のレシピ（Rubyスクリプト）のことを*Formula*と呼ぶらしい。
最初「フォーミュラってF1の？」と思ったけど、辞書で調べると「調合法」や「処方箋」などの意味があるみたい。それを知ってなんか納得。


### 基本コマンド

とりあえず、これくらいのコマンドを覚えれば、普通に使う分には事足りそう。RubyGemsやRVMに似たわかりやすいコマンドでうれしい。

|`brew search [hoge]`|文字列の部分マッチでFormulaを検索|
|`brew search [/hoge/]`|正規表現のマッチでFormulaを検索|
|`brew install [formula]`|指定したFormulaをインストール|
|`brew remove [formula]`|指定したFormulaをアンインストール|
|`brew list`|インストール済みのFormulaをすべて表示|
|`brew info [formula]`|インストール済みのFormulaの詳細情報を表示|
|`brew update`|Gitを利用してHomebrewおよびインストール済みFormulaのアップデート|
|`brew cleanup [formula]`|すべての古いバージョンのFormulaを削除。Formulaを指定した場合、そのFormulaに対してのみ|

さらに詳しいコマンドやFormulaレシピの作り方については、以下のページが詳しい。

<cite>[KOSHIGOE学習帳 - Homebrew 使い方メモ](http://w.koshigoe.jp/study/?%5Bsystem%5D%5Bosx%5D+Homebrew+%BB%C8%A4%A4%CA%FD%A5%E1%A5%E2)</cite>


## MacPortsのアンインストール

インストールしたHomebrewを使おうとすると「MacPortsをアンインストールしたほうがいいよ」的なことを言われるので、[このページ](http://guide.macports.org/chunked/installing.macports.uninstalling.html)を参考にMacPortsをアンインストールする。*なんか色々問題が出そうな気がする*けど、まぁやってみる。

~~~ sh
$ sudo port -f uninstall installed
~~~

MacPortsでインストールしたパッケージもアンインストールする。

~~~ sh
$ sudo rm -rf \
    /opt/local \
    /Applications/DarwinPorts \
    /Applications/MacPorts \
    /Library/LaunchDaemons/org.macports.* \
    /Library/Receipts/DarwinPorts*.pkg \
    /Library/Receipts/MacPorts*.pkg \
    /Library/StartupItems/DarwinPortsStartup \
    /Library/Tcl/darwinports1.0 \
    /Library/Tcl/macports1.0 \
    ~/.macports
~~~


## Homebrewを使ってインストール

MacPortsを消したので、今まで使っていたパッケージも消えた。から、Homebrewを使ってとりあえず必要そうなパッケージを適当にインストールする。GitはHomebrewのアップデートとかに使われるので、まず最初に入れておくと良いっぽい。

~~~ sh
$ brew install git
$ brew install curl
$ brew install tree wget w3m
$ brew install mysql
~~~


### readline

Ruby 1.8.7のirbで日本語入力するときに必要なreadlineは、ただインストールするだけではダメで、その後に`link`コマンドを実行しないといけないらしい。[こちら](http://d.hatena.ne.jp/raydive/20100925/1285414097)を参考にした。

~~~ sh
$ brew install readline
$ brea link readline
~~~


### PostgreSQL

PostgreSQLは普通にインストールしようとしたら、以下のようなエラーが出て失敗した。

~~~ sh
$ brew install postgresql
==> Downloading ftp://ftp.ossp.org/pkg/lib/uuid/uuid-1.6.2.tar.gz
curl: (7) couldn't connect to host
Error: Failure while executing: /usr/bin/curl -f#LA 'Homebrew 0.7.1 (Ruby 1.8.7-174; Mac OS X 10.6.6)' ftp://ftp.ossp.org/pkg/lib/uuid/uuid-1.6.2.tar.gz -o /Users/ruedap/Library/Caches/Homebrew/ossp-uuid-1.6.2.tar.gz
~~~

で色々ネットを探しまわって、以下の方法で解決できた。

<cite>[problem installing postgresql \| Quick Archive Test](http://librelist.com/browser//homebrew/2010/11/24/problem-installing-postgresql/#766ae6275cad61ebf041ff82064f06d1)</cite>

`curl`でローカルにMacPorts用のuuidをコピーしてからやるとうまくいくっぽい。よくわからんけど、たしかにうまくいった。

~~~ sh
$ curl [http://aarnet.au.distfiles.macports.org/pub/macports/mpdistfiles/ossp-uuid/uuid-1.6.2.tar.gz](http://aarnet.au.distfiles.macports.org/pub/macports/mpdistfiles/ossp-uuid/uuid-1.6.2.tar.gz) -o $HOME/Library/Caches/Homebrew/ossp-uuid-1.6.2.tar.gz
$ brew install postgresql
==> Downloading ftp://ftp.ossp.org/pkg/lib/uuid/uuid-1.6.2.tar.gz
File already downloaded and cached to /Users/ruedap/Library/Caches/Homebrew
（以下略）
~~~

今のところインストールしたのは上記だけなので、さほど違いはわからないけど、少なくともSQLの2つはうろ覚えのMacPortsよりはインストール時間が短かった気がする。

* * *

<cite>[MacPortsからHomebrewに移行しつつある | tech.portalshit.net - CakePHP, Rails, JavaScript](http://tech.portalshit.net/2010/08/31/macports-is-deprecated/)</cite>
<cite>[Webデザイナーの為の「本当は怖くない」”黒い画面”入門 Part.06 \| FJORD, LLC](http://fjord.jp/love/622.html)</cite>
<cite>[PostgreSQL 9.0.2のインストール(Mac OS X 10.6 Snow Leopard) - komagata ［p0t］](http://docs.komagata.org/4706)</cite>
<cite>[Macでhomebrewをアンインストールする - foldrrの日記](http://d.hatena.ne.jp/foldrr/20110807/p1)</cite>
