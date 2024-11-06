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
