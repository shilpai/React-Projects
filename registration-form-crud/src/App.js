import { useState, useEffect } from "react";
import "./App.css";
import { StudentsData } from "./StudentsData";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);


  useEffect(() => {
    setStudentData(StudentsData);
  }, []);

  // Email Validation
  const validateEmail = (email) => {
    const err =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return err.test(String(email).toLowerCase());
  };

  


  const handleEdit = (id) => {
    const editData = studentData.filter((list) => list.id === id);
    if (editData.length > 0) {
      setIsUpdate(true);
      setId(id);
      setFirstName(editData[0].firstName);
      setLastName(editData[0].lastName);
      setMobileNumber(editData[0].mobileNumber);
      setRollNumber(editData[0].rollNumber);
      setEmailId(editData[0].emailId);
      setDateOfBirth(editData[0].dateOfBirth);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (
        window.confirm(
          "Are you sure you want to delete this student's information?"
        )
      ) {
        const deleteInfo = studentData.filter((list) => list.id !== id);
        setStudentData(deleteInfo);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateEmail(emailId)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

  
    const newObject = {
      id: studentData.length + 1,
      firstName,
      lastName,
      mobileNumber,
      rollNumber,
      emailId,
      dateOfBirth,
    };
    setStudentData([...studentData, newObject]);
    handleClear();
  };

  const handleUpdate = () => {
    if (!validateEmail(emailId)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const updateData = [...studentData];
    const index = studentData.findIndex((list) => list.id === id);
    if (index !== -1) {
      updateData[index] = {
        id,
        firstName,
        lastName,
        mobileNumber,
        rollNumber,
        emailId,
        dateOfBirth,
      };
      setStudentData(updateData);
    }
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setRollNumber("");
    setEmailId("");
    setDateOfBirth("");
    setIsUpdate(false);
    setEmailError(""); 
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label>
            Firstname:
            <input
              type="text"
              placeholder="Enter your firstname"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>
            Lastname:
            <input
              type="text"
              placeholder="Enter your lastname"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              type="text"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
            />
          </label>
        </div>
        <div>
          <label>
            Roll Number:
            <input
              type="text"
              placeholder="Enter your roll number"
              onChange={(e) => setRollNumber(e.target.value)}
              value={rollNumber}
            />
          </label>
        </div>
        <div>
          <label>
            Email Id:
            <input
              type="text"
              placeholder="Enter your email id"
              onChange={(e) => {
                setEmailId(e.target.value);
                if (emailError) setEmailError(""); // Clear error as user types
              }}
              value={emailId}
            />
          </label>
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <div>
          <label>
            Date of Birth:
            <input
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
          </label>
        </div>
        <div className="btn-container">
          {!isUpdate ? (
            <button
              className="btn btn-primary btn-fixed-size "
              onClick={(e) => handleSave(e)}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-success btn-fixed-size "
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          )}

          <button
            className="btn btn-danger btn-fixed-size"
            onClick={() => handleClear()}
          >
            Clear
          </button>
        </div>
      </div>

      {/* table portion */}
      <table className="table table-hover ">
        <thead>
          <tr>
            <td>Sr. No</td>
            <td>Id</td>
            <td>firstName:</td>
            <td>lastName:</td>
            <td>Mobile No. :</td>
            <td>Roll No. :</td>
            <td>Email Id :</td>
            <td>Date of Birth :</td>
            <td>Actions :</td>
          </tr>
        </thead>
        <tbody>
          {studentData.map((list, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td> {list.id} </td>
                <td> {list.firstName} </td>
                <td> {list.lastName} </td>
                <td> {list.mobileNumber} </td>
                <td> {list.rollNumber} </td>
                <td> {list.emailId} </td>
                <td> {list.dateOfBirth} </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleEdit(list.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(list.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
