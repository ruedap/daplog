# <span>Herokuアプリに独自ドメインを割り当てる</span><span>（バリュードメインの場合）</span>

<ins datetime='2013-012-26T09:14:00+09:00'>2013年12月現在では、この方法は利用できなくなっています。</ins>

Herokuで作ったWebアプリに、*自分で取得した独自ドメインを割り当てる方法*について調べた。無料で可能。今回は[バリュードメイン](/2011/05/16/ruby-heroku-web-app-muumuu-domain)。

<!-- READMORE -->


## 前提

まず前提として、Herokuアプリ側のURLと、割り当てたい独自ドメインは以下。

|||
|-|-|
|Herokuアプリ側のURL|<http://ruedap.heroku.com/>|
|割り当てたい独自ドメイン|<http://ruedap.com/>|

この2つを紐付ける手順について以降に書く。


## Heroku側の設定

まずはHeroku側。Herokuでは、[Custom Domainsアドオン](http://addons.heroku.com/custom_domains)を利用することで、独自ドメイン割り当ての設定を行える。Custom Domainsアドオンは、普通に独自ドメインを割り当てるだけのBasicプランなら無料で使える。ワイルドカード指定(?)したい場合は有料となる模様。有料の方はよくわからず。

[![Custom Domainsアドオンの設定画面](/images/2011/05/15/ruby-heroku-web-app-value-domain-01.png)](/images/2011/05/15/ruby-heroku-web-app-value-domain-01.png)

1. まず、[Custom Domainsアドオン](http://addons.heroku.com/custom_domains)のページから、無料（Basic）の方のAddボタンを押して、Custom Domains Basicを利用するHerokuアプリを選択する。すると、その選択したHerokuアプリにアドオンがインストールされる。右図のように「INSTALLED」が表示されればおｋ。
2. Custom Domainsアドオン（Basic）がインストールされたら、インストール済みアドオンリスト（右図）から「Custom Domains」をクリックして独自ドメインの設定画面を開く。その設定画面のNew Domainの項目に`ruedap.com`と入力して、Addボタンを押す。

これでHeroku側の設定は完了。下の画像は設定完了後の画面なので、以下のような状態なってればおｋ

[![Custom Domainsアドオンの設定画面](/images/2011/05/15/ruby-heroku-web-app-value-domain-02.png)](/images/2011/05/15/ruby-heroku-web-app-value-domain-02.png)


## バリュードメイン側の設定

次はバリュードメイン側。独自ドメインは既に取得済みで、バリュードメインの管理画面にログインしている状態で、以降の設定を行う。

1. まず、[取得済みドメイン一覧](https://www.value-domain.com/modall.php)のページから、割り当てたい独自ドメイン（今回の場合はruedap.com）の「DNSレコードの変更/URL転送の変更」（緑色のDNSボタン）をクリックして、DNS設定画面を開く。
2. DNS設定画面の設定フィールドに、[HerokuのCustom Domains設定方法のドキュメント](http://devcenter.heroku.com/posts/custom-domains#dns_setup)に載っている以下のAレコードのIPアドレスを指定して、TTL設定を120秒（任意）にして保存する。

~~~ sh
a @ 75.101.163.44
a @ 75.101.145.87
a @ 174.129.212.2
~~~

下の画像は設定完了後の画面なので、以下のような状態なってればおｋ

[![バリュードメインの設定画面](/images/2011/05/15/ruby-heroku-web-app-value-domain-03.png)](/images/2011/05/15/ruby-heroku-web-app-value-domain-03.png)

以上で、<http://ruedap.com/>で<http://ruedap.heroku.com/>の内容が表示されるようになる。めでたしめでたし。


## 疑問点

この独自ドメインの設定を行なっている時に、以下の2点について疑問を持った。

1. `www.ruedap.com` にアクセスしたら、`ruedap.com` に転送するようにしたい
    - `www.ruedap.com` でも同じ内容を表示するだけなら、前述のAレコードの設定で「www」も設定すれば良いんだろうけど、転送したいのでちょっと違う。こういう場合は独自ドメイン側じゃなく、リダイレクトをHerokuアプリ側でするのかな？
2. 独自ドメイン設定後は、`ruedap.heroku.com` にアクセスしたら、`ruedap.com` に転送するようにしたい
    - このLokka用プラグイン[Redirect_if_heroku](http://blog.champierre.com/archives/911)のRubyコードが参考になりそう

これらは疑問に思っただけで、今回は必要ではなかったので詳しくは調べてない。必要になったら調べる。ミサイルが何発か飛んできたら考える。

---

<cite>[Heroku | Dev Center | Custom Domains](http://devcenter.heroku.com/posts/custom-domains)</cite>
<cite>[Heroku上のアプリにカスタムドメインを設定する - Dondari memo](http://www.dondari.com/index.php/Heroku%E4%B8%8A%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AB%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)</cite>
