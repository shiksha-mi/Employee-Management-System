import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOTP, setShowOTP] = useState(false);
  const [showReset, setShowReset] = useState(false);


  // Send OTP
  const handleSendOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      if (response.data.success) {
        setShowOTP(true);
        alert("OTP sent successfully");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };


  // Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      if (response.data.success) {
        setShowReset(true);
        alert("OTP Verified Successfully");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };


  // Reset Password
  const handleResetPassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          password: newPassword,
        }
      );


      if (response.data.success) {
        alert("Password Reset Successfully");
        navigate("/login");
      }

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow-md w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>


        <input
          type="email"
          placeholder="Enter Email"
          className="border w-full p-2 mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />


        {showOTP && !showReset && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="border w-full p-2 mb-4"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
          />
        )}



        {showReset && (
          <>
          <input
            type="password"
            placeholder="Enter New Password"
            className="border w-full p-2 mb-4"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />


          <input
            type="password"
            placeholder="Confirm Password"
            className="border w-full p-2 mb-4"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          </>
        )}



        {!showOTP && (

          <button
            onClick={handleSendOTP}
            className="bg-blue-600 text-white w-full p-2 rounded"
          >
            Send OTP
          </button>

        )}



        {showOTP && !showReset && (

          <button
            onClick={handleVerifyOTP}
            className="bg-green-600 text-white w-full p-2 rounded"
          >
            Verify OTP
          </button>

        )}



        {showReset && (

          <button
            onClick={handleResetPassword}
            className="bg-red-600 text-white w-full p-2 rounded"
          >
            Reset Password
          </button>

        )}

      </div>

    </div>
  );
};

export default ForgotPassword;