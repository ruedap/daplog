# GitHubで付けたタグを削除する

タグの付け方については、[この記事](/2011/01/31/ruby-heroku-sinatra-twitter-tweet)の最後の方でちょろっと書いたけど、間違って付けちゃったりしたタグを消す方法がわからなくて調べたのでメモ。

<!-- READMORE -->


## 前提

こうやって付けたタグを消したい場合の話。

~~~ sh
$ git tag -a 0.2 -m 'hogehoge'
$ git push --tags
~~~


## タグの消し方

`git tag`に`-d`オプションを付けて消した上で、GitHubのクローン用アドレスに向かって`push`すると消せるみたい。

~~~ sh
$ git tag -d 0.2
$ git push git@github.com:ruedap/hello-github.git :0.2
~~~

`git remote`に`origin`としてGitHubが登録されているなら、わざわざアドレスを打たずに`origin`でいける。

~~~ sh
$ git remote
heroku
origin
$ git tag -d 0.2
$ git push origin :0.2
~~~

* * *

<cite>[githubに間違えたタグをつけちゃったので削除 - よしだメモ](http://d.hatena.ne.jp/rudeboyjet/20091001/p1)</cite>
