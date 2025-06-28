
const scriptURL = 'https://script.google.com/macros/s/AKfycbyitxa8TRVTTAYSwSrP5stfqsPpLxNFqDooJyMu1coYJJJb0HUTQJE7eHLLcIkJmPyD/exec'

const form = document.forms['contact-form']
 
form.addEventListener('submit', e => { 
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! marks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
  document.getElementById("myButton").style.display = "none";
})


function showDiv() {
  document.getElementById('loadingGif').style.display = "flex";
  setTimeout(function() {
  document.getElementById('loadingGif').style.display = "flex";
  },5000);
}
