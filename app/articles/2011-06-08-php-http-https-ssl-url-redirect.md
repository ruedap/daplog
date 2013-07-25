---
layout: article
title: "<span>PHPでHTTPS(SSL)接続じゃなかったら</span><span>HTTPSのURLにリダイレクトする</span>"
date: 2011-06-08
comments: true
categories: php
tags: php
published: true
---

入力フォームなどのHTTPS(SSL)で接続して欲しいページにHTTPで接続があった場合に、HTTPSにリダイレクトする方法について調べた。PHPはググればそれっぽい日本語情報がすぐ引っかかるのがいいね。それがお作法として正しいかどうかまではわかんないけど…

<!-- READMORE -->


## HTTPSじゃなかったらHTTPSにリダイレクト

HTTPSじゃなかったら、`$_SERVER['HTTPS']`の値がNULLらしいのでその値から判定するといいみたい。

~~~ php
<?php
var_dump($_SERVER['HTTPS']);
?>
~~~

上記を実行したら、HTTPだと`NULL`が、HTTPSだと`on`（String）が返ってきた。次に、URLスキーム以外の部分の現在のURLを取得する必要がある。それが以下。

~~~ php
<?php
// 例えばURLが [http://example.com/hoge/fuga.php](http://example.com/hoge/fuga.php) の場合だと…
var_dump($_SERVER['HTTP_HOST']);  // 現在のドメイン部分 (example.com)
var_dump($_SERVER['REQUEST_URI']);  // 現在のドメイン以下のパス (/hoge/fuga.php)
?>
~~~

上記を使って、HTTPSじゃなかったらHTTPSにリダイレクトをかけるのをこんな感じにしてみた。

~~~ php
<?php
if (empty($_SERVER['HTTPS'])) {
    header("Location: https://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}");
    exit;
}
?>
~~~

ぐぐってる途中で、`.htaccess`でやる方法も見かけたんだけど、3ページくらいに適用したい程度だったので今回は調べなかった。

* * *

<cite>[PHP: $\_SERVER - Manual](http://php.net/manual/ja/reserved.variables.server.php)</cite>
