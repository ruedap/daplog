---
layout: article
title: "<span>リガチャなアイコンフォントを</span><span>お手軽に作成する</span>"
date: 2013-09-17
comments: true
categories: fonts
tags: fonts
published: true
---

[リガチャ](http://ja.wikipedia.org/wiki/%E5%90%88%E5%AD%97)なアイコンフォントを自作しようとするとけっこう大変そうで、そのためのアプリを揃えて操れるようになったり、リガチャの仕様を把握したり、専用のCSSを書いたりする必要がある。そういった正攻法のやり方としては、[このページ](http://kudakurage.hatenadiary.com/entry/20120720/1342749116)がとてもわかりやすかった。また、実際にそのページの方法によって制作された[Ligature Symbols](http://kudakurage.com/ligature_symbols/)も魅力的。

<!-- READMORE -->

ところが自分が欲しいのは、Twitterで使っているアバターアイコンと、ブログのボタン等で使う**5〜6個のアイコンを含んだ最小のセット**で良くて、そのために前述のような本気を出して作るのは、なかなか重い腰があがらずにいたところ、アイコンフォントを手軽に生成できるサービス[IcoMoon](http://icomoon.io/app/)の中に、そのリガチャを作成する機能もあることに気がついた。[^1] それを使ってみたら、予想以上に簡単にリガチャなアイコンフォントをサクッと作れた。

[^1]: 以前は無かった気がするけど…もしかして最初からあったのかな？

<p class="dapicons" style="display: block; text-align: center; font-size: 3em; margin: 1.3em 0; color: #777;">ruedap</p>

上のはその[IcoMoon](http://icomoon.io/app/)を使って作ったリガチャなアイコンフォントで、Twitter等での自分のアバターアイコンをフォント化したもの。このブログのフッター部分でも使っているけど、たとえば上記ではHTML部分は以下のようになっている。[^2] `ruedap`の部分がリガチャ。

[^2]: 実際には見た目を変えるために`style`タグを使っているけどそこは本質じゃないので省略

~~~ html
<p class="dapicons">ruedap</p>
~~~

`dapicons`というCSSクラスにリガチャで必要なスタイル設定が記述されているんだけど、IcoMoonがリガチャなフォントファイルの生成に加えて、それらも自動でやってくれる。

<p class="dapicons" style="display: block; text-align: center; font-size: 3em; margin: 1.3em 0; color: #777;">home</p>

他に、この記事の末尾にある*ホームに戻るボタン*もリガチャアイコンで、HTML部分は以下のようになっている。こちらはさらに簡潔で、スタイルの適用はCSS側で行っているので、HTML上は何の変哲もないかんじに。`home`の部分がリガチャ。`i`タグとかも不要。

~~~ html
<nav role="navigation">
  <a href="/">home</a>
</nav>
~~~

ただ、リガチャなアイコンフォントは**IE9以下が非対応という大きなデメリット**があって、現在主流なCSSの::before擬似要素を使ったアイコンフォントに比べるとマイナーだけど、このリガチャを使う仕組み自体が面白く、HTMLの記述もシンプルになりやすく意味的にも素直に書ける。自分で専用のリガチャを作ってみたいと思っていたので、前述のサービスのリガチャ作成機能はそれにうってつけだった。 [^3] 以下ではその作成手順を簡単に解説。

[^3]: それで実際に作ってこのブログでも使っているアイコンフォントは[GitHubで公開](https://github.com/ruedap/dapicons)しているけど、自分以外の人が使うものではなさそう。公開しているのは、主に自分の複数プロジェクト間でgit submoduleを使って共有するため

## IcoMoon

[IcoMoon](http://icomoon.io/app/)を使うことを前提にリガチャなアイコンフォントを作る上で必要になるものは、[既存のアイコン](http://icomoon.io/app/#library)をリガチャにする場合は何も必要なくて、前述のアバターアイコンのように**自作アイコンをリガチャにする場合は元のSVGファイルが必要**になる。でもそれだけ。

今回は後者の場合を想定して書いていく。まず、その元となるアイコンのSVGファイルは、**IcoMoonのものをベースにして作成すると簡単**で良い。なので[IcoMoonのページ上](http://icomoon.io/app/)で鉛筆アイコンを押して*Editモード*にした上で、どれでも良いので1つアイコンを選んで詳細ウィンドウを開いて、*Download(zip)ボタン*を押してzipファイルをダウンロードする。

[![IcoMoon](/assets/2013/09/17/ligature-icon-fonts-01.png)](/assets/2013/09/17/ligature-icon-fonts-01.png)

そのzipファイルを解凍すると、選択したアイコンのSVGファイルが出てくるので、それを自作アイコンを作るためのベースのSVGファイルにする。SVGファイルの編集はそれが可能なものなら何でも良いと思うけど、自分は普段Illustratorを使っているのでそれで行った。以下のキャプチャは、ダウンロードしたSVGファイルをIllustratorで開いて、元のアイコンを削除し、そこに自作のアバターアイコンを配置しているところ。これで上書き保存する。


[![Illustrator](/assets/2013/09/17/ligature-icon-fonts-02.png)](/assets/2013/09/17/ligature-icon-fonts-02.png)

その保存したSVGファイルを、IcoMoon上の*Import Iconsボタン*からアップロードする。うまくアップロードできると、以下のように*Your Custom Icons*の欄に先ほど作ったSVGアイコンが出現する。それをクリックすると詳細ウィンドウが開くので、*Tags*のところで適切な名前をつける。今回は自分のアバターなので`ruedap`と入力した。

[![IcoMoon](/assets/2013/09/17/ligature-icon-fonts-03.png)](/assets/2013/09/17/ligature-icon-fonts-03.png)

* * *

ここからはリガチャの設定をした上でフォントを生成する手順。まず、モードを矢印マークの*Selectモード*に切り替えて、*Your Custom Icons*にある自作のSVGアイコンを選択し、ページ下部にある*Fontボタン*を押す。

[![IcoMoon](/assets/2013/09/17/ligature-icon-fonts-04.png)](/assets/2013/09/17/ligature-icon-fonts-04.png)

そうすると、フォントの設定画面に移動するので、*Preferencesボタン*をクリックして設定画面を開き、*Font Name*にフォント名を入力し、*Enable Ligatures*のチェックボックスをオンにする。フォント名は今回は`dapicons`にした。

[![IcoMoon](/assets/2013/09/17/ligature-icon-fonts-05.png)](/assets/2013/09/17/ligature-icon-fonts-05.png)

*Enable Ligatures*をオンにすると、表示されているアイコンの上部でそれに割り当てる文字列を入力可能になるので、そのアイコンフォントの**リガチャとして割り当てたい文字列**を入力する。これが今回のメインイベントで、自分のアバターなので`ruedap`と入力した。

これで完成。ページ下部にある*Downloadボタン*を押すと、今設定したリガチャなアイコンフォントが生成されて、zipファイルのダウンロードが始まる。ダウンロードしたファイルを解凍して`index.html`を開いてみると、下のキャプチャのように先ほど作成したリガチャなアイコンフォントが表示されているはず。ちゃんと表示されていれば既に利用可能状態。

[![IcoMoon](/assets/2013/09/17/ligature-icon-fonts-06.png)](/assets/2013/09/17/ligature-icon-fonts-06.png)

デフォルト状態では`data-icon`の独自データ属性を使用した指定方法がされているので、そのまま使ってもいいし、冒頭で書いたように普通のCSSクラスや[Sassから指定する](https://github.com/ruedap/dapicons/blob/6a2831d63b470f539300355e5e924d7112132d13/_dapicons-font-face.sass)ように変更してもいいと思う。その元となるリガチャ用のCSSは`style.css`に記述されている。

* * *

上記では説明を簡略化するために、アイコンを1つしか含んでないリガチャを作ったけど、実際には自分は以下のように割り当てて使っている。現在11個で**.ttfファイルは約4KB**。

[![dapicons](/assets/2013/09/17/ligature-icon-fonts-07.png)](/assets/2013/09/17/ligature-icon-fonts-07.png)

IcoMoonでは設定をブラウザが記憶しててくれるし、必要ならその情報を.jsonファイルでエクスポートすることも可能なので、**アイコンの数を最小限に留めておいて、必要になってから追加する**というやり方もしやすい。あと、[Chrome拡張機能](https://chrome.google.com/webstore/detail/icomoon/kppingdhhalimbaehfmhldppemnmlcjd)とかもある。


というような感じで、専用のアプリも専門の知識もほとんど必要なくポチポチとするだけでリガチャなアイコンフォントをお手軽に作成できるIcoMoonが素晴らしいって話でした。

<cite>[IcoMoon - Custom Built and Crisp Icon Fonts, Done Right](http://icomoon.io/)</cite>
