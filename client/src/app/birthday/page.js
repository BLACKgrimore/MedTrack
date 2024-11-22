'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from 'next/link';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'


import { Plus_Jakarta_Sans } from 'next/font/google'
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

const vendors = [
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
]

const venues = [
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
]

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
  },{
  }, {
    url: "url('/service-section/image5.png')",
    title: "Decor and Theming",
    desc: "Professional "
  },{
  // }, {
  //   url: "url('/service-section/image6.png')",
  //   title: "Catering ",
  //   desc: "Comprehensive "
  // }, {
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

const Birthday = () => {

  const router = useRouter() 
  const handleVenue = () => {
      const serviceValue = 'Birthday'|| '';
      router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handlePhotography = () => {
      const serviceValue = 'Photography'|| '';
      router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handleDj = () => {
      const serviceValue = 'Dj'|| '';
      router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handleDesigner = () => {
      const serviceValue = 'Designer'|| '';
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
    <div className="flex flex-col pt-10 bg-[#cbddff]">

      <div className='bg-[url("/birthday/hero.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col 
                            justify-center items-start py-8 xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[20rem] md:h-[30rem] 
                            lg:h-[30rem] gap-8'>
        <h1 className="xsm:text-2xl justify-start pl-[10vw] sm:text-3xl md:text-3xl font-semibold lg:text-4xl 
                        xl:text-6xl">"The Premier Event Service Platform in India"</h1>
        <p className="xsm:text-2xl max-w-[60vw] justify-start pl-[10vw] sm:text-2xl md:text-2xl lg:text-2xl 
                        xl:text-3xl text-sm">
          "Seamless Party Planning with Our Expert Touch!"
        </p>
      </div>

      <div className='px-12 my-12 space-y-9 msm:mb-0 xsm:mb-[33rem]'>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <h1 className='md:text-4xl my-5 text-3xl font-semibold max-w-3xl'>"Celebrate with the Ones You Love Most"</h1>
            <p className='text-gray-500 my-5 max-w-lg'>"Transform your event with our expert planning! We take care of everything from
start to finish. Elevate your events with smooth planning and flawless execution.
Let's bring your vision to life!"</p>
           {/*  <Link href='#'> <button className='border my-5 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all'>Explore more</button> </Link> */}
          </div>
        </div>

        <div className='grid relative grid-cols-4 pt-10 bg-gradient-to-t from-[#263488] to-[#af99df] py-6 rounded-tr-3xl rounded-tl-3xl'>
          <div className='flex md:flex-row md:flex-wrap col-span-3 ps-12 xsm:flex-col xsm:items-center msm:items-start'>
            <div className='flex flex-col max-w-[7rem] text-center mx-6'>
              <Image loading="lazy" src={"/marriage/setting.png"} height={120} width={120} />
              <p className='mt-2 text-white'>Wedding Managements</p>
            </div>
            <div className='flex flex-col max-w-[7rem] text-center mx-6'>
              <Image loading="lazy" src={"/marriage/location.png"} height={120} width={120} />
              <p className='mt-2 text-white'>Wedding Venue</p>
            </div>
            <div className='flex flex-col max-w-[7rem] text-center mx-6'>
              <Image loading="lazy" src={"/marriage/idea.png"} height={120} width={120} />
              <p className='mt-2 text-white'>Wedding Decor</p>
            </div>
            <div className='flex flex-col max-w-[7rem] text-center mx-6'>
              <Image loading="lazy" src={"/marriage/contact.png"} height={120} width={120} />
              <p className='mt-2 text-white'>Wedding Vendors</p>
            </div>
          </div>
          <Image loading="lazy" className='max-h-[38rem] max-w-[38rem] absolute xsm:mt-[50rem] -right-10 msm:bottom-0' src={"/birthday/girl.png"} height={950} width={450} />
          <div></div>
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
                <div key={index} className='flex min-w-[200px] mt-6 sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 '>
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
              Discover, select, and secure the best prices and packages from a range of
              stunning venues perfect for hosting your upcoming wedding reception,
              pre-wedding, and post-wedding celebrations.
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
              onClick={()=>handleVenue()}
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

      {/* 5 */}
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
                Discover, select, and secure the best prices and packages from a range of
                stunning venues perfect for hosting your upcoming wedding reception,
                pre-wedding, and post-wedding celebrations.
                </p>
              </div>
              <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                <FiArrowLeftCircle className='mr-4 cursor-pointer'  onClick={() => handleLeftClick('slider3')} />
                <FiArrowRightCircle className='cursor-pointer'  onClick={() => handleRightClick('slider3')}/>
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

      <div className="min-w-80 flex lg:flex-row-reverse xsm:flex-col-reverse xsm:justify-center xsm:items-center md:h-fit xsm:h-full
               lg:p-10 xsm:p-0 lg:py-0 xsm:py-4 text-black bg-cover bg-center bg-no-repeat bg-veryLightPink ">


        <div className='lg:w-[50vw] xsm:w-[80vw] flex flex-col justify-center lg:my-12 xsm:py-0'>
          <div className="">
            <h1 className='md:text-5xl text-3xl py-8 font-bold'>Invitation Designs</h1>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handleDesigner()}>
              {services.slice(0, 3).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[60em] w-full'>
                  <div className='xlg:h-44 lg:h-36 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm m-0 mx-auto'>{service.desc}</p>

                </div>
              })}
            </div>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handleDesigner()}>
              {services.slice(3, 6).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[60em] w-full'>
                  <div className='xlg:h-44 lg:h-36 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm mx-auto '>{service.desc}</p>

                </div>
              })}
            </div>
          </div>
        </div>

        <div className="lg:w-[50vw] xsm:w-[80vw] flex xxlg:pb-5 flex-col lg:h-[38rem] md:h-[23rem] sm:h-[25rem] xsm:h-[17rem]">
          <div className="w-full flex xxlg:pb-5 xsm:pb-0 md:flex-col xsm:flex-row lg:pt-28 xsm:pt-4 md:pl-0 xsm:pl-[5vw] justify-normal items-center">
            <img loading="lazy" className="lg:absolute xsm:flex lg:w-[20rem]  xxlg:mb-[5rem] 
                        lg:mb-[5rem] lg:left-44 lg:h-[15rem]
                        md:mb-[5rem] 
                        sm:mb-[8rem]  rounded-[1rem] sm:ml-36 sm:w-[18rem] sm:h-[18rem]
                        xsm:mb-[4rem] xsm:w-[13rem] xsm:h-[13rem] xsm:ml-24
                        outline-[.3rem]" src="/aboutus/about12.png">
            </img>
            <img loading="lazy" className="absolute xxlg:mt-[8rem] 
                        lg:w-[20rem] lg:mt-[8rem] rounded-[1rem]
                        md:mt-[8rem] sm:w-[18rem] lg:left-5 md:h-[15rem]
                        sm:mt-[8.5rem] sm:left-5 sm:h-[15rem] xsm:left-0
                        xsm:mt-[4rem] xsm:ml-[8rem] xsm:w-[12rem] xsm:h-[12rem]" src="/aboutus/about11.png">
            </img>
          </div>
        </div>

      </div>

      <div className="min-w-80 flex lg:flex-row xsm:flex-col xsm:justify-center xsm:items-center md:h-fit xsm:h-full
               lg:p-10 xsm:p-0 lg:py-0 xsm:py-4 text-black bg-cover bg-center bg-no-repeat bg-veryLightPink ">


        <div className='lg:w-[50vw] xsm:w-[80vw] flex flex-col justify-center lg:my-12 xsm:py-0'>
          <div>
            <h1 className='md:text-5xl text-3xl pb-8 font-bold'>Dynamic Event Pages & Digital Posters</h1>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handleDesigner()}>
              {services.slice(0, 3).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[60em] w-full'>
                  <div className='xlg:h-44 lg:h-36 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm m-0 mx-auto'>{service.desc}</p>

                </div>
              })}
            </div>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handleDesigner()}>
              {services.slice(3, 6).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[60em] w-full'>
                  <div className='xlg:h-44 lg:h-36 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm mx-auto '>{service.desc}</p>

                </div>
              })}
            </div>
          </div>
        </div>

        <div className="lg:w-[50vw] xsm:w-[80vw] flex xxlg:pb-5 flex-col lg:h-[38rem] md:h-[30rem] xsm:h-fit">
          <p className="lg:px-10 xsm:px-0 text-sm flex self-start">Spread happiness with our customizable online birthday cards, ranging from
            heartfelt to humorous. Send instantly via email, text, or link, or schedule for later
            delivery.</p>
          <div className="w-full flex xxlg:pb-5 md:flex-col xsm:flex-row lg:pt-28 xsm:pt-0 justify-normal items-center">
            <img loading="lazy" className="lg:w-[25rem] xxlg:ml-[3.5rem] xxlg:mb-[5rem] 
                        lg:mb-[5rem]
                        md:mb-[5rem] sm:w-[18rem] sm:h-[12rem]
                        sm:mb-[8rem]  rounded-[1rem]
                        xsm:mb-[4rem] outline outline-[#f95e3d]
                        xsm:w-[13rem] xsm:h-[8rem]
                        lg:h-[15rem] outline-[.3rem]" src="/aboutus/about12.png">
            </img>
            <img loading="lazy" className="absolute xxlg:mt-[8rem] 
                        lg:w-[25rem]  lg:mt-[8rem] rounded-[1rem]
                        md:mt-[8rem] sm:w-[18rem] md:ml-[13vw] md:h-[15rem]
                        sm:mt-[8.5rem] sm:ml-[6rem] sm:h-[12rem]
                        xsm:mt-[4rem] xsm:ml-[2rem] xsm:w-[15rem] xsm:h-[8rem]" src="/aboutus/about11.png">
            </img>
          </div>
        </div>

      </div>

     {/*  <div className="bg-custom-light-blue flex my-10 bg-slate-400 lg:space-x-8 rounded-xl xsm:px-0 items-center justify-center 
                  md:flex-row xsm:flex-col w-[90vw] self-center md:h-[16rem] xsm:h-fit xsm:space-x-0">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 backdrop-blur-sm rounded-xl h-full flex flex-col md:items-end md:justify-end xsm:items-center xsm:justify-center">
          <div className="flex">
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-14 rounded-lg object-cover -rotate-6" alt="image1"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-42 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-20 rounded-lg object-cover rotate-3" alt="image2"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-14 rounded-lg object-cover -rotate-6" alt="image1"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-42 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-24 rounded-lg object-cover rotate-3" alt="image2"></img>
          </div>
        </div>
        <div className="w-11/12 md:w-3/4 lg:w-2/3 space-y-4 bg-transparent lg:p-2 xsm:py-2 rounded-xl flex flex-col items-center">
          <div className="flex flex-row w-full md:justify-start md:items-start xsm:items-center xsm:justify-center">
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-14 rounded-lg object-cover rotate-3" alt="image1"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-24 rounded-lg object-cover -rotate-6" alt="image2"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-14 rounded-lg object-cover rotate-3" alt="image2"></img>
            <img loading="lazy" src="https://via.placeholder.com/100" className="lg:w-28 md:h-32 md:w-1/4 xsm:w-14 sm:w-24 sm:h-24 xsm:h-22 rounded-lg object-cover rotate-6" alt="image3"></img>
          </div>
          <div className="text-center flex flex-col w-full md:justify-start md:items-start xsm:items-center xsm:justify-center ">
            <span className="text-6xl font-extrabold text-gray-800">920<span className="text-green-500">+</span></span>
            <p className="text-lg text-black font-medium">Project finish with superbly</p>
          </div>
        </div>
      </div> */}

      <div className="min-w-80 flex lg:flex-row xsm:flex-col xsm:justify-center xsm:items-center md:h-fit xsm:max-h-[8remw]
               lg:p-10 xsm:p-0 lg:py-0 xsm:py-4 text-white bg-cover bg-center bg-no-repeat bg-book ">


        <div className='lg:w-[50vw] xsm:w-[80vw] flex flex-col justify-center mt-12'>
          <div>
            <h1 className='md:text-5xl text-3xl pb-8 font-semiboldbold'>Photography</h1>
            <h1 className='md:text-sm text-3xl pb-8 '>Experience your birthday like never before with our stunning high-definition
videos. Our expert videographers and photographers use state-of-the-art
equipment to capture every precious moment, letting you relive your special day
for years to come.</h1>
          </div>

          <div className='flex flex-col'>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handlePhotography()}>
              {services.slice(0, 3).map((service, index) => {
                return <div key={index} className='rounded-xl p-3  cursor-pointer md:max-w-[70em] w-full'>
                  <div className='xlg:h-40 lg:h-32 xsm:h-44 relative group rounded-xl' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                  </div>
                  <p className='text-md font-semibold mt-1 mb-1 mx-auto'>{service.title}</p>
                  <p className='text-sm m-0 mx-auto text-[#d08282]'>{service.desc}</p>

                </div>
              })}
            </div>
            <div className='flex justify-start lg:flex-nowrap flex-wrap rounded-xl' onClick={()=>handlePhotography()} >
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
                        lg:mb-[5rem] rounded-l-[50%] lg:h-[30rem]
                        md:mb-[5rem] sm:w-[48rem]
                        sm:mb-[8rem]  rounded-[1rem]
                        xsm:mb-[8rem] xsm:h-[17rem]
                        xsm:w-[18rem] " src="/birthday/photo.png">
            </img>
          </div>
        </div>

      </div>

      <div className="p-10">
        <div className="w-full bg-cover bg-center rounded-3xl py-24 bg-book">
          <div className="max-w-screen-xl mx-auto xsm:pl-[4rem] lg:pl-0 text-white space-y-6">
            <h1 className="text-4xl  font-bold">Music System</h1>
            <p className="text-lg md:text-xl max-w-[50vw]">
              Let's embody your beautiful ideas together, simplify the way you visualize your next big things.
            </p>
          </div>

          <div className="flex flex-wrap md:px-0 xsm:px-4 justify-center gap-9 mt-10">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72 cursor-pointer" onClick={()=>handleDj()}>
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
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72 cursor-pointer" onClick={()=>handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
               {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'> <button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72 cursor-pointer" onClick={()=>handleDj()} >
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
              {/*   <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'> <button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72 cursor-pointer" onClick={()=>handleDj()}>
              <Image loading="lazy" className="w-full h-56 object-cover p-4 rounded-t-[1.5rem] rounded-b-[1.5rem]" src="/birthday/rel.png" alt="Baleey Musics" width={288} height={192} />
              <div className="p-4">
                <h2 className="text-xl font-bold">Baleey Musics</h2>
               {/*  <h2 className="text-gray-500">5.0 Oungambakkam, Chennai</h2>
                <h2 className="text-green-500">1 Promotion -15%</h2>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <p className="text-xl font-semibold mt-6">Rs. 15,000</p>
                  <Link href='/contactus'> <button className="mt-3 px-4 py-2 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                    Send Message
                  </button></Link>
                </div> */}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden w-full sm:w-64 md:w-72 cursor-pointer" onClick={()=>handleDj()}>
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
{/* 
      <div className='flex flex-col justify-center my-12'>
        <div>
          <h1 className='text-3xl font-bold text-center'>Select Your Ideal Package</h1>
          <p className='text-center md:font-bold text-sm my-4 md:max-w-[60%] mx-auto'>Discover our party packages designed to fit your needs and budget. Each one
          offers unique features to make your event unforgettable.</p>
        </div>
        <div className='flex lg:flex-nowrap flex-wrap justify-center'>
          {plans.map((plan, index) => {
            return <div key={index} className={`md:max-w-[18em] md:w-[16em] w-full ${plan.scale ? "lg:scale-110" : ""} flex flex-col p-5 rounded-xl shadow-xl bg-white border border-black md:m-12 m-5`}>
              <div className='flex flex-col items-center mb-5'>
                <span className='font-bold text-orange-500'>{plan.title}</span>
                <span className='font-bold text-xl'>{plan.price}</span>
                <span>{plan.desc}</span>
              </div>
              <div>
                <div className='flex flex-col'>
                  {plan.benefits.map((benefit, index) => <span key={index} className='flex items-center'><FaCheck className='me-3' />{benefit}</span>)}
                </div>
              </div>
              <button className='mt-4 max-w-[10rem] bg-black text-white rounded-full px-5 py-1 cursor-not-allowed'>Purchase Now</button>
            </div>
          })}
        </div>
      </div> */}



    </div>
  )
}

export default Birthday