---
layout: article
title: "<span>WindowsでFirefox 4 Portable EditionとVimperator 3を</span>インストールする"
date: 2011-04-05
comments: true
categories: vimperator
tags: vimperator
published: true
---

普段WindowsではFirefoxのPortable Editionを使っていて、それをまるごとDropboxにつっこんである。先日Firefox 4がリリースされたので、自分の環境でもWindowsでは、Firefox 4 Portable Editionを使って環境を再構築した。また、Vimperatorを3.0にバージョンアップしたことで、`.vimperatorrc`の古い設定の影響で起動時にエラーが出るようになったので修正した。その際の備忘録。ちなみにFirefoxはポータブル版でも通常版でもやることはまったく同じで、違いは無い。

<!-- READMORE -->


## Firefox 4 Portable Editionのインストールと設定

FirefoxのPortable Editionを提供しているPortableApps.comで、既にFirefox 4も公開されていた。ダウンロードボタンの下にある「Languages」をクリックして、以下のページから日本語版をダウンロードする。その後、Firefoxの環境設定でいくつかデフォルト設定から変更する。

1. Firefox 4 Portable Editionをインストール
    - 日本語版をダウンロードしてインストール
        - [Localization \| PortableApps.com - Portable software for USB, portable and cloud drives](http://portableapps.com/apps/internet/firefox_portable/localization)
1. Firefoxの環境設定
    - 一般タブ
        - 「Firefoxを起動するとき」で「前回終了時のウインドウとタブを表示する」を選択
        - 「すべてのダウンロードが完了したら閉じる」をON


## インストールしたアドオンと各種設定

とりあえずVimperator 3とその他のアドオンを、新しいアドオン管理画面の検索ボックスから検索してインストールした。Tomblooだけアドオン検索に引っかからなかったので、公式ページからダウンロードしてインストールした。

1. Vimperator 3.0
    - FirefoxのナビゲーションツールバーをOFF
    - FirefoxのアドオンバーをOFF
2. ツリー型タブ
    - 外観→「ツリーを折りたためるようにする」をOFF
    - 外観→「タブバーの表示スタイル」を「Mixed」に変更[^1]
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
    - Tomblooの設定→ポスト関連→「ショートカット - Linkクイックポスト」にAlt+Lを割り当て
    - Tomblooの設定→ポスト関連→「クイックポストで使うタグの取得元」にHatenabookmarkを設定

## Vimperator 3導入で削除した.vimperatorrcの設定

以下は、自分の環境でのVimperator 3にバージョナップしたら表示されるようになったエラーと、`.vimperatorrc`でのその該当箇所（削除した項目）。

- E518: Unknown option: guioptions

~~~ vim
"" メニューとスクロールバーのみ
set guioptions=mr
~~~

- E518: Unknown option: wildoptions

~~~ vim
"" 自動補完
set wildoptions=auto
~~~

- Unknown highlight keyword: StatusLineSecure

~~~ vim
hi StatusLineSecure color: #000; background: #9CF; font-weight: normal;
~~~

- Unknown highlight keyword: StatusLineExtended

~~~ vim
hi StatusLineExtended color: #000; background: #9FF; font-weight: normal;
~~~

- Unknown highlight keyword: StatusLineBroken

~~~ vim
hi StatusLineBroken color: #FFF; background: #900; font-weight: normal;
~~~

- .vimperatorrc:197: TypeError: feedButton is null

~~~ vim
"" ステータスバーにフィードボタンを表示
js <<EOF
  (function(){
    var feedPanel = document.createElement('statusbarpanel');
    var feedButton = document.getElementById('feed-button');
    feedPanel.setAttribute('id','feed-panel-clone');
    feedPanel.appendChild(feedButton.cloneNode(true));
    feedButton.parentNode.removeChild(feedButton);
    document.getElementById('status-bar').insertBefore(feedPanel,document.getElementById('security-button'));
  })();
EOF
~~~

- char-hints-mod2.js:89: Error: \_showhints override failed!
    - 3.0からデフォルトで設定できるようになった → [Vimperator 3のヒントモードでアルファベットを使う](/2011/03/27/vimperator3-hint-mode-alphabet-uppercase)

~~~ sh
char-hints-mod2.jsを削除
~~~

- XUL/Migemo not found. You should be install XUL/Migemo.

~~~ sh
migemo_hint.jsをとりあえず削除
migemo-find.jsをとりあえず削除
~~~


## Vimeprator 3用に新しくインストールしたプラグイン

今のところ、Vimperator 3用に新たにインストールしたVimperatorプラグインは、以下の`statusline-toolbar.js`のみ。これはインストールするだけでおｋで、ステータスラインにステータスバーなどのアイコンを表示してくれるもの。便利。

- statusline-toolbar.jsをインストール
    - [https://github.com/vimpr/vimperator-plugins/blob/master/statusline-toolbar.js](https://github.com/vimpr/vimperator-plugins/blob/master/statusline-toolbar.js)
    - [ステータスラインにステータスバーのアイコンとかツールバーボタンとかを入れるプラグイン - Vimple Star Sprites - vimperatorグループ](http://vimperator.g.hatena.ne.jp/teramako/20110325/1301005271)

* * *

<cite>[Firefox 4をインストールしたらまず行う設定 : audiofan.net blog](http://blog.audiofan.net/archives/1394190.html)</cite>
<cite>[Vimperator3.0がリリースされたっぽいですね - vimpがあればなんでもできるっ！ - vimperatorグループ](http://vimperator.g.hatena.ne.jp/snaka72/20110308/vimperator_3_0_released)</cite>

[^1]: Sidebarを使ってたけど、フォントのレンダリングが変わって？見づらくなった
