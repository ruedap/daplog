---
layout: article
title: "WindowsでImageMagickとRMagickをインストールする"
date: 2011-04-09
comments: true
categories: ruby
tags: ruby
published: true
---

WindowsでImageMagickとRMagickをセットアップするのは、[Macの時](/2011/03/20/mac-ruby-imagemagick-rmagick-install)ほど簡単では無い模様。最初はとりあえず、普通にImageMagickの公式サイトから、[最新のWindows用バイナリ](http://www.imagemagick.org/script/binary-releases.php?ImageMagick=5nioftjq617mksng50o7so6an4#windows)を落としてきてインストールして、`gem install rmagick`してみたらエラーが出て失敗した。なのでググッて調べて、若干古いもののRuby 1.8.6用としてImageMagickとRMagickのセットで公開されているファイルを[RubyForge](http://rubyforge.org/frs/?group_id=12&release_id=39888)からダウンロードしてインストールしてみたら、いちおううまくいったっぽい。このバージョンのImageMagickとRmagickを試した環境は以下の2つ。

- Windows 7 64bit + Ruby 1.8.7 p334 (i386-mingw32)
- Windows XP 32bit + Ruby 1.8.7 p302 (i386-mingw32)

<!-- READMORE -->


## RMagickとImageMagickのインストール

2009年10月に公開されたRuby 1.8.6用のImageMagickとRMagickの組み合わせ[RMagick-2.12.0-ImageMagick-6.5.6-8-Q8.zip](http://rubyforge.org/frs/download.php/64917/RMagick-2.12.0-ImageMagick-6.5.6-8-Q8.zip)をRubyForgeからダウンロードする。で、解凍して出てくるImageMagickのインストーラーを「管理者として実行」して、すべてデフォルトの設定のままでNextボタンを押し、インストール完了後にシステム環境変数のパスを反映させるためにWindowsを再起動する。Windowsを再起動後、コマンドプロンプトからローカルにあるRMagickのgemファイルをインストールする。

~~~ sh
$ gem install rmagick-2.12.0-x86-mswin32.gem --local
Successfully installed rmagick-2.12.0-x86-mswin32
1 gem installed
~~~

~~~ sh
$ gem list rmagick
###  LOCAL GEMS ***

rmagick (2.12.0 mswin32)
~~~

おや、mswin32版だ。

## mingw32とmswin32なのに動いてる…？

上述のとおりRubyはmingw32版で、先ほどインストールしたRMagickのgemファイルはmswin32版、なので何か問題がありそうな気がするんだけど、実際にRMagickを使うスクリプトを適当に動かしてみたが、今のところ正常に動いてるっぽい？ というか、RMagickに限らずgemのほうにmingw32版のものってあったりするのかな？ 今まであんまり意識してなかった。少なくとも、以下の2つの記事で行っているリサイズやクロッピング、フォーマットの変換などはこのRMagickで行えることを確認した。

<cite>[RubyのRMagickで画像をリサイズする](/2011/03/21/ruby-rmagick-imagemagick-resize-scale-thumbnail-sample)</cite>
<cite>[RubyのRMagickで縦横比固定でリサイズしたり切り抜いたり](/2011/03/22/ruby-rmagick-imagemagick-resize-crop)</cite>

ちょっと試した程度だけど、今のところエラーが出たり、落ちたりはしていない。何か問題が出たら追記しようと思う。

* * *

<cite>[Ruby 用の RMagick のインストール](http://www.kkaneko.com/rinkou/ruby/rmagickinstall.html)</cite>
