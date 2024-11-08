let designers = []; // Global variable to store designers
let currentIndex = 0; // Global variable for current designer's index
const socialButtons = document.querySelectorAll('.social_button');
const container = document.getElementById('qr-container');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-button');
const qrImage = container.querySelector('.QR_body img');

function formatText(inputText) {
    if (inputText.length <= 300) return inputText; 

    const firstPart = inputText.slice(0, 300); // First 300 characters
    const restOfText = inputText.slice(300); // Remaining text

    // Step 3: Find the position of the first period in the remaining text
    const periodIndex = restOfText.indexOf('.');

    if (periodIndex === -1) {
        return firstPart + '<br>' + '<br>' + restOfText;
    } else {
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

currentIndex = designers.findIndex(d => d.id === designerJSON.id);
console.log("Current index:" + currentIndex);

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

// Show the pop up when a social media button is clicked
socialButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        container.classList.add('active');
        overlay.classList.add('active');

        const platform = event.target.alt;
        const qrCodeSrc = button.getAttribute("data-qr");

        container.querySelector('.title').textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
        qrImage.src = qrCodeSrc;
    });
});

// Close the pop up when the close button is clicked
closeButton.addEventListener('click', () => {
    currentIndex++;
    console.log(currentIndex);
    const designer = designers[currentIndex]
    const designerString = encodeURIComponent(JSON.stringify(designer));
    window.location.href = `/pages/each-designer.html?data=${designerString}`;
});


document.getElementById('previous-button').addEventListener('click', () => {
    if(currentIndex >1) {
        currentIndex--;
        const previousDesigner = designers[currentIndex];
        updateDesignerPage(previousDesigner);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if(currentIndex < 36) {
        currentIndex++;
        const nextDesigner = designers[currentIndex];
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


function goToDesigner(id) {
    const designer = designers[id]
    const designerString = encodeURIComponent(JSON.stringify(designer));
    window.location.href = `/pages/each-designer.html?data=${designerString}`;
}
