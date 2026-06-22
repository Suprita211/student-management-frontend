import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function SearchStudent() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  // FIX: normalize role properly
  const role = (localStorage.getItem("role") || "").toUpperCase();

  const isAdmin = role === "ROLE_ADMIN";

  // ---------------- SEARCH STUDENT ----------------
  const searchStudent = async () => {
    try {
      const response = await axiosInstance.get(
        `/students/search?studentId=${studentId}`
      );

      setStudent(response.data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Unauthorized - Token Invalid or Expired");
      } else if (error.response?.status === 404) {
        alert("Student Not Found");
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  // ---------------- DOWNLOAD STUDENT PDF ----------------
  const downloadStudentPdf = async () => {
    try {
      const response = await axiosInstance.get(
        `/students/${student.studentId}/pdf`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        `${student.studentId}_Student_Profile.pdf`
      );

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("PDF Download Failed");
    }
  };

  // ---------------- VIEW DOCUMENT ----------------
const viewDocument = async (documentId) => {
  try {
    const response = await axiosInstance.get(
      `/students/documents/${documentId}/view`,
      {
        responseType: "blob"
      }
    );

    const blob = response.data;

    const blobUrl = window.URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");

  } catch (error) {
    console.error(error);
    alert("Unable to view document");
  }
};

  // ---------------- DOWNLOAD DOCUMENT ----------------
  const downloadDocument = async (documentId) => {
    try {
      const response = await axiosInstance.get(
        `/students/documents/${documentId}/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
    const contentType = response.headers["content-type"];

let extension = "";

if (contentType.includes("image/png")) {
  extension = ".png";
} else if (contentType.includes("image/jpeg")) {
  extension = ".jpg";
} else {
  extension = ".pdf";
}

link.setAttribute(
  "download",
  `Document_${documentId}${extension}`
);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
      alert("Download Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Search Student</h2>

      {/* SEARCH INPUT */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary" onClick={searchStudent}>
            Search
          </button>
        </div>
      </div>

      {/* STUDENT CARD */}
      {student && (
        <div className="card shadow p-4">
          <h3>{student.fullName}</h3>

          <hr />

          {/* PERSONAL INFO */}
          <h5>Personal Information</h5>
          <p><b>Student ID:</b> {student.studentId}</p>
          <p><b>Aadhaar:</b> {student.aadhaarNo}</p>
          <p><b>Father Name:</b> {student.fatherName}</p>
          <p><b>Mother Name:</b> {student.motherName}</p>
          <p><b>Contact:</b> {student.primaryContact}</p>
          <p><b>Email:</b> {student.email}</p>

          <hr />

          {/* COURSE INFO */}
          <h5>Course Information</h5>
          <p><b>Course:</b> {student.courseName}</p>
          <p><b>Type:</b> {student.courseType}</p>
          <p><b>Registration No:</b> {student.universityRegistrationNo}</p>

          <hr />

          {/* DOCUMENTS */}
          <h5>Documents</h5>

          {student.documents?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {student.documents.map((doc) => (
                  <tr key={doc.documentId}>
                    <td>{doc.documentType}</td>
                    <td>{doc.documentName}</td>

                    {/* ADMIN ACTIONS ONLY */}
                    {isAdmin && (
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => viewDocument(doc.documentId)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => downloadDocument(doc.documentId)}
                        >
                          Download
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Documents Uploaded</p>
          )}

          {/* ADMIN ONLY ACTIONS */}
          {isAdmin && (
            <>
              <hr />

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={downloadStudentPdf}
                >
                  Download Student PDF
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    navigate(`/admin/edit-student/${student.studentId}`)
                  }
                >
                  Edit Student
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchStudent;