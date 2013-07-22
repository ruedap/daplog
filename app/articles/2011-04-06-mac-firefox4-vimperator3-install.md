---
layout: article
title: "MacでFirefox 4とVimperator 3をインストールする"
date: 2011-04-06
comments: true
categories: vimperator
tags: vimperator
published: true
---

Mac OS Xを再インストールしたので、Firefoxもバージョン4.0で環境を再構築した。また、Vimperatorも3.0にバージョンアップした。`.vimperatorrc`は昨日の[Windowsでの設定](/2011/04/05/windows-firefox4-portable-vimperator3-install)を[Dropboxで共有](/2011/03/01/vim-vimrc-vimperator-dropbox-windows-mac-share)してそのまま同じのを使っているので、3.0にしたことによるエラーなどはすでに回避済み。ほとんどWindowsでの手順と一緒かな。

<!-- READMORE -->


## Firefox 4のインストールと設定

1. Firefox 4をインストール
    - 設定移行アシスタントで「設定を読み込まない」を選ぶ
    - デフォルトWebブラウザの設定で「はい」を選ぶ
2. Firefoxの環境設定
    - 一般タブ
        - 「Firefoxを起動するとき」で「前回終了時のウインドウとタブを表示する」を選択
        - 「すべてのダウンロードが完了したら閉じる」をON


## インストールしたアドオンと各種設定

1. Vimperator 3.0
    - FirefoxのナビゲーションツールバーをOFF
    - FirefoxのアドオンバーをOFF
2. ツリー型タブ
    - 外観→「ツリーを折りたためるようにする」をOFF
    - 外観→「タブバーの表示スタイル」を「Sidebar」に変更[^1]
    - ツリー→親のタブを閉じたときの挙動：「閉じた親タブの階層に子孫タブを移動する」を選択
        - 「最上位の親タブを閉じたときだけは、最初の子タブを新しい親にする」をON
3. Firebug
4. Hatena Bookmark
5. Libron
    - アマゾンに行って右上のLibronから自分の最寄りの図書館を設定する
6. Session Manager
7. Tombloo [https://github.com/to/tombloo/wiki](https://github.com/to/tombloo/wiki)
    - Tomblooの設定→デフォルトのポスト先を適当に自分好みに設定
    - Tomblooの設定→ポスト関連→「アクセスキー - Share」のキー割り当てを解除
    - Tomblooの設定→ポスト関連→「ショートカット - Linkクイックポスト」にCommand+Lを割り当て
    - Tomblooの設定→ポスト関連→「クイックポストで使うタグの取得元」にHatenabookmarkを設定

* * *

<cite>[WindowsでFirefox 4 Portable EditionとVimperator 3をインストールする](/2011/04/05/windows-firefox4-portable-vimperator3-install)</cite>

[^1]: MacではMacBook Pro 13"を使っているので、画面が小さく少しでも省スペースにしたいからSidebarのまま
