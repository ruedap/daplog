# <span>HerokuでWebアプリ開発を始めるなら</span><span>知っておきたいこと(2) アドオン</span>

「HerokuでWebアプリ開発を始めるなら知っておきたいこと」シリーズの第2回では、基本スペックのHerokuプラットフォームに機能を追加できる「アドオン」について書きます。このシリーズのまとめページは[こちら](/2011/05/09/ruby-heroku-web-app-development-tips-matome)。

<!-- READMORE -->


## 最小グレードのアドオンは無料

Herokuには、利用しているアプリ（プラットフォーム）に色々な機能を付け足せる「アドオン」というものがあります。

<cite>[Herokuが提供しているアドオンの一覧ページ](http://addons.heroku.com/)</cite>
<cite>[Herokuが提供しているアドオンについての日本語解説記事](http://thinkit.co.jp/story/2011/04/01/2067)</cite>

またジオシティーズを例にしてしまいますが、昔のジオシティーズはホームページ容量3MBだか5MBが無料で、その容量をアップする場合や、別途CGIプログラムを利用する場合には、有料オプションを使いました。

Herokuのアドオンも基本的な考え方はそれと同じですが、Herokuが素晴らしいのは、そのアドオンの中でも*一番低いグレードでの利用は基本的に無料*で使わせてくれます。無料の対価としてのバナー広告表示などもありません。提供されているアドオンの中には、全部のグレードが有料となっているものも一部ありますが、上記の一覧ページで「FREE」と書かれているアドオンは無料で使えます。ただし、他のWebサービスと連携するアドオンの場合、そのWebサービス先の利用料は発生することがあります。詳しくはアドオンごとに調べる必要があります。

アドオン一覧を見ると、結構な数のFREEがあります。[前回](/2011/04/29/ruby-heroku-web-app-development-tips-1)ご紹介したように、基本となるHerokuプラットフォームが無料提供されている上に、この最小グレードのアドオンが無料という点においても、Herokuはとりあえず試してみることに適していると思います。


## 利用にはクレジットカードの登録が必要

ただし、1つだけ注意点があって、アドオンを利用する場合は無料グレードであっても、最初に本人確認としてのクレジットカード情報の登録が必要ということです。アドオンを追加せず、単に無料範囲のHerokuプラットフォーム（[前回](/2011/04/29/ruby-heroku-web-app-development-tips-1)紹介した基本スペック部分）だけで利用する場合は、クレジットカード情報の登録は必要ありません。ですが、それなりに使い続けているとcronやDBのバックアップくらいは使いたくなります。実際自分がそうで、使い始めて少し経ってからクレジットカード情報を登録しました。当たり前ですが、無料グレードのアドオンを使っている限り、料金は発生しません。
下記の記事では、実際に無料グレードのcronアドオンを利用する手順を書いていますので参考にしてください。

<cite>[Herokuのcronを使って自動でTwitterにつぶやく](/2011/02/01/ruby-heroku-sinatra-cron-twitter-tweet)</cite>


## 最小構成ならアドオンも含めて無料で使える

というわけで、[前回の記事](/2011/04/29/ruby-heroku-web-app-development-tips-1)のHerokuプラットフォームの基本スペックに、最初は無料グレードのアドオンを足して使えば、結構な範囲での無料利用が可能になり、様々な新しい技術（アドオン）を試すこともできます。また、Herokuに新しく追加されたばかりのアドオンであれば、これまたベータ版として無料利用（期間は限られますが）できます。自分はまだベータ版のアドオンを利用したことはありませんが、こちらも組み合わせるとさらに使えるアドオンが広がります。

今回はアドオンについて書きました。Herokuを始めてすぐはアドオンを利用しないかもしれませんが、ある程度使い方がわかってきて「あれがしたい」「これがしたい」となったときにアドオンはお世話になる機能です。Herokuには*アドオン*という機能拡張のサービスがあるということは押さえておきたいポイントです。次回は[デプロイの簡単さ](/2011/05/01/ruby-heroku-web-app-development-tips-3)について書きたいと思います。

---

<cite>[第4回 Herokuのアドオンと外部サービスを活用しよう \| Think IT](http://thinkit.co.jp/story/2011/04/01/2067)</cite>
<cite>[Heroku \| Add-ons](http://addons.heroku.com/)</cite>
