# VimでPHPUnitをQuickRunする

Vim-users.jpの[RSpecをquickrunする記事](http://vim-users.jp/2010/09/hack172/)を参考に、PHPUnit用に書き換えてみる。

<!-- READMORE -->


## .vimrc

PHPやPHPUnit、[quickrun.vim](https://github.com/thinca/vim-quickrun)は既にインストール・セッティング済みの前提。こんな感じで`.vimrc`に記述してみた。

~~~ vim
augroup QuickRunPHPUnit
  autocmd!
  autocmd BufWinEnter,BufNewFile *test.php set filetype=php.unit
augroup END
" 初期化
let g:quickrun_config = {}
" PHPUnit
let g:quickrun_config['php.unit'] = {'command': 'phpunit'}
~~~

これで`HogeClassTest.php`や`fuga_test.php`など、ファイル名末尾が`*test.php`なファイルを開くと、ファイルタイプが`php.unit`になり、このファイルタイプの時に`<Leader>r`を実行でPHPUnitが実行される。

もし`*test.php`じゃないファイルでPHPUnitを実行したければ、`:set ft=php.unit`でファイルタイプを変更して`<Leader>r`すればおｋ

---

<cite>[Vim-users.jp - Hack #172: RSpecをquickrunする (1/2)](http://vim-users.jp/2010/09/hack172/)</cite>
