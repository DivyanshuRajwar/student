import React, { useState,useContext } from "react";
import { AuthContext } from '../context/AuthContext';  // Import the AuthContext
import axios from 'axios'
const LoginSignupForm = () => {
    const { isAuthenticated, login, logout } = useContext(AuthContext)
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
  
    const handleLogin = async(e) => {
      e.preventDefault();
      const studenetLogin=  {studentId ,password};
      try{
        // const response = await axios.post('http://localhost:3000/student-registration',studenetLogin);
        const response = await axios.post(
            "https://server-vpgh.onrender.com/student-registration",
            studenetLogin
          );
        if (response.status === 200) {
            login(response.data.userData);
            // login();
          } else {
            alert("Login Fail");
            console.error("Login failed:", response.data.message);
          }
      }catch(errro){

      }
      console.log("Login with Student ID: ", studentId, " Password: ", password);
  
    };
  
    const handleSignup = async(e) => {
      e.preventDefault();
     
      console.log("Signup with Name: ", name, " Student ID: ", studentId, " Course: ", course, " Password: ", password);
      const signUpData = {
          studentId,
          name,
          course,
          password
      }
      try{
        //   const res = await  axios.post('http://localhost:3000/student-registration',signUpData);
          const response = await axios.post(
            "https://server-vpgh.onrender.com/student-registration",
            signUpData
          );
          console.log(response.data);
      }catch(error){
          if (error.response) {
              console.error('Error Response:', error.response.data);
            } else if (error.request) {
              console.error('No Response:', error.request);
            } else {
              console.error('Error:', error.message);
            }
      }
    };
  
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="w-[90%] max-w-2xl p-8 bg-[#FCFCFC] rounded-lg shadow-lg space-y-6 mx-auto mt-10"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
  
          {/* Student ID field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your Student ID"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
  
          {/* Name field (only for signup) */}
          {!isLogin && (
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
          )}
  
          {/* Course field (only for signup) */}
          {!isLogin && (
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter your course"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
          )}
  
          {/* Password field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-1/3 py-2 mt-6 font-semibold text-white bg-[#45AA40] rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 mx-auto block"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
  
          {/* Toggle between Login and Signup */}
          <div className="text-center mt-4">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#45AA40] font-semibold ml-1"
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
