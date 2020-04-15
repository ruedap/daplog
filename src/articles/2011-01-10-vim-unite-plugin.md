# <span>Vimでファイラー兼ランチャーな</span><span>unite.vimプラグインを使う</span>

ちょっと前から名前は見かけていたんだけど、何をするプラグインなのかよく分からなくて見送っていた。[Twitterでもつぶやいた](http://twitter.com/#!/ruedap/status/23993031476645888)けど、もっと早く導入しておけば良かったと、ちょっと触ってみただけで思った。

<cite>[unite.vim - Unite all sources : vim online](http://www.vim.org/scripts/script.php?script_id=3396)</cite>

どんなことができるかについては、作者さんが公開している[このプレゼン資料](http://www.slideshare.net/Shougo/unite-vim)がわかりやすい。このプラグインについてほとんど知らない自分が、前述のプレゼン資料を読んで、18ページ目に書かれている`:Unite buffer file file_mru`を実行してみて受けた印象は、

> Vim用のコマンドラインランチャー（Windowsで言えばfenrir、Macで言えばQuicksilver）のようなもの

ってかんじ。でも、色々なブログでの紹介を見ていると、ランチャー機能だけにとどまらずかなり広い操作をカバーしており、拡張性も高いみたい。奥が深そう。

<!-- READMORE -->


## .vimrcの設定

ショートカットキーに割り当てて使うのが基本っぽいので、`.vimrc`にこんな感じで割り当ててみた。設定するに当たって、[こちらのページ](http://blog.remora.cx/2010/12/vim-ref-with-unite.html)がとても参考になった。あと[unite.vimのヘルプ](https://github.com/Shougo/unite.vim/blob/master/doc/unite.jax)もすごくしっかり書かれている。

~~~ vim
""" unite.vim
" 入力モードで開始する
" let g:unite_enable_start_insert=1
" バッファ一覧
nnoremap <silent> ,ub :<C-u>Unite buffer<CR>
" ファイル一覧
nnoremap <silent> ,uf :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
" レジスタ一覧
nnoremap <silent> ,ur :<C-u>Unite -buffer-name=register register<CR>
" 最近使用したファイル一覧
nnoremap <silent> ,um :<C-u>Unite file_mru<CR>
" 常用セット
nnoremap <silent> ,uu :<C-u>Unite buffer file_mru<CR>
" 全部乗せ
nnoremap <silent> ,ua :<C-u>UniteWithBufferDir -buffer-name=files buffer file_mru bookmark file<CR>
" ウィンドウを分割して開く
au FileType unite nnoremap <silent> <buffer> <expr> <C-j> unite#do_action('split')
au FileType unite inoremap <silent> <buffer> <expr> <C-j> unite#do_action('split')
" ウィンドウを縦に分割して開く
au FileType unite nnoremap <silent> <buffer> <expr> <C-l> unite#do_action('vsplit')
au FileType unite inoremap <silent> <buffer> <expr> <C-l> unite#do_action('vsplit')
" ESCキーを2回押すと終了する
au FileType unite nnoremap <silent> <buffer> <ESC><ESC> q
au FileType unite inoremap <silent> <buffer> <ESC><ESC> <ESC>q
~~~

他の人の設定を見て回ったところ、「インサートモードで開始」をONにしている人が多かったけど、自分はとりあえずOFFのほうがよさげだったのでOFFった（というかデフォルトではOFF）。履歴やたくさんバッファで開くようになるとONの方が便利かもしれない。とりあえずこれで様子見。


## :eと:lsと:bにさようなら

今までファイルを開くときは、`:e`かファインダー（エクスプローラ）からドロップしてたし、バッファを切り替えるときは、`:ls`からバッファ番号を探して`:b7`とかしてたんだけど、unite.vimの`:Unite buffer`と`:Unite file`がサクっと便利でそれらのコマンドを使わなくなりそう。

これだけでも十分unite.vimをインストールする価値はある。おそらくこれらはunite.vimのほんの一部の機能でしかないのだろうけど。


## Vimに割り当てられてるショートカットキーを調べる方法

unite.vimにショートカットキーを割り当てようとした時も思ったのだけど、Vimで現在割り当てられているショートカットキーを調べる方法ってあるのかな？ご存じの方いたら教えてください。

いつも新しいプラグインを入れて、`.vimrc`にショートカットキーを割り当てる記述をするときに、どのキーが空いてて、どのキーがデフォルトで埋まってて、どのキーに自分がキーを割り当てたか（これは`.vimrc`内を検索すればわかるけど）がすぐにわからなくて悩む。一覧でダーっと出ると嬉しいんだけど。

`:h shortcut`したら出るかなと思ったけど、MacVim固有のショートカットキーだけが出てきた。ネットでも探し方がわるいのかそういう情報（コマンド？）は見つからないっぽいし、他の人はどうしてるんだろう。

<ins>教えてもらった方法はこちら: [Vimで現在割り当てられているショートカットキーの一覧を見る](/2011/01/11/vim-keyboard-shortcut-key)</ins>

* * *

<cite>[せっかくだから、俺はこの Unite + vim-ref を選ぶぜ！ - blog.remora.cx](http://blog.remora.cx/2010/12/vim-ref-with-unite.html)</cite>
