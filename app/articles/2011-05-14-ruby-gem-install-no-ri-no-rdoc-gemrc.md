---
layout: article
title: "<span>RubyGemsでgemのインストール時に</span>--no-ri --no-rdocをデフォルトにする"
date: 2011-05-14
comments: true
categories: ruby
tags: ruby
published: true
---

Rubyでgemをインストールするときに、ドキュメントをインストールしないオプション`--no-ri --no-rdoc`をデフォルトで付けるようにする方法について。毎回手動でオプションを指定してたんだけど、忘れてしまうことが多くて、忘れた場合は実行した後にドキュメントのインストールが始まって気づくことになり*ウボァ*となる。これを忘れるとインストール時間が倍くらいになるので、個人的には常に付けたい。

[DHHもこのオプションをデフォルトにしようと言ってるみたい](https://github.com/rubygems/rubygems/pull/42)。最近のRubyGemsではデフォルトになったりしてるのかな？ 自分の使ってるRubyGemsはちょっと古いヤツ（1.6.2とか）なので、まだデフォルトにはなっていない。

<!-- READMORE -->


## .gemrcを作成して、デフォルトで\--no-ri \--no-rdoc

以下の内容を記述した`.gemrc`ファイルを作成し、ホームディレクトリに配置する。

~~~ ruby
gem: --no-ri --no-rdoc
~~~

Windowsの場合は、デフォルトの状態ではそれぞれ以下の位置に配置すればおｋ

- Windows XP: `C:\Documents and Settings\ユーザー名\.gemrc`
- Windows VISTA/7: `C:\Users\ユーザー名\.gemrc`

これだけで、通常使う`gem install`や`gem update`コマンドに、デフォルトで`--no-ri --no-rdoc`オプションが付くようになる。


## Bundlerの場合

Bundlerで`bundle install`を使った場合は、どうなんだろう？ ちょっとだけ調べてみたけどよくわからなかった。ちなみに自分がよく使う、プロジェクトディレクトリに該当するgemをインストールするオプション付きだと、

~~~ sh
$ bundle install --path vendor/bundle
~~~

これによって生成される以下のパスの`doc`フォルダの中は空っぽ。

~~~ sh
./vendor/bundle/ruby/1.8/doc
~~~

これは、前述の`.gemrc`を作っていてもいなくても、空っぽなので、Bundlerデフォルトで`--no-ri --no-rdoc`的な動作をするのかなぁと思ったけど実際はどうなんだろう。

* * *

<cite>[gemのインストール時に\--no-ri \--no-rdocをフォルトにする方法](http://memo.yomukaku.net/entries/226)</cite>
<cite>[~/.gemrcの作成場所は？ - babydaemonsの日記](http://d.hatena.ne.jp/babydaemons/20090916/1253078929)</cite>
