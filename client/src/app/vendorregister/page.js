"use client";

import React, { useState } from "react";
import axios from "axios";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    phone: "",
    registrationNumber: "",
    taxId: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation checks
  const validate = () => {
    const errors = {};
    if (!formData.companyName) errors.companyName = "Company name is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.registrationNumber)
      errors.registrationNumber = "Registration number is required.";
    if (!formData.taxId) errors.taxId = "Tax ID is required.";
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/vendors/register", formData);
      console.log("Vendor registered successfully:", response.data);
      alert("Registration successful! You can now log in.");
      setFormData({
        companyName: "",
        address: "",
        email: "",
        phone: "",
        registrationNumber: "",
        taxId: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 shadow-md rounded-md pt-32 bg-pink-100">
      <h1 className="text-2xl font-bold text-center mb-4">Vendor Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your company name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Registration Number */}
        <div>
          <label className="block font-medium">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your registration number"
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm">{errors.registrationNumber}</p>
          )}
        </div>

        {/* Tax ID */}
        <div>
          <label className="block font-medium">Tax ID</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your Tax ID"
          />
          {errors.taxId && <p className="text-red-500 text-sm">{errors.taxId}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-lightblue"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-400"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default VendorRegistration;
