---
layout: article
title: "<span>EXE化したFlashでフルスクリーン時に</span>外部ビデオを拡大しない"
date: 2011-03-16
comments: true
categories: as3
tags: as3
published: true
---

記事タイトル下手すぎわろた。えーっと、Flashでスタンドアローンな`.exe`を作って、なおかつ、それをフルスクリーンで再生するときに、デフォルトだとフルスクリーン時の画面サイズにムービーは自動で拡大される。それをさせずに、原寸で表示させたかった時に、Flashムービー部分は簡単にできたんだけど、[FLVPlayback](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/FLVPlayback.html)を使った外部ビデオファイルを再生するシーンでは、うまく画面拡大を止められなかった。という話。

結論から書くと、FLVPlaybackクラスではなく、[VideoPlayer](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/VideoPlayer.html)クラスを使えば原寸表示できたので解決できた。

<!-- READMORE -->

## FLVPlayback

以下のように書けば素直に原寸表示してくれると思ってたけどならなかった。何故だろう。
スキンを使用してなかったんだけど、今思えばそれが原因だったのかなぁ。

~~~ actionscript
video1 = new FLVPlayback();
video1.source = "video1.mp4";
video1.scaleMode = VideoScaleMode.NO_SCALE;
~~~

いろいろ試して、以下みたいな書き方もしてみたけれど、解決できず。

~~~ actionscript
video2 = new FLVPlayback();
video2.source = "video2.mp4";
video2.scaleMode = VideoScaleMode.MAINTAIN_ASPECT_RATIO;
video2.align = VideoAlign.CENTER;
video2.width = 800;
video2.registrationWidth = 800;
video2.height = 600;
video2.registrationHeight = 600;
~~~


## VideoPlayer

ハマって困ってネットで調べてたら、[VideoPlayer](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/VideoPlayer.html)クラスというのがあるのを知った。これで試してみたら、素直に原寸表示してくれた。FLVPlaybackのコードと比べると、外部ビデオファイルのロードの仕方がちょっと違うだけ。

~~~ actionscript
video3 = new VideoPlayer();
video3.load("files/video3.mp4");
video3.scaleMode = VideoScaleMode.NO_SCALE;
video3.align = VideoAlign.CENTER;
~~~

リファレンスを読むと、FLVPlaybackはこのVideoPlayerクラスをラップして、スキンや再生コントロール機能を実装しているようなので、ほとんど一緒なのは当然だった。ここらへんの機能を利用しないのであれば、VideoPlayerクラスでも良さそう。ただし、リファレンスにも通常はFLVPlaybackの方を使ってくれと書いてある。

> FLVPlayback クラスは VideoPlayer のすべての機能にアクセスすることができますので、通常は FLVPlayback クラスを使用してください。
>
> <cite>[VideoPlayer - ActionScript 3.0 コンポーネントリファレンスガイド](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/VideoPlayer.html)</cite>

* * *

<cite>[VideoPlayer - ActionScript 3.0 コンポーネントリファレンスガイド](http://livedocs.adobe.com/flash/9.0_jp/ActionScriptLangRefV3/fl/video/VideoPlayer.html)</cite>
