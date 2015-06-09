# to force a simple, useable experience on ipads/tablets, we set a static viewport width
do ->
  document.write '<meta name="viewport" content="' + (if /iPad/i.test(navigator.userAgent) then 'width=1000' else 'width=device-width') + ', initial-scale=1.0, minimal-ui" />'