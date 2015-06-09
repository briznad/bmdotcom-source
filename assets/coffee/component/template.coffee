bmdotcom = bmdotcom or {}

bmdotcom.template = do ->
  'use strict'

  init = (callback) ->
    _processTemplates $('script[type="text/html"]'), callback

  _processTemplates = ($templates, callback) ->
    $templates.each ->
      $template = $(this)
      bmdotcom.template[$template.attr 'id'] = _.template $template.html()
      do $template.remove

    do callback

  init : init