bmdotcom = bmdotcom or {}

bmdotcom.modelBuildr = do ->
  'use strict'

  init = (callback) ->
    # create model
    bmdotcom.model = {}

    # create model pages & settings
    bmdotcom.model.pages = {}
    bmdotcom.model.settings =
      currentPage :
        title : 'root'

    # add each model
    bmdotcom.model.pages.projects = do _addProjectsModel
    bmdotcom.model.pages.resume = do _addResumeModel
    bmdotcom.model.pages.contact = do _addContactModel

    do callback

  _addProjectsModel = ->
    title: 'projects'

  _addResumeModel = ->
    title: 'resume'

  _addContactModel = ->
    title: 'contact'

  init: init