var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.tracking = (function() {
  'use strict';
  var init, trackPage;
  init = function() {};
  trackPage = function(req) {
    return _gaq.push(['_trackPageview', req]);
  };
  return {
    init: init,
    trackPage: trackPage
  };
})();
