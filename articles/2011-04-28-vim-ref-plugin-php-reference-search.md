# <span>Vimでref.vimを使って</span><span>PHPのリファレンスをただちに検索する</span>

前回、前々回で[Rubyのリファレンス](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)と、[英辞郎 on the Webで英単語](/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search)を検索する方法を書いたので、今回は自分がref.vimで使っている3つ目（最後）の検索ソース、PHPリファレンスの導入手順も備忘録。

[![PHPのref.vim実行結果](/images/2011/04/28/vim-ref-plugin-php-reference-search-01.png)](/images/2011/04/28/vim-ref-plugin-php-reference-search-01.png)

上記はref.vimで`:Ref phpmanual htmlspecialchars`を実行した結果のキャプチャ画像。

<!-- READMORE -->


## ワイルドカードが使える

個人的にPHPは、今のところRubyほど書く頻度は多く無いので、関数がうろ覚えで「mb\_・・・なんだっけ？」とか思い出せないことがよくあって、そんな時にref.vimはワイルドカードを使って`:Ref phpmanual mb_*`とできるのですごく重宝している。以下のキャプチャはその実行結果（の一部）で、`mb_*`な関数がズラーッとリストアップされている。ここから目的の関数名を選んでエンターを押せば、その関数のリファレンスが表示される。

[![PHPのref.vim実行結果](/images/2011/04/28/vim-ref-plugin-php-reference-search-02.png)](/images/2011/04/28/vim-ref-plugin-php-reference-search-02.png)

ブラウザーのアドレスバーに`php.net/mb_`と入力してネットで検索しても似たようなことができるけど、ref.vimならVimで完結できることと、オフラインでも使えるのが大きなメリット。今回も[前回](/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search)・[前々回](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)と同様に、下記のPHPリファレンス導入前にVim側ではref.vimが使用可能な状態になっていることが前提。


## PHPリファレンスの導入（Mac/Windowsでほぼ共通）

- PHPリファレンスを検索する場合もテキストブラウザーの導入が必要なので、[英辞郎で英単語を検索する記事](/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search)を参考にテキストブラウザーをインストールする
- [ここ](http://jp.php.net/download-docs.php)から「Japanese」の「Many HTML files」のtar.gzファイル（PHPリファレンスのHTML群を圧縮したもの）をダウンロードして解凍する
- 適当な場所に配置する（例: `D:\Documents\phpmanual`）
    - 配置するパスには、空白や日本語が含まれないのが（試してないけど）たぶん好ましい
- .vimrcで、その配置した場所を指定する

~~~ vim
let g:ref_phpmanual_path = 'D:\Documents\phpmanual'
~~~

- Vimから適当にPHPの関数を検索`:Ref phpmanual htmlspecialchars`してみて、冒頭のキャプチャ画像のようなそれっぽいページが出てきたら設定完了!!


## .vimrcでの設定

PHPリファレンスの場合は、上述のファイルへのパス以外は特に設定する項目は無いので、あとはショートカットの割り当てくらい。PHPリファレンスの場合、コマンド名（phpmanual）部分が長いのでショートカット割り当てはほぼ必須。

~~~ vim
""" ref.vim
nmap ,rp :<C-u>Ref phpmanual<Space>
let g:ref_phpmanual_path = 'D:\Documents\phpmanual'
~~~

この設定の場合だと、ノーマルモードで`,rp htmlspecialchars`または`,rp htmlsp*`として一覧から関数名を選択すれば、今までの例と同じようにPHPリファレンスで`htmlspecialchars`を検索できる。


---

<cite>[Vimでref.vimを使ってRubyのリファレンスをただちに検索する](/2011/04/26/vim-ref-plugin-ruby-reference-search-tool-refe2)</cite>
<cite>[Vimでref.vimを使って英辞郎で英単語をただちに検索する](/2011/04/27/vim-ref-plugin-alc-eijiro-english-dictionary-search)</cite>
<cite>[ref.vimを入れてみた - hamacoの日記](http://d.hatena.ne.jp/hamaco/20100527/1274975617)</cite>
<cite>[ref.vim を入れる - Heavens hell](http://d.hatena.ne.jp/heavenshell/20100606/1275831502)</cite>
<cite>[vimプラグインでよりよいコーディングを | tech.kayac.com - KAYAC engineers' blog](http://tech.kayac.com/archive/vim-plugin-coding.html)</cite>
