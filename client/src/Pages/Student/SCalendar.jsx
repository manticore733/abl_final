import React, { useEffect, useRef, useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CheckCircle2, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import "./css/SCalendar.css";
import { fetchEvents } from "../../api/eventApi";

/* --- Vivid SaaS Palette (like Image 2) --- */
const SAAS_COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
];

const getMiniCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, cur: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, cur: true });
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++) cells.push({ day: d, cur: false });
  return cells;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SCalendar = () => {
  const calRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("dayGridMonth");

  // Date state for header sync
  const [headerTitle, setHeaderTitle] = useState("");

  // Modal state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const today = new Date();

  // Mini Calendar State
  const [miniDate, setMiniDate] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedMiniDay, setSelectedMiniDay] = useState(today.getDate()); // only track current month's selected day for visual active state

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

  /* --- Navigation Sync --- */
  const handleDatesSet = (info) => {
    setHeaderTitle(info.view.title);
    // Parse the mid-point of the view to sync mini calendar
    const midDate = new Date((info.start.getTime() + info.end.getTime()) / 2);
    setMiniDate({ year: midDate.getFullYear(), month: midDate.getMonth() });
  };

  const goToday = () => {
    calRef.current?.getApi().today();
    setSelectedMiniDay(today.getDate());
  };
  const goPrev = () => calRef.current?.getApi().prev();
  const goNext = () => calRef.current?.getApi().next();
  const switchView = (v) => {
    setView(v);
    calRef.current?.getApi().changeView(v);
  };

  /* --- Mini Calendar Nav --- */
  const miniPrev = () => {
    setMiniDate(p => p.month === 0 ? { year: p.year - 1, month: 11 } : { ...p, month: p.month - 1 });
    calRef.current?.getApi().prev();
  };
  const miniNext = () => {
    setMiniDate(p => p.month === 11 ? { year: p.year + 1, month: 0 } : { ...p, month: p.month + 1 });
    calRef.current?.getApi().next();
  };

  const handleMiniDayClick = (dayStr, isCur) => {
    if (!isCur) return;
    setSelectedMiniDay(dayStr);
    calRef.current?.getApi().gotoDate(new Date(miniDate.year, miniDate.month, dayStr));
  };

  const miniDays = getMiniCalendarDays(miniDate.year, miniDate.month);

  /* --- Upcoming list --- */
  const upcoming = events
    .filter((e) => {
      const d = new Date(e.start || e.date);
      const diff = (d - today) / 86400000;
      return diff >= 0 && diff <= 30;
    })
    .sort((a, b) => new Date(a.start || a.date) - new Date(b.start || b.date))
    .slice(0, 5);

  /* --- Event Click --- */
  const handleEventClick = (info) => {
    const rect = info.el.getBoundingClientRect();
    // Position below the clicked event
    setModalPos({ top: rect.bottom + window.scrollY + 10, left: rect.left + window.scrollX });
    setSelectedEvent({
      title: info.event.title,
      color: info.event.backgroundColor,
      start: info.event.start?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
      end: info.event.end ? info.event.end.toLocaleDateString("en-IN", { day: "numeric", month: "long" }) : null,
    });
  };
  const closePopup = () => setSelectedEvent(null);

  /* --- Custom Event Render (Matches Image 2 & 3 styles) --- */
  const renderEventContent = (arg) => {
    return (
      <div className="saas-event-pill" style={{ background: arg.event.backgroundColor }}>
        <span className="saas-event-title">{arg.event.title}</span>
      </div>
    );
  };

  return (
    <div className="saas-layout" onClick={closePopup}>
      <SNavbar />

      <div className="saas-dashboard">

        {/* ================= LEFT PANEL ================= */}
        <aside className="saas-sidebar">

          {/* Calendar Widget */}
          <div className="saas-widget">
            <div className="saas-mini-header">
              <h3>{MONTH_NAMES[miniDate.month]} {miniDate.year}</h3>
              <div className="saas-mini-arrows">
                <button onClick={miniPrev}><ChevronLeft size={16} /></button>
                <button onClick={miniNext}><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="saas-mini-grid">
              {DAY_LABELS.map(l => <span key={l} className="saas-mini-daylabel">{l}</span>)}
              {miniDays.map((c, i) => {
                const isToday = c.cur && c.day === today.getDate() && miniDate.month === today.getMonth() && miniDate.year === today.getFullYear();
                const isSelected = c.cur && c.day === selectedMiniDay;

                let dayClass = "saas-mini-day";
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
          </div>

          {/* Upcoming Schedules (Like Image 2 Checklist) */}
          <div className="saas-widget">
            <div className="saas-widget-title">
              <h3>My Schedules</h3>
              <span className="badge">{upcoming.length}</span>
            </div>

            <div className="saas-schedule-list">
              {upcoming.length === 0 ? (
                <p className="saas-empty">No upcoming events.</p>
              ) : (
                upcoming.map((ev, i) => {
                  const d = new Date(ev.start || ev.date);
                  return (
                    <div className="saas-schedule-item" key={i}>
                      <CheckCircle2 size={18} color={ev.color || SAAS_COLORS[0]} className="saas-sched-icon" />
                      <div className="saas-sched-text">
                        <span className="saas-sched-name">{ev.title}</span>
                        <span className="saas-sched-date">
                          {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </aside>

        {/* ================= MAIN PANEL ================= */}
        <main className="saas-main">

          {/* Top Bar (matching Image 2) */}
          <div className="saas-topbar">
            <div className="saas-top-left">
              <h1 className="saas-month-title">{headerTitle}</h1>
              <button className="saas-btn-today" onClick={goToday}>
                <span className="saas-dot" /> Today
              </button>
              <div className="saas-nav-group">
                <button className="saas-arrow-btn" onClick={goPrev}><ChevronLeft size={20} /></button>
                <button className="saas-arrow-btn" onClick={goNext}><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="saas-top-right">
              <div className="saas-view-tabs">
                <button className={`saas-tab ${view === "dayGridMonth" ? "active" : ""}`} onClick={() => switchView("dayGridMonth")}>Month</button>
                <button className={`saas-tab ${view === "timeGridWeek" ? "active" : ""}`} onClick={() => switchView("timeGridWeek")}>Week</button>
              </div>
            </div>
          </div>

          {/* FullCalendar Card */}
          <div className="saas-calendar-card">
            <FullCalendar
              ref={calRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={false}
              height="100%"
              datesSet={handleDatesSet}
              eventClick={(info) => { info.jsEvent.stopPropagation(); handleEventClick(info); }}
              dayMaxEvents={3}
              moreLinkText={(n) => `+${n}`}
              eventContent={renderEventContent}
            />
          </div>

        </main>
      </div>

      {/* ================= EVENT MODAL POPUP ================= */}
      {selectedEvent && (
        <div
          className="saas-event-modal"
          style={{ top: modalPos.top, left: modalPos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="saas-modal-header" style={{ borderBottomColor: selectedEvent.color }}>
            <div className="saas-modal-icon-bg" style={{ background: `${selectedEvent.color}20`, color: selectedEvent.color }}>
              <CalendarIcon size={18} />
            </div>
            <h4>{selectedEvent.title}</h4>
          </div>
          <div className="saas-modal-body">
            <div className="saas-modal-row">
              <Clock size={14} className="saas-muted-icon" />
              <span>{selectedEvent.start} {selectedEvent.end ? ` - ${selectedEvent.end}` : ""}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SCalendar;
