#= require jquery
#= require jquery_ujs
#= require_tree .

jQuery ->

  $(window).scroll ->
    _scrollTop = $(this).scrollTop()
    return if _scrollTop > 0
    $('.logo-bg').css('margin-top', parseInt(_scrollTop / 3) + 'px')
