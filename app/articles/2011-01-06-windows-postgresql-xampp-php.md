# <span>WindowsでPostgreSQLを</span><span>XAMPPのPHPから使う</span>

XAMPPは、デフォルトではPostgreSQLが有効にはなっていないので、手動で有効にしてあげる必要がある。というのに気づくまでちょっと時間がかかったのでメモ。

<!-- READMORE -->


## PostgreSQLのインストール

まず、インストーラーは[ここ](http://www.enterprisedb.com/products/pgdownload.do#windows)からWindows版の8.4.6-1をダウンロードする。インストール手順の解説は[このページ](http://lets.postgresql.jp/documents/tutorial/windows/)がとても参考になった。注意点としては、

- postgresql-8.4.6-1-windows.exeを「管理者として実行」する
- データを保存するディレクトリはProgram Files以外が良い（例:`C:\pgdata\8.4`）
- 作成するデータベース・クラスタのロケールは「C」を指定する

あたりに気をつける。そしてインストール後に、`C:\Program Files (x86)\PostgreSQL\8.4\bin`へのパスを通してWindowsを再起動する。


## php.iniでPostgreSQLを有効にする

XAMPP内のPHPフォルダの`php.ini`でPostgreSQLを有効にする設定がコメントアウトされているので、コメントアウトを外す（984行目あたり）

~~~ ini
extension=php_pgsql.dll
~~~

PDOを使う場合はこちらもコメントアウトを外す必要がある（981行目あたり）

~~~ ini
extension=php_pdo_pgsql.dll
~~~

* * *

<cite>[Andante PHP、Windows+PHP5.2.6以降でPostgreSQLに接続できない](http://andante0727.blog81.fc2.com/blog-entry-151.html)</cite>
