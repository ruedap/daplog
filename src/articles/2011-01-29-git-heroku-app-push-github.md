# HerokuアプリをGitHubにもプッシュする

とりあえず[HerokuでHello worldができた](/2011/01/28/ruby-heroku-sinatra-hello-world)ので、GitHubにもプッシュしてHerokuアプリをネットに保存・公開してみたいなと思ったので手順を調べた。意外と簡単だった。

ちなみに、GitやGitHubの使い方に関しては[KUROIGAMEN(黒い画面)のチュートリアル記事](http://kuroigamen.com/12)（連載モノ）がわかりやすい。おすすめ。

今回の記事の完成形は[これ](https://github.com/ruedap/heroku-hello-world)。

<!-- READMORE -->


## GitHub上で新しいリポジトリを作成

まずGitHubにログインした状態で、<https://github.com/>にアクセスして右上の「新しいリポジトリ」ボタンを押す。
プロジェクト名は「heroku-hello-world」にした。これはプッシュする時のアドレスに含まれる文字列となる。

## Gitにremote先を追加

次に、リポジトリ作成後に表示されるページの「すでにGitリポジトリがありますか？」の部分を参考に、remote先を追加する。

<!-- ~~~ text -->
~~~
すでにGitリポジトリがありますか?

  cd existing_git_repo
  git remote add origin git@github.com:ruedap/heroku-hello-world.git
  git push origin master
~~~

今回の場合は上記のように表示されているので、Herokuアプリのプロジェクトディレクトリ内に移動して、以下のコマンドを実行する。

~~~ sh
$ git remote add origin git@github.com:ruedap/heroku-hello-world.git
~~~


## .gitignoreファイルの作成

もしプロジェクトディレクトリ内でアップロードしたくないファイルがあれば、プロジェクトディレクトリ直下に`.gitignore`ファイルを作成して、その中にアップロードしたくないファイル名を記述する。ワイルドカードとか使えるみたい。今回は特に無いので、`.gitignore`ファイルもなし。


## READMEファイルの作成

アップロードするファイル郡の説明用READMEを作る。これがないと、GitHubさんに「作ったほうがいいよ」的なことを言われるけど、無いとアップできないわけではない。rdoc形式やmarkdown形式などが使えるみたい。とりあえずrdocで適当に書いて、`README.rdoc`ファイルをでっちあげる。

<!-- ~~~ rdoc -->
~~~
= Heroku Hello world
HerokuでSinatraを使ってHello worldするだけの練習用
~~~


## GitHubにプッシュ

GitHubへのプッシュは、`origin`を指定する。

~~~ sh
$ git push origin master
~~~

で[自分のGitHubリポジトリ](https://github.com/ruedap/heroku-hello-world)にプッシュできる。


## Herokuにデプロイ

Herokuには今まで通り、`heroku`を指定する。

~~~ sh
$ git push heroku master
~~~

でデプロイ可能。

---

<cite>[Technical Information #4 - tomohiro.github.com](http://tomohiro.me/tips/heroku_sinatra.html)</cite>
