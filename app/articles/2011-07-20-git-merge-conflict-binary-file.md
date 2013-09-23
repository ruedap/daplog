# <span>マージでバイナリファイルがコンフリクトした場合の</span><span>Gitの動作と対処方法</span>


最近ブランチを使ったGit利用にチャレンジしているruedapですスラマッパギ。さて、ブランチをマージするときにコンフリクトして涙目になるんだけど、普通のソースコード（テキストファイル）なら、なんか`>>>>>>>>`みたいな記号で印を付けてくれるから、その周辺を直せばOKというのは理解した。これも結構ビクビクしながらの修正ではあるんだけども、今日は*バイナリファイルがコンフリクトしてどうすればいいのか困った*のでその備忘録。

<!-- READMORE -->

## バイナリファイルがコンフリクトした場合のGitの動作

例えばこんなマージをする状況の想定。`master`ブランチと`develop`ブランチがあったとして、それぞれのブランチに`hoge.swf`というバイナリファイルがあったとする。
`master`ブランチに`develop`ブランチをマージしてみたら、**hoge.swfがコンフリクトを起こした**とする。

~~~ sh
$ git merge develop
warning: Cannot merge binary files: hoge.swf (HEAD vs. develop)
Auto-merging hoge.swf
CONFLICT (content): Merge conflict in hoge.swf
Automatic merge failed; fix conflicts and then commit the result.
~~~

その際、マージ後のmasterブランチのワークツリーにある`hoge.swf`は、

1. マージ前のmasterブランチの`hoge.swf`なのか
2. マージ前のdevelopブランチの`hoge.swf`なのか
3. それともそれ以外の何かなのか（新たに生成されたファイルなのか）

どれだろう？という疑問が浮かんだ。また、それがどれにせよ、その後の対処方法もわからなかった。

先に結果を書くと、**今居るブランチ(master)の`hoge.swf`がそのまま残っている状態**になっていた。なので、その後の対処として、今居るブランチ(master)のバイナリファイル(`hoge.swf`)を採用したいなら、特に何もせず普通にそのままコミットすれば良い。

## 今居ないブランチ側のバイナリファイルを採用したい場合

逆に、今居ない方の**developブランチのバイナリファイル(`hoge.swf`)を採用したい**場合は、それを今のワークツリーに引っ張ってくるコマンドを打つ必要がある。ということを、[こちらの記事](http://blog.digital-squad.net/post/151034635.html)で知った。

というわけで、今回の場合で言うと、今居るのは`master`ブランチで、今居ないのは`develop`ブランチで、`$ git merge develop`で`hoge.swf`がコンフリクトしたけど、**`develop`ブランチ側の`hoge.swf`を採用したい**ということなら以下のようにする。`--theirs`オプションをつけて対象バイナリファイルをチェックアウトする。

~~~ sh
$ git checkout --theirs hoge.swf
~~~

これでワークツリーに`develop`ブランチ側の`hoge.swf`だけがチェックアウトされるので、あとはコミットするなりなんなりすればおｋと。

今回参考にした元記事では、今居るmasterブランチのバイナリを引っ張ってくる場合は`--ours`オプションを付けると出来るよと紹介しているけど、前述のとおりコンフリクトが起きた場合は、今居るブランチのバイナリファイルがそのまま残るようなので使わなさそう。

ちなみに、参考にさせてもらった記事で、コンフリクトしたファイルを確認する方法も紹介されていた。

~~~ sh
$ git ls-files -u
100644 fb3a06deeb3b07c0f2a67f44660171865c5b3692 1       hoge.swf
100644 c423f7c2ee09597edfb076b43103c1bd648e159e 2       hoge.swf
100644 14573eaf0f6b2ab537372418e20a156f357343fe 3       hoge.swf
~~~

なんとなく便利な予感がしているので、コンフリクトしたときは思い出して使えるようにしたいところ。

* * *

<cite>[Gitでマージしたバイナリファイルがconflictした場合の解決策｜WEBデザイン Tips](http://blog.digital-squad.net/post/151034635.html)</cite>
