import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "./AdminEditStudent.css";


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
      universityName: "",
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
         universityName: student.universityName,
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

    <div className="admin-edit-page">
      <div className="edit-page-top">
        <p>Edit Student Details</p>
      </div>

<div className="registration-page-content">
<form onSubmit={handleSubmit}>

<div className="field-content">

<div className="left-form-grid">
                {/* <input
                className="form-control mb-2"
                name="fullName"
                value={student.fullName || ""}
                placeholder="Full Name"
                onChange={handleChange}
              /> */}
              <div className="data-field">
<label className="data-label">
Student Name :
</label>

<input
className="form-control student-input"
name="fullName"
value={student.fullName || ""}
onChange={handleChange}
/>

</div>

              {/* <input
                className="form-control mb-2"
                name="fatherName"
                value={student.fatherName || ""}
                placeholder="Father Name"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Father Name :
</label>

<input
className="form-control student-input"
name="fatherName"
value={student.fatherName || ""}
onChange={handleChange}
/>
</div>

{/* <input
className="form-control mb-2"
name="motherName"
value={student.motherName || ""}
placeholder="Mother Name"
onChange={handleChange}
 /> */}

<div className="data-field">
<label className="data-label">
Mother Name :
</label>

<input
className="form-control student-input"
name="motherName"
value={student.motherName || ""}
onChange={handleChange}
/>
</div>
 

              {/* <input
                type="date"
                className="form-control mb-2"
                name="dateOfBirth"
                value={student.dateOfBirth || ""}
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Date of Birth :
</label>

<input
type="date"
className="form-control student-input"
name="dateOfBirth"
value={student.dateOfBirth || ""}
onChange={handleChange}
/>
</div>

              {/* <input
                className="form-control mb-2"
                name="primaryContact"
                value={student.primaryContact || ""}
                placeholder="Primary Contact"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Primary Contact No :
</label>

<input
className="form-control student-input"
name="primaryContact"
value={student.primaryContact || ""}
onChange={handleChange}
/>
</div>

              {/* <input
                className="form-control mb-2"
                name="secondaryContact"
                value={student.secondaryContact || ""}
                placeholder="Secondary Contact"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Secondary Contact No :
</label>

<input
className="form-control student-input"
name="secondaryContact"
value={student.secondaryContact || ""}
onChange={handleChange}
/>
</div>

              {/* <input
                className="form-control mb-2"
                name="email"
                value={student.email || ""}
                placeholder="Email"
                onChange={handleChange}
              /> */}

<div className="data-field">
<label className="data-label">
Email ID :
</label>

<input
className="form-control student-input"
name="email"
value={student.email || ""}
onChange={handleChange}
/>
</div>              





              {/* <textarea
                className="form-control mb-2"
                name="presentAddress"
                value={student.presentAddress || ""}
                placeholder="Present Address"
                onChange={handleChange}
              /> */}
<div className="data-field textarea-field">

<label className="data-label">
Present Address :
</label>

<textarea
className="form-control student-textarea"
name="presentAddress"
value={student.presentAddress || ""}
onChange={handleChange}
/>
</div>

              {/* <textarea
                className="form-control mb-2"
                name="permanentAddress"
                value={student.permanentAddress || ""}
                placeholder="Permanent Address"
                onChange={handleChange}
              /> */}
<div className="data-field textarea-field">

<label className="data-label">
Permanent Address :
</label>

<textarea
className="form-control student-textarea"
name="permanentAddress"
value={student.permanentAddress || ""}
onChange={handleChange}
/>
</div>

              {/* <input
                className="form-control mb-2"
                name="courseName"
                value={student.courseName || ""}
                placeholder="Course Name"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Course Name :
</label>

<input
className="form-control student-input"
name="courseName"
value={student.courseName || ""}
onChange={handleChange}
/>

</div>

              {/* <input
                className="form-control mb-2"
                name="courseType"
                value={student.courseType || ""}
                placeholder="Course Type"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Course Type :
</label>

<input
className="form-control student-input"
name="courseType"
value={student.courseType || ""}
onChange={handleChange}
/>

</div>

{/* <input className="form-control mb-2"
  name="universityName"
  value={student.universityName || ""}
  placeholder="University Name"
  onChange={handleChange}
/> */}
<div className="data-field">
<label className="data-label">
University Name :
</label>

<input
className="form-control student-input"
name="universityName"
value={student.universityName || ""}
onChange={handleChange}
/>

</div>

              {/* <input
                className="form-control mb-2"
                name="universityRegistrationNo"
                value={
                  student.universityRegistrationNo || ""
                }
                placeholder="University Registration No"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
University Registration:
</label>

<input
className="form-control student-input"
name="universityRegistrationNo"
value={student.universityRegistrationNo || ""}
onChange={handleChange}
/>

</div>

              {/* <input
                type="date"
                className="form-control mb-2"
                name="dateOfAdmission"
                value={student.dateOfAdmission || ""}
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Date of Admission :
</label>

<input
type="date"
className="form-control student-input"
name="dateOfAdmission"
value={student.dateOfAdmission || ""}
onChange={handleChange}
/>

</div>

              {/* <input
                className="form-control mb-2"
                name="counsellorName"
                value={student.counsellorName || ""}
                placeholder="Counsellor Name"
                onChange={handleChange}
             /> */}

<div className="data-field">
<label className="data-label">
Counsellor Name:
</label>

<input
className="form-control student-input"
name="counsellorName"
value={student.counsellorName || ""}
onChange={handleChange}
/>

</div>            

              {/* <input
                className="form-control mb-2"
                name="session"
                value={student.session || ""}
                placeholder="Session"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Session :
</label>

<input
className="form-control student-input"
name="session"
value={student.session || ""}
onChange={handleChange}
/>

</div>              

              {/* <input
                className="form-control mb-2"
                name="duration"
                value={student.duration || ""}
                placeholder="Duration"
                onChange={handleChange}
              /> */}
<div className="data-field">
<label className="data-label">
Duration :
</label>

<input
className="form-control student-input"
name="duration"
value={student.duration || ""}
onChange={handleChange}
/>
</div>
  </div>



             

            {/* </div> */}

          {/* </div> */}
      {/* <h4 className="mt-4">Documents</h4>

{student.documents?.length > 0 ? (

  <table className="table table-bordered"> */}
  <div className="documents-section">

    <h3 className="documents-title">
        Documents
    </h3>

    {student.documents?.length > 0 ? (

        <table className="documents-table">

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
              className="btn btn-warning btn-sm view-btn"
              onClick={() => handleDocumentEdit(doc)}
            >
              Update
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  {/* </table>

) : (

  <p>No Documents Uploaded</p> */}
  </table>

) : (

<p className="no-document">
    No Documents Uploaded
</p>

)}

</div>



{selectedDocumentId && (

  <div className="update-document-card">

    <h4 className="update-document-title">
    Update Document
</h4>

    {/* <input
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
      className="document-save-btn"
      onClick={updateDocument}
    >
      Save Document
    </button> */}
    <div className="update-document-form">

    <input
        className="document-input"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
    />

    <input
        ref={fileInputRef}
        type="file"
        className="document-file-input"
        onChange={(e) => setNewFile(e.target.files[0])}
    />

</div>

<button
    type="button"
    className="document-save-btn"
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



{/* <button
  type="submit"
  className="btn btn-success mt-3"
>
  Update Student
</button> */}
<div className="button-container">

<button
    type="submit"
    className="update-btn"
>
    Update Student
</button>

</div>
</div>

        </form>

      </div>

    </div>

  );

}

export default AdminEditStudent;