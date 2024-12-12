import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Student() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const { restrictLogoutForDuration, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;

    const studentData = {
      name,
      rollNo,
      classId,
      subjectCode,
      studentId: user.studentId,
      formattedDate,
    };

    try {
      const response = await axios.post("http://localhost:3000/submit-student-data", studentData);
      // const response = await axios.post("https://server-vpgh.onrender.com/submit-student-data", studentData);
      setName("");
      setRollNo("");
      setClassId("");
      setSubjectCode("");
      if (response.status === 200) {
        toast.success("🥳 Attendance submitted successfully!");
        restrictLogoutForDuration(5);
      }else if(response.status === 406){
        toast.error("Not valide ClassId");
      }
       else {
        toast.error("Failed to submit attendance.");
      }
    }catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.warning("Time over, no attendance can be submitted");
        } else if (error.response.status === 409) {
          toast.error("Attendance already submitted");
        } else if (error.response.status === 500) {
          toast.error("Internal server error, please try again later");
        } else {
          toast.error(`Error: ${error.response.status} - ${error.response.data?.message || "Something went wrong."}`);
        }
      } else {
        toast.error("Problem in sending attendance");
      }
    }
  };

  const handleClassId = (e) => {
    e.preventDefault();
    let cId = e.target.value.toUpperCase();
    setClassId(cId);
  };

  const handleSubjectCode = (e) => {
    e.preventDefault();
    let sCode = e.target.value.toUpperCase();
    setSubjectCode(sCode);
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6  sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Student Information</h2>

        {/* Name Field */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* Roll No Field */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Roll No.</label>
          <input
            type="text"
            placeholder="Enter your roll number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* ClassId */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">ClassId</label>
          <input
            type="text"
            placeholder="Enter your Class Id"
            value={classId}
            onChange={handleClassId}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* Subject Code */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Subject Code</label>
          <input
            type="text"
            placeholder="Enter your Subject Code "
            value={subjectCode}
            onChange={handleSubjectCode}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        >
          Submit
        </button>
      </form>
  );
}

export default Student;
