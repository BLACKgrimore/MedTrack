"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { FaArrowRight, FaStar } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { TbMoneybag } from 'react-icons/tb'
import $ from 'jquery';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const services = [
  { title: "Prewedding", img: "/marriage/image1.png", redirect: "/" },
  { title: "Wagdam & roka", img: "/marriage/image2.png", redirect: "/" },
  { title: "Sangeet ceremony", img: "/marriage/image3.png", redirect: "/" },
  { title: "Mehndi ceremony", img: "/marriage/image4.png", redirect: "/" },
  { title: "Tilak ceremony", img: "/marriage/image5.png", redirect: "/" },
  { title: "Haldi ceremony", img: "/marriage/image6.png", redirect: "/" },
  { title: "Mangalsutra", img: "/marriage/image7.png", redirect: "/" },
  { title: "Barat", img: "/marriage/image7.png", redirect: "/" },
  { title: "Kanya aagman", img: "/marriage/image7.png", redirect: "/" }, { title: "Mandap", img: "/marriage/image7.png", redirect: "/" }, { title: "Varmala", img: "/marriage/image7.png", redirect: "/" }, { title: "Kanyadan", img: "/marriage/image7.png", redirect: "/" }, { title: "Bidaai", img: "/marriage/image7.png", redirect: "/" }, { title: "Dwar rokai", img: "/marriage/image7.png", redirect: "/" }, { title: "Griha pravesh", img: "/marriage/image7.png", redirect: "/" }, { title: "Pag phera", img: "/marriage/image7.png", redirect: "/" }
]

const preWeddingPlanners = [
  { img: "image10.png", title: "Invitation Designing, Guest List and Seating Arrangement" },
  { img: "image11.png", title: "Pre-Wedding Photography and Videography" },
  { img: "image12.png", title: "Budget Planning and Management" },
  { img: "image13.png", title: "Wedding Website Creation" },
  { img: "image14.png", title: "Rehearsal Dinner Planning" },
  { img: "image15.png", title: "Travel and Accommodation Arrangements" },
]

