# <span>BEMという命名規則と</span><span>Sass 3.3の新しい記法</span>

[BEM](http://bem.info/method/definitions/)を使った命名がとても明快で、このところHTMLやCSSを書くのによく使っている。CSSのクラス名として書く場合は、BEMをCSS用に使いやすくした[MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)という書き方を採用している。最初にこれを知ったときは「こんな汚い記述の仕方は使いたくない」と思ってたんだけど、すっかり慣れて、今ではその明快さにちょっと心酔しかけているほど。上記の2つの文書はどちらも[@junya](https://twitter.com/junya)さんが日本語に訳してくれている。

<cite>[BEM-Methodology Definitionsの日本語訳](http://journal.sooey.com/220)</cite>
<cite>[Summary of MindBEMding - getting your head 'round BEM syntax](https://gist.github.com/juno/6182957)</cite>

BEMの方法論とMindBEMdingのルールについてはそれぞれの文書を読んでもらうとして、それらをひっくるめて大雑把に説明すると、BEMとは`Block`、`Element`、`Modifier`の頭文字を取ったもので、構成する要素をそのどれかに当てはめて命名していく方法。どの場合でも必ず`Block`もしくはその`Modifier`がルートにあり、その中に、所属する`Element`もしくはその`Modifier`が含まれる構成になる。

- `Block` - 構成のルートとなる要素。すべてはここから始まると言っても過言ではない。
- `Element` - `Block`に所属する子要素。必ず`Block`の中にいて単体では生きられない。
- `Modifier` - 元となる`Block`または`Element`から変化した状態を表す要素。


さらに誤解を恐れずに書くと、**BEMはオブジェクト指向に少し似ていて**、`Block`は継承元のクラスもしくはインターフェイス、`Modifier`はその派生クラス、`Element`はそれらのクラスに所属するメソッドもしくはプロパティを連想するとイメージしやすいかも。


## MindBEMding

[MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)は、そのBEMをCSSのクラス名に適用するために作られた規則で、CSS界隈でBEMと言った場合はこのMindBEMdingを指すことが多い。`Element`をアンダースコア2つ(`__`)、`Modifier`をハイフン2つ(`--`)で連結することでBEMの各要素を表現する。

~~~ txt
block
block__element
block__element--modifier
block--modifier
block--modifier__element
~~~

この記号の使い方は初めて見ると強烈で**人によっては拒絶反応が起きるタイプ**のもので、前述の元記事でも*Uuuugly!*とディオ並みに叫んでいる。ただ、[醜さを我慢して使ってみる](https://twitter.com/ruedap/status/385300890355118082)と、この命名規則のわかりやすさ・使いやすさが実感できると思うのでぜひ試してほしい。BEM(MindBEMding)を使ってHTMLとCSS(SCSS)を書いてみると、例えばこんな感じ。

~~~ html
<div class="block">
    <div class="block__element"></div>
    <div class="block__element--modifier"></div>
</div>
<div class="block--modifier">
    <div class="block--modifier__element"></div>
</div>
~~~

~~~ scss
.block {
  width: 100px;
}

.block__element {
  width: 20px;
  margin-left: 10px;
  color: blue;
}

.block__element--modifier {
  @extend .block__element;
  color: red;
}

.block--modifier {
  @extend .block;
  margin-top: 20px;
}

.block--modifier__element {
  @extend .block__element;
  background-color: green;
}
~~~

自分はマルチクラス方式があまり好みではなく、できるだけCSS側でコントロールしたいというのもあって、上記のように`Modifier`を書くときはSassの`@extend`を使ってシングルクラス方式で書いている。けど、CSSプリプロセッサを使ってなかったりマルチクラス方式で書く方が好みであれば、HTML側に寄せて以下のような書き方になる。BEMに関係なく、今現在はこちらの方が主流な書き方な感じはする。ただ、BEMだとかなり冗長になる。

~~~ html
<div class="block">
    <div class="block__element"></div>
    <div class="block__element block__element--modifier"></div>
</div>
<div class="block block--modifier">
    <div class="block__element"></div>
</div>
~~~


## シングルクラスとマルチクラス

ところで、もしかしたらHTML/CSSにおけるシングルクラスやマルチクラスという呼び方は聞き慣れないかもしれないけど、そのあたりの設計方法についてはこの記事が参考になる。

<cite>[HTMLのセマンティックとフロントエンド構造について](http://article.enja.io/articles/about-html-semantics-and-front-end-architecture.html)</cite>

上の記事の中で、[Nicolas Gallagher](https://github.com/necolas)氏は「CSSプリプロセッサの手助けがあったとしても私はマルチクラスを利用する方がよいと考えている」と、**クラスの組み合わせによる柔軟性を理由にマルチクラス設計を推奨**している。けれど、これは使う場面によると思っていて、自分の場合はシングルクラスの方が適していることが多い気がしている。理由は後述。

上記以外にも、CSSにおける設計の仕方の話としては以下の記事なども参考になる。

<cite>[ぼくのかんがえたさいきょうのしーえしゅえしゅ \| MOL](http://t32k.me/mol/log/the-perfect-css-i-thought/)</cite>
<cite>[大規模サイトにおける本当は怖いCSSの話](http://www.slideshare.net/in0in0/css-23708309)</cite>
<cite>[Thinking about CSS Architecture](http://www.slideshare.net/hiloki/thinking-about-css-architecture)</cite>
<cite>[今必要なCSSアーキテクチャ](http://www.slideshare.net/MayuKimura/css-25547100)</cite>

これは個人的な考えだけど、どちらかと言えば**BEMはシングルクラスに適した構造・命名**だと思っていて、[モジュール組み](https://github.com/pxgrid/pxg-html-boilerplate/wiki/%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E7%B5%84%E3%81%BF)（さらに詳細な[有料記事](https://app.codegrid.net/entry/frames-and-modules)）などもこの系統に近い。逆に、マルチクラスには[OOCSS](http://takazudo.github.io/blog/entry/2012-12-10-oocsssass.html)や[SMACSS](http://chroma.hatenablog.com/entry/2013/07/22/120818)（[書籍](http://shop.smacss.com/products/smacss-e-book)）などが向いているという印象を持っている。

自分がマルチクラスよりシングルクラスでの設計の方が好みなのは、

- 序盤の設計時のシンプルさ・容易さ
- HTML側を見た時の明快さ・編集する時の容易さ
- HTML側での簡潔なクラス指定によるデザインの崩れにくさ

などが挙げられる。HTML側をシンプルに保つ代わりに、CSS(Sass)側の複雑さが増える。一方、マルチクラスでの設計になると、HTML側が複雑になりやすい代わりに柔軟性が高くなり、その柔軟性の代償としてクラスの組み換えによるデザインの崩れも起きやすくなる。自分がHTML側を明快にしたい理由は、**HTMLはCSSに比べて編集する人の数が多いから**。

また、マルチクラスは最初の設計の段階でコストが掛かりやすく、シングルクラスに比べて設計力を問われる。シングルクラスは初動時のコストは少なくシンプルに保てるが、継続的にうまくコントロールしていかないとのちのちカオスになりやすい。一長一短ある感じではあるけれど、**マルチクラス設計はフレームワークや大規模なサイトに、シングルクラス設計はスタートアップや小規模なサイトに向いている**かなと思っている。自分は、後者の環境で設計することがほとんどなので、シングルクラスの方が適していると思うことが多い。


## BEMの明快さ

それで、シングルクラス設計でCSSを書いていく上で問題になりやすいポイントとしては、その**付けられた名前から意味を読み取りづらくなりがち**というのがある。BEMのメリットの中でも大きな特長だと思うのは、特にシングルクラス設計での**構造・命名に秩序をもたらしてくれること**で、BEMを適用するだけでその問題をある程度は解決できるのがうれしい。

例えば、以下のようなCSSのクラス名があったとしたら、ここからどのような構造や状態を想像するだろうか。この名前だけでどこまで読み取れるだろう？

~~~ txt
character-avatar-and-name-notice
~~~

シングルクラス設計の命名では、1つの名前の中に単語数が多くなりがちで、CSSクラス名として主流のハイフン連結だけでは、**名前をつけた本人以外には正確に意味を読み取れないこと**が多々ある。さらにキャメルケースを使ったり、アンダースコアを使ってわかりやすくしようとする気があるなら、最初からBEMのルールを使ったほうがよりわかりやすくなると思う。BEMには記号の違いだけでなく、`Element`や`Modifier`という概念があるから。

~~~ txt
character__avatar-and-name--notice
~~~

BEMを前提にこう書かれてあれば、この名前を見ただけで「`character`というブロックに含まれる`avatar-and-name`という要素を元とする`notice`というバリエーションの要素」ということが読み取れるようになる。仮にここに変更を加える際にも、「場合によっては元になっている要素の`character__avatar-and-name`の方にも影響するかも」ということまで、**この名前を初めて見た人にも伝わる**。ところが最初の名前では、まず読み取り方からして「`character-avatar`と`name-notice`」など、人によって複数の読み方ができてしまう。

記事をここまで読んでいるならもう既に、例えば以下の名前からも単語の羅列以上に多くの情報を読み取れるようになっているのではないだろうか。

~~~ txt
setting-list__item--active
setting--admin__title-img
~~~

少なくとも、この2つがそれぞれ別のグループ（ブロック）に所属している要素ということが読み取れれば、この命名規則の趣旨がつかめていると思う。

**BEMは見た目の奇妙さと引き換えに、とても強力な明快さをもたらしてくれる。**

このBEMの名前の明快さは、HTMLの構造やCSSの設計を把握してない人が触る場合に特に威力を発揮する。例えばサーバーサイドやJavaScriptのエンジニアが仮にCSSの設計を把握していなくても、とりあえずBEMの命名規則を覚えてもらえれば**ブロック単位で維持すべきだと理解してもらえる**ので、それだけでデザインを壊してしまうリスクを結構回避できる。また命名した本人であっても、半年経ってから見たらBEMの名前はわかりやすく見えそう。

上の例ではそもそもの名前の付け方が下手だという指摘もありそうだけど、誰にでも伝わる良い名前を付けるというのはとても大変なことで、できるだけその労力を減らしたいと常々思っていて、今回のBEMの命名規則はその部分を大きく軽減・改善してくれるものだった。BEMの利点はこれだけではないけれど、一番気に入っているところを挙げるならこの部分。使い始めたばかりの頃は[一番嫌っていた部分](https://twitter.com/ruedap/status/342859224516280320)だったんだけど…ˉ̞̭ ( ›◡ु‹ ) ˄̻ ̊


## Sass 3.3の新しい記法

現在RC1で正式版のリリースが近い[Sass 3.3](https://github.com/nex3/sass/blob/master/doc-src/SASS_CHANGELOG.md)では、**BEMで記述するのに適した新しい記法**が導入される予定。前述のSCSSでの記述例を、新しい記法で書くとこういう感じになる。

<ins datetime="2014-09-28T15:34:00+09:00">Sass 3.3正式版では、RC1の記法から変更されたので詳しくは<a href="http://sass-lang.com/documentation/file.SASS_CHANGELOG.html">ドキュメント等</a>を確認してください。以下で紹介している記法は最新版のSassでは動きません。</ins>

~~~ scss
.block {
  width: 100px;

  @at-root {
    #{&}__element {
      width: 20px;
      margin-left: 10px;
      color: blue;
    }

    #{&}__element--modifier {
      @extend .block__element;
      color: red;
    }

    #{&}--modifier {
      @extend .block;
      margin-top: 20px;
    }

    #{&}--modifier__element {
      @extend .block__element;
      background-color: green;
    }
  }
}
~~~

親セレクタを`&`で表すことは今までも出来ていたけど、それとインターポレーション`#{}`を組み合わせてクラス名の表現（生成）に使えるようになった。

また、ブロック直下で`@at-root`ディレクティブを使って囲んでおくと、デフォルトではそのブロックでネストしないようになるので、**記述上はネストしてグルーピングしたいけど、詳細度を上げないためにブロックのセレクタを追加したくない**ということが実現できる。BEMではどの名前も一意なのが確実なので、ネストして詳細度を上げる意味はあまりない。

出力結果のCSSは以下のようになる。

~~~ css
.block, .block--modifier {
  width: 100px;
}

.block__element, .block__element--modifier, .block--modifier__element {
  width: 20px;
  margin-left: 10px;
  color: blue;
}

.block__element--modifier {
  color: red;
}

.block--modifier {
  margin-top: 20px;
}

.block--modifier__element {
  background-color: green;
}
~~~

前述のSCSSで改善したいのは、`@extend`でブロック名の部分をインターポレーションで表現できずに直接書いている点。調べた範囲では適切な書き方がわからなかった。

~~~ scss
#{&}__element--modifier {
  @at-root { @extend #{&}__element; }
}
~~~

と書けばいけるかなと思ったけど無理だった。新記法での`@extend`の書き方を募集中。

実際に、自分の[ペライチサイト](http://ruedap.com/)でこの[Sass 3.3の新記法を使ってCSSを書いたり](https://github.com/ruedap/ruedap.com/blob/426ac9bb1406cbb7501260111998edd3a7277847/source/stylesheets/_modules.sass)もしてみたけど、ベタ書きするのと比べて今のところこの記法にメリットをあまり感じられていない。前述の`@extend`でうまく使えてなかったり、エディタの補完が使えなかったり、一括置換しづらく感じたりと、むしろデメリットのほうが目立っている感もあるんだけど、わざわざ導入されるからには何かしらの良さがあるはずなので、今後も調査・検証するつもり。

* * *

追伸、先程のペライチサイトのCSSは、ブロック数も少ないので1つのSassファイルに全部書いているけど、ページ数の多いWebサービスなどでは、ブロック単位でSassファイルを分けるようにしている。こうしておくと見通しが良くなるし、**ファイル名＝ブロック名**になるので、数が増えた時にうっかりブロック名を重複させてしまうミスを防止できそう。

<blockquote class="c-tweet twitter-tweet" lang="en"><p>BEMのBlock一覧表、実際はこんなかんじ。ここさえ被らなければどれだけスタイル定義が多くても安心。そもそもファイル単位だから被るわけナス。Blockという粒度がちょうどいい感じで、この点だけでも個人的にはBEM使う価値がある <a href="http://t.co/oyfbJpeHZw">pic.twitter.com/oyfbJpeHZw</a></p>&mdash; ruedap (@ruedap) <a href="https://twitter.com/ruedap/status/388348442306551808">October 10, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

結局のところ、BEMがどうこうというよりも、より壊れにくいCSSの書き方を求めていて、BEMの書き方は今のところそれに最も合致していたということかもしれない。**CSSはとても脆い**ので恐る恐る触るくらいがちょうどいい。百鬼夜行していいのは妖怪だけ。

そんな感じで、まだ使いながら試行錯誤している部分もありつつではあるけど、現時点では大局的に見て、SassなどのCSSプリプロセッサを使っているならば、BEMという命名規則は使う価値のあるものだと思う。最近だとTogetterで[このようなやり取り](http://togetter.com/li/571668)がまとめられていたけど、確かに実際に書いてみるとどう命名すれば良いか迷う場面は出てくるし、書き方が冗長だと感じる場面も多々ある。ただ、そういうのも**ある程度の慣れと割り切り、そしてCSSプリプロセッサの機能で回避できそう**な感触はなきにしもあらず。

最後に、本文の中で紹介できなかった**BEMに関して参考になるページ**をまとめてこの記事の終わりとしたい。早くBEM人間になりたい。

- [Architecting Scalable CSS // Speaker Deck](https://speakerdeck.com/csswizardry/architecting-scalable-css)
- [ちゃんとCSSを書くために - CSS/Sass設計の話](http://www.slideshare.net/hiloki/a-good-css-and-sass-architecture)
- [SassとBEM - Weblog - Hail2u.net](http://hail2u.net/blog/webdesign/sass-and-bem.html)
- [How to Scale and Maintain Legacy CSS with Sass and SMACSS - We build Envato](http://webuild.envato.com/blog/how-to-scale-and-maintain-legacy-css-with-sass-and-smacss/)
- [CSSガイドラインを翻訳してみた - 技術日記＠kiwanami](http://d.hatena.ne.jp/kiwanami/20130905/1378353853)
- [ID使っても別に問題ない - Weblog - Hail2u.net](http://hail2u.net/blog/webdesign/no-problems-using-ids.html)
- [Sass v3.3, v4.0 での変更点についてメモ \| 69log](http://kazu69.net/blog/memo/1718)
- [Experimenting with component-based HTML/CSS naming and patterns](https://gist.github.com/juno/6666298)
- [Fifty Shades of BEM — Le ministère de l'intégration](http://blog.kaelig.fr/post/48196348743/fifty-shades-of-bem)
- [Almost Profound — Sass 3.3 @at-root & BEM!](http://blog.unakravets.com/post/64113156740/sass-3-3-at-root-bem)
- [A style-guide for modular SASS development using SMACSS and BEM. — Medium](https://medium.com/objects-in-space/f6f404727)
