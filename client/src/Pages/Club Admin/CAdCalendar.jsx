// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import { fetchEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css"
// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchEvents();
//         console.log("Events for Calendar:", fetchedEvents); // Log events for debugging
//         setEvents(fetchedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   return (
//     <div>
//       <CAdNavbar />
//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin]}
//           initialView="dayGridMonth"
//           events={events} // Pass events to FullCalendar
//         />
//       </div>
//     </div>
//   );
// };

// export default CAdCalendar;





































// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Tooltip from "@mui/material/Tooltip";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { fetchAllClubEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css";

// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchAllClubEvents();
//         console.log("All Club Events for Calendar:", fetchedEvents);

//         const formattedEvents = fetchedEvents.map(event => ({
//           id: event.id,
//           title: event.event_name,
//           start: new Date(event.start_date).toISOString(), // Fixes date format
//           end: new Date(event.end_date).toISOString(),
//           extendedProps: {
//             description: event.description,
//             eventType: event.event_type,
//             location: event.location,
//             organizer: event.organizer || "Unknown",
//             eventLink: event.event_link,
//           },
//           color: getEventColor(event.event_type),
//         }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   const getEventColor = (eventType) => {
//     switch (eventType) {
//       case "Technical": return "#1976D2"; // Blue
//       case "Social": return "#388E3C"; // Green
//       case "Cultural": return "#F57C00"; // Orange
//       case "Sports": return "#D32F2F"; // Red
//       default: return "#757575"; // Gray (Unknown)
//     }
//   };

//   const handleEventClick = ({ event }) => {
//     setSelectedEvent(event);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div>
//       <CAdNavbar />

//       {/* Color Legend */}
//       <div className="legend-container">
//         <span className="legend-item" style={{ backgroundColor: "#1976D2" }}>Technical</span>
//         <span className="legend-item" style={{ backgroundColor: "#388E3C" }}>Social</span>
//         <span className="legend-item" style={{ backgroundColor: "#F57C00" }}>Cultural</span>
//         <span className="legend-item" style={{ backgroundColor: "#D32F2F" }}>Sports</span>
//       </div>

//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick}
//           eventContent={(arg) => (
//             <Tooltip title={arg.event.title} arrow>
//               <div style={{ backgroundColor: arg.event.backgroundColor, padding: "2px", borderRadius: "4px" }}>
//                 {arg.event.title}
//               </div>
//             </Tooltip>
//           )}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={{ p: 3, backgroundColor: "white", borderRadius: "10px", maxWidth: 500, width: "90%", mx: "auto", mt: 10 }}>
//           {selectedEvent && (
//             <>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedEvent.title}</Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>{selectedEvent.extendedProps.description}</Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 Event Type: {selectedEvent.extendedProps.eventType}
//               </Typography>
//               <Typography variant="body2">📍 Location: {selectedEvent.extendedProps.location}</Typography>
//               <Typography variant="body2">🕒 Start: {new Date(selectedEvent.start).toLocaleString()}</Typography>
//               <Typography variant="body2">🕒 End: {new Date(selectedEvent.end).toLocaleString()}</Typography>
//               <Typography variant="body2">👤 Organizer: {selectedEvent.extendedProps.organizer}</Typography>
//               {selectedEvent.extendedProps.eventLink && (
//                 <Typography variant="body2">
//                   🔗 <a href={selectedEvent.extendedProps.eventLink} target="_blank" rel="noopener noreferrer">Event Link</a>
//                 </Typography>
//               )}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CAdCalendar;












// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Tooltip from "@mui/material/Tooltip";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { fetchAllClubEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css";

// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchAllClubEvents();
//         console.log("All Club Events for Calendar:", fetchedEvents);

