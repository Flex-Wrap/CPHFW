const socialButtons = document.querySelectorAll('.social_button');
const container = document.getElementById('container');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-button');
const qrImage = document.querySelector('.QR_body img');
// added for the app
const appQRButton = document.getElementById('appQRButton')

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
//added for the app
appQRButton.addEventListener('click', () => {
    container.classList.add('active');
    overlay.classList.add('active');

    container.querySelector('.title').textContent = "CPHFW APP";
    qrImage.src = appQRButton.getAttribute('data-qr');
});

// Close the pop up when the close button is clicked
closeButton.addEventListener('click', () => {
    container.classList.remove('active');
    overlay.classList.remove('active');
});
