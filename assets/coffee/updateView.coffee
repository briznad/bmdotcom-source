bmdotcom = bmdotcom or {}

bmdotcom.updateView = do ->
  'use strict'

  beforeUpdate = (request) ->
    # false if /jpg$|jpeg$|png$|gif$|bmp$/.test request.path

  update = (pageTitle) ->
    # determine the current page object
    currentPage = bmdotcom.model.pages[pageTitle]

    # update body classes
    _updateBodyClasses pageTitle

    # update model with current page info
    _updateCurrentPage pageTitle

    # update page title and h1
    bmdotcom.cache.$title.text _computePageTitle pageTitle

    # render new view
    bmdotcom.cache.$dynamicContainer.html bmdotcom.template[pageTitle + 'View']
      data:         bmdotcom.model
      pageTitle:    pageTitle
      currentPage:  currentPage

    # initialize events necessary for each page
    _initEvents pageTitle

  _updateBodyClasses = (pageTitle) ->
    # add current body classes
    bmdotcom.cache.$body
      .addClass(pageTitle)
      .removeClass(if bmdotcom.model.settings.currentPage then bmdotcom.model.settings.currentPage.title else '')

  _updateCurrentPage = (pageTitle) ->
    bmdotcom.model.settings.currentPage = _.extend bmdotcom.model.settings.currentPage or {},
      title: pageTitle

  _computePageTitle = (pageTitle) ->
    if pageTitle is 'root' then 'Brad Mallow' else 'Brad Mallow | ' + pageTitle

  # basic router to load event registration for each page
  _initEvents = (pageTitle) ->
    switch pageTitle
      when 'root'
        x = 1
      when 'contact'
        x = 2
      else
        x = 3

  _initThumbnails = ->

  beforeUpdate  : beforeUpdate
  update        : update