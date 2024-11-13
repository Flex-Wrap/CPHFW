import { getDesigner } from "./data.js"; // Import the getDesigner function instead of getDesigners
let currentDesigner = null; // Variable to store the current designer data
let currentIndex = -1; // Global variable for current designer's index

// Function to format the bio text into paragraphs after 300 characters
function formatText(inputText) {
    if (inputText.length <= 300) return inputText; 

    const firstPart = inputText.slice(0, 300); // First 300 characters
    const restOfText = inputText.slice(300); // Remaining text

    // Find the position of the first period in the remaining text
    const periodIndex = restOfText.indexOf('.');

    if (periodIndex === -1) {
        return firstPart + '<br>' + '<br>' + restOfText;
    } else {
        const splitPosition = 300 + periodIndex + 2; // Position after the first period
        return inputText.slice(0, splitPosition) + '<br>' + '<br>' + inputText.slice(splitPosition);
    }
}

// Function to load the designer data and update the page
function loadDesigner(id) {
    getDesigner(id).then(designer => {
        currentDesigner = designer; // Set the designer data
        currentIndex = designer.id; // Set the current index based on the designer ID
        console.log("Current designer:", designer);

        // Set page title, main picture, name, and bio
        document.title = currentDesigner.name;
        document.getElementById('main-picture').src = `../resources/designers/${currentDesigner.mainPicture}`;
        document.getElementById('designer-name').textContent = currentDesigner.name;
        document.getElementById('designer-bio').innerHTML = formatText(currentDesigner.bio);

        // Update gallery images using a DocumentFragment
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = ''; // Clear the container

        // Use a DocumentFragment to append images in bulk
        const fragment = document.createDocumentFragment();
        if (currentDesigner.gallery && currentDesigner.gallery.length > 0) {
            currentDesigner.gallery.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = `../resources/designers/${image}`;
                imgElement.alt = `${currentDesigner.name}'s work`;
                imgElement.className = 'gallery-image';
                imgElement.loading = 'lazy'; // Enable lazy loading

                fragment.appendChild(imgElement); // Append to fragment (not the DOM directly)
            });

            galleryContainer.appendChild(fragment); // Append all at once to the DOM
        }
    }).catch(error => {
        console.error("Error loading designer:", error);
    });
}

// Gets designer ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const designerId = urlParams.get("data");

document.addEventListener("DOMContentLoaded", () => {
    // Fetch and load the designer when the page loads
    loadDesigner(designerId);
});

// Previous button functionality
document.getElementById('previous-button').addEventListener('click', () => {
    if (currentIndex > 0) {
        const previousDesignerId = currentIndex - 1;
        loadDesigner(previousDesignerId); // Use loadDesigner to load the previous designer
    }
});

// Next button functionality
document.getElementById('next-button').addEventListener('click', () => {
    if (currentIndex < 36) { // Adjust the max index if needed
        const nextDesignerId = currentIndex + 1;
        loadDesigner(nextDesignerId); // Use loadDesigner to load the next designer
    }
});
