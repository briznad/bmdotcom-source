bmdotcom = bmdotcom or {}

bmdotcom.init = do ->
  'use strict'

  # load templates
  _.defer ->
    bmdotcom.template.init ->
      # retrieve json and build document model
      bmdotcom.modelBuildr.init ->
        # load router controller
        bmdotcom.router.init ->
          # after everything has been inited, remove loading class
          do bmdotcom.updateView.removeLoading

    # init GA tracking
    do bmdotcom.tracking.init