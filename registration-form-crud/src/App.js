import { StudentsData } from "./StudentsData";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [studentData, setStudentData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(0);
  const [rollNumber, setRollNumber] = useState(0);
  const [emailId, setEmailId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setStudentData(StudentsData);
  }, []);

  const handleEdit = (id) => {
    const editData = studentData.filter((list) => list.id === id);
    if (editData !== undefined) {
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
      if (window.confirm("You want to delete info....")) {
        const deleteInfo = studentData.filter((list) => list.id !== id);
        setStudentData(deleteInfo);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const saveData = [...studentData];
    const newObject = {
      id: StudentsData.length + 1,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      rollNumber: rollNumber,
      emailId: emailId,
      dateOfBirth: dateOfBirth,
    };
    saveData.push(newObject);
    setStudentData(saveData);
  };

  const handleUpdate = () => {
    const index = studentData
      .map((list) => {
        return list.id;
      })
      .indexOf(id);

    const updateData = [...studentData];
    updateData[index].firstName = firstName;
    updateData[index].lastName = lastName;
    updateData[index].mobileNumber = mobileNumber;
    updateData[index].rollNumber = rollNumber;
    updateData[index].emailId = emailId;
    updateData[index].dateOfBirth = dateOfBirth;

    setStudentData(updateData);
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
            firstName:
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
            lastName:
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
              onChange={(e) => setMobileNumber(e.target.value)}
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
              onChange={(e) => setEmailId(e.target.value)}
              value={emailId}
            />
          </label>
        </div>
        <div>
          <label>
            Date of Birth:
            <input
              type="text"
              placeholder="Enter your DOB"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
              Save
            </button>
          ) : (
            <button className="btn btn-success" onClick={() => handleUpdate()}>
              Update
            </button>
          )}

          <button className="btn btn-danger" onClick={() => handleClear()}>
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
