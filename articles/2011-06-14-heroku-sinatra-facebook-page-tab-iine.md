# <span>Facebookページのいいね！ボタンが</span><span>押されているかをSinatraで判定する</span>

例えばFacebook上でのキャンペーンで、「Facebookページのいいね！ボタンを押してくれた方全員にもれなく壁紙プレゼント」などを行う場合に、*いいね！ボタンが押されたかどうかを取得して、その値でページを振り分ける*必要がある。そのやり方についてのメモ。

今回のはHeroku+Sinatraの組み合わせで、特にFacebook用のライブラリなどは使用していない。ざっと調べた感じだと、PHP+Facebook SDKを使うのが一番簡単そうに見えたんだけど、SDKがPHP5.2以上必要っぽくて使えなかった。ちなみに、Facebook上でのキャンペーンや懸賞を行う場合の利用規約については、以下のページが詳しくて参考になった。

<cite>[やっちゃっていませんか？Facebookの規約違反](http://socialmediaexperience.jp/3825)</cite>

これを読むと、かなり厳しい感じ。

<!-- READMORE -->


## 予備知識

予備知識として、Facebookページについて以下のことを押さえておく必要がある。最初これらが理解できてなかったので、色々とハマった。

1. Facebookページの「タブ」と呼ばれるページでのみ、いいね！ボタンが押されたかどうかを判定できる
2. 判定をするのはFacebookアプリで、これは外部に置いてあるサーバーに設置する（Facebook内には置けない）
3. 外部のFacebookアプリをFacebookページの「タブ」ページに設定しておけば、そのページを開くときに情報（signed_request）がPOSTされる
4. その情報（signed_request）の中に、いいね！ボタンが押されているかどうかのフラグが格納されている

自分はそもそもFacebookをまともに使ってないので、もしかしたらおかしなことを書いてるかもしれない。


## いいね！ボタンが押されているか判定するコード

前述の予備知識を踏まえて、いいね！ボタンが押されているか判定するコードは以下のようになる。これを調べるにあたって、[こちらの記事](http://d.hatena.ne.jp/aquarla/20110517/1305608668)がとても参考になった。

今回は`Ruby 1.9.2`を対象にしたコード。まず、`Gemfile`に使用するgemを指定する。Sinatra以外にはActiveSupport 3とそれに関連するi18nの2つのみ。JSONのデコードに使うっぽい。

~~~ ruby
source :rubygems
gem 'sinatra'
gem 'activesupport', :require => 'active_support/all'
gem 'i18n'
~~~

で、実際に判定するSinatra部分の`app.rb`は以下のようになる。

~~~ ruby
# coding: utf-8
helpers do
  def base64_url_decode str
    encoded_str = str.gsub('-','+').gsub('_','/')
    encoded_str += '=' while !(encoded_str.size % 4).zero?
    Base64.decode64(encoded_str)
  end
  def decode_data str
    encoded_sig, payload = str.split('.')
    data = ActiveSupport::JSON.decode base64_url_decode(payload)
  end
end
get '/' do
  'postではない'
end
post '/' do
  signed_request = decode_data(params[:signed_request])
  return 'タブページではない' unless signed_request['page']
  if signed_request['page']['liked']
    'いいね！が押されてる'
  else
    'いいね！が押されてない'
  end
end
~~~

まず、上の方のヘルパーメソッドはこういうものだと思ってペタッと貼っておけば良いみたい。ちゃんと解読はしてないけど、FacebookからPOSTされるsigned_request情報をデコードするためのもので、SDKなどを利用すれば自動でやってくれる類い。今回はgetではなくpostメソッドで処理を行うので、GETで呼ばれたときはPOSTじゃないことを示す文字列「postではない」を返すようにしてある。


### ここから本題

次のpostメソッドが今回の重要ポイントで、Facebookページ（タブ）を開いたときに、そのページ内に埋め込まれているFacebookアプリ（＝上記のSinatraアプリ）が呼び出され、その時に前述のとおり*POSTでsigned_request情報が渡される*ので、このpostメソッドで受け取って処理をする。

~~~ ruby
signed_request = decode_data(params[:signed_request])
~~~

まずこの行は、最初に書いたヘルパーメソッドを使って、postされたsigned_request情報をデコードしている。

~~~ ruby
return 'タブページではない' unless signed_request['page']
~~~

次のこの行が結構重要で「Facebook内のページではあるけど、Facebookページ（タブ）ではない」という時にこの行が発動する。これはハマるポイントだと思う。現に自分はここでかなりハマった。具体的にはFacebookアプリのページを直接開いたときなどが該当する。上記アプリの各設置場所での表示結果を表にすると以下のようになる。ややこしい。

|-:|:-|
|Heroku上でアクセスした場合|「postではない」と表示される|
|Facebookアプリとしてアクセスした場合|「タブページではない」と表示される|
|Facebookページのタブ経由でFacebookアプリにアクセスした場合|いいね！判定結果が表示される|

Facebookアプリのページでは、signed_request情報自体はpostされるんだけど、その*signed_request情報の中にpageというハッシュ（連想配列）が存在しない。* で、このpageというハッシュの中に、いいね！ボタンが押されたかどうかの情報が格納されているので、Facebookアプリのページではその判定はそもそもできない、ということになる。ややこしい。
Facebookページのタブページに埋め込まれたFacebookアプリを表示する場合なら、postされた情報に上述pageハッシュは存在する。

~~~ ruby
if signed_request['page']['liked']
  'いいね！が押されてる'
else
  'いいね！が押されてない'
end
~~~

最後に、signed_request情報がpostされて、かつ、pageというハッシュが存在する場合、その中に`liked`というハッシュがあって、その値がtrueならいいね！ボタンが押されている、falseならいいね！ボタンが押されてない、と判定できる。


## 妥当性チェックやセッションを使う場合には

上記の手順は、簡略化した判定方法になるので、本当はpostされた情報の妥当性チェックが必要だったり、取得した判定情報をセッションで引き継ぐ場合のIEでの注意点などがあって、実際にはコードはもう少し複雑になるようで、そこらへんの手順についても、[参考にさせてもらったブログ記事](http://d.hatena.ne.jp/aquarla/20110517/1305608668)では解説されている。

それにしても、Facebookの概念やらインターフェイスは本当にややこしい。Facebook自体をちゃんと利用してないからこんなに分かりづらく感じるんだろうか。今回このいいね！ボタンの判定をやったことで、Facebookページはちょっと理解できた気がするけど。

---

<cite>[Facebook Signed Request を Ruby on Rails で扱う - でぶぬる日記](http://d.hatena.ne.jp/aquarla/20110517/1305608668)</cite>
