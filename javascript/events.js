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

// Function to get the value of a parameter from the URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Check if there is an eventId parameter in the URL
const selectedEventId = getUrlParameter("eventId");

if (selectedEventId) {
    // If exists, find and display the event with this ID
    getEvents().then(events => {
        const event = events.find(e => e.id === Number(selectedEventId));
        if (event) {
            selectEvent(event);
        } else {
            console.error("Event not found!");
        }
    }).catch(error => {
        console.error("Error loading events:", error);
    });
}


// Fetch events from data.js
// Loading events from data.js
getEvents().then(events => {
    if (events.length === 0) {
        callToActionElement.classList.remove('event-selected');
        return;
    }

    // Render all events on the page
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

        // Add eventItem to the container
        eventsListContainer.appendChild(eventItem);

        // Clicking on an event will display the details
        eventItem.addEventListener('click', () => {
            selectEvent(event);
        });
    });

    // Check the eventId parameter in the URL and display the corresponding event
    const selectedEventId = getUrlParameter("eventId");
    if (selectedEventId) {
        const event = events.find(e => e.id === Number(selectedEventId));
        if (event) {
            selectEvent(event);
        } else {
            console.error("Event not found!");
        }
    }
}).catch(error => {
    console.error("Error loading events:", error);
});

// Function to select an event and display its details
function selectEvent(event) {
    // Make sure the detailed view will be updated
    callToActionElement.classList.remove('event-selected');
    callToActionElement.classList.add('event-selected');
    switchEventColors(event.id);

    // Set the event details in the info box
    eventNameElement.textContent = event.eventname;
    eventImageElement.src = `../resources/events/${event.mainPicture}`;
    eventLocationElement.textContent = event.location;
    eventAddressElement.textContent = event.address;
    eventTimeElement.textContent = event.time;
    eventDescriptionElement.textContent = event.description;

    // Display the detailed section
    eventDetailsElement.classList.remove('event-selected');
    eventDetailsElement.classList.add('event-selected');
}

function switchEventColors(id) {
    if (currentEventId) {
        const previousElement = document.getElementById(currentEventId);
        if (previousElement) {
            previousElement.classList.remove('selected');
        }
    }

    currentEventId = `event-${id}`;
    const currentElement = document.getElementById(currentEventId);
    if (currentElement) {
        currentElement.classList.add('selected');
    }
}
