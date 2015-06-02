var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.router = (function() {
  'use strict';
  var init, _initRoutes, _testHash;
  init = function(callback) {
    if (callback == null) {
      callback = function() {};
    }
    _initRoutes();
    _testHash();
    return callback();
  };
  _initRoutes = function() {
    var routes;
    return routes = new Davis(function() {
      this.configure(function(config) {
        return config.generateRequestOnPageLoad = false;
      });
      this.before(bmdotcom.updateView.beforeUpdate);
      this.after(function(req) {
        return bmdotcom.tracking.trackPage(req.path);
      });
      this.get('/', function() {
        return bmdotcom.updateView.update('root');
      });
      this.get('/index.html', function() {
        return bmdotcom.updateView.update('root');
      });
      this.get('/:pageTitle', function(req) {
        return bmdotcom.updateView.update(req.params.pageTitle);
      });
      this.get(':pageTitle', function(req) {
        return bmdotcom.updateView.update(req.params.pageTitle);
      });
      return this.post('/contact', bmdotcom.contact.send);
    });
  };
  _testHash = function() {
    if (location.hash) {
      return Davis.location.assign(new Davis.Request(location.hash.replace(/^#/, '')));
    }
  };
  return {
    init: init
  };
})();
