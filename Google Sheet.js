
const scriptURL = 'https://script.google.com/macros/s/AKfycbwoDcTz3Ch9MR02Dgsl18F_Dt5ZPlgcrKB3-vMEJHvfDdnSIroAZU5k0ApqPuIiWJuZ2A/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! marks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})


$('form').on('submit', function(e){
    var submitButton = $(this).find('input[type=submit]');
    $(this).append('<span>submitting...</span>');//Replace with whatever you want
    submitButton.css('display', 'none');
});
