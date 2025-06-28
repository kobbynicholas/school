
const scriptURL = 'https://script.google.com/macros/s/AKfycbz9BLpopH4yo6afyPm4jV5H5hmgT9DVBCia6DN4ffy4TeXUslG6QJKVYpXQHt6FJLD3/exec'

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
