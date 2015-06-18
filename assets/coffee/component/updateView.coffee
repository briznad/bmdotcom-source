bmdotcom = bmdotcom or {}

bmdotcom.updateView = do ->
  'use strict'

  beforeUpdate = (request) ->
    # false if /jpg$|jpeg$|png$|gif$|bmp$/.test request.path

  removeLoading = ->
    desiredDelay = 1250
    elapsedTime = Math.floor(new Date()) - bmdotcom.loadTime
    remainingDelay = if elapsedTime < desiredDelay then desiredDelay - elapsedTime else 0

    # print render time in the footer
    $('#timingInfo').text((elapsedTime / 1000).toFixed(2))

    # remove loading class from html element
    t = setTimeout ->
      bmdotcom.cache.$html.removeClass('loading')
    , remainingDelay

  update = (pageTitle) ->
    # save the previous page for comparison
    previousPage = bmdotcom.model.settings.currentPage.title

    # cancel update if new page is the same as the old page
    if pageTitle is previousPage
      console.debug 'Requested page is the same as the current page. Request denied.'
      return false

    # close mobile nav menu when loading a new resource
    bmdotcom.cache.$mobileNavTrigger.prop 'checked', false

    # determine the current page object
    currentPage = bmdotcom.model.pages[pageTitle]

    # update body classes
    _updateBodyClasses pageTitle

    # update model with current page info
    _updateCurrentPage pageTitle

    # update page title and h1
    bmdotcom.cache.$title.text _computePageTitle pageTitle

    # render new view
    bmdotcom.cache.$dynamicContainer.html bmdotcom.templates[pageTitle + 'View']
      pageTitle   : pageTitle
      currentPage : currentPage

    # initialize events necessary for each page
    _initEvents pageTitle

  _updateBodyClasses = (pageTitle) ->
    # add current body classes
    bmdotcom.cache.$body
      .addClass(pageTitle)
      .removeClass(bmdotcom.model.settings.currentPage.title)

  _updateCurrentPage = (pageTitle) ->
    bmdotcom.model.settings.currentPage = _.extend bmdotcom.model.settings.currentPage or {},
      title: pageTitle

  _computePageTitle = (pageTitle) ->
    if pageTitle is 'root' then 'Brad Mallow' else 'Brad Mallow | ' + pageTitle

  # basic router to load event registration for each page
  _initEvents = (pageTitle, previousPage) ->
    # deregister previous page events
    bmdotcom.cache.$body.off '.' + previousPage

    switch pageTitle
      # when 'root'
        #

      when 'contact'
        do bmdotcom.contact.registerEvents

      # else
        #

  _initThumbnails = ->

  beforeUpdate  : beforeUpdate
  update        : update
  removeLoading : removeLoading