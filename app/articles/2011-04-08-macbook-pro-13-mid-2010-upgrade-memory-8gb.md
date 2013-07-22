---
layout: article
title: "<span>MacBook Pro (13-inch, Mid 2010)のメモリーを</span>8GBに増設する"
date: 2011-04-08
comments: true
categories: mac
tags: mac
published: true
---

*MacBook Proパワーアップ計画*の第1弾として、メモリーを標準の4GBから8GBに増設する。ちなみに第2弾ではHDDを、第3弾ではバッテリーをパワーアップさせる予定。自分が使っているMacBook Pro 13インチ (Mid 2010)は発売から約1年。購入したのは、何もカスタムしていない、いわゆる「吊るし」と呼ばれるデフォルトのスペックなので、購入当時から不満ではなかったものの快適でもなかった。

今回パワーアップしようと思い立ったのは、やはり3月の地震の影響が大きい。普段パソコンを使う仕事をしていて、なおかつプライベートでもよく使うので、*これ1台があればなんとかなる*という環境を作りたくなった。今回メモリーを8GBに増設したことで、Firefox 4とVimperator 3が快適になった。詳しくは記事の一番最後に。

<!-- READMORE -->


## 購入したもの

### メモリー

メモリーの購入場所は、後述の[メモリー交換手順で参考にした記事](http://d.hatena.ne.jp/raydive/20100612/1276324464)と同じところで、ドスパラでサムスン製の「DDR3 SO-DIMM PC3-8500 4GB」を2枚購入。1個4,280円なので計8,560円。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-01.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-01.png)

<cite>[Samsung DDR3 SO-DIMM PC3-8500 4GB (サムスン) ｜DDR3 (Note用)｜ノート用メモリ｜PCパーツ通販のドスパラ](http://www.dospara.co.jp/5shopping/detail_parts.php?bg=1&br=30&sbr=471&ic=154499&lf=0)</cite>


### 00番のプラスドライバー

MacBook Proのメモリーを交換するには、本体を開ける必要があるんだけど、その時に必要になるのが、00番のプラスドライバー。下記の「VESSEL 精密ドライバーセット TD-56」（1,098円）が定番のようで、ググって参考にした数ページがこれを紹介していた。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-02.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-02.png)

<cite>[Amazon.co.jp： VESSEL 精密ドライバーセット TD-56: DIY・工具](http://www.amazon.co.jp/dp/B000CED236)</cite>

実際に使うのは、この6本のうちの00番の1本（上記画像の手前の赤いやつ）だけなので、もっとコストを落としたい場合は、単品で買うのがいいかもしれない。というわけで、今回必要になったブツの合計金額は、9,658円。


## Apple公式のメモリー交換手順

今回のメモリー増設に関しては、[こちらの記事](http://d.hatena.ne.jp/raydive/20100612/1276324464)を参考にさせてもらった。とてもわかりやすく、書かれているとおりにやってうまくいった。感謝。それはそれとして、あとから知ったんだけど、Appleが公式にMacBook Proのメモリー交換手順を解説したページを用意していた。よく「MacBook Proは開けたらその時点で保険が効かなくなる」とか聞いてた[^1]ので、まさか公式で載せているとは思わなかった。灯台下暗し。 その[Apple公式のメモリー交換手順](http://support.apple.com/kb/HT1270?viewlocale=ja_JP&locale=ja_JP)を簡単にまとめるとこんな感じかな。

1. MacBook Proに接続されているケーブル類をすべて抜く
2. システム終了から10分待つ（内部の温度が下がるのを待つ）
3. MacBook Proを裏返し、10箇所のネジを外す（右上3箇所が長いネジ）
4. 体から静電気を除去するため、MacBook Proの金属部分に触れる
5. メモリーの両側にあるレバーを外側に押し、メモリーを斜め上に飛び出させる
6. メモリーの切り込み部分を持ち、スロットから引き抜く
7. 2枚刺さっているので、2枚目も同様に引き抜く
8. 交換するメモリーをスロットに押し込み、カチッという小さな音を鳴らす
9. 同様に2枚目も指す
10. MacBook Proの裏蓋を閉じ、10箇所のネジを締める


## 実際にやってみた

MacBook Proをぽぽぽぽぽーんと開いて、実際にメモリーを交換してみた。まず、システムを終了して電源がおちている状態でMacBook Proを裏返して、10箇所のネジを外す。下の画像に映っている3箇所だけ長いネジが使われていて、残りの7箇所はすんごい短いネジが使われていた。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-03.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-03.png)

これがそのネジっ子たち。無くしやすいので[^2]、これを撮影したあとすぐにドライバーのケースの中に入れて保管した。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-04.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-04.png)

ネジを外して、MacBook Proの裏蓋を取るとこんな感じ。中央の青い基板がメモリー。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-05.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-05.png)

