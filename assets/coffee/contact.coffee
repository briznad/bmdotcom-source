bmdotcom = bmdotcom or {}

bmdotcom.contact = do ->
  'use strict'

  send = (req) ->
    formType = _establishFormType req.params.typeOfContact

    return false if not formType or not _validate[formType] req.params

    $.ajax
      type: 'POST'
      url: '//formspree.io/bradmallow@gmail.com'
      data: req.params
      dataType: 'json'
      complete: _afterSend[formType]

  _establishFormType = (typeOfContact) ->
    switch typeOfContact
      when 'Contact Form Message'
        'contactPage'
      else
        false

  _validate =
    # email validation regex taken from http://stackoverflow.com/a/46181
    emailPattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    contactPage: (formFields) ->
      if _validate.emailPattern.test formFields.newsletterEmail
        true

      else
        bmdotcom.modal.open 'Please enter a valid e-mail address.',
          displayDuration   : 3000
          additionalClasses : ['contact-modal']

        false

  _afterSend =
    contactPage: ->
      bmdotcom.modal.open 'Thank you for contacting us and expressing interest to learn more about the project. We will respond shortly.',
        reloadPage        : true
        additionalClasses : ['contact-modal']

  send: send