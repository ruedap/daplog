# <span>MacでImageMagickとRMagickを</span><span>インストールする</span>

Rubyで画像を扱う必要があったので、MacのHomebrewでImageMagickをインストールして、それからRMagickをインストールした。

<!-- READMORE -->


## ImageMagickのインストール

まず、ImageMagickをインストールする。Homebrewからインストールした場合のImageMagickは64bit版になるらしく、[MAMP版のPHPで使う場合に問題になる](http://d.hatena.ne.jp/massat/20110205/1296895080)みたいだけど、Rubyの場合はどうなのかよくわからないので、とりあえずHomebrewからインストールしてみる。[MacPortsはアンインストール](/2011/02/17/mac-install-homebrew-uninstall-macports)しちゃったしね。

~~~ sh
$ brew install imagemagick
~~~

依存パッケージも色々インストールされるみたいで、結構時間掛かる。最後に表示されるのSummaryだと5.7分って書かれてた。これってインストールを開始してから終了するまでの時間でいいのかな？ 感覚的にはもっと長い時間が掛かったような気がした。インストールされたImageMagickのバージョンはこんなかんじ。

~~~ sh
$ brew info imagemagick
imagemagick 6.6.7-1
[http://www.imagemagick.org](http://www.imagemagick.org)
Depends on: jpeg, libtiff, little-cms, jasper
/usr/local/Cellar/imagemagick/6.6.7-1 (1332 files, 33M)
If you get "repository moved" errors, try deleting the folder:
  ~/Library/Caches/Homebrew/imagemagick--svn
Because ImageMagick likes to remove tarballs, we're downloading their
stable release from their SVN repo instead. But they only serve the
repo over HTTPS, and have an untrusted certificate, so we auto-accept
this certificate for you.
If this bothers you, open a ticket with ImageMagick to fix their cert.
Some tools will complain if the ghostscript fonts are not installed in:
  /usr/local/share/ghostscript/fonts
[http://github.com/mxcl/homebrew/commits/master/Library/Formula/imagemagick.rb](http://github.com/mxcl/homebrew/commits/master/Library/Formula/imagemagick.rb)
~~~


## RMagickのインストール

次にImageMagickのラッパーライブラリであるRMagickをインストールする。

~~~ sh
$ gem install rmagick
~~~

途中でいっぱい「No definition for xxx」（xxxはクラス名っぽい）が表示されたけど、ちゃんとインストールされたのかな？ 調べてみると、[この表示はどうもRDocが関係](http://terakonya.sarm.net/wordpress/2010/12/20/rmagick/)しているみたいなので、`--no-rdoc`オプションを付けてもう一度やってみる。

~~~ sh
$ gem install rmagick --no-rdoc --no-ri
Building native extensions.  This could take a while...
Successfully installed rmagick-2.13.1
1 gem installed
~~~

今度はちゃんと入った。

~~~ sh
$ gem list rmagick
###  LOCAL GEMS ***

rmagick (2.13.1)
~~~

これでRMagickを使う準備は整ったはず。

---

<cite>[Rubyで画像フォーマットを変換するスクリプトを作ろう &#187; 寺子屋未満](http://terakonya.sarm.net/wordpress/2010/12/20/rmagick/)</cite>

