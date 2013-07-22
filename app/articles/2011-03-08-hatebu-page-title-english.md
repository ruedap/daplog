---
layout: article
title: "<span>はてブページのタイトルが</span>英語版タイトルになってしまって直せない"
date: 2011-03-08
comments: true
categories: web
tags: web
published: true
---

下のキャプチャ画像のとおり。はてブプラグインのタイトル編集機能を使って日本語タイトルに戻しても、すぐ英語版の方に戻ってしまう。Sinatraのi18n用ライブラリ[sinatra-r18n](http://r18n.rubyforge.org/sinatra.html)を今回から使い始めたのが関係していると思うけどよくわからず。

[![はてブページのタイトルが英語版に](/assets/2011/03/08/hatebu-page-title-english-01.png)](/assets/2011/03/08/hatebu-page-title-english-01.png)

<!-- READMORE -->

## Inustagramのはてブページのタイトルがなぜか英語の方

今回[Inustagram](http://inustagram.heroku.com/)を公開してすぐに、1つのミスを犯した。そして、それは未だに解決できていない。Inustagramでは公開時から、訪問者のブラウザの言語設定で英語版と日本語版の表示を切り替えるようにしていた。で、これが裏目に出たのか、上のほうで張っているInustagramはてブページのキャプチャ画像のとおり、[Inustagramのはてブページ](http://b.hatena.ne.jp/entry/inustagram.heroku.com/)がなぜか英語版の方のタイトルで登録されるようになった。

以下はそれぞれ、NekostagramとInustagramのはてなブックマークのページなんだけれど、前者Nekostagramの方は日本語のタイトルだけど、後者Inustagramの方は英語のタイトルが付いてしまっている。

<cite>[はてなブックマーク - Nekostagram - ねこ大好き専用Instagram](http://b.hatena.ne.jp/entry/nekostagram.heroku.com/)</cite>
<cite>[はてなブックマーク - Inustagram - Dog Lovers Instagram Viewer](http://b.hatena.ne.jp/entry/inustagram.heroku.com/)</cite>

で、自分自身で一番最初にブックマークしたときは、両方ともはてブページには日本語のタイトルが付いた（と思う）のだけれど、Inustagramの方だけそれ以降のどこかのタイミングで英語タイトルになったまま戻らなくなった。

ブラウザに表示されているHTMLタイトルは日本語だし、[Tombloo](https://github.com/to/tombloo/wiki)や[Taberareloo](https://chrome.google.com/extensions/detail/ldcnohnnlpgglecmkldelbmiokgmikno?hl=ja)などのブックマーク系プラグインであれば日本語タイトルとなるんだけど、Inustagramのサイトに設置してある公式はてブボタンや公式プラグイン（試したのはFirefox版）だと、ボタンを押してタイトルを取得した時点で既に英語タイトルとなっている。

この件に関して、もし何かご存じの方がいたら教えてもらえると助かります。

