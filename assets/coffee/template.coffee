bmdotcom = bmdotcom or {}

bmdotcom.template = do ->
  'use strict'

  init = (callback) ->
    request = $.ajax
      url: '/assets/templates/templates.html',
      dataType: 'html',

    request.done (data) ->
      _processTemplates data, callback

    # uh-oh, something went wrong
    request.fail (data) ->
      do callback

  _processTemplates = (response, callback) ->
    $templates = $(response).filter 'script[type="text/html"]'

    $templates.each ->
      bmdotcom.template[$(this).attr 'id'] = _.template $(this).html()

    do callback

  init : init