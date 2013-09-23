# VimでGrepと一括置換

VimでGrepと一括置換するコマンドをすぐ忘れる。

<!-- READMORE -->


## Grep

~~~ vim
:vimgrep /hoge/j **/*.txt | cw
~~~

- `j`オプションは最初のマッチを自動で開かない
- cwは検索結果をQuickfixに表示
- Quickfixウィンドウは`:cn`でマッチした次の行へ、`:cp`で前の行に戻る


## 一括置換

~~~ vim
:args *.txt
:args
:argdo %s/hoge/fuga/g | update
~~~

1. 対象ファイルを登録、サブディレクトリも対象にする場合は`**/*.txt`
2. 1行目で登録されたファイルを表示して確認（やらなくてもOK）
3. 単体ファイル対象の置換と同じ感じで`argdo`する、`update`は変更のあったファイルのみ保存するコマンド

* * *

<cite>[Vimで複数ファイルを纏めて編集する - Archiva](http://archiva.jp/web/tool/vim_grep.html)</cite>
