---
layout: article
title: "Sinatraでブラウザーのバージョン判定"
date: 2011-04-22
comments: true
categories: ruby
tags: ruby
published: true
---


Sinatraでブラウザーのバージョンを判定する方法をメモ。最近公開した[はてなスターカウンター](http://hatenastar.heroku.com/)は、ある程度作った後にIE7以下で動かないことが発覚した。あるある。で、仕方ないので当面、IE7以下のブラウザーは対応してませんのメッセージをだそうと思って、そのやり方を調べた。

<!-- READMORE -->


## request.user_agent

ググってもSinatraを使ったそれっぽいページが見つからなかったので、とりあえず、[`request.user_agent`](http://www.sinatrarb.com/intro-jp.html#%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)からIE7～5あたりの文字列とマッチする場合は未対応用HTMLを、それ以外は通常のHTMLを表示するように、以下のように書いた。

~~~ ruby
get '/' do
  ua = request.user_agent
  if ["MSIE 7.0", "MSIE 6.0", "MSIE 5.0"].find {|s| ua.include?(s) }
    slim :error_browser_version
  else
    slim :index
  end
end
~~~

ユーザーエージェントの文字列は[こちらのページ](http://www.openspc2.org/userAgent/)で調べた。すごく適当に書いたけど、どういう書き方が一般的なんだろう。もしかしたら、ブラウザー判定のためのSinatra用ライブラリとかあったりするのかな？

* * *

<cite>[Sinatra: README (Japanese)](http://www.sinatrarb.com/intro-jp.html#%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%B8%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)</cite>
