import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Male from "../Assets/user_Male.png";
import LoginSignup from "./LoginSignupForm";
import StudentPage from "./StudentPage";
import { AuthContext } from "../context/AuthContext";
import Student from "./Student";
import View from "./View";
import { toast } from "react-toastify";
import { getDeviceId } from "../utils/fingerprint";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user ,deviceId } = useContext(AuthContext);
  const [userName, setUserName] = useState('Guest');
  useEffect(() => {
    if (user && user.fullName) {
      setUserName(user.fullName.split(" ")[0]);
    } else {
      setUserName('Guest');
      navigate('/');
    }
  }, [user]); 

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      console.log(deviceId)
      // const response = await axios.post("http://localhost:3000/remove-device", {
      //   studentId: user.studentId,
      //   deviceId,
      // });
      const response = await axios.post("https://server-vpgh.onrender.com/remove-device", {
        studentId: user.studentId,
        deviceId,
      });
  
      if (response.status === 200) {
        toast.success("Bye Bye 🥲 Device removed successfully.");
      } else {
        toast.error("🚫 Failed to remove the device. Please try again.");
      }
  
      // Logout the user
      logout(); // Make sure your logout logic clears the authentication state
  
    } catch (error) {
      console.error(error);
      toast.error("🚫 An error occurred while logging out.");
    }
  };
  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#CFE9D0]">
      {/* Navigation Bar */}
      <nav className="p-4 h-[4rem] flex items-center">
        <div className="flex items-center container mx-auto justify-between">
          {/* Student Portal Title */}
          <h1 className="text-xl font-bold text-black">Student Portal</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/profile")} className="text-black font-bold">
              Profile
            </button>
            <button onClick={() => navigate("/student-attendance")} className="text-black font-bold">
              Attendance
            </button>
            <button onClick={() => navigate("/view")} className="text-black font-bold">
              View Attendance
            </button>
            <button onClick={handleLogout} className="text-black font-bold">
              Logout
            </button>

            {/* Username and Profile Image */}
            <div className="flex items-center bg-white gap-4 pl-4 rounded-full shadow-lg">
              <span className="font-bold text-sm">{userName}</span>
              <img
                src={Male}
                alt="pic"
                className="w-[3.2rem] h-[3.2rem]  rounded-full cursor-pointer"
              />
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="relative flex items-center md:hidden dropdown-menu">
            <div className="flex items-center bg-white gap-4 pl-4 rounded-full shadow-lg">
              <span className="font-bold text-sm">{userName}</span>
              <img
                src={Male}
                alt="pic"
                className="w-[3.2rem] h-[3.2rem] rounded-full ml-3 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>

            {/* Dropdown Menu for Mobile */}
            {menuOpen && (
              <div className="absolute top-[4rem] right-0 w-[12rem] bg-white rounded-lg shadow-md p-2 z-10">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/student-attendance");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                >
                  Attendance
                </button>
                <button
                  onClick={() => {
                    navigate("/view");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                >
                  View Attendance
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Center Div */}
      <div
        style={{ height: "calc(100vh - 4rem)" }}
        className="w-screen h-[full]  flex justify-center items-center"
      >
        <Routes>
          <Route path="/" element={isAuthenticated ? <StudentPage /> : <LoginSignup />} />
          <Route path="/profile" element={isAuthenticated ? <StudentPage /> : <LoginSignup />} />
          <Route path="/view" element={isAuthenticated ? <View s_id={user.studentId} /> : <LoginSignup />} />
          <Route path="/student-attendance" element={isAuthenticated ? <Student /> : <LoginSignup />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
