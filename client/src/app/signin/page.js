"use client";
import Axios from '@/utils/axios';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
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

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("/user/login", {
        email: email.current.value,
        password: password.current.value
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, type, access } = response.data.data;
        // console.log(response.data.data)

        Cookies.set("accessToken", accessToken, { expires: 3, path: "/" });
        Cookies.set("refreshToken", refreshToken, { expires: 3, path: "/" });
        Cookies.set("type", type, { expires: 3, path: "/" }); 
        Cookies.set("access", access, { expires: 3, path: "/" }); 
        toast.success("Login Successfuly")

        // console.log("the cookies are",{ accessToken, refreshToken, type })
        // console.log(Cookies.get('type'))
        window.location.href = '/';
      }
    } catch (error) {
      toast.error("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (forgotEmail.current.value) {
      try {
        const response = await Axios.post('/user/forget', {
          email: forgotEmail.current.value,
          type: "user"
        });
        if (response.status === 200) {
          toast.success("Password reset email sent successfully! Check your email.");
          setIsPopupOpen(false);
        }
      } catch (error) {
        toast.error("Error sending password reset email.");
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div className='bg-[#E9D1EC]'>
      {/* Background image */}
      <div className='h-[18rem] sm:h-[25rem] xl:h-[33rem] xxl:h-[38rem] flex'>
        <img loading="lazy" src='./login.png' className='w-full object-cover' alt="Login Background" />
      </div>

      {/* Sign-in Form */}
      <div className='flex justify-center items-center pb-16'>
        <form onSubmit={handleSignin} className='-mt-48 bg-white w-[90%] sm:w-[28rem] 
        flex flex-col justify-center items-center rounded-2xl pb-10 shadow-lg border border-gray-300'>
          <h1 className='font-serif font-bold text-2xl pt-12 pb-10'>Sign In as User</h1>
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
              <button className='bg-[#45A7DE] text-white rounded-full w-[90%] flex justify-center items-center sm:w-64 py-2 transition-transform hover:scale-105' type='submit'>Sign In User</button>
            </div>
          </div>

          {/* Sign-in as other user types */}
          <p className='flex justify-center my-10'>Or</p>
          <div className='flex justify-center items-center flex-col gap-3'>
            <select
              value={selectedOption}
              onChange={handleSelectionChange}
              className="bg-[#D086AB] text-white flex justify-center rounded-full w-[90%] sm:w-64 py-2 cursor-pointer"
            >
              <option  className="text-center" value="" disabled>
                Sign In as
              </option>
              {/* <option className="text-center" value="/signinvendor">Sign In as Vendor</option> */}
              <option className="text-center" value="/signinngo">Sign In as NGO</option>
              <option className="text-center" value="/signup">Register as User</option>
              {/* <option className="text-center" value="/vendorregister">Register as Vendor</option> */}
              <option className="text-center" value="/ngosignup">Register as NGO</option>
            </select>
            {/* <Link href="../signinvendor" className='bg-[#D086AB] text-white flex justify-center items-center rounded-full w-[90%] sm:w-64 py-2 transition-transform hover:scale-105'>Sign In as Vendor</Link>
            <Link href="../signinngo" className='bg-[#D086AB] text-white flex justify-center items-center rounded-full w-[90%] sm:w-64 py-2 transition-transform hover:scale-105'>Sign In as NGO</Link>
            <Link href="../signup" className='bg-[#D086AB] text-white flex justify-center items-center rounded-full w-[90%] sm:w-64 py-2 transition-transform hover:scale-105'>Register as User</Link>
            <Link href="../vendorregister" className='bg-[#D086AB] text-white flex justify-center items-center rounded-full w-[90%] sm:w-64 py-2 transition-transform hover:scale-105'>Register as Vendor</Link>
            <Link href="../ngosignup" className='bg-[#D086AB] text-white flex justify-center items-center rounded-full w-[90%] sm:w-64 py-2 transition-transform hover:scale-105'>Register as NGO</Link> */}
            <p className='text-center'>Do not have an account? <Link href={"/signup"} className='font-bold text-[#FF5900E5]'>SIGN UP HERE</Link></p>
          </div>
        </form>
      </div>

      {/* Forgot Password Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-[90%] sm:w-[28rem] flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
            <label className="mb-2">Enter your email to reset password:</label>
            <input ref={forgotEmail} type="email" required className="border border-gray-400 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsPopupOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded transition-transform hover:scale-105">Cancel</button>
              <button onClick={handleForgotPassword} className="bg-blue-500 text-white py-1 px-4 rounded transition-transform hover:scale-105">Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;