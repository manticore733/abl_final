import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./css/SCalendar.css";
import { fetchEvents } from "../../api/eventApi";
import SNavbar from "../../Components/StudentC/SNavbar";

/* --- Lumina SaaS Palette --- */
const SAAS_COLORS = ["#3a388b", "#2170e4", "#0058be", "#4b2d98", "#fd9d1a"];

const getMiniCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDay === 0 ? 6 : firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, cur: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, cur: true });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++) cells.push({ day: d, cur: false });
  return cells;
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const SCalendar = () => {
  const navigate = useNavigate();
  const calRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("dayGridMonth");
  const [headerTitle, setHeaderTitle] = useState("");

  const today = new Date();
  const [miniDate, setMiniDate] = useState({ year: today.getFullYear(), month: today.getMonth() });

  // NEW: Global selected date state (defaults to today)
  const [selectedDate, setSelectedDate] = useState(today);

  const [filters, setFilters] = useState({ Academic: true, Technical: true, Social: true, Sports: false });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetched = await fetchEvents();
        setEvents(fetched.map((ev, i) => ({
          ...ev,
          color: ev.color || SAAS_COLORS[i % SAAS_COLORS.length],
        })));
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    loadEvents();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", { method: "POST", credentials: "include" });
      if (response.ok) navigate("/", { replace: true });
    } catch (error) { console.error("Error during logout:", error); }
  };

  const handleDatesSet = (info) => {
    setHeaderTitle(info.view.title);
    const midDate = new Date((info.start.getTime() + info.end.getTime()) / 2);
    setMiniDate({ year: midDate.getFullYear(), month: midDate.getMonth() });
  };

  const switchView = (v) => {
    setView(v);
    calRef.current?.getApi().changeView(v);
  };

  const miniPrev = () => {
    setMiniDate(p => p.month === 0 ? { year: p.year - 1, month: 11 } : { ...p, month: p.month - 1 });
    calRef.current?.getApi().prev();
  };

  const miniNext = () => {
    setMiniDate(p => p.month === 11 ? { year: p.year + 1, month: 0 } : { ...p, month: p.month + 1 });
    calRef.current?.getApi().next();
  };

  // NEW: Clicking a Mini Calendar day updates the global selected date
  const handleMiniDayClick = (dayStr, isCur) => {
    if (!isCur) return;
    const newDate = new Date(miniDate.year, miniDate.month, dayStr);
    setSelectedDate(newDate);
    calRef.current?.getApi().gotoDate(newDate);
  };

  const miniDays = getMiniCalendarDays(miniDate.year, miniDate.month);

  /* --- Right Panel Data --- */

  // NEW: Filter events based on the SELECTED date, not just 'today'
  const agendaEvents = events.filter((e) => {
    const d = new Date(e.start || e.date);
    return d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear();
  }).slice(0, 3);

  const upcoming = events.filter((e) => {
    const d = new Date(e.start || e.date);
    const diff = (d - today) / 86400000;
    return diff > 0 && diff <= 14;
  }).sort((a, b) => new Date(a.start || a.date) - new Date(b.start || b.date)).slice(0, 3);

  const renderEventContent = (arg) => {
    return (
      <div className="sc-event-pill" style={{ background: `${arg.event.backgroundColor}15`, color: arg.event.backgroundColor, borderLeft: `3px solid ${arg.event.backgroundColor}` }}>
        <span className="sc-event-title">{arg.event.title}</span>
      </div>
    );
  };

  const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

  // Helper to check if selected date is actual today
  const isActuallyToday = selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear();

  return (
    <div className="sc-page-wrapper">
      <SNavbar />
      <main className="sc-main-content">
        <div className="sc-container">

          <header className="sc-header-anchor">
            <div>
              <h2 className="sc-page-title">Academic Events</h2>
              <p className="sc-page-subtitle">Manage your lectures, workshops, and deadlines.</p>
            </div>
          </header>

          <div className="sc-bento-grid">
            {/* LEFT COLUMN: Mini Calendar & Filters */}
            <div className="sc-col-left">
              <section className="sc-panel sc-minical-panel">
                <div className="sc-minical-header">
                  <h3>{MONTH_NAMES[miniDate.month]} {miniDate.year}</h3>
                  <div className="sc-minical-arrows">
                    <button onClick={miniPrev}><ChevronLeft size={16} /></button>
                    <button onClick={miniNext}><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="sc-minical-grid">
                  {DAY_LABELS.map((l, idx) => <span key={idx} className="sc-minical-daylabel">{l}</span>)}
                  {miniDays.map((c, i) => {
                    const isToday = c.cur && c.day === today.getDate() && miniDate.month === today.getMonth() && miniDate.year === today.getFullYear();

                    // NEW: Check if this mini calendar day matches the globally selected date
                    const isSelected = c.cur && c.day === selectedDate.getDate() && miniDate.month === selectedDate.getMonth() && miniDate.year === selectedDate.getFullYear();

                    let dayClass = "sc-minical-day";
                    if (!c.cur) dayClass += " dim";
                    if (isToday) dayClass += " today";
                    if (isSelected && !isToday) dayClass += " selected";

                    return (
                      <button key={i} className={dayClass} onClick={() => handleMiniDayClick(c.day, c.cur)}>
                        {c.day}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="sc-filters-section">
                <h4>Event Categories</h4>
                <div className="sc-filter-list">
                  {Object.keys(filters).map(key => (
                    <label key={key} className={`sc-filter-item ${filters[key] ? 'active' : ''}`}>
                      <input type="checkbox" checked={filters[key]} onChange={() => toggleFilter(key)} />
                      <div className={`sc-filter-color dot-${key.toLowerCase()}`}></div>
                      <span>{key}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* CENTER COLUMN: Main Calendar */}
            <div className="sc-col-center">
              <div className="sc-panel sc-calendar-wrapper">
                <div className="sc-cal-header">
                  <h2>{headerTitle}</h2>
                  <div className="sc-view-tabs">
                    <button className={view === "timeGridWeek" ? "active" : ""} onClick={() => switchView("timeGridWeek")}>Week</button>
                    <button className={view === "dayGridMonth" ? "active" : ""} onClick={() => switchView("dayGridMonth")}>Month</button>
                  </div>
                </div>

                <div className="sc-cal-body">
                  <FullCalendar
                    ref={calRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    headerToolbar={false}
                    contentHeight="auto"
                    firstDay={1}
                    datesSet={handleDatesSet}
                    dayMaxEvents={3}
                    moreLinkText={(n) => `+${n} more`}
                    eventContent={renderEventContent}
                    /* NEW: Clicking a grid cell updates the Agenda */
                    dateClick={(info) => {
                      setSelectedDate(info.date);
                    }}
                    /* NEW: Clicking an event also updates the Agenda */
                    eventClick={(info) => {
                      if (info.event.start) setSelectedDate(info.event.start);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Agenda & Upcoming */}
            <div className="sc-col-right">
              {/* Dynamic Agenda Card */}
              <section className="sc-today-card">
                <div className="sc-glow-orb"></div>
                {/* Dynamically change title based on selection */}
                <h3 className="sc-today-title">{isActuallyToday ? "Today" : "Agenda"}</h3>
                <p className="sc-today-date">
                  {selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>

                <div className="sc-agenda-list">
                  {agendaEvents.length > 0 ? agendaEvents.map((ev, i) => (
                    <div className="sc-agenda-item" key={i}>
                      <div className="sc-agenda-line" style={{ background: ev.color }}></div>
                      <div>
                        {/* Time can be dynamic if your events have precise times */}
                        <p className="sc-agenda-time">Scheduled Event</p>
                        <p className="sc-agenda-name">{ev.title}</p>
                        <p className="sc-agenda-meta"><span className="material-symbols-outlined">location_on</span> {ev.extendedProps?.venue || "Campus"}</p>
                      </div>
                    </div>
                  )) : (
                    <div className="sc-agenda-empty-state">
                      <span className="material-symbols-outlined">event_busy</span>
                      <p>No events scheduled for this day.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Upcoming Deadlines */}
              <section className="sc-upcoming-section">
                <h4>Upcoming Deadlines</h4>
                <div className="sc-upcoming-list">
                  {upcoming.length > 0 ? upcoming.map((ev, i) => {
                    const d = new Date(ev.start || ev.date);
                    const daysLeft = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
                    return (
                      <div className="sc-upcoming-card group" key={i}>
                        <div className="sc-up-icon" style={{ background: `${ev.color}15`, color: ev.color }}>
                          <span className="material-symbols-outlined">description</span>
                        </div>
                        <div className="sc-up-info">
                          <p className="sc-up-title">{ev.title}</p>
                          <p className="sc-up-due">Due in {daysLeft} days</p>
                        </div>
                        <span className="material-symbols-outlined sc-up-arrow group-hover:translate-x-1">chevron_right</span>
                      </div>
                    );
                  }) : (
                    <p className="sc-upcoming-empty">All caught up!</p>
                  )}
                </div>
              </section>
            </div>


          </div>
        </div>
      </main>
      {/* Footer - Now fully spanning the bottom */}
      <footer className="sh-footer">
        <div className="sh-footer-content">
          <div>
            <p className="sh-copyright">© 2024 Academic Editorial University. All rights reserved.</p>
          </div>
          <div className="sh-footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SCalendar;