import { getEvents } from "./data.js";
let currentEventId = "";
// Select the container for the event list and call-to-action element
const eventsListContainer = document.getElementById('events-list');
const callToActionElement = document.querySelector('.call-to-action');
const eventDetailsElement = document.querySelector('.event-details');

// Select details container items
const eventNameElement = document.getElementById('event-name');
const eventImageElement = document.getElementById('event-image');
const eventLocationElement = document.getElementById('event-location');
const eventAddressElement = document.getElementById('event-address');
const eventTimeElement = document.getElementById('event-time');
const eventDescriptionElement = document.getElementById('event-description');



// Fetch events from data.js
getEvents().then(events => {
    if (events.length === 0) {
        callToActionElement.classList.remove('event-selected');
        return;
    }
    
    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.id = `event-${event.id}`;
        
        // Event Name and Address
        const nameAddressDiv = document.createElement('div');
        nameAddressDiv.classList.add('event-name-adress');
        
        const eventName = document.createElement('h2');
        eventName.textContent = event.eventname;
        
        const eventAddress = document.createElement('h3');
        eventAddress.textContent = event.address;
        
        nameAddressDiv.appendChild(eventName);
        nameAddressDiv.appendChild(eventAddress);
        
        // Event Time
        const eventTimeDiv = document.createElement('div');
        eventTimeDiv.classList.add('event-time');
        
        const eventTime = document.createElement('p');
        eventTime.textContent = event.time;
        
        eventTimeDiv.appendChild(eventTime);
        
        // Append event details to the event item
        eventItem.appendChild(nameAddressDiv);
        eventItem.appendChild(eventTimeDiv);
        
        // Add eventItem to the events list container
        eventsListContainer.appendChild(eventItem);

        // Handle click to select event and show more details
        eventItem.addEventListener('click', () => {
            selectEvent(event);
        });
    });
}).catch(error => {
    console.error("Error loading events:", error);
});

// Function to select an event and show its details in the right section
function selectEvent(event) {
    callToActionElement.classList.remove('event-selected');
    callToActionElement.classList.add('event-selected');
    switchEventColors(event.id);
    eventNameElement.textContent = event.eventname;
    eventImageElement.src = `../resources/events/${event.mainPicture}`;
    eventLocationElement.textContent = event.location;
    eventAddressElement.textContent = event.address;
    eventTimeElement.textContent = event.time;
    eventDescriptionElement.textContent = event.description;

    eventDetailsElement.classList.remove('event-selected');
    eventDetailsElement.classList.add('event-selected');
}

function switchEventColors(id) {
    if (currentEventId) {
        document.getElementById(currentEventId).classList.remove('selected');
    }
    currentEventId = `event-${id}`;
    document.getElementById(currentEventId).classList.add('selected');
}

