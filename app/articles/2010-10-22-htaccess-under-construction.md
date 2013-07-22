---
layout: article
title: "工事中画面を.htaccessで出す時にハマった"
date: 2010-10-22
comments: true
categories: web
tags: web
published: true
---

レベルの低いハマりなんだけど、工事中画面に`.htaccess`を使って飛ばすときに、トップディレクトリ以下全体を工事中にしたくてアクセス制限をかけたらハマったのでメモ。

<!-- READMORE -->


## 工事中画面に飛ばす

最初はこんなふうに書いてた。考えて見れば当たり前だけど、この書き方だと`error.html`自身もアクセス制限の対象に含まれるので、`error.html`を表示できずにエラーになる。

~~~ apache
ErrorDocument 403 /error.html
Order deny,allow
Deny from all
~~~

で、最終的にはこういうふうにした。正しいかどうかはわからないけれど、とりあえずは凌げた。

トップディレクトリに以下の`.htaccess`を配置。

~~~ apache
ErrorDocument 403 /error/index.html
Order deny,allow
Deny from all
~~~

トップディレクトリ配下に`error`ディレクトリを作って、エラー表示用HTMLと以下の`.htaccess`を配置。

~~~ apache
Order allow,deny
Allow from all
~~~

こうすることで、`error`ディレクトリのアクセス制限を上書きしてアクセス許可にすることで、エラー表示用HTMLだけは表示可能状態に。上記以外に、最初はこういう書き方も思いついたけど、なんとなく上記よりさらに悪い書き方のような感じ？一応希望通りには動く。URL転送。

~~~ apache
RewriteEngine on
RewriteBase /
RewriteRule !error\.html /error.html [L]
~~~

あれこれ試すのに、以下のエディタが役立った。

* * *

<cite>[.htaccess ファイルを簡単作成「.htaccess Editor」](http://www.htaccesseditor.com/)</cite>
