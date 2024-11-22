'use client'
import React from 'react'
import Image from 'next/image'
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { IoIosArrowDropleft } from "react-icons/io";
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { PiNumberCircleOneFill } from "react-icons/pi";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { TbCircleNumber4Filled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const handleFilterChange = (e) => {
  const { name, value, checked } = e.target
  if (name === 'budget') {
    setFilter({ ...filter, budget: value })
  } else {
    setFilter({
      ...filter,
      [name]: checked
        ? [...filter[name], value]
        : filter[name].filter((v) => v !== value),
    })
  }
}

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })


const services = [
  {
    url: "url('/reviewsImgs/image3.png')",
    title: "Venue Selection",
    desc: "Assistance in finding "
  }, {
    url: "url('/service-section/image4.png')",
    title: "Entertainment",
    desc: "Entertainment arrangement"
  }, {
    url: "url('/service-section/image5.png')",
    title: "Decor and Theming",
    desc: "Professional "
  }, {
  }, {
    url: "url('/service-section/image5.png')",
    title: "Decor and Theming",
    desc: "Professional "
  }, {
  // {
  //   url: "url('/service-section/image6.png')",
  //   title: "Catering ",
  //   desc: "Comprehensive "
  // },
   
    url: "url('/service-section/image7.png')",
    title: "Photography ",
    desc: "Capturing moments "
  }, {
    url: "url('/service-section/image8.png')",
    title: "Event Coordination ",
    desc: "Full event management "
  },
]

const plans = [{
  title: "Silver Plan",
  price: "$100",
  desc: "One Time Installation",
  benefits: ['Wedding Planning', 'Photography', 'Dresses', 'Shoes', 'Bouquets']
}, {
  title: "Silver Plan",
  price: "$100",
  desc: "One Time Installation",
  benefits: ['Wedding Planning', 'Photography', 'Dresses', 'Shoes', 'Bouquets'],
  scale: true
}, {
  title: "Silver Plan",
  price: "$100",
  desc: "One Time Installation",
  benefits: ['Wedding Planning', 'Photography', 'Dresses', 'Shoes', 'Bouquets']
}]

const images = [
  '/pooja/pooja.png',
  '/pooja/pooja.png',
  '/pooja/pooja.png',
  '/pooja/pooja.png',
  '/pooja/pooja.png',
  '/pooja/pooja.png',
]

