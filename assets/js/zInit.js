var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.init = (function() {
  'use strict';
  bmdotcom.template.init(function() {
    return bmdotcom.modelBuildr.init(function() {
      return bmdotcom.router.init();
    });
  });
  return bmdotcom.tracking.init();
})();
