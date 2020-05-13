# <span>RVMでRuby 1.8.7を</span><span>p302からp330にバージョンアップする</span>

[RVMに脆弱性が発見](http://japan.cnet.com/news/business/20425220/)されたみたいなので、古いバージョンの場合はRVMをうｐする

~~~ sh
$ rvm update --head
$ rvm reload
~~~

RVMでRubyをバージョンアップするには`migrate`を使う。これを使うと`gemset`も移動され、`rvm use 1.8.7`したときに選択されるのがp302からp330に変わる。

~~~ sh
$ rvm install ruby-1.8.7-p330 -C --with-readline-dir=/opt/local
$ rvm migrate 1.8.7-p302 1.8.7-p330
~~~

`migrate`中に何度か選択肢がでるが、全部YESにした。今のところ問題なし。

---

<cite>[RVMのアップデートとGemを引っ越しメモ \| diary NET. 1.2mg](http://www.milligramme.cc/wp/archives/3527)</cite>
