let designers = []; // Global variable to store designers
let currentIndex = -1; // Global variable for current designer's index

function formatText(inputText) {
    // Step 1: Check if the string is at least 100 characters long
    if (inputText.length <= 300) return inputText; // If less than 100, return as is.

    // Step 2: Find the next period after the 100th character
    const firstPart = inputText.slice(0, 300); // First 100 characters
    const restOfText = inputText.slice(300); // Remaining text

    // Step 3: Find the position of the first period in the remaining text
    const periodIndex = restOfText.indexOf('.');

    if (periodIndex === -1) {
        // If no period is found, return the original text with a line break after the 100th character
        return firstPart + '<br>' + '<br>' + restOfText;
    } else {
        // Step 4: Insert a line break after the first period
        const splitPosition = 300 + periodIndex + 2; // Position after the first period
        return inputText.slice(0, splitPosition) + '<br>' + '<br>' + inputText.slice(splitPosition);
    }
}

// gets designer ID
const urlParams = new URLSearchParams(window.location.search);
const designer = urlParams.get("data");

document.addEventListener("DOMContentLoaded", () => {
const designerJSON = JSON.parse(decodeURIComponent(designer));

designers = JSON.parse(localStorage.getItem("designers"));

console.log(designerJSON);
//currentIndex = designers.findIndex(d => d.id === designerJSON.id);

document.title = designerJSON.name; //sets the title of the page depending on the designer name

document.getElementById('main-picture').src = `../resources/designers/${designerJSON.mainPicture}`;
document.getElementById('designer-name').textContent = designerJSON.name;
document.getElementById('designer-bio').innerHTML = formatText(designerJSON.bio);

//gallery img
const galleryContainer = document.getElementById('gallery-container');
galleryContainer.innerHTML = ''; //clears the container
if(designerJSON.gallery && designerJSON.gallery.length > 0) {
    designerJSON.gallery.forEach (image => {
        const imgElement = document.createElement('img');
        imgElement.src = `../resources/designers/${image}`;
        imgElement.alt = `${designerJSON.name}'s work`;
        imgElement.className = 'gallery-image';
        galleryContainer.appendChild(imgElement);
    })

}
});

document.getElementById('previous-button').addEventListener('click', () => {
    if(currentIndex >1) {
        const previousDesigner = designers[currentIndex - 1];
        updateDesignerPage(previousDesigner);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if(currentIndex < 36) {
        const nextDesigner = designers[currentIndex + 1];
        updateDesignerPage(nextDesigner);
    }
});

 // Function to update the page with new designer's details
 function updateDesignerPage(newDesigner) {
    document.title = newDesigner.name;
    document.getElementById('main-picture').src = `../resources/designers/${newDesigner.mainPicture}`;
    document.getElementById('designer-name').textContent = newDesigner.name;
    document.getElementById('designer-bio').innerHTML = formatText(newDesigner.bio);

    // Update gallery images
    galleryContainer.innerHTML = ''; // Clear the container
    if (newDesigner.gallery && newDesigner.gallery.length > 0) {
        newDesigner.gallery.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `../resources/designers/${image}`;
            imgElement.alt = `${newDesigner.name}'s work`;
            imgElement.className = 'gallery-image';
            galleryContainer.appendChild(imgElement);
        });
    }

    // Update the URL with the new designer
    const designerString = encodeURIComponent(JSON.stringify(newDesigner));
    window.history.pushState({}, "", `?data=${designerString}`);
}
