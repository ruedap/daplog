# <span>MacでSSH公開鍵・秘密鍵ファイルを</span><span>コピーして使ったら警告がでた</span>

Mac OS Xの再インストール後、元々使っていたSSH公開鍵・秘密鍵ファイルの入った`.ssh`フォルダを、ホームディレクトリにコピペして、`git push`しようとしたら警告が出て実行できなかった。コピペしただけでは、秘密鍵の方のファイルパーミッションがオープンすぎるからダメみたい。

<!-- READMORE -->

## こんな警告が出た

`git push`しようとしたら、こんな警告が出た。

~~~ sh
$ git push nekostagram master
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for '/Users/ruedap/.ssh/id_rsa' are too open.
It is recommended that your private key files are NOT accessible by others.
This private key will be ignored.
bad permissions: ignore key: /Users/ruedap/.ssh/id_rsa
Permission denied (publickey).
fatal: The remote end hung up unexpectedly
~~~

ググると*パーミッションを0600に変えてあげれば大丈夫*ってのをちらほら見かけたので、その通りにしてみる。

~~~ sh
$ chmod 0600 ~/.ssh/id_rsa
~~~

これでもう一度`git push`してみたら、今度はいつもどおりにpushできた。

---

<cite>[SSHで公開鍵認証を使う - Memorandum](http://www.pistolfly.jp/weblog/2007/02/ssh.html)</cite>
