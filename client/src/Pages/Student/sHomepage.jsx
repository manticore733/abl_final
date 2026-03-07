import React, { useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/sHomepage.css";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";

import {
  Box,
  Typography,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import { ChevronRight, Calendar, Star, BellRing } from "lucide-react";
import Slider from "react-slick";
import event1img from "../../assets/event1.jpeg";
import event2img from "../../assets/event2.jpeg";
import event3img from "../../assets/event3.png";
import event4img from "../../assets/event4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const images = [event1img, event2img, event3img, event4img];
const dummyCards = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Sample Event ${index + 1}`,
  text: `This is sample text for event ${index + 1}.`,
  date: "2025-12-31",
  status:
    index % 3 === 0
      ? "Completed"
      : index % 2 === 0
        ? "Ongoing"
        : "Upcoming",
  organizer: "Sample Organizer",
  url: "#",
  image: images[index % images.length],
}));

const testimonials = [
  { name: "John Doe", review: "Amazing event! Had a great experience.", image: event1img },
  { name: "Jane Smith", review: "Well organized and very informative.", image: event2img },
  { name: "David Lee", review: "Loved the energy and vibe of the fest.", image: event3img },
  { name: "Maria Smantha", review: "Great crowd and great speakers.", image: event4img },
  { name: "Lisa Cudrow", review: "Will definitely join next year!", image: event1img },
  { name: "John Smith", review: "Perfectly executed and fun!", image: event2img },
];


const sHomepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedTestimonials = testimonials.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const filteredEvents = dummyCards.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
  };

  return (
    <div className="student-page-wrapper">
      <SNavbar />

      {/* 1. THE HERO SECTION (Deep Academic Blue) */}
      <div className="student-hero">
        <div className="student-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to FCRIT Portal
          </motion.h1>
          <div className="student-hero-instruction">
            Your central hub for campus life and academic progress
          </div>
        </div>

        {/* Decorative background shapes mimicking SelectRole */}
        <div className="student-hero-shape student-shape-1"></div>
        <div className="student-hero-shape student-shape-2"></div>
      </div>

      {/* Main Content Area */}
      <div className="student-main-container">

        {/* Overlapping Quick Stats Section */}
        <div className="stats-overlap-container">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="stat-value primary-text">12</div>
                <div className="stat-label">Credits Earned</div>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="stat-value secondary-text">5</div>
                <div className="stat-label">Events Registered</div>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <motion.div
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="stat-value success-text">3</div>
                <div className="stat-label">Certificates Generated</div>
              </motion.div>
            </Grid>
          </Grid>
        </div>

        {/* Announcements & Featured Carousel Row */}
        <Box sx={{ mt: 6, mb: 10 }}>
          <Grid container spacing={4} >
            {/* Announcements Panel */}
            <Grid item xs={12} md={4}>
              <div className="announcements-panel">
                <div className="announcements-header">
                  <BellRing size={20} className="bell-icon" />
                  <h3>Latest Announcements</h3> {/* Changed to match your reference */}
                </div>

                <div className="announcements-list-wrapper">
                  {/* This track animates upwards continuously */}
                  <div className="announcements-track">

                    {/* SET 1 */}
                    <div className="announcement-item"><p>Fee Structure F.Y. M.Tech. 2025-26</p></div>
                    <div className="announcement-item"><p>Incentive to faculty members</p></div>
                    <div className="announcement-item"><p>ACAP and ILS Admission Schedule</p></div>
                    <div className="announcement-item"><p>PhD Advertisement</p></div>
                    <div className="announcement-item"><p>PHD Application Form_2025-26</p></div>
                    <div className="announcement-item"><p>Holiday List 2026</p></div>

                    {/* SET 2: Exact Duplicate for seamless infinite loop */}
                    <div className="announcement-item"><p>Fee Structure F.Y. M.Tech. 2025-26</p></div>
                    <div className="announcement-item"><p>Incentive to faculty members</p></div>
                    <div className="announcement-item"><p>ACAP and ILS Admission Schedule</p></div>
                    <div className="announcement-item"><p>PhD Advertisement</p></div>
                    <div className="announcement-item"><p>PHD Application Form_2025-26</p></div>
                    <div className="announcement-item"><p>Holiday List 2026</p></div>

                  </div>
                </div>
              </div>
            </Grid>

            {/* Featured Event Slider */}
            <Grid item xs={12} md={8}>
              <div className="slider-container-card">
                <Slider {...carouselSettings} className="featured-slider">
                  {images.map((img, i) => (
                    <div key={i} className="slide-image-wrapper">
                      <img
                        src={img}
                        alt={`Slide ${i}`}
                        className="slide-image"
                      />
                      <div className="slide-overlay">
                        <h3>Featured Event {i + 1}</h3>
                        <p>Join us for an amazing experience on campus.</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </Grid>
          </Grid>
        </Box>

        {/* Events Section */}
        <Box sx={{ mb: 10 }}>
          <div className="section-header-flex">
            <h2>Discover Events</h2>
            <TextField
              placeholder="Search events..."
              variant="outlined"
              size="small"
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "300px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  '& fieldset': {
                    borderColor: '#e2e8f0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#cbd5e1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1e3a8a',
                  },
                },
              }}
            />
          </div>

          {["Ongoing", "Upcoming", "Completed"].map((status) => {
            const statusEvents = filteredEvents.filter((event) => event.status === status).slice(0, 4);
            if (statusEvents.length === 0) return null;

            return (
              <Box key={status} mb={6}>
                <Typography variant="h6" sx={{ color: '#475569', fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span className={`status-dot dot-${status.toLowerCase()}`}></span>
                  {status} Events
                </Typography>

                <Grid container spacing={4}>
                  {statusEvents.map((event, index) => (
                    <Grid item xs={12} sm={6} md={3} key={event.id}>
                      <Link to={event.url} className="event-card-link">
                        <motion.div
                          className="event-pro-card"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="event-image-box">
                            <img src={event.image} alt={event.title} />
                            <div className={`event-status-chip chip-${status.toLowerCase()}`}>
                              {status}
                            </div>
                          </div>
                          <div className="event-card-content">
                            <h3>{event.title}</h3>
                            <p className="event-desc">{event.text}</p>

                            <div className="event-date">
                              <Calendar size={14} />
                              <span>{event.date}</span>
                            </div>
                          </div>

                          <div className="event-hover-action">
                            <span>{status === "Completed" ? "View Details" : "Register Now"}</span>
                            <ChevronRight size={16} />
                          </div>
                        </motion.div>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ mb: 10 }}>
          <div className="section-header-center">
            <h2>Student Experiences</h2>
            <p>Hear what others have to say about our events and activities.</p>
          </div>

          <Grid container spacing={4}>
            {paginatedTestimonials.map((fb, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <Avatar
                    src={fb.image}
                    alt={fb.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-content">
                    <div className="stars">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    </div>
                    <p>"{fb.review}"</p>
                    <h4>{fb.name}</h4>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={6}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: 'Inter',
                    fontWeight: 500
                  },
                  "& .Mui-selected": {
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1e293b',
                    }
                  }
                }}
              />
            </Box>
          )}
        </Box>

      </div>

      {/* Footer */}
      <footer className="student-footer">
        <p>© {new Date().getFullYear()} FCRIT ABL Portal</p>
        <p className="footer-sub">Contact: info@fcrit.ac.in | Designed for Students</p>
      </footer>
    </div>
  );
};

export default sHomepage;
