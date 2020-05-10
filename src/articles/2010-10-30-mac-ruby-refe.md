# MacでRubyのRefeを文字化け解消する

普通にインストールした状態ではRefeが文字化けするので、ググってみたら、UTF-8で出力するように書き換えることで解消できるみたい。

<!-- READMORE -->


## 文字化け解消

RVMの場合は以下のような感じの場所あるに`searcher.rb`を修正する。

`~/.rvm/gems/ruby-1.8.7-p302@rails2/gems/refe-0.8.0.3/lib/refe/searcher.rb`の19行目から23行目をコメントアウトして、以下を追加。

~~~ ruby
    def adjust_encoding( str )
       NKF.nkf('-Ew', str) # 追加
#      if shift_jis_platform?
#        NKF.nkf('-Es', str)
#      else
#        str
#      end
    end
~~~

---

<cite>[Mac OS X Leopardでrefeの文字化けを解消する - このブログは証明できない。](http://d.hatena.ne.jp/shunsuk/20090104/1231071443)</cite>
