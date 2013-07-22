---
layout: article
title: "<span>SinatraからActiveRecord 3を使う(2)</span> CRUD操作"
date: 2011-04-17
comments: true
categories: ruby
tags: ruby
published: true
---


[前回のマイグレーション](/2011/04/16/ruby-sinatra-active-record-3-migrate)からの続きで、今回はSinatraからActiveRecord 3を使ってCRUD操作をしてみる。といっても、おそらくCRUD操作についてはRailsで使う場合とSinatraとではほとんど違いはないと思われる。前回同様、ActiveRecord 3自体の使い方は[この記事](http://www.atmarkit.co.jp/fcoding/rails/posts/rails3/03/rails303a.html)がとてもわかりやすかったので全面的に参考にしている。

<!-- READMORE -->

## モデル

ActiveRecordを使ってDBのCRUD操作をする場合、*`ActiveRecord::Base`を派生させた1つのクラスがDBの1テーブルに対応し、そのクラスの属性がテーブルの各カラムに対応する*ことになる。このクラスのことを一般的に「モデル」と呼ぶ。Railsでは、Railsアプリを生成した段階でMVC別にフォルダが用意されているので、modelフォルダにこの`ActiveRecord::Base`派生クラスを作るんだけど、Sinatraではそういうフォルダ構造が決まっているわけではないので、アプリの本体となる前回作った`app.rb`ファイルに直接書く。

~~~ ruby
class Count < ActiveRecord::Base
end

get '/' do
  'hoge'
end
~~~

こんな感じ。`Count`のクラス名は、前回の`create_table`した時の引数`:counts`によって生成されたテーブル名`counts`に対応している。対応しているというか、ここの名前をちゃんと揃えないと使えないので注意。例の[CoC](http://ja.wikipedia.org/wiki/%E8%A8%AD%E5%AE%9A%E3%82%88%E3%82%8A%E8%A6%8F%E7%B4%84)ってやつ。DRYじゃないほう。この空っぽの`ActiveRecord::Base`派生クラスを記述するだけで、*countsテーブルをCRUD操作できる*ようになる。


## Create（生成）

新しくレコードを生成するには、普通にRubyでオブジェクトを生成する方法の`new`でおｋ。引数として属性と値をハッシュ形式で指定できる。

~~~ ruby
get '/create1' do
  count = Count.new(:user => 'ruedap', :count => 1)
  count.save  #=> saveするまでDBには書き込まれない
end
~~~

また、生成時の引数ではなく、オブジェクトを生成したあとに、属性値（＝フィールド値）を指定することも可能。

~~~ ruby
get '/create2' do
  count = Count.new
  count.user = 'ruedap'
  count.count = 1
  count.save  #=> saveするまでDBには書き込まれない
end
~~~

`save`メソッドを実行するまでは、DBへの書き込みは行われない。


## Read（読み取り）

読み取りは、`id`の値を読み取る場合と、それ以外のカラムの値を読み取る場合でメソッドが違うので注意。自分は最初、`find`で全部読み取れると勘違いしてちょっとハマった。`id`の値を読み取る場合は`find`メソッドを使う。

~~~ ruby
get '/read1' do
  count = Count.find(1)
  count.class.to_s #=> ヒットすればCountクラス、しなければActiveRecord::RecordNotFoundの例外が発生する
end
~~~

それ以外のカラムの値を読み取る場合は`where`メソッドを使う。

~~~ ruby
get '/read2' do
  count = Count.where(:user => 'ruedap')
  count.class.to_s  #=> 必ずActiveRecord::Relationオブジェクトが返ってくる
end
~~~

なぜメソッドが違うのか、ちょっと考えてみたところ、戻り値が違ったのでわかった気がした。`find`は`id`の値を検索するので、検索結果はヒットするとしたら必ず1件しか引っかからない。一方、`where`はいろいろなカラムの値を検索するので、時には検索結果が複数ヒットする場合があり、その場合は配列的なものを使わなければならない。この違いを明確にするためにメソッドが分けてあるのかなぁと。

今回のサンプルプログラムの場合は、`find`の戻り値は`Count`オブジェクト、`where`の戻り値は`ActiveRecord::Relation`オブジェクトとなる。前者は引っかからなかった場合は`ActiveRecord::RecordNotFound`の例外が発生する。また、後者は検索結果が0件でも1件でも複数件でも、必ず同じ`ActiveRecord::Relation`オブジェクトが戻り値となる。


## Update（更新）

更新するのは簡単で、CreateやReadしたオブジェクトに属性経由で値をつっこんで`save`するだけ。以下のサンプルコードでは`where`を使っていて、配列のような`ActiveRecord::Relation`オブジェクトで返ってくるので、その配列の1個目を取り出すために`first`メソッドを使っている。

~~~ ruby
get '/update' do
  count = Count.where(:user => 'ruedap').first  #=> whereの場合、戻り値はActiveRecord::Relationオブジェクトなので1個取り出す必要がある
  count.user = 'chaplin'
  count.count = 100000000
  count.save  #=> saveするまでDBには書き込まれない
end
~~~

ちなみに、最初のCreateのところで説明した`/create2`の方法は、まさにこのUpdateを使っていたということになる。


## Delete（削除）

削除も簡単で、`find`や`where`で削除したいレコードを探してきて、1件取り出して`destroy`メソッドを実行すれば削除される。これは`save`しなくても、`destroy`を実行した時点で削除される。

~~~ ruby
get '/delete1' do
  count = Count.find(1)
  count.destroy  #=> これはsaveしなくても、destroyメソッドを実行した時点でDBから削除される
end
~~~

また、複数削除する場合は、`where`でヒットさせて`ActiveRecord::Relation`オブジェクトを生成し、その`ActiveRecord::Relation`オブジェクトに対して`destroy_all`メソッドを実行すれば全部削除できる。

~~~ ruby
get '/delete2' do
  count = Count.where(:user => 'ruedap')
  count.destroy_all
end
~~~

以上で、ActiveRecord 3を使ったCRUD操作をひと通りできるようになったので、前回のマイグレーションとあわせることで、とりあえず基本的なDB操作を使えるようになった。次回はバリデーションについて書く予定。

* * *

<cite>[「ActiveRecord」の基本とデータの参照 － ＠IT](http://www.atmarkit.co.jp/fcoding/rails/posts/rails3/03/rails303a.html)</cite>
<cite>[第2回 Active Recordの使い方 | Think IT](http://thinkit.co.jp/story/2010/10/13/1804)</cite>
