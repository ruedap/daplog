# <span>Travis CIのテスト結果を</span><span>HipChatに通知する</span>

[前回の記事](/2013/09/02/travis-ci-coveralls-code-climate-github-badge)に関連して、[このリポジトリ](https://github.com/ruedap/alfred2-font-awesome-workflow)で[Travis CI](http://travis-ci.com/)を使って継続的インテグレーションを行うようにしたので、そのテスト結果を[HipChat](https://www.hipchat.com/)にも通知されるようにした。こんな感じ。

[![HipChat notification](/images/2013/09/12/travis-ci-hipchat-notifications-01.png)](/images/2013/09/12/travis-ci-hipchat-notifications-01.png)

テストに失敗すると以下のような感じで、怒りに満ちた王蟲の目のような赤色に。

[![HipChat notification](/images/2013/09/12/travis-ci-hipchat-notifications-02.png)](/images/2013/09/12/travis-ci-hipchat-notifications-02.png)

通知系を設定する場合は、APIトークンを入力するか、設定画面でポチッとするだけで簡単な事が多いけど、パブリックリポジトリでのTravis CIは、設定を`.travis.yml`に記述するので情報が公開されてしまう。それを回避するために[暗号化する方法](http://about.travis-ci.org/docs/user/encryption-keys/)が提供されている。

<!-- READMORE -->

## travis encrypt

まずは[travis gem](https://rubygems.org/gems/travis)をインストールする。このgemは、Travis CIに関する各種操作をCLIから実行できるもので、前述の暗号化もこれを利用する。このgemの`travis encrypt`コマンドを使用して、対象の文字列を暗号化できる。

今回はHipChatへの通知を行うための*APIトークン*と*チャットルーム名*がその対象になる。

~~~ sh
$ ruby -v
ruby 2.0.0p247 (2013-06-27 revision 41674) [x86_64-darwin12.4.0]
$ gem install travis
$ cd [PROJECT ROOT]
$ travis encrypt [APIトークン]@[チャットルーム名] --add notifications.hipchat.rooms
~~~

[ドキュメント](http://about.travis-ci.org/docs/user/notifications/#HipChat-notification)に書かれているように、`APIトークン@チャットルーム名`の書式で記述する必要があるので、`travis encrypt`コマンドでも同じように指定して暗号化を行う。`--add`オプションは、暗号化した結果の文字列を自動で`.travis.yml`に追記してくれるもので、上記を実行すると`.travis.yml`の末尾に以下のような通知設定が追記されているはず。

~~~ yaml
notifications:
  hipchat:
    rooms:
      secure: faqwuptB9Hajlgb5Lh/WcKoREic+ZDO9EGCc28kgI+8PIY+d+xovsvbu6flJZymzr9g9s4rtP/HHrU+YODIo5k1EnGtspcVZY3e7nCQOYwRxlYoISUl9du9tqETmQr35hwwe/fq1cjOlMdayvqqmUFpXWetQey9+gQfuvE44q1c=
~~~

ちなみにAPIトークンは、[HipChat](https://www.hipchat.com/)のサイトにログインした状態で[このURL](https://www.hipchat.com/admin/api)にアクセスするとトークン生成用のページに移動できる。APIトークンを生成するには管理者権限が必要。また、チャットルーム名の一覧ページには[このURL](https://www.hipchat.com/rooms/ids)からアクセスできる。

最終的に、暗号化された通知設定部分を追加した状態の`.travis.yml`全体は[こちら](https://github.com/ruedap/alfred2-font-awesome-workflow/blob/08003163759b3d1ce0e5c05f7fb5aa1588461029/.travis.yml#L10-L13)。
