
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import NimttLogo from "../../assets/Images/NIMTT_logo.jpeg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img id="dashboard-office-logo" src={NimttLogo} alt="NIMTT Logo" />
        <div>NIMTT</div>
      </div>
      <div className="sidebar-btn">
       <h2>Student Portal</h2>

      <NavLink to="/dashboard/add-student">
        Add Student
      </NavLink>

      <NavLink to="/dashboard/search-student">
        Search Student
      </NavLink>

      <NavLink to="/dashboard/upload-document">
        Upload Document
      </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;