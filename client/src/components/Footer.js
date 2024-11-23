import React from 'react'
import { CiFacebook } from "react-icons/ci";
import { FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';

import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6"


const Footer = () => {
  return (
    <div className='px-5 bg-gray-800 py-1'>
      <div className='bg-[url("/footerimage.png")] bg-no-repeat bg-cover flex flex-col md:flex-row justify-around items-center h-44 md:h-56 mt-10 rounded-2xl p-4 md:p-8'>
        <p className='text-3xl md:text-4xl lg:text-6xl text-white text-center md:text-left mb-4 md:mb-0'>
          "Connect with the Pharmaceutical Experts!"
        </p>
        <Link href='/contactus'>
          <button className="text-lg md:text-xl lg:text-2xl bg-white p-2 rounded-full flex justify-center items-center gap-3 px-6 md:px-10 py-2 md:py-3 border border-black">
            Get Started <FaArrowRight />
          </button>
        </Link>
      </div>


      <footer className='flex flex-col md:justify-center mb-8 mt-10'>
        <div className='flex flex-col msm:flex-row gap-1 justify-center md:gap-16 lg:gap-16 xl:gap-36'>
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Services</h1>
            <Link href='/inventory-management' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Inventory Management</Link>
            <Link href='/medicine-supply' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Medicine Supply</Link>
            <Link href='/order-tracking' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Order Tracking</Link>
            <Link href='/wholesale-vendors' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Wholesale Vendors</Link>
            <Link href='/quality-control' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Quality Control</Link>
            <Link href='/customer-support' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Customer Support</Link>
          </div>
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Quick Links</h1>
            <Link href='/about' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>About Us</Link>
            <Link href='/teams' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Our Team</Link>
            <Link href='/contactus' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Contact Us</Link>
            <Link href='/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Terms & Conditions</Link>
            <Link href='/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Privacy Policy</Link>
          </div>
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Contact Us</h1>
            <div className='flex gap-2'>
              <IoCall className='text-2xl' />
              <p className='text-[#9B9B9C]'>+91 123 456 7890</p>
            </div>
            <div className='flex gap-2'>
              <MdEmail className='text-2xl' />
              <p className='text-[#9B9B9C]'>support@pharmasupply.com</p>
            </div>
            <div className='flex gap-2'>
              <FaLocationDot className='text-2xl' />
              <p className='text-[#9B9B9C]'>123 Pharma Street, City, Country</p>
            </div>
          </div>
        </div>
      </footer>


      <div className='flex justify-center flex-col items-center py-5'>
        <Link href="/"><img loading="lazy" className="xsm:w-36 xsm:h-10 md:w-44 md:h-12" src='/pharma-logo.png' alt="Logo" /></Link>
        <p className='text-veryLightPink pt-3'>Your Trusted Partner in Pharmaceutical Supply</p>
        <div className='flex sm:flex-row xsm:flex-col justify-center sm:gap-5 xsm:-ml-4 xsm:gap-4'>
          <Link href='https://www.facebook.com/pharmasupply' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'> <img src='/iconfooter/icons8-facebook-48.png' width={30} />Facebook</Link>
          <Link href='https://twitter.com/pharmasupply' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-twitter-24.png' width={30} />Twitter</Link>
          <Link href='https://www.instagram.com/pharmasupply' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-instagram-64.png' width={30} />Instagram</Link>
          <Link href='https://www.linkedin.com/company/pharmasupply' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-linkedin-48.png' width={30} />Linkedin</Link>
        </div>
        <p className='text-white pt-2'>Copyright &copy; 2024 All rights reserved</p>
        {/* <a href='https://indibus.net/' target='_blank' className='text-white'>Powered by IndiBus</a> */}
      </div>

    </div>

  )

}

export default Footer