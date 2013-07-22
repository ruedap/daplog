---
layout: article
title: "<span>SASSIENCEのソースコードを</span><span>GitHubに公開してみた</span>"
date: 2011-06-09
comments: true
categories: ruby
tags: ruby
published: true
---

CSSのインデントを綺麗にするサービス[SASSIENCE](http://sassience.com/)のコードを[GitHubに公開](https://github.com/ruedap/sassience)してみた。

<!-- READMORE -->

## 今回もHeroku+Sinatra+Slim+Sass

[SASSIENCE](http://sassience.com/)のソースコードを公開しているリポジトリはこちら。

<cite>[ruedap/sassience at master - GitHub](https://github.com/ruedap/sassience)</cite>

今回も過去の自作Webアプリと同じで、[Heroku](http://www.heroku.com/), [Sinatra](http://www.sinatrarb.com/), [Slim](http://slim-lang.com/), [Sass](http://sass-lang.com/)の組み合わせで作っている。というか、今回は今までで[使っているライブラリが最も少なくて](https://github.com/ruedap/sassience/blob/1.0/Gemfile)、上記プラス「rack-rewrite」だけ。メイン部分の[app.rb](https://github.com/ruedap/sassience/blob/1.0/app.rb)も200行に満たないくらい小さなWebアプリ。

## 独自ドメイン割り当てとパーシャル

今回の[SASSIENCE](http://sassience.com/)で新しく挑戦したことは、実はあんまりなくて、Herokuアプリに独自ドメインを割り当てることと、Slimでパーシャルを使えるようにしたことくらい。

<cite>[Herokuアプリに独自ドメインを割り当てる（バリュードメインの場合）](/2011/05/15/ruby-heroku-web-app-value-domain)</cite>
<cite>[Herokuアプリに独自ドメインを割り当てる（ムームードメインの場合）](/2011/05/16/ruby-heroku-web-app-muumuu-domain)</cite>
<cite>[Herokuアプリでドメイン単位のリダイレクトをするには](/2011/05/17/ruby-heroku-domain-redirect-rack-rewrite)</cite>
<cite>[SinatraとSlimの組み合わせでPartialする](/2011/05/18/ruby-sinatra-slim-partial)</cite>

また、ソースコードのベースは[ハムカツを参考にさせてもらっている](https://github.com/komagata/hamcutlet)ので、興味がある人はそちらも併せてご覧いただきたい。[ハムカツ](http://hamcutlet.fjord.jp/)からi18nやAPI機能などを除いて、HTML変換部分をCSS変換に差し替えた感じ。

<cite>[komagata/hamcutlet - GitHub](https://github.com/komagata/hamcutlet)</cite>

ハムカツに比べて、SASSIENCEでの変換（Sass変換）ではエラー発生率がとても高くて結構悩んだ。対応策として、成功or失敗を表示することでユーザーに明示し、失敗した原因を推測（分岐）することで、ユーザー自身に手直ししてもらうようにした。当初こういう機能は付けるつもりがなく、成功率が高ければそもそも不要なので、出来れば無いほうが良かったんだけど、いろいろなサイトのCSSをコピペして変換してたら失敗しまくったので、仕方なく追加した。Sassは文法に厳しいのかな？

## デザインファースト

今回は、最初に技術的検証をほとんどすること無く、いきなりデザインから作り始めた。面白いパロディを思いつけたことの嬉しさもあって、画面レイアウトとかロゴとかキャッチとかを作らずにはいられなかった。また、もうひとつには、元ネタである[ハムカツ](http://hamcutlet.fjord.jp/)という技術的に参考にできるコードが公開されていることによる安心感もあった。
結果的に37signalsが提唱する、プログラミングではなくデザインから作り始める*デザインファースト*っぽくなったかも？

<cite>[プログラミングを始める前にインターフェースをデザイン - Getting Real by 37signals](http://gettingreal.37signals.com/GR_jpn.php#ch09)</cite>

デザインを先に作り始めるメリットは、やっぱり自由度が高くなることだろうか。技術的に可能かどうかをあまり意識すること無く、良いと思えるデザインやレイアウトをそのまま作り始めることができる。技術的制約がはじめからわかっていると、デザインもそれに合わせようとしてしまうかもしれない。

ただ、デザインし終えて、それを実装する段階になって色々と技術的な問題や課題が出てくるので、それをちゃんと実装できるかどうかわからないという問題（自分の技術力の問題ではあるけど）は付きまとう。実際にSASSIENCEでも、[仕様書](/2011/06/02/sassience-specification-sheet-evernote-memo)段階で思いついていたアイデアでも、技術的に無理でボツにしたものはいくつかあった。でも作り終えて振り返ってみれば、デザインを先につくるという制作行程は結構良かったと思っている。

* * *

<cite>[ruedap/sassience - GitHub](https://github.com/ruedap/sassience)</cite>
<cite>[CSSのインデントを綺麗にするサービス「SASSIENCE」を作ってみた](/2011/05/26/css-indent-nest-beauty-service-sassience)</cite>
<cite>[モテるCSS女子力を磨くための4つの心得と1つのサービス「SASSIENCE」等](/2011/05/25/css-joshiryoku-web-service-sassience)</cite>
<cite>[SASSIENCEの仕様書（Evernoteのメモ）を公開してみる](/2011/06/02/sassience-specification-sheet-evernote-memo)</cite>
<cite>[NekostagramとInustagramのソースコードをGitHubに公開してみた](/2011/03/09/nekostagram-inustagram-ruby-source-code-push-github)</cite>
<cite>[はてなスターカウンターのソースコードをGitHubに公開してみた](/2011/05/23/hatenastar-counter-ruby-source-code-push-github)</cite>
