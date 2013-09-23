# msysGitの文字化けを一部解消する

[msysGitをインストール](/2011/02/07/git-windows-msysgit-github)してデフォルト状態のままだと、`git diff`や`git add -p`した時に日本語が含まれているとコマンドプロンプト上の表示が文字化けする。コマンドプロンプトの出力の文字コードがShift\_JISだからだと思う。厳密にはCP932とかだっけ。それで[このページ](http://sourceforge.jp/magazine/09/02/12/0530242/3)を参考に以下の修正を加えると、`git diff`の文字化けの方は解消できるようになる。`git add -p`の方は相変わらず文字化けする。

<!-- READMORE -->

## 文字化け一部解消の修正手順


### 1. less.exeの差し替え

<cite>[Downloading less](http://www.greenwoodsoftware.com/less/download.html)</cite>

ここから[バイナリのversion 436](http://www.greenwoodsoftware.com/less/less436w.zip)をダウンロードして`less.exe`をmsysGitのインストールディレクトリ内の`bin`フォルダにコピーする。


### 2. nkf.exeのインストール

<cite>[nkf Network Kanji Filter for Win32 (自家用)](http://www.asuka.cx/software/nkf/)</cite>

ここから[nkf-2.0.8b.bin.tar.gz](http://www.asuka.cx/software/nkf/files/nkf-2.0.8b.bin.tar.gz)をダウンロードして`nkf.exe`をmsysGitのインストールディレクトリ内の`bin`フォルダにコピーする。


### 3. inputrcの編集

msysGitのインストールディレクトリ内の`etc`フォルダにある`inputrc`ファイルに、以下を追記する。

~~~ sh
set convert-meta off
set meta-flag on
set output-meta on
set kanji-code utf-8
~~~

### 4. profileの編集
msysGitのインストールディレクトリ内の`etc`フォルダにある`profile`ファイルに、以下を追記する。
エディタのパスは適宜修正する。パスの指定方法に注意。`/d/`はドライブ名を表す。

~~~ sh
export GIT_EDITOR="'/d/Dropbox/Applications/Vim/Vim7.2-x86/gvim.exe'"
export GIT_PAGER="nkf -s | less"
~~~


## 解消しないところ

この修正によって`git diff`は文字化けが解消するが、`git add -p`は解消しない…。

* * *

<cite>[WindowsでのGit環境構築とその注意点 - SourceForge.JP Magazine](http://sourceforge.jp/magazine/09/02/12/0530242/3)</cite>
