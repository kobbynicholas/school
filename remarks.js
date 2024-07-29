
const scriptURL = 'https://script.google.com/macros/s/AKfycbxnpUM26Q7YXzaN27CsQQ7FOh1AdNSSmS1-3ggpM_csYAlO_nMyzEQEUztVKY-vvUBqQQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})

    
  .then(response => alert("Thank you! Student remarks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})


function showDiv() {
  document.getElementById('submit').style.display = "none";
  document.getElementById('loadingGif').style.display = "block";
  setTimeout(function() {
    document.getElementById('loadingGif').style.display = "none";
    document.getElementById('showme').style.display = "block";
  },2000);
   
}
