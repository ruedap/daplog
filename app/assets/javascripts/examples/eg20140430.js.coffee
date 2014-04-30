$ ->
  new Eg20140430a('#Eg20140430a').render()
  new Eg20140430b('#Eg20140430b').render()
  new Eg20140430c('#Eg20140430c').render()

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

class Eg20140430b extends Eg20140430a
  line: (xScale, yScale) ->
    d3.svg.line()
      .x((d) -> xScale(d))
      .y((d) -> yScale(d))
      .interpolate('cardinal')  # interpolateで補間パターンcardinalを指定

class Eg20140430c extends Eg20140430a
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
