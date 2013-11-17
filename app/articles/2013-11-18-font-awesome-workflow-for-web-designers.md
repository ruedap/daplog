# <span>Font Awesome Workflowが</span><span>PhotoshopやIllustratorでもペースト可能に</span>

[Font Awesome Workflow](https://github.com/ruedap/alfred2-font-awesome-workflow)は元々、[フロントエンド開発者向け](/2013/10/30/alfred-workflow-for-front-end-developers)に…というかクラス名を覚えられない自分のために作ったんですが、公開後になかなかの好評を得て、[Photoshopでもペーストできるようにして欲しい](https://github.com/ruedap/alfred2-font-awesome-workflow/issues/43)とか[文字コードをペーストできるようにして欲しい](https://github.com/ruedap/alfred2-font-awesome-workflow/issues/29)などのリクエストをもらったので、それらに対応した[バージョン2.0](https://github.com/ruedap/alfred2-font-awesome-workflow/blob/master/CHANGELOG.md)を昨日リリースしました。

<figure>
<a href="/assets/2013/11/18/font-awesome-workflow-for-web-designers-01.gif">
<img src="/assets/2013/11/18/font-awesome-workflow-for-web-designers-01.gif" alt="Illustrator CC上でアイコンフォントをペーストしている動作例">
<figcaption>Illustrator CC上でアイコンフォントをペーストしている動作例</figcaption>
</a>
</figure>

バージョン2.0の目玉はやはり、フロントエンド開発者だけでなく、デザイナーにとっても便利になった点で、**PhotoshopやIllustratorなどのグラフィックソフトでもペーストが可能**になりました。今回もスクリーンキャストを作ってみたので、どんな感じの動作かは上記のGIFアニメをご覧ください。これはIllustrator CC上で使用している動作例です。


## 4種類のモード

前述のグラフィックソフト上でのペーストに加えて、文字コードをペーストするモード、Font Awesomeのページを開くモード、そして従来のCSS用クラス名をペーストするモードと、全部で4種類のモードを実行時に選択できるようになりました。デフォルトのキーバインドは以下のとおりで、これらのキーバインドは設定画面でカスタマイズが可能です。

- `Enter`: CSSクラス名をペースト (HTML/CSSコーディング用、例:`fa-arrow-circle-o-right`)
- `Ctrl + Enter`: 文字参照をペースト (PhotoshopやIllustratorなどのグラフィックソフト用)
- `Shift + Enter`: 文字コードをペースト (例:`f18e`)
- `Cmd + Enter`: ブラウザで開く (例: <http://fontawesome.io/icon/arrow-circle-o-right>)

[![全4種類のモード](/assets/2013/11/18/font-awesome-workflow-for-web-designers-02.png)](/assets/2013/11/18/font-awesome-workflow-for-web-designers-02.png)

グラフィックソフトでペーストする場合は、あらかじめFont AwesomeのフォントファイルがMacにインストールされている必要があります。[公式サイト](http://fontawesome.io/)からダウンロードできるzipファイルの中から取り出すか、[ここ](https://github.com/FortAwesome/Font-Awesome/tree/master/fonts)から直接フォントファイルをダウンロードします。


## 旧キーワードの廃止

[1.0にバージョンアップしたときの記事](http://localhost:6006/2013/10/25/alfred-workflow-for-font-awesome-4)で事前に触れましたが、今回のバージョン2.0から従来のキーワード`fonta`を廃止し、Font Awesome 4.0以降のプレフィックスとして採用されている`fa`を専用のキーワードとしました。このキーワードも、前述のキーバインドと同様に設定画面でカスタマイズすることが可能です。

* * *

というわけで今回のバージョンアップでは、PhotoshopやIllustratorを使ったデザインでも[デザイニング・イン・ブラウザ](http://design-spice.com/2012/06/29/designing-in-the-browser/)でも**まったく同じUIでFont Awesomeのアイコンを選んで配置**できるようになりました。これによって、特にWebデザインでのモックアップを作るときに便利だと思うので、フロントエンドエンジニアの方だけではなくデザイナーの方にもこのFont Awesome Workflowをオススメできるようになりました。

<cite>[ruedap/alfred2-font-awesome-workflow · GitHub](https://github.com/ruedap/alfred2-font-awesome-workflow)</cite>
