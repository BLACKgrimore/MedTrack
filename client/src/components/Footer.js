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
        <p className='text-3xl md:text-4xl lg:text-6xl text-white text-center  md:text-left mb-4 md:mb-0'>
          "Let's Get in Touch!"
        </p>
        <Link href='/contactus'> <button className="text-lg md:text-xl lg:text-2xl bg-white p-2 rounded-full flex justify-center items-center gap-3 px-6 md:px-10 py-2 md:py-3 border border-black">
          Get Started <FaArrowRight />
        </button>
        </Link>
      </div>


      <footer className='flex flex-col  md:justify-center mb-8 mt-10  '>




        {/*  <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <p className='text-[#9B9B9C]'>
            We offer a comprehensive suite of event marketing services that cover all aspects of our online presence. From planning and social media marketing to content creation and PPC advertising, we have the expertise and resources to handle our diverse marketing needs.
          </p>
          <div className='flex gap-5 pt-5 text-2xl'>
            <CiFacebook />
            <FaTwitter />
            <CiLinkedin />
            <FaInstagram />
          </div>
          <div className='pt-10'>
            <img src='./footerlogo.png' alt='Footer Logo' />
          </div>
        </div> */}

        <div className='flex flex-col  msm:flex-row gap-1 justify-center md:gap-16 lg:gap-16 xl:gap-36'>
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Services</h1>
            <Link href='/marriage' className=' m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Wedding</Link>
            <Link href='/birthday' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Birthday</Link>
            <Link href='/babyshower' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Baby Shower</Link>
            <Link href='/searchresult' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Popular </Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Anniversary</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Festival decoration</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Product launching</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Cooperates Events</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Political Events</Link> */}
            <Link href='/pooja' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Pooja</Link>
            <Link href='/awardceremony' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Award Ceremony</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange '>Annual function</Link> */}
          </div>
          {/*   <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl'>wedding plan</h1>
            <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Event manager</Link>
            <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Hotels</Link>
            <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Marriage halls</Link>
            <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Home wedding decor</Link>

          </div> */}
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Individual booking</h1>
            <Link href='/babyshower' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Games</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Dj & Light</Link> */}
            <Link href='/marriage' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Dj</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Chef</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Wetter</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Crockery </Link> */}
            <Link href='/marriage' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Event manager</Link>
            <Link href='/marriage' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Dancer</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Mehendi Designer</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Beautician</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Singer</Link> */}
            <Link href='/birthday' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Stage decorator</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Marriage hall</Link> */}
            <Link href='/birthday' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Fashion designer</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Wedding Jewellery</Link> */}
            <Link href='/pooja' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Photographer & videographer</Link>

          </div>
          <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl text-white'>Link</h1>
            <Link href='/about' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>About Evego Event</Link>
            <Link href='/teams' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Our Team </Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Resources</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Office map </Link> */}
            <Link href='/tnc' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Terms and condition</Link>
            <Link href='/tncuser' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>User Terms and condition</Link>
            <Link href='/tncvendor' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Vendor Terms and condition</Link>
            <Link href='/tncngo' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Ngo Terms and condition</Link>
            <Link href='/privacypolicy' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Privacy Policy</Link>
            <Link href="https://wa.me/+918102692900" className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Help 24*7</Link>
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Cancellation Policy</Link> */}
            {/* <Link href='#' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange'>Vendor</Link> */}


          </div>
          {/*  <div className='flex flex-col gap-5 mb-8 md:mb-0'>
            <h1 className='font-bold text-xl'>Follow Us</h1>
            <Link href='https://www.facebook.com/profile.php?id=61556140173055' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'> <img src='/iconfooter/icons8-facebook-48.png'  width={30}/>Facebook</Link>
            <Link href='https://www.youtube.com/channel/UCqwqI8ZdskWt8xmMqkYwrcA' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-youtube-48.png' width={30}/>Youtube </Link>
            <Link href='https://x.com/EvegoEvent' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-twitter-24.png' width={30}/>Twitter</Link>
            <Link href='https://www.instagram.com/evego_event/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-instagram-64.png' width={30}/>Instagram </Link>
            <Link href='https://www.pinterest.com/evegoevent' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-pinterest-48.png' width={30}/>Pinterest</Link>
            <Link href='https://www.linkedin.com/company/evego-event-pvt-ltd/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-linkedin-48.png' width={30}/>Linkedin</Link>



          </div> */}
          {/*  <div className='flex flex-col gap-5'>
            <h1 className='font-bold text-xl'>Contact</h1>
            <div className='flex gap-2'>
              <IoCall className='text-2xl' />
              <p className='text-[#9B9B9C]'>00000000</p>
            </div>
            <div className='flex gap-2'>
              <MdEmail className='text-2xl' />
              <p className='text-[#9B9B9C]'>Hey@gmail.com</p>
            </div>
            <div className='flex gap-2'>
              <FaLocationDot className='text-2xl' />
              <p className='text-[#9B9B9C]'>Crossing, Nh-9,<br /> Ghaziabad, 201301</p>
            </div>
          </div> */}
        </div>


      </footer>
      <div className='flex justify-center flex-col items-center py-5  '>

        <Link href="/"><img loading="lazy" className="xsm:w-36 xsm:h-10 md:w-44 md:h-12" src='evegologo2.png' alt="Logo" /></Link>


        <p className='text-veryLightPink pt-3'>EXPERIENCE THE UNFORGETTABLE MOMENTS</p>
        
        
        <div className='flex sm:flex-row xsm:flex-col justify-center sm:gap-5 xsm:-ml-4 xsm:gap-4'>
          <Link href='https://www.facebook.com/profile.php?id=61556140173055' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'> <img src='/iconfooter/icons8-facebook-48.png' width={30} />Facebook</Link>
          <Link href='https://x.com/EvegoEvent' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-twitter-24.png' width={30} />Twitter</Link>
          <Link href='https://www.instagram.com/evego_event/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/ing.png' width={30} />Instagram </Link>
          <Link href='https://www.linkedin.com/company/evego-event-pvt-ltd/' className='m-0 p-0 text-[#9B9B9C] hover:text-lightorange flex items-center gap-1'><img src='/iconfooter/icons8-linkedin-48.png' width={30} />Linkedin</Link>
        </div>

        <p className='text-white pt-2'>Copyright &copy; 2024 All right are reserved</p>
        <a href='https://indibus.net/' target='_blank' className='text-white'>Managed By <strong className='text-gray-100 hover:text-red-200'>INDIBUS Softwares Solutions Pvt Ltd</strong></a>


      </div>

    </div>

  )

}

export default Footer