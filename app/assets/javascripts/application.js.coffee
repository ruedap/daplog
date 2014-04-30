#= require jquery
#= require jquery_ujs
#= require examples

$ ->

  $(window).scroll ->
    _scrollTop = $(this).scrollTop()
    return if _scrollTop > 0
    $('.logo-bg').css('margin-top', parseInt(_scrollTop / 3) + 'px')

  $('a[href^="#"]').click ->
    _id = $(this).attr('href')
    _id = _id.replace('#', '')
    _id = '[id="' + _id + '"]'
    _offset = 8
    _target = $(_id).offset().top - _offset
    $('html, body').animate({scrollTop: _target}, 250)
    event.preventDefault()
    return false