メモリー部分をドアップ。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-06.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-06.png)

前述の[公式手順](http://support.apple.com/kb/HT1270?viewlocale=ja_JP&locale=ja_JP)のとおり、メモリー基板の両サイドにあるレバーを、広げるようにして押しこむと、ニョキッと斜めに浮き上がる。浮き上がったら引っこ抜ける。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-07.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-07.png)

1枚目のメモリーを引っこ抜いた図。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-08.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-08.png)

2枚目も1枚目と同様のやり方で引っこ抜けるんだけど、奥まっているので1枚目と比べるとかなりやりづらい。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-09.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-09.png)

うまく引っこ抜けず、なんか斜めになっちゃったりした。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-10.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-10.png)

今回のメモリー交換作業、ここがクライマックスで一番難しかった。といっても、10秒くらい頑張っただけだけど。で、ちゃんと2枚とも引っこ抜けた。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-11.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-11.png)

何も刺さっていないメモリースロットの図。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-12.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-12.png)

新旧のメモリーを並べてみた。上がMacBook Pro純正の4GB、下が新しく刺すサムスン製の8GB。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-13.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-13.png)

メモリーを引っこ抜くのはほんのちょっとだけ苦労したけど、刺すのはたんぽぽを乗せるくらい簡単だった。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-14.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-14.png)

カチッカチッと2枚差してメモリー交換完了。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-15.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-15.png)

そして最後に、MacBook Proの裏蓋を閉めて、Mac OS Xを起動して、アップルメニューから「このMacについて」を開いて、8GBのメモリーが正常に認識していることを確認する。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-16.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-16.png)

バッチリ認識してる、やったね！ MBPのメモリー交換は思ってたより簡単だった。


## アクティビティモニタ

ちなみに冒頭で書いたFirefox 4とVimperator 3の環境について、自分の場合、常時タブを50～100個くらい開いてることが多く、そんな使い方をしているとメモリーが4GBだと、下のアクティビティモニタのキャプチャ画像のようにすぐカツカツになる。この画像の時点で、システム全体でのメモリー消費の第1位はFirefox 4で1.39GB、第2位はFirefox Plugin Processで164.4MB使っている。ちなみに、第3位はEvernoteで130.3MB、第4位はDropboxで67.6MB、第5位はTwitter for Macで55.5MB。あとよく使うMacVimは16.4MBとかなり少ない。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-17.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-17.png)

同じ状況での比較ではないので、あくまで参考程度なんだけど、基本的に同じような使い方をしていても、メモリー8GBにしたことで、下の画像のようにかなり余裕のある使いかたができるようになった。

[![](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-18.png)](/assets/2011/04/08/macbook-pro-13-mid-2010-upgrade-memory-8gb-18.png)

メモリーの空き容量を意識せずにブラウジング出来るのはとても快適、おすすめ。

* * *

<cite>[MacBook Pro：メモリの取り外し方法と取り付け方法](http://support.apple.com/kb/HT1270?viewlocale=ja_JP&locale=ja_JP)</cite>
<cite>[MacBookProメモリ増設作戦 - 日々の御伽噺](http://d.hatena.ne.jp/raydive/20100612/1276324464)</cite>

[^1]: これもホントかどうか知らない
[^2]: 実際に1個落として見失いかけた
