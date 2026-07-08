
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top-content">
        <div className="sidebar-top">
        <img id="dashboard-office-logo" src={NimttLogo} alt="NIMTT Logo" />
        <div id="top-title">NIMTT</div>
      </div>
         <h2>Student Portal</h2>
      </div>
      
      <div className="sidebar-btn">
       
       <div className="underline"></div>

       <div className="dashboard-btn-gr">
      <NavLink className="sidebar-link" to="/operator/create-student">
        Add Student
      </NavLink>

       <NavLink className="sidebar-link" to="/operator/upload-document">
        Upload Document
      </NavLink>
      
      <NavLink className="sidebar-link" to="/operator/search-student">
        Search Student
      </NavLink>

     
       </div>

      
      </div>
    </div>
  );
}

export default Sidebar;