
const scriptURL = 'https://script.google.com/macros/s/AKfycbxnpUM26Q7YXzaN27CsQQ7FOh1AdNSSmS1-3ggpM_csYAlO_nMyzEQEUztVKY-vvUBqQQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})


function hideLoader() {
    $('#loading').hide();
}

$(window).ready(hideLoader);

// Strongly recommended: Hide loader after 20 seconds, even if the page hasn't finished loading
setTimeout(hideLoader, 3 * 1000);


    
  .then(response => alert("Thank you! Student remarks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})



