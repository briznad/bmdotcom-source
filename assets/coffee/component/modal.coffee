bmdotcom = bmdotcom or {}

bmdotcom.modal = do ->
  'use strict'

  options =
    displayDuration   : 5000
    showCloseBtn      : true
    redirectHome      : false
    reloadPage        : false
    additionalClasses : []
    postDestroy       : ->

  init = (content, opts) ->
    return false unless content?

    options = _.extend options, opts or {},
      modalID: _.uniqueId 'modal-'

    bmdotcom.cache.$body.append bmdotcom.templates.modalView
      modalID           : options.modalID
      modalContent      : content
      additionalClasses : if _.isArray(options.additionalClasses) then options.additionalClasses.join(' ') else options.additionalClasses
      showCloseBtn      : options.showCloseBtn

    do _registerEvents

    options.timeoutID = setTimeout _destroyModal, options.displayDuration if options.displayDuration

  _registerEvents = ->
    bmdotcom.cache.$body
      .off('click.' + options.modalID)
      .on('click.' + options.modalID, '#' + options.modalID, _destroyModal)

  _destroyModal = (e) ->
    if e? and $(e.target).is '.modal-close, .modal-overlay'
      do e.preventDefault
      do $(e.currentTarget).remove
      clearTimeout options.timeoutID
    else unless e?
      do $('#' + options.modalID).remove

    do options.postDestroy
    do _redirect

  _redirect = ->
    if options.redirectHome
      Davis.location.assign new Davis.Request '/'
    else if options.reloadPage
      Davis.location.assign new Davis.Request location.pathname

  open : init