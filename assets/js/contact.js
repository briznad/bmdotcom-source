var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.contact = (function() {
  'use strict';
  var send, _afterSend, _establishFormType, _validate;
  send = function(req) {
    var formType;
    formType = _establishFormType(req.params.typeOfContact);
    if (!formType || !_validate[formType](req.params)) {
      return false;
    }
    return $.ajax({
      type: 'POST',
      url: '//formspree.io/bradmallow@gmail.com',
      data: req.params,
      dataType: 'json',
      complete: _afterSend[formType]
    });
  };
  _establishFormType = function(typeOfContact) {
    switch (typeOfContact) {
      case 'Contact Form Message':
        return 'contactPage';
      default:
        return false;
    }
  };
  _validate = {
    emailPattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    contactPage: function(formFields) {
      if (_validate.emailPattern.test(formFields.newsletterEmail)) {
        return true;
      } else {
        bmdotcom.modal.open('Please enter a valid e-mail address.', {
          displayDuration: 3000,
          additionalClasses: ['contact-modal']
        });
        return false;
      }
    }
  };
  _afterSend = {
    contactPage: function() {
      return bmdotcom.modal.open('Thank you for contacting us and expressing interest to learn more about the project. We will respond shortly.', {
        reloadPage: true,
        additionalClasses: ['contact-modal']
      });
    }
  };
  return {
    send: send
  };
})();
