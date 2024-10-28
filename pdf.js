document.getElementById('downloadBtn').addEventListener('click', function() {
    const inputValue = document.getElementById('inputValue').value;

    // Construct the URL for the PDF based on the input value
    const pdfUrl = `https://drive.google.com/drive/folders/11vOyFgAmRtjiPziu0SD3NsZte5ReSQ35?usp=drive_link/to/pdf/${inputValue}.pdf`; // Adjust the path as needed

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${inputValue}.pdf`; // Name of the downloaded file

    // Append to the body and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
});
