import React, { useState, useContext } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import {getDeviceId} from '../utils/fingerprint'
const LoginSignupForm = () => {
  const { isAuthenticated, login, logout ,setDeviceId } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const studentLogin = { studentId, password };

    try {
      // const response = await axios.post(
      //   "http://localhost:3000/student-login",
      //   studentLogin
      // );
      const response = await axios.post(
          "https://server-vpgh.onrender.com/student-login",
          studentLogin
        );

      if (response.status === 200) {
        login(response.data.userData);
        toast.success("🔑 Welcome back! You've successfully logged in.");

        // Save the device ID to the server
        const saveDeviceResponse = await axios.post(
          "https://server-vpgh.onrender.com/save-device",
          {
            studentId: response.data.userData.studentId,
            deviceId,
          }
        );
        const deviceId = await getDeviceId(); 

        // Save the device ID to the server
        // const saveDeviceResponse = await axios.post(
        //   "http://localhost:3000/save-device",
        //   {
        //     studentId: response.data.userData.studentId,
        //     deviceId,
        //   }
        // );
        if (saveDeviceResponse.status === 200) {
          toast.success("📲 Device successfully registered for attendance.");
          setDeviceId(deviceId);
        } else {
          toast.error("🚫 Failed to register the device. Please try again.");
        }
      } else {
        toast.error(
          "🚫 Invalid credentials. Please check your username or password."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("🚫 Login failed. Please try again later.");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const signUpData = {
      studentId,
      name,
      course,
      password,
    };
    try {
        // const response = await  axios.post('http://localhost:3000/student-registration',signUpData);
      const response = await axios.post(
        "https://server-vpgh.onrender.com/student-registration",
        signUpData
      );
      if (response.status === 200) {
        toast.success("🎉 You're all set! Welcome aboard");
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      // if (error.response) {
      //     console.error('Error Response:', error.response.data);
      //   } else if (error.request) {
      //     console.error('No Response:', error.request);
      //   } else {
      //     console.error('Error:', error.message);
      //   }
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return (
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
          <label className="block mb-1 font-semibold text-gray-700">
            Course
          </label>
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
        <label className="block mb-1 font-semibold text-gray-700">
          Password
        </label>
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
  );
};

export default LoginSignupForm;
