"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Axios from "@/utils/axios";

const ResetPassword = () => {

  const router = useRouter();
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [type, setType] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const idParam = searchParams.get("id");    // Get 'id' param from the URL
    const tokenParam = searchParams.get("token"); // Get 'token' param from the URL
    const typeParam = searchParams.get("type"); // Get 'type' param from the URL
    if (idParam && tokenParam && typeParam) {
      setId(idParam);
      setToken(tokenParam);
      setType(typeParam)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    // Check if the password has a minimum length of 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setMessage("");
      return;
    }

    try {
      // console.log("entered")
      // console.log(id,"token:  ",token)
      if (type == 'user') {
        const response = await Axios.post(`/user/reset-password/`, {
          id,
          token,
          password,
        });
      }
      else if (type == 'vendor') {
        const response = await Axios.post(`/vendor/reset-password/`, {
          id,
          token,
          password,
        });
      }
      else if (type == 'ngo') {
        const response = await Axios.post(`/ngo/reset-password/`, {
          id,
          token,
          password,
        });
      }
      else{
        setError("Invalid type");
        return
      }
      // console.log(response.data)

      setMessage("Password reset successful!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fce8f3]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Reset Password</h2>

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
          placeholder="Enter at least 8 characters"
        />

        <label className="block mb-2">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
