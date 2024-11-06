const socialButtons = document.querySelectorAll('.social_button');
const container = document.getElementById('container');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-button');
const qrImage = document.querySelector('.QR_body img');

// Show the pop up when a social media button is clicked
socialButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        container.classList.add('active');
        overlay.classList.add('active');

        const platform = event.target.alt;
        const qrCodeSrc = button.getAttribute('data-qr');

        container.querySelector('.title').textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
        qrImage.src = qrCodeSrc;
    });
});

// Close the pop up when the close button is clicked
closeButton.addEventListener('click', () => {
    container.classList.remove('active');
    overlay.classList.remove('active');
});
