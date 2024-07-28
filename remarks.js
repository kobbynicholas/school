
const scriptURL = 'https://script.google.com/macros/s/AKfycbxnpUM26Q7YXzaN27CsQQ7FOh1AdNSSmS1-3ggpM_csYAlO_nMyzEQEUztVKY-vvUBqQQ/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Student remarks submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})




$("#content form").submit(function(e) {
    var $this = $(this);
    $('<img />', {
        'src': 'loading1.gif',
        'alt': 'submitting form',
        'class': 'loading',
        'style': 'display: block; margin: 0 auto;' // Use a class instead
    }).appendTo(this);

    $this.find(':submit').hide();

    e.preventDefault();

    $.ajax({
        type: $this.attr('method') || 'get',
        url: $this.attr('action') || window.location,
        data: $this.serialize(),
        success: function(response) {
            $(this).find('.loading').remove();
            $(this).find(':submit').show();
        }
    });
});
