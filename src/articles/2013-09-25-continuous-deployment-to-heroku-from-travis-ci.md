# <span>Travis CIを使って</span><span>Herokuへのデプロイを自動化する</span>

[継続的インテグレーションができるようになった](/2013/09/02/travis-ci-coveralls-code-climate-github-badge)のなら、あとは継続的デプロイメントまでやっていただきたいし、大切なのは倍返しじゃなくて繰り返しだねってことで表題の通り。

<!-- READMORE -->

前にやろうとして調べた時は、HerokuのAPIキーを暗号化して自前でデプロイ用スクリプトを用意して…てな感じでややこしそうだったけど、今はTravis CIで正式に対応していて、コマンド一発で設定できてしまう簡単さで、驚きのあまり出向しそうになった。

<cite>[The Travis CI Blog: Introducing Continuous Deployment to Heroku](http://about.travis-ci.org/blog/2013-07-09-introducing-continuous-deployment-to-heroku/)</cite>

[HipChatに通知を送る時](/2013/09/12/travis-ci-hipchat-notifications)にも使った[travis gem](https://rubygems.org/gems/travis)からその設定を行える。

~~~ sh
$ travis setup heroku
Deploy only from ruedap/daplog? |yes| yes
Encrypt API key? |yes| yes
~~~

`travis setup heroku`を実行すると色々質問されるので、適当に答えれば設定が完了する。設定の追加で更新された`.travis.yml`をプッシュするだけでデプロイまで行ってくれるようになる。さらに複雑な設定を行いたい場合は以下のドキュメントに色々と書かれている。

<cite>[Travis CI: Heroku Deployment](http://about.travis-ci.org/docs/user/deployment/heroku/)</cite>

自分の場合は、このブログもHerokuで運用していて、実際に上記の継続的デプロイな方法を使っているけど、デフォルトの設定から少し付け足して、以下のように2つのブランチを使って本番環境とステージング環境それぞれに自動でデプロイするように設定している。

1. stagingブランチからPull Requestを送った時は、Herokuのステージング環境にデプロイする
2. masterブランチにマージ（コミット）した時は、Herokuの本番環境にデプロイする
3. 上記以外のブランチをリモートにプッシュした時は、デプロイは行わない
4. デプロイを行った時は、その後に指定のRakeタスクを実行する

これらの方針を設定した`.travis.yml`のデプロイ部分は以下のような感じ。

~~~ yml
deploy:
  provider: heroku
  api_key:
    secure: (snip)
  app:
    master: daplog
    staging: daplog-staging
  on:
    rvm: 2.0.0
  run:
  - rake redis:rebuild
~~~

上記のYAMLファイルの全体は[ここ](https://github.com/ruedap/daplog/blob/f6e123747957c9bec2e11e4d051654e03c3401e2/.travis.yml)にあるけど、このように設定することで、ヒューマンによる手動オペレーションは基本的にはリモート(GitHub)にPull Requestを送る部分だけで、あとはTravis CIが自動でテストと、ブランチがstagingならステージング環境へのデプロイもやってくれる。そのステージング環境を目視でひと通りチェックして問題が無ければ、GitHub上のマージボタンをポチッと押してmasterにマージすると再度テストが走り、無事に通過すればそのまま本番環境へのデプロイまでが自動で行われる。Oh..fantastic!

個人レベルのアプリ開発で、こんなハイテクな環境を無料でしかも超簡単な設定で使わせてもらえるとは、うっかり土下座しちゃいそうな嬉しさですね。


## 環境変数

そんな感じで未来感を味わえるTravis & Herokuの素敵な継続的デプロイ機能なんだけど、まだよく分かってないところがあっていくつかハマり中。

今まで手動で直接Herokuに向けて`git push heroku master`していた時は動いていたのに、Travis CIからの自動デプロイに切り替えたら動かなくなった部分がチラホラあって、そのほとんどがassets precompile時の環境変数がらみっぽい。

まず、[Sentry](https://getsentry.com/)というアプリのエラーを検知して通知してくれるサービスがあり、[Herokuのアドオン](https://addons.heroku.com/sentry)にもなっているので利用してて、導入すると環境変数の`SENTRY_DSN`にURLが入って、initializerでそれを参照して設定するようになっているんだけど、Travis CI上ではこれが空になってしまっていてデプロイが失敗する模様。

[このあたりのTravisのログ](https://travis-ci.org/ruedap/daplog/builds/11662127#L391)が該当部分で、じゃあ同じ環境変数をTravis上でも設定してあげればいいのかなと、`travis encrypt`コマンドを使って[前述の環境変数とその値を暗号化した上で`.travis.yml`に設定してみた](https://github.com/ruedap/daplog/blob/7b6ae0eed577739cb9785cb664947d4f461aca3f/.travis.yml#L23-L25)けど、ここで設定した環境変数は[テスト実行時は参照できる](https://travis-ci.org/ruedap/daplog/builds/11662127#L3)けど、デプロイ時はできない(?)みたいで、何度か設定の仕方を変えてやってみたけどうまく受け渡せなくてこの方法では改善できなかった。かといって、他にどうすればいいか思いつかなくて、剣道場で汗を流しながら考え中。

似たような問題として、precompile時に環境変数`RAILS_ENV`を参照して分岐する処理を書いている部分があって、デプロイ時はテスト時と違ってこの値には`production`が入っているようで、前述のように自分はstaging環境にもデプロイしているので、その時はこの環境変数には`staging`が入ってて欲しくて、どうにかしようとしたんだけど、これもちょっと試行錯誤してみたけど同じようにうまく出来なかったので剣道場(ry

今はどちらも、Travisからデプロイするようになってからは正常に動作させられてないので外してあるけど、このあたりの設定や対応方法がわかれば元に戻したいところ。もしこれについて何か知ってる人がいればぜひ情報求む、大和田常務。
