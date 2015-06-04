bmdotcom = bmdotcom or {}

bmdotcom.template = do ->
  'use strict'

  init = (callback) ->
    _processTemplates $('script[type="text/html"]'), callback

  _processTemplates = ($templates, callback) ->
    $templates.each ->
      bmdotcom.template[$(this).attr 'id'] = _.template $(this).html()

    do callback

  init : init