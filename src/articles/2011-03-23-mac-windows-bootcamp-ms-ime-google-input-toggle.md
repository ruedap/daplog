# <span>WindowsのMS-IMEやGoogle日本語入力で</span><span>英数／かなキーを使ってIMEの状態を切り替える</span>

Macの英数キーでIMEをOFF、かなキーでIMEをONに慣れてしまうと、WindowsでのAlt+半角キー（または半角キーのみ）でIMEのON/OFF状態をトグルするのはとても非効率だと感じるようになる。で、Boot Campや仮想マシン上のWindowsを触ったときに、英数キーを押すとカタカナとかになってイラッとする。これらの仮想環境のWindows上でも英数キーを押せばIMEがOFFになるように変更する方法を調べたので備忘録。使っているキーボードは、[Apple Wireless Keyboard (JIS) MC184J/A](http://store.apple.com/jp/product/MC184J/A)なので、Windows用キーボードだとキーの割当が違うかもしれない。Apple Wireless Keyboardの場合は、なぜか無変換キーを修正・割当することで変更できた。

<!-- READMORE -->


## Google日本語入力

1. タスクトレイ等に表示されているGoogle-IMEのアイコンを右クリックしてコンテキストメニューから「設定」をクリックする
2. IMEの一覧から「Google 日本語入力」を選択した状態で、「プロパティ：ボタンをクリックする
3. 「Google 日本語入力 プロパティ」ウィンドウが開くので、「一般」タブ内の「キー設定の選択」項目で「カスタム」を選択して「編集」ボタンを押す
4. 「Google 日本語入力 キー設定」ウィンドウが開くので、左下の「編集」ボタンから「定義済みキーマップからインポート」→「MS-IME」を選択する
5. MS-IMEの設定がインポートされるので、スクロールして一番下を表示させ、以下のようにこの3行の「入力キー」部分をクリックして、「割り当てるキーの入力:」で割り当てたいキー（英数キー）を入力する。Apple Wireless Keyboardで英数キーを押した場合だと「Muhenkan」と表示される

|場所|修正前|修正後|
|-|-|-|
|下から7行目|入力なし／Hankaku/Zenkaku／IME を無効化|入力なし／Muhenkan／IME を無効化|
|下から4行目|変換前入力中／Hankaku/Zenkaku／IME を無効化|変換前入力中／Muhenkan／IME を無効化|
|下から1行目|変換中／Hankaku/Zenkaku／IMEを無効化|変換中／Muhenkan／IMEを無効化|


## MS-IME

1. タスクトレイ等に表示されているIMEバーのツールアイコンをクリックしてプロパティを選ぶ
2. 「Microsoft IME スタンダードのプロパティ」ウィンドウが開くので、全般タブの設定ボタンをクリックする
3. 「Microsoft IME 詳細プロパティ」ウィンドウが開くので、キー設定タブの「\*キー」列にある「無変換」行を見つける[^1]
4. 「無変換」行の2番目の列[^2]の「かな英数」をダブルクリックする
5. 「機能選択」ウィンドウが開くので、一覧の中から「IME-オン/オフ」を選んでOKボタンを押す

---

<cite>[日本語入力のOn/Off切り替えキーを変更する：IME 日本語入力システムの使い方](http://www.relief.jp/itnote/archives/001818.php)</cite>

[^1]: 普通に考えると、「英数」の行を見つけるべきだけど、Boot Camp上で「Apple Wireless Keyboard (JIS) MC184J/A」を接続している場合、デフォルトで英数キーには無変換が割り当てられていた。何が割り当てられているかを調べるには[ChangeKey](http://www.forest.impress.co.jp/lib/sys/hardcust/keyboard/changekey.html)などのフリーソフトを使用
[^2]: 「入力/変換済み文字なし」の列
