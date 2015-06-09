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
      var $template;
      $template = $(this);
      bmdotcom.template[$template.attr('id')] = _.template($template.html());
      return $template.remove();
    });
    return callback();
  };
  return {
    init: init
  };
})();
