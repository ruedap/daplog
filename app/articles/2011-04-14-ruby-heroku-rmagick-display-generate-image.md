---
layout: article
title: "<span>RMagickを使って生成した画像を</span>Herokuで表示する2つの方法"
date: 2011-04-14
comments: true
categories: ruby
tags: ruby
published: true
---

Herokuは、単体ではファイルをサーバー上に*永続的に保存することはできない*[^1]ので、RMagickを使って画像を生成してもそれを保存することはできない。ただし、*生成した画像をその場で単に表示するだけの目的*であれば、永続的に保存する必要はないので、次の2つの方法でRMagickで生成した画像を利用できる。

- 生成した画像を保存せずにバイナリデータを直接表示する方法
- 生成した画像を一時保存フォルダに保存して表示する方法

<!-- READMORE -->


## 生成した画像を保存せずにバイナリデータを直接表示する方法

生成したRMagickの`Image`オブジェクトを、[`to_blob`](http://studio.imagemagick.org/RMagick/doc/image3.html#to_blob)メソッドを使って、*直接メモリー上にバイナリデータとして展開*し、それを出力する方法。これはメモリーの消費量が多そう。毎回1度だけ表示するようなジェネレータ系には適しているかも。この方法のサンプルコードが以下。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'RMagick'
text = 'Hello, World'
size = 30
get '/pic1' do
  blob = create_pic
  content_type "image/png"
  blob  #=> バイナリデータを直接表示
end
def create_pic
  img = Magick::Image.new(400, 300) { self.background_color = '#336699' }
  img.format = 'png'
  draw = Magick::Draw.new
  draw.annotate(img, 0, 0, 50, 100 + size, text) do
    self.font = 'Verdana-Bold'
    self.fill = '#FFFFFF'
    self.align = Magick::LeftAlign
    self.stroke = 'transparent'
    self.pointsize = 30
    self.text_antialias = true
    self.kerning = 1
  end
  img.to_blob  #=> バイナリデータ化
end
~~~


## 生成した画像を一時保存フォルダに保存して表示する方法

もうひとつの方法は、[こちらの記事](http://d.hatena.ne.jp/shunsuk/20110320/1300610643)で知ったのだけど、Herokuでは*`/tmp`フォルダのみ一時保存フォルダとして利用することが可能*で、そこにはファイルを書き出せるとのこと。実際にやってみたら出来た。一時保存なので時間が経過すると消去される。消去された画像にアクセスしようとすると、Internal Server Errorが起きた覚え。

`/tmp`フォルダのファイルが消去される条件は、自分で試してみた[^2]限りでは、*アプリがスピンダウン状態になると消去される*っぽくて、そのスピンダウン状態には、*最後にサイトにアクセスがあってから一定時間が経過する*となる。その一定時間は正確にはわからないけど、感覚的には10～30分くらいかな？ここらへん、詳しい人がいたら教えてほしい。というわけで、生成した画像を`/tmp`フォルダに一旦書き出し、それを再度読み込んで表示するというサンプルコードが以下。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'RMagick'
text = 'Hello, World'
size = 30
get '/pic1' do
  path = create_pic
  file = File.open(path, "rb") {|f| f.read }  #=> 一時保存したパスから画像を読み込み
  content_type "image/png"
  file  #=> 読み込んだ画像を表示
end

def create_pic
  img = Magick::Image.new(400, 300) { self.background_color = '#336699' }
  img.format = 'png'
  draw = Magick::Draw.new
  draw.annotate(img, 0, 0, 50, 100 + size, text) do
    self.font = 'Verdana-Bold'
    self.fill = '#FFFFFF'
    self.align = Magick::LeftAlign
    self.stroke = 'transparent'
    self.pointsize = 30
    self.text_antialias = true
    self.kerning = 1
  end
  path = './tmp/temp.png'  #=> /tmpフォルダ内（配下）じゃないと書き込めない
  img.write(path)  #=> 一時保存フォルダに一旦書き出し
  path  #=> 一時保存したパスをリターン
end
~~~


どっちの方法がいいかは利用する状況によると思うけど、生成した画像に複数回アクセスするのであれば、後者のほうが`/tmp`フォルダに保存された画像が存在する限りはそれを使いまわせるので、リソースの消費は抑えられそう。ただし、ファイルの書き込みと読み込みのオーバーヘッドが発生するので、1回目の処理（画像生成部分）は遅くなりそう。全部憶測なのは、こういう場合のベンチマークの取り方を知らないから…。もし、上記以外にも良い方法があれば教えてください。

* * *

<cite>[Rubyでtempfileのエンコーディングを指定する。 - このブログは証明できない。](http://d.hatena.ne.jp/shunsuk/20110320/1300610643)</cite>

[^1]: Heroku単体ではなく、Amazon S3とか別のサービスを併せて利用すれば可能みたいだけど、使ったことないので詳しくはわからない
[^2]: 正確ではない可能性が大
