# <span>RMagickでフォント名を指定して</span><span>文字列を描画する</span>

RMagickで、何も無い状態からベースとなる画像を生成し、その上にフォント名を指定した文字列を描画する方法について調べた。ActionScript 3.0で例えると、RMagickのDrawクラスがBitmapDataクラス相当、RMagickのImageクラスがBitmapクラス相当になるかな。

<!-- READMORE -->

## annotateメソッド

[Image.new](http://studio.imagemagick.org/RMagick/doc/image1.html#new)で、ベースとなる画像サイズおよび背景色を指定し、Imageオブジェクトを生成する。[Draw.new](http://studio.imagemagick.org/RMagick/doc/draw.html#new)で、描画用のDrawオブジェクトを生成し、[Draw#annotate](http://studio.imagemagick.org/RMagick/doc/draw.html#annotate)メソッドでフォント名や各種属性を指定して文字列を描画する。annotateの中で使える属性で、[font_weight](http://studio.imagemagick.org/RMagick/doc/draw.html#font_weight_eq)プロパティは何を指定しても変化がなかったんだけど、何か特別なことをしないといけないのかな？ とりあえず下記のように、フォント名に「Verdana」ではなく「Verdana-Bold」を指定して太字にした。でもウェイト指定したいよね…教えて偉い人。

~~~ ruby
require 'rubygems'
require 'RMagick'
text = 'Hello, World'
size = 30
img = Magick::Image.new(400, 300) { self.background_color = '#336699' }
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
img.write('temp.png')
~~~

* * *

<cite>[RMagick 2.12.0: class Draw](http://studio.imagemagick.org/RMagick/doc/draw.html#annotate)</cite>
