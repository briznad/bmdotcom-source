var bmdotcom;

bmdotcom = bmdotcom || {};

bmdotcom.contact = (function() {
  'use strict';
  var registerEvents, send, _afterSend, _establishFormType, _validate;
  send = function(req) {
    var formType;
    formType = _establishFormType(req.params.typeOfContact);
    if (!formType || !_validate[formType](req.params)) {
      return false;
    }
    return $.ajax({
      type: 'POST',
      url: '//formspree.io/contact@bradmallow.com',
      data: req.params,
      dataType: 'json',
      complete: _afterSend[formType]
    });
  };
  registerEvents = function() {
    return bmdotcom.cache.$body.on('change.contact', '.form-container input, .form-container textarea', function() {
      var $this;
      $this = $(this);
      if ($this.val() !== '') {
        return $this.removeClass('deleted').addClass('changed');
      } else {
        return $this.removeClass('changed').addClass('deleted');
      }
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
      if (_validate.emailPattern.test(formFields._replyto)) {
        return true;
      } else {
        bmdotcom.modal.open('Please enter a valid e-mail address. Otherwise it\'s gonna be tough to respond.', {
          additionalClasses: ['contact-modal'],
          displayDuration: 3000
        });
        return false;
      }
    }
  };
  _afterSend = {
    contactPage: function() {
      return bmdotcom.modal.open('Thanks for reaching out! I\'ll be receiving your message any minute now and should respond in good time.', {
        additionalClasses: ['contact-modal'],
        postDestroy: function() {
          var $autofilled;
          $autofilled = $('.form-container label').find('input, textarea').val('').removeClass('changed deleted').end().find('input:-webkit-autofill, textarea:-webkit-autofill');
          if ($autofilled.length) {
            return $autofilled.each(function() {
              var $clone, $this;
              $this = $(this);
              $clone = $this.clone();
              return $this.after($clone).remove();
            });
          }
        }
      });
    }
  };
  return {
    send: send,
    registerEvents: registerEvents
  };
})();
