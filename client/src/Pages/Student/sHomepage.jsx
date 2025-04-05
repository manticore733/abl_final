// import React, { useEffect, useState } from "react";
// import SNavbar from "../../Components/StudentC/SNavbar";
// import "./css/sHomepage.css";
// import event1img from "../../assets/event1.jpeg";
// import event2img from "../../assets/event2.jpeg";
// import event3img from "../../assets/event3.png";

// const sHomepage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getEvents = async () => {
//       try {
//         const eventData = await fetchEvents2();
//         console.log("Fetched events:", eventData);
//         setEvents(eventData);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getEvents();
//   }, []);

//   // Dummy static cards array for demonstration (20 items)
//   const dummyCards = Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     title: `Sample Event ${index + 1}`,
//     text: `This is sample text for event ${index + 1}.`,
//     date: "2025-12-31",
//     organizer: "Sample Organizer",
//     url: "#",
//     // You can set a placeholder image or use one of your imports
//     image: event1img,
//   }));

//   return (
//     <div>
//       <SNavbar />
//       <div id="carouselExampleFade" className="news carousel slide carousel-fade">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img src={event1img} className="d-block w-100" alt="Event 1" />
//           </div>
//           <div className="carousel-item">
//             <img src={event2img} className="d-block w-100" alt="Event 2" />
//           </div>
//           <div className="carousel-item">
//             <img src={event3img} className="d-block w-100" alt="Event 3" />
//           </div>
//         </div>
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleFade"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleFade"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//       <div className="event-info-cards-section container my-4">
//         <h2 className="text-center mb-4">Latest Events</h2>
//         <div className="row">
//           {dummyCards.map((card) => (
//             <div className="col-md-3 mb-4" key={card.id}>
//               <div className="card">
//                 <img
//                   src={card.image}
//                   className="card-img-top"
//                   alt={card.title}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{card.title}</h5>
//                   <p className="card-text">{card.text}</p>
//                   <p className="card-text">
//                     <small className="text-muted">Date: {card.date}</small>
//                   </p>
//                   <p className="card-text">
//                     <small className="text-muted">
//                       Organizer: {card.organizer}
//                     </small>
//                   </p>
//                   <a href={card.url} className="btn btn-primary">
//                     More Info
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default sHomepage;












import React, { useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/sHomepage.css";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Divider,
  TextField,
  Paper,
  Avatar,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
import event1img from "../../assets/event1.jpeg";
import event2img from "../../assets/event2.jpeg";
import event3img from "../../assets/event3.png";
import event4img from "../../assets/event4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card as JoyCard, CardOverflow } from "@mui/joy";

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

const feedbacks = [
  { name: "John Doe", review: "Amazing event! Had a great experience.", image: event1img },
  { name: "Jane Smith", review: "Well organized and very informative.", image: event2img },
  { name: "David Lee", review: "Loved the energy and vibe of the fest.", image: event3img },
];

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  background: "#f0f4ff",
}));

const testimonials = [
  { name: "John Doe", review: "Amazing event! Had a great experience.", image: event1img },
  { name: "Jane Smith", review: "Well organized and very informative.", image: event2img },
  { name: "David Lee", review: "Loved the energy and vibe of the fest.", image: event3img },
  { name: "Maria Smantha", review: "Great crowd and great speakers.", image: event4img },
  { name: "Lisa Cudrow", review: "Will definitely join next year!", image: event1img },
  { name: "John Smith", review: "Perfectly executed and fun!", image: event2img },
];