//         const formattedEvents = fetchedEvents.map(event => ({
//           id: event.event_id, 
//           title: event.event_name,
//           start: new Date(`${event.start_date}T${event.start_time}`).toISOString(),
//           end: new Date(`${event.end_date}T${event.end_time}`).toISOString(),
//           extendedProps: {
//             description: event.description || "No description available",
//             eventType: event.event_type || "Unknown",
//             location: event.location || "Not specified",
//             organizer: event.admin_name || "Unknown",
//             eventLink: event.event_link || "",
//             entryFee: event.entry_fee || "Free",
//           },
//           color: getEventColor(event.event_type),
//         }));

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   const getEventColor = (eventType) => {
//     switch (eventType) {
//       case "Technical": return "#1976D2"; // Blue
//       case "Social": return "#388E3C"; // Green
//       case "Cultural": return "#F57C00"; // Orange
//       case "Sports": return "#D32F2F"; // Red
//       default: return "#757575"; // Gray (Unknown)
//     }
//   };

//   const handleEventClick = ({ event }) => {
//     setSelectedEvent(event);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div>
//       <CAdNavbar />

//       {/* Color Legend */}
//       <div className="legend-container">
//         <span className="legend-item" style={{ backgroundColor: "#1976D2" }}>Technical</span>
//         <span className="legend-item" style={{ backgroundColor: "#388E3C" }}>Social</span>
//         <span className="legend-item" style={{ backgroundColor: "#F57C00" }}>Cultural</span>
//         <span className="legend-item" style={{ backgroundColor: "#D32F2F" }}>Sports</span>
//       </div>

//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick}
//           eventOverlap={false} // Prevents overlapping
//           dayMaxEventRows={3} // Limits number of rows per day
//           dayMaxEvents={3} // Adds a "more" link when there are too many events
//           moreLinkClick="popover" // Shows events in a popover instead of cluttering
//           eventContent={(arg) => (
//             <Tooltip title={`
//               ${arg.event.title}
//               📍 ${arg.event.extendedProps.location}
//               👤 ${arg.event.extendedProps.organizer}
//             `} arrow>
//               <div
//                 style={{
//                   backgroundColor: arg.event.color,
//                   padding: "4px",
//                   borderRadius: "6px",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   fontSize: "0.9em",
//                 }}
//               >
//                 {arg.event.title}
//               </div>
//             </Tooltip>
//           )}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={{ p: 3, backgroundColor: "white", borderRadius: "10px", maxWidth: 500, width: "90%", mx: "auto", mt: 10 }}>
//           {selectedEvent && (
//             <>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedEvent.title}</Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>{selectedEvent.extendedProps.description}</Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 Event Type: {selectedEvent.extendedProps.eventType}
//               </Typography>
//               <Typography variant="body2">📍 Location: {selectedEvent.extendedProps.location}</Typography>
//               <Typography variant="body2">🕒 Start: {new Date(selectedEvent.start).toLocaleString()}</Typography>
//               <Typography variant="body2">🕒 End: {new Date(selectedEvent.end).toLocaleString()}</Typography>
//               <Typography variant="body2">👤 Organizer: {selectedEvent.extendedProps.organizer}</Typography>
//               <Typography variant="body2">💰 Entry Fee: {selectedEvent.extendedProps.entryFee}</Typography>
//               {selectedEvent.extendedProps.eventLink && (
//                 <Typography variant="body2">
//                   🔗 <a href={selectedEvent.extendedProps.eventLink} target="_blank" rel="noopener noreferrer">Event Link</a>
//                 </Typography>
//               )}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CAdCalendar;
































////new?


// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Tooltip from "@mui/material/Tooltip";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { fetchAllClubEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css";

// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchAllClubEvents();
//         console.log("📅 All Club Events for Calendar:", fetchedEvents);

//         const formattedEvents = fetchedEvents.map(event => {
//           const startDateTime = new Date(`${event.start_date}T${event.start_time}`);
//           let endDateTime = new Date(`${event.end_date}T${event.end_time}`);

//           // If start and end are on the same day and no end time is given, set it to 23:59:59
//           if (event.start_date === event.end_date && !event.end_time) {
//             endDateTime.setHours(23, 59, 59);
//           }

//           console.log("✅ Processed Event:", {
//             title: event.event_name,
//             start: startDateTime.toString(),
//             end: endDateTime.toString(),
//           });

//           return {
//             id: event.event_id,
//             title: event.event_name,
//             start: startDateTime,
//             end: endDateTime,
//             extendedProps: {
//               description: event.description || "No description available",
//               eventType: event.event_type || "Unknown",
//               location: event.location || "Not specified",
//               organizer: event.admin_name || "Unknown",
//               eventLink: event.event_link || "",
//               entryFee: event.entry_fee || "Free",
//             },
//             color: getEventColor(event.event_type),
//           };
//         });

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("❌ Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   const getEventColor = (eventType) => {
//     switch (eventType) {
//       case "Technical": return "#1976D2";
//       case "Social": return "#388E3C";
//       case "Cultural": return "#F57C00";
//       case "Sports": return "#D32F2F";
//       default: return "#757575";
//     }
//   };

//   const handleEventClick = ({ event }) => {
//     setSelectedEvent(event);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div>
//       <CAdNavbar />

//       {/* Color Legend */}
//       <div className="legend-container">
//         <span className="legend-item" style={{ backgroundColor: "#1976D2" }}>Technical</span>
//         <span className="legend-item" style={{ backgroundColor: "#388E3C" }}>Social</span>
//         <span className="legend-item" style={{ backgroundColor: "#F57C00" }}>Cultural</span>
//         <span className="legend-item" style={{ backgroundColor: "#D32F2F" }}>Sports</span>
//       </div>

//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick}
//           eventOverlap={false}
//           dayMaxEventRows={3}
//           dayMaxEvents={3}
//           moreLinkClick="popover"
//           eventContent={(arg) => (
//             <Tooltip title={`
//               ${arg.event.title}
//               📍 ${arg.event.extendedProps.location}
//               👤 ${arg.event.extendedProps.organizer}
//             `} arrow>
//               <div
//                 style={{
//                   backgroundColor: arg.event.color,
//                   padding: "4px",
//                   borderRadius: "6px",
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   fontSize: "0.9em",
//                 }}
//               >
//                 {arg.event.title}
//               </div>
//             </Tooltip>
//           )}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={{ p: 3, backgroundColor: "white", borderRadius: "10px", maxWidth: 500, width: "90%", mx: "auto", mt: 10 }}>
//           {selectedEvent && (
//             <>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedEvent.title}</Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>{selectedEvent.extendedProps.description}</Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 Event Type: {selectedEvent.extendedProps.eventType}
//               </Typography>
//               <Typography variant="body2">📍 Location: {selectedEvent.extendedProps.location}</Typography>
//               <Typography variant="body2">🕒 Start: {new Date(selectedEvent.start).toLocaleString()}</Typography>
//               <Typography variant="body2">🕒 End: {new Date(selectedEvent.end).toLocaleString()}</Typography>
//               <Typography variant="body2">👤 Organizer: {selectedEvent.extendedProps.organizer}</Typography>
//               <Typography variant="body2">💰 Entry Fee: {selectedEvent.extendedProps.entryFee}</Typography>
//               {selectedEvent.extendedProps.eventLink && (
//                 <Typography variant="body2">
//                   🔗 <a href={selectedEvent.extendedProps.eventLink} target="_blank" rel="noopener noreferrer">Event Link</a>
//                 </Typography>
//               )}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CAdCalendar;





































// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Tooltip from "tippy.js"; // Importing Tippy.js for tooltips
// import "tippy.js/dist/tippy.css"; // Tooltip styles
// import { fetchAllClubEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css";

// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchAllClubEvents();
//         console.log("📅 All Club Events for Calendar:", fetchedEvents);

//         const formattedEvents = fetchedEvents.map((event) => {
//           const startDateTime = new Date(`${event.start_date}T${event.start_time}`);
//           let endDateTime = new Date(`${event.end_date}T${event.end_time}`);

//           // If start and end are on the same day and no end time is given, set it to 23:59:59
//           if (event.start_date === event.end_date && !event.end_time) {
//             endDateTime.setHours(23, 59, 59);
//           }

//           return {
//             id: event.event_id,
//             title: event.event_name,
//             start: startDateTime,
//             end: endDateTime,
//             extendedProps: {
//               description: event.description || "No description available",
//               eventType: event.event_type || "Unknown",
//               location: event.location || "Not specified",
//               organizer: event.admin_name || "Unknown",
//               eventLink: event.event_link || "",
//               entryFee: event.entry_fee || "Free",
//             },
//             color: getEventColor(event.event_type),
//           };
//         });

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("❌ Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   const getEventColor = (eventType) => {
//     switch (eventType) {
//       case "Technical":
//         return "#1976D2";
//       case "Social":
//         return "#388E3C";
//       case "Cultural":
//         return "#F57C00";
//       case "Sports":
//         return "#D32F2F";
//       default:
//         return "#757575";
//     }
//   };

//   const handleEventClick = ({ event }) => {
//     setSelectedEvent(event);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div>
//       <CAdNavbar />

//       {/* Color Legend */}
//       <div className="legend-container">
//         <span className="legend-item" style={{ backgroundColor: "#1976D2" }}>
//           Technical
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#388E3C" }}>
//           Social
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#F57C00" }}>
//           Cultural
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#D32F2F" }}>
//           Sports
//         </span>
//       </div>

//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick}
//           eventOverlap={false}
//           dayMaxEventRows={3}
//           dayMaxEvents={3}
//           moreLinkClick="popover"
//           eventContent={(arg) => (
//             <div
//               title={`${arg.event.title}\n📍 ${arg.event.extendedProps.location}\n👤 ${arg.event.extendedProps.organizer}`}
//               style={{
//                 backgroundColor: arg.event.color,
//                 padding: "4px",
//                 borderRadius: "6px",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 fontSize: "0.9em",
//               }}
//             >
//               {arg.event.title}
//             </div>
//           )}
//           eventDidMount={(info) => {
//             new Tooltip(info.el, {
//               content: `${info.event.title}<br>📍 ${info.event.extendedProps.location}<br>👤 ${info.event.extendedProps.organizer}`,
//               allowHTML: true,
//               placement: "top",
//               arrow: true,
//               theme: "light",
//             });
//           }}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             p: 3,
//             backgroundColor: "white",
//             borderRadius: "10px",
//             maxWidth: 500,
//             width: "90%",
//             mx: "auto",
//             mt: 10,
//           }}
//         >
//           {selectedEvent && (
//             <>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {selectedEvent.title}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>
//                 {selectedEvent.extendedProps.description}
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 Event Type: {selectedEvent.extendedProps.eventType}
//               </Typography>
//               <Typography variant="body2">
//                 📍 Location: {selectedEvent.extendedProps.location}
//               </Typography>
//               <Typography variant="body2">
//                 🕒 Start: {new Date(selectedEvent.start).toLocaleString()}
//               </Typography>
//               <Typography variant="body2">
//                 🕒 End: {new Date(selectedEvent.end).toLocaleString()}
//               </Typography>
//               <Typography variant="body2">
//                 👤 Organizer: {selectedEvent.extendedProps.organizer}
//               </Typography>
//               <Typography variant="body2">
//                 💰 Entry Fee: {selectedEvent.extendedProps.entryFee}
//               </Typography>
//               {selectedEvent.extendedProps.eventLink && (
//                 <Typography variant="body2">
//                   🔗{" "}
//                   <a
//                     href={selectedEvent.extendedProps.eventLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Event Link
//                   </a>
//                 </Typography>
//               )}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CAdCalendar;






















// import React, { useEffect, useState } from "react";
// import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Tooltip from "tippy.js";
// import "tippy.js/dist/tippy.css";
// import { fetchAllClubEvents } from "../../api/eventApi";
// import "./css/CAdCalendar.css";

// const CAdCalendar = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const fetchedEvents = await fetchAllClubEvents();
//         console.log("📅 All Club Events for Calendar:", fetchedEvents);

//         const formattedEvents = fetchedEvents.map((event) => {
//           const startDateTime = new Date(`${event.start_date}T${event.start_time}`);

//           return {
//             id: event.event_id,
//             title: event.event_name,
//             start: startDateTime, // Only mark on the start date
//             extendedProps: {
//               description: event.description || "No description available",
//               eventType: event.event_type ? event.event_type.trim() : "Unknown",
//               location: event.location || "Not specified",
//               organizer: event.admin_name || "Unknown",
//               eventLink: event.event_link || "",
//               entryFee: event.entry_fee || "Free",
//             },
//             color: getEventColor(event.event_type ? event.event_type.trim() : ""),
//           };
//         });

//         setEvents(formattedEvents);
//       } catch (error) {
//         console.error("❌ Failed to fetch events", error);
//       }
//     };

//     getEvents();
//   }, []);

//   const getEventColor = (eventType) => {
//     const eventTypeMap = {
//       "Technical": "#1976D2",
//       "Social": "#388E3C",
//       "Cultural": "#F57C00",
//       "Sports": "#D32F2F",
//     };
//     return eventTypeMap[eventType] || "#757575"; // Default gray if not found
//   };

//   const handleEventClick = ({ event }) => {
//     setSelectedEvent(event);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div>
//       <CAdNavbar />

//       {/* Color Legend */}
//       <div className="legend-container">
//         <span className="legend-item" style={{ backgroundColor: "#1976D2" }}>
//           Technical
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#388E3C" }}>
//           Social
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#F57C00" }}>
//           Cultural
//         </span>
//         <span className="legend-item" style={{ backgroundColor: "#D32F2F" }}>
//           Sports
//         </span>
//       </div>

//       <div className="calendarc">
//         <FullCalendar
//           plugins={[dayGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events}
//           eventClick={handleEventClick}
//           eventOverlap={false}
//           dayMaxEventRows={3}
//           dayMaxEvents={3}
//           moreLinkClick="popover"
//           eventContent={(arg) => (
//             <div
//               title={`${arg.event.title}\n📍 ${arg.event.extendedProps.location}\n👤 ${arg.event.extendedProps.organizer}`}
//               style={{
//                 backgroundColor: arg.event.color,
//                 padding: "4px",
//                 borderRadius: "6px",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 fontSize: "0.9em",
//               }}
//             >
//               {arg.event.title}
//             </div>
//           )}
//           eventDidMount={(info) => {
//             new Tooltip(info.el, {
//               content: `${info.event.title}<br>📍 ${info.event.extendedProps.location}<br>👤 ${info.event.extendedProps.organizer}`,
//               allowHTML: true,
//               placement: "top",
//               arrow: true,
//               theme: "light",
//             });
//           }}
//         />
//       </div>

//       {/* Modal for Event Details */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             p: 3,
//             backgroundColor: "white",
//             borderRadius: "10px",
//             maxWidth: 500,
//             width: "90%",
//             mx: "auto",
//             mt: 10,
//           }}
//         >
//           {selectedEvent && (
//             <>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {selectedEvent.title}
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1 }}>
//                 {selectedEvent.extendedProps.description}
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
//                 Event Type: {selectedEvent.extendedProps.eventType}
//               </Typography>
//               <Typography variant="body2">
//                 📍 Location: {selectedEvent.extendedProps.location}
//               </Typography>
//               <Typography variant="body2">
//                 🕒 Start: {new Date(selectedEvent.start).toLocaleString()}
//               </Typography>
//               <Typography variant="body2">
//                 👤 Organizer: {selectedEvent.extendedProps.organizer}
//               </Typography>
//               <Typography variant="body2">
//                 💰 Entry Fee: {selectedEvent.extendedProps.entryFee}
//               </Typography>
//               {selectedEvent.extendedProps.eventLink && (
//                 <Typography variant="body2">
//                   🔗{" "}
//                   <a
//                     href={selectedEvent.extendedProps.eventLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Event Link
//                   </a>
//                 </Typography>
//               )}
//             </>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default CAdCalendar;

































































import React, { useEffect, useState } from "react";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "tippy.js";
import "tippy.js/dist/tippy.css";
import { fetchAllClubEvents } from "../../api/eventApi";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./css/CAdCalendar.css";

const CAdCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchAllClubEvents();
        console.log("📅 All Club Events for Calendar:", fetchedEvents);

        const formattedEvents = fetchedEvents.map((event) => {
          const startDateTime = new Date(`${event.start_date}T${event.start_time}`);


           // Debugging: Check event type and assigned color
      console.log("Event Type:", event.event_type);
      console.log("Assigned Color:", getEventColor(event.event_type ? event.event_type.trim() : ""));

      return {
        id: event.event_id,
        title: event.event_name,
        start: event.start_date, // Only date, no time
        allDay: true, // Ensure event is treated as an all-day event
        backgroundColor: getEventColor(event.event_type ? event.event_type.trim() : ""),
        borderColor: getEventColor(event.event_type ? event.event_type.trim() : ""),
        textColor: "#fff",
        extendedProps: {
          description: event.description || "No description available",
          eventType: event.event_type ? event.event_type.trim() : "Unknown",
          location: event.location || "Not specified",
          organizer: event.admin_name || "Unknown",
          eventLink: event.event_link || "",
          entryFee: event.entry_fee || "Free",
        },
      };
        });

        console.log("Formatted Events:", formattedEvents);


        setEvents(formattedEvents);
      } catch (error) {
        console.error("❌ Failed to fetch events", error);
      }
    };

    getEvents();
  }, []);

  const getEventColor = (eventType) => {
    const eventTypeMap = {
      "Technical": "#1976D2",
      "Social": "#4caf50",
      "Cultural": '#9575cd',
      "Sports": "#D32F2F",
    };
    return eventTypeMap[eventType] || "#757575"; // Default gray if not found
  };

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <CAdNavbar />

      {/* Color Legend - Moved Below Navbar */}
