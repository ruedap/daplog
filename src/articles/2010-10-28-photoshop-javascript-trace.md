# <span>Photoshop上の操作をJavaScriptコードに書き出す</span><span>プラグインを有効にする</span>

Photoshop上の操作をJavaScriptコードに書き出すプラグイン「ScriptListener.8li」を有効にする手順をメモ。

<!-- READMORE -->


## ScriptListener.8liを有効化

`C:\Program Files\Adobe\Adobe Photoshop CS4\Scripting\Utilities`

にある「ScriptListener.8li」をコピって、

`C:\Program Files\Adobe\Adobe Photoshop CS4\Plug-ins\Automate`

にペーストする。でPhotoshopを再起動。以降Photoshopを操作すると、アクションパネルで記録できる動作のすべてがデスクトップ上の`ScriptingListenerJS.log`に追記されていく。ちなみにVB用のコードも生成されるみたい。

---

<cite>[photoshop/js/scriptlistener: スーパー肩パッドの「Flashセレブ道」wiki](http://katapad.com/flash/wiki/index.php?photoshop%2Fjs%2Fscriptlistener)</cite>
