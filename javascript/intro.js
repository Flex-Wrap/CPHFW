import { getDesigners, getEvents } from "./data.js";

getDesigners().catch(error => console.error("Failed to load designers:", error));
getEvents().catch(error => console.error("Failed to load events:", error));

setTimeout(() => {
    window.location.href = "pages/home.html";
}, 5000);

