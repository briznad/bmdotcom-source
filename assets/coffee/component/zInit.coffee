bmdotcom = bmdotcom or {}

bmdotcom.init = do ->
  'use strict'

  # load templates
  _.defer ->
    # build data model
    bmdotcom.modelBuildr.init ->
      # load router controller
      bmdotcom.router.init ->
        # after everything has been inited, remove loading class
        do bmdotcom.updateView.removeLoading

        # warm up the cache / preload project page images
        do bmdotcom.preload.init

    # init GA tracking
    do bmdotcom.tracking.init