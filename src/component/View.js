import React, { useEffect, useState } from "react";
import axios from "axios";
import BCA_Subjects from "../context/SubjectCode";
import './style.css'

const View = ({ s_id }) => {
  const studentId = s_id;
  const [attendanceData, setAttendanceData] = useState([]);
  const [courseSubjects, setCourseSubjects] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-today-attendance?studentId=${studentId}`
        );
        // const response = await axios.get(
        //   `https://server-vpgh.onrender.com/get-today-attendance?studentId=${studentId}`
        // );

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = response.data;

        // Extract course without the section
        if (data.length > 0) {
          const course = data[0].ClassId.slice(0, -1); // Remove the last alphabet (e.g., 'BCA5E' becomes 'BCA5')
          setCourseSubjects(BCA_Subjects[course] || {});
        }

        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, [studentId]);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-[90%] h-[90%] overflow-hidden max-w-4xl p-6 sm:p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-6 mx-auto mt-6 sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
        Attendance for {formattedDate}
      </h1>

      <div
        className="container mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6 
          mt-[70px] h-[calc(100vh-100px)] overflow-y-auto"
      >
        {attendanceData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attendanceData.map((attendance, index) => {
              const subjectName = courseSubjects[attendance.subjectCode] || "Unknown Subject";
              return (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <span className="font-bold text-lg">{attendance.subjectCode}</span>
                    <span className="font-medium text-gray-700 sm:ml-4">
                      {subjectName}
                    </span>
                    <span className="text-green-600 sm:ml-auto">Present</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No attendance data available.</p>
        )}
      </div>
    </div>
  );
};

export default View;
