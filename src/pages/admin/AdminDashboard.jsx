import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import office_logo from "../../assets/Images/NIMTT_logo.jpeg";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <div className="admin-dashboard-container">

      <div className="admin-dashboard-top">
        <img src={office_logo} id="admin-office-logo" />
        <h1>NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING</h1>
        </div>

      <div className="admin-dashboard-content">

        <div className="admin-welcome">
          <p>Welcome To</p>
          </div>

          <div className="portal-name">
            <p>STUDENT MANAGEMENT PORTAL</p>
            </div>

<div className="dashboard-subheading">
<p>
  Efficiently manage student records, monitor academic details,
  organize documents, update information, and generate student
  profile reports from a single dashboard.
</p>
</div>



            <button
              className="btn btn-primary"
              id="admin-db-btn"
              onClick={() =>
  navigate("/admin/search-student")
}
            >
              Student Search
            </button>

          </div>

        </div>

     

  );

}

export default AdminDashboard;