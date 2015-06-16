bmdotcom = bmdotcom or {}

bmdotcom.preload = do ->
  'use strict'

  init = ->
    _.defer ->
      _preloadImg [
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
        'TMG_sample.png'
      ]

  _preloadImg = (preloadList) ->
    _.defer ->
      dummyImg = new Image()
      dummyImg.src = 'assets/images/projects/' + do preloadList.pop
      # dummyImg.src = 'assets/images/projects/' + do preloadList.pop
      dummyImg.onload = ->
        if preloadList.length
          _preloadImg preloadList
        else
          console.debug 'All images successfully preloaded.'

  init : init