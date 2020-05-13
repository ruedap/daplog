# <span>SinatraからDataMapperを使う(3)</span><span> バリデーション</span>

[前回の記事](/2011/02/13/ruby-sinatra-datamapper-2-migrate-model)では、モデルとマイグレーションのコードを別ファイルに分離した。今回は、レコードの追加を行うときに、そのデータが正しいか検証（バリデーション）するコードを追加してみる。

<!-- READMORE -->


## インストール

DataMapperのバリデーションを使うのでgemをインストールする。あと、[@komagata](https://github.com/komagata/dm-validations-i18n)さんがそのバリデーションのエラーメッセージを日本語化（国際化）してくれているので、そのgemも入れる。

~~~ sh
$ gem install dm-validations
$ gem install dm-validations-i18n
~~~


## バリデーション

バリデーションの定義は、テーブル定義クラス（`DataMapper::Resource`をインクルードしたクラス）で行う。


### model.rb

~~~ ruby
require 'rubygems'
require 'dm-core'
require 'dm-validations'
require 'dm-validations-i18n'
DataMapper::Validations::I18n.localize! 'ja'
class Post
  include DataMapper::Resource
  property :id, Serial
  property :title, String, :required => true, :unique => true, :length => 1..130
  property :tweet_num, Integer, :default  => 0
  property :created_at, DateTime
end
~~~

`title`レコードを定義している行の後ろの3つの引数がバリデーションの定義となる。

~~~ ruby
  property :title, String, :required => true, :unique => true, :length => 1..130
~~~

それぞれ、

- 未入力じゃないこと `:required => true`
- 重複してないこと `:unique => true`
- 長さが1以上130以下であること `:length => 1..130`

を指定している。これは簡略化された書き方で、従来は以下のように書いていた模様。

~~~ ruby
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_length_of :title, :min => 1, :max => 130
~~~

これは公式サイトでは[good old fashioned manual validation](http://datamapper.org/docs/validations)として紹介されていて、いちおう今も使えるみたい。


## エラーの表示

バリデーションの結果、エラーがあった場合は以下のようなコードで出力できる。

~~~ ruby
DATA.each do |data|
  post = Post.create(:title => data, :created_at => Time.now)
  puts post.errors.map {|e| "#{e} : #{data}" } unless post.errors.empty?
end
~~~

3行目がエラー出力用コードで、*レコード生成の結果（変数post）のerrors配列が空では無かったら、その中身（エラー文）を表示する*という処理を行なっている。実際に、この変更を行った後に、`ruby migrate.rb`を実行してみると、以下のような出力がされる。

~~~ sh
$ ruby migrate.rb 
--- Titleは1文字以上130文字以内で入力してください。 :
世の中には貪欲に知識を求める人間がいる。私もその一人だった。ただし動機から言うと、私のはそれほど純粋ではなかった。知識愛から求めたのではなく、ただ無知な人間にたいする世間の侮蔑から身を護るためにそうしたのだった。そんなわけで、暇さえあれば、古本屋漁りをしていた。
--- Titleは1文字以上130文字以内で入力してください。 :
あなた方は機械ではない、人間です。人間を愛する心を持った人間です。憎んではいけません。愛を知らぬ人間、愛されたこともない人間だけが憎むのです。隷属のために戦ってはいけません。自由のために戦ってください。あなた方はこの人生をすばらしいものにする力を持っているのです。
~~~

上記で表示されている1つ目の文字列（名言）は131文字、2つ目は132文字なので、バリデーションの1文字以上130文字以内の範囲を越えているためエラーが表示された。[^1]

~~~ sh
--- titleは既に存在します。 :
私の最高傑作は次回作だ。
~~~

重複した文字列（名言）がある場合は、上記のようにエラーが表示される。

~~~ sh
--- titleを入力してください。 :
~~~

未入力（空行）がある場合は、上記のようにエラーが表示される。

このようにバリデーションを行うことで、問題ないデータは正常にレコードに追加され、問題があったデータはレコードには追加されず、結果表示の処理（コード）を加えればエラー表示される。

[次回](/2011/02/15/ruby-sinatra-datamapper-4-shuffle-tweet)はやっとシャッフルツイート機能のロジックを記述する。

---

<cite>[DataMapper - Validations](http://datamapper.org/docs/validations)</cite>
<cite>[dm-validations-i18n - komagata［p0t］](http://docs.komagata.org/4623)</cite>

[^1]: ここではわざと引っかかるために130文字を指定している。Twitterに投稿できる文字数は140文字
