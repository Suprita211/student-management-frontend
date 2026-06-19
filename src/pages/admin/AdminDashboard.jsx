import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <div className="container mt-4">

      <h2>Admin Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h4>Student Management</h4>

            <p>
              Search, View, Edit Students,
              Download PDFs and Manage Documents
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
  navigate("/admin/search-student")
}
            >
              Open Student Search
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;