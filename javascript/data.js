export function getDesigners() {
    const cachedDesigners = localStorage.getItem('designers');
    
    if (cachedDesigners) {
        return Promise.resolve(JSON.parse(cachedDesigners));
    }

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

export function getDesigner(id) {
    return getDesigners().then(designers => {
        const designer = designers.find(d => d.id === Number(id));
        if (designer) {
            return designer;
        } else {
            throw new Error('Designer not found');
        }
    });
}
export function getEvents() {
    const cachedEvents = localStorage.getItem('eventsData');
    
    if (cachedEvents) {
        return Promise.resolve(JSON.parse(cachedEvents));
    }

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
