# MacPortsのインストール

いろいろインストールするのに便利なMacPortsをインストールする。

1. 最新の[dmgファイル](http://www.macports.org/install.php)をダウンロードする
2. インストールしてMac OS Xを再起動する（不要かも？）
3. ターミナルからアップデートする

~~~ sh
$ sudo port -d selfupdate
$ sudo port -d sync
~~~

*port: command not found*とか言われたら`$PATH`にパスを通す。

~~~ sh
$ export PATH=/opt/local/bin:/opt/local/sbin:$PATH
~~~

* * *

<cite>[SnowLeopardにMacPortsをインストール \| soi33.org](http://blog.soi33.org/?p=17)</cite>
