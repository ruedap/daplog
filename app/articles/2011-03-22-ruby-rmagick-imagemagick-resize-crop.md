---
layout: article
title: "<span>RubyのRMagickで</span><span>縦横比固定でリサイズしたり切り抜いたり</span>"
date: 2011-03-22
comments: true
categories: ruby
tags: ruby
published: true
---

今回も[前回](/2011/03/21/ruby-rmagick-imagemagick-resize-scale-thumbnail-sample)に引き続き、[この記事](http://gihyo.jp/dev/serial/01/ruby/0026?page=2)を参考にRMagickでリサイズや切り抜きをしてみる。

<!-- READMORE -->

## 縦横比固定でリサイズ

縦横比固定でリサイズする場合は、[resize\_to\_fit](http://studio.imagemagick.org/RMagick/doc/image3.html#resize_to_fit)メソッドを使う。縦か横のどちらか小さい方のサイズでリサイズされる。残ったもう一方は、比率を保ったままリサイズされる。

~~~ ruby
require 'rubygems'
require 'RMagick'
# 元画像の画像サイズは1024x768
original = Magick::Image.read('target.jpg').first
image = original.resize_to_fit(1024, 120)
image.write('resize_to_fit1.jpg')  #=> 160x120にリサイズされる
image = original.resize_to_fit(120, 768)
image.write('resize_to_fit2.jpg')  #=> 120x90にリサイズされる
~~~


## 画像の一部を切り抜く

画像の一部を切り抜く場合は、[crop](http://studio.imagemagick.org/RMagick/doc/image1.html#crop)メソッドを使う。デフォルトでは左上が起点となるが、定数を使うことで起点を上下左右中央の組み合わせによる9ヶ所どれかを指定できる。また、定数による起点を利用した場合、その起点からの*widthやheightは起点の進行方向*になるので注意。さらに、X座標とY座標を指定することで、定数による起点からさらに起点を移動させることができる。

~~~ ruby
# 元画像の画像サイズは1024x768
original = Magick::Image.read('target.jpg').first
image = original.crop(500, 200, 300, 100)
image.write('crop1.jpg')  #=> 画像左上を起点としてx:500, y:200の位置からwidth:300, height:100のサイズで切り取り
image = original.crop(Magick::SouthEastGravity, 1024, 768)
image.write('crop2.jpg')  #=> 画像右下を起点としてwidth:1024, height:768のサイズで切り取り＝元画像と同じサイズ
image = original.crop(Magick::CenterGravity, 90, -250, 100, 100)
image.write('crop3.jpg')  #=> 画像中央を起点としてx:90, y:-250の位置を中央としてwidth:100, height:100のサイズで切り取り
~~~


## 縦横比固定でリサイズしつつ、画像の一部を切り抜く

縦横比固定でリサイズしつつ、画像の一部を切り抜く場合は、上記2つのメソッドを連携させてもいいんだけど、お手軽にやりたい場合は[resize\_to\_fill](http://studio.imagemagick.org/RMagick/doc/image3.html#resize_to_fill)メソッドを使う。起点を指定する定数は、cropメソッドの時と引数の順番が違うので注意。

~~~ ruby
# 元画像の画像サイズは1024x768
original = Magick::Image.read('target.jpg').first
image = original.resize_to_fill(300, 300)
image.write('resize_to_fill1.jpg')  #=> 高さ300でリサイズし、中央を起点に幅300で切り取り
image = original.resize_to_fill(500, 300, Magick::NorthWestGravity)
image.write('resize_to_fill2.jpg')  #=> 幅500でリサイズし、左上を起点に高さ300で切り取り
~~~


* * *

<cite>[Ruby Freaks Lounge：第26回　RMagickを用いた画像処理（1）リサイズ](http://gihyo.jp/dev/serial/01/ruby/0026?page=2)</cite>
