class @D3Eg
  constructor: (
    @selector,
    hasBorder = true,
    @margin = null,
    height = 400,
    width = 698
  ) ->
    @margin = top: 20, right: 20, bottom: 20, left: 20 unless @margin
    _defineBaseSelection(this, @selector, +width, +height, @margin, hasBorder)

  getBaseSelection: =>
    d3.select("#{@selector} #base")

  _defineBaseSelection = (self, selector, width, height, margin, hasBorder) ->
    self.width = width - margin.left - margin.right
    self.height = height - margin.top - margin.bottom

    d3.select(selector)
      .append('svg')
      .attr
        width: width
        height: height
      .append('g')
      .attr
        transform: "translate(#{margin.left},#{margin.top})"
        id: 'base'

    if hasBorder
      d3.select(selector)
        .select('svg')
        .insert('rect', ':first-child')
        .attr
          width: width
          height: height
          fill: 'none'
          stroke: '#bbb'
          'stroke-width': 1
