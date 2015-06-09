var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.updateView = (function() {
  'use strict';
  var beforeUpdate, removeLoading, update, _computePageTitle, _initEvents, _initThumbnails, _updateBodyClasses, _updateCurrentPage;
  beforeUpdate = function(request) {};
  removeLoading = function() {
    var desiredDelay, elapsedTime, remainingDelay, t;
    desiredDelay = 1500;
    elapsedTime = Math.floor(new Date()) - bmdotcom.loadTime;
    remainingDelay = elapsedTime < desiredDelay ? desiredDelay - elapsedTime : 0;
    $('#timingInfo').text((elapsedTime / 1000).toFixed(2));
    return t = setTimeout(function() {
      return bmdotcom.cache.$html.removeClass('loading');
    }, remainingDelay);
  };
  update = function(pageTitle) {
    var currentPage, previousPage;
    previousPage = bmdotcom.model.settings.currentPage.title;
    if (pageTitle === previousPage) {
      console.debug('Requested page is the same as the current page. Request denied.');
      return false;
    }
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
    return bmdotcom.cache.$body.addClass(pageTitle).removeClass(bmdotcom.model.settings.currentPage.title);
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
  _initEvents = function(pageTitle, previousPage) {
    var x;
    bmdotcom.cache.$body.off('.' + previousPage);
    switch (pageTitle) {
      case 'root':
        return x = 1;
      case 'contact':
        return bmdotcom.contact.registerEvents();
      default:
        return x = 3;
    }
  };
  _initThumbnails = function() {};
  return {
    beforeUpdate: beforeUpdate,
    update: update,
    removeLoading: removeLoading
  };
})();
