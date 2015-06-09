bmdotcom = bmdotcom or {}

bmdotcom.contact = do ->
  'use strict'

  send = (req) ->
    formType = _establishFormType req.params.typeOfContact

    return false if not formType or not _validate[formType] req.params

    $.ajax
      type: 'POST'
      url: '//formspree.io/contact@bradmallow.com'
      data: req.params
      dataType: 'json'
      complete: _afterSend[formType]

  registerEvents = ->
    bmdotcom.cache.$body.on 'change.contact', '.form-container input, .form-container textarea', ->
      $this = $(this)

      # add "changed" class, unless val is empty
      # in that case remove "changed" class, add "deleted" class
      if do $this.val isnt ''
        $this
          .removeClass('deleted')
          .addClass('changed')
      else
        $this
          .removeClass('changed')
          .addClass('deleted')

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
      if _validate.emailPattern.test formFields._replyto
        true

      else
        bmdotcom.modal.open 'Please enter a valid e-mail address. Otherwise it\'s gonna be tough to respond.',
          additionalClasses : ['contact-modal']
          displayDuration   : 4000

        false

  _afterSend =
    contactPage: ->
      bmdotcom.modal.open 'Thanks for reaching out! I\'ll receive your message any minute now, and should respond in good time.',
        additionalClasses : ['contact-modal']
        displayDuration   : false
        postDestroy       : ->
          # remove values from inputs
          # remove modified classes
          # return any form inputs with autofilled property
          $autofilled = $('.form-container label')
            .find('input, textarea')
              .val('')
              .removeClass('changed deleted')
            # sizzle throws an error if I attempt to filter the previous set of matched elements for the "-webkit-autofill" property
            # so I need to go back up the chain
            # then come back down with another "find(…)"
            .end()
            .find('input:-webkit-autofill, textarea:-webkit-autofill')

          # remove autofill property from emptied form inputs
          # clone autofilled inputs and remove original
          if $autofilled.length
            $autofilled.each ->
              $this = $(this)
              $clone = do $this.clone

              do $this.after($clone).remove

  send            : send
  registerEvents  : registerEvents