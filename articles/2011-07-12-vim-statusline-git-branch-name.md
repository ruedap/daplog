# <span>Vimのステータスラインに</span><span>Gitのブランチ名を表示する（右側に）</span>

[前回の記事](/2011/07/06/mac-terminal-git-branch-name)で、とりあえず*MacのターミナルでGitのブランチ名を表示*できたので、そのきっかけの元記事[VimのステータスラインにGitのブランチ名を表示する](http://d.hatena.ne.jp/marutanm/20110706/p1)を実行してみた。

記事のとおりにやったらサクっとブランチ名を表示できたんだけど、そのままだと*見た目が思い通りではなかった*ので、ちょっとカスタマイズしてみた。こんな感じ。

[![MacVimのカスタマイズ後](/images/2011/07/12/vim-statusline-git-branch-name-01.png)](/images/2011/07/12/vim-statusline-git-branch-name-01.png)

そう、**ブランチ名を右側に表示**したかった。以下はそれについての備忘録。

<!-- READMORE -->


## Gitのブランチ名を右側に表示する

まず前提として、*VimのステータスラインにGitのブランチ名を表示する方法*については、id:marutanmさんの[こちらの記事](http://d.hatena.ne.jp/marutanm/20110706/p1)を見てもらえばおｋ（丸投げ）

上記の記事の通りに設定して、既にGitのブランチ名の表示はできてるとして、これをそのまま使うと*それまで使っていたカスタマイズしたステータスラインの表示*と変わってしまう。今まで使っていた.vimrcのstatusline部分はだいたいこんな感じ。それぞれの記号の意味も知らずにコピペして使ってた。

~~~ vim
set statusline=%<[%n]%m%r%h%w%{'['.(&fenc!=''?&fenc:&enc).':'.&ff.']'}%y\ %F%=%l,%c%V%8P
~~~

それで、このオプションを1個ずつ分解して、記号の意味を調べて、ちょっと修正を加えつつ、*Gitのブランチ名が右側*に来るようにしたのが以下。

~~~ vim
" ステータスラインの表示
  set statusline=%<     " 行が長すぎるときに切り詰める位置
  set statusline+=[%n]  " バッファ番号
  set statusline+=%m    " %m 修正フラグ
  set statusline+=%r    " %r 読み込み専用フラグ
  set statusline+=%h    " %h ヘルプバッファフラグ
  set statusline+=%w    " %w プレビューウィンドウフラグ
  set statusline+=%{'['.(&fenc!=''?&fenc:&enc).':'.&ff.']'}  " fencとffを表示
  set statusline+=%y    " バッファ内のファイルのタイプ
  set statusline+=\     " 空白スペース
if winwidth(0) >= 130
  set statusline+=%F    " バッファ内のファイルのフルパス
else
  set statusline+=%t    " ファイル名のみ
endif
  set statusline+=%=    " 左寄せ項目と右寄せ項目の区切り
  set statusline+=%{fugitive#statusline()}  " Gitのブランチ名を表示
  set statusline+=\ \   " 空白スペース2個
  set statusline+=%1l   " 何行目にカーソルがあるか
  set statusline+=/
  set statusline+=%L    " バッファ内の総行数
  set statusline+=,
  set statusline+=%c    " 何列目にカーソルがあるか
  set statusline+=%V    " 画面上の何列目にカーソルがあるか
  set statusline+=\ \   " 空白スペース2個
  set statusline+=%P    " ファイル内の何％の位置にあるか
~~~

これで最初のキャプチャのように、右側にGitのブランチ名を表示させることができた。

今回の件とは関係ないけど、現状はウィンドウの横幅によってファイル名を*フルパス*か*ファイル名だけ*か切り替えてるけど、できればバッファの横幅で判定するようにしたいなぁと思いつつ面倒で調べてない。とりあえずブランチ名を希望通りに表示する環境は整った。

---

<cite>[今こそ！git の branch を vim のステータスラインに表示！！するとき！！！ - Meltdown Countdown](http://d.hatena.ne.jp/marutanm/20110706/p1)</cite>
