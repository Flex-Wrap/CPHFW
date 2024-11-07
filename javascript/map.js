// Function to show the info box
function showInfo(locationName, locationDetails) {
    const infoBox = document.getElementById('info-box');
    const locationNameElement = document.getElementById('location-name');
    const locationDetailsElement = document.getElementById('location-details');

    locationNameElement.textContent = locationName;
    locationDetailsElement.textContent = locationDetails;

    infoBox.style.display = 'flex';

    // Add event listener to close info box when clicking outside
    setTimeout(() => { // Delay to ensure the event listener is added after the box opens
        document.addEventListener('click', closeInfoBox);
    }, 10);
}

// Function to close the info box when clicking outside
function closeInfoBox(event) {
    const infoBox = document.getElementById('info-box');
    const closeBtn = document.getElementById('close-btn');

    // Close the box only if the click was outside the info box or close button
    if (!infoBox.contains(event.target) && event.target !== closeBtn) {
        infoBox.style.display = 'none';
        document.removeEventListener('click', closeInfoBox); // Remove the click listener
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



// -------------------------------Function to handle close button click-----------------------------




document.addEventListener("DOMContentLoaded", () => {
    // Fetch events data from the JSON file
    fetch("../resources/events/events.json")
        .then(response => response.json())  // Convert the data from JSON to JS objects
        .then(events => {
            const eventCards = document.getElementById("event-cards"); // Container for event cards

            events.forEach(event => {
                // Create card container
                const card = document.createElement("div");
                card.classList.add("card"); // Add a class to the card

                // Create image element
                const img = document.createElement("img");
                img.src = `../resources/events/${event.mainPicture}`; // Event image path
                img.alt = event.name;

                // Create name element
                const name = document.createElement("h2");
                name.textContent = event.name;

                // Create a brief description (optional)
                const description = document.createElement("p");
                description.textContent = event.description || "No description available";

                // Put the image, name, and description inside the card
                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(description);

                // Create a link to the event's detail page using its unique data
                const eventString = encodeURIComponent(JSON.stringify(event));
                const link = document.createElement('a');
                link.href = `each-event.html?data=${eventString}`;  // Link to the event's detail page
                link.appendChild(card);  // Make the entire card clickable

                // Append the card to the event cards container
                eventCards.appendChild(link);
            });
        })
        .catch(error => console.error("Error loading event data:", error));
});
