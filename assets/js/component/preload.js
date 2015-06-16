var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.preload = (function() {
  'use strict';
  var init, _preloadImg;
  init = function() {
    return _.defer(function() {
      return _preloadImg(['8ball_sample.png', 'BdayMindr_sample.png', 'Carolines_Comedy_sample.png', 'Fraiche_sample.png', 'Intuit_Perf_sample.png', 'Intuit_QuickNav_sample.png', 'Love_and_Theft_sample.png', 'Noike_sample.png', 'Pyxera_sample.png', 'SLT_Remix_sample.png', 'bouncingBubbles_sample.png', 'bradmallow_com_sample.png', 'shapeDance_sample.png', 'TMG_sample.png']);
    });
  };
  _preloadImg = function(preloadList) {
    return _.defer(function() {
      var dummyImg;
      dummyImg = new Image();
      dummyImg.src = 'assets/images/projects/' + preloadList.pop();
      return dummyImg.onload = function() {
        if (preloadList.length) {
          return _preloadImg(preloadList);
        } else {
          return console.debug('All images successfully preloaded.');
        }
      };
    });
  };
  return {
    init: init
  };
})();
