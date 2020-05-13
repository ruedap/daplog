# Sinatraでi18nする

[sinatra-r18n](http://r18n.rubyforge.org/sinatra.html)というgemを使うと、Sinatraアプリを簡単にi18n（国際化）できるようになるので、[Nekostagram](http://nekostagram.com/)と[Inustagram](http://inustagram.heroku.com/)に英語版のテキストも用意して、ブラウザーの言語設定で日本語or英語に分岐するようにした時の備忘録。ただし、このやり方だと後述するクローラー関連の問題がある。

<!-- READMORE -->


## sinatra-r18nのインストール

普通にgemをインストールする。

~~~ sh
$ gem install sinatra-r18n
~~~

または、Bundlerを使っている場合は、Gemfileファイルに`sinatra-r18n`を追加する。

~~~ ruby
gem 'sinatra-r18n'
~~~


## i18n用のYAMLファイルの作成

プロジェクトフォルダ直下に`i18n`フォルダを作成して、`ja.yml`と`en.yml`を用意する。ファイル名からお察しのとおり、それぞれ日本語版でのテキストと、英語版でのテキストを書いておく。例えば以下のような感じ。

~~~ yaml
site:
  title: 'Nekostagram - ねこ大好き専用Instagram'
~~~

~~~ yaml
site:
  title: 'Nekostagram - Cat Lovers Instagram Viewer'
~~~

上記の`site:`とか`title:`は自分で勝手に付けた属性名なので、特に決まりはなく適当でおｋ
Nekostagramでは、それぞれ[`ja.yml`](https://github.com/ruedap/nekostagram/blob/master/i18n/cat/ja.yml)と[`en.yml`](https://github.com/ruedap/nekostagram/blob/master/i18n/cat/en.yml)がこの部分に該当する。


## 使い方

まず`require`する。ハイフンじゃなくてスラッシュなので注意。

~~~ ruby
require 'sinatra/r18n'
~~~

`sinatra/r18n`を`require`してあれば、`t`オブジェクトから上記で設定した情報を参照できる。以下は、実際に[Nekostagramのソースコード内で使われているSlimコードの断片](https://github.com/ruedap/nekostagram/blob/master/views/layout.slim#L32)を簡略化したもの。`r18n.locale.code`は現在表示している言語を取得でき、下記のコードでは日本語なら`logo.gif`、それ以外なら`logo_en.gif`のロゴ画像を読み込むように分岐している。img srcの文字列内での変数展開で、波カッコが二重になっているのは、Slimで変数展開する値をHTMLエンコードしない時の記法。

~~~ ruby
h1
  a href='/'
    - image_name = (r18n.locale.code == 'ja') ? 'logo' : 'logo_en'
    img src="images/#{{image_name}}.gif" title="#{{t.site.title}}" alt="#{{t.site.title}}"
~~~

また、その後の`title`属性・`alt`属性で`t`オブジェクトから、上述のYAMLで指定した属性を経由して、現在の言語の文字列を取得している。この分岐は自動でしてくれるので、単に参照するだけでおｋ


## クローラー関連の問題

詳しくは[この記事](/2011/03/08/hatebu-page-title-english)にまとめてあって、まだ解決もしていないんだけど、推測では「クローラーのブラウザーの言語設定が英語になっているから」が原因だと思っている。なぜなら、最初は日本語版しかなかったNekostagramも、今は上記ライブラリを使用したi18n化が済んでおり、今Googleで[Nekostagramを検索](http://www.google.co.jp/search?hl=ja&q=nekostagram&lr=lang_ja)すると英語版のタイトルが表示されるようになっている。最初は日本語タイトルだったけど、時間経過で更新され、その時には既にi18n化していたことにより、英語版タイトルに更新されたものと思われる。はてブの場合も同様に、タイトルを取得するサーバーの言語設定が英語になっているからなんじゃないかなぁと。自動で分岐させる場合は、これは仕方ないのかもしれないと半ば諦めている。

---

<cite>[Sinatra &#8211; R18n](http://r18n.rubyforge.org/sinatra.html)</cite>
