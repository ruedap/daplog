# Gitでフォントを管理する

今も昔もフリーフォントのカルチャーはデザイナー界隈では根強く、最近では欧文フォントだけでなく、[M+ Fonts](http://mplus-fonts.sourceforge.jp/)や[はんなり明朝](http://typingart.net/)などの和文フォントまで無料でダウンロードできてとても有り難いことです。ただ、それらを創作やビジネスとして利用させてもらって外部に公開する場合は、個々のフォントのライセンスについて把握しておかなければなりません。

Gitのブランチ機能を使えば、これを楽にできるのではと思いついて、半年ほど実践してみたところ、思いついた時に想定したほどの便利さではなかったものの結構いい感じなので、そのやり方をひと通り紹介してみます。

文章が長くなりそうなので、この方法の何がメリットなのかを先に列挙しておくと、

- どこのページからダウンロードしたか、一言メモなどをフォントごとに記録しておける
- 商業利用可、個人利用のみ、その他、などのライセンス別にフォントを管理できる
- PhotoshopやIllustratorなどで使う際、そのライセンス単位で簡単に切り替えられる
- 管理下のフォントが1つもインストールされていない状態を簡単に再現できる
- それらの切り替えによって、Web Fonts系のブラウザー確認作業が容易になる
- Dropboxを使えば複数マシン間でフォントを共有できて、バックアップも兼ねられる

などがあります。お察しの通り、**視覚的な意味での管理ではなくファイル的な意味**です。

## ライセンス別のブランチ

まず最初にフォント管理用のGitのリポジトリを作る必要がありますが、自分は普段Macを使っていて、以下の場所にリポジトリを作りました。

~~~ sh
/Users/ruedap/Library/Fonts
~~~

Macが自動でフォントを読み込んでくれるフォルダはいくつかあって、それについては[こちらの記事の「フォントのインストール場所」の項](http://www.dtp-transit.jp/font/post_1303.html)がわかりやすいです。今回のGitを使ったフォント管理の場合は、**システムで使ったり重要なフォントの入ったフォルダは避けた方が良い**です。ブランチによってはフォントが全部消えた状態になりますので。

で、そのブランチですが、自分のところではこんな感じのブランチを作ってあります。

~~~ sh
$ git branch
  0-empty
  1-public-domain
  2-commercial
  3-personal
* master
~~~

もっと細かく分けていた時期もあったんですが、統廃合を繰り返した結果、現在は**空っぽ、パブリックドメイン相当、商用利用可、個人利用のみ、の4つ**にブランチを分けています。プレフィックスに数字を振ってあるのは、このあとのマージでわかりやすくするためです。masterブランチはあってもなくても良いです。

入手したフォントについて<strong>ライセンス的にどのブランチに該当するか</strong>をその時に調べて、そのブランチに切り替えた上で、フォントをコミット（インストール）していきます。

## 入手元URLを付けてコミット

フォントファイルをコミットする際に、必ずコミットメッセージの**1行目にフォント名**を、3行目に**ダウンロードしたページのURL**を書くようにしています。例えば、最近ダウンロードした[Canter](http://fontfabric.com/canter-free-font/)というフォントのコミットログは以下のようになっています。

~~~ sh
$ git log --grep canter -i
commit 338a35a2b72b3fe485ff3b48975e0d5a19521def
Author: ruedap
Date:   Sat Sep 28 14:25:08 2013 +0900

    Canter

    http://fontfabric.com/canter-free-font/
~~~

経験上、ダウンロードしたフォントを適当にポンポンとインストールしていると、いざ使う時にそれがどこから入手したフォントなのか高確率でわからなくなってしまっているので、それを避けるために入手した時にメモるようにしています。コミットメッセージにはフォント名と入手元URL以外に、どんなシチュエーションで使うと良さそうかとか、そのフォントが実際に使われているいい感じのサイトのURLを併記するとか、そんな感じでちょっとしたメモを書いたりすることもあります。

前述の通り、grepすればコミットメッセージを簡単に検索できるので、タグ的な使い方をするのもありです。自分の場合だと、Google Web Fontsの中からよく使いそうなものをダウンロードしてインストールしてあって、それには**GWF**というプレフィックスを付けているので、この場合は抽出が容易です。が、この使い方は実際はあまりしていません。ここは何か良いアイデアが他にありそうだけど、今のところ思い至らず…

~~~ sh
$ git log --oneline --grep gwf -i
6205bf5 [GWF] Neuton
47fca9b [GWF] Fjalla One
f912a7f [GWF] Crete Round
07502bc [GWF] Bitter
512da01 [GWF] Archivo Narrow
d98f00d [GWF] Trocchi
16a576a [GWF] Source Sans Pro
4a93746 [GWF] Karla
2354d3f [GWF] Donegal One
e91b34c [GWF] Cookie
db718f2 [GWF] Ubuntu
1b297c0 [GWF] Cabin
b6ecd1c [GWF] Playfair Display
d5fc912 [GWF] Bree Serif
014233c [GWF] Montserrat
d7b1009 [GWF] Lora
3aa25a1 [GWF] Noticia Text
9fc7795 [GWF] Cherry Swash
0313056 [GWF] Roboto
3ffef86 [GWF] Alegreya SC
450a45a [GWF] Lato
d03454e [GWF] Titillium Web
8b6f952 [GWF] PT Sans
8bb8b66 [GWF] Merriweather
(snip)
~~~

## マージしてまとめる

個別のブランチにコミットしただけでもライセンス別に使えるのですが、マージしてまとめた方がより便利だと思います。まとめるというのは、

1. パブリックドメイン相当のフォントは、商業利用可や個人利用のみの場合にも含める
2. 商業利用可のフォントは、個人利用のみの場合にも含める

というのをマージで実現することです。プレフィックスの番号を付けてるのはこのためで、**小さい番号から大きい番号へマージしていく**ようにすれば、これが簡単だからです。

~~~ sh
$ git checkout 2-commercial
$ git merge 1-public-domain
$ git checkout 3-personal
$ git merge 2-commercial
~~~

こうすると、個人利用のみ(3-personal)のブランチの中に、商業利用可(2-commercial)やパブリックドメイン相当(1-public-domain)のフォントを簡単に含めることが出来ます。

## ブランチ切り替えでフォント入れ替え

PhotoshopやIllustratorを起動する前に、ブランチを目的のライセンスに切り替えておけば、そのライセンス的にクリアしているフォントのみがインストールされている状態になるので、作業する上で**このフォントは商業利用で使えるフォントかどうか**などを考えなくて良くなります。

これが、この管理方法を思いついた時に便利そうだと感じた一番の理由ですが、実際に使ってみると思ったほどではありませんでした。それは、制作時は商業利用可(2-commercial)のブランチだけで良いことが多く、わざわざパブリックドメイン相当(1-public-domain)のブランチや、個人利用のみ(3-personal)のブランチに切り替えてまで使いたいフォントがほとんど無いことが原因でした。自分の場合は管理しているフォントの数がまだ多くないので、(1)や(3)のタイプのフォントが増えてくれば、また違ってくるのかもしれません。

ただ、前述したとおり、よく使うGoogle Web Fontsのフォントをインストールしていて、PhotoshopやIllustratorを使う場合はそれらのフォントがコミットされているブランチで良いのですが、HTMLをブラウザーで確認する場合はインストールされていると都合が悪い場合があります。その時に、**空っぽ(0-empty)のブランチに切り替えればそれらのフォントがインストールされてない状態を簡単に作り出せる**ので、これは結構重宝しています。

## push/pullでバックアップ・共有

最後の大きなメリットとして、分散型リポジトリの機能を使って容易にバックアップ・共有が行える点があります。

GitHubやBitbucket等のホスティングサービスへpushすることは、ライセンスやファイルサイズ的に良くないと思いますが、自分はDropboxにbareリポジトリを作成してそこにpushしてバックアップし、複数のMac間で共有しています。

~~~ sh
$ git remote -v
origin	/Users/ruedap/Dropbox/Git/Materials/fonts.git (fetch)
origin	/Users/ruedap/Dropbox/Git/Materials/fonts.git (push)
~~~

前述のマージと同じタイミングでpushしてバックアップしておくと良さそうです。

~~~ sh
$ git checkout 2-commercial
$ git merge 1-public-domain
$ git push origin 2-commercial
$ git checkout 3-personal
$ git merge 2-commercial
$ git push origin 3-personal
~~~

共有(pull)する側のMacでは、普段のGitの時と同じようにcloneして該当するブランチに移動するだけです。これだけで元のMacと同じフォント環境をどこにでも再現できます。

~~~ sh
$ cd ~/Library/Fonts
$ git clone ~/Dropbox/Git/Materials/fonts.git .
$ git checkout 2-commercial
~~~

自分は今のところ、このフォント共有の方法を個人でしか使っていませんが、**チーム単位やプロジェクト単位で全員が同じフォントを使える状態にする**というのにもこの方法は良いかもしれないと想像してたりもします。

---

こんな感じで、まだ荒削りな香りがぷんぷんしますが、しばらく使っていて悪くなさそうなフォント管理方法な気がしたので、実例を交えて紹介してみました。

<cite>[Mac ハンドブック：Font Book](http://support.apple.com/kb/HT2509?viewlocale=ja_JP)</cite>
