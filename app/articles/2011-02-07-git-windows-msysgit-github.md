# WindowsでGitするためにmsysGitを使う

[msysGit](http://code.google.com/p/msysgit/)のアイコンはなんとなく初音ミクに見える。

<!-- READMORE -->


## インストールとショートカット作成

[msysGit](http://code.google.com/p/msysgit/)のサイトから最新版(msysGit-fullinstall-1.7.4-preview20110204.exe)をダウンロードして、Windows Vista/7なら「管理者として実行」でインストールする。

インストールが完了すると`$`マークのプロンプトが表示される。そこで以下のコマンドを入力して、スタートメニューにショートカットを作成する。

~~~ sh
$ /share/msysGit/add-shortcut.tcl StartMenu
~~~

コピペする場合は、ウィンドウのタイトルバーを右クリックして出るコンテキストメニューの「編集」から行う。スタートメニューに作成されたmsysGitアイコンをクリックしてコマンドプロンプト（Git bash)が起動することを確認する。これが確認できたら、インストール時に使用したコマンドプロンプトウィンドウを閉じてもおｋ。


## SSH公開鍵の作成

Git bashを起動してSSH公開鍵を作成する

~~~ sh
$ ssh-keygen -t rsa -C "YOUR_EMAIL_ADDRESS@example.com"
~~~

すると`C:\Users\ruedap\.ssh`フォルダの中に、`id_rsa`（秘密鍵）と`id_rsa.pub`（公開鍵）が作成される。


### GitHubにSSH公開鍵を登録

GitHubに行ってログインし、アカウントの設定画面からSSH公開鍵のところで「別の公開鍵の追加」を押して、`id_rsa.pub`の中身をペーストする。タイトルには使っているマシンの名前（種類）などを入れておくと良い。試しに自分の確認用リポジトリから`clone`してみる。

~~~ sh
$ git clone git@github.com:ruedap/hello-github.git
~~~

途中でパスワードを聞かれるので、先ほどSSH鍵作成時に入力したパスワードを入れる。`clone`したファイルをちょっといじって、`add`と`commit`したら、「名前とメアド入ってないから入力しとき？」的なメッセージが出た。

~~~ sh
$ git add .
$ git commit -m 'test msysGit'
[master a6c3a4a] test msysGit
 Committer: unknown <ruedap@.(none)>
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
You can suppress this message by setting them explicitly:

    git config --global user.name "Your Name"
    git config --global user.email you@example.com
~~~

Gitさんの老婆心を快く受け入れ、Git bashから以下のようにユーザー名とメールアドレスを入力する。

~~~ sh
$ git config --global user.name "ruedap"
$ git config --global user.email ruedap@example.com
~~~

でGitHubにプッシュする。

~~~ sh
$ git push origin master
~~~

成功。GitHubを見てみると、あれ？プッシュした人が*unknown*になってる。おかしいので、もう一度`commit`してプッシュしてみる。今度はちゃんとプッシュした人がruedapになった。`commit`してから名前とメールアドレスを設定したからunknownになったみたい。とりあえず基本的な操作はできるようになったのでよしとする。

WindowsのコマンドプロンプトはShift\_JISなので、UTF-8の日本語とかを表示するとやっぱり文字化けするみたい。ここらへんを解消するには、cygwinとか使わないとダメかな？

* * *

<cite>[Windows 上に Git 環境を構築する方法(TortoiseGit と msysGit) \| 日本Symfonyユーザー会](http://www.symfony.gr.jp/git/setup-git-windows)</cite>
