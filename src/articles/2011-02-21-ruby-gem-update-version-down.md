# <span>RubyGemsのバージョンを</span><span>ダウンしたりアップしたり</span>

ちょっとBundlerがらみでハマったときに「RubyGemsのバージョンが原因かな？」と思ったので、RubyGemsのバージョンを最新版から特定のバージョンに下げる方法と、また元に戻す方法について調べた。

<!-- READMORE -->


## バージョンダウン

RubyGems 1.4系が出たときに、Ruby 1.9系で動かないという問題があって結構話題となり、それが解消されたRubyGems 1.5系が出たときにはRailsの特定のバージョンで動かないという問題が出た。その時に[RubyGemsをバージョンダウンする方法を載せた記事](http://www.oiax.jp/rails/zakkan/rubygems_1_5.html)を見ていたので、それを参考にやってみた。RubyGemsをバージョンダウンするには、[rubygems-update](https://rubygems.org/gems/rubygems-update)というgemをインストールして行う。

~~~ sh
$ gem -v
1.5.2
$ gem list rubygems-update
###  LOCAL GEMS ***

rubygems-update (1.5.2)
~~~

もし、バージョンダウンしたい対象より、新しいバージョンのrubygems-updateが入っていたらそれをアンインストールする。

~~~ sh
$ gem uninstall -v 1.5.2 rubygems-update
$ gem list rubygems-update
###  LOCAL GEMS ***
~~~

で目的のバージョンのrubygems-updateをインストールして、`update_rubygems`コマンドを実行する。以下の例ではRubyGems 1.3.7をインストールしている。

~~~ sh
$ gem install -v 1.3.7 rubygems-update
$ update_rubygems
$ gem -v
1.3.7
~~~


## バージョンアップ

RubyGemsのバージョンアップは、特定のバージョンにバージョンアップしたい場合は、先ほどのバージョンダウンの方法をそのまま使えばおｋ

~~~ sh
$ gem install -v 1.5.0 rubygems-update
$ update_rubygems
$ gem -v
1.5.0
~~~

最新版にするには、バージョン指定せずにrubygems-updateをインストールして、アップデートすればおｋ

~~~ sh
$ gem install rubygems-update
$ update_rubygems
$ gem -v
1.5.2
~~~

* * *

<cite>[RubyGems 1.5 が出たけど - Rails 雑感 - Ruby on Rails with OIAX](http://www.oiax.jp/rails/zakkan/rubygems_1_5.html)</cite>
