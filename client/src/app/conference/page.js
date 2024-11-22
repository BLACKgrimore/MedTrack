'use client'
import React from 'react';
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { IoIosArrowDropleft } from "react-icons/io";
import { Plus_Jakarta_Sans } from 'next/font/google'
import { PiNumberCircleOneFill } from "react-icons/pi";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { TbCircleNumber4Filled } from "react-icons/tb";

const weddingsections = [
  { img: "/marriage/image35.png", title: "Ceremony Management", desc: "Includes setting up the ceremony site, organizing the processional and recessional." },
  { img: "/marriage/image36.png", title: "Reception Coordination", desc: "Includes coordinating speeches, first dances, meal service, and any other scheduled activities." },
  { img: "/marriage/image37.png", title: "Guest Assistance", desc: "Ensures guests feel welcomed and cared for throughout the event." },
  { img: "/marriage/image38.png", title: "Emergency Kit", desc: "Includes items like safety pins, sewing kit, band-aids, pain relievers, stain remover, and more." },
  { img: "/marriage/image39.png", title: "Setup and Tear Down", desc: "Includes ensuring the venue is restored to its original condition if required." },
  { img: "/marriage/image40.png", title: "Bride and Groom Assistance", desc: "Includes helping with attire adjustments, managing personal items, and providing refreshments." },
  { img: "/marriage/image41.png", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
  { img: "/marriage/image41.png", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
  // { img: "/marriage/image42.png", title: "Catering and Bar Management", desc: "Includes managing the serving schedule, dealing with any dietary needs, so all guests are served properly." },
  { img: "/marriage/image43.png", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
]

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })

const cinematographySectionOptions = [
  { img: "/marriage/image30.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image31.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image32.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image33.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image34.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image35.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image30.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/image31.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
]

const vendors = [{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
{ img: "/marriage/image10.png", title: "Event Planners" },
]

const venues = [{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
{ img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
]

const Conference = () => {

  const [sliderPositions, setSliderPositions] = useState({
    slider1: 0,
    slider2: 0,
    slider3: 0,
    slider4: 0,
    slider5: 0
  });

  const [dotIndices, setDotIndices] = useState({
    slider1: 0,
    slider2: 0,
    slider3: 0,
    slider4: 0,
    slider5: 0
  });

  const imageWidth = 20; // Width of each image in rem, adjust as needed
  const maxDots = 5; // Maximum number of dots to display
  const visibleImages = 5; // Number of visible images based on screen width
  const maxSliderPos = -(imageWidth * (venues.length - visibleImages));

  const handleLeftClick = (sliderName) => {
    if (dotIndices[sliderName] > 0) {
      setSliderPositions((prev) => ({
        ...prev,
        [sliderName]: prev[sliderName] + imageWidth
      }));
      setDotIndices((prev) => ({
        ...prev,
        [sliderName]: prev[sliderName] - 1
      }));
    } else {
      setSliderPositions((prev) => ({
        ...prev,
        [sliderName]: maxSliderPos
      }));
      setDotIndices((prev) => ({
        ...prev,
        [sliderName]: venues.length - visibleImages
      }));
    }
  };

  const handleRightClick = (sliderName) => {
    if (dotIndices[sliderName] < venues.length - visibleImages) {
      setSliderPositions((prev) => ({
        ...prev,
        [sliderName]: prev[sliderName] - imageWidth
      }));
      setDotIndices((prev) => ({
        ...prev,
        [sliderName]: prev[sliderName] + 1
      }));
    } else {
      setSliderPositions((prev) => ({
        ...prev,
        [sliderName]: 0
      }));
      setDotIndices((prev) => ({
        ...prev,
        [sliderName]: 0
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick('slider1');
    }, 3000); // Automatically move the first slider every 3 seconds

    return () => clearInterval(interval);
  }, [sliderPositions.slider1, dotIndices.slider1]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick('slider2');
    }, 2000); // Automatically move the first slider every 3 seconds

    return () => clearInterval(interval);
  }, [sliderPositions.slider2, dotIndices.slider2]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick('slider3');
    }, 2000); // Automatically move the first slider every 3 seconds

    return () => clearInterval(interval);
  }, [sliderPositions.slider3, dotIndices.slider3]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick('slider4');
    }, 2000); // Automatically move the first slider every 3 seconds

    return () => clearInterval(interval);
  }, [sliderPositions.slider4, dotIndices.slider4]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick('slider5');
    }, 2000); // Automatically move the first slider every 3 seconds

    return () => clearInterval(interval);
  }, [sliderPositions.slider5, dotIndices.slider5]);

  const displayedDots = Math.min(maxDots, venues.length);


  return (
    <div className="">
      <div className='bg-[url("/conference/pic1.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col 
                            justify-center items-start py-8 xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[20rem] md:h-[30rem] 
                            lg:h-[30rem] gap-8'>
        <h1 className="flex self-center md:text-6xl xsm:text-3xl font-semibold shadow-2xl">Events Conference</h1>
      </div>

      <div className="flex md:flex-row xsm:flex-col-reverse my-3 mx-0 p-10">
        <div className="md:w-2/4 flex flex-col space-y-4 text-lg text-left  md:text-lg lg:text-2xl leading-relaxed text-gray-500 font-bold ">
          <h1 className="text-5xl font-semibold text-black">Invest in Yourself</h1>
          <p className="text-xl leading-relaxed text-gray-500 font-bold justify-start">
            We believe that the greatest investment you can make is in your own growth and development. Our conferences and events are designed to provide you with unparalleled opportunities to learn, network, and evolve both personally and professionally.
          </p>
        </div>

        <div className="md:w-2/4 flex flex-col h-fit self-center items-center justify-center py-4 lg:flex-row sm:flex-col ">
          <img loading="lazy" src="/conference/pic2.png" alt="conference" className="flex flex-col w-[20rem] h-[20rem] self-center" />
        </div>
      </div>

      <div className="bg-red-600 w-full h-fit p-10">
        <div className="w-full h-fit">
          <div className="flex lg:flex-row xsm:flex-col lg:space-y-0 xsm:space-y-4 py-4 justify-evenly text-center items-center">

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

            <div className="rounded-full gap-2 flex flex-col justify-center items-center border-solid border-white border-2 w-[10rem] h-[10rem]">
              <h1 className="h-fit lg:text-6xl xsm:text-4xl text-white font-bold ">20+</h1>
              <h1 className=" font-semibold text-md text-black ">Speakers</h1>
            </div>

          </div>
        </div>

      </div>

      {/* Venue Categories */}
      <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
        <div className='mb-8 lg:mb-12'>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div>
              <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                Venue Categories <FaArrowRight className='ml-3' />
              </h1>
              <p className='max-w-xl lg:max-w-2xl mt-3'>
                Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
              </p>
            </div>
            <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
              <FiArrowLeftCircle className='mr-4 cursor-pointer'  onClick={() => handleLeftClick('slider3')} />
              <FiArrowRightCircle className='cursor-pointer'  onClick={() => handleRightClick('slider3')} />
            </div>
          </div>
          <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
            <div
              id='slider2'
              className={`flex w-full absolute transition-all top-10`}
              style={{ left: `${sliderPositions.slider3}rem` }}
            >
              {venues.map((venue, index) => (
                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                  <Image loading="lazy" className='select-none' src={venue.img} height={300} width={300} />
                  <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                  <p className='text-xs m-0'>{venue.desc}</p>
                </div>
              ))}
            </div>
            <div className='h-[10em] sm:h-[15em] lg:h-[20em]'></div>
            <div className='flex w-full justify-center'>
              {Array.from({ length: displayedDots }, (_, i) => (
                <span
                  key={i}
                  onClick={() => {
                    const newPos = -imageWidth * i;
                    setSliderPositions((prev) => ({
                      ...prev,
                      slider3: newPos
                    }));
                    setDotIndices((prev) => ({
                      ...prev,
                      slider3: i
                    }));
                  }}
                  className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider3 === i ? 'bg-yellow-500' : ''
                    }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-pop-ven bg-cover h-fit">

        {/* VENDER CATEGORIES */}
        <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
          <div className='mb-8 lg:mb-12'>
            <div className='flex flex-col lg:flex-row justify-between'>
              <div>
                <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                  Venue Categories <FaArrowRight className='ml-3' />
                </h1>
                <p className='max-w-xl lg:max-w-2xl mt-3'>
                  Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
                </p>
              </div>
              <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                <FiArrowLeftCircle className='mr-4 cursor-pointer'  onClick={() => handleLeftClick('slider2')} />
                <FiArrowRightCircle className='cursor-pointer'  onClick={() => handleRightClick('slider2')} />
              </div>
            </div>
            <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
              <div
                id='slider2'
                className={`flex w-full absolute transition-all top-10`}
                style={{ left: `${sliderPositions.slider2}rem` }}
              >
                {venues.map((venue, index) => (
                  <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                    <Image loading="lazy" className='select-none' src={venue.img} height={300} width={300} />
                    <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                    <p className='text-xs m-0'>{venue.desc}</p>
                  </div>
                ))}
              </div>
              <div className='h-[10em] sm:h-[15em] lg:h-[20em]'></div>
              <div className='flex w-full justify-center'>
                {Array.from({ length: displayedDots }, (_, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      const newPos = -imageWidth * i;
                      setSliderPositions((prev) => ({
                        ...prev,
                        slider2: newPos
                      }));
                      setDotIndices((prev) => ({
                        ...prev,
                        slider2: i
                      }));
                    }}
                    className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider2 === i ? 'bg-yellow-500' : ''
                      }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-fit bg-transparent">
          <div className="px-10 h-full mx-auto flex flex-col py-10">
            <div className={`${plus_Jakarta_Sans.className}`}>

              <div className='grid md:grid-cols-3 grid-cols-1 gap-9'>

                <div className='md:col-span-2 h-56 rounded-lg relative bg-book gap-8 group bg-cover bg-center flex flex-col justify-center items-center'>
                  <div className='text-white flex justify-center items-end font-extrabold sm:text-4xl w-full h-full text-xl'>Book a vendor in simple steps :</div>
                  <div className='text-white flex justify-center items-start font-extrabold w-full h-full'>
                    <h1 className="md:text-6xl xsm:text-5xl">1</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                    <h1 className="md:text-6xl xsm:text-5xl">2</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                    <h1 className="md:text-6xl xsm:text-5xl">3</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                  </div>
                </div>

                <div className='md:col-span-1 p-6 bg-transparent rounded-lg h-56 w-full flex flex-col justify-between' style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
                  <div className='flex flex-col'>
                    <span className='text-4xl text-white font-extrabold'>920+</span>
                    <span className='font-light text-sm'>Project finish with superbly</span>
                  </div>
                  <div className='flex items-center justify-start'>
                    {Array.from(Array(4).keys()).map(() => {
                      return (
                        <Image loading="lazy" className='rounded-full md:h-9 md:w-9' src={"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"} height={30} width={30} />
                      )
                    })}
                    <span className='text-4xl text-white'>+</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#db1721] w-full h-fit flex-row p-10">
        <h1 className="md:text-4xl xsm:text-3xl text-center font-bold text-white">Meet Keynotes Speakers</h1>

        <div className="flex md:flex-row xsm:space-y-12 md:space-y-0 xsm:flex-col justify-around text-center items-center py-8">

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>



        </div>

        <div className="flex md:flex-row xsm:flex-col xsm:space-y-12 md:space-y-0 justify-around text-center items-center py-8">

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>

          <div>

            <div className="border-2">
              <img loading="lazy" src="/conference/g1.png" alt="image" />
            </div>

            <div className="text-center space-y-1">
              <h2 className=" text-white">Sheenam</h2>
              <h3 className=" text-white">CEO Director</h3>

              <div className="flex flex-row justify-evenly items-center ">

                <div className="bg-white rounded-full p-1">
                  <FaTwitter className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaFacebook className="w-7 h-7 text-red-600 " />
                </div>

                <div className="bg-white rounded-full p-1">
                  <FaInstagram className="w-7 h-7 text-red-600 " />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="md:p-8 xsm:p-4 h-fit">

        <div className="h-fit md:bg-fixed xsm:bg-contain xsm:bg-no-repeat">
          <div className="grid h-fit md:grid-cols-2 md:grid-rows-1 xsm:grid-cols-1 xsm:grid-rows-2 md:p-10 xsm:p-4 md:gap-6 gap-4">
            <div className="grid grid-cols-1 p-10">
              <h1 className="lg:text-6xl sm:text-5xl xsm:text-3xl font-bold text-left">Why Your should Join Event</h1>
              <p className="text-left">Joining the event business can offer a dynamic
                and fulfilling career path for those who enjoy working in a fast-paced,environment and are passionate about bringing people  to create memorable experiences.</p>
              <div className="flex flex-row gap-6 items-center">
                <span><FaCircle className="w-14 text-[#db1721] h-14" /></span>
                <span><FaCircle className="w-10 text-[#db1721] h-10" /></span>
                <span><FaCircle className="w-6 text-[#db1721] h-6" /></span>
              </div>
            </div>

            <div className="grid grid-cols-1 p-2 md:gap-6 gap-8 items-end">

              <div className="grid grid-rows-1 md:p-4 xsm:p-0 xsm:mr-40 md:gap-6 gap-8">

                <div className="flex flex-col flex-wrap gap-2 w-full">
                  <div className="flex md:flex-row gap-4 w-full">
                    <div className='h-fit relative group bg-white drop-shadow-lg bg-center flex flex-col cursor-pointer'>
                      <div className='text-black font-bold z-10 p-4 xsm:text-xl md:text-2xl'>Networking</div>
                      <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                      <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-[#db1721] rounded-full'>
                        <PiNumberCircleOneFill className="w-12 h-12" />
                      </span>
                    </div>

                    <div className='h-fit relative m-6 group bg-white drop-shadow-lg bg-center flex flex-col cursor-pointer'>
                      <div className='text-black font-bold z-10 p-4 xsm:text-xl md:text-2xl'>Networking</div>
                      <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                      <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-[#db1721] rounded-full'>
                        <TbCircleNumber2Filled className="w-12 h-12" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className='h-fit relative group bg-white bg-center drop-shadow-lg flex flex-col cursor-pointer'>
                      <div className='text-black font-bold z-10 p-4 xsm:text-xl md:text-2xl'>Networking</div>
                      <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                      <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-[#db1721] rounded-full'>
                        <TbCircleNumber3Filled className="w-12 h-12" />
                      </span>
                    </div>

                    <div className='h-fit relative m-6 group bg-white bg-center drop-shadow-lg flex flex-col cursor-pointer'>
                      <div className='text-black font-bold z-10 p-4 xsm:text-xl md:text-2xl'>Networking</div>
                      <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                      <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-[#db1721] rounded-full'>
                        <TbCircleNumber4Filled className="w-12 h-12" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:p-10 xsm:p-5 xsm:py-6">
        <div className="grid grid-cols-2 w-full md:h-fit xsm:h-fit md:gap-7 xsm:gap-3">
          <div className="grid grid-cols-1 bg-lime-400">

          </div>
          <div className="grid grid-cols-1">

            <div className="grid grid-rows-2 w-full md:h-fit xsm:h-fit md:gap-7 xsm:gap-3">
              <div className="grid grid-rows-1 ">

                <div className="grid grid-cols-2 w-full md:h-[36vh] xsm:h-[20vh] md:gap-7 xsm:gap-3">
                  <div className="grid grid-cols-1 bg-gray-500">

                  </div>
                  <div className="grid grid-cols-1 bg-red-300">

                  </div>
                </div>

              </div>
              <div className="grid grid-rows-2 row-span-2 bg-orange-400">

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Conference;