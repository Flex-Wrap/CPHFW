document.addEventListener("DOMContentLoaded", () => { // when the webpage is ready, tun the code inside the curly brackets
    fetch("designers.json") //gets data from the JSON file
        .then(response => response.json()) //converts data from JSON to JS objects
        .then(designers => {
            const designerCards = document.getElementById("designer-cards");

            designers.forEach(designer => {
                // Create card container
                const card = document.createElement("div");
                card.classList.add("card"); //adds a class to the HTML element created

                //Add ID with the first letter of designer's name
                const firstLetter = designer.name.charAt(0).toUpperCase();
                card.id = `letter-${firstLetter}`;

                // Create image element
                const img = document.createElement("img");
                img.src = designer.picture;
                img.alt = designer.name;

                // Create name element
                const name = document.createElement("h2");
                name.textContent = designer.name;

                // Put the image and the name inside the card div
                card.appendChild(img); 
                card.appendChild(name);

                // Put the card inside the designerCards div
                designerCards.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading designer data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const alphabetNav = document.querySelector(".alphabet-nav");

    alphabetNav.addEventListener("click", (event) => {
        if (event.target.tagName === "SPAN") {
            const letter = event.target.textContent;
            const targetElement = document.getElementById(`letter-${letter}`);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });
});
