import { getDesigners } from "./data.js"; // Import the getDesigners function

document.addEventListener("DOMContentLoaded", () => { // when the webpage is ready, run the code inside the curly brackets
    getDesigners() // Calls getDesigners to fetch the designers data
        .then(designersData => {
            const designerCards = document.getElementById("designer-cards");

            designersData.forEach(designer => {
                // Create card container
                const card = document.createElement("div");
                card.classList.add("card"); // Add a class to the HTML element created

                // Add ID with the first letter of the designer's name
                const firstLetter = designer.name.charAt(0).toUpperCase();
                card.id = `letter-${firstLetter}`;

                // Create image element
                const img = document.createElement("img");
                img.src = `../resources/designers/${designer.mainPicture}`;
                img.alt = designer.name;

                // Create name element
                const name = document.createElement("h2");
                name.textContent = designer.name;

                // Put the image and the name inside the card div
                card.appendChild(img); 
                card.appendChild(name);

                // Create a link to the designer's detail page (each-designer.html) using their unique ID
                const designerString = encodeURIComponent(JSON.stringify(designer)); // Encode designer data as a string
                const link = document.createElement('a');
                link.href = `each-designer.html?data=${designerString}`; // Use the encoded designer string in the URL
                link.appendChild(card);  // Make the entire card clickable

                designerCards.appendChild(link); // Append the card link to the designerCards container
            });
        })
        .catch(error => console.error("Error loading designer data:", error)); // Handle errors
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
