
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./SearchStudent.css";
import office_logo from "../../assets/Images/NIMTT_logo.jpeg";
import studentIcon from "../../assets/Images/person_icon.png";

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
    <div className="Search-page-container">
      <div className="search-top-style">
        <h2>SEARCH STUDENT</h2>
      </div>
      

      {/* SEARCH INPUT */}
      <div className="search-input-container">
        <div className="student-id-input data-field">
          <label className="data-label">
            Enter Student ID :
          </label>
          <input
            className="form-control student-input"
            placeholder="Student ID"
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
        <div className="student-card">
          <div className="student-card-header">
            <img src={office_logo} id="student-details-nimtt-logo" />
            <p>NATIONAL INSTITUTE OF MANAGEMENT AND TECHNICAL TRAINING</p>
            </div>
            <div className="student-details">
                <div className="student-name-container">
                  <img src={studentIcon} alt="" />
                   <h3>{student.fullName}</h3>
                  </div> 

          <hr />       

          <div className="info-section">
    <h4 className="section-title">Personal Information</h4>

    <div className="info-grid">
        <div><strong>Student ID :</strong> {student.studentId}</div>
        <div><strong>Aadhaar No :</strong> {student.aadhaarNo}</div>
        {/* <div><strong>Full Name :</strong> {student.fullName}</div> */}
        <div><strong>Father Name :</strong> {student.fatherName}</div>
        <div><strong>Mother Name :</strong> {student.motherName}</div>
        <div><strong>Contact :</strong> {student.primaryContact}</div>
        <div><strong>Email :</strong> {student.email}</div>
        <div><strong>Date of Birth :</strong> {student.dateOfBirth}</div>
    </div>
</div>

<div className="info-section">
    <h4 className="section-title">Course Information</h4>

    <div className="info-grid">
        <div><strong>Course :</strong> {student.courseName}</div>
        <div><strong>Course Type :</strong> {student.courseType}</div>
        <div><strong>University :</strong> {student.universityName}</div>
        <div><strong>Registration No :</strong> {student.universityRegistrationNo}</div>
        <div><strong>Admission Date :</strong> {student.dateOfAdmission}</div>
        <div><strong>Session :</strong> {student.session}</div>
        <div><strong>Duration :</strong> {student.duration}</div>
        <div><strong>Counsellor :</strong> {student.counsellorName}</div>
    </div>
</div>

          {/* DOCUMENTS */}
            <h4 className="section-title">Document Details</h4>

          {student.documents?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                 <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {student.documents.map((doc) => (
                  <tr key={doc.documentId}>
                    <td>{doc.documentType}</td>
                    <td>{doc.documentName}</td>

                    {/* ADMIN ACTIONS ONLY */}
                   <td>
  {/* Everyone can View */}
  <button
    className="view-btn"
    onClick={() => viewDocument(doc.documentId)}
  >
    View
  </button>

  {/* Only Admin can Download */}
  {isAdmin && (
    <button
      className="btn btn-success btn-sm"
      id="download-btn"

      onClick={() => downloadDocument(doc.documentId)}
    >
      Download
    </button>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Documents Uploaded</p>
          )}

            </div>
        
          {/* ADMIN ONLY ACTIONS */}
          {isAdmin && (
            <>
              <hr />

              <div className="admin-action-buttons">
                <button
                  className="btn btn-success"
                  id="download-pdf-btn"
                  onClick={downloadStudentPdf}
                >
                  Download PDF
                </button>

                <button
                  className="btn btn-warning"
                  id="edit-btn"
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

