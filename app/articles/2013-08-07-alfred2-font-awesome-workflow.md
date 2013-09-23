# <span>Font Awesomeのアイコンフォントを検索できる</span><span>Alfred 2のWorkflowを作ってみた</span>

[ブログの再開](/2013/07/26/reboooot)が2年ぶりだったけど、[作ってみたシリーズ](http://ruedap.com/)も同じく2年ぶり。お久しぶり。さて今回は、ものすっごくニッチなツールだけど、[Font Awesome](http://fontawesome.io/)を使ってる人で[Alfred](http://www.alfredapp.com/)を使ってる人には喜んでもらえる気がする。イコール自分のことなんですけどね。

あのアイコンフォントのクラス名を全然覚えられなくて、アイコンの数も300個以上あって把握できなくなっていて、毎回Font Awesomeのサイトを開いて探すのも面倒なので、 **Font Awesomeのアイコンをインクリメンタルサーチしてそのクラス名をペーストできる** [Alfred 2用のプラグイン](https://github.com/ruedap/alfred2-font-awesome-workflow)を作ってみた。

百聞は一見に如かず、どんなものかは以下のスクリーンキャストをご覧ください。


<figure>
<a href="https://github.com/ruedap/alfred2-font-awesome-workflow">
<img src="http://gifzo.net/ZqCN4wKUcq.gif" alt="Font Awesome Workflow for Alfred 2">
<figcaption>Font Awesome Workflow for Alfred 2</figcaption>
</a>
</figure>


前から欲しいとは思ってたんだけど重い腰があがらなくて、でも先週、エンジニア界隈で人気のポッドキャスト[Rebuild.fm #16](http://rebuild.fm/16/)を聴いていたら「Font Awesomeって便利だよね〜」という話が出てきて、「んだんだ」と同意しつつ欲しかったのを思い出したのでｶｶッっと。

この[@miyagawa](https://twitter.com/miyagawa)さんの[ポッドキャスト](http://rebuild.fm/)はエンジニアの人はもちろん、Webに携わる人なら役立つ内容の話が多くて、且つ、毎回その時のWeb界隈でホットな話題を扱ってて、トーク自体もまったりしつつ面白くて、前述の第16回などはデザイン寄りの話だったりもして、個人的に今一番楽しみなポッドキャスト。おすすめ。


<!-- READMORE -->


## 使い方

インストールは、[GitHubのページ](https://github.com/ruedap/alfred2-font-awesome-workflow)から「**Font Awesome.alfredworkflow**」をダウンロードして、そのファイルをダブルクリックしてAlfred 2にインポートするだけ。ただし、Workflow機能を使うには[Powerpack](https://buy.alfredapp.com/)（有料）が有効になっている必要がある。インストールが正常に行われると以下のように、Workflowの設定画面にFont Awesomeが出現する。

[![Workflowの設定画面](/assets/2013/08/07/alfred2-font-awesome-workflow-01.png)](/assets/2013/08/07/alfred2-font-awesome-workflow-01.png)

使い方は、前述のスクリーンキャストを見てもらうのが一番わかりやすいけれど、文章でも説明すると、このWorkflow用のキーワードが`fonta`なので、それに続けて検索したい単語（アイコンのクラス名の一部）を入力すれば、その入力した文字ごとにインクリメンタルサーチが行われる。例えば、以下のような感じ。

- `left`を含んだアイコンを検索したい場合は、`fonta left`と入力する
- `left`と`arrow`を含んだアイコンを検索したい場合は、`fonta left arrow`または`fonta arrow left`のどちらでもOK
- `fonta `（末尾に半角スペースを含む）とだけ入力した状態では、全アイコンがリストアップされている状態になる

目的のアイコンを見つけたら<kbd>Enter</kbd>キーを押すと、そのアイコンの**CSSのクラス名がクリップボードにコピーされて、尚且つ、最前面にあるアプリ（エディタ）にペースト**される。

おまけ機能として、**<kbd>Ctrl</kbd>キーを押しながら**<kbd>Enter</kbd>キーを押すと、選択中のアイコンのFont Awesomeページを開くことができる。例えば、前述のスクリーンキャストの中で選択していたアイコンで<kbd>Ctrl + Enter</kbd>キーを押すと、[このページ](http://fontawesome.io/icon/circle-arrow-left/)が開かれる。



## オプション

**ペーストの無効化** : <kbd>Enter</kbd>キーを押した際に、最前面アプリへのペーストは行わず、クリップボードへのコピーだけを行いたい場合には、Workflowの設定画面を開いた上で、

1. 「Copy to Clipboard」をダブルクリックして設定ウィンドウを開く
2. 「Automatically paste to front most app」をオフにしてペーストを無効にする

[![ペーストを無効に](/assets/2013/08/07/alfred2-font-awesome-workflow-02.png)](/assets/2013/08/07/alfred2-font-awesome-workflow-02.png)



ペーストのタイミングを自分でコントロールしたかったり、エディタによってはうまく貼り付けられなかったりする場合は、このオプションを使ってもらうと良さそう。

他にも、`fonta`キーワードを変更することや、おまけ機能の<kbd>Ctrl + Enter</kbd>の<kbd>Ctrl</kbd>部分を他の修飾キーに変更することも可能。Workflow設定画面のそれぞれの場所を適当にダブルクリックしてもらったら変更方法が分かると思う。


## おすすめWorkflow

ここからは余談だけど、AlfredのVer.2から搭載されたこのWorkflow機能はとても便利で、且つ、自分でWorkflowを作ることも容易にできるようになっている。ちょっとしたものなら設定画面のGUIから作ることが可能で、コードが必要な場合は**Ruby, Python, Perl, PHP, Bash, Zsh等の言語を使って作ることができる**。もっと言語の種類はあるかもしれない。

自分は普段Rubyを使っているので、今回のWorkflowはRubyで書いている。しかも、[RubyでWorkflowを開発するためのテンプレート](https://github.com/zhaocai/alfred2-ruby-template)を作ってくれている人が居たので、それを利用することで容易に作ることができた。あと、Workflowの調査中に見かけたけど、Pythonで作る場合は[このモジュール](https://github.com/phyllisstein/alp)を使うと便利らしい。

そんな感じで、使うのも作るのも簡単で超おすすめなWorkflow機能だけど、まだAlfred 2が登場してから日が浅いこともあってあんまり使われてない気もするので、自分が普段使っていて**もう手放せないほど便利だと思うWorkflow**を厳選して3つほど紹介。

* * *

[![Google Translate Workflow](/assets/2013/08/07/alfred2-font-awesome-workflow-03.png)](http://florianpellet.com/alfred/)

### Google Translate Workflow

与えた文字列のGoogle翻訳結果のページを開いてくれる機能は、最初からAlfredに搭載されているけど、この[Google Translate Workflow](http://florianpellet.com/alfred/)は、**リアルタイムに翻訳結果を取得してAlfred上に表示**してくれる。デフォルトでは、英語・フランス語・スペイン語の3言語が同時に翻訳されるようになっているけど、自分はちょっと改造してスペイン語を日本語に変更してある。こういう修正が容易なのもWorkflowの良いところ。翻訳結果のどれかで<kbd>Enter</kbd> を押すとその文章がクリップボードにコピーされる。元からある翻訳結果ページを開く機能（一番下）も残してあるので、Google翻訳のページを開きたい時はそれを選択している。基本的に翻訳は、英語を日本語か、日本語を英語に翻訳したいだけなので同時に翻訳結果を表示してくれると、Google翻訳ページのように言語を選択する煩わしさも無くなる。

Workflowで便利なのはほとんどがこのタイプで、今までわざわざブラウザで開いて見ていたものを、**Workflowを使うことでAlfred上から移動することなくその場でリアルタイムに結果が得られるようになった**のが、Alfred Ver.1からの大きな進化。

* * *

[![Dash Workflow](/assets/2013/08/07/alfred2-font-awesome-workflow-04.png)](http://kapeli.com/dash)

### Dash Workflow

[Dash](http://kapeli.com/dash)というドキュメントビューアーなMac Appが便利なのは[エンジニア界隈では有名](http://d.hatena.ne.jp/naoya/20130218/1361171277)だと思うけど、そのDashの検索をAlfred上から行うためのWorkflowが公式に提供されている。AlfredのVer.1でも同じようなことはできるけど、前述のGoogle翻訳と同じように、Ver.2のWorkflow版ではDashの検索結果がAlfred上でリアルタイムに表示される。上記のキャプチャ画像では、DashでSassのドキュメントの中から`satu`という文字列を含む関数を検索している。さらにDash.app上でもAlfredでキーを打つ毎にリアルタイムに結果が反映されているので、サブディスプレイにDash.appを表示しているとより便利かもしれない。

* * *

[![AlfredTweet 2](/assets/2013/08/07/alfred2-font-awesome-workflow-05.png)](http://dferg.us/alfredtweet-2/)

### AlfredTweet 2

この[AlfredTweet 2](http://dferg.us/alfredtweet-2/)は前述の2つのようにWorkflowだから便利ってほどではないんだけど、AlfredがVer.1の頃から愛用していて、Twitterのタイムラインを見ずに文字通り独り言のようにツイートだけをする場合には手軽で良い。Workflow的な機能としては、`mentions`とキーワードを入れると最近のメンション一覧が見れたり、`lists`とキーワードを入れると自分が作成したリストの一覧が見れたりもするけど、自分はあんまり使ってない。あと上のキャプチャ画像でも見えている、文字数制限のカウントが日本語に対応できてないのも微妙なところ。ツイートするだけなら特に不満が無いので常用してるけど、このWorkflowに関してはもっと便利に出来そうな予感はしている。だれか、かいりょう、たのむ。

* * *

ド定番な有名どころの紹介になっちゃたけど、他にもWorkflowは結構いろいろと作られているので、[ここ](http://veadardiary.blog29.fc2.com/blog-entry-4425.html)とか[ここ](http://www.alfredworkflow.com/)あたりから自分の欲しいWorkflowを探すと良さそう。そして、プログラミングがちょっと出来るなら作ることも難しくはないので、自分の欲しいものがなければ作ってみるのも面白いかも。

<cite>[ruedap/alfred2-font-awesome-workflow · GitHub](https://github.com/ruedap/alfred2-font-awesome-workflow)</cite>
