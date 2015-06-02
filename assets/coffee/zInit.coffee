bmdotcom = bmdotcom or {}

bmdotcom.init = do ->
  'use strict'

  # load templates
  bmdotcom.template.init ->
    # retrieve json and build document model
    bmdotcom.modelBuildr.init ->
      # load router controller
      do bmdotcom.router.init

  # init GA tracking
  do bmdotcom.tracking.init