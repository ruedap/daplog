# Rubyでベンチマークをとる

CSVで標準のと[FasterCSV](http://fastercsv.rubyforge.org/)を比較したくてベンチマークを取ってみた。Rubyは1.8.7。

<!-- READMORE -->


## Rubyでベンチマーク

~~~ ruby
require 'csv'
require 'benchmark'
require 'rubygems'
require 'fastercsv'
@file_name = 'hoge.tsv'
@separator = "\t"
def use_default_csv
  CSV.open(@file_name, 'r', @separator) do |row|
#処理
  end
end
def use_faster_csv
  FasterCSV.foreach(@file_name, :col_sep => @separator) do |row|
#処理
  end
end
Benchmark.bm(13) do |x|
  x.report("default csv:") { use_default_csv }
  x.report("faster csv:") { use_faster_csv }
end
~~~

この[bmメソッド](http://rurema.clear-code.com/1.8.7/method/Benchmark/m/bm.html)の引数は、初見では「ベンチマークを13回走らせてその結果を得る」という意味の引数かとおもったけど、全然違って「ラベルの文字幅を指定する」というベンチマーク自体とはあんまり関係の無いもの。これにはちょっと違和感があってあまり好きではないんだけど、下記のようにラベル使って幅を揃えるには指定しないと崩れてしまう。ラベルを付けなくて良いならいらないんだけどね。

~~~ sh
                   user     system      total        real
default csv:   2.434000   0.000000   2.434000 (  2.427000)
faster csv:    0.062000   0.000000   0.062000 (  0.064000)
~~~

これは500kbくらいのtsvファイルをオブジェクト化する処理の結果。結構違うっぽい。というか、ほんとに？というくらい違う。ちなみにRuby 1.9ではこのFasterCSVがCSVライブラリとして取り入れられたらしいので、普通に標準のCSVライブラリを使用すれば最初から早いらしい。

---

<cite>[CSVとFasterCSVを比較する｜オープンソース研究室](http://www.kdl.co.jp/open/2009/11/ruby-csvfastercsv.html)</cite>
