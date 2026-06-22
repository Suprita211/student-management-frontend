import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";


function AdminEditStudent() {

  const { studentId } = useParams();
  
const fileInputRef = useRef(null);
  const navigate = useNavigate();
const [selectedDocumentId, setSelectedDocumentId] = useState(null);
const [studentChanged, setStudentChanged] = useState(false);

const [documentName, setDocumentName] = useState("");

const [documentType, setDocumentType] = useState("");
const [documentUpdated, setDocumentUpdated] = useState(false);
const [newFile, setNewFile] = useState(null);
  const [student, setStudent] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    primaryContact: "",
    secondaryContact: "",
    email: "",
    presentAddress: "",
    permanentAddress: "",
    courseName: "",
    courseType: "",
    universityRegistrationNo: "",
    dateOfAdmission: "",
    counsellorName: "",
    session: "",
    duration: ""
  });

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent = async () => {

    try {

      const response = await axiosInstance.get(
        `/students/${studentId}`
      );

      setStudent(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed To Load Student");

    }

  };

 const handleChange = (e) => {

  setStudent({
    ...student,
    [e.target.name]: e.target.value
  });

  setStudentChanged(true);

};

  const handleSubmit = async (e) => {

  e.preventDefault();



  try {

      const payload = {

        fullName: student.fullName,
        fatherName: student.fatherName,
        motherName: student.motherName,
        dateOfBirth: student.dateOfBirth,
        primaryContact: student.primaryContact,
        secondaryContact: student.secondaryContact,
        email: student.email,
        presentAddress: student.presentAddress,
        permanentAddress: student.permanentAddress,
        courseName: student.courseName,
        courseType: student.courseType,
        universityRegistrationNo:
          student.universityRegistrationNo,
        dateOfAdmission:
          student.dateOfAdmission,
        counsellorName:
          student.counsellorName,
        session:
          student.session,
        duration:
          student.duration
      };

      await axiosInstance.put(
        `/students/${studentId}`,
        payload
      );

      alert("Student Updated Successfully");

      navigate("/operator/search-student");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };
const viewDocument = async (documentId) => {

  try {

    const response = await axiosInstance.get(
      `/students/documents/${documentId}/view`,
      {
        responseType: "blob"
      }
    );

    const file = new Blob(
      [response.data],
      {
        type: "application/pdf"
      }
    );

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank");

  } catch (error) {

    console.log(error);

    alert("Unable to view document");

  }

};

const downloadDocument = async (documentId) => {

  try {

    const response = await axiosInstance.get(
      `/students/documents/${documentId}/download`,
      {
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = `Document_${documentId}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

  } catch (error) {

    console.log(error);

    alert("Download Failed");

  }

};

const handleDocumentEdit = (doc) => {

  setSelectedDocumentId(doc.documentId);

  setDocumentName(doc.documentName);

  setDocumentType(doc.documentType);

};

const updateDocument = async () => {

  try {

    if (!newFile) {

      alert("Please select a file");

      return;

    }

    const fileType = newFile.type;

    // PHOTO VALIDATION
    if (documentType === "PHOTO") {

      if (
        fileType !== "image/png" &&
        fileType !== "image/jpeg"
      ) {

        alert(
          "PHOTO document must be PNG or JPEG file only"
        );

        setNewFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }
    }

    // UNIVERSITY / NIMTT VALIDATION
    if (
      documentType === "UNIVERSITY" ||
      documentType === "NIMTT"
    ) {

      if (
        fileType !== "application/pdf"
      ) {

        alert(
          `${documentType} document must be PDF file only`
        );

        setNewFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }
    }

    const formData = new FormData();

    formData.append("file", newFile);

    formData.append(
      "documentName",
      documentName
    );

    formData.append(
      "documentType",
      documentType
    );

    await axiosInstance.put(
      `/students/documents/${selectedDocumentId}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    setDocumentUpdated(true);

    setSelectedDocumentId(null);

    setNewFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    fetchStudent();

    alert(
      "Document Updated Successfully"
    );

  } catch (error) {

    console.log(error);

    alert("Document Update Failed");

  }

};
  return (

    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2>Edit Student</h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6">

              <input
                className="form-control mb-2"
                name="fullName"
                value={student.fullName || ""}
                placeholder="Full Name"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="fatherName"
                value={student.fatherName || ""}
                placeholder="Father Name"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="motherName"
                value={student.motherName || ""}
                placeholder="Mother Name"
                onChange={handleChange}
              />

              <input
                type="date"
                className="form-control mb-2"
                name="dateOfBirth"
                value={student.dateOfBirth || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="primaryContact"
                value={student.primaryContact || ""}
                placeholder="Primary Contact"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="secondaryContact"
                value={student.secondaryContact || ""}
                placeholder="Secondary Contact"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="email"
                value={student.email || ""}
                placeholder="Email"
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6">

              <textarea
                className="form-control mb-2"
                name="presentAddress"
                value={student.presentAddress || ""}
                placeholder="Present Address"
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-2"
                name="permanentAddress"
                value={student.permanentAddress || ""}
                placeholder="Permanent Address"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="courseName"
                value={student.courseName || ""}
                placeholder="Course Name"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="courseType"
                value={student.courseType || ""}
                placeholder="Course Type"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="universityRegistrationNo"
                value={
                  student.universityRegistrationNo || ""
                }
                placeholder="University Registration No"
                onChange={handleChange}
              />

              <input
                type="date"
                className="form-control mb-2"
                name="dateOfAdmission"
                value={student.dateOfAdmission || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="counsellorName"
                value={student.counsellorName || ""}
                placeholder="Counsellor Name"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="session"
                value={student.session || ""}
                placeholder="Session"
                onChange={handleChange}
              />

              <input
                className="form-control mb-2"
                name="duration"
                value={student.duration || ""}
                placeholder="Duration"
                onChange={handleChange}
              />

            </div>

          </div>
      <h4 className="mt-4">Documents</h4>

{student.documents?.length > 0 ? (

  <table className="table table-bordered">

    <thead>
      <tr>
        <th>Document Type</th>
        <th>Document Name</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {student.documents.map((doc) => (

        <tr key={doc.documentId}>

          <td>{doc.documentType}</td>

          <td>{doc.documentName}</td>

          <td>

            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={() => handleDocumentEdit(doc)}
            >
              Update
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

) : (

  <p>No Documents Uploaded</p>

)}


{selectedDocumentId && (

  <div className="card mt-4 p-3">

    <h5>Update Document</h5>

    <input
      className="form-control mb-2"
      value={documentName}
      onChange={(e) =>
        setDocumentName(e.target.value)
      }
    />

   <input
  ref={fileInputRef}
  type="file"
  className="form-control mb-2"
  onChange={(e) =>
    setNewFile(e.target.files[0])
  }
/>

    <button
      type="button"
      className="btn btn-warning"
      onClick={updateDocument}
    >
      Save Document
    </button>

    {documentUpdated && (

      <div className="mt-2 text-success fw-bold">
        ✓ Document Updated Successfully
      </div>

    )}

  </div>

)}



<button
  type="submit"
  className="btn btn-success mt-3"
>
  Update Student
</button>

        </form>

      </div>

    </div>

  );

}

export default AdminEditStudent;