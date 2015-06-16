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

  preloadImages = ->
    _.defer ->
      _doPreloadImg [
        '8ball_sample.png'
        'BdayMindr_sample.png'
        'Carolines_Comedy_sample.png'
        'Fraiche_sample.png'
        'Intuit_Perf_sample.png'
        'Intuit_QuickNav_sample.png'
        'Love_and_Theft_sample.png'
        'Noike_sample.png'
        'Pyxera_sample.png'
        'SLT_Remix_sample.png'
        'bouncingBubbles_sample.png'
        'bradmallow_com_sample.png'
        'shapeDance_sample.png'
      ]

  _doPreloadImg = (preloadList) ->
    _.defer ->
      dummyImg = new Image()
      dummyImg.src = 'assets/images/projects/' + do preloadList.pop
      # dummyImg.src = 'assets/images/projects/' + do preloadList.pop
      dummyImg.onload = ->
        if preloadList.length
          _doPreloadImg preloadList
        else
          console.debug 'All images successfully preloaded.'

  update = (pageTitle) ->
    # save the previous page for comparison
    previousPage = bmdotcom.model.settings.currentPage.title

    # cancel update if new page is the same as the old page
    if pageTitle is previousPage
      console.debug 'Requested page is the same as the current page. Request denied.'
      return false

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
      when 'root'
        x = 1

      when 'contact'
        do bmdotcom.contact.registerEvents

      else
        x = 3

  _initThumbnails = ->

  beforeUpdate  : beforeUpdate
  update        : update
  removeLoading : removeLoading
  preloadImages : preloadImages