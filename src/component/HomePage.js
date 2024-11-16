import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Mock student data (Replace with real data from state or API if available)
  const studentData = {
    name: 'John Doe',
    studentId: '12345',
    course: 'Computer Science',
  };

  if (!isAuthenticated) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="w-screen h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="  p-4 text-white shadow-md">
        <div className="flex justify-between items-center container mx-auto">
          <h1 className="text-xl font-bold text-black ">Student Portal</h1>
          <button
            onClick={logout}
            className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center mt-12">
        <div className="p-6 bg-white rounded-lg shadow-md w-[90%] max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Student Information
          </h2>
          <ul className="text-gray-700">
            <li className="mb-2">
              <span className="font-semibold">Name:</span> {studentData.name}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Student ID:</span>{' '}
              {studentData.studentId}
            </li>
            <li>
              <span className="font-semibold">Course:</span>{' '}
              {studentData.course}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
