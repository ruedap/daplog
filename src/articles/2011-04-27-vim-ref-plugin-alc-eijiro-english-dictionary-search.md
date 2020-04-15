# <span>Vimでref.vimを使って</span><span>英辞郎で英単語をただちに検索する</span>

昨日、Vimの[ref.vim](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)を書いた。今日も同じくref.vimプラグインを使って、英和・和英辞書検索サービスの[英辞郎 on the Web](http://www.alc.co.jp/)を利用して、英単語をただちに検索（和英も可）するための導入手順を書いてみる。といっても、Vim上で使用するテキストブラウザーをインストールできれば、この辞書検索はすぐに使えるようになる。

[![英辞郎 on the Webのref.vim実行結果](/assets/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search-01.png)](/assets/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search-01.png)

注意点として、前回のRubyのリファレンスは、ローカルにデータがあったのでネットにつながっていなくても利用できたけど、今回のは[英辞郎 on the Web](http://www.alc.co.jp/)のサイトに接続して検索するので、オフラインでは利用できない。

今回も[前回](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)と同様に、下記のテキストブラウザー導入前にVim側ではref.vimが使用可能な状態になっていることが前提。

<!-- READMORE -->


## Macの場合

- MacPortsやHomebrewを使って、[elinks](http://ja.wikipedia.org/wiki/ELinks)、[w3m](http://ja.wikipedia.org/wiki/W3m)、[links](http://ja.wikipedia.org/wiki/Links)、[lynx](http://ja.wikipedia.org/wiki/Lynx_(%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6))いずれかのテキストブラウザーをインストールする[^1]
- 今回は、Homebrewを使ってw3mをインストールした `$ brew install w3m`
- Vimから適当に英単語を検索`:Ref alc hello`してみて検索結果が出てきたら設定完了!!

## Windowsの場合
- [Lynx for Win32](http://lynx-win32-pata.sourceforge.jp/index-ja.html)から「Lynx286rel4THjp.exe 日本語環境用設定版 インストーラ」をダウンロードして、適当なディレクトリにインストールする
    - ここでのインストール場所ではLynxを使わないのでどこでもおｋ
- インストール完了後、一度Lynxを起動して、正常に起動することを確認する
    - この初回起動時に、Lynxの設定ファイル`lynx.cfg`が同一ディレクトリ内に自動生成される
- インストールしたディレクトリ[^2]から`lynx.exe`と`lynx.cfg`の2ファイルをコピーして、Vimのディレクトリ[^3]にペーストする
- Vimから適当に英単語を検索`:Ref alc hello`してみて検索結果が出てきたら設定完了!!


## .vimrcでの設定

`.vimrc`では、表示する行数や文字コードなどを設定できる。表示する行数は、自分の場合は39行目あたりが丁度よかった。文字コードは、自分の環境の場合はUTF-8をデフォルト値[^4]に設定している影響で、WindowsではShift-JISを指定しないと文字化けする。

~~~ vim
""" ref.vim
nmap ,ra :<C-u>Ref alc<Space>
let g:ref_alc_start_linenumber = 39 " 表示する行数
let g:ref_alc_encoding = 'Shift-JIS' " 文字化けするならここで文字コードを指定してみる
~~~

この設定の場合だと、ノーマルモードで`,ra hello`とすれば、今までの例と同じように英辞郎 on the Webで「hello」を辞書検索できる。

* * *

<cite>[Vimでref.vimを使ってRubyのリファレンスをただちに検索する](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)</cite>
<cite>[Windows上でref-alcを使う - ::Eldesh a b = LEFT a | RIGHT b](http://d.hatena.ne.jp/eldesh/20101126/1290732900)</cite>

[^1]: この並び順でref.vimでの使用が優先される
[^2]: デフォルトでは`C:\Program Files\Lynx for Win32`
[^3]: gvim.exeと同じ階層
[^4]: set encoding=utf-8
