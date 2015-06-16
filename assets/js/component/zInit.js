var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.init = (function() {
  'use strict';
  return _.defer(function() {
    bmdotcom.modelBuildr.init(function() {
      return bmdotcom.router.init(function() {
        bmdotcom.updateView.removeLoading();
        return bmdotcom.updateView.preloadImages();
      });
    });
    return bmdotcom.tracking.init();
  });
})();