const Pooja = () => {

  const router = useRouter()
  const handleVenue = () => {
    const serviceValue = 'Pooja' || '';
    router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }

  const handlePhotography = () => {
    const serviceValue = 'Photography' || '';
    router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handleDj = () => {
    const serviceValue = 'Dj' || '';
    router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }


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
    <div className="flex flex-col pt-10 bg-[#ffd2a8]">

      <div className='bg-[url("/birthday/hero.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col 
                            justify-center items-start py-8 xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[100vh] md:h-[30rem] 
                            lg:h-[30rem] gap-8'>
        <h1 className="xsm:text-3xl justify-start pl-[10vw] sm:text-5xl md:text-4xl font-semibold lg:text-4xl 
                        xl:text-6xl">"The Premier Event Service Platform in India"</h1>
      </div>

      <div className="h-fit md:bg-fixed xsm:bg-contain xsm:bg-no-repeat">
        <div className="grid h-fit md:grid-cols-2 md:grid-rows-1 xsm:grid-cols-1 xsm:grid-rows-2 p-10 md:gap-6 gap-4">
          <div className="grid bg-pooja bg-cover bg-fixed grid-cols-1 p-10">

          </div>

          <div className="grid grid-cols-1 p-2 md:gap-6 gap-8 items-end">

            <h1 className="text-right md:text-4xl xsm:text-xl font-bold ">Divine Moments, Your Way - The Ultimate Tool for All Your
              Pooja & Jagran Needs</h1>
            <p className="text-right  flex flex-row justify-end">Create a Divine Celebration, Your Way - Best Online Pooja and Jagran Planner for All Your Spiritual Needs</p>
            {/*  <div className="flex flex-col items-end">
              <Link href='/services'><button className='border my-5 w-fit border-black px-5 py-3 font-bold rounded-full hover:bg-black hover:text-white transition-all'>Explore more</button></Link>
            </div> */}
            <div className="grid grid-rows-1 md:p-4 xsm:p-0 xsm:mr-40 md:gap-6 gap-8">

              <div className="flex flex-col flex-wrap gap-2 w-full">
                <div className="flex md:flex-row xsm:flex-col gap-4 w-full">
                  <div className='h-fit relative group bg-white drop-shadow-lg bg-center flex flex-col cursor-pointer'>
                    <div className='text-black font-extrabold z-10 p-4 sm:text-lg text-xl'>Networking</div>
                    <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                    <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-yellow-300 rounded-full'>
                      <PiNumberCircleOneFill className="w-12 h-12" />
                    </span>
                  </div>

                  <div className='h-fit relative m-6 group bg-white drop-shadow-lg bg-center flex flex-col cursor-pointer'>
                    <div className='text-black font-extrabold z-10 p-4 sm:text-lg text-xl'>Networking</div>
                    <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                    <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-yellow-300 rounded-full'>
                      <TbCircleNumber2Filled className="w-12 h-12" />
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-row xsm:flex-col gap-4">
                  <div className='h-fit relative group bg-white bg-center drop-shadow-lg flex flex-col cursor-pointer'>
                    <div className='text-black font-extrabold z-10 p-4 sm:text-lg text-xl'>Networking</div>
                    <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                    <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-yellow-300 rounded-full'>
                      <TbCircleNumber3Filled className="w-12 h-12" />
                    </span>
                  </div>

                  <div className='h-fit relative m-6 group bg-white bg-center drop-shadow-lg flex flex-col cursor-pointer'>
                    <div className='text-black font-extrabold z-10 p-4 sm:text-lg text-xl'>Networking</div>
                    <p className="px-4 max-w-64">fulfilling career path for those who enjoyworking in a fast-paced</p>
                    <span className='absolute -bottom-3 -right-3 bg-[#ffffff] overflow-auto text-yellow-300 rounded-full'>
                      <TbCircleNumber4Filled className="w-12 h-12" />
                    </span>
                  </div>
                </div>

              </div>



            </div>

          </div>

        </div>
      </div>

      {/* circle slider */}
      <div className='px-4 sm:px-8 lg:px-12'>
        <div className=''>
          <div className='flex flex-col lg:flex-row justify-between'>
          </div>
          <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
            <div
              id='slider2'
              className={`flex w-full absolute transition-all top-0`}
              style={{ left: `${sliderPositions.slider1}rem` }}            >
              {venues.map((venue, index) => (
                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 '>
                  <Image loading="lazy" className='select-none rounded-[50%] h-48 w-48' src={venue.img} height={250} width={250} />
                  <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                </div>
              ))}
            </div>
            <div className='h-[10em] xsm:h-[17em] lg:h-[17em]'></div>
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
              <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider3')} />
              <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider3')} />
            </div>
          </div>
          <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
            <div
              id='slider2'
              className={`flex w-full absolute transition-all top-10`}
              style={{ left: `${sliderPositions.slider3}rem` }}
              onClick={() => handleVenue()}
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
        {/*  <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
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
        </div> */}

        <div className="w-full h-fit bg-transparent">
          <div className="px-10 h-full mx-auto flex flex-col py-10">
            <div className={`${plus_Jakarta_Sans.className}`}>

              <div className='grid md:grid-cols-3 grid-cols-1 gap-9'>

                <div className='md:col-span-2 h-56 rounded-lg relative bg-book gap-8 group bg-cover bg-center flex flex-col justify-center items-center'>
                  <div className='text-white flex justify-center items-end font-extrabold sm:text-4xl w-full h-full text-xl'>Easily book your preferred vendor</div>
                  <div className='text-white flex justify-center items-start font-extrabold w-full h-full'>
                    <h1 className="md:text-6xl xsm:text-5xl">1</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                    <h1 className="md:text-6xl xsm:text-5xl">2</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                    <h1 className="md:text-6xl xsm:text-5xl">3</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                  </div>
                </div>

                <div className='md:col-span-1 p-6 bg-transparent rounded-lg h-56 w-full flex flex-col justify-between' style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
                  <div className='flex flex-col'>
                    <span className='text-4xl text-white font-extrabold'>20+</span>
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

      <div className="bg-[url(/pooja/desbg.png)] bg-cover bg-fixed">
        <div className="p-10">
          <div className='grid md:grid-cols-2 md:grid-rows-1 xsm:grid-rows-2 xsm:space-y-8 md:gap-5 gap-2'>

            <div className='grid grid-cols-1 md:gap-5 gap-2 xsm:gap-8' >
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold pt-4">Our  work  Description</h1>
                <p>Evego Event is a premier devotional event organizer known for conducting
                  religious gatherings with utmost devotion and respect. Our work has been
                  celebrated in state newspapers across UP, Bihar, Rajasthan, and Haryana.<br />
                  From our humble beginnings, we have grown to a team of over 300 dedicated
                  members. We provide comprehensive services for Mata ki Chowki, Mata ka
                  Jagran, and Bhajan Sandhya, including talented singers, instruments, sound
                  systems, and Jhanki. Our exceptional service has clients inviting us back time
                  and again.</p>
              </div>
              <div className="grid grid-cols-2 p-5 text-black text-lg font-semibold bg-slate-100 bg-opacity-40 rounded-3xl">
                <div className='grid grid-cols-1 md:gap-2 xsm:gap-5'>
                  <h1 className="text-black text-lg font-semibold">Ratings & Reviews</h1>
                  <div className="flex md:flex-row flex-wrap gap-2">
                    <h1>3.7/5</h1>
                    <FaStar className="text-yellow-400 text-2xl" />
                    <FaStar className="text-yellow-400 text-2xl" />
                    <FaStar className="text-yellow-400 text-2xl" />
                    <FaStar className="text-yellow-400 text-2xl" />
                    <FaStar className="text-white outline-black text-2xl" />
                  </div>
                  <h1>Reviewed by 13 Users</h1>
                </div>

                <div className='grid grid-cols-1'>
                  <div className="flex flex-row gap-3">
                    <h1>5</h1>
                    <FaStar className="text-2xl text-gray-400 " />
                    <div className="w-full">
                      <div className="shadow w-full bg-grey-light">
                        <div className="bg-[#13eb00] rounded-full text-xs leading-none py-1 text-center text-white w-[91%]">61%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3">
                    <h1>4</h1>
                    <FaStar className="text-2xl text-gray-400 " />
                    <div className="w-full">
                      <div className="shadow w-full bg-grey-light">
                        <div className="rounded-full text-xs leading-none py-1 items-center justify-center flex text-center text-white w-[80%]">0%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3">
                    <h1>3</h1>
                    <FaStar className="text-2xl text-gray-400 " />
                    <div className="w-full">
                      <div className="shadow w-full bg-grey-light">
                        <div className="bg-[#13eb00] rounded-full text-xs leading-none py-1 text-center text-white w-[38%]">8%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3">
                    <h1>2</h1>
                    <FaStar className="text-2xl text-gray-400 " />
                    <div className="w-full">
                      <div className="shadow w-full bg-grey-light">
                        <div className=" rounded-full text-xs leading-none py-1 text-center text-white w-[81%]">0%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3">
                    <h1>1</h1>
                    <FaStar className="text-2xl text-gray-400 " />
                    <div className="w-full">
                      <div className="shadow w-full bg-grey-light">
                        <div className="bg-[#eb0000] rounded-full text-xs leading-none py-1 text-center text-white w-[6%]">3%
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:gap-5 gap-2 xsm:gap-8' >

              <h1 className="flex lg:justify-center xsm:justify-start items-center text-4xl font-bold md:text-white xsm:text-black">Additional Information</h1>
              <div className="flex flex-col items-center ">
                <div className="flex flex-row justify-center items-center gap-8 lg:text-white xsm:text-black text-xl cursor-pointer" onClick={() => handleVenue()}>
                  <Image loading="lazy" className="rounded-xl" src="/birthday/photo.png" alt="Baleey Musics" width={150} height={100}></Image>
                  <h1>Navratri</h1>
                </div>
                <div>
                  <h1 className="md:flex xsm:hidden pl-32 font-bold">______________________________</h1>
                  <h1 className="md:hidden xsm:flex">______________________________</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 lg:text-white xsm:text-black text-xl cursor-pointer" onClick={() => handleVenue()}>
                  <Image loading="lazy" className="rounded-xl" src="/birthday/photo.png" alt="Baleey Musics" width={150} height={100}></Image>
                  <h1>Navratri</h1>
                </div>
                <div>
                  <h1 className="md:flex xsm:hidden pl-32 font-bold">______________________________</h1>
                  <h1 className="md:hidden xsm:flex">______________________________</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 lg:text-white xsm:text-black text-xl cursor-pointer" onClick={() => handleVenue()}>
                  <Image loading="lazy" className="rounded-xl" src="/birthday/photo.png" alt="Baleey Musics" width={150} height={100}></Image>
                  <h1>Navratri</h1>
                </div>
                <div>
                  <h1 className="md:flex xsm:hidden pl-32 font-bold">______________________________</h1>
                  <h1 className="md:hidden xsm:flex">______________________________</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 lg:text-white xsm:text-black text-xl cursor-pointer" onClick={() => handleVenue()}>
                  <Image loading="lazy" className="rounded-xl" src="/birthday/photo.png" alt="Baleey Musics" width={150} height={100}></Image>
                  <h1>Navratri</h1>
                </div>
                <div>
                  <h1 className="md:flex xsm:hidden pl-32 font-bold">______________________________</h1>
                  <h1 className="md:hidden xsm:flex">______________________________</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-8 lg:text-white xsm:text-black text-xl cursor-pointer" onClick={() => handleVenue()}>
                  <Image loading="lazy" className="rounded-xl" src="/birthday/photo.png" alt="Baleey Musics" width={150} height={100}></Image>
                  <h1>Navratri</h1>
                </div>
                <div>
                  <h1 className="md:flex xsm:hidden pl-32 font-bold">______________________________</h1>
                  <h1 className="md:hidden xsm:flex">______________________________</h1>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/*  <div className="p-5 bg-[#ffba89]">
        <div className=" bg-[#ffba89] flex flex-col items-center">
          <div className="">
            <div className="flex ">
              <aside className="md:w-1/4 xsm:w-1/3 bg-[#ffdfb9] p-4 rounded-lg shadow-lg">
                <Image loading="lazy" src="/footerlogo.png" alt="LOGO" width={300} height={200} className="rounded-lg" />
                <h2 className="text-xl font-semibold pt-3 mb-4">Filter By</h2>
                <div>
                  <h3 className="font-semibold">Banner Type</h3>
                  {['Flyers', 'Covers', 'Social Media Graphics', 'Menus', 'Print Banners', 'Invitations'].map((type) => (
                    <div key={type} className="mt-2">
                      <input
                        type="checkbox"
                        id={type}
                        name="bannerType"
                        value={type}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Locality</h3>
                  {['Noida', 'Delhi', 'Lucknow', 'Mathura', 'Agra'].map((loc) => (
                    <div key={loc} className="mt-2">
                      <input
                        type="checkbox"
                        id={loc}
                        name="locality"
                        value={loc}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor={loc}>{loc}</label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Venue Budget</h3>
                  {['Less than 1K', '1-5K', '5-10K', '10-15K', '15-30K'].map((budget) => (
                    <div key={budget} className="mt-2">
                      <input
                        type="radio"
                        id={budget}
                        name="budget"
                        value={budget}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor={budget}>{budget}</label>
                    </div>
                  ))}
                </div>
              </aside>
              <main className="w-11/12 h-fit pl-8">
                <h1 className="text-4xl font-bold mb-6">Our Personalized Invitation and Banner Designs</h1>
                <div className="space-y-6">
                  {[{
                    id: 1,
                    name: 'Innoblitz Tech & Systems Pvt. Ltd',
                    location: 'Dwarka, Delhi',
                    price: 'Rs. 800 /page',
                    rating: 5.0,
                    reviews: 20,
                    imgSrc: '/herosec.png'
                  }, {
                    id: 2,
                    name: 'Innoblitz Tech & Systems Pvt. Ltd',
                    location: 'Velachery, Chennai',
                    price: 'Rs. 499 /Banner Design',
                    rating: 4.5,
                    reviews: 30,
                    imgSrc: '/herosec.png'
                  }, {
                    id: 3,
                    name: 'Innoblitz Tech & Systems Pvt. Ltd',
                    location: 'Anna Nagar, Chennai',
                    price: 'Rs. 1500 /Banner',
                    rating: 5.0,
                    reviews: 16,
                    imgSrc: '/herosec.png'
                  }].map((banner) => (
                    <div key={banner.id} className="bg-[#ffdfb9] py-6 rounded-lg w-11/12 shadow-lg flex lg:flex-row xsm:flex-col justify-center items-center">
                      <div className="md:w-1/3 xsm:w-2/3 pb-2 flex justify-center items-center">
                        <Image loading="lazy" src={banner.imgSrc} alt={banner.name} width={290} height={200} className="" />
                      </div>
                      <div className=" pl-6">
                        <h2 className="md:text-2xl xsm:text-xl font-semibold">{banner.name}</h2>
                        <p className="text-gray-600">{banner.location}</p>
                        <p className="md:text-xl xsm:text-lg font-bold mt-2">{banner.price}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">&#9733;</span>
                          <span className="ml-2 text-gray-600">{banner.rating} ({banner.reviews} reviews)</span>
                        </div>
                        <div className=" md:text-md xsm:text-sm space-y-2 pt-2 gap-6">
                          <button className="px-4 py-2 bg-gray-200 md:text-md xsm:text-sm text-gray-800 rounded-full">Event for Jagran</button>
                          <button className="px-4 py-2 bg-gray-200 md:text-md xsm:text-sm text-gray-800 rounded-full">Sundar Kand Path</button>
                        </div>
                       <Link href='/contactus'> <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Send Message</button></Link>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div> */}


      <div className="p-10">
        <p className="lg:text-6xl md:text-2xl flex justify-center font-bold">Gallery</p>

        <div className='grid grid-rows-1 md:gap-5 gap-2 mt-12'>
          <div className='grid grid-cols-3 md:gap-5 gap-2' >

            <div className='md:min-h-[80vh] min-h-[50vh] bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>

            <div className='grid grid-cols-1 md:gap-5 gap-2' >
              <div className='md:min-h-[33vh] min-h-[25vh] col-span-2 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
              <div className='md:min-h-[33vh] min-h-[25vh] col-span-2 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image2.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
              <div className='grid grid-cols-2 md:gap-5 gap-2' >
                <div className='md:min-h-[33vh] min-h-[25vh] min-w-[13vw] col-span-1 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                <div className='md:min-h-[33vh] min-h-[25vh] min-w-[13vw] col-span-1 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image2.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:gap-5 gap-2' >
              <div className='grid grid-cols-2 md:gap-5' >
                <div className='md:min-h-[33vh] min-h-[25vh] min-w-[13vw] col-span-1 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                <div className='md:min-h-[33vh] min-h-[25vh] min-w-[13vw] col-span-1 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image2.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
              </div>
              <div className='md:min-h-[33vh] min-h-[27vh] col-span-2 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
              <div className='md:min-h-[33vh] min-h-[27vh] col-span-2 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image2.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
            </div>

          </div>
        </div>

      </div>


      <div className="min-w-80 flex lg:flex-row xsm:flex-col xsm:justify-center xsm:items-center md:h-fit xsm:max-h-[8remw]
               lg:p-10 xsm:p-0 lg:py-0 xsm:py-4 text-white bg-cover bg-center bg-no-repeat bg-book ">


        <div className='lg:w-[50vw] xsm:w-[80vw] flex flex-col justify-center mt-12'>
          <div>
            <h1 className='md:text-5xl text-3xl pb-8 font-semiboldbold'>Photography</h1>
            <h1 className='md:text-sm text-3xl pb-8 '>Preserving Divine Moments - Our cinematography service expertly captures the
              spiritual essence of your pooja, ensuring that every cherished moment is forever
              treasured in high-definition video, allowing you to revisit and experience the
              sacredness for years to come</h1>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={() => handlePhotography()}>
              {services.slice(0, 3).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[70em] w-full'>
                  <div className='xlg:h-40 lg:h-32 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm m-0 mx-auto text-[#d08282]'>{service.desc}</p>

                </div>
              })}
            </div>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={() => handlePhotography()}>
              {services.slice(3, 6).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[70em] w-full'>
                  <div className='xlg:h-40 lg:h-32 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm mx-auto text-[#d08282]'>{service.desc}</p>

                </div>
              })}
            </div>
          </div>
        </div>

        <div className="lg:w-[50vw] xsm:w-[80vw] flex xxlg:pb-5 md:flex-col xsm:flex-row h-fit">
          <div className="w-fit ml-11 rounded-l-[50%] lg:h-[45rem] md:h-[35rem] xsm:h-[25rem] bg-transparent flex xxlg:pb-5 md:flex-col 
                       xsm:flex-row lg:pt-28 xsm:pt-0 justify-center items-end">
            <img loading="lazy" className="lg:w-[40rem] xxlg:ml-[3.5rem] xxlg:mb-[2rem] md:h-[30rem]
                        lg:mb-[5rem] lg:h-[30rem]
                        md:mb-[5rem] sm:w-[48rem] bg-transparent
                        sm:mb-[8rem]
                        xsm:mb-[8rem] xsm:h-[17rem]
                        xsm:w-[18rem] " src="/pooja/fire.png">
            </img>
          </div>
        </div>

      </div>

      <div className="p-10">
        <div className="w-full bg-cover bg-center rounded-3xl py-24 bg-book">
          <div className="max-w-screen-xl mx-auto xsm:pl-[4rem] text-white space-y-6">
            <h1 className="text-4xl  font-bold">Music System</h1>
            <p className="text-lg md:text-xl max-w-[50vw]">
              Let's embody your beautiful ideas together, simplify the way you visualize your next big things.
            </p>
          </div>

          <div className="flex flex-wrap md:px-0 xsm:px-4 justify-center gap-9 mt-10">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72" onClick={() => handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
                {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'><button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            {/* Repeat similar blocks for other cards */}
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72" onClick={() => handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
                {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'><button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72" onClick={() => handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
                {/*                 <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'> <button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72" onClick={() => handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
                {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'><button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72" onClick={() => handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
                {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'><button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Pooja