<Grid container justifyContent="center" sx={{ mt: 10, mb: 4 }}>
  <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 2, borderRadius: 2 }}>
    <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span style={{ backgroundColor: "#1976D2", width: 16, height: 16, display: "inline-block", borderRadius: 4 }}></span>
      Technical
    </Typography>
    <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span style={{ backgroundColor: "#4caf50", width: 16, height: 16, display: "inline-block", borderRadius: 4 }}></span>
      Social
    </Typography>
    <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span style={{ backgroundColor: "#9575cd", width: 16, height: 16, display: "inline-block", borderRadius: 4 }}></span>
      Cultural
    </Typography>
    <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span style={{ backgroundColor: "#D32F2F", width: 16, height: 16, display: "inline-block", borderRadius: 4 }}></span>
      Sports
    </Typography>
  </Paper>
</Grid>

      <div className="calendarc"   style={{ marginTop: "-2px" }}   >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          eventOverlap={false}
          dayMaxEventRows={5}
          dayMaxEvents={5}
          moreLinkClick="popover"
          eventDidMount={(info) => {
            new Tooltip(info.el, {
              content: `${info.event.title}<br>📍 ${info.event.extendedProps.location}<br>👤 ${info.event.extendedProps.organizer}`,
              allowHTML: true,
              placement: "top",
              arrow: true,
              theme: "light",
            });
          }}
        />
      </div>

      {/* Modal for Event Details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            borderRadius: "10px",
            maxWidth: 500,
            width: "90%",
            mx: "auto",
            mt: 10,
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {selectedEvent.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {selectedEvent.extendedProps.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                Event Type: {selectedEvent.extendedProps.eventType}
              </Typography>
              <Typography variant="body2">
                📍 Location: {selectedEvent.extendedProps.location}
              </Typography>
              <Typography variant="body2">
                🕒 Start: {new Date(selectedEvent.start).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                👤 Organizer: {selectedEvent.extendedProps.organizer}
              </Typography>
              <Typography variant="body2">
                💰 Entry Fee: {selectedEvent.extendedProps.entryFee}
              </Typography>
              {selectedEvent.extendedProps.eventLink && (
                <Typography variant="body2">
                  🔗{" "}
                  <a
                    href={selectedEvent.extendedProps.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Event Link
                  </a>
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CAdCalendar;













