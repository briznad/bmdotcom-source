var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.modelBuildr = (function() {
  'use strict';
  var init, _addContactModel, _addProjectsModel, _addResumeModel;
  init = function(callback) {
    bmdotcom.model = {};
    bmdotcom.model.pages = {};
    bmdotcom.model.settings = {
      currentPage: {
        title: 'root'
      }
    };
    bmdotcom.model.pages.projects = _addProjectsModel();
    bmdotcom.model.pages.resume = _addResumeModel();
    bmdotcom.model.pages.contact = _addContactModel();
    return callback();
  };
  _addProjectsModel = function() {
    return {
      title: 'projects'
    };
  };
  _addResumeModel = function() {
    return {
      title: 'resume'
    };
  };
  _addContactModel = function() {
    return {
      title: 'contact'
    };
  };
  return {
    init: init
  };
})();
