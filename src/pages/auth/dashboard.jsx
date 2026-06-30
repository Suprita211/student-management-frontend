import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;