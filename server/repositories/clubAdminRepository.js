// repositories/clubAdminRepository.js
import ClubAdmin from "../postgres/model/ClubAdmin.js";
import ClubEvent from "../postgres/model/ClubEvent.js";

// --- Club Admin Profile ---
export const getAdminByRollNumber = async (rollNumber) => {
    return await ClubAdmin.findOne({ where: { roll_number: rollNumber } });
};

export const updateAdminProfile = async (rollNumber, updateData) => {
    return await ClubAdmin.update(updateData, { where: { roll_number: rollNumber } });
};

// --- Event Management ---
export const createEvent = async (eventData) => {
    return await ClubEvent.create(eventData);
};

export const getEventsByClubAdmin = async (rollNumber) => {
    return await ClubEvent.findAll({ where: { roll_number: rollNumber } });
};

export const getEventById = async (eventId) => {
    return await ClubEvent.findByPk(eventId);
};

export const updateEvent = async (event, updateData) => {
    return await event.update(updateData);
};

export const deleteEvent = async (event) => {
    return await event.destroy();
};