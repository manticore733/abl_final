// services/eventService.js
import * as eventRepo from "../repositories/eventRepository.js";

export const getFormattedPublicEvents = async (protocol, host) => {
    const events = await eventRepo.getAllPublicEvents();

    if (!events || events.length === 0) {
        throw new Error("NO_EVENTS_FOUND");
    }

    // Format the response so the frontend gets full image URLs
    return events.map(event => {
        const eventData = event.toJSON();

        // Ensure the poster image has the full backend URL attached
        if (eventData.poster_image && !eventData.poster_image.startsWith("http")) {
            // Strip any leading slashes to prevent double slashes in URL
            const cleanPath = eventData.poster_image.replace(/^\/+/, '');
            eventData.poster_image = `${protocol}://${host}/${cleanPath}`;
        }

        return eventData;
    });
};