function showInfo(locationName, locationDetails) {
    // Display the info box
    const infoBox = document.getElementById('info-box');
    const locationNameElement = document.getElementById('location-name');
    const locationDetailsElement = document.getElementById('location-details');

    // Set the location name and details
    locationNameElement.textContent = locationName;
    locationDetailsElement.textContent = locationDetails;

    // Show the info box
    infoBox.style.display = 'flex';

    // Add event listener to close info box if clicked outside
    document.addEventListener('click', closeInfoBox);
}

// Function to close the info box
function closeInfoBox(event) {
    const infoBox = document.getElementById('info-box');
    const mapContainer = document.querySelector('.map-container');

    // Check if the click was outside the info box and map
    if (!infoBox.contains(event.target) && !mapContainer.contains(event.target)) {
        // Hide the info box and keep the map visible
        infoBox.style.display = 'none';

        // Remove the event listener once the info box is closed
        document.removeEventListener('click', closeInfoBox);
    }
}



