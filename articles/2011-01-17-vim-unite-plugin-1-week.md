# <span>Vimでunite.vimプラグインを</span><span>使い始めて一週間</span>

[unite.vim](/2011/01/10/vim-unite-plugin)には気付かなかったことや使い方が変わったところなどがちらほらあったので備忘録。以下要点。

- 「起動時にインサートモードで開始」はONにするべきだった
- インサートモードから`<C-u><C-h>`でunite.vimを終了できる
- `<C-m>`で一番上に表示されているパスを確定（補完）できる
- `<C-w>`を単語単位からパス単位で削除するように変更した

<!-- READMORE -->


## 「起動時にインサートモードで開始」はONにするべきだった

[初日の記事](/2011/01/10/vim-unite-plugin)では「起動時にインサートモードで開始」はOFFのほうが使いやすそうとか書いたけど、他の人が結構ONにしている理由がなんとなくわかった。OFFのほうが良いと思った一番大きな理由は「インサートモードじゃリスト上をjkで移動できないじゃんJK」だったんだけど、ヘルプを読んでいたら、インサートモードでも多くの操作ができるようデフォルトでキーマッピングがされていた。この表はノーマルモードでのunite.vimのデフォルトキーマッピング（ヘルプから抜粋）

|キー|説明|
|-|-|
|`<ESC>`|ノーマルモードに移行する|
|`<Tab>`|選択している候補に対して実行するアクションを選択する|
|`<C-n>` または `<Down>`|次の候補に移動。ただし候補の最後にいる場合はループする|
|`<C-p>` または `<Up>`|前の候補に移動。ただし候補の先頭にいる場合はループする|
|`<C-f>`|次の候補ページを表示|
|`<C-b>`|前の候補ページを表示|
|`<CR>`|選択している候補に対してデフォルトのアクションを実行する|
|`<C-h>` または `<BS>`|カーソル直前の1文字を消す。文字が入力されていない場合はuniteを終了する|
|`<C-u>`|カーソルから行の先頭までの文字をすべて削除する|
|`<C-w>`|カーソル直前の単語を削除する|
|`<C-a>` または `<Home>`|カーソルを行の先頭に移動する|
|`/`|候補を選択している場合は narrow アクションの実行|
|`d`|候補を選択している場合は delete アクションの実行[^1]|
|`<Space>`|候補を選択している場合はカレント行の候補のマークを反転させる。複数の候補をマークすれば、複数の候補に対して一気にアクションを実行することができる|
|`x`|候補を選択している場合はクイックマッチを行い、選択した候補のデフォルトアクションを実行する。マークしている候補がある場合は無効となる。|

このように、リスト上の移動（`<C-n>`と`<C-p>`）をはじめ、基本となる操作はインサートモードで行えるようにデフォルトでマッピングされているので、「リスト上の移動がインサートモードを抜けないとできないから」という理由で「インサートモードでの開始」を諦めるのは間違っていることに気づいた。

その他のデフォルトのキーマッピングでは、`<C-u>`と`<C-w>`が便利。`<C-u>`は最近知ったんだけど、ターミナルとかCocoaアプリのエディタ部分でも使えるんだよね。Emacs由来のキーバインドなのかな？ Emacs由来といえば、`<C-a>`があって`<C-e>`がないのがちょっと気になって、自分で割り当てようと思ってヘルプを見たらコマンドそのものがなかった。とりあえず`<ESC>A`で。

## インサートモードからunite.vimを終了できる

上のデフォルトキーマッピングを知ったことで、“インサートモードでちゃんと入力エリアにフォーカスが当たっている状態”であれば、`<C-u><C-h>`することでunite.vimを終了できることに気づいた。`<C-a><C-h>`でもおｋだけど、`<C-u><C-h>`のほうが押しやすい。

ただ、上に書いたとおり入力エリアにフォーカスが当たってないとダメで、unite.vim上の1行目や3行目以降にカーソルがある場合やもちろんノーマルモードでは発動しないので、そんときは大人しく`<ESC>:q`や初日に割り当てた`<ESC><ESC>`などで終了する。

unite.vimは慣れると何も実行せずに終了することは少なくなっていくかもしれないけど、最初のうちは「あれ、履歴にあると思ったのになかった」とか「bufferじゃなくてfileで開くべきだった」とか、結構間違って開いてしまうことがあるので、慣れるまでは簡単に終了できるようにしておくのは良いと思う。


## `<C-m>`で一番上に表示されているパスを確定（補完）できる

これはヘルプに載ってなくて、なぜ出来るのか理由がわからないのだけど、たまたま押して気づいた。インサートモードでパスを入力中に`<C-m>`を押すと、その時リストで一番上のハイライトされているパスを確定（入力エリア上に補完）できる。

