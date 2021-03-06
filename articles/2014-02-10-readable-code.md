# <span>リーダブルコードを読み終えて、</span><span>ノンデザイナーズ・デザインブックを読み返す</span>

<a href="http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/" class="e-bookCover"><img loading="lazy" src="http://ecx.images-amazon.com/images/I/51MgH8Jmr3L._CR2,2,352,498_.jpg" alt="リーダブルコード"></a>

今年のテーマは、積ん読を減らすことにした。良さそうな本があったりセールがあったりするとついつい買ってしまって、それである程度満足して読まないまま、というパターンにハマっていることが、AmazonのKindle日本上陸以降の自分の買い方で一目瞭然になってきたからである。ゆゆしき事態。

電子書籍は物理的なスペースを取るわけではないので、それが目に見えるわけではないんだけど、その電子書籍の大きな利点が積ん読の増加に拍車を掛けていることは明白である。というわけで今年は、積んでいる本を積極的に読んでいきたい。[リーダブルコード](http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/)はその1冊目。


## 汎用性の高い言葉

本書には、全体を通して良いフレーズがたくさん散りばめられている。その中でも、一番気に入ったフレーズはこれ。

> 最善の名前とは、誤解されない名前である。つまり、君のコードを読んでいる人が、君の意図を正しく理解できるということだ。
>
> <cite>[リーダブルコード](http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/) (p.39)</cite>

たとえば昨年に書いた[CSSでのBEMについての記事](/2013/10/29/block-element-modifier)の時に、もしこの本を先に読んでいたら、間違いなくこのフレーズを引用していた。自分があの方法論を気に入ったのは、まさにこの部分だったから。綺麗でも簡潔でもないんだけど、誤解を減らせそうな命名規則だった。

前述のフレーズは、「名前」の部分と「コード」の部分を適切に差し替えれば、プログラマーだけでなく、デザイナーやプランナー、編集者などにも当てはめることができて汎用性が高い。実践するのは容易ではないかもしれないけど、常に念頭に置いておきたいところ。


## 単純よりも明快

個人的によく考えるテーマとして「複雑さを解決するためのアプローチについて」がある。アイデアを練っているときも、デザインを考えているときも、文章を推敲しているときも、そしてコードをリファクタリングしているときも、それへの解決方法として、自分が最初に手を付けるのは、余分な部分を削ぎ落とすこと、つまり対象の単純化である。それについては以前[この記事でも書いた](/2013/07/26/reboooot)。

そして単純化と似ているけど別のアプローチとして、明快にする、というのが挙げられる。前述の記事の中でもジョナサン・アイブの言葉として以下を引用している。

> 単に不要なものや装飾を省くだけでは、真のシンプルさには到達できない。シンプルとは複雑さに秩序をもたらすこと。

どちらも重要なアプローチであることは間違いないし、単純かつ明快にできるのであれば、それに越したことはないけど、この2つが相反する場面に遭遇してどちらか一方を選ばなければならないという時には、自分は今までほとんどの場面で単純化するほうをよしとしてきた。そちらのほうが重要で強力だという理由で。そして、時にはそれによって、別の複雑さやわかりにくさを生んでしまっていたこともあったとも思う。反省。

本書の第1章「理解しやすいコード」を読んで、上記のようなことを考えていた。

> コードは短くしたほうがいい。だけど、「理解するまでにかかる時間」を短くするほうが大切だ。
>
> <cite>[リーダブルコード](http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/) (p.4)</cite>

単純だけど明快ではないもの、そして、単純ではないけど明快なもの、も十分にありえて、後者を実現するのは容易ではない。でも、それは自分の力不足で実現できていないだけで、単純にすることと同じくらい、明快にすることへの注力を惜しんではいけない、ということが本書を読んでいるとひしひしと伝わってくる。

> コメントをつけると「コードが長く」なるけど、そのほうが理解しやすいこともある。
>
> <cite>[リーダブルコード](http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/) (p.4)</cite>

本書のそれらの部分は、単純よりも明快に重きを置いていて、明快にするために必要な冗長さがあることを、改めて気づかせてくれる。


## 伝える

<a href="http://www.amazon.co.jp/o/ASIN/4839928401/ruedap-22/" class="e-bookCover"><img loading="lazy" src="http://ecx.images-amazon.com/images/I/41nvddaG9BL.jpg" alt="ノンデザイナーズ・デザインブック"></a>

リーダブルコードが発売されて話題になったのは2年くらい前だったと思うけど、今はもちろん、今後も色褪せない良書なのは間違いなさそう。その内容は、コードを書くときだけでなく、前述のとおりいろいろな場面で当てはめることができる。つまるところそれは「何かを伝えるという行為」であれば、何にでも応用の効くことなのかもしれない。


たとえば自分は、表題にも挙げた[ノンデザイナーズ・デザインブック](http://www.amazon.co.jp/o/ASIN/4839928401/ruedap-22/)と目的がよく似ていると感じたので、久しぶりに引っ張り出して読み返してみると、冒頭でこう書かれていたので思わずニヤリとした。他にも同じ目的の別ジャンルの本は多そう。

> 発行者はともかくとして、読者ならなおさら、重要なことが明確にレイアウトされていることを要求する。彼らは読みづらいものを読む気にはならないし、視覚的に明快で上手に配置されたものを喜ぶ。そのほうが、理解しやすいからだ。この理由から、重要な部分を目立たせ、そうでない部分は抑えなければならない。
>
> <cite>[ノンデザイナーズ・デザインブック](http://www.amazon.co.jp/o/ASIN/4839928401/ruedap-22/) (p.6)</cite>

リーダブルコードでもノンデザイナーズ・デザインブックでも、書かれていることは当たり前のことに思えるんだけど、その当たり前のことを自分の手で実現するのがむずかしい。


## 忘れる

デザインや文章の作成時によくやっている行為で、完成後にそれを忘れるために寝かせる、というのがある。たとえば[以前書いたこの記事](/2013/11/11/github-flow-blog)の中では、それについて「真夜中のラブレター現象を回避する」という言い方をした。何かを真剣に作っている時は、主観性がものすごく高まっているから、客観性を取り戻すために時間を置いてクールダウンさせている。

自分は今までコーディング時にはその行為をあまりしてこなかったけど、これはコードにおいても当てはまるようで、最後に載っている[解説](http://www.clear-code.com/blog/2012/6/11.html)のこの部分がとても明快で腑に落ちた。

> 読みやすいコードを書いて、自分が書いたコードを忘れてしまっても問題ないようにして欲しい。読みやすいコードを書こう。忘れてもいいコードを書こう。
>
> 「自分が書いたコードってどのくらい覚えているんですか？」  
> 「ほとんど覚えていないですよ。」  
> 「直すときどうするんですか？ わからなくなってるじゃないですか。」  
> 「忘れても見たら簡単にわかるように書いておくんですよ。」
>
> <cite>[リーダブルコード](http://www.amazon.co.jp/o/ASIN/4873115655/ruedap-22/) (p.231)</cite>

プログラムでもデザインでも文章でも、**忘れても大丈夫な伝え方**をしていきたい。
