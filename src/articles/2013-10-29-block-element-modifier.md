# <span>BEMという命名規則と</span><span>Sass 3.3の新しい記法</span>

[BEM](http://bem.info/method/definitions/)を使った命名がとても明快で、このところHTMLやCSSを書くのによく使っている。CSSのクラス名として書く場合は、BEMをCSS用に使いやすくした[MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)という書き方を採用している。最初にこれを知ったときは「こんな汚い記述の仕方は使いたくない」と思ってたんだけど、すっかり慣れて、今ではその明快さにちょっと心酔しかけているほど。

BEMの方法論とMindBEMdingのルールについてはそれぞれの文書を読んでもらうとして、それらをひっくるめて大雑把に説明すると、BEMとは`Block`、`Element`、`Modifier`の頭文字を取ったもので、構成する要素をそのどれかに当てはめて命名していく方法。どの場合でも必ず`Block`もしくはその`Modifier`がルートにあり、その中に、所属する`Element`もしくはその`Modifier`が含まれる構成になる。

- **Block** - 構成のルートとなる要素。すべてはここから始まると言っても過言ではない。
- **Element** - `Block`に所属する子要素。必ず`Block`の中にいて単体では生きられない。
- **Modifier** - 元となる`Block`または`Element`から変化した状態を表す要素。


さらに誤解を恐れずに書くと、**BEMはオブジェクト指向に少し似ていて**、`Block`は継承元のクラスもしくはインターフェイス、`Modifier`はその派生クラス、`Element`はそれらのクラスに所属するメソッドもしくはプロパティを連想するとイメージしやすいかも。


## MindBEMding

[MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)は、そのBEMをCSSのクラス名に適用するために作られた規則で、CSS界隈でBEMと言った場合はこのMindBEMdingを指すことが多い。`Element`をアンダースコア2つ(`__`)、`Modifier`をハイフン2つ(`--`)で連結することでBEMの各要素を表現する。

<!-- ~~~ text -->
~~~
block
block__element
block__element--modifier
block--modifier
~~~

この記号の使い方は初めて見ると強烈で**人によっては拒絶反応が起きるタイプ**のもので、前述の元記事でも*Uuuugly!*とディオ並みに叫んでいる。ただ、醜さを我慢して使ってみると、この命名規則のわかりやすさ・使いやすさが実感できると思うのでぜひ試してほしい。BEM(MindBEMding)を使ってHTMLとCSSを書いてみると、例えばこんな感じ。

~~~ html
<div class="block">
    <div class="block__element"></div>
    <div class="block__element block__element--modifier"></div>
</div>
<div class="block block--modifier">
    <div class="block__element"></div>
</div>
~~~

~~~ css
.block {
  width: 100px;
}

.block__element {
  color: blue;
  background-color: white;
}

.block__element--modifier {
  color: red;
}

.block--modifier {
  width: 200px;
}

.block--modifier .block__element {
  background-color: black;
}
~~~


## BEMの明快さ

それで、CSSを書いていく上で問題になりやすいポイントとしては、その**付けられた名前から意味を読み取りづらくなりがち**というのがある。BEMのメリットの中でも大きな特長だと思うのは、**構造・命名に秩序をもたらしてくれること**で、BEMを適用するだけでその問題をある程度は解決できるのがうれしい。

例えば、以下のようなCSSのクラス名があったとしたら、ここからどのような構造や状態を想像するだろうか。この名前だけでどこまで読み取れるだろう？

~~~ css
.character-avatar-and-name-notice
~~~

CSSクラス名として主流のハイフン連結だけでは、**名前をつけた本人以外には正確に意味を読み取れないこと**が多々ある。さらにキャメルケースを使ったり、アンダースコアを使ってわかりやすくしようとする気があるなら、最初からBEMのルールを使ったほうがよりわかりやすくなると思う。BEMには記号の違いだけでなく、`Element`や`Modifier`という概念があるから。

~~~ css
.character__avatar-and-name--notice
~~~

BEMを前提にこう書かれてあれば、この名前を見ただけで「`character`というブロックに含まれる`avatar-and-name`という要素を元とする`notice`というバリエーションの要素」ということが読み取れるようになる。仮にここに変更を加える際にも、「場合によっては元になっている要素の`character__avatar-and-name`の方にも影響するかも」ということまで、**この名前を初めて見た人にも伝わる**。ところが最初の名前では、まず読み取り方からして「`character-avatar`と`name-notice`」など、人によって複数の読み方ができてしまう。

記事をここまで読んでいるならすでに、たとえば以下の名前からも単語の羅列以上に多くの情報を読み取れるようになっているのではないだろうか。

~~~ css
.setting-admin
.setting-list-item-active

/* BEM */
.setting--admin
.setting-list__item--active
~~~

後者なら、少なくとも2つがそれぞれ別のグループ（ブロック）に所属している要素ということが読み取れれば、この命名規則の趣旨がつかめていると思う。

**BEMは見た目の奇妙さと引き換えに、とても強力な明快さをもたらしてくれる。**

このBEMの名前の明快さは、HTMLの構造やCSSの設計を把握してない人が触る場合に特に威力を発揮する。例えばサーバーサイドやJavaScriptのエンジニアが仮にCSSの設計を把握していなくても、とりあえずBEMの命名規則を覚えてもらえれば**ブロック単位で維持すべきだと理解してもらえる**ので、それだけでデザインを壊してしまうリスクを結構回避できる。また命名した本人であっても、半年経ってから見たらBEMの名前はわかりやすく見えそう。

上の例ではそもそもの名前の付け方が下手だという指摘もありそうだけど、誰にでも伝わる良い名前を付けるというのはとても大変なことで、できるだけその労力を減らしたいと常々思っていて、今回のBEMの命名規則はその部分を大きく軽減・改善してくれるものだった。BEMの利点はこれだけではないけれど、一番気に入っているところを挙げるならこの部分。


## Sass 3.3の新しい記法

現在RC1で正式版のリリースが近い[Sass 3.3](https://github.com/nex3/sass/blob/master/doc-src/SASS_CHANGELOG.md)では、**BEMで記述するのに適した新しい記法**が導入される予定。前述のSCSSでの記述例を、新しい記法で書くとこういう感じになる。

<ins datetime="2014-09-28T15:34:00+09:00">最新版のSassではより完結に書けるようになっため、以下では最新の記法で書き直してあります。</ins>

~~~ scss
.block {
  width: 100px;
  
  &__element {
    color: blue;
    background-color: white;
    
    &--modifier {
      color: red;
    }
  }
  
  &--modifier {
    width: 200px;
    
    .block__element {
      background-color: black;
    }
  }
}
~~~

親セレクタを`&`で表すことは今までも出来ていたけど、それを使ってBEMのElementやModifierが表現できるようになった。出力結果のCSSは冒頭に貼ったCSS例と同じ。

最後のModifier内のElementのBlock名 `.block__` の部分の重複が気になる場合は、このような書き方で一応は回避できるがいずれもあまりスマートではない感じ。

~~~ scss
.block {
  $block: &;
  width: 100px;
  
  &__element {
    color: blue;
    background-color: white;
    
    &--modifier {
      color: red;
    }
  }
  
  &--modifier {
    width: 200px;
    
    #{$block}__element {
      background-color: black;
    }
  }
}
~~~

~~~ scss
.block {
  width: 100px;
  
  &__element {
    color: blue;
    background-color: white;
    
    &--modifier {
      color: red;
    }
  }
  
  &--modifier {
    width: 200px;
  }
    
  &--modifier & {
    &__element {
      background-color: black;
    }
  }
}
~~~

---

ページ数の多いWebサイト等では、ブロック単位でSassファイルを分けるようにしている。こうしておくと見通しが良くなるし、**ファイル名＝ブロック名**になるので、数が増えた時にうっかりブロック名を重複させてしまうミスも防止できる。

<blockquote class="twitter-tweet e-embed-twitter" lang="en"><p>BEMのBlock一覧表、実際はこんなかんじ。ここさえ被らなければどれだけスタイル定義が多くても安心。そもそもファイル単位だから被るわけナス。Blockという粒度がちょうどいい感じで、この点だけでも個人的にはBEM使う価値がある <a href="http://t.co/oyfbJpeHZw">pic.twitter.com/oyfbJpeHZw</a></p>&mdash; ruedap (@ruedap) <a href="https://twitter.com/ruedap/status/388348442306551808">October 10, 2013</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

結局のところ、BEMがどうこうというよりも、より壊れにくいCSSの書き方を求めていて、BEMの書き方は今のところそれに最も合致していたということかもしれない。**CSSはとても脆い**ので恐る恐る触るくらいがちょうどいい。百鬼夜行していいのは妖怪だけ。

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
