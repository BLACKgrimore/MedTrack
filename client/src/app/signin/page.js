"use client";

import React, { useState } from "react";
import axios from "axios";

const SignInPage = () => {
  const [role, setRole] = useState("store"); // Default to Store Sign In
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle between roles
  const handleToggle = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  // Validation checks
  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
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
      const endpoint =
        role === "store" ? "/api/stores/signin" : "/api/vendors/signin";
      const response = await axios.post(endpoint, formData);
      console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} signed in:`, response.data);
      alert("Sign in successful!");
    } catch (error) {
      console.error("Sign in error:", error.response?.data || error);
      alert("Sign in failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 shadow-md pt-32 bg-pink-100 rounded-md">
      <div className="flex justify-center mb-6">
        <button
          className={`py-2 px-6 text-sm font-bold rounded-l-md ${
            role === "store"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle("store")}
        >
          Store Sign In
        </button>
        <button
          className={`py-2 px-6 text-sm font-bold rounded-r-md ${
            role === "vendor"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleToggle("vendor")}
        >
          Vendor Sign In
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-4">
        {role === "store" ? "Store Sign In" : "Vendor Sign In"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 text-white font-bold rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 focus:ring focus:ring-green-400"
          }`}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
