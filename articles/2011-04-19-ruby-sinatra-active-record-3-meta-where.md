# <span>SinatraからActiveRecord 3を使う(4)</span><span> 比較演算が簡単になるMetaWhere</span>

[前回のバリデーション](/2011/04/18/ruby-sinatra-active-record-3-validate)に引き続き、今回はActiveRecord 3を使った際の`where`メソッド内での比較演算が簡単になるgemの[MetaWhere](http://metautonomo.us/projects/metawhere/)について調べたのでメモ。ぶっちゃけ今回はSinatraはあんまり関係なくて、ActiveRecord 3の使い方が便利になる話。

<!-- READMORE -->


## お題

**updated_atカラムの中で、今から1時間前よりも古い日時のレコードだけ抽出せよ**

このお題をクリアするためのActiveRecord 3のwhereメソッドの書き方がよくわからなかった。というか、今もわかってない。たぶんSQL文を直接書いて「updated_at < 1時間前の数値」的な感じで書くんだろうけど…と調べているときに、タイトルにもある通りの比較演算が簡単になる[MetaWhere](http://metautonomo.us/projects/metawhere/)の存在を知ってしまった。ので、whereでの書き方がよく分からないまま、このgemを使って解決した。


## 比較演算が簡単になるgem

上述のお題について検索していたら、[この記事](http://ja.asciicasts.com/episodes/251-metawhere-metasearch)を発見して、かなり便利そうだったので入れて使ってみた。実際便利だった。
まず、Gemfileに`meta_where`を追加する。今回使ったバージョンは1.0.4だった。

~~~ ruby
gem 'meta_where'
~~~

んで`$ bundle install`して準備完了。使い方は、Sinatraの場合は本体となる`app.rb`で主に使うわけだけど、MetaWhereのgemがrequireされていれば、ActiveRecord 3のメソッドやら引数に自動で機能が拡張されるみたいなので、gemのインストールとrequire以外は特に準備するものはない。それで、前述のお題をクリアするためのコードで、実際にMetaWhereを使ってみるとこんな感じ。

~~~ ruby
get '/meta_where1' do
  c = Count.where(:updated_at.lt => 1.hour.ago)
end
~~~

この`:updated_at`シンボルに`lt`がくっついている部分が*MetaWhereによって拡張された機能*で、「:update_atが1時間前(1.hour.ago)より小さい(lt)」（時間が経過するほど値が大きくなるので、小さい＝昔）というような指定ができるようになる。もちろん、大なりの`gt`も用意されている。これはなかなか便利。それ以外にも、以上を表す`gte`、以下を表す`lte`が用意されていて、まとめると以下のようになる。

|||
|-|-|
|gt|より大きい| ex. a > 3 |
|lt|より小さい| ex. a < 3 |
|gte|以上| ex. a <= 3 |
|lte|以下| ex. a >= 3 |

ちなみに、Sinatraでよく使われているO/Rマッパーの[DataMapper](/2011/02/12/ruby-sinatra-datamapper-1-orm-sqlite)は、これらの機能はデフォルトで用意されており、上記以外にもnotやlikeなどが使える。


## 大なりと小なり、gtとlt

いきなり話が飛ぶけど、大なりと小なり、gtとltってどっちがどっちかすぐ分からなくなる。ちょっとググッてみたら、同じような人がいた。

> あぁ、説明不足だったんですが、僕はだいなり・しょうなりってどっちがどっちだかわからないバカなので (同じように東と西もわからなかった)、gt/lt が何の略か知っていてもそれが記号に一致しないんです。でも l は left の l とバカでもわかるように覚えておけば、左手に近いほうの Shift+, をおせばいいというのが直感的に理解できるんです。バカのバカなりの考えかたです。
>
> <cite>[lt と gt - 冬通りに消え行く制服ガールは✖夢物語にリアルを求めない。 - subtech](http://subtech.g.hatena.ne.jp/cho45/20080206/1202225126)</cite>

いちおう自分は、*小なりの「＜」は大文字の「L」を少し右回転させた形と似てるので「LTは＜」*と覚えてたけど、この人の覚え方の（キーボードの並びで）LeftのLもいいね。両方覚えておけば、よっぽどド忘れしないかぎりは思い出せそう。

## MetaWhere.operator\_overload!

話が脱線してしまったけど、MetaWhereがさらにすごいのは、オペレーターオーバーロードというクラスメソッドを実行すると、gtだのltだのを覚える必要すらないということ！（さっきの覚え方の話はなんだったのだというツッコミはなしで） このオーバーロードする1文`MetaWhere.operator_overload!`を使う前に書き加えるだけで、超絶便利になる。普通のRubyのように直感的にそのまま書ける。

~~~ ruby
get '/meta_where2' do
  MetaWhere.operator_overload!  # これを書くと
  c = Count.where(:updated_at < 1.hour.ago)  # こんなに直感的に書ける
end
~~~

これはすばらしー。このオーバーロードをすることでどんな弊害があるのかはよくわからんけど、便利なのでとりあえずオーバーロードする方向で使っちゃおう。ちなみに、大なり小なり以外の記号では、[ドキュメント](http://metautonomo.us/projects/metawhere/)を見ると下記の記号を使えるみたい。

|||
|-|-|
|>>| (equal)|
|^| (not equal)|
|+| (in array/range)|
|-| (not in array/range)|
|=~| (matching &#8211; not a regexp but a string for SQL LIKE)|
|!~| (not matching, only available under Ruby 1.9)|
|>| (greater than)|
|>=| (greater than or equal to)|
|<| (less than)|
|<=| (less than or equal to)|
|[]| Function|


## orderメソッドにも追加されてる

オマケってわけじゃないけど、`order`メソッドにも降順にする`desc`や昇順にする`asc`という機能が追加されているみたい。

~~~ ruby
c = Count.order(:updated_at.desc)  #=> 降順
c = Count.order(:updated_at.asc)   #=> 昇順
~~~

というわけで、今作ってるWebサービスで時間を比較する必要があったので調べてたら、たまたま見かけたgemがとても便利だったのでMetaWhereについて書いてみた。同じシリーズで検索できるっぽい機能拡張MetaSearchというのもあるみたいだけど、今のところ使う予定がない。あと、この*SinatraからActiveRecord 3を使う*シリーズも、とりあえず今回で目的が達成できたので一旦終了。今後何か調べたりしたら続ける予定。

---

<cite>[ASCIIcasts - “Episode 251 - MetaWhereとMetaSearch”](http://ja.asciicasts.com/episodes/251-metawhere-metasearch)</cite>
<cite>[MetaWhere &#8211; metautonomo.us](http://metautonomo.us/projects/metawhere/)</cite>
