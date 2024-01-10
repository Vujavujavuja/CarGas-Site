document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch('/contact', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('formMessage').innerHTML = data;
            document.getElementById('formMessage').style.display = 'block';
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
