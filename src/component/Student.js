import React, { useState } from 'react';
import axios from 'axios'
function Student() {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState(''); 
  const [classId ,setClassId] = useState('');
  const [subjectCode , setSubjectCode] = useState('');

  const handleSubmit =async(e) => {
    e.preventDefault();
    const date = new Date();
    const formattedDate = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`; 
    
    const studentData = {
      name,
      rollNo,
      classId,
      subjectCode,
      formattedDate
    }
    try {
      const response = await axios.post('http://localhost:3000/submit-student-data', studentData);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting student data:", error);
    }
  };
   const handleCLassId = (e)=>{
    e.preventDefault();
    let cId = e.target.value;
    cId = cId.toUpperCase();
    setClassId(cId);
   }
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FCFCFC] w-full max-w-md p-6 rounded-lg shadow-lg space-y-6 sm:w-4/5 lg:w-1/2"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Student Information</h2>

        {/* Name Field */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Name</label>
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
            onChange={handleCLassId}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Subject Code</label>
          <input
            type="text"
            placeholder="Enter your Subject Code "
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Student;
