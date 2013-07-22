---
layout: article
title: "Herokuでデータベースの接続情報を調べる"
date: 2011-02-18
comments: true
categories: ruby
tags: ruby
published: true
---

Herokuでデータベースの接続情報は、アプリ作成時にHeroku上の環境変数`ENV`に自動で追加されるが、これを消しちゃうと復元不可能になるっぽい。なので、アプリ作成時に情報を取得してバックアップしておくのは良いことかもしれない。

<!-- READMORE -->


## 経緯

Herokuアプリを作って色々試している頃に、`heroku config:clear`[^1]をしてしまって、`DATABASE_URL`や`SHARED_DATABASE_URL`を消してしまった。最初のうちはアプリでデータベースを使っていなかったので何も問題なかったんだけど、いざデータベースを使おうと、`ENV['DATABASE_URL']` なコードを含むアプリをpushしたら「接続情報が無いから使えないっスよ」とHerokuさんに言われる始末。さぁどうしたもんか、とHerokuのDB接続情報を取得する方法をネットで探すも見つからない。

困ったなぁとTwitterでつぶやいたら、いくつかレスポンスをいただけた。結果は冒頭で書いたとおり、一度消してしまうと復元は難しいということだけど、色々と有益な情報を教えてもらえたので、情報共有を兼ねて貼り付けておこう。レスポンスをくださった[@junya](http://twitter.com/junya)さん、[@satococoa](http://twitter.com/satococoa)さん、ありがとうございました。


## Twitterのログ

<blockquote class="twitter-tweet"><p>herokuのconfigでENVのDATABASE_URLを消しちゃってDB使えない状態になったんだけど、この値を再取得する方法ってあるのかな？</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/36437283116687361">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p>SHARED_DATABASE_URLが残ってたりしないかな RT <a href="https://twitter.com/ruedap">@ruedap</a>: herokuのconfigでENVのDATABASE_URLを消しちゃってDB使えない状態になったんだけど、この値を再取得する方法ってあるのかな？</p>&mdash; Junya Ogu®a (@junya) <a href="https://twitter.com/junya/statuses/36438834086412288">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/junya">@junya</a> レスポンスありがとうございます。deprecateなheroku config:clearを発動しちゃったんで綺麗サッパリ消えちゃて・・ｗ</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/36439838085484544">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/ruedap">@ruedap</a> なるほど〜。IRCかチケットで聞けばすぐに再設定してくれそうですけど、アプリ作り直したほうが簡単かもですね。 http://bit.ly/hAN7VL</p>&mdash; Junya Ogu®a (@junya) <a href="https://twitter.com/junya/statuses/36440193863122944">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/ruedap">@ruedap</a> heroku consoleでコンソールつないで、YAML::load(open(&#39;config/database.yml&#39;, &#39;r&#39;).read)で情報とれるかも・・・？</p>&mdash; Satoshi Ebisawa ☃ (@satococoa) <a href="https://twitter.com/satococoa/statuses/36442019895320576">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/satococoa">@satococoa</a> ありがとうございます。Sinatra+DataMapperで使っててymlファイルとか作ってないんですー。もし作ってたらconsoleから取れるんですね〜惜しいことしたｗ 今後の参考にさせてもらいます！</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/36443382213509120">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/ruedap">@ruedap</a> config/database.ymlって、herokuは勝手に上書き or 作成していると思ったんですが、だめでしたか〜、ドンマイです！</p>&mdash; Satoshi Ebisawa ☃ (@satococoa) <a href="https://twitter.com/satococoa/statuses/36443619254607872">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/satococoa">@satococoa</a> あ、そうなんですか！ {&quot;production&quot;=&gt;nil} が返ってきました。yml自体は自動生成されてるんですねー勉強になりました！</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/36444960580440064">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/satococoa">@satococoa</a> <a href="https://twitter.com/ruedap">@ruedap</a> その手があったかと思ってRailsアプリで試してみましたが、config:clearのタイミングでdatabase.ymlも更新されてしまい設定情報は空になっていました。残念。</p>&mdash; Junya Ogu®a (@junya) <a href="https://twitter.com/junya/statuses/36444928280109056">February 12, 2011</a></blockquote>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/junya">@junya</a> <a href="https://twitter.com/satococoa">@satococoa</a> なるほどー… たぶん僕みたいなミスがあるからconfig:clearはdeprecateになったんでしょうねｗ 以後気をつけよう.. ありがとうございます</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/36446363038257152">February 12, 2011</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


## まとめ

- `SHARED_DATABASE_URL`が残っていれば、デフォルト状態では`DATABASE_URL`と同じ情報がそこには書き込まれている
- [Herokuのサポート](https://support.heroku.com/home)に聞けば答えてくれるかもしれない。ただし、もちろん英語
- 支障がなければ、アプリを作り直してリネームするのが手っ取り早い（実際この方法を選んだ）
- コンソールからYAMLのクラスメソッドを使えば値を参照できる。ただし、`config:clear`を発動した時点で消えてしまうので今回の場合は参照できない
- Herokuは`config/database.yml`を自動生成する

というわけで、今回自分は「アプリを作り直してリネームする」という方法を選んだ。GitHubにもアップロードしていたので、別フォルダに`clone`して、`heroku create`で適当な名前をつけて、元アプリの名前を一旦別の名前にして、`clone`の方を元の名前にする。

あとは、pushして、`heroku config:add`で必要な環境変数を追加して、`heroku config:add TZ=Asia/Tokyo`でタイムゾーンを日本時間にして、Herokuの管理画面からアドオンを追加した。結構簡単に複製出来ちゃう。

* * *

<cite>[Herokuで稼働中のアプリのDB名を調べる方法 - 今日もスミマセン。](http://d.hatena.ne.jp/snaka72/20100915/1284527221)</cite>

[^1]: deprecateになっているので将来的には使えなくなるはず
