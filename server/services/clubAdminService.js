// services/clubAdminService.js
import * as clubAdminRepo from "../repositories/clubAdminRepository.js";
import { format } from "date-fns";
import fs from "fs";
import path from "path";

// 🧹 Helper Function: Delete an old image from the server
const deleteOldImage = (imagePath) => {
    if (!imagePath) return;
    try {
        const filename = path.basename(imagePath);
        const folder = imagePath.includes('clubadminpfp') ? 'clubadminpfp' : 'uploads';
        const fullPath = path.join(process.cwd(), folder, filename);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    } catch (error) {
        console.error("Failed to delete old image:", error);
    }
};

// ==========================================
// 🧑‍💼 PROFILE LOGIC
// ==========================================
export const getProfile = async (rollNumber) => {
    const profile = await clubAdminRepo.getAdminByRollNumber(rollNumber);
    if (!profile) throw new Error("ADMIN_NOT_FOUND");
    return profile;
};

export const updateProfile = async (rollNumber, data, file) => {
    const updateData = { ...data };

    if (file) {
        const admin = await clubAdminRepo.getAdminByRollNumber(rollNumber);
        if (admin && admin.profile_picture) deleteOldImage(admin.profile_picture);
        updateData.profile_picture = `clubadminpfp/${file.filename}`; // Standardized path
    }

    const [updatedCount] = await clubAdminRepo.updateAdminProfile(rollNumber, updateData);
    if (updatedCount === 0) throw new Error("ADMIN_NOT_FOUND");
};

// ==========================================
// 📅 EVENT LOGIC
// ==========================================
export const createClubEvent = async (rollNumber, data, file) => {
    const admin = await clubAdminRepo.getAdminByRollNumber(rollNumber);
    if (!admin) throw new Error("ADMIN_NOT_FOUND");

    const today = format(new Date(), "yyyy-MM-dd");
    let event_status = "PENDING";
    if (data.start_date <= today && data.end_date >= today) event_status = "ONGOING";
    else if (data.end_date < today) event_status = "COMPLETED";

    const eventData = {
        ...data,
        roll_number: rollNumber,
        club_name: admin.club_name, // Auto-fetch from profile!
        admin_name: admin.name,     // Auto-fetch from profile!
        entry_fee: data.entry_fee?.trim() === "" ? "Free" : data.entry_fee,
        event_link: data.event_link ? data.event_link.trim() : null,
        poster_image: file ? `uploads/${file.filename}` : null,
        event_status
    };

    return await clubAdminRepo.createEvent(eventData);
};

export const getMyEvents = async (rollNumber, protocol, host) => {
    const events = await clubAdminRepo.getEventsByClubAdmin(rollNumber);

    // Attach full URL for frontend rendering
    return events.map(event => {
        const eventData = event.toJSON();
        if (eventData.poster_image) {
            eventData.poster_image = `${protocol}://${host}/${eventData.poster_image}`;
        }
        return eventData;
    });
};

export const updateClubEvent = async (rollNumber, eventId, data, file) => {
    const event = await clubAdminRepo.getEventById(eventId);
    if (!event) throw new Error("EVENT_NOT_FOUND");

    // 🛡️ SECURITY CHECK: Prevent Club A from editing Club B's event!
    if (event.roll_number !== rollNumber) throw new Error("UNAUTHORIZED");

    const updateData = { ...data };

    if (file) {
        deleteOldImage(event.poster_image);
        updateData.poster_image = `uploads/${file.filename}`;
    }

    return await clubAdminRepo.updateEvent(event, updateData);
};

export const deleteClubEvent = async (rollNumber, eventId) => {
    const event = await clubAdminRepo.getEventById(eventId);
    if (!event) throw new Error("EVENT_NOT_FOUND");

    // 🛡️ SECURITY CHECK: Prevent Club A from deleting Club B's event!
    if (event.roll_number !== rollNumber) throw new Error("UNAUTHORIZED");

    deleteOldImage(event.poster_image);
    await clubAdminRepo.deleteEvent(event);
};