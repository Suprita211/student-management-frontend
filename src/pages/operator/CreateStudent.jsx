import { useState } from "react";
import axios from "axios";
import './CreateStudent.css';

function CreateStudent() {

const [student, setStudent] = useState({
aadhaarNo: "",
fullName: "",
fatherName: "",
motherName: "",
dateOfBirth: "",
primaryContact: "",
secondaryContact: "",
email: "",
presentAddress: "",
permanentAddress: "",


studentId: "",
courseName: "",
courseType: "",
 universityName: "",   
universityRegistrationNo: "",
dateOfAdmission: "",
counsellorName: "",
session: "",
duration: ""

});

const handleChange = (e) => {
setStudent({
...student,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
  e.preventDefault();
console.log(
    JSON.stringify(student, null, 2)
  );
  const token = localStorage.getItem("token");

  console.log("TOKEN =", token);
  console.log("STUDENT DATA =", student);

  try {
    await axios.post(
      "http://localhost:8081/students",
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Student Created Successfully");

  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

return ( 
<div className="registration-page">
  <div className="register-top-style">
    <h2>REGISTRATION FORM</h2>
  </div>

   <div className="registration-page-content">
  <form onSubmit={handleSubmit}>
  <div className="field-content">

    <div className="left-form-grid">
      <div className="data-field">
        <label className="data-label">
          Student ID : </label>
 <input
        className="form-control student-input"
        name="studentId"
        placeholder="Student ID"
        onChange={handleChange}
      />
      </div>
      {/* student name */}
     
      <div className="data-field">
        <label className="data-label">
          Student Name : </label>
      
       <input
        className="form-control student-input"
        name="fullName"
        placeholder="Student Name"
        onChange={handleChange}
      />
      </div>
      
     {/* course name */}
      <div className="data-field">
        <label className="data-label">
          Course Name : </label>
          <input
        className="form-control student-input"
        name="courseName"
        placeholder="Course Name"
        onChange={handleChange}
      />
      </div>
     
    <div className="data-field">
      <label className="data-label">University Name : </label>
       <input
        className="form-control student-input"
        name="universityName"
        placeholder="University Name"
        onChange={handleChange}
      />

    </div>

    <div className="data-field">
      <label className="data-label"> Session : </label>
       <input
        className="form-control student-input"
        name="session"
        placeholder="Session"
        onChange={handleChange}
      />
    </div>

     

      <div className="data-field">
      <label className="data-label"> Course Duration : </label>
      <input
        className="form-control student-input"
        name="duration"
        placeholder="Duration"
        onChange={handleChange}
      />
    </div>



<div className="data-field">
      <label className="data-label">University Registration Number : </label>
       <input
        className="form-control student-input"
        name="universityRegistrationNo"
        placeholder="Registration Number"
        onChange={handleChange}
      />
    </div>
     

      <div className="data-field">
      <label className="data-label">Date of Admission : </label>
       <input
        type="date"
        className="form-control student-input"
        name="dateOfAdmission"
        onChange={handleChange}
      />
    </div>

     


<div className="data-field">
      <label className="data-label"> Date of Birth : </label>
       <input
        type="date"
        className="form-control student-input"
        name="dateOfBirth"
        onChange={handleChange}
      />
    </div>
     
      
      <div className="data-field">
      <label className="data-label">Aadhaar No : </label>
       <input
        className="form-control student-input"
        name="aadhaarNo"
        placeholder="Aadhaar Number"
        onChange={handleChange}
      />
    </div>
     

    </div>

<div className="personal-info"> Personal Information</div>
<div className="left-form-grid">

<div className="data-field">
      <label className="data-label">Primary Contact No : </label>
       <input
        className="form-control student-input"
        name="primaryContact"
        placeholder="Primary Contact"
        onChange={handleChange}
      />
    </div>
     
 
 <div className="data-field">
      <label className="data-label">Secondary Contact No : </label>
       <input
        className="form-control student-input"
        name="secondaryContact"
        placeholder="Secondary Contact"
        onChange={handleChange}
      />
    </div>
     

    <div className="data-field">
      <label className="data-label">Email Id : </label>
       <input
        className="form-control student-input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
    </div>
     

{/* <div className="data-field">
      <label className="data-label">Present Address : </label>
        <textarea
        className="form-control student-textarea"
        name="presentAddress"
        placeholder="Present Address"
        onChange={handleChange}
      />
    </div> */}

    <div className="data-field textarea-field">
    <label className="data-label">
        Present Address :
    </label>

    <textarea
        className="form-control student-textarea"
        name="presentAddress"
        placeholder="Present Address"
        onChange={handleChange}
    />
</div>
    
     
     <div className="data-field">
      <label className="data-label">Permanent Address : </label>
       <textarea
        className="form-control student-textarea"
        name="permanentAddress"
        placeholder="Permanent Address"
        onChange={handleChange}
      />
    </div>
     
       
       <div className="data-field">
      <label className="data-label">Father's Name : </label>
      <input
        className="form-control student-input"
        name="fatherName"
        placeholder="Father Name"
        onChange={handleChange}
      />
    </div>
      
      
      <div className="data-field">
      <label className="data-label"> Mother's Name : </label>
       <input
        className="form-control student-input"
        name="motherName"
        placeholder="Mother Name"
        onChange={handleChange}
      />
    </div>
     
       
       <div className="data-field">
      <label className="data-label">Counsellor Name : </label>
       <input
        className="form-control student-input"
        name="counsellorName"
        placeholder="Counsellor Name"
        onChange={handleChange}
      />
    </div>
     

<div className="data-field">
      <label className="data-label">Course Type : </label>
        <input
        className="form-control student-input"
        name="courseType"
        placeholder="Course Type"
        onChange={handleChange}
      />
    </div>
    

    </div>

  </div>

 <div className="button-container">
  <button
    type="submit"
    className="btn btn-primary"
  >
    Register
  </button>
</div>
</form>
   </div>
 

</div>


);
}

export default CreateStudent;
