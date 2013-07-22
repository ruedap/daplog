---
layout: article
title: "<span>HerokuでSinatraを使って</span><span>RMagickの使用可能フォント名を出力する</span>"
date: 2011-04-12
comments: true
categories: ruby
tags: ruby
published: true
---

昨日の[RMagickで使用可能なフォント名の一覧を出力する](/2011/04/11/ruby-rmagick-output-font-name-list)と同じように、Herokuのサーバー上でSinatraを使ってRMagickで使用可能なフォント名のリストを出力してみた。それほど種類は多くないものの、意外にも[Helvetica](http://ja.wikipedia.org/wiki/%E3%83%98%E3%83%AB%E3%83%99%E3%83%81%E3%82%AB)や[Palatino](http://ja.wikipedia.org/wiki/%E3%83%91%E3%83%A9%E3%83%86%E3%82%A3%E3%83%BC%E3%83%8E_(%E6%9B%B8%E4%BD%93))などが入っていたり、多くの文字数をカバーする[DejaVu](http://ja.wikipedia.org/wiki/DejaVu%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88)のSansとSerifなどが入っていた。個人的に好きな[Verdana](http://ja.wikipedia.org/wiki/Verdana)や[Georgia](http://en.wikipedia.org/wiki/Georgia_(typeface))が入っているのも嬉しい。
今回使用した、実際にフォント名のリストを出力しているURLは[こちら](http://heroku-hello-world.heroku.com/font_list)。
<!-- READMORE -->


## フォント名を出力するSinatraのコード

こんな感じで出力するように書いた。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'RMagick'
get '/font_list' do
  font_list = []
  Magick.fonts.each do |font|
    font_list.push font.name
  end
  font_list.join '<br>'
end
~~~


## RMagickで使用可能なフォント名一覧
実際に上記のコードをアップしてあるのが[これ](http://heroku-hello-world.heroku.com/font_list)で、この記事の執筆時点でのフォント名リストはこんなかんじ。

~~~ text
AvantGarde-Book
AvantGarde-BookOblique
AvantGarde-Demi
AvantGarde-DemiOblique
Bookman-Demi
Bookman-DemiItalic
Bookman-Light
Bookman-LightItalic
Courier
Courier-Bold
Courier-BoldOblique
Courier-Oblique
fixed
Helvetica
Helvetica-Bold
Helvetica-BoldOblique
Helvetica-Narrow
Helvetica-Narrow-Bold
Helvetica-Narrow-BoldOblique
Helvetica-Narrow-Oblique
Helvetica-Oblique
NewCenturySchlbk-Bold
NewCenturySchlbk-BoldItalic
NewCenturySchlbk-Italic
NewCenturySchlbk-Roman
Palatino-Bold
Palatino-BoldItalic
Palatino-Italic
Palatino-Roman
Symbol
Times-Bold
Times-BoldItalic
Times-Italic
Times-Roman
Andale-Mono-Regular
Arial-Black-Regular
Arial-Bold
Arial-Bold-Italic
Arial-Italic
Arial-Regular
Century-Schoolbook-Bold
Century-Schoolbook-Bold-Italic
Century-Schoolbook-Italic
Century-Schoolbook-Roman
Comic-Sans-MS-Bold
Comic-Sans-MS-Regular
Courier-New-Bold
Courier-New-Bold-Italic
Courier-New-Italic
Courier-New-Regular
DejaVu-Sans-Bold
DejaVu-Sans-Bold-Oblique
DejaVu-Sans-Book
DejaVu-Sans-Condensed
DejaVu-Sans-Condensed-Bold
DejaVu-Sans-Condensed-Bold-Oblique
DejaVu-Sans-Condensed-Oblique
DejaVu-Sans-ExtraLight
DejaVu-Sans-Mono-Bold
DejaVu-Sans-Mono-Bold-Oblique
DejaVu-Sans-Mono-Book
DejaVu-Sans-Mono-Oblique
DejaVu-Sans-Oblique
DejaVu-Serif-Bold
DejaVu-Serif-Bold-Italic
DejaVu-Serif-Book
DejaVu-Serif-Condensed
DejaVu-Serif-Condensed-Bold
DejaVu-Serif-Condensed-Bold-Italic
DejaVu-Serif-Italic
Dingbats-Regular
Georgia-Bold
Georgia-Bold-Italic
Georgia-Italic
Georgia-Regular
Impact-Regular
Nimbus-Mono-Bold
Nimbus-Mono-Bold-Oblique
Nimbus-Mono-Regular
Nimbus-Mono-Regular-Oblique
Nimbus-Roman-No9-Medium
Nimbus-Roman-No9-Medium-Italic
Nimbus-Roman-No9-Regular
Nimbus-Roman-No9-Regular-Italic
Nimbus-Sans-Bold
Nimbus-Sans-Bold-Condensed
Nimbus-Sans-Bold-Condensed-Italic
Nimbus-Sans-Bold-Italic
Nimbus-Sans-Regular
Nimbus-Sans-Regular-Condensed
Nimbus-Sans-Regular-Condensed-Italic
Nimbus-Sans-Regular-Italic
Standard-Symbols-Regular
Times-New-Roman-Bold
Times-New-Roman-Bold-Italic
Times-New-Roman-Italic
Times-New-Roman-Regular
Trebuchet-MS-Bold
Trebuchet-MS-Bold-Italic
Trebuchet-MS-Italic
Trebuchet-MS-Regular
URW-Bookman-Demi-Bold
URW-Bookman-Demi-Bold-Italic
URW-Bookman-Light
URW-Bookman-Light-Italic
URW-Chancery-Medium-Italic
URW-Gothic-Book
URW-Gothic-Book-Oblique
URW-Gothic-Demi
URW-Gothic-Demi-Oblique
URW-Palladio-Bold
URW-Palladio-Bold-Italic
URW-Palladio-Italic
URW-Palladio-Roman
Verdana-Bold
Verdana-Bold-Italic
Verdana-Italic
Verdana-Regular
Webdings-Regular
~~~

* * *

<cite>[RMagickで使用可能なフォント名の一覧を出力する](/2011/04/11/ruby-rmagick-output-font-name-list)</cite>
