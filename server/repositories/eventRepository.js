// repositories/eventRepository.js
import ClubEvent from "../postgres/model/ClubEvent.js";
import { Op } from "sequelize";

export const getAllPublicEvents = async () => {
    // Fetches all events, ordering by the closest start date first
    return await ClubEvent.findAll({
        order: [["start_date", "ASC"]]
    });
};

export const getPublicEventById = async (eventId) => {
    return await ClubEvent.findByPk(eventId);
};