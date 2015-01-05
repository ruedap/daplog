#= require jquery
#= require jquery_ujs
#= require vendor/desvg
#= require vendor/d3
#= require examples

$ ->

  deSVG('.BlogLogo', true)

  $('a[href^="#"]').click ->
    _id = $(this).attr('href')
    _id = _id.replace('#', '')
    _id = '[id="' + _id + '"]'
    _offset = 8
    _target = $(_id).offset().top - _offset
    $('html, body').animate({scrollTop: _target}, 250)
    event.preventDefault()
    return false
