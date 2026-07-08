import { useState } from "react";
import axios from "axios";

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
      "http://localhost:8080/students",
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

return ( <div className="container mt-4">

  <h2>Create Student</h2>

  <form onSubmit={handleSubmit}>

    <div className="row">

      <div className="col-md-6">
        <input
          className="form-control mb-2"
          name="aadhaarNo"
          placeholder="Aadhaar Number"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="fatherName"
          placeholder="Father Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="motherName"
          placeholder="Mother Name"
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="dateOfBirth"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="primaryContact"
          placeholder="Primary Contact"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="secondaryContact"
          placeholder="Secondary Contact"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6">

        <textarea
          className="form-control mb-2"
          name="presentAddress"
          placeholder="Present Address"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          name="permanentAddress"
          placeholder="Permanent Address"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="studentId"
          placeholder="Student ID"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="courseName"
          placeholder="Course Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="courseType"
          placeholder="Course Type"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="universityRegistrationNo"
          placeholder="University Registration No"
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="dateOfAdmission"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="counsellorName"
          placeholder="Counsellor Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="session"
          placeholder="Session"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="duration"
          placeholder="Duration"
          onChange={handleChange}
        />

      </div>

    </div>

    <button
      type="submit"
      className="btn btn-primary mt-3"
    >
      Save Student
    </button>

  </form>

</div>


);
}

export default CreateStudent;
