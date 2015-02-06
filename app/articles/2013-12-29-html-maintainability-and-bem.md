# <span>HTMLのメンテナンス性とBEM</span>

BEMに関するこのあたりの考え方や期待感は、2014年でもう少し突っ込んで取り組みたい所存。Twitterへのツイートをブログ記事にする省エネ投稿。

<blockquote class="twitter-tweet" lang="en"><p>BEMのような一意性制約のある命名ルールの利点として、最近はHTML上に割り振られるクラス名はCSS以外でも使われるので、CSSのみではなくそのプロジェクト全体で考えた時のメンテナンス性や堅牢性があがるというのがあると思ってるんだけど、どうだろね。この部分への言及あんま見かけない</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/417164071582982144">December 29, 2013</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>JS用は別のクラス名に分けるとしても、それ以外にもサーバーサイドで動的に生成する場合（Railsで言うヘルパー）とか、結合テストから参照する場合とか、ABテスト用の場合とか。そういう色々な場所に散らばってるのをメンテナンスする時に一意なクラス名だと検索しやすくてミスも起きにくい</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/417165609156096001">December 29, 2013</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>BEMにすることでテスタビリティがあがる、とまで言うと言い過ぎかもしれないけど、だいたいそんな方向性を感じてる。「適用するのはすごくだるい作業だけど、運用レベルでの安心度がアップする」みたいなのは、RSpec書いてる時の感じにちょっと似てるかもしれない</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/417167111169921025">December 29, 2013</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>RSpecほど安心感は得られず、BEMのダルさは一人前だから、現状ではまだ損してる感じだけど…今後に期待</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/417167265969090560">December 29, 2013</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>「HTMLが壊れた」「CSSが崩れた」というのがもっと機械的に手軽に検知出来るようになってほしい。サーバーサイドのテスト環境のすごい発達具合を見てると、フロントエンドのここらへんは未だに泥臭くて人間様がチマチマやってるかんじ</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/417169131637460992">December 29, 2013</a></blockquote>

* * *

似たような話として、以前書いた[BEMに関する記事](/2013/10/29/block-element-modifier)ではこういう表現をした。

> 例えばサーバーサイドやJavaScriptのエンジニアが仮にCSSの設計を把握していなくても、とりあえずBEMの命名規則を覚えてもらえればブロック単位で維持すべきだと理解してもらえるので、それだけでデザインを壊してしまうリスクを結構回避できる。また命名した本人であっても、半年経ってから見たらBEMの名前はわかりやすく見えそう。
>
> <cite>[BEMという命名規則とSass 3.3の新しい記法 - アインシュタインの電話番号](http://blog.ruedap.com/2013/10/29/block-element-modifier)</cite>

他のコードに比べると、HTMLはより多くの人が編集する場所なので、HTML上に割り振られるID名やクラス名はそれ単体で「何のための名前か」「どういう構造か」「変更がどこまで影響するか」が可能な限り明快な方が良いと思っている。少し誇張して言うと**CSSのためではなくHTMLのために命名**する。そうすることでプロジェクトやチーム全体でのHTMLのメンテナンス性向上に繋がりそう。BEMのルールはそれに適しているかなと。

具体的にRailsプロジェクトで喩えて言うと、Railsエンジニアがfeature specを書く時に、把握しやすく使いやすいクラス名になっているかどうか。また逆に、CSSを設計した本人であっても、CSSのクラス名を変更したいと思った時に、HTML/CSS内だけでなく、自分が書いたコードではない前述のfeature specやRailsヘルパー、JavaScriptコードなどからも該当する部分を容易に見つけ出すことができるかどうか。そのあたりのフットワークが軽くなるように設計・命名することは、継続的に変更を加えていくWebサービスなどでは重視したほうが良いと思っている。少なくとも、スタートアップのような小規模なチームでは。

そのように誰からでもHTMLに変更を加えやすくした上で、ツイート最後に書いたように、破壊（意図しない変更）を加えてしまった場合にそれを自動的・機械的に検知できる環境がフロントエンドでも整えば、今よりももっと気軽に、誰にでも変更を加えられる状態にできるんじゃないかなぁと。RSpecやCapybaraなどを使っていると、そうなって欲しいという願望が強い。既に[PhantomCSS](https://github.com/Huddle/PhantomCSS)のようなツールが出てきているので、[これら](https://twitter.com/addyosmani/status/391675744176189440)が熟れてきて、既存のテスト環境と連携できるようになると、そういう状況を実現できそうな予感。
