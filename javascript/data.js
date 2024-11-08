// Function to get designers data, with caching
export function getDesigners() {
    // Check if designers data is already in localStorage
    const cachedDesigners = localStorage.getItem('designers');
    
    if (cachedDesigners) {
        // If cached data exists, parse and return it as a resolved promise
        return Promise.resolve(JSON.parse(cachedDesigners));
    }

    // If no cached data, fetch and store it in localStorage
    return fetch('../resources/designers/designers.json')
        .then(response => response.json())
        .then(designers => {
            localStorage.setItem('designers', JSON.stringify(designers));
            return designers;
        })
        .catch(error => {
            console.error("Error loading the designers data:", error);
            throw error;
        });
}

// Function to get events data, with caching
export function getEvents() {
    // Check if events data is already in localStorage
    const cachedEvents = localStorage.getItem('eventsData');
    
    if (cachedEvents) {
        // If cached data exists, parse and return it as a resolved promise
        return Promise.resolve(JSON.parse(cachedEvents));
    }

    // If no cached data, fetch and store it in localStorage
    return fetch('../resources/events/events.json')
        .then(response => response.json())
        .then(events => {
            localStorage.setItem('eventsData', JSON.stringify(events));
            return events;
        })
        .catch(error => {
            console.error("Error loading the events data:", error);
            throw error;
        });
}