const weddingsections = [
  { img: "/marriage/SBA_8400.jpg", title: "Ceremony Management", desc: "Includes setting up the ceremony site, organizing the processional and recessional." },
  { img: "/marriage/SBA_8402.JPG", title: "Reception Coordination", desc: "Includes coordinating speeches, first dances, meal service, and any other scheduled activities." },
  { img: "/marriage/SBA_8885.JPG", title: "Guest Assistance", desc: "Ensures guests feel welcomed and cared for throughout the event." },
  { img: "/marriage/SBF_5183.JPG", title: "Emergency Kit", desc: "Includes items like safety pins, sewing kit, band-aids, pain relievers, stain remover, and more." },
  { img: "/marriage/SBA_8893.JPG", title: "Setup and Tear Down", desc: "Includes ensuring the venue is restored to its original condition if required." },
  { img: "/marriage/SBA_8898.JPG", title: "Bride and Groom Assistance", desc: "Includes helping with attire adjustments, managing personal items, and providing refreshments." },
  { img: "/marriage/SBA_8908.JPG", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
  { img: "/marriage/SBA_8908.JPG", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
  // { img: "/marriage/SBA_8995.JPG", title: "Catering and Bar Management", desc: "Includes managing the serving schedule, dealing with any dietary needs, so all guests are served properly." },
  { img: "/marriage/SBA_8998.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBF_3161.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBF_5168.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBF_5183.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBF_5815.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBA_8402.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
  { img: "/marriage/SBA_8402.JPG", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
]

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })

const cinematographySectionOptions = [
  { img: "/marriage/SBA_8400.jpg", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBA_8402.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBA_8885.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBA_8908.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBF_5183.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBF_3161.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBA_8998.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
  { img: "/marriage/SBA_8893.JPG", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
]

const vendors = [
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/SBA_8400.jpg", title: "Event Planners" },
  { img: "/marriage/SBA_8400.jpg", title: "Event Planners" },
  { img: "/marriage/SBA_8400.jpg", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
  { img: "/marriage/image10.png", title: "Event Planners" },
]

const venues = [
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/SBA_8400.jpg", title: "Marrige Hall Packages", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/SBA_8400.jpg", title: "Banket Hall", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/SBA_8400.jpg", title: "Marrige hall with event services", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/SBA_8400.jpg", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
]

const Marriage = () => {


   
  const router = useRouter()
  const handleVenue = () => {
      const serviceValue = 'Marriage'|| '';
      router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handleDj = () => {
      const serviceValue = 'Dj'|| '';
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
    <div className=' bg-[#FBB5B5] overflow-x-hidden'>
      <div className='pt-28 min-h-[20em] text-white p-12' style={{ background: "url(/marriage/image.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
        <h1 className='md:text-5xl text-3xl font-bold max-w-3xl'>"The Premier Event Service Platform in India"</h1>
      </div>

      {/* 2nd section */}
      <div className='px-12 my-12 mt-24'>
        <div className='grid grid-cols-4'>
          <div className='lg:col-span-3 col-span-4'>
            <h1 className='md:text-4xl my-5 text-3xl font-semibold max-w-3xl'>Evego Event is here to make your dream wedding unforgettable with our expert
            planning assistance</h1>
            <p className='text-gray-500 my-5 max-w-lg'>With Evego Event, every detail of your wedding will be meticulously planned and executed, ensuring an unforgettable experience for you and your guests. Plan your wedding with Evego Event and create memories that will last a lifetime.</p>
            <Link href='/services'> <button className='border my-5 border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all'>Explore more</button> </Link>
          </div>
          <div>
          </div>
        </div>
        <div className='grid relative grid-cols-4 bg-gradient-to-t from-[#3D0000] to-[#EC3636] py-6 rounded-tr-3xl rounded-tl-3xl'>
          <div className='flex flex-wrap md:justify-start justify-center lg:col-span-3 col-span-4 md:ps-12'>
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
          <Image loading="lazy" className='max-h-[40rem] max-w-[40rem] absolute -right-24 bottom-0 lg:visible invisible' src={"/marriage/girl.png"} height={1000} width={1100} />
          <div></div>
        </div>
      </div>

      {/* 3rd section */}
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

      {/* 4th section */}
      <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
        <div className='mb-8 lg:mb-12'>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div>
              <h1 className='text-4xl font-semibold flex items-center select-none'>Reserve Your Dream Wedding Venue with Us! <FaArrowRight className='ms-3' /> </h1>
              <p className='max-w-2xl mt-3'>Evego Event offers a comprehensive venue booking service to help you find the perfect location for your dream wedding, simplifying the process and ensuring your vision is met.</p>
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

      {/* 5th Section */}
      <div className='md:px-12 px-5 py-24 mt-12 bg-[#FCE6F2]' /* style={{ background: "url(/marriage/image9.png)", backgroundPosition: "top", backgroundSize: "cover" }} */>
        <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
          <div className='mb-8 lg:mb-12'>
            <div className='flex flex-col lg:flex-row justify-between'>
              <div>
                <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                "Explore Our Venue Options! <FaArrowRight className='ml-3' />
                </h1>
                <p className='max-w-xl lg:max-w-2xl mt-3'>
                Discover, select, and secure the best prices and packages from a range of
stunning venues perfect for hosting your upcoming wedding reception,
pre-wedding, and post-wedding celebrations.
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
        <div className='grid gap-9 grid-cols-6'>
          <div className='md:col-span-4 col-span-6 text-white py-8 md:px-16 px-5 bg-[#01020533] rounded-lg' style={{ background: "url(/marriage/image8.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
            <h1 className='md:text-4xl text-xl font-bold'>Book a vendor in simple steps :</h1>
            <div className='flex lg:flex-nowrap flex-wrap justify-between mt-5'>
              <div className='flex items-start'>
                <span className='font-bold text-6xl'>1</span>
                <p className='max-w-[14rem] ps-2'>Send your requirements
                  to multiple vendors</p>
              </div>
              <div className='flex items-start'>
                <span className='font-bold text-6xl'>2</span>
                <p className='max-w-[14rem] ps-2'>Get Quotes on your phone
                  & compare</p>
              </div>
              <div className='flex items-start'>
                <span className='font-bold text-6xl'>3</span>
                <p className='max-w-[14rem] ps-2'>Book the <br /> best vendor !</p>
              </div>
            </div>
          </div>
          <div className='md:col-span-2 col-span-6 p-6  text-white bg-[#01020533] rounded-lg  min-h-56 w-full flex flex-col justify-between' style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
            <div className='flex flex-col'>
              <span className='text-4xl font-extrabold'>20+</span>
              <span className='font-light text-sm'>Project finish with superbly</span>
            </div>
            <div className='flex items-center justify-start'>
              {Array.from(Array(4).keys()).map(() => {
                return (
                  <Image loading="lazy" className='rounded-full mx-1 md:h-9 md:w-9' src={"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"} height={30} width={30} />
                )
              })}
              <span className='text-4xl '>+</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6th Section */}
      <div className='grid lg:grid-cols-2 py-12' style={{ background: "url(/marriage/image16.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
        <div className='p-8'>
          <h1 className='text-4xl font-bold mb-5'>Experience Our Complete Wedding Planning Services!
          "</h1>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center grid-rows-2 gap-5' onClick={()=>handleVenue()}>
            {preWeddingPlanners.map((data, index) => {
              return <div key={index} className='m-3 hover:font-bold cursor-pointer flex flex-col items-center justify-center w-full h-full p-3 bg-white'>
                <Image loading="lazy" className='w-full' src={`/marriage/${data.img}`} height={200} width={200} />
                <p className='md:text-xs text-lg mt-4'>{data.title}</p>
              </div>
            })}
          </div>
        </div>
        <div className='lg:block hidden '><Image loading="lazy" className='h-full w-full' src={"/marriage/image17.png"} height={1000} width={1000} /></div>
      </div>

      {/* 7th section */}
      {/* <div className='md:px-12 px-5 py-28'>
        <div>
          <h1 className='text-4xl font-bold mb-7'>Wedding Day</h1>
          <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 grid-rows-3 gap-5'>
            {weddingsections.map((section, index) => {
              return <div key={index} className='h-full w-full cursor-pointer'>
                <Image loading="lazy" className='rounded-lg w-full' src={section.img} width={250} height={250} />
                <h3 className='mt-2'>{section.title}</h3>
                <p className='text-xs'>{section.desc}</p>
              </div>
            })}
          </div>
        </div>
        <div className='w-full h-38 rounded-xl p-6' style={{ background: "url(/marriage/image28.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
          <p className='md:text-6xl text-4xl font-bold text-white flex'>920 <span className='text-[#99CF63]'>+</span></p>
          <p className='font-semibold text-white'> Project finish with superbly</p>
        </div>
      </div>
 */}
      {/* 8th section */}
     {/*  <div className='grid grid-cols-5 md:px-12 px-5 my-12'>
        <div className='bg-[#FCE6F2] p-5 rounded-lg lg:inline-block hidden'>
          <Image loading="lazy" src={"/footerlogo.png"} height={200} width={200} />
          <h1 className='text-xl mt-2'>Filter By</h1>
          <div className='mt-4'>
            <div>
              <p className='text-lg'>Makeup Type</p>
              <div>
                <input type="checkbox" id="airBrush" name="airBrush" value="airBrush" />
                <label for="airBrush"> Air Brush</label>
              </div>
              <div>
                <input type="checkbox" id="HD" name="HD" value="HD" />
                <label for="HD"> HD</label>
              </div>
              <div>
                <input type="checkbox" id="familyMakeup" name="familyMakeup" value="familyMakeup" />
                <label for="familyMakeup"> Family Makeup</label>
              </div>
              <div>
                <input type="checkbox" id="partyMakeup" name="partyMakeup" value="partyMakeup" />
                <label for="partyMakeup"> Party Make up</label>
              </div>
              <div>
                <input type="checkbox" id="matteMakeup" name="matteMakeup" value="matteMakeup" />
                <label for="matteMakeup"> Matte Makeup</label>
              </div>
              <div>
                <input type="checkbox" id="mineralMakeup" name="mineralMakeup" value="mineralMakeup" />
                <label for="mineralMakeup"> Mineral makeup</label>
              </div>
            </div>
            <div className='mt-5'>
              <p className='text-lg'>Locality</p>
              <div>
                <div>
                  <input type="checkbox" id="Noida" name="Noida" value="Noida" />
                  <label for="Noida"> Noida</label>
                </div>
                <div>
                  <input type="checkbox" id="Delhi" name="Delhi" value="Delhi" />
                  <label for="Delhi"> Delhi</label>
                </div>
                <div>
                  <input type="checkbox" id="Agra" name="Agra" value="Agra" />
                  <label for="Agra"> Agra</label>
                </div>
                <div>
                  <input type="checkbox" id="Lucknow" name="Lucknow" value="Lucknow" />
                  <label for="Lucknow"> Lucknow</label>
                </div>
                <p className='text-center cursor-pointer hover:underline'>Check more</p>
              </div>
            </div>
            <div className='mt-5'>
              <p className='text-lg m-0'>Venue Budget <br /><span className='text-sm'>(Including Food and Decor)</span> </p>
              <div className='mt-3 flex flex-wrap'>
                <div className=' m-1 cursor-pointer border rounded-full border-black px-4 py-2 hover:bg-black hover:text-white'>Less Than 15k</div>
                <div className=' m-1 cursor-pointer border rounded-full border-black px-4 py-2 hover:bg-black hover:text-white'>15 - 20k</div>
                <div className=' m-1 cursor-pointer border rounded-full border-black px-4 py-2 hover:bg-black hover:text-white'>25 - 45k</div>
                <div className=' m-1 cursor-pointer border rounded-full border-black px-4 py-2 hover:bg-black hover:text-white'>45 - 50k</div>
                <div className=' m-1 cursor-pointer border rounded-full border-black px-4 py-2 hover:bg-black hover:text-white'>60 - 60k</div>
              </div>
            </div>
            <div className='mt-5'>
              <p className='text-lg'>Number of Functions </p>
              <div className='flex flex-wrap'>
                <div className='bg-white p-2 m-1 cursor-pointer'>1</div>
                <div className='bg-white p-2 m-1 cursor-pointer'>2</div>
                <div className='bg-white p-2 m-1 cursor-pointer'>3</div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-4 col-span-6 lg:px-12 px-5'>
          <div className='grid md:grid-cols-3 grid-cols-1'>
            <h1 className='text-4xl font-semibold w-full'>Book Your Wedding Makeup Artist with Evego Event</h1>
            <p className='col-span-2'>Looking and feeling fabulous on your wedding day is a must. Evego Event makes it easy
            to book the perfect makeup artist to enhance your beauty and match your wedding style.</p>
          </div>
          <div className='mt-4 flex flex-col'>
            {Array.from(Array(1).keys()).map((index) => {
              return <>
                <div key={index} className='grid md:grid-cols-4 place-items-center bg-[#FFDBDB] p-5 rounded-lg my-2'>
                  <div><Image loading="lazy" src={"/marriage/image10.png"} height={200} width={300} /></div>
                  <div className='mt-4 md:col-span-2 md:mx-8 flex flex-col justify-between'>
                    <div className='flex flex-col items-start'>
                      <h1 className='md:text-3xl text-xl font-bold md:mb-2'>Silver Plan</h1>
                      <p>Bridal Makeup Price</p>
                      <p className='font-bold text-xl md:mt-3'>Rs. 1800</p>
                    </div>
                    <div className='w-full md:flex flex-wrap hidden'>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Freelance&nbsp;Artist</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Bridal&nbsp;Makeup&nbsp;Studio</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Trail</span>
                    </div>
                  </div>
                  <div className='flex md:flex-col md:flex-nowrap flex-wrap md:justify-between justify-around w-full md:items-end'>
                    <p className='flex items-center'><FaStar className='text-yellow-500 me-2' /> <span>5.0 (20 reviews)</span></p>
                    <Link href='/contactus'><button className='border border-black p-3 hover:bg-black hover:text-white rounded-full'>Send message</button></Link>
                  </div>
                </div>
                <div key={index} className='grid md:grid-cols-4 place-items-center bg-[#FFDBDB] p-5 rounded-lg my-2'>
                  <div><Image loading="lazy" src={"/marriage/image10.png"} height={200} width={300} /></div>
                  <div className='mt-4 md:col-span-2 md:mx-8 flex flex-col justify-between'>
                    <div className='flex flex-col items-start'>
                      <h1 className='md:text-3xl text-xl font-bold md:mb-2'>Gold Plan</h1>
                      <p>Bridal Makeup Price</p>
                      <p className='font-bold text-xl md:mt-3'>Rs. 1800</p>
                    </div>
                    <div className='w-full md:flex flex-wrap hidden'>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Freelance&nbsp;Artist</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Bridal&nbsp;Makeup&nbsp;Studio</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Trail</span>
                    </div>
                  </div>
                  <div className='flex md:flex-col md:flex-nowrap flex-wrap md:justify-between justify-around w-full md:items-end'>
                    <p className='flex items-center'><FaStar className='text-yellow-500 me-2' /> <span>5.0 (20 reviews)</span></p>
                    <Link href='/contactus'> <button className='border border-black p-3 hover:bg-black hover:text-white rounded-full'>Send message</button></Link>
                  </div>
                </div>
                <div key={index} className='grid md:grid-cols-4 place-items-center bg-[#FFDBDB] p-5 rounded-lg my-2'>
                  <div><Image loading="lazy" src={"/marriage/image10.png"} height={200} width={300} /></div>
                  <div className='mt-4 md:col-span-2 md:mx-8 flex flex-col justify-between'>
                    <div className='flex flex-col items-start'>
                      <h1 className='md:text-3xl text-xl font-bold md:mb-2'>Premium Plan</h1>
                      <p>Bridal Makeup Price</p>
                      <p className='font-bold text-xl md:mt-3'>Rs. 1800</p>
                    </div>
                    <div className='w-full md:flex flex-wrap hidden'>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Freelance&nbsp;Artist</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Bridal&nbsp;Makeup&nbsp;Studio</span>
                      <span className='bg-white m-1 text-xs border border-black py-1 px-3 cursor-pointer mx-2'>Trail</span>
                    </div>
                  </div>
                  <div className='flex md:flex-col md:flex-nowrap flex-wrap md:justify-between justify-around w-full md:items-end'>
                    <p className='flex items-center'><FaStar className='text-yellow-500 me-2' /> <span>5.0 (20 reviews)</span></p>
                    <Link href='/contactus'><button className='border border-black p-3 hover:bg-black hover:text-white rounded-full'>Send message</button></Link>
                  </div>
                </div>
              </>
            })}
          </div>
        </div>
      </div>
 */}
      {/* Section 9th */}
    {/*   <div className='grid lg:grid-cols-2 py-24'>
        <div className='p-8'>
          <h1 className='text-4xl font-bold mb-5'>Capture your special day with the perfect wedding photographer through Evego Event's
          booking service."</h1>
          <div className='place-items-center grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-5'>
            {cinematographySectionOptions.map((option, index) => {
              return <div key={index} className='max-w-[20rem] cursor-pointer flex flex-col'>
                <Image loading="lazy" className='rounded-lg' src={option.img} width={250} height={250} />
                <h3 className='mt-2'>{option.title}</h3>
                <p className='text-xs'>{option.desc}</p>
                <p className='flex items-center text-xs mt-2'><span className='bg-yellow-500 p-1 rounded-full me-1'><TbMoneybag /></span> {option.price}</p>
              </div>
            })}
          </div>
        </div> */}
        {/* <div className='lg:inline-block hidden'><Image loading="lazy" className='h-full w-full' src={"/marriage/image29.png"} height={1000} width={1000} /></div> */}
   {/*    </div> */}

      {/* Section 10th */}
      <div className='md:mx-12 mx-5 md:p-12 p-5 my-12 rounded-3xl' style={{ background: "url(/marriage/image46.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
        <h1 className='text-5xl font-bold text-white'>Add Sparkle to Your Wedding with Our DJ and Lighting Services</h1>
        <p className='max-w-lg mt-2 text-white'>Creating the perfect atmosphere for your wedding reception is essential, and nothing sets the mood better than the right music and lighting. Evego Event offers a comprehensive DJ and lighting service to ensure your wedding celebration is unforgettable.</p>
        <div className='flex flex-wrap justify-center'>
          {Array.from(Array(1).keys()).map((_, index) => {
            return <>
              <div key={index} className='bg-white p-4 rounded-lg m-5 md:w-fit w-full cursor-pointer'onClick={()=>handleDj()} >
                <Image loading="lazy" src={"/marriage/image45.png"} className='w-[100%]' height={250} width={250} />
                <h1 className='mt-2 font-bold'> Dj</h1>
                <p className='flex items-center text-xs mt2 m-0'><FaStar className='text-yellow-500 me-2' />5.0 <span className='ms-1'> (Nungambakkam, Chennai)</span></p>
                {/* <p className='font-bold text-gray-400 m-0'>1 Promotion <span className='text-red-500'>-15%</span></p> */}
               {/*  <div className='flex items-center justify-between mt-3'>
                  <p className='font-bold m-0'>Rs. 15,000</p>
                  <Link href='/contactus'> <button className='py-1 px-3 border border-red-500 rounded-full hover:bg-red-500 hover:text-white'>Send message</button></Link>
                </div> */}
              </div>
              <div key={index} className='bg-white p-4 rounded-lg m-5 md:w-fit w-full cursor-pointer' onClick={()=>handleDj()}>
                <Image loading="lazy" src={"/marriage/image45.png"} className='w-[100%]' height={250} width={250} />
                <h1 className='mt-2 font-bold'>Dj</h1>
                <p className='flex items-center text-xs mt2 m-0'><FaStar className='text-yellow-500 me-2' />5.0 <span className='ms-1'> (Nungambakkam, Chennai)</span></p>
                {/* <p className='font-bold text-gray-400 m-0'>1 Promotion <span className='text-red-500'>-15%</span></p> */}
                {/* <div className='flex items-center justify-between mt-3'>
                  <p className='font-bold m-0'>Rs. 15,000</p>
                  <Link href='/contactus'>  <button className='py-1 px-3 border border-red-500 rounded-full hover:bg-red-500 hover:text-white'>Send message</button></Link>
                </div> */}
              </div>
              <div key={index} className='bg-white p-4 rounded-lg m-5 md:w-fit w-full cursor-pointer' onClick={()=>handleDj()}>
                <Image loading="lazy" src={"/marriage/image45.png"} className='w-[100%]' height={250} width={250} />
                <h1 className='mt-2 font-bold'>Dj</h1>
                <p className='flex items-center text-xs mt2 m-0'><FaStar className='text-yellow-500 me-2' />5.0 <span className='ms-1'> (Nungambakkam, Chennai)</span></p>
                {/* <p className='font-bold text-gray-400 m-0'>1 Promotion <span className='text-red-500'>-15%</span></p> */}
                {/* <div className='flex items-center justify-between mt-3'>
                  {<p className='font-bold m-0'>Rs. 15,000</p>}
                  <Link href='/contactus'> <button className='py-1 px-3 border border-red-500 rounded-full hover:bg-red-500 hover:text-white'>Send message</button></Link>
                </div> */}
              </div>
            </>
          })}
        </div>
      </div>

    </div >
  )
}

export default Marriage