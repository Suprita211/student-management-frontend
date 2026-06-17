import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function SearchStudent() {

  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);

  const searchStudent = async () => {

    try {

      const response = await axiosInstance.get(
        `/students/search?studentId=${studentId}`
      );

      setStudent(response.data);

    } catch (error) {

      console.log(error);
      alert("Student Not Found");

    }

  };

  return (
    <div className="container mt-4">

      <h2>Search Student</h2>

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
          <button
            className="btn btn-primary"
            onClick={searchStudent}
          >
            Search
          </button>
        </div>

      </div>

      {student && (

        <div className="card shadow p-4">

          <h3 className="mb-3">
            {student.fullName}
          </h3>

          <hr />

          <h5>Personal Information</h5>

          <p><strong>Student ID:</strong> {student.studentId}</p>
          <p><strong>Aadhaar:</strong> {student.aadhaarNo}</p>
          <p><strong>Father Name:</strong> {student.fatherName}</p>
          <p><strong>Mother Name:</strong> {student.motherName}</p>
          <p><strong>Primary Contact:</strong> {student.primaryContact}</p>
          <p><strong>Secondary Contact:</strong> {student.secondaryContact}</p>
          <p><strong>Email:</strong> {student.email}</p>

          <p>
            <strong>Present Address:</strong>
            {" "}
            {student.presentAddress}
          </p>

          <p>
            <strong>Permanent Address:</strong>
            {" "}
            {student.permanentAddress}
          </p>

          <hr />

          <h5>Course Information</h5>

          <p><strong>Course Name:</strong> {student.courseName}</p>
          <p><strong>Course Type:</strong> {student.courseType}</p>
          <p><strong>Session:</strong> {student.session}</p>
          <p><strong>Duration:</strong> {student.duration}</p>

          <hr />

          <h5>Documents</h5>

          {student.documents?.length > 0 ? (

            <ul className="list-group">

              {student.documents.map((doc) => (

                <li
                  key={doc.documentId}
                  className="list-group-item"
                >
                  <strong>{doc.documentType}</strong>
                  {" - "}
                  {doc.documentName}
                </li>

              ))}

            </ul>

          ) : (

            <p>No Documents Uploaded</p>

          )}

        </div>

      )}

    </div>
  );
}

export default SearchStudent;