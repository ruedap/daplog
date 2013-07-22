---
layout: article
title: "<span>Vimの.vimrcと.vimフォルダを</span>Dropboxを使ってWin/Macで共有する"
date: 2011-03-01
comments: true
categories: vim
tags: vim
published: true
---

Vimの`.vimrc`と`.vim`フォルダを、Dropboxを使ってWindowsとMacで共有するための手順メモ。主にシンボリックリンクを使ってDropboxに置いたファイル／フォルダへ飛ばす方法だけど、

- XPのデフォルト状態ではシンボリックリンクを作れないのでフリーソフトを使う
- XPでは別ドライブへのシンボリックリンクが作成できない

あたりが注意点かな。基本的に普段はWindows 7とMacでVimの設定ファイルを共有しているので、XP絡みはついでに調べた程度。もしかしたら違うかも。

<!-- READMORE -->

## Windows Vista/7

まず、システム環境変数に`HOME`を設定する。（例: `C:\Users\ruedap`） それで、コマンドプロンプトを「管理者として実行」して、`HOME`のパスに移動する。最後に、以下の `mklink` コマンドを実行して、シンボリックリンクを作成する。Windows Vista/7ではデフォルトの状態でシンボリックリンクの作成が可能らしい。以下の例は、Dropboxのフォルダが`D:\Dropbox`の場合。

~~~ sh
C:\Windows\system32> cd %HOME%
C:\Users\ruedap> mklink .vimrc "D:\Dropbox\dotfiles\.vimrc"
.vimrc <<===>> D:\Dropbox\dotfiles\.vimrc のシンボリック リンクが作成されました
C:\Users\ruedap> mklink /d vimfiles "D:\Dropbox\dotfiles\.vim"
vimfiles <<===>> D:\Dropbox\dotfiles\.vim のシンボリック リンクが作成されました
~~~


## Windows XP

Windows XPの場合は、デフォルトではシンボリックリンクを作成できないので、以下のようなシンボリックリンク作成ツールを使う。

<cite>[Link Shell Extension](http://schinagl.priv.at/nt/hardlinkshellext/hardlinkshellext.html)</cite>
<cite>[リンク作成シェル拡張 for Windows 2000/XP](http://www.vector.co.jp/soft/winnt/util/se184746.html)</cite>

また、Windows XPでは、同一ドライブ内でないとファイルへのシンボリックリンクが作れない模様。（CドライブからDドライブへのシンボリックリンクが作れなかった） そういった制限を除けば、上記のツールはどちらもGUIで操作できるので、特にシンボリックリンク自体の作成には困ったりはしなかった。


## Mac

Macは簡単で、ホームディレクトリの`.vimrc`と`.vim`フォルダを退避または削除した状態で、以下のコマンドを実行する。

~~~ sh
$ ln -s ~/DropBox/dotfiles/.vimrc ~/.vimrc
$ ln -s ~/DropBox/dotfiles/.vim ~/.vim
~~~

エイリアスファイルが作成されていればでおｋ


## Vimperatorも共有する

Vimperatorの設定ファイル`.vimperatorrc`と`.vimperator`フォルダも共有する場合は、以下のようにシンボリックリンクを作っておく。


### Windows Vista/7

~~~ sh
C:\Users\ruedap> mklink .vimperatorrc "D:\Dropbox\dotfiles\.vimperatorrc"
C:\Users\ruedap> mklink /d vimperator "D:\Dropbox\dotfiles\.vimperator"
~~~


### Mac

~~~ sh
$ ln -s ~/DropBox/dotfiles/.vimperatorrc ~/.vimperatorrc
$ ln -s ~/DropBox/dotfiles/.vimperator ~/.vimperator
~~~

* * *

<cite>[DropBoxを使って、複数OS間でvimの環境を共有する方法 - かせいさんとこ](http://d.hatena.ne.jp/kasei_san/20090611/p1)</cite>

