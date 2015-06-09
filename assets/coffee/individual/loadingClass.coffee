# add loading class to html element
if document.documentElement.classList
  document.documentElement.classList.add 'loading'
else
  document.documentElement.className += ' loading'