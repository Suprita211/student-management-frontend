import "./Operator_dashboard_UI.css";
import Sidebar from "../auth/sidebar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import operatorImg from "../../assets/Images/user.png"
import { useNavigate } from "react-router-dom";


function Dashboard() {
   const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-navbar">
          <div className="operator-navbar">
             <img id="operatorIcon" src={operatorImg} alt="" />
        <span>Welcome Back! Data Opeartor</span>
          </div>
        <div className="logout-btn">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
</div>
<div className="dashboard-body-content">
  <div className="welcome-tag">Welcome To</div>
  <h1>NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING</h1>
  <p>
    Use the navigation menu to add new students, search existing student records, 
    and upload important documents. This portal is designed to simplify academic administration 
    and ensure secure, organized management of student information.</p>
</div>
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;