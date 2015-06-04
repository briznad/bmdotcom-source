var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.template = (function() {
  'use strict';
  var init, _processTemplates;
  init = function(callback) {
    return _processTemplates($('script[type="text/html"]'), callback);
  };
  _processTemplates = function($templates, callback) {
    $templates.each(function() {
      return bmdotcom.template[$(this).attr('id')] = _.template($(this).html());
    });
    return callback();
  };
  return {
    init: init
  };
})();
