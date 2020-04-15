# <span>Herokuのタイムゾーンを</span><span>日本時間に設定する</span>

Herokuのデフォルトのタイムゾーンは太平洋標準時(PST)なので、それを日本標準時(JST)に設定する。

<!-- READMORE -->


## 17時間の時差

[昨日の記事](/2011/02/09/ruby-heroku-twitter-bot)のTwitter Botでも、タイムゾーンが違うことで、1日ズレた名言をツイートしていたことになる。不具合ではないけれど、ちょっと気持ち悪い。タイムゾーンを正しく設定することで、そのズレは解消される。

[この記事の最後](/2011/02/01/ruby-heroku-sinatra-cron-twitter-tweet)で、Herokuの管理画面が太平洋標準時(PST)で、日本との時差（17時間）を考える必要があると書いた。このHeroku管理画面のタイムゾーンまでは変更することは出来無いみたいだけど、アプリのタイムゾーンはコマンドラインから設定できるみたい。なので日本時間を設定すれば、アプリ上では時差を考える必要はなくなる。

以下は[昨日のTwitter Botアプリ](/2011/02/09/ruby-heroku-twitter-bot)のタイムゾーンを変更する手順。


## デフォルトのタイムゾーン

Herokuのコンソールで現在のタイムゾーンを調べる。

~~~ sh
$ heroku console
Ruby console for chaplin.heroku.com
>> Time.now
=> Tue Feb 08 07:33:47 -0800 2011
~~~

このようにデフォルトでは太平洋標準時(UTC-8)になっている。


## 日本標準時に変更

以下のコマンドでタイムゾーンを指定できる。

~~~ sh
$ heroku config:add TZ=Asia/Tokyo
Adding config vars:
  TZ => Asia/Tokyo
Restarting app...done.
~~~

もう一度見てみるとちゃんと日本標準時(UTC+9)に変更されている。

~~~ sh
$ heroku console
Ruby console for chaplin.heroku.com
>> Time.now
=> Wed Feb 09 00:34:30 +0900 2011
~~~

* * *

<cite>[［Heroku］タイムゾーンを設定する - func09](http://www.func09.com/wordpress/archives/951)</cite>
