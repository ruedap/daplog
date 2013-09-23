# <span>MacVimを7.2から7.3に</span><span>バージョンアップする</span>

MacVimを7.3にバージョンアップしてみた。特に問題もなくあっさり移行できたっぽい。

<!-- READMORE -->


## 7.2のアンインストール

念のため7.2の`MacVim.app`をバックアップする。で、`MacVim.app`と、`~/Library/Preferences/org.vim.MacVim.*ファイル`（自分の環境では2ファイル）を削除する。

## 7.3のインストール

<cite>[macvim-kaoriya-20110111.dmg - macvim-kaoriya - 10.5/10.6 universal vim:7.3.99 macvim:snapshot-56 kaoriya:20110109 - Project Hosting on Google Code](http://code.google.com/p/macvim-kaoriya/downloads/detail?name=macvim-kaoriya-20110111.dmg&can=2&q=)</cite>

から`macvim-kaoriya-20110111.dmg`をダウンロードしてきてインストールする。

## セットアップ

- [MacVimでデフォルトのvimrcとgvimrcを読み込まない](/2010/08/11/macvim-default-vimrc)
- 環境設定→一般→アプリケーションからファイル、で「現在のウィンドウで開く」を選択して「タブで開く」にする

上記2点だけインストール後にセットアップして、ほかの部分は`.vimrc`と`.vim`フォルダをそのまま使うことで、すべて移行できたっぽい。

* * *

<cite>[macvim-kaoriya - Project Hosting on Google Code](http://code.google.com/p/macvim-kaoriya/)</cite>
