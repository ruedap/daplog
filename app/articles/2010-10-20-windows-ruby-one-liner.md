---
layout: article
title: "WindowsでのRubyワンライナーの注意点"
date: 2010-10-20
comments: true
categories: ruby
tags: ruby
published: true
---

Windowsのコマンドプロンプトで、連番リネーム用に下のように書いて軽くハマった。

~~~ ruby
ruby -e 'Dir.glob("*.bmp").each_with_index {|f,i| File.rename(f, "hogehoge" + (i+1).to_s + ".bmp")}'
~~~

> 'f' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。

結論からいえば、シングルクォートがまずくてcmd.exeがパイプに反応してたんだけど、ネットで調べてたら[良いページ](http://gihyo.jp/dev/serial/01/ruby/0010?page=1)が見つかって、そこに注意点が列挙されてたのでメモ。

- Windowsのコマンドプロンプト上で`ruby -e`オプションの引数に与えるコード片はダブルクォートで囲む
- 上記でダブルクォートを使用するので、文字列リテラルはシングルクォートで囲むことになる
- ただし、バックスラッシュ記法と式展開を使いたい場合は、％記法で記述する

ちょっとめんどくさいけど、普段からMac/Linuxとかでも上記のルールを守っておけば、Windowsの時にハマらなくて済みそう。
ということで、冒頭で書いたワンライナーはこんな感じに修正。

~~~ ruby
ruby -e "Dir.glob('*.bmp').each_with_index {|f,i| File.rename(f, 'hogehoge' + (i+1).to_s + '.bmp')}"
~~~

* * *

<cite>[Ruby Freaks Lounge：第10回　Windows版Ruby 1.9で培う危機回避スキル（後編）](http://gihyo.jp/dev/serial/01/ruby/0010?page=1)</cite>
