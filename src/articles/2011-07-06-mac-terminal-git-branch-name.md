# <span>Macのターミナルで</span><span>Gitのブランチ名を表示する</span>

VimのステータスラインにGitのブランチ名を表示させる、という記事で以下の一文が。

> 当然、ターミナルのプロンプトには表示させてますよね？
>
> <cite>[今こそ！git の branch を vim のステータスラインに表示！！するとき！！！](http://marutanm.hatenablog.com/entry/20110706/p1)</cite>

すみません、表示させてませんでしたッ…!  WindowsでmsysGit使ってる時にはプロンプトにブランチ名が表示されてて、これ結構便利かもなーとは思ってたんだけど、そもそも自分はGitのブランチをまともに使えてないので、ありがたみがよくわかってなかった。でもこれからちゃんと使うためにも早めに表示しておいたほうが良さそう。上記の記事のようにVimでも表示させたいしね。というわけで、とりあえずMacのターミナルでGitのブランチ名を表示できるようにしておく。完成形はこうなる。

[![完成形のターミナル](/assets/2011/07/06/mac-terminal-git-branch-name-01.png)](/assets/2011/07/06/mac-terminal-git-branch-name-01.png)

<!-- READMORE -->


## git-completion.bash

今回は[こちらの記事](http://css.studiomohawk.com/tool/2011/02/13/terminal-101/)を参考にさせてもらった。ちなみに変更前のターミナルはこんな感じ。

[![変更前のターミナル](/assets/2011/07/06/mac-terminal-git-branch-name-02.png)](/assets/2011/07/06/mac-terminal-git-branch-name-02.png)

まずは*git-completion.bash*をインストールする。デフォルトで入ってるかもしれないと前述の記事では書かれていたけど、自分の環境（スノーレパードにHomebrewでGitをインストールした状態）では入ってなかった。

<ins>[@marutanm](http://twitter.com/#!/marutanm)さんに、Homebrewで入れた場合は`/usr/local/Cellar/git/1.7.4.2/etc/bash_completion.d/git-completion.bash`にあるよと教えてもらった、あざっす!</ins>

- [contrib/completion at master from git/git - GitHub](https://github.com/git/git/tree/master/contrib/completion)

上記から`git-completion.bash`を落としてきて、`/usr/local/git/contrib/completion/`に配置する。

~~~ sh
$ mkdir -p /usr/local/git/contrib/completion/
$ mv git-completion.bash /usr/local/git/contrib/completion/
~~~


## .bashrc

次に`.bashrc`に以下の設定を記述する。

~~~ sh
# git settings
source /usr/local/git/contrib/completion/git-completion.bash
GIT_PS1_SHOWDIRTYSTATE=true
export PS1='\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[31m\]$(__git_ps1)\[\033[00m\]\$ '
~~~

保存したら、`.bashrc`を反映させる。

~~~ sh
$ source ~/.bashrc
~~~

これで完了。もう色が付いてる。

[![色が付いたターミナル](/assets/2011/07/06/mac-terminal-git-branch-name-03.png)](/assets/2011/07/06/mac-terminal-git-branch-name-03.png)

ちょっと横に長すぎる気もするけど、とりあえずこれで使ってみよう。


## 配色について

上記のキャプチャの文字色の配色が気に入ってたんだけど、Lionにしたのが原因なのかどうなのか、何かのキッカケで色が変わってしまって、非常に見づらくなった。こんな感じ。これがデフォルト？

[![Lionにしたら色が変わってしまったターミナル](/assets/2011/07/06/mac-terminal-git-branch-name-04.png)](/assets/2011/07/06/mac-terminal-git-branch-name-04.png)

で、最初のキャプチャのような色に、元に戻したくて上述の配色の値を調べたので備忘録。


### ターミナルのカラー設定

ターミナルの*環境設定* → *設定* → デフォルトのプロファイルを選択 → *テキスト*タブ → *ANSIカラー* でANSIカラーの上の段（標準）を以下の値に設定する。

| |R|G|B|
|-|-:|-:|-:|
|黒|96|98|97|
|赤|255|129|119|
|緑|173|251|133|
|黄|255|253|202|
|青|165|214|249|
|紫|255|144|247|
|水|162|254|255|
|白|240|240|240|

[![ターミナルのカラー設定](/assets/2011/07/06/mac-terminal-git-branch-name-05.png)](/assets/2011/07/06/mac-terminal-git-branch-name-05.png)

で完了。元通り。

[![ちょっと色が薄くなったターミナル](/assets/2011/07/06/mac-terminal-git-branch-name-06.png)](/assets/2011/07/06/mac-terminal-git-branch-name-06.png)

ちょっと色が薄くなっちゃったけどまぁいっか。

* * *

<cite>[ターミナルを使いこなす - CSS Radar - For Frond End Developers](http://css.studiomohawk.com/tool/2011/02/13/terminal-101/)</cite>
