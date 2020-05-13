# <span>Font Awesome 4.0に対応した</span><span>Alfred Workflowをリリースしました</span>

<figure>
<a href="https://github.com/ruedap/alfred2-font-awesome-workflow">
<img src="/images/2013/10/25/alfred-workflow-for-font-awesome-4-01.png" alt="Font Awesome Workflow for Alfred 2">
<figcaption>Font Awesome Workflow for Alfred 2</figcaption>
</a>
</figure>

Font Awesomeのアイコンフォントを検索できる[Alfred 2](http://www.alfredapp.com/)用Workflow「[Font Awesome Workflow for Alfred 2](https://github.com/ruedap/alfred2-font-awesome-workflow)」を最新のFont Awesome 4.0に対応しました。

## Font Awesome 4.0

一昨日リリースされた[Font Awesome 4.0](http://fontawesome.io/whats-new/)は、新しいアイコンの追加は少なかったのですが、コード部分での大幅な変更が加えられていて、**後方互換性がありません**。

Font Awesome 4.0を使用する上で従来から大きく変わったのは主に3点で、

- クラス名のプレフィックスが`icon-`から`fa-`に変更された
- アイコンの命名ルールが改善された上で既存クラス名が変更された
- シングルクラス方式からマルチクラス方式に変更された

例えばHTML上では以下のような記述になります。

~~~ html
<i class="icon-circle-arrow-right"></i> 3.2までの書き方
<i class="fa fa-arrow-circle-right"></i> 4.0からの新しい書き方
~~~

同じアイコンでも上記のように[3.2](http://fontawesome.io/3.2.1/icon/circle-arrow-right/)と[4.0](http://fontawesome.io/icon/arrow-circle-right/)で[名称自体が変わっているもの](https://github.com/FortAwesome/Font-Awesome/wiki/Upgrading-from-3.2.1-to-4)もあり、プレフィックスも変わり、さらに、常に付ける必要のあるベースクラス`fa`が追加されました。

昨日リリースした[Font Awesome Workflow for Alfred 2](https://github.com/ruedap/alfred2-font-awesome-workflow)のバージョン1.0.0では、それらの変更に対応しているため、こちらも後方互換性が無くなっています。Font Awesome 3.2を使用する場合は[古いバージョン](https://github.com/ruedap/alfred2-font-awesome-workflow/releases/tag/0.3.0)を利用してください。

## 新しいキーワード

[![New keyword](/images/2013/10/25/alfred-workflow-for-font-awesome-4-02.png)](/images/2013/10/25/alfred-workflow-for-font-awesome-4-02.png)

冒頭のスクリーンショットにも写っていますが、Workflowのキーワードを従来の`fonta`とは別に`fa`を追加しました。前述の通り、4.0からはクラス名のプレフィックスが`fa-`になり、ベースクラスの名前も`fa`なので、キーワードもそれと同じにしました。これはエイリアスで、`fa`と`fonta`に**機能的な違いは何もありません**。

従来の`fonta`を残しているのは、このキーワードに慣れていたため使っていて何度も打ち間違えたのと、直感的な度合いで言えばこちらの方が若干良いかなと思ったためですが、単に慣れの問題な気もしますね。

この`fonta`キーワードを残したのは後方互換性みたいなもので、将来的なバージョンで無くす可能性もあるため、今後は`fa`キーワードのほうを使用することをおすすめします。

---

Font Awesomeはとても便利で、[アイコン名を記憶できているかを試すクイズ](http://fontawesome.pro/)があるくらいアイコンの数が多い点も魅力ですが、今回の4.0でやや複雑になった感がありますね。このAlfred Workflowがその複雑さを少しでも軽減できれば願ったり叶ったり。

<cite>[ruedap/alfred2-font-awesome-workflow · GitHub](https://github.com/ruedap/alfred2-font-awesome-workflow)</cite>
