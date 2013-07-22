---
layout: article
title: "<span>複数のRuby環境を共存させられる</span>RVM(Ruby Version Manager)を使う"
date: 2011-01-12
comments: true
categories: ruby
tags: ruby
published: true
---

MacのSnow Leopardにデフォルトで入っているRubyは、irbで日本語を入力できない。

~~~ sh
$ irb
> puts "こんにちは、世界"  # こんなふうに日本語を入力できない
~~~

なので、普通にRuby 1.8.7をインストールしなおして、irbで日本語が通るようにしたかっただけなんだけど、なんか最初から入ってるのとは別のところにインストールされたりして、面倒なことになりそうだったので、複数のRuby環境を共存させられる[RVM](http://rvm.beginrescueend.com/)を試してみることに。結果、大正解。Ruby環境だけでなく、gem環境も簡単に切り替えられる。

<!-- READMORE -->


## RVMのインストール

まずはMacPortsからreadlineをインストールする。irbで日本語を入力するために必要らしい。何をするものかはよく知らない。

~~~ sh
$ sudo port selfupdate
$ sudo port install readline
~~~

続いてgit-coreとcurlをインストールする。RVMをインストールするのに必要。

~~~ sh
$ sudo port install git-core
$ sudo port install curl
~~~

以上は既に入っていればもちろん不要。本命のRVMのインストール。

~~~ sh
$ bash < <( curl [http://rvm.beginrescueend.com/releases/rvm-install-head](http://rvm.beginrescueend.com/releases/rvm-install-head) )
~~~

でインストール完了。ホームディレクトリに.rvmというディレクトリが作成される。次に`.bashrc`に`rvm`コマンドが使えるように設定する。

~~~ sh
if [[ -s ~/.rvm/scripts/rvm ]] ; then source ~/.rvm/scripts/rvm ; fi
~~~

そんでターミナルでその設定を反映させる。

~~~ sh
$ source ~/.bashrc
$ rvm -v
~~~

`rvm -v`して、RVMのバージョンが表示されれば、RVMを使う準備完了。


## RVMを使って複数のRubyをインストール

インストール可能なRubyのバージョン一覧を見るには次のコマンドを実行する。

~~~ sh
$ rvm list known
~~~

こんなにたくさんのRubyをインストールできるらしい。

~~~ sh
# MRI Rubies
[ruby-]1.8.6[-p399]
[ruby-]1.8.6-head
[ruby-]1.8.7[-p302]
[ruby-]1.8.7-head
[ruby-]1.9.1-p243
[ruby-]1.9.1[-p376]
[ruby-]1.9.1-p429
[ruby-]1.9.1-head
[ruby-]1.9.2-preview1
[ruby-]1.9.2-preview3
[ruby-]1.9.2-rc1
[ruby-]1.9.2-rc2
[ruby-]1.9.2[-p0]
[ruby-]1.9.2-head
ruby-head
# JRuby
jruby-1.2.0
jruby-1.3.1
jruby-1.4.0
jruby-1.5.1
jruby[-1.5.2]
jruby-head
# Rubinius
rbx[-1.0.1]
rbx-head
# Ruby Enterprise Edition
ree-1.8.6
ree[-1.8.7]
ree-1.8.6-head
ree-1.8.7-head
# MagLev
maglev[-24209]
maglev-head
# Shyouhei head, the default mput
mput[-head]
# Mac OS X Snow Leopard Only
macruby[-nightly] # the default macruby
macruby-head      # Build from the macruby git repository
# IronRuby -- Not implemented yet.
ironruby-0.9.3
ironruby-1.0-rc2
ironruby-head
~~~

今回はMRIなRuby 1.8.7と1.9.2をインストールしてみる。とりあえず、readlineのインストール場所を確認（デフォルトでは`/opt/local`）。

~~~ sh
$ port contents readline
~~~

`/opt/local/～`なそれっぽいパスがいっぱい表示されたらたぶんおｋ。Ruby 1.8.7のインストール。1.8系はirbで日本語入力できるようにするためには、Rubyをインストールする際に、readlineのパスを指定する必要がある。

~~~ sh
$ rvm install 1.8.7 -C --with-readline-dir=/opt/local
~~~

Ruby 1.9.2のインストール。1.9系はreadlineがらみのオプションは不要っぽい。

~~~ sh
$ rvm install 1.9.2
~~~

これで1.8.7と1.9.2のインストールは完了。


## RVMでインストールしたRubyを使う

RVMでローカルにインストールされているRubyのバージョン一覧を見るコマンド。

~~~ sh
$ rvm list
~~~

使用するRubyのバージョンを変更するには`use`コマンドを使う。

~~~ sh
$ rvm use 1.8.7
~~~

ターミナルを別タブで開いたりMacを再起動すると、Rubyのバージョンが元に戻ってしまうので、`--default`オプションで常に使用するバージョンを指定する。

~~~ sh
$ rvm use 1.8.7 --default
~~~


## RVMでインストールしたRubyを削除する

`remove`コマンドを使って削除する。

~~~ sh
$ rvm remove 1.8.7
~~~


## RVM自体を最新版にアップデートする

`update`コマンドを使う。

~~~ sh
$ rvm update --head
$ rvm reload
~~~

RVMを使う上での注意点は、gemのインストールではsudoを付けないこと。ホームディレクトリの`.rvm`配下にインストールされるのでsuはいらない。

gemsetの切り替えも使うと便利で、同じバージョンのRubyでRails環境をバージョン2と3でわける、なんてことも簡単にできる。すてき。Rubyの1.8/1.9系、Railsの2.x/3.x系はちょうど過度期でどっちの環境も触ってみたいので自分には最適なツールだった。

* * *

<cite>[rvm: 複数のRubyを共存させる最新のやり方 - 床のトルストイ、ゲイとするとのこと](http://d.hatena.ne.jp/mirakui/20100502/1272849327)</cite>
<cite>[Ruby Freaks Lounge：第39回　RVM（Ruby Version Manager）による環境構築](http://gihyo.jp/dev/serial/01/ruby/0039)</cite>
