// import React from 'react'
// import MNavbar from '../../Components/MentorC/MNavbar'
// import './css/mHomepage.css'
// const mHomepage = () => {
//   return (
//     <div>
//       <MNavbar />
//       <div className='mentor-homepage'>
//         <h1>You are logged in as Mentor</h1>

//       </div>

//     </div>
//   )
// }

// export default mHomepage





import React, { useEffect } from 'react';
import axios from 'axios';
import MNavbar from '../../Components/MentorC/MNavbar';
import './css/mHomepage.css';

const mHomepage = () => {

  useEffect(() => {
    const fetchAndStoreMentorInfo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mentor/mentorcreds', {
          withCredentials: true, // Important if you're using cookies for sessions
        });

        const { mentorId, m_branch, m_batch, m_csec, m_sem } = res.data;

        sessionStorage.setItem("mentorId", mentorId);
        sessionStorage.setItem("m_branch", m_branch);
        sessionStorage.setItem("m_batch", m_batch);
        sessionStorage.setItem("m_csec", m_csec);
        sessionStorage.setItem("m_sem", m_sem);

        console.log("✅ Mentor info stored in sessionStorage!");
      } catch (error) {
        console.error("⛔ Failed to fetch mentor credentials:", error);
      }
    };

    fetchAndStoreMentorInfo();
  }, []);

  return (
    <div>
      <MNavbar />
      <div className='mentor-homepage'>
        <h1>You are logged in as Mentor</h1>
      </div>
    </div>
  );
};

export default mHomepage;
