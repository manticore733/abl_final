import React, { useEffect, useState, useRef } from "react";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Tooltip from "tippy.js";
import "tippy.js/dist/tippy.css";
import { fetchAllClubEvents } from "../../api/eventApi";
import "./css/CAdCalendar.css";

const CAdCalendar = () => {
  const calendarRef = useRef(null);
  const [rawEvents, setRawEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentDateTitle, setCurrentDateTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const categories = [
    { name: "All Categories", colorClass: "bg-secondary", type: "All" },
    { name: "Technical", colorClass: "bg-blue", type: "Technical" },
    { name: "Social", colorClass: "bg-amber", type: "Social" },
    { name: "Sports", colorClass: "bg-emerald", type: "Sports" },
    { name: "Cultural", colorClass: "bg-purple", type: "Cultural" },
  ];

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetchedEvents = await fetchAllClubEvents();

        const formattedEvents = fetchedEvents.map((event) => {
          const eventType = event.event_type ? event.event_type.trim() : "Unknown";
          return {
            id: event.event_id,
            title: event.event_name,
            start: event.start_date,
            allDay: true,
            className: `fc-custom-${eventType.toLowerCase()}`, // Assign custom CSS class based on type
            extendedProps: {
              description: event.description || "No description available.",
              eventType: eventType,
              location: event.location || "TBA",
              organizer: event.admin_name || "Club Admin",
              eventLink: event.event_link || "",
              entryFee: event.entry_fee || "Free",
              poster: event.poster_image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCeKGNDusdPUS155jJLi9wQF4FkluMVefYoUnjrMukUVEAGt9iQqSJyHCVwavjMq44maFcWKAz6qLpMe5klLz0bHLntTETKmTgBN_4XD6Q0VHWk62__tQ_pcuT7IDKY-CXy7AFBFclbv6iyZAUhOnNRNTzSzF_fco9cDfPTGG07H_HVziph9FJqV2upOMOWPuG2xbi4dWM0RvB6XaJqSbF4SwLwXNfK1MzpkiusSoIfWdTeKapDm2ACAIY3OSceTdKfQP7cMGga2gU" // Fallback image
            },
          };
        });

        setRawEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (error) {
        console.error("❌ Failed to fetch events", error);
      }
    };
    getEvents();
  }, []);

  // Filter events when category changes
  useEffect(() => {
    if (currentCategory === "All") {
      setFilteredEvents(rawEvents);
    } else {
      setFilteredEvents(rawEvents.filter(e => e.extendedProps.eventType === currentCategory));
    }
  }, [currentCategory, rawEvents]);

  const handleEventClick = ({ event }) => {
    setSelectedEvent({
      title: event.title,
      start: event.start,
      ...event.extendedProps
    });
  };

  // Change Calendar View (Day, Week, Month)
  const changeView = (viewName) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(viewName);
    setCurrentView(viewName);
  };

  return (
    <div className="ca-page-wrapper">
      <CAdNavbar />

      <main className="ca-cal-main">

        {/* Header Section */}
        <div className="ca-cal-header-row">
          <div>
            <p className="ca-super-title">Academic Calendar</p>
            <h2 className="ca-cal-title">{currentDateTitle || "Loading..."}</h2>
          </div>
          <div className="ca-view-toggles">
            <button className={currentView === "timeGridDay" ? "active" : ""} onClick={() => changeView("timeGridDay")}>Day</button>
            <button className={currentView === "timeGridWeek" ? "active" : ""} onClick={() => changeView("timeGridWeek")}>Week</button>
            <button className={currentView === "dayGridMonth" ? "active" : ""} onClick={() => changeView("dayGridMonth")}>Month</button>
          </div>
        </div>

        {/* Filters */}
        <div className="ca-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.type}
              className={`ca-filter-pill ${currentCategory === cat.type ? 'active' : ''}`}
              onClick={() => setCurrentCategory(cat.type)}
            >
              <span className={`ca-filter-dot ${cat.colorClass}`}></span> {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div className="ca-cal-grid">

          {/* Left: FullCalendar */}
          <div className="ca-cal-left">
            <div className="ca-fc-wrapper">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                events={filteredEvents}
                eventClick={handleEventClick}
                dayMaxEvents={3}
                contentHeight="auto" // Forces the calendar to expand
                datesSet={(arg) => setCurrentDateTitle(arg.view.title)}
                eventDidMount={(info) => {
                  new Tooltip(info.el, {
                    content: `<strong>${info.event.title}</strong><br/>📍 ${info.event.extendedProps.location}`,
                    allowHTML: true,
                    placement: "top",
                    theme: "light",
                  });
                }}
              />
            </div>
          </div>

          {/* Right: Event Details Panel */}
          <div className="ca-cal-right">
            {selectedEvent ? (
              <div className="ca-details-panel">
                <div className="ca-event-poster">
                  <img src={selectedEvent.poster} alt="Event Poster" />
                  <span className="ca-live-badge">SELECTED</span>
                </div>

                <h3 className="ca-event-name">{selectedEvent.title}</h3>

                <div className="ca-event-meta">
                  <span><span className="material-symbols-outlined">event</span> {new Date(selectedEvent.start).toLocaleDateString()}</span>
                  <span><span className="material-symbols-outlined">location_on</span> {selectedEvent.location}</span>
                </div>

                <div className="ca-event-desc">
                  <p>{selectedEvent.description}</p>
                </div>

                <div className="ca-stat-grid">
                  <div className="ca-stat-box">
                    <p className="lbl">Category</p>
                    <p className="val">{selectedEvent.eventType}</p>
                  </div>
                  <div className="ca-stat-box">
                    <p className="lbl">Entry Fee</p>
                    <p className="val">{selectedEvent.entryFee}</p>
                  </div>
                </div>

                <div className="ca-action-stack">
                  <button className="ca-btn-blue"><span className="material-symbols-outlined">analytics</span> View Detailed Analytics</button>
                  <button className="ca-btn-gray"><span className="material-symbols-outlined">edit</span> Edit Event Details</button>
                  <button className="ca-btn-red"><span className="material-symbols-outlined">delete_outline</span> Cancel Event</button>
                </div>
              </div>
            ) : (
              <div className="ca-details-panel empty-state">
                <span className="material-symbols-outlined empty-icon">calendar_month</span>
                <h3>Select an Event</h3>
                <p>Click on any event in the calendar to view its full details, analytics, and management options.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- MOVED: Mini Stats Card Below Grid --- */}
        <div className="ca-mini-stats">
          <div className="ca-mini-header">
            <h4>Monthly Attendance</h4>
            <span className="material-symbols-outlined">more_horiz</span>
          </div>
          <div className="ca-mini-chart">
            <div className="mini-bar h-40"></div>
            <div className="mini-bar h-60"></div>
            <div className="mini-bar h-100 bg-primary"></div>
            <div className="mini-bar h-30"></div>
            <div className="mini-bar h-50"></div>
          </div>
          <p>Event engagement is <strong>up 12.4%</strong> compared to last month.</p>
        </div>

      </main>
    </div>
  );
};

export default CAdCalendar;