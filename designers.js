document.addEventListener("DOMContentLoaded", () => { // when the webpage is ready, tun the code inside the curly brackets
    fetch("../resources/designers/designers.json") //gets data from the JSON file
        .then(response => response.json()) //converts data from JSON to JS objects
        .then(designersData => {
            localStorage.setItem("designers", JSON.stringify(designersData));

            const designerCards = document.getElementById("designer-cards");

            designersData.forEach(designer => {
                // Create card container
                const card = document.createElement("div");
                card.classList.add("card"); //adds a class to the HTML element created

                //Add ID with the first letter of designer's name
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

                // Put the card inside the designerCards div
               // designerCards.appendChild(card);

                // Create a link to the designer's detail page (designer.html) using their unique ID
                const designerString = encodeURIComponent(JSON.stringify(designer));
                const link = document.createElement('a');
                link.href = `each-designer.html?data=${designerString}`;  // Add the designer's ID as a query parameter
                link.appendChild(card);  // Make the entire card clickable

                designerCards.appendChild(link);
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
