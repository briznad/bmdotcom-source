bmdotcom = bmdotcom or {}

bmdotcom.router = do ->
  'use strict'

  init = (callback = ->) ->
    do _initRoutes
    do _testHash
    do callback

  _initRoutes = ->
    routes = new Davis ->
      @configure (config) ->
        config.generateRequestOnPageLoad = false

      @before bmdotcom.updateView.beforeUpdate

      @after (req) -> bmdotcom.tracking.trackPage req.path

      @get '/', ->
        bmdotcom.updateView.update 'root'

      @get '/index.html', ->
        bmdotcom.updateView.update 'root'

      @get '/:pageTitle', (req) ->
        bmdotcom.updateView.update req.params.pageTitle

      @get ':pageTitle', (req) ->
        bmdotcom.updateView.update req.params.pageTitle

      @post '/contact', bmdotcom.contact.send

  _testHash = ->
    if location.hash
      Davis.location.assign new Davis.Request location.hash.replace /^#/, ''

  init: init