const SectionContainer = styled(Paper)(({ theme }) => ({
  
  padding: theme.spacing(4),
  marginBottom: theme.spacing(5),
  backgroundColor: "#f9f9f9",
  borderRadius: 10,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const sHomepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <>
      <SNavbar />
      <Box mt={8}>

        {/* Carousel Section */}
        <Container maxWidth={false} sx={{ mt: 12, mb: 5,width: "90%" }}>
          <SectionContainer>
            <Slider {...sliderSettings}>
              {images.map((img, i) => (
                <Box key={i} sx={{ height: 400, overflow: "hidden" }}>
                  <img
                    src={img}
                    alt={`Slide ${i}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                  />
                </Box>
              ))}
            </Slider>
          </SectionContainer>
        </Container>

        {/* About & Announcements Section */}
        <Container maxWidth={false} sx={{width: "90%"}}>
          <SectionContainer>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" mb={2}>
                  🎓 Welcome to FCRIT Student Portal
                </Typography>
                <Typography variant="body1">
                  This portal is designed to keep you updated with the latest events, announcements,
                  and your academic progress. Stay engaged, explore events, and earn credits!
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
  <Paper elevation={1} sx={{ p: 2, background: "#fff", borderRadius: 2, height: "100%" }}>
    <Typography variant="h6" mb={2}>
      📢 Announcements
    </Typography>
    <Box
      sx={{
        height: 160,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          animation: "scrollUp 8s linear infinite",
          pl: 2, // 👈 padding-left to move text slightly right
        }}
      >
        <Typography variant="body2">✨ Registration Open for Tech Fest 2025</Typography>
        <Divider />
        <Typography variant="body2">🚀 New Event: Hackathon 2025 Added</Typography>
        <Divider />
        <Typography variant="body2">📅 Certificates of Past Events are now available</Typography>
      </Box>
    </Box>
  </Paper>
</Grid>







            </Grid>
          </SectionContainer>
        </Container>

        {/* Events Section */}
        <Container maxWidth={false} sx={{width: "90%"}}>
          <SectionContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5">Events</Typography>
              <TextField
                label="Search Events"
                variant="outlined"
                size="small"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>

            {["Ongoing", "Upcoming", "Completed"].map((status) => (
              <Box key={status} mb={4}>
                <Typography variant="h6" mb={2}>
                  {status} Events
                </Typography>
                <Grid container spacing={3}>
                  {filteredEvents
                    .filter((event) => event.status === status)
                    .slice(0, 4)
                    .map((event) => (
                      <Grid item xs={12} sm={6} md={3} key={event.id}>
                        <Card elevation={4} sx={{ borderRadius: 3 }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={event.image}
                            alt={event.title}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="subtitle1" fontWeight="bold">
                              {event.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.text}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              📅 {event.date}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ justifyContent: "center", pb: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              href={event.url}
                              sx={{ borderRadius: 10 }}
                            >
                              {status === "Completed" ? "View" : "Register"}
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))}
          </SectionContainer>
        </Container>

        {/* Feedback Section */}

        <Container maxWidth={false} sx={{ width: "90%" }}>
  <SectionContainer>
    <Typography variant="h5" textAlign="center" mb={3}>
      🌟 Testimonials
    </Typography>

    <Grid container spacing={3}>
      {paginatedTestimonials.map((fb, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card sx={{ borderRadius: 1 }}>
              <Box sx={{ height: 100, backgroundColor: "#7a81a8" }} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: -6 }}>
                <Avatar
                  src={fb.image}
                  alt={fb.name}
                  sx={{ width: 80, height: 80, border: "3px solid white" }}
                />
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {fb.name}
                </Typography>
                <Divider sx={{ my: 1, width: "60%", mx: "auto" }} />
                <Typography variant="body2" color="text.secondary" mt={2}>
                  “{fb.review}”
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>

    {/* Pagination */}
    {totalPages > 1 && (
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    )}
  </SectionContainer>
</Container>

      

        {/* Quick Stats Section */}
        <Container maxWidth={false} sx={{width: "90%"}}>
          <SectionContainer>
            <Typography variant="h5" mb={3}>
              📊 Quick Stats
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <StatCard>
                  <Typography variant="h4">12</Typography>
                  <Typography variant="body1">Credits Earned</Typography>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard>
                  <Typography variant="h4">5</Typography>
                  <Typography variant="body1">Events Registered</Typography>
                </StatCard>
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard>
                  <Typography variant="h4">3</Typography>
                  <Typography variant="body1">Certificates Generated</Typography>
                </StatCard>
              </Grid>
            </Grid>
          </SectionContainer>
        </Container>

        {/* Footer */}
        <Box textAlign="center" py={2} bgcolor="#f5f5f5">
          <Typography variant="body2">
            © 2025 FCRIT ABL Portal | Contact: info@fcrit.ac.in
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default sHomepage;
