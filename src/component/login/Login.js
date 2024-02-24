import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ setIsLoggedIn, isLoggedIn }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useCustomer();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(true);
  const [submitOtpButtonDisabled, setSubmitOtpButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  const otpInputs = useRef([]); // Ref for OTP input boxes
  const intervalRef = useRef(); // Ref for the interval

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value.length === 10) {
      setOtpButtonDisabled(false);
    } else {
      setOtpButtonDisabled(true);
    }
  };

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    startTimer();
    try {
      const payload = {
        mobile_number: phoneNumber,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/get_otp`,
        payload
      );
      console.log(response.data);
      if (response.status === 200) {
        setOtpScreen(true);
        setError("");
      } else {
        setError("Invalid phone number. Please try again.");
      }
    } catch (error) {
      setOtpScreen(false);
      setError("Invalid phone number. Please try again.");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (newOtp.every((digit) => digit !== "")) {
      setSubmitOtpButtonDisabled(false);
    } else {
      setSubmitOtpButtonDisabled(true);
    }

    // Move focus to the next input box
    if (value !== "" && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleBackToInput = () => {
    setOtpScreen(false);
  };

  const handleOtpSubmission = async (e) => {
    e.preventDefault();
    startTimer();

    try {
      const otpString = otp.join("");
      const payload = {
        mobile_number: phoneNumber,
        otp: otpString,
      };
      console.log("pooja3", payload);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/validate_otp`,
        payload
      );
      if (response.status === 200) {
        if (response?.data?.response_body?.user_exist) {
          login(response?.data?.response_body);
          setIsLoggedIn(true);
          navigate("/home");
          clearInterval(intervalRef.current);
          setError("");
        } else {
          navigate("/signup");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const startTimer = () => {
    setTimer(60);
    setTimerActive(true);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalRef.current);
          setTimerActive(false);
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white shadow-md rounded p-8 sm:w-96 w-full">
        {otpScreen ? (
          <>
            {/* Logo Section */}
            <div className="flex justify-center items-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/main-logo-n2.png"}
                alt="Company Logo"
                className={`${styles.img_ht_config} w-auto`}
              />
            </div>

            {/* Back link */}
            <div className="mt-4 text-center">
              <p>
                <button
                  onClick={handleBackToInput}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  Back
                </button>
              </p>
            </div>

            {/* OTP Input Section */}
            <div className="mt-4 flex justify-center items-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="0"
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-12 h-12 text-center"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength={1}
                  ref={(input) => (otpInputs.current[index] = input)} // Ref for OTP input boxes
                />
              ))}
            </div>

            {/* Timer Section */}
            <div className="mt-2 text-center">
              <p>
                {timer > 0 ? `0:${timer < 10 ? `0${timer}` : timer}` : "00:00"}
              </p>{" "}
              {/* Timer logic goes here */}
              {timer === 0 && (
                <p>
                  <button
                    onClick={startTimer}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Resend OTP
                  </button>
                </p>
              )}
            </div>
            {error && (
              <div className="mt-2 text-red-500 text-center">{error}</div>
            )}
            {/* Submit OTP Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleOtpSubmission}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  submitOtpButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={submitOtpButtonDisabled}
              >
                Submit OTP
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Logo Section */}
            <div className="flex justify-center items-center">
              <img
                src={process.env.PUBLIC_URL + "/assets/main-logo-n2.png"}
                alt="Company Logo"
                className={`${styles.img_ht_config} w-auto`}
              />
            </div>

            {/* Form Section */}
            <div className="mt-8">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/phone.png"}
                    alt="Company Logo"
                    className="h-5 w-5"
                  />
                </span>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Phone Number"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              {error && (
                <div className="mt-2 text-red-500 text-center">{error}</div>
              )}
              <div className="flex justify-center mt-4">
                {" "}
                {/* Center the button */}
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    otpButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={handleGenerateOTP}
                  disabled={otpButtonDisabled}
                >
                  Generate OTP
                </button>
              </div>
              <div className="mt-4 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
