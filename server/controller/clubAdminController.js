




import ClubEvent from "../postgres/model/ClubEvent.js";
import ClubAdmin from "../postgres/model/ClubAdmin.js";
import { format } from "date-fns"; // To format & compare dates
import multer from "multer";
import path from "path";
import fs from "fs";

export const addClubEvent = async (req, res) => {
    console.log("📌 Add Club Event Request Received!");

    // 🔹 Log request body
    console.log("📝 Request Body:", req.body);

    // 🔹 Log uploaded file (if any)
    const poster_image = req.file ? `/uploads/${req.file.filename}` : null;
    if (poster_image) {
        console.log("🖼️ Uploaded Image Path:", poster_image);
    } else {
        console.log("⚠️ No image uploaded!");
    }

    try {
        let {
            roll_number, club_name, admin_name, event_name, description,      //chmaged from cont to late
            start_date, end_date, start_time, end_time, location, entry_fee,
            event_type, event_mode,event_link // ✅ New fields added
        } = req.body;

        // 🔹 Set entry_fee to "Free" if empty
        const eventEntryFee = entry_fee?.trim() === "" ? "Free" : entry_fee;

         // 🔹 Trim event_link to remove extra spaces
         event_link = event_link ? event_link.trim() : null;

          // 🔹 Validate event_mode (must be Online, Offline, or Hybrid)
          const validModes = ["Online", "Offline"];
          if (!validModes.includes(event_mode)) {
              return res.status(400).json({ message: "Invalid event mode. Allowed values: Online, Offline"});
          }






        // 🔹 Determine event status automatically
        const today = format(new Date(), "yyyy-MM-dd"); // Get today's date
        let event_status = "PENDING"; // Default status

        if (start_date <= today && end_date >= today) {
            event_status = "ONGOING"; // Event is currently happening
        } else if (end_date < today) {
            event_status = "COMPLETED"; // Event is over
        }

        // 🔹 Insert event into DB
        const newEvent = await ClubEvent.create({
            roll_number,
            club_name,
            admin_name,
            event_name,
            description,
            start_date,
            end_date,
            start_time,
            end_time,
            location,
            entry_fee: eventEntryFee,
            event_type, // ✅ Added
            event_mode, // ✅ Added event_mode
            event_link, // ✅ Added
            poster_image,
            event_status // Auto-set event status
        });

        console.log(`✅ Event "${event_name}" added successfully!`);
        res.status(201).json({ message: "Event added successfully!", event: newEvent });

    } catch (error) {
        console.error("❌ Error adding event:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};









export const getClubAdminDetails = async (req, res) => {
    try {
        const rollNumber = req.params.rollNumber; // Get roll number from URL params

        console.log("API hit: GET /api/clubadmin/:rollNumber");
        console.log("Received roll number:", rollNumber); // Debug log

        // Fetch club admin details from the database
        const clubAdmin = await ClubAdmin.findOne({ where: { roll_number: rollNumber } });

        if (!clubAdmin) {
            console.log("No club admin found for roll number:", rollNumber); // Debug log
            return res.status(404).json({ message: "Club Admin not found" });
        }

        console.log("Club Admin data retrieved:", clubAdmin); // Debug log
        res.status(200).json(clubAdmin);
    } catch (error) {
        console.error("Error fetching club admin details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
















// Configure Multer for Profile Picture Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = "clubadminpfp/";
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the folder exists
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  const upload = multer({ storage });
  
  // Update Club Admin Profile
  export const updateClubAdmin = async (req, res) => {
    console.log("✅ PUT /api/clubadmin/profile/:roll_number hit!");  // Debugging line
    console.log("🆔 Received roll_number:", req.params.rollNumber); 
    console.log("📦 Request body:", req.body);
    console.log("📂 Uploaded file:", req.file); 
    try {
      const { rollNumber } = req.params; // Get roll number from URL
      const { name, dob, gender, branch, semester, year_of_joining, address, email, phone_number } = req.body;
  
      const updateData = {
        name,
        dob,
        gender,
        branch,
        semester,
        year_of_joining,
        address,
        email,
        phone_number,
      };
  
      // If a new profile picture is uploaded
      if (req.file) {
        updateData.profile_picture = req.file.path;
      }
  
      // Update the club admin details in the database
    //   const [updated] = await ClubAdmin.update(updateData, { where: { rollNumber } });
    const [updated] = await ClubAdmin.update(updateData, { where: { roll_number: rollNumber } });

  
      if (updated) {
        res.status(200).json({ message: "Profile updated successfully" });
      } else {
        res.status(404).json({ message: "Club Admin not found" });
      }
    } catch (error) {
      console.error("Error updating Club Admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };





























  // Fetch events created by a specific Club Admin
export const getClubAdminEvents = async (req, res) => {
    const { rollNumber } = req.params;

    try {
        const events = await ClubEvent.findAll({
            where: { roll_number: rollNumber },
        });


        console.log("Events found:", events.length); // Check how many events were found

        if (!events.length) {
            return res.status(404).json({ message: "No events found" });
        }

        // Modify response to include full image URL
        const updatedEvents = events.map(event => ({
            ...event.toJSON(),
            poster_image: event.poster_image ? `${req.protocol}://${req.get("host")}${event.poster_image}` : null,
        }));

        res.status(200).json(updatedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
};



























export const updateEvent = async (req, res) => {
  const { eventId } = req.params;


  // Log received data for debugging
  console.log("Updating Event ID:", eventId);
  console.log("Raw Request Body:", req.body);
  console.log("Uploaded Image:", req.file ? req.file.filename : "No new image uploaded");





  const {
    event_name,
    description,
    event_type,
    event_status,
    start_date,
    end_date,
    start_time,
    end_time,
    location,
    event_link,
    entry_fee
  } = req.body;

  try {
    const event = await ClubEvent.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update all event fields
    event.event_name = event_name;
    event.description = description;
    event.event_type = event_type;
    event.event_status = event_status;
    event.start_date = start_date;
    event.end_date = end_date;
    event.start_time = start_time;
    event.end_time = end_time;
    event.location = location;
    event.event_link = event_link;
    event.entry_fee = entry_fee;

    // Handle Image Upload (if a new image is provided)
    if (req.file) {
      // Delete the old image if exists
      if (event.poster_image) {
        const oldImagePath = path.join("uploads", path.basename(event.poster_image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      event.poster_image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    await event.save();

    res.status(200).json({ message: "Event updated successfully", updatedEvent: event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};



































export const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await ClubEvent.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the event poster image from the server
    if (event.poster_image) {
      const imagePath = path.join("uploads", path.basename(event.poster_image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the event from the database
    await event.destroy();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
