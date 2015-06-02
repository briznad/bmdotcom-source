var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.updateView = (function() {
  'use strict';
  var beforeUpdate, update, _computePageTitle, _initEvents, _initThumbnails, _updateBodyClasses, _updateCurrentPage;
  beforeUpdate = function(request) {};
  update = function(pageTitle) {
    var currentPage;
    currentPage = bmdotcom.model.pages[pageTitle];
    _updateBodyClasses(pageTitle);
    _updateCurrentPage(pageTitle);
    bmdotcom.cache.$title.text(_computePageTitle(pageTitle));
    bmdotcom.cache.$dynamicContainer.html(bmdotcom.template[pageTitle + 'View']({
      data: bmdotcom.model,
      pageTitle: pageTitle,
      currentPage: currentPage
    }));
    return _initEvents(pageTitle);
  };
  _updateBodyClasses = function(pageTitle) {
    return bmdotcom.cache.$body.addClass(pageTitle).removeClass(bmdotcom.model.settings.currentPage ? bmdotcom.model.settings.currentPage.title : '');
  };
  _updateCurrentPage = function(pageTitle) {
    return bmdotcom.model.settings.currentPage = _.extend(bmdotcom.model.settings.currentPage || {}, {
      title: pageTitle
    });
  };
  _computePageTitle = function(pageTitle) {
    if (pageTitle === 'root') {
      return 'Brad Mallow';
    } else {
      return 'Brad Mallow | ' + pageTitle;
    }
  };
  _initEvents = function(pageTitle) {
    var x;
    switch (pageTitle) {
      case 'root':
        return x = 1;
      case 'contact':
        return x = 2;
      default:
        return x = 3;
    }
  };
  _initThumbnails = function() {};
  return {
    beforeUpdate: beforeUpdate,
    update: update
  };
})();
