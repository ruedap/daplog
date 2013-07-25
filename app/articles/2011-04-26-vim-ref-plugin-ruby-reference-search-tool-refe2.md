---
layout: article
title: "<span>Vimでref.vimを使って</span><span>Rubyのリファレンスをただちに検索する</span>"
date: 2011-04-26
comments: true
categories: vim
tags: vim
published: true
---

[![](/assets/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2-01.png)](/assets/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2-01.png)

Vimで書いたコードを速攻実行できる[quickrun](http://phpspot.org/blog/archives/2011/04/vimquickrun.html)プラグインがホッテントリで話題になってて、自分もこのプラグインを愛用させてもらってるんだけど、同じ作者さんの[ref.vim](http://d.hatena.ne.jp/thinca/20090809/1249829893)プラグインもコーディングするときにquickrunと同様に超絶便利なのでおすすめ。このプラグインは、Vim上からリファレンスやドキュメントをただちに検索できるプラグイン。調べたいクラス名やメソッド名にカーソルを当てて<kbd>Shift+K</kbd>を押すだけ。こちらもquickrunと同様に[様々な言語やドキュメントをカバー](https://github.com/thinca/vim-ref/tree/master/doc)している。

<!-- READMORE -->


## 今回はRubyリファレンスの導入手順

今回はRubyのリファレンス検索ツール[refe2](http://redmine.ruby-lang.org/projects/rurema/wiki/ReleasePackageHowTo)をref.vimから使うためのrefe2導入手順。MacとWindowsそれぞれの場合を書いてみた。どちらもRubyのバージョンは1.8.7。ちなみに自分の場合、Ruby以外にもPHPと英辞郎で英単語を検索できるalcでこのref.vimを使用してる。これらはホント便利。作者さんに感謝。

refe2導入前にVim側ではそのref.vimが使用可能な状態になっていることが前提。基本的には他のVimプラグインと同じようにインストールするだけ。ref.vimはインストール後の各リファレンスのセッティングのほうが重要で、そのなかでもRubyのrefe2の設定は難しい部類だと感じた。ref.vimのインストールとPHPリファレンスの設定については[こちらの記事](http://d.hatena.ne.jp/heavenshell/20100606/1275831502)が詳しい。


## Macの場合

- [ここ](http://doc.okkez.net/archives/)から最新のRubyリファレンス`ruby-refm-1.9.2-dynamic-20110329.zip`をダウンロード
- 解凍して`~/Documents/Reference/rubyrefm/`（場所は任意）に配置
- 以下の内容の`refe`ファイルを作成し、実行権限`chmod u+x refe`を与えて、パスの通った所（例: `/bin/`）に配置する

~~~ sh
#!/bin/sh
exec ruby -Ke -I ~/Documents/Reference/rubyrefm/bitclust/lib ~/Documents/Reference/rubyrefm/bitclust/bin/refe.rb -d ~/Documents/Reference/rubyrefm/db-1_8_7 "$@"
~~~

- ターミナルで`which refe`や`refe --version`を実行して準備できていることを確認する

~~~ sh
$ which refe
/Users/ruedap/bin/refe
$ refe --version
ReFe version 2
~~~

- ターミナルで`refe Array shuffle`[^1]でちゃんとリファレンスが表示されることを確認する

~~~ sh
$ refe Array shuffle
Array#shuffle
        - shuffle -> Array
配列の要素をシャッフルして，その結果を配列として返します。
srand()が有効です。
例:
   a = [ 1, 2, 3 ]           #=> [1, 2, 3]
   a.shuffle                 #=> [2, 3, 1]
~~~

- Vimのコマンドラインモードで`:Ref refe Array shuffle`を実行して、上のターミナルの時と同じ内容が表示されることを確認してセットアップ完了！
- ref.vimなら、VimでRubyコードを開いて、*調べたいメソッド名などの上で<kbd>Shift+K</kbd>*を押せばオッケー。


## Windowsの場合

- [ここ](http://doc.okkez.net/archives/)から最新のRubyリファレンス`ruby-refm-1.9.2-dynamic-20110329.zip`をダウンロード
- 解凍して`D:\Documents\Reference\rubyrefm\`（場所は任意）に配置
- `D:\Documents\Reference\rubyrefm\refe-1_8_7.cmd`を複製し`refe-1_8_7-utf.cmd`を作成。以下のようにファイルの文字コードを*UTF-8に書き換える*ようにする
    - 注意: この`refe-1_8_7.cmd`を配置するディレクトリのパスにスペースが入っていると、次のrefe.batの指定時にダブルクォーテーションでくくってもエラーになると、はてブコメントでid:holyppさんに教えてもらった感謝！

~~~ bat
@echo off
pushd "%~dp0"
ruby -Ke -I bitclust/lib bitclust/bin/refe.rb -d db-1_8_7 -e utf8 %*
popd
~~~

- 以下の内容の`refe.bat`ファイルを作成し、パスの通った所（例: `C:\Ruby187\bin`）に配置する

~~~ bat
@echo off
D:\Documents\Reference\rubyrefm\refe-1_8_7-utf.cmd  %*
~~~

- コマンドプロンプトで`refe --version`で*ReFe version 2*と表示されれば準備オッケー
- コマンドプロンプトで`refe Array shuffle`すると文字化けした情報が表示されるがこれでおｋ[^2]
- Vimのコマンドラインモードで`:Ref refe Array shuffle`[^3]を実行して、リファレンスマニュアルが正常に表示されることを確認してセットアップ完了！
- ref.vimなら、VimでRubyコードを開いて、*調べたいメソッド名などの上で<kbd>Shift+K</kbd>*を押せばオッケー。


## .vimrc

上述のようにセットアップが完了すれば、クラス名やメソッド名に*カーソルが乗っている状態で<kbd>Shift+K</kbd>*を押したり、コマンドラインモードから`:Ref refe Array shuffle`のように入力すれば、ただちにリファレンスを検索できるようになる。ショートカットキーを割り当てればもっと早く検索できるので、自分の場合の.vimrcでのref.vimの設定を参考までに。

~~~ vim
""" ref.vim
let g:ref_use_vimproc = 0   " vimprocをインストールしてない場合は0を指定
nmap ,rr :<C-u>Ref refe<Space>
~~~

この設定の場合だと、ノーマルモードで`,rr Array shuffle`または`,rr shuffle`とすれば、今までの例と同じように`Array#shuffle`を検索できる。

* * *

<cite>[ref.vim 書いた - 永遠に未完成](http://d.hatena.ne.jp/thinca/20090809/1249829893)</cite>
<cite>[ref.vim の内部構造を大幅に書き換えた - 永遠に未完成](http://d.hatena.ne.jp/thinca/20100418/1271537141)</cite>
<cite>[ref.vim を入れる - Heavens hell](http://d.hatena.ne.jp/heavenshell/20100606/1275831502)</cite>
<cite>[るりまプロジェクト - ReleasePackageHowTo - Ruby Issue Tracking System](http://redmine.ruby-lang.org/projects/rurema/wiki/ReleasePackageHowTo)</cite>

[^1]: 調べるメソッド名は何でも良いけど、古いrefeではないことを確認するために、1.8.7で追加されたメソッド名を検索している
[^2]: 上記でアウトプットのエンコーディングをUTF-8にしたため。Shift-JISにすればコマンドプロンプトではちゃんと表示されるが、Vimでは文字化けするので、Vimを優先してUTF-8を選択
[^3]: 調べるメソッド名は何でも良いけど、古いrefeではないことを確認するために、1.8.7で追加されたメソッド名を検索している
