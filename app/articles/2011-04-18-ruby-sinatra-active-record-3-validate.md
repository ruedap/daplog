# <span>SinatraからActiveRecord 3を使う(3)</span><span> バリデーション</span>

[前回のCRUD操作](/2011/04/17/ruby-sinatra-active-record-3-crud)に引き続き、今回はSinatraからActiveRecord 3を使った際の入力した値のバリデーション（検証）について調べたのでメモ。

<!-- READMORE -->


## バリデーション

バリデーションを行うには、モデルクラスにその行いたいバリデーション用のメソッドと対象のカラムをシンボル名で記述する。バリデーションは最初からいくつかのパターンが組み込まれていて、その記述は基本的に以下のような書式になる。

~~~ ruby
validates_バリデーションする方法名_of バリデーション対象のカラムのシンボル名
~~~

たとえば、ユーザー名がかぶらない（ユニーク）な状態にしたいのであれば、

~~~ ruby
validates_uniqueness_of :user
~~~

のような感じになる。組み込みで用意されているバリデーションの一覧については、[こちらの記事](http://wiki.usagee.co.jp/ruby/rails/RailsGuides%E3%82%92%E3%82%86%E3%81%A3%E3%81%8F%E3%82%8A%E5%92%8C%E8%A8%B3%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F%E3%82%88/Active%20Record%20Validations%20and%20Callbacks#oc1ab8c2)が詳しい。実際に、前回までに作ったカウントするだけのSinatraアプリをベースにして、例えば以下のような感じでバリデーションを記述してみる。

~~~ ruby
class Count < ActiveRecord::Base
  validates_presence_of :user  # ユーザー名の値が存在すること（空じゃないこと）
  validates_uniqueness_of :user  # ユーザー名の値がユニークであること（重複してないこと）
  validates_length_of :user, :maximum => 7, :minimum => 3  # ユーザー名の長さが3文字以上7文字以下であること
end
~~~


## バリデーションが実行されるメソッド

上記のバリデーションをモデルクラスに設定した場合、実際にそのバリデーションが実行されるタイミング（メソッド）は、`save`(`save!`)メソッドと`valid?`メソッドがメインになる気がする。`save`や`valid?`以外にもバリデーションを呼び出すメソッドは存在するけど今回は割愛。


### saveメソッド

`save`メソッドを実行したときに、バリデーションに失敗すれば、DBへの書き込みは行われず、`save`メソッドからは`false`の戻り値が返る。

~~~ ruby
get '/validate1' do
  c = Count.new
  c.user = 'hogehoge'  # バリデーションで7文字以内なのに、8文字の文字列を挿入している
  c.save  #=> バリデーションで失敗するので、DBには保存されず、戻り値はfalse
end
~~~

よって、上記のコードはDB側から見た場合は何も起きなかったことと等しい。


### save!メソッド

バリデーションに失敗しているときに、例外を発生させたいときは、`save!`メソッドを使う。`save!`メソッドを使うと、バリデーションに失敗したときに`ActiveRecord::RecordInvalid`の例外が発生する。

~~~ ruby
get '/validate1' do
  c = Count.new
  c.user = 'hogehoge'  # バリデーションで7文字以内なのに、8文字の文字列を挿入している
  c.save!  #=> バリデーションに失敗し、DBには保存されず、ActiveRecord::RecordInvalidの例外が発生
end
~~~

~~~ sh
ActiveRecord::RecordInvalid at /validate2
Validation failed: User is too long (maximum is 7 characters)
~~~

例外のメッセージは上記のような感じ。


### valid?メソッド

純粋にバリデーションだけを実行したい場合は、`valid?`メソッドがある。これは保存等のDB操作はせず、*バリデーションに成功するかどうかだけを実行*し結果をBooleanで返す。

~~~ ruby
get '/validate3' do
  c = Count.new
  c.user = 'hogehoge'  # 正しくない
  c.valid?  #=> false
  c.user = 'hoge'  # 正しい
  c.valid?  #=> true
end
~~~


## 1つでも失敗すると、何も保存されない

バリデーションに1つでも失敗すると、そのオブジェクトに対して行われたすべての変更が保存されない。

~~~ ruby
get '/validate4' do
  c = Count.new
  c.count = 5  # 正しい
  c.user = 'hogehoge'  # 正しくない
  c.save  #=> 何も保存されない
  c.save!  #=> 何も保存されない＆例外発生
end
~~~

上記の場合、`c.user`のバリデーションに失敗しているので、`c.count`は正しくても、`c.save`後には何も保存されない。最初はうまくいった部分の`c.count`だけ保存されるかなと思ったけど、やってみたらそうではなかった。


## エラー情報

バリデーションに失敗した情報は、`errors`オブジェクトに格納されている。バリデーションが一度も実行されていない場合は`errors`オブジェクトは空っぽ。バリデーションが実行され、失敗した場合のみ情報が格納される。

~~~ ruby
get '/validate5' do
  c = Count.new
  c.user = 'hogehoge'  # 正しくない
  c.errors  #=> バリデーションが実行されていないので空っぽ
  c.valid?  # バリデーション実行
  c.errors  #=> [:user, "is too long (maximum is 7 characters)"]
end
~~~


## バリデーションを実行したくない場合

バリデーションを実行したくない場合は、`save`メソッドの引数で`:validate => false`を渡すと、その時はバリデーションを実行せずに保存することが可能になる。

~~~ ruby
get '/validate6' do
  c = Count.new
  c.user = 'hogehoge'  # 正しくない
  c.save(:validate => false)  #=> 正しくないけど保存される
end
~~~


これでバリデーションについての基本的な使い方は、ひと通り抑えることができたと思う。さらに詳しくは、今回参考にさせてもらった[Rails 3のガイドを和訳してくれているページ](http://wiki.usagee.co.jp/ruby/rails/RailsGuides%E3%82%92%E3%82%86%E3%81%A3%E3%81%8F%E3%82%8A%E5%92%8C%E8%A8%B3%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F%E3%82%88/Active%20Record%20Validations%20and%20Callbacks#oc1ab8c2)が、自分の知っている範囲では今のところActiveRecord 3のバリデーションについての情報が多かった。  
次回は、ActiveRecord 3用機能拡張gemの[MetaWhere](/2011/04/19/ruby-sinatra-active-record-3-meta-where)を解説する予定。

* * *

<cite>[ruby/rails/RailsGuidesをゆっくり和訳してみたよ/Active Record Validations and Callbacks - 株式会社ウサギィwiki](http://wiki.usagee.co.jp/ruby/rails/RailsGuides%E3%82%92%E3%82%86%E3%81%A3%E3%81%8F%E3%82%8A%E5%92%8C%E8%A8%B3%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F%E3%82%88/Active%20Record%20Validations%20and%20Callbacks#oc1ab8c2)</cite>
<cite>[ActiveRecordが提供するModel機能を理解しよう － ＠IT](http://www.atmarkit.co.jp/fcoding/posts/3rdrail/02/3rdrail02b.html)</cite>
