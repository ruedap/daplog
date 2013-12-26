# <span>Herokuアプリに独自ドメインを割り当てる</span><span>（ムームードメインの場合）</span>

<ins datetime='2013-012-26T09:14:00+09:00'>2013年12月現在では、この方法は利用できなくなっています。</ins>

Herokuで作ったWebアプリに、自分で取得した独自ドメインを割り当てる方法について、今回は`heroku`コマンドから行ってみた。ちなみに、バリュードメインの場合は[こちら](/2011/05/15/ruby-heroku-web-app-value-domain)。

<!-- READMORE -->


## 前提

まず前提として、Herokuアプリ側のURLと、割り当てたい独自ドメインは以下。

|-:|:-|
|Herokuアプリ側のURL|<http://nekostagram.heroku.com/>|
|割り当てたい独自ドメイン|<http://nekostagram.com/>|

この2つを紐付ける手順について以降に書く。


## Heroku側の設定

前回は、Herokuのアプリ管理ページからGUIベースでドメインを登録したけど、今回はターミナルから`heroku`コマンドを使って登録してみる。結果はどちらでやっても同じ。まず、`heroku addons:add`コマンドを使って、[Custom Domainsアドオン](http://addons.heroku.com/custom_domains)のBasicプランを利用するように設定する。

~~~ sh
$ heroku addons:add custom_domains:basic
Adding custom_domains:basic to nekostagram... done (free)
~~~

次に、このHerokuアプリに割り当てる独自ドメインを設定する。これには`heroku domains:add`コマンドを使う。

~~~ sh
$ heroku domains:add nekostagram.com
Added nekostagram.com as a custom domain name to nekostagram.heroku.com
~~~

これで完了。対象のHerokuアプリに対して割り当てられているドメインを確認するには、`heroku domains`コマンドを実行する。

~~~ sh
$ heroku domains
Domain names for nekostagram.heroku.com:
nekostagram.com
~~~


## ムームードメイン側の設定

次はムームードメイン側。独自ドメインは既に取得済みで、ムームードメインの管理画面（コンパネ）にログインしている状態で、以降の設定を行う。

1. まず、コントロールパネルメニューの中のドメイン操作の項目にある「[ネームサーバ設定変更](https://muumuu-domain.com/?mode=conpane&state=dns_list)」を開く。開いたら、一番上にある「ムームードメインのネームサーバ（ムームーDNS）を使用する」にチェックを入れて、ネームサーバ設定変更ボタンをクリックする。
    - もし、グレーアウトしている（まだムームーDNSを利用可能にしてない）場合は、一番上の中にあるリンク「ムームーDNSセットアップ」から、該当ドメインの「利用する」ボタンをクリックする。
2. 次に、コントロールパネルメニューの中の「[ムームーDNSセットアップ](https://muumuu-domain.com/?mode=conpane&state=muudns_list)」を開く。開いたら、対象ドメインの「変更」ボタンをクリックする。さらに「カスタム設定」をクリック。設定2の部分で、[HerokuのCustom Domains設定方法のドキュメント](http://devcenter.heroku.com/posts/custom-domains#dns_setup)に載っているAレコードのIPアドレスを以下のように設定する。

|No|サブドメイン|種別|内容|優先度|
|-:|:-:|-:|:-|:-:|
|1|（空欄）|A|75.101.163.44|（空欄）|
|2|（空欄）|A|75.101.145.87|（空欄）|
|3|（空欄）|A|174.129.212.2|（空欄）|


[![IPアドレス設定画面](/assets/2011/05/16/ruby-heroku-web-app-muumuu-domain-01.png)](/assets/2011/05/16/ruby-heroku-web-app-muumuu-domain-01.png)

設定後に「セットアップ情報変更」ボタンを押すと、以下のような画面が表示されるのでこれで完了。

[![IPアドレス設定完了画面](/assets/2011/05/16/ruby-heroku-web-app-muumuu-domain-02.png)](/assets/2011/05/16/ruby-heroku-web-app-muumuu-domain-02.png)


以上で、<http://nekostagram.com/>で<http://nekostagram.heroku.com/>の内容が表示されるようになる。

* * *

<cite>[Heroku | Dev Center | Custom Domains](http://devcenter.heroku.com/posts/custom-domains)</cite>
<cite>[Heroku上のアプリにカスタムドメインを設定する - Dondari memo](http://www.dondari.com/index.php/Heroku%E4%B8%8A%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AB%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)</cite>
