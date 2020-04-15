# VirtualBoxの共有フォルダ設定

VirtualBoxでホストとゲスト間の共有フォルダを作る手順を毎回忘れるのでメモ。

<!-- READMORE -->


## ホストOS：Windows 7、ゲストOS：Windows XPの場合

- ホストOS側に共有フォルダ用フォルダを作る（例: `D:\VirtualMachines\VirtualBox\Shared`）
- VirtualBoxの設定で「デバイス」->「共有フォルダ」を開き、「共有フォルダ」の方に上記のパスを追加する。フォルダ名は`Shared`、「永続化する」をONにする
- ゲストOS側のコマンドプロンプトで、「net use 使用するドライブ名: `\\vboxsvr\` 上記で指定した共有フォルダ名」と入力して実行する

~~~ sh
net use x: \\vboxsvr\Shared
~~~

これでゲストOS側のマイコンピュータのネットワークドライブに、上記で追加したフォルダが「'vboxsvr'の Shared (X:)」のような感じで追加される。

1ドライブ1フォルダっぽいので、さらに別のフォルダを追加したい場合はドライブ名を変える。また、`net use`コマンドを使わずに、エクスプローラのアドレス欄などに直接`\\vboxsvr\共有フォルダ名`でもアクセス可能ぽい。

* * *

<cite>[VirtualBoxの共有フォルダ - J備忘録](http://blog.goo.ne.jp/j_adversaria/e/9eace0f5c9a27066ce6121fd895d8192)</cite>
