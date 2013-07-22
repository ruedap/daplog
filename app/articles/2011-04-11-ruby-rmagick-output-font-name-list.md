---
layout: article
title: "RMagickで使用可能なフォント名の一覧を出力する"
date: 2011-04-11
comments: true
categories: ruby
tags: ruby
published: true
---

RMagickで使用可能なフォントの一覧を取得して、出力するスクリプトを備忘録。利用する環境でどんなフォントが使えるのか調べるのに使える。

<!-- READMORE -->


## コマンドプロンプトにフォント名の一覧を出力

コマンドプロンプトやターミナルにフォント名の一覧を出力する。Windowsだと、日本語フォント名でコケたりするので、その時は`puts`を`p`にして回避する。フォント名の途中が日本語の時は大丈夫だけど、1文字目が日本語だとコケるっぽいかな。

~~~ ruby
require 'rubygems'
require 'RMagick'
Magick.fonts.each do |font|
  puts font.name
end
~~~


## テキストファイルにフォント名の一覧を出力

環境によってはインストールされたフォントの数が多い場合があって、端末上に出力するとスクロールしきれなかったりするので、テキストファイルなどに出力したほうが扱いやすいかも。あと上述の日本語フォント名でコケたりもしなかった。

~~~ ruby
require 'rubygems'
require 'RMagick'
open('font_list.txt', 'w') do |f|
  Magick.fonts.each do |font|
    f.puts font.name
  end
end
~~~


* * *

<cite>[利用可能なフォントの一覧を取得する。 - うなの日記](http://d.hatena.ne.jp/unageanu/20090903/1251986179)</cite>
