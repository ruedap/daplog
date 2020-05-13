# <span>WindowsでCapsLockにCtrlを割り当てて</span><span>元のCtrlはそのままにする</span>

Windowsを再インストールするたびに、毎回ググって調べてる気がするので備忘録。CapsLockと左Ctrlを「入れ替える」ってのは結構出てくるんだけど、タイトルの通り、*CapsLockにだけCtrlを割り当てて、元のCtrlはそのままを維持する*っていうページ（レジストリのコード）を見つけるのに毎回ちょっとだけ苦労するので。

<!-- READMORE -->


## CapsLockにCtrlを割り当てて、Ctrlはそのまま

自分は*CapsLockは要らない派*なので、Aの横もCtrl、キーボードの左下もCtrlのダブルコントローラーでキーボードを使っている。ちなみに、iMacやMacBook Proでも同じ[JIS配列のキーボード](http://store.apple.com/jp/product/MC184J/A)を使っていて、こちらはデフォルトでAの横がCtrlなので、左下のCapsLockをCtrlに割り当てて使っている。ので、WindowsでもMacでも配列をほぼ同じにできている。

で、Macでは普通に環境設定から割り当てられるんで調べる必要はないんだけど、Windowsはレジストリをいじらないとできないのでクリーンインストールするたびに毎回そのコードをググってたんだけど、前述のとおり入れ替える方法はすぐ出てきても、片方だけ置き換えるのは探すのにちょっと時間がかかったりするので、備忘録としてメモ。

今回は[こちらの記事](http://d.hatena.ne.jp/shunsuk/20081213/1229174302)を参考にさせてもらった。元記事ではXPでしか試してないと書かれているけれど、Windows 7でも正しく動いてる。

~~~ sh
REGEDIT4
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
"Scancode Map"=hex:00,00,00,00,00,00,00,00,02,00,00,00,1d,00,3a,00,00,00,00,00
~~~

上記を適当にregファイルに保存して実行すればおｋ

---

<cite>[WindowsのMS-IMEやGoogle日本語入力で英数／かなキーを使ってIMEの状態を切り替える](/2011/03/23/mac-windows-bootcamp-ms-ime-google-input-toggle)</cite>
<cite>[WindowsのCtrlとCapsLockを入れ替える - このブログは証明できない。](http://d.hatena.ne.jp/shunsuk/20081213/1229174302)</cite>
