var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.template = (function() {
  'use strict';
  var init, _processTemplates;
  init = function(callback) {
    var request;
    request = $.ajax({
      url: '/assets/templates/templates.html',
      dataType: 'html'
    });
    request.done(function(data) {
      return _processTemplates(data, callback);
    });
    return request.fail(function(data) {
      return callback();
    });
  };
  _processTemplates = function(response, callback) {
    var $templates;
    $templates = $(response).filter('script[type="text/html"]');
    $templates.each(function() {
      return bmdotcom.template[$(this).attr('id')] = _.template($(this).html());
    });
    return callback();
  };
  return {
    init: init
  };
})();
