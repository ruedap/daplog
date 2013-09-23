# MacにMySQLをインストールする

いつもどおりMacPortsを使ってインストールしたけどすごく時間かかった。最近評判の良いHomebrewだともっと速かったりするのかな？

<!-- READMORE -->


## MySQLのインストール

~~~ sh
$ sudo port selfupdate
$ sudo port install mysql5-server  # インストール（すんごい時間かかる）
$ sudo -u _mysql mysql_install_db5  # 初期化
$ sudo /opt/local/share/mysql5/mysql/mysql.server start  # 起動確認
$ mysql5 -u root  # 接続確認
$ /opt/local/lib/mysql5/bin/mysqladmin -u root password 'hogehoge'  # 必要ならrootのパスワードを設定
$ sudo port load mysql5-server  # 自動起動の設定
~~~

参考にしたページには、Rails用DBとアカウントの作成手順やドライバーのインストールもあったけど、まだ使わないと思うので保留。

* * *

<cite>[MySQL / Mac OS X](http://www.pleiades.or.jp/misc/mac/MySQL.html)</cite>
