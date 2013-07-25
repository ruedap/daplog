---
layout: article
title: "<span>RubyのRMagickで</span><span>画像をリサイズする</span>"
date: 2011-03-21
comments: true
categories: ruby
tags: ruby
published: true
---

[前回の記事](/2011/03/20/mac-ruby-imagemagick-rmagick-install)でImageMagickとRMagickのインストールができたので、実際にRMagickを使って画像をリサイズしてみた。

<!-- READMORE -->

## 基本形

リサイズの基本形はこんな感じ。*比率*によるリサイズと、*縦横のピクセル指定*のリサイズが、同じメソッドの引数の違いで使える。

~~~ ruby
require 'rubygems'
require 'RMagick'
scale  = 0.3
width  = 160
height = 120
# 対象の画像ファイルの読み込み
original = Magick::Image.read('target.jpg').first
# 比率でリサイズ
image = original.resize(scale)
image.write('resize1.png')  #=> 元画像の縦横30%のサイズに
# 縦・横のピクセルを指定してリサイズ
image = original.resize(width, height)
image.write('resize2.gif')  #=> 横160×縦120のサイズに
~~~

保存できる画像フォーマットは、拡張子をそれっぽいのにすればいけるみたい。少なくとも、PNG、GIF、JPEGは拡張子の変更だけで作成可能なことを確認した。


## 用途に応じた4つのリサイズメソッド

リサイズを行うメソッドには、[resize](http://studio.imagemagick.org/RMagick/doc/image3.html#resize)を基本に、[scale](http://studio.imagemagick.org/RMagick/doc/image3.html#scale)、[thumbnail](http://studio.imagemagick.org/RMagick/doc/image3.html#thumbnail)、[sample](http://studio.imagemagick.org/RMagick/doc/image3.html#sample)の4つがある。それぞれ特性が違うので、用途に応じて使い分けると良いらしい。各メソッドのコメントに入れてある説明文は[こちらの記事](http://gihyo.jp/dev/serial/01/ruby/0026)を参考にさせてもらった。

~~~ ruby
# resizeメソッド
# リサイズの基本となるメソッド。画質は良いが、ファイルサイズも大きくなりがち
image = original.resize(scale)
image.write('resize.png')
# scaleメソッド
# resizeメソッドよりも画質がやや悪くファイルサイズはやや小さくなる傾向
image = original.scale(scale)
image.write('scale.png')
# thumbnailメソッド
# 本来元画像の10％より小さい画像を作るためのメソッドで、ファイルサイズは大きいが実行速度が速い
image = original.thumbnail(scale)
image.write('thumbnail.png')
# sampleメソッド
# リサイズ時に中間色を一切作らないため，実行速度は速くファイルサイズも小さくなるが、この中で最も画質を犠牲にする
image = original.sample(scale)
image.write('sample.png')
~~~


## 4つを試してみた

4つのメソッドを実際に試してみた。リサイズ対象の元画像として使用したのは、ネットから拾ってきた壁紙で、イラスト、風景写真、人物写真の3種類。元画像はすべてJPEGで、横幅がだいたい1000px、1500px、2000pxのものを30%の比率にリサイズ（上のコードと同じ）して、PNGとJPEGに保存した。

画質は主観になるけど、sampleメソッドはまず使うことはないだろうと思えるくらい汚い。それ以外の3つは大差ない感じに見えた。んでそれぞれのファイルサイズの結果は以下。すべてにおいて、scaleメソッドがファイルサイズ最小値となった。

|変換対象|resize|scale|thumbnail|sample|
|:-|-:|-:|-:|-:|
|イラスト→PNG|229KB|217KB|258KB|229KB|
|イラスト→JPEG|37KB|33KB|37KB|37KB|
|風景写真→PNG|123KB|119KB|139KB|131KB|
|風景写真→JPEG|53KB|49KB|53KB|61KB|
|人物写真→PNG|139KB|131KB|156KB|147KB|
|人物写真→JPEG|86KB|82KB|86KB|98KB|

これらの結果から、個人的には、*実行速度よりファイルサイズを小さくしたい*ときはscaleメソッドを、名前のとおり*速度を重視したサムネイル画像*を作るならthumbnailメソッドを使うのが良いかなぁと思った。

* * *

<cite>[Ruby Freaks Lounge：第26回　RMagickを用いた画像処理（1）リサイズ](http://gihyo.jp/dev/serial/01/ruby/0026)</cite>
<cite>[RMagick 2.12.0 User's Guide and Reference](http://studio.imagemagick.org/RMagick/doc/)</cite>