~~~ sh
  >/Users/ruedap/.vim/bundle/un|←ここにカーソルがある状態で<C-m>を押すと
  - file  /Users/ruedap/.vim/bundle/unite.vim/ ←一番上のパスを補完できる
  - file  /Users/ruedap/.vim/bundle/vim-quickrun/
  - file  /Users/ruedap/.vim/bundle/vim-surround/
~~~

上の状態で`<C-m>`を押すと`/Users/ruedap/.vim/bundle/unite.vim/`までが入力エリアに補完される。これがかなり便利。


## `<C-w>`を単語単位からパス単位で削除するように変更した

|`<C-w>`|カーソル直前の単語を削除する|

デフォルトの挙動でも十分便利なんだけど、単語単位ではなくパス単位で削除するように設定を上書きした。以下がそれ。

~~~ vim
autocmd FileType unite call s:unite_my_settings()
function! s:unite_my_settings()
  " 単語単位からパス単位で削除するように変更
  imap <buffer> <C-w> <Plug>(unite_delete_backward_path)
endfunction
~~~

単語単位だとスラッシュやドット毎に削除が止まるんだけど、パス単位だと常にスラッシュまで全部削除、という挙動になる。

以下は単語単位の設定での`<C-w>`を1回押すごとの挙動。

~~~ sh
  >/Users/ruedap/.vim/bundle/unite.vim/
  >/Users/ruedap/.vim/bundle/unite.vim
  >/Users/ruedap/.vim/bundle/unite.
  >/Users/ruedap/.vim/bundle/unite
  >/Users/ruedap/.vim/bundle/
  >/Users/ruedap/.vim/bundle
  >/Users/ruedap/.vim/
~~~

以下はパス単位の設定での`<C-w>`を1回押すごとの挙動。

~~~ sh
  >/Users/ruedap/.vim/bundle/unite.vim/
  >/Users/ruedap/.vim/bundle/
  >/Users/ruedap/.vim/
  >/Users/ruedap/
  >/Users/
  >/
~~~

後者のほうが好みなので上書き変更したけど、両方それぞれのキーマッピングに設定することももちろん可能。


## .vimrcの設定

前回のunite.vimを起動するキーマッピングは、ノーマルモードからしか呼び出せない（`,uu`とか）ものだったけど、便利なのでインサートモードからも呼び出せるように`<C-f>`と`<C-b>`に割り当てた。[^2]

現時点でのunite.vim部分の`.vimrc`はこんな感じ。前回設定した`<,u～>`なキーマッピングはとりあえず残してあるだけで、今後はあまり使わなくなる予定。

~~~ vim
""" Unite.vim
" 起動時にインサートモードで開始
let g:unite_enable_start_insert = 1
" インサート／ノーマルどちらからでも呼び出せるようにキーマップ
nnoremap <silent> <C-f> :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
inoremap <silent> <C-f> <ESC>:<C-u>UniteWithBufferDir -buffer-name=files file<CR>
nnoremap <silent> <C-b> :<C-u>Unite buffer file_mru<CR>
inoremap <silent> <C-b> <ESC>:<C-u>Unite buffer file_mru<CR>
" バッファ一覧
nnoremap <silent> ,ub :<C-u>Unite buffer<CR>
" ファイル一覧
nnoremap <silent> ,uf :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
" レジスタ一覧
nnoremap <silent> ,ur :<C-u>Unite -buffer-name=register register<CR>
" 最近使用したファイル一覧
nnoremap <silent> ,um :<C-u>Unite file_mru<CR>
" 全部乗せ
nnoremap <silent> ,ua :<C-u>UniteWithBufferDir -buffer-name=files buffer file_mru bookmark file<CR>
" unite.vim上でのキーマッピング
autocmd FileType unite call s:unite_my_settings()
function! s:unite_my_settings()
  " 単語単位からパス単位で削除するように変更
  imap <buffer> <C-w> <Plug>(unite_delete_backward_path)
  " ESCキーを2回押すと終了する
  nmap <silent><buffer> <ESC><ESC> q
  imap <silent><buffer> <ESC><ESC> <ESC>q
endfunction
~~~

というわけで、まだまだ序の口の機能しか使えてなくて、kindとかactionとかsourceとかは未だによく分かってないけど、それでもかなり便利にファイルにアクセスできるので早くも手放せなくなってきた感が出まくり。素晴らしい。

---

<cite>[fuf → unite に乗り換えて一ヶ月 - basyura’s blog](http://d.hatena.ne.jp/basyura/20101005/p1)</cite>

[^1]: 初めに見たときはファイルが削除されるのかと思ったけど、そうではなく、バッファ上や履歴上からの削除
[^2]: 元々割り当てられているページスクロールは、`<Space>`と`<S-Space>`に割り当てているので、自分の場合はこの`<C-f>`と`<C-b>`をつぶしても問題なかった
