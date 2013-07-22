---
layout: article
title: "<span>NekostagramとInustagramのソースコードを</span><span>GitHubに公開してみた</span>"
date: 2011-03-09
comments: true
categories: ruby
tags: ruby
published: true
---

[Nekostagram](http://nekostagram.heroku.com/)と[Inustagram](http://inustagram.heroku.com/)で使用しているファイル一式を[GitHub](https://github.com/ruedap/nekostagram)に公開してみた。技術的にはなんにもすごいことはしてなくて、さらにSassとか初めて使ってみたので、いろいろとツッコミどころ満載かもしれない。

<!-- READMORE -->

## 共通化・汎用化

最初にNekostagramを公開したときは、とりあえず動くようにすることを第一目的に、きったない書き方で殴り書きしてたんだけど、次のInustagramを作るときに、できるだけコードを共通化・汎用化させていき、最終的には現在公開しているコードのように、まったく同じ1つのRubyファイルでNekostagramとInustagramの両方を動かせるようにできた。

<cite>[ruedap/nekostagram - GitHub](https://github.com/ruedap/nekostagram)</cite>


## Gitリポジトリがゴミだらけ

なかなかGitHubに公開できなかった理由は、恥ずかしながらこれ…。

<blockquote class="twitter-tweet"><p>リポジトリの中にはpsdやらaiやらもコミットされてて、このままGitHubにプッシュしたらたぶんまずい。Herokuからpullするとpsdもaiも落ちてくるんだよなーｗ .gitignore書く前にコミットしちゃったやつってどう消すの？</p>&mdash; ルエダップ (@ruedap) <a href="https://twitter.com/ruedap/statuses/42569240515067904">March 1, 2011</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

このツイートに対して、いくつか方法を教えていただいたのだけど（ありがとうございます）、理解出来ないのもあったりして、Gitの入門書を買ってちゃんと勉強する必要があるなぁというのを痛感した次第でありんす。今回は結局どうしたかというと、強行突破してみた。複数人開発でこんなことしたら追放されそうけど、1人でしか使ってないからまぁ。

~~~ sh
$ rm -rf .git
$ git init
$ git add .
$ git commit -m 'first commit for version 2.0'
$ git push heroku master --force
$ git push github master
~~~

`--force`はやばい。自分の失敗をすべて帳消しにしてくれる。病みつきになりそう。奥の手だと思うので、良い子は使っちゃダメなやつだとおもう。

* * *

<cite>[ruedap/nekostagram - GitHub](https://github.com/ruedap/nekostagram)</cite>


[^1]: 最初の状態はひどすぎて公開できるものではなかった
