// import React from 'react';
// import './HomePage.css';
// import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";

// function HomePage() {
//   return (
//     <div className='Container'>
//         <div className='heading'>
//             <img id='office-logo' src={NimttLogo} alt="" />
//             <p className='home-heading'>NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING</p>
//         </div>
//         <div className='sub-heading'>
//             <p id='home-subheading' >Welcome To NIMTT Student Suport Portal</p>
//             <p>Empowering students with seamless support services. Choose an option below to get started.</p>
//         </div>
//         <div className='btn-group'>
//           <button>Admin</button>
//           <button>Data Oparator</button>
//         </div>
//     </div>
//   )
// }

// export default HomePage

import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";
import BackgroundImage from "../../assets/Images/home_page_img_2.jpg";
// import HomePageImg from "../../assets/Images/HomePage_img1.png";


function HomePage() {

  const navigate = useNavigate();
  return (
    <div className="home-container"
  style={{
    backgroundImage: `url(${BackgroundImage})`,
    // backgroundSize: "cover",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
        {/* Logo Section */}
        <div className="header-section">
          <img id='office-logo' src={NimttLogo} alt="NIMTT Logo" />
          <h1 className="home-heading">
            NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING
          </h1>
        </div>

        {/* Text Content */}
         <div className="content-section">
       
        <div className='home-body'>
          <div className='left-side-content'>
          <h1 className='welcome-title'>Welcome To </h1>
          <h3 className='portal-name'>NIMTT STUDENT SUPPORT PORTAL</h3>
          <div className='underline'></div>
          <p className="home-description">
            Empowering students with seamless support services. <br /> 
            Choose an option below to get started.
          </p>
          </div>

          <div className='right-side-content'>
            {/* <img id='homepage-img' src={HomePageImg} alt="" /> */}
            <div className='image-glow-wrapper'>
           {/* <img id='homepage-img' src={HomePageImg} alt="Home Page Illustration" /> */}
          </div>
          </div>

        </div>

        {/* Buttons Section */}
        <div className="btn-group">
           <button type="submit" className="btn-pink" id="submit-btn">
                  <span className="btn-icon">🔑</span> Admin<i className="submit-icons fa-solid fa-paper-plane"></i>
            </button>
           
            {/* <button type="submit" className="btn-pink" id="submit-btn">
                 <span className="btn-icon">📊</span> Data Operator<i className="submit-icons fa-solid fa-paper-plane"></i>
            </button> */}
            <button
  type="button"
  className="btn-pink"
  onClick={() => navigate("/login")}
>
  <span className="btn-icon">📊</span> Data Operator
</button>
          
        </div>
        </div>
      
      </div>
  );
}

export default HomePage;