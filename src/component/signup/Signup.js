import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCustomer } from "../../context/CustomerContext";

const Signup = () => {
  const { signup } = useCustomer();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        email: email,
        date_of_birth: dob,
        mobile_number: mobileNumber,
        gender: gender,
        city: selectedCity,
        height: height,
        weight: weight,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/onboarding/register`,
        payload
      );
      console.log(response?.data?.response_body);
      signup(response?.data?.response_body);
      if (response.status === 200) {
        setError("");
      } else {
        setError("Invalid entry. Please try again.");
      }
    } catch (error) {
      setError("Invalid entry. Please try again.");
    }
  };

  const getCityList = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/onboarding/cities`
    );
    setCities(response?.data?.response_body?.cities);
  };

  useEffect(() => {
    getCityList();
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded p-8 sm:w-5/6 md:w-1/2 w-full">
        <h2 className="text-lg font-bold mb-8 mt-4 text-center">
          Basic Details
        </h2>
        <div className="mb-4 sm:flex">
          <div className="mb-4 sm:mr-2 sm:mb-0 sm:w-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="sm:ml-2 sm:w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              maxLength={10}
              id="mobile_number"
              placeholder="Phone Number"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 sm:flex">
          <div className="mb-4 sm:mr-2 sm:mb-0 sm:w-1/2">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              placeholder="Date of Birth"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="sm:ml-2 sm:w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 sm:flex">
          <div className="mb-4 sm:mr-2 sm:mb-0 sm:w-1/2">
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height(cm)
            </label>
            <input
              type="text"
              id="height"
              placeholder="Height"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="sm:ml-2 sm:w-1/2">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight(kg)
            </label>
            <input
              type="text"
              id="weight"
              placeholder="Weight"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 sm:flex">
          <div className="mb-4 sm:mr-2 sm:mb-0 sm:w-1/2">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="select">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="sm:ml-2 sm:w-1/2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              id="gender"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4"></div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4 mx-auto block"
          onClick={handleSubmit}
        >
          Create Account
        </button>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            {/* <button className="text-blue-500 hover:underline focus:outline-none">
              Login
            </button> */}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
