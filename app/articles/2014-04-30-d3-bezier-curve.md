# D3.jsでベジェ曲線を描く

`d3.svg.line`や`d3.svg.area`の関数を使った以下のような普通の折れ線グラフで、その線をベジェ曲線でカーブさせたい場合について調べたのでメモ。

<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.6/d3.min.js"></script>
<div id="Eg20140430a"></div>

~~~ coffee
# D3.js 3.4.6
class Eg20140430a extends D3Eg
  line: (xScale, yScale) ->
    d3.svg.line().x((d) -> xScale(d)).y((d) -> yScale(d))

  render: =>
    xScale = _xScale(@width, _data)
    yScale = _yScale(@height, _data)
    line = @line(xScale, yScale)
    _renderLine(@getBaseSelection(), _data, line)
    _renderDots(@getBaseSelection(), _data, xScale, yScale)
    this

  _data = [28, 48, 40, 9, 84, 27, 100]  # 線グラフのデータ

  _renderLine = (sl, data, line) ->
    sl.append('path')
      .attr
        d: line(data)
        fill: 'none'
        stroke: 'black'
        'stroke-width': 2

  _renderDots = (sl, data, xScale, yScale) ->
    sl.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr
        cx: (d) -> xScale(d)
        cy: (d) -> yScale(d)
        r: 6
        fill: 'black'
        stroke: 'none'

  _xScale = (width, data) ->
    d3.scale.ordinal().domain(data).rangePoints([0, width], 0, 0)

  _yScale = (height, data) ->
    d3.scale.linear().domain([0, d3.max(data)]).range([height, 0])
~~~

ここで使っている`d3.svg.line`関数では、座標と座標の間を結ぶ線を`interpolate`を使って指定することができ、上記のようにそれを省略すると`interpolate('linear')`の直線の補間パターンと同じ状態になる。直線以外にも[D3.jsでは何種類かの補間パターンを用意している](http://tech.nitoyon.com/ja/blog/2013/10/29/d3js-svg-line/)ので、その中に適したものがあればそれを使うのが楽。

例えば`interpolate('cardinal')`を指定すると以下のようになる。デフォルトで用意されている補間パターンの中では、これが今回描きたかった曲線に一番近かったんだけど、あんまり曲線が綺麗じゃないというか、自分が描きたかったものと違った。

<div id="Eg20140430b"></div>

~~~ coffee
line: (xScale, yScale) ->
  d3.svg.line()
    .x((d) -> xScale(d))
    .y((d) -> yScale(d))
    .interpolate('cardinal')  # interpolateで補間パターンcardinalを指定
~~~

調べてみると、この`interpolate`に与える引数は、デフォルトで用意されている数種類の文字列以外に、関数で独自の補間パターンを指定できるようなので、自分の描きたかった曲線になるように作ってみたのが以下。

<div id="Eg20140430c"></div>

~~~ coffee
line: (xScale, yScale) ->
  d3.svg.line()
    .x((d) -> xScale(d))
    .y((d) -> yScale(d))
    .interpolate(_interpolation)  # 独自の補間パターンを指定

# 独自の補間パターンを関数で定義
_interpolation = (points) ->
  f = points.shift()
  d = "#{f[0]} #{f[1]}"
  points.forEach (p) ->
    m = (p[0] - f[0]) / 2
    # SVGのpath要素のd属性（3次ベジェ曲線）を文字列として組み立て
    d += " C #{f[0] + m} #{f[1]} #{p[0] - m} #{p[1]} #{p[0]} #{p[1]}"
    f = p
  d
~~~

さきほどは文字列を渡していた`interpolate`の引数に関数を渡すと、その関数の引数（上記では`points`）に折れ線グラフの座標を含んだ配列が渡されるので、そのデータを元に自分が描きたい曲線を、SVGのpath要素のd属性（3次ベジェ曲線）の文字列を組み立てることで実現している。
