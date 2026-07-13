
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import './UploadDocument.css';

function UploadDocument() {

  const [studentId, setStudentId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("UNIVERSITY");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "documentType",
        documentType
      );

      formData.append(
        "documentName",
        documentName
      );

      const response =
        await axiosInstance.post(
          `/students/documents/${studentId}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      console.log(response.data);

      alert("Document Uploaded Successfully");

      setStudentId("");
      setDocumentName("");
      setDocumentType("UNIVERSITY");
      setFile(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data ||
        "Upload Failed"
      );
    }
  };

  return (
    // <div className="Upload-document-content">
    //   <div className="Upload-document-top">
    //      <h2>UPLOAD DOCUMENT</h2>
    //      </div>

    //   <div className="upload-document-form">
    //      <form onSubmit={handleUpload}>

    //     <div className="mb-3">
    //       <label>
    //         Student ID
    //       </label>

    //       <input
    //         className="form-control"
    //         value={studentId}
    //         onChange={(e) =>
    //           setStudentId(e.target.value)
    //         }
    //         required
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label>
    //         Document Name
    //       </label>

    //       <input
    //         className="form-control"
    //         value={documentName}
    //         onChange={(e) =>
    //           setDocumentName(e.target.value)
    //         }
    //         required
    //       />
    //     </div>

    //     <div className="mb-3">
    //       <label>
    //         Document Type
    //       </label>

    //       <select
    //         className="form-select"
    //         value={documentType}
    //         onChange={(e) =>
    //           setDocumentType(e.target.value)
    //         }
    //       >
    //         <option value="UNIVERSITY">
    //           UNIVERSITY
    //         </option>

    //         <option value="NIMTT">
    //           NIMTT
    //         </option>

    //         <option value="PHOTO">
    //           PHOTO
    //         </option>
    //       </select>
    //     </div>

    //     <div className="mb-3">

    //       <label>
    //         Select File
    //       </label>

    //       <input
    //         type="file"
    //         className="form-control"
    //         onChange={(e) =>
    //           setFile(e.target.files[0])
    //         }
    //         required
    //       />

    //     </div>

    //     <button
    //       type="submit"
    //       className="btn btn-success"
    //     >
    //       Upload Document
    //     </button>

    //   </form>
    //   </div>
     

    // </div>
    <div className="Upload-document-content">
  <div className="register-top-style">
    <h2>UPLOAD DOCUMENT</h2>
  </div>

  <div className="registration-page-content">
    <form onSubmit={handleUpload}>

      <div className="upload-form">

        <div className="data-field">
          <label className="data-label">
            Student ID :
          </label>

          <input
            className="form-control student-input"
            value={studentId}
            placeholder="Student ID"
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="data-field">
          <label className="data-label">
            Document Name :
          </label>

          <input
            className="form-control student-input"
            value={documentName}
            placeholder="Document Name"
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>

        <div className="data-field">
          <label className="data-label">
            Document Type :
          </label>

          <select
            className="form-control student-input"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="UNIVERSITY">UNIVERSITY</option>
            <option value="NIMTT">NIMTT</option>
            <option value="PHOTO">PHOTO</option>
          </select>
        </div>

        <div className="data-field">
          <label className="data-label">
            Select File :
          </label>

          {/* <input
            type="file"
            className="form-control student-input"
            onChange={(e) => setFile(e.target.files[0])}
            required
          /> */}
          <input
    type="file"
    className="form-control student-file-input"
    onChange={(e) => setFile(e.target.files[0])}
    required
/>
        </div>

      </div>

      <div className="button-container">
        <button
          type="submit"
          className="btn btn-primary" id="Upload-btn"
        >
          Upload
        </button>
      </div>

    </form>
  </div>
</div>
  );
}

export default UploadDocument;

