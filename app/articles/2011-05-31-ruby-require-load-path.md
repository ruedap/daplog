# <span>Rubyでrbファイルをrequireするときは</span><span>ドットを打つと良さそう</span>

記事タイトルがヘタなので、何言ってるのか伝わらなさそうだけど…。最近、Ruby 1.8.7で作ったWebアプリをRuby 1.9.2に移行させていて、その過程でつまずいて知ったことについて。Ruby 1.9.2からは、[ロードパスにカレントディレクトリが含まれなくなった](http://www.ruby-lang.org/ja/news/2010/08/18/ruby-1-9-2-is-released/#label-8)ので、それによって起こるエラーを回避するための方法として、*requireするパスにカレントディレクトリを示すドットを打つと良さそう*という話。

<!-- READMORE -->


## 実例

以下は説明用に簡略化した実例。まず、`hoge.rb`があるとする。中身はこんな感じ。

~~~ ruby
puts 'hoge!'
~~~

同じディレクトリに`app.rb`があるとする。中身はこんな感じ。

~~~ ruby
require 'hoge.rb'
~~~

`app.rb`を実行すると、*Ruby 1.8.7*ではこう。期待通り。

~~~ sh
$ ruby app.rb
hoge!
~~~

けど、*Ruby 1.9.2*では[ロードパスにカレントディレクトリが含まれなくなった](http://www.ruby-lang.org/ja/news/2010/08/18/ruby-1-9-2-is-released/#label-8)ので、以下のようなエラーになる。

~~~ sh
$ ruby app.rb
<internal:lib/rubygems/custom_require>:29:in `require': no such file to load -- hoge.rb (LoadError)
        from <internal:lib/rubygems/custom_require>:29:in `require'
        from app.rb:1:in `<main>'
~~~

解決策は2つあって、1つ目がおすすめ。簡単なので。


## 解決策1

`app.rb`の*requireでカレントディレクトリを示すドットを打つ*ことで、Ruby 1.9.2でも正常にrequireを実行できるようになる。この方法は[こちらの記事のコメント欄](http://d.hatena.ne.jp/mickey24/20100907/1283869273)で知った。

~~~ ruby
# require 'hoge.rb'
require './hoge.rb'  # カレントディレクトリを示すドットを打つ
~~~

これで、Ruby 1.8.7でも1.9.2でも正常動作してる。今のところ。ほんのちょびっとの労力で両対応できるので、自分はこれで行こうと思った。


## 解決策2

いちおうもうひとつの解決策も知ったので備忘録。最初はこちらしか知らなくて毎回書くのめんどうだなぁと思ってたけど、解決策1の方法を知って一安心。こっち方法は、*requireを実行する前に、ロードパスにカレントディレクトリを追加*する正攻法(?)

1箇所だけでなく、多くの場所で既にRuby 1.8.7的なrequireしてる場合はこちらの方が適してそう。この書き方は[Lokkaのコード](https://github.com/komagata/lokka/blob/master/init.rb)をコピペさせてもらった。

~~~ ruby
$:.unshift File.dirname(__FILE__)  # ロードパスにカレントディレクトリを追加
require 'hoge.rb'
~~~

この1行目は、ロードパス（[$: または $LOAD\_PATH](http://www.ruby-lang.org/ja/man/html/_C1C8A4DFB9FEA4DFCAD1BFF4.html#a.24.3a)）にカレントディレクトリを追加する処理で、これさえ書けば以降のrequireは今まで通りで問題ない。

個人的には、WebアプリはすべてSinatraで作って、ほとんどの場合が`app.rb`の1ファイルで済んでいて、稀にrbファイルを外部化する（今回のような）程度なので、そのたびに解決策2の書き方を思い出すのはしんどいと思ったので、解決策1を使う予定。

だけど、もっと大きな、または、rbファイルがたくさんあるようなプロジェクト（上述のLokkaのような）では、1箇所でロードパスを指定しておいて、他のrequireには手を加えないほうが適していると言えそう。適材適所ですね。

* * *

<cite>[Ruby 1.9.2から$LOAD\_PATHにカレントディレクトリが含まれなくなった](http://d.hatena.ne.jp/mickey24/20100907/1283869273)</cite>
<cite>[init.rb at master from komagata/lokka - GitHub](https://github.com/komagata/lokka/blob/master/init.rb)</cite>
