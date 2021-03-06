var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.modal = (function() {
  'use strict';
  var init, options, _destroyModal, _redirect, _registerEvents;
  options = {
    displayDuration: 5000,
    showCloseBtn: true,
    redirectHome: false,
    reloadPage: false,
    additionalClasses: [],
    postDestroy: function() {}
  };
  init = function(content, opts) {
    if (content == null) {
      return false;
    }
    options = _.extend(options, opts || {}, {
      modalID: _.uniqueId('modal-')
    });
    bmdotcom.cache.$body.append(bmdotcom.templates.modalView({
      modalID: options.modalID,
      modalContent: content,
      additionalClasses: _.isArray(options.additionalClasses) ? options.additionalClasses.join(' ') : options.additionalClasses,
      showCloseBtn: options.showCloseBtn
    }));
    _registerEvents();
    if (options.displayDuration) {
      return options.timeoutID = setTimeout(_destroyModal, options.displayDuration);
    }
  };
  _registerEvents = function() {
    return bmdotcom.cache.$body.off('click.' + options.modalID).on('click.' + options.modalID, '#' + options.modalID, _destroyModal);
  };
  _destroyModal = function(e) {
    if ((e != null) && $(e.target).is('.modal-close, .modal-overlay')) {
      e.preventDefault();
      $(e.currentTarget).remove();
      clearTimeout(options.timeoutID);
    } else if (e == null) {
      $('#' + options.modalID).remove();
    }
    options.postDestroy();
    return _redirect();
  };
  _redirect = function() {
    if (options.redirectHome) {
      return Davis.location.assign(new Davis.Request('/'));
    } else if (options.reloadPage) {
      return Davis.location.assign(new Davis.Request(location.pathname));
    }
  };
  return {
    open: init
  };
})();
