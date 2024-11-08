import { getEvents } from "./data.js"
const socialButtons = document.querySelectorAll('.social_button');
const container = document.getElementById('qr-container');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-button');
const qrImage = document.querySelector('.QR_body img');
const appQRButton = document.getElementById('appQRButton');

// Select elements and add event listeners
document.querySelector('.map_home').addEventListener('click', () => navigateTo('pages/map.html'));
document.querySelector('.see_full_map_button').addEventListener('click', () => navigateTo('pages/map.html'));
document.getElementById('all_events_button').addEventListener('click', () => navigateTo('pages/events.html'));
document.getElementById('see_all_button').addEventListener('click', () => navigateTo('pages/designers.html'));

let designerIndex = [1,4,3,11,10];

document.querySelectorAll('.each_designer').forEach((element, index) => {
    element.addEventListener('click', () => goToDesigner(designerIndex[index])); // Use actual IDs as needed
});


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

getEvents().then(events => {
    generateEventCards(events.slice(0,3))});
    
//take user to the page after clicking on the designer
function navigateTo(page){
    window.location.href = page;
}


// Function to generate event cards dynamically
function generateEventCards(events) {
    const eventList = document.querySelector('.event-list');

    // Clear the event list before adding new cards
    eventList.innerHTML = '';

    // Loop through each event and create the HTML for the event card
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card-mini');

        eventCard.innerHTML = `
            <h2>${event.eventname}</h2>
            <p>${event.time}</p>
            <p>${event.description}</p>
        `;

        eventList.appendChild(eventCard);
    });
}

function goToDesigner(id) {
    const designer = designers.find(d => d.id === id);
    const designerString = encodeURIComponent(JSON.stringify(designer));
    window.location.href = `/pages/each-designer.html?data=${designerString}`;
}