# Gitのインストール

あとから知ったんだけど、MacPortsからインストールするほうが楽だった。

<!-- READMORE -->


## make

~~~ sh
$ cd /tmp
$ wget [http://kernel.org/pub/software/scm/git/git-1.7.2.1.tar.bz2](http://kernel.org/pub/software/scm/git/git-1.7.2.1.tar.bz2)
$ tar zxvf git-1.7.2.1.tar.bz2
$ cd git-1.7.2.1
$ ./configure
$ make prefix=/usr/local all
$ sudo make prefix=/usr/local install
~~~


## MacPorts

MacPortsでもインストールできるみたい。

~~~ sh
$ port search --list git
$ sudo port install git-core +doc +gitweb +svn +bash_completion
~~~

どちらも、インストールには結構時間かかる。

* * *

<cite>[せっかちな人のための git 入門 - git をインストールし、共同で開発できる環境を整えるまで](http://blog.champierre.com/archives/670)</cite>
