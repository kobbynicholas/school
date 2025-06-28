
const scriptURL = 'https://script.google.com/macros/s/AKfycbxnpUM26Q7YXzaN27CsQQ7FOh1AdNSSmS1-3ggpM_csYAlO_nMyzEQEUztVKY-vvUBqQQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})

    
  .then(response => alert("Thank you! Student remarks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
   document.getElementById("myButton").style.display = "none";
})


function showDiv() {
  document.getElementById('submit').style.display = "flex";
  document.getElementById('loadingGif').style.display = "flex";
  setTimeout(function() {
    document.getElementById('loadingGif').style.display = "flex";
    document.getElementById('showme').style.display = "flex";
  },5000);
   
}
