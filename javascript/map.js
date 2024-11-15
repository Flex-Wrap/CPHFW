let currentSelectedId = "";  // Global variable to store the currently selected ID

// Function to switch background color of map icons
function switchElementColors(id, className = 'selected') {
    // Check if the element exists before accessing its classList
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id "${id}" not found!`);
        return;  // Exit early if the element does not exist
    }

    // Remove the selected class from the previously selected element
    if (currentSelectedId) {
        const previousElement = document.getElementById(currentSelectedId);
        if (previousElement) {
            previousElement.classList.remove(className);
        }
    }

    // Set the new currentSelectedId to the clicked icon and add the class
    currentSelectedId = id;
    element.classList.add(className);
}

// Function to show event information
function showInfo(id, locationName, locationAddress) {
    const infoBox = document.getElementById('info-box');
    const locationNameElement = document.getElementById('location-name');
    const locationDetailsElement = document.getElementById('location-details');
    const eventCardsContainer = document.getElementById('event-cards');

    // Set the location name and address
    locationNameElement.textContent = locationName;
    locationDetailsElement.textContent = locationAddress;

    infoBox.style.display = 'flex';

    // Clear previous event cards before showing new ones
    eventCardsContainer.innerHTML = '';

    // Fetch events data from the JSON file
    fetch("../resources/events/events.json")
        .then(response => response.json())
        .then(events => {
            // Filter events by location name (e.g., "Royal Danish Theatre")
            const filteredEvents = events.filter(event => event.location === locationName);

            // Check if there are events for the given location
            if (filteredEvents.length === 0) {
                eventCardsContainer.innerHTML = '<p>No events found for this location.</p>';
            } else {
                // Loop through filtered events and display them
                filteredEvents.forEach(event => {
                    // Create event card container
                    const card = document.createElement("div");
                    card.classList.add("mapcard");

                    // Add click event to redirect to events page with the event ID
                    card.addEventListener("click", () => {
                        window.location.href = `events.html?eventId=${event.id}`;
                    });

                    // Create event image element
                    const img = document.createElement("img");
                    img.src = `../resources/events/${event.mainPicture}`;
                    img.alt = event.name;

                    // Create a div to hold the text (h2 and p)
                    const textLayoutDiv = document.createElement("div");
                    textLayoutDiv.classList.add("textlayout");

                    // Create event name element
                    const name = document.createElement("h2");
                    name.textContent = `${event.eventname}`;

                    const playout = document.createElement("div");
                    playout.classList.add("playout");

                    // Create event date and time elements
                    const date = document.createElement("p");
                    date.textContent = `${event.date}`;

                    const time = document.createElement("p");
                    time.textContent = `${event.time}`;

                    // Append elements to the card
                    textLayoutDiv.appendChild(name);
                    playout.appendChild(date);
                    playout.appendChild(time);
                    textLayoutDiv.appendChild(playout);

                    card.appendChild(img);
                    card.appendChild(textLayoutDiv);
                    eventCardsContainer.appendChild(card);
                });
            }
        })
        .catch(error => console.error("Error loading event data:", error));

    // Add event listener to close the info box when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeInfoBox);
    }, 10);

    // Switch the colors for the clicked element
    switchElementColors(id);  // This should now work
}

// Function to close the info box when clicking outside
function closeInfoBox(event) {
    const infoBox = document.getElementById('info-box');

    // Close the box only if the click was outside the info box or close button
    if (event.target.classList.contains('map-image')) {
        infoBox.style.display = 'none';
        document.removeEventListener('click', closeInfoBox);
    }


}

// Function to handle close button click
function closeInfoBoxButton(event) {
    event.stopPropagation();  // Prevent event from propagating to the document listener

    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'none';

    // Remove the event listener after closing the info box
    document.removeEventListener('click', closeInfoBox);


}

document.querySelectorAll('.map-image').forEach((element) => {
    element.addEventListener('click', closeInfoBox);
});












  