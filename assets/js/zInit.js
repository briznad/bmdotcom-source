var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.init = (function() {
  'use strict';
  return _.defer(function() {
    bmdotcom.template.init(function() {
      return bmdotcom.modelBuildr.init(function() {
        return bmdotcom.router.init(function() {
          return bmdotcom.updateView.removeLoading();
        });
      });
    });
    return bmdotcom.tracking.init();
  });
})();
