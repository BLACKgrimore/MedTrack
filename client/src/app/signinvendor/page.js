"use client";
import Axios from '@/utils/axios';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const SignIn = () => {
  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);
  const forgotEmail = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue) {
      router.push(selectedValue);  // Redirect to the selected href
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlevendor = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!validateEmail(emailValue)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!emailValue || !passwordValue) {
      setErrorMessage('Both fields are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await Axios.post("/vendor/login", {
        email: emailValue,
        password: passwordValue,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, type } = response.data.data;
        // console.log(response.data.data)
        Cookies.set("accessToken", accessToken, { expires: 3, path: "/" });
        Cookies.set("refreshToken", refreshToken, { expires: 3, path: "/" });
        Cookies.set("type", type, { expires: 3, path: "/" });
        // console.log("the cookies are",{ accessToken, refreshToken, type })
        // console.log(Cookies.get('type'))

        toast.success("Login Successfully")
        setTimeout(() => {
          window.location.href = '/';
        }, 1000)
      }

    } catch (error) {
      setErrorMessage('Failed to sign in. Please check your credentials.');
      toast.error("Failed to sign in. Please check your credentials.")
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (forgotEmail.current.value) {
      const response = await Axios.post('/vendor/forgot', {
        email: forgotEmail.current.value,
        type: "vendor",
      });
      if (response.status === 200) {
        toast.success("Password reset email sent successfully!");
        setIsPopupOpen(false);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className='bg-[#E9D1EC] min-h-screen flex flex-col items-center'>
      <div className='h-[18rem] sm:h-[25rem] xl:h-[33rem] xxl:h-[38rem] flex'>
        <img loading="lazy" src='./login.png' className='w-[100vw] object-contain' />
      </div>

      <div className='flex justify-center items-center pb-16 w-full'>
        <form onSubmit={handlevendor} className='-mt-48 bg-white w-[90%] sm:w-[28rem]
        flex flex-col justify-center items-center rounded-2xl pb-10 shadow-lg border border-gray-300'>
          <h1 className='font-serif font-bold text-2xl pt-12 pb-10'>Sign In for Vendor</h1>
          <div className='flex flex-col justify-center gap-8 w-full px-5'>
            <div className='flex flex-col justify-center gap-3'>
              <label htmlFor="email">Email*</label>
              <input ref={email} id="email" required className='border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Email' />
            </div>
            <div className='flex flex-col justify-center gap-3'>
              <label htmlFor="password">Password*</label>
              <input ref={password} id="password" required className='border border-gray-300 px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Password' />
            </div>
            <Link href='#' onClick={() => setIsPopupOpen(true)} className='text-sm text-blue-600 hover:underline'>Forgot Password?</Link>
            <div className='flex justify-center flex-col gap-6 items-center pt-5'>
              <button className='bg-[#45A7DE] text-white rounded-full w-[90%] flex justify-center items-center sm:w-64 py-2 transition-transform hover:scale-105' type='submit'>Sign In Vendor</button>
            </div>
          </div>

          {/* <p className='flex justify-center'>Or</p> */}
          {/* <div className='flex justify-center items-center flex-col gap-3'>
            <select
              value={selectedOption}
              onChange={handleSelectionChange}
              className="bg-[#D086AB] text-white flex justify-center rounded-full w-[90%] sm:w-64 py-2 cursor-pointer"
            >
              <option className="text-center" value="" disabled>
                Sign In as
              </option>
              <option className="text-center" value="/signin">Sign In as User</option>
              <option className="text-center" value="/signinngo">Sign In as NGO</option>
              <option className="text-center" value="/signup">Register as User</option>
              <option className="text-center" value="/vendorregister">Register as Vendor</option>
              <option className="text-center" value="/ngosignup">Register as NGO</option>
            </select>
          </div> */}
          <p className='text-center my-5'>Do not have an account? <Link href={"/vendorregister"} className='font-bold text-[#FF5900E5] '>SIGN UP HERE</Link></p>
        </form>
      </div>

      {/* Forgot Password Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-[90%] sm:w-[28rem] flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
            <label className="mb-2">Enter your email to reset password:</label>
            <input ref={forgotEmail} type="email" required className="border border-gray-400 p-2 mb-4 rounded-md" placeholder="Enter your email" />
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsPopupOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Cancel</button>
              <button onClick={handleForgotPassword} className="bg-blue-500 text-white py-1 px-4 rounded">Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
