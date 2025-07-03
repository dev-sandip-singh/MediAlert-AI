

import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (!agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3030/api/v1/user/create-patient",
        {
          firstName, lastName, email, phone, nic, dob, gender, password,
          role: "Patient"
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      console.log({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Patient",
      });
      toast.success(res.data.message);
      navigate("/login");

      // Reset form
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setNic(""); setDob(""); setGender(""); setPassword(""); setAgree(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const [currentImage, setCurrentImage] = useState(0);
    const images = [
      "../src/assets/img/AppointmentPhoto.jpg",
      "../src/assets/img/DoctorsPhoto.jpg",
      "../src/assets/img/NursePhoto.jpg",
      "../src/assets/img/HeartPulsePhoto.jpg",
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);
  

  return (
    <div className="min-h-screen flex flex-row">
      {/* Left Side - Image Slider */}
      <div className="w-1/2 bg-white flex justify-center items-center relative h-screen overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-5">
          
          {/* Image Slider Container */}
          <div className="relative h-[50vh] w-[50vh]">
            {/* Insert Image Slider Component Here */}
            <div className="relative h-[50vh] w-[50vh]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index}`}
                className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${
                  currentImage === index
                    ? "opacity-100 rotate-[360deg]"
                    : "opacity-0"
                }`}
              />
            ))}
          </div>
          </div>

          {/* Tagline */}
          <h1 className="text-blue-600 text-3xl font-semibold text-center">Welcome to MediAlert AI</h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden border shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <FaUserPlus className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-bold text-blue-600">Create Account</h2>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">NIC</label>
                <input
                  type="text"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-800">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-blue-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="mt-4 flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mr-2"
                />
                <label>
                  I agree to the <span className="text-blue-600 font-medium">Terms and Conditions</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Already have an account */}
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;




