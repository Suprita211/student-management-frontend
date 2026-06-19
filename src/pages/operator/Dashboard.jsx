import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

return ( <div className="container mt-5"> <h2>Operator Dashboard</h2>


  <div className="row mt-4">

    <div className="col-md-4">
      <div
        className="card p-4 shadow"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/operator/create-student")}
      >
        <h4>Create Student</h4>
        <p>Create new admission</p>
      </div>
    </div>

    <div className="col-md-4">
      <div
        className="card p-4 shadow"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/operator/search-student")}
      >
        <h4>Search Student</h4>
        <p>Find student by Student ID</p>
      </div>
    </div>
    <div className="col-md-4">
  <div
    className="card p-3"
    style={{ cursor: "pointer" }}
    onClick={() =>
      navigate("/operator/upload-document")
    }
  >
    <h4>Upload Document</h4>
  </div>
</div>

  </div>
</div>


);
}

export default Dashboard;
