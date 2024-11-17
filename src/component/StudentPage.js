import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function StudentPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="w-[90%] max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-6 mx-auto mt-10 text-center">
        <p className="text-gray-600">No user details available. Please log in to view details.</p>
      </div>
    );
  }

  const { fullName, studentId, course } = user;

  return (
    <div className="w-[90%] max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-6  ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Details</h2>
      <ul className="space-y-4 text-gray-700">
        <li>
          <span className="font-semibold">Full Name:</span> {fullName}
        </li>
        <li>
          <span className="font-semibold">Student ID:</span> {studentId}
        </li>
        <li>
          <span className="font-semibold">Course:</span> {course}
        </li>
      </ul>
    </div>
  );
}

export default StudentPage;
