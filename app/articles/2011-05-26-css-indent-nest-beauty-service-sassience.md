---
layout: article
title: "<span>CSSのインデントを綺麗にするサービス</span><span>「SASSIENCE」を作ってみた</span>"
date: 2011-05-26
comments: true
categories: sass
tags: sass
published: true
---

[昨日のパロディ記事](/2011/05/25/css-joshiryoku-web-service-sassience)は盛大にスベってしまったので、今日は真面目に[SASSIENCE ～ 世界が嫉妬するCSSへ](http://sassience.com/)の紹介記事を書きたいと思います。

[![SASSIENCE ～ 世界が嫉妬するCSSへ](/assets/common/logo-sassience.gif)](http://sassience.com/)

今回のWebアプリは、制作はいつもどおり1人でしたが、完成後に数人の方に見ていただいて感想やツッコミをもらい、公開前にブラッシュアップするということを初めて行いました。協力していただいた方々へのお礼も兼ねて、サービスの概要や公開に至るまでの過程を紹介します。

<!-- READMORE -->

## SASSIENCE（サシエンス）とは

[SASSIENCE](http://sassience.com/)は、簡単に言えば*CSSのインデントやネストを綺麗に整形するサービス*です。簡単に言わなくても、それだけの機能しかありません。トップページの画面中央の入力フォームに、綺麗にしたいCSSのデータをペーストして、好みの2タイプ（括弧の綴じ方の違い）を選ぶと、インデントとネストが綺麗に整形されます。また、入力データがCSSの記法として正しくない場合は変換に失敗し、その原因予想を提示するので、簡易的なバリデータとしても利用できます。ただし、*変換失敗時の原因予想はあくまでも予想*なので、的外れなこともあります。この変換技術には、CSSを簡潔に記述できる[Sass](http://sass-lang.com/)というRubyのライブラリを利用しています。


## HTMLのインデントを綺麗にするサービス「Ham Cutlet」

[SASSIENCE](http://sassience.com/)内の紹介文でも触れていますが、このサービスは、HTMLのインデントを綺麗にするサービス[Ham Cutlet](http://hamcutlet.fjord.jp/)（通称ハムカツ）を参考にして作りました。ぶっちゃけ参考にしたというレベルではなく、パクリという名のオマージュです。 &copy;日常第5話

[以前の記事](/2011/05/06/ruby-heroku-web-app-development-tips-8)でも触れていますが、このハムカツを作った[フィヨルド](http://fjord.jp/love/534.html)という会社は自社開発のWebアプリをオープンソースにしていて、今回参考にさせてもらったハムカツも例外ではなく[ソースコード](https://github.com/komagata/hamcutlet)が公開されています。このソースコードを読ませてもらって、どういう仕組みで動いているのかを知ることで、今回のSASSIENCEを思いつき、制作してみました。

また完成前には、ハムカツ作者の[@machida](http://twitter.com/#!/machida)さん、[@komagata](http://twitter.com/#!/komagata)さんのお二人に「こんなにパクッちゃいましたけど大丈夫ですか？」的なニュアンスでSASSIENCEを見て頂きましたが、とても好意的な感想をいただけて本当に嬉しかったです。というわけで、SASSIENCEはハムカツおよびフィヨルドのオープンソース無くしては生まれなかったサービスです。この場を借りてお礼申し上げます。

<cite>[フィヨルドはインデントに困った女子大生を救います - FJORD, LLC（合同会社フィヨルド）](http://fjord.jp/love/814.html)</cite>

自分もフィヨルドを見習って、近いうちにSASSIENCEのソースコードをGitHubに公開しようと思っています。


## 公開直前のブラッシュアップ

さらに今回は、公開前（1週間前くらい）に数人の方に*Webアプリを実際に触ってみてもらって、感想やツッコミなどのフィードバックをもらう*ということを初めて行いました。

今までのWebアプリ（[Nekostagram](http://nekostagram.heroku.com/)や[はてなスターカウンター](http://hatenastar.heroku.com/)等）では、実際に公開するまで誰にも見せずに作っていたので、公開してみてから「ああすればよかった、こうすればよかった」というのが結構あったのですが、今回は事前に見てもらって率直な感想をもらうことで、また、*自分の中で不安だった部分を質問させてもらってどう思ったかを教えてもらう*ことで、迷っていたところを明確にすることができました。

前述の[@machida](http://twitter.com/#!/machida)さん、[@komagata](http://twitter.com/#!/komagata)さんに加え、[@func09](http://twitter.com/#!/func09)さん、[@jishiha](http://twitter.com/#!/jishiha)さん、[@monoooki](http://twitter.com/#!/monoooki)さん、[@milk1000cc](http://twitter.com/#!/milk1000cc)さん、[@deeeki](http://twitter.com/#!/deeeki)さんに見ていただきました。お忙しい中で時間を割いていただきましてありがとうございました。

個人的に不安だったポイントとして、*このSASSIENCEのサイトを見て、某花の王様が販売するアジア風シャンプーが元ネタだと伝わるかどうか？*というのがありました。今回質問した方々の多くはすぐ元ネタをわかってもらえて楽しんでもらえたようでした。また、わからなかった場合でも化粧品的なコンセプトに感じて美しいサイトとの感想をいただいたので、デザインはそのままで行こうという自信に繋がりました。


## 公開後のIEでの不具合

公開前に発見はしていたものの原因がよくわからずに困っていたIE7での不具合が1つあって、それについてSASSIENCE公開後にTwitterで質問ツイートしました。それに対して、[@uupaa](http://twitter.com/#!/uupaa)さんと[@mongorian_chop](http://twitter.com/#!/mongorian_chop)さんがレスポンスをくださって、予想される原因や場所などを教えてもらうことができました。ありがとうございます。


## まとめ

今回は多くの人に助けられて公開できたWebアプリとなりました。また、実際に利用していただいた方々のツイートや[ブックマークコメント](http://b.hatena.ne.jp/entry/sassience.com/)を見ていると、ネタとして笑ってもらえて、そこそこ便利なツールとしても使ってもらえてそうなので、嬉しい限りです。ありがとうございます。

* * *

<cite>[SASSIENCE ～ 世界が嫉妬するCSSへ](http://sassience.com/)</cite>
<cite>[モテるCSS女子力を磨くための4つの心得と1つのサービス「SASSIENCE」等](/2011/05/25/css-joshiryoku-web-service-sassience)</cite>
<cite>[HTMLのインデントを綺麗にするサービス - Ham Cutlet](http://hamcutlet.fjord.jp/)</cite>
<cite>[フィヨルドはインデントに困った女子大生を救います - FJORD, LLC（合同会社フィヨルド）](http://fjord.jp/love/814.html)</cite>

