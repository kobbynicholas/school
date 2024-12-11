const scriptURL = 'https://script.google.com/macros/s/AKfycbxXio7AwLywwyKKQTswAS8pd9AB26Xz_gWEtjH0p4VQpjT3JtjLtDVx7WLmHkBm0flyWg/exec'

const form = document.forms['contact-form']
 
  form.addEventListener('submit', e => { 
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! marks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

function showDiv() {
  document.getElementById('submit').style.display = "flex";
  document.getElementById('loadingGif').style.display = "flex";
  setTimeout(function() {
    document.getElementById('loadingGif').style.display = "flex";
    document.getElementById('showme').style.display = "flex";
  },5000);
   
}
