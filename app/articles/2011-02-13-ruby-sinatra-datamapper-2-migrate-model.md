---
layout: article
title: "<span>SinatraからDataMapperを使う(2)</span> マイグレーションとモデルの分離"
date: 2011-02-13
comments: true
categories: ruby
tags: ruby
published: true
---

[前回](/2011/02/12/ruby-sinatra-datamapper-1-orm-sqlite)は`app.rb`ファイルに全部詰め込んで動作チェックしたけど、今回はそれを分離する。特に、DB接続とテーブル定義を行うマイグレーション部分と、プロパティ情報を定義するモデル部分を`app.rb`から分離し、そのファイルを実行することでテーブル定義と初期レコードの追加だけを行えるようにする。

<!-- READMORE -->

## マイグレーションとモデルの分離

`app.rb`から分離して、`migrate.rb`と`model.rb`を作成する。


### model.rb

~~~ ruby
require 'rubygems'
require 'dm-core'
class Post
  include DataMapper::Resource
  property :id, Serial
  property :title, String
  property :tweet_num, Integer, :default  => 0
  property :created_at, DateTime
end
~~~

### migrate.rb

~~~ ruby
require 'rubygems'
require 'dm-core'
require 'dm-migrations'
require 'model.rb'
DataMapper.setup(:default, 'sqlite3:db.sqlite3')
DataMapper.auto_migrate!
DATA.each do |data|
  Post = Post.create(:title => data, :created_at => Time.now)
end
__END__
私の最高傑作は次回作だ。
映画の目的は笑わせることだ。しかし、そのなかには、二十世紀の世界に通じるシリアスな内容が含まれている。
いつも大人のなかにまぎれこんでしまった子供のような気がする。
孤児院にいたときでも、食べ物を求めて通りをうろつきまわっていたときでも、自分は世界一の俳優だと信じていた。自分自身にたいする揺るぎない自信に身をひたしている必要があった。それがなければ人生に押しつぶされていただろう。
母のパントマイムは私の見たかぎりにおいて、もっともすばらしいものであった。母の所作を見ているうちに、私は感情を手や顔で表現する技術ばかりでなく、人間というものを学びとることができた。
私は悲劇を愛する。悲劇の底にはなにかしら美しいものがあるからこそ悲劇を愛するのだ。
人生は恐れなければ、とても素晴らしいものなんだよ。
世の中には貪欲に知識を求める人間がいる。私もその一人だった。ただし動機から言うと、私のはそれほど純粋ではなかった。知識愛から求めたのではなく、ただ無知な人間にたいする世間の侮蔑から身を護るためにそうしたのだった。そんなわけで、暇さえあれば、古本屋漁りをしていた。
もし虹を探すのなら、下を見ては見つからない。
人生はクローズアップで見れば悲劇。ロングショットで見れば喜劇。
時は偉大な作家だ。つねに完璧な結末を書く。
笑いのない一日は無駄な一日である。
死と同じように避けられないものがある。それは生きることだ。
人生に必要なものは、勇気と想像力とほんの少しのお金だ。
幸福を手にするための戦いは美しいものです。
長い間の経験から、アイデアというものは、それを一心に求めてさえいれば必ずくるということを発見した。たえず求めているうちに、いわば心が想像力を刺激するような出来事を見張る一種の物見やぐらになってしまうのである。
私たちはみんなおたがいに助けあいたいと望んでいます。人間とはそういうものです。私たちは他人の不幸によってではなく、他人の幸福によって生きたいのです。
一人を殺せば殺人者だが、百万人を殺せば英雄だ。殺人は数によって神聖化させられる。
あなた方は機械ではない、人間です。人間を愛する心を持った人間です。憎んではいけません。愛を知らぬ人間、愛されたこともない人間だけが憎むのです。隷属のために戦ってはいけません。自由のために戦ってください。あなた方はこの人生をすばらしいものにする力を持っているのです。
人間には憎悪や不快を忘れさせてしまう性質がある。
大量殺人については、世界はそれを奨励しているのではありませんか。大量殺人という唯一の目的のために、破壊兵器を製造しているのではありませんか。
愛国心というものは、かつて世界に存在した最大の狂気である。愛国心がもてはやされた結果は、また新たな戦争である。
生きて行くことは美しく素晴らしい。クラゲにとってもね。
人生は願望だ、意味じゃない。
僅かな人間が決めた賞なんて、そうたいした名誉ではない。私のほしいものは大衆の喝采だ。大衆が私の仕事を賞賛してくれたならば、それで十分だ。
私は支配したくない。私は人の幸福を願いながら生きたい。貪欲が人類に憎悪をもたらし悲劇と流血をもたらした。思想だけがあって感情がなければ人間性は失われてしまう。
最初から多くのことを成し遂げようとして極端な努力をすると、たちまちのうちに全てを放棄することになる。
失敗は重要ではない。自分自身を馬鹿にするのは勇気がいる。
どうやってアイデアをつかむか？ それには、ほとんど発狂一歩手前というほどの忍耐力がいる。苦痛に耐え、長期間にわたって熱中できる能力を身につけねばならぬ。
そうだ人生はすばらしい。何より大切なのは勇気だ、想像力だ。
"You?" "You can see now?" "Yes, I can see now."
~~~


### app.rb

残った`app.rb`はこんな感じになる。

~~~ ruby
require 'rubygems'
require 'sinatra'
require 'dm-core'
require 'model.rb'
DataMapper.setup(:default, 'sqlite3:db.sqlite3')
get '/' do
  Post.all.map {|r| "#{r.id}, #{r.tweet_num}, #{r.created_at}, #{r.title} <br>" }
end
get '/create' do
  Post = Post.create(
    :title      => "DataMapperからHello world!",
    :created_at => Time.now
  )
  "Post.createに成功!" unless post.nil? # 失敗したらnilになる？未調査の当てずっぽう
end
~~~


## コードの説明

`migrate.rb`のこの部分がキモになる。

~~~ ruby
require 'model.rb'
DataMapper::setup(:default, 'sqlite3:db.sqlite3')
DataMapper.auto_migrate!
DATA.each do |data|
  Post = Post.create(:title => data, :created_at => Time.now)
end
~~~

最初の行で`model.rb`を`require`している。これは、`DataMapper.auto_migrate!`のためで、クラスメソッドの`auto_migrate!`は

「現在`reuiqre`されている、`DataMapper::Resource`をincludeしているクラス（テーブル定義）を全部マイグレーションする」

というもの。前回の記事で使ったインスタンスメソッドの`auto_upgrade!`（`auto_migrate!`でも同じ）は、そのテーブル定義のクラス1個のみ。ようは、今回はテーブル定義のクラス（`model.rb`）を外部ファイル化しているので、`require`だけしてクラスメソッドを使った、という感じ。

このクラスメソッドの時点でテーブル定義は出来ているので、その後のコードでは31個の名言を`each`メソッドを使って流し込んでいる。

* * *

<cite>[自己流でSinatraとRSpecとWebratとCucumber使ってみた。あとDataMapperも](http://d.hatena.ne.jp/mothprog/20090706/1246897103)</cite>
<cite>[ramaze-users.jp - DataMapper/マイグレーション](http://route477.net/ramaze/?DataMapper%2FMigration)</cite>
<cite>[Techno Pocket - Technical Memo - Ruby永続化フレームワークDataMapper](http://technopocket.sakura.ne.jp/tips/ruby_datamapper.html)</cite>
