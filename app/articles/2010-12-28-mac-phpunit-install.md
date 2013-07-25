---
layout: article
title: "MacにPHPUnitをインストールする"
date: 2010-12-28
comments: true
categories: php
tags: php
published: true
---

RSpecっぽいものを探したけど、良さそうなのがみつからなかったので、とりあえず一番メジャーそうなPHPUnitをインストールする。

<!-- READMORE -->


## PHPUnitをインストール

PEARのバージョンが古ければ先にPEAR自体をアップデートする。

~~~ sh
$ pear list
$ pear list-upgrades       #=> ここにPEARが含まれていればうｐ
$ sudo pear install PEAR   #=> アップデート
~~~

PHPUnitのインストール。

~~~ sh
$ sudo pear channel-discover pear.phpunit.de
$ sudo pear channel-discover pear.symfony-project.com
$ sudo pear channel-discover components.ez.no
$ sudo pear install pear.symfony-project.com/YAML
$ sudo pear install components.ez.no/ConsoleTools
$ sudo pear install phpunit/PHPUnit
$ phpunit --version
PHPUnit 3.5.6 by Sebastian Bergmann.
~~~

* * *

<cite>[NiaNote: Mac OS X に PHPUnit をインストールする方法](http://nia-note.blogspot.com/2010/12/mac-os-x-phpunit.html)</cite>
