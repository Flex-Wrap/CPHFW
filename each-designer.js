// gets designer ID
const urlParams = new URLSearchParams(window.location.search);
const designer = urlParams.get("data");

document.addEventListener("DOMContentLoaded", () => {
const designerJSON = JSON.parse(decodeURIComponent(designer));
console.log(designerJSON);

document.title = designerJSON.name; //sets the title of the page depending on the designer name

document.getElementById('main-picture').src = `../resources/designers/${designerJSON.mainPicture}`;
document.getElementById('designer-name').textContent = designerJSON.name;
document.getElementById('designer-bio').textContent = designerJSON.bio;

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