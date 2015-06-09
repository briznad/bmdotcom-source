bmdotcom = bmdotcom or {}

bmdotcom.tracking = do ->
  'use strict'

  init = ->

  # fire GA event for each page load
  trackPage = (req) ->
    _gaq.push [
      '_trackPageview'
      req
    ]

  init      : init
  trackPage : trackPage