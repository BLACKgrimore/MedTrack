'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { Plus_Jakarta_Sans } from 'next/font/google'



import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation'

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
{ img: "/marriage/image10.png", title: "Event Planners" },
]

const venues = [
  { img: "/babyshower/b15.JPG", title: "Private Home", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/babyshower/b20.jpg", title: "Banquet Hall", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/babyshower/b22.jpg", title: "Restaurant", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "Hotel Banquet", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: " Community Hall", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: " Farmhouse", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "Clubhouse", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: "Temple Hall", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
  { img: "/marriage/image48.png", title: " Garden or Lawn", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
]

const vendor = [
  { img: "/marriage/image48.png", title: " Venue", desc: "" },
  { img: "/marriage/image48.png", title: "Caterer", desc: "" },
  { img: "/marriage/image48.png", title: "Baker", desc: "" },
  { img: "/marriage/image48.png", title: "Florist", desc: "" },
  { img: "/marriage/image48.png", title: "Decorator", desc: "" },
  { img: "/marriage/image48.png", title: "Photographer/Videographer", desc: "" },
  { img: "/marriage/image48.png", title: "Entertainment", desc: "" },
  { img: "/marriage/image48.png", title: "Invitation Designer/Printer", desc: "" },
  { img: "/marriage/image48.png", title: "Favors and Gift Vendors", desc: "" },
  { img: "/marriage/image48.png", title: "Games", desc: "" },
]

const feature = [
  { img: "/marriage/image48.png", title: " Baby Shower", desc: "" },
  { img: "/marriage/image48.png", title: " Cultural Traditions", desc: "" },
  { img: "/marriage/image48.png", title: "Game Ideas and Demonstrations", desc: "" },
  { img: "/marriage/image48.png", title: "Theme Inspiration", desc: "" },
  { img: "/marriage/image48.png", title: "Event Planning Tips", desc: "" },
  { img: "/marriage/image48.png", title: "Parent Testimonials", desc: "" },
  { img: "/marriage/image48.png", title: "Game Ideas and Demonstrations", desc: "" },
  { img: "/marriage/image48.png", title: "Theme Inspiration", desc: "" },
  { img: "/marriage/image48.png", title: "Event Planning Tips", desc: "" },
  { img: "/marriage/image48.png", title: "Parent Testimonials", desc: "" },
]

const theme = [
  { img: "/marriage/image48.png", title: "Bollywood Theme", desc: "" },
  { img: "/marriage/image48.png", title: "Minimalist baby shower", desc: "" },
  { img: "/marriage/image48.png", title: "Royal Rajasthani Theme", desc: "" },
  { img: "/marriage/image48.png", title: "Bee-themed baby shower", desc: "" },
  { img: "/marriage/image48.png", title: "DecoratorSpace-themed baby shower", desc: "" },
  { img: "/marriage/image48.png", title: "Superhero-themed baby shower", desc: "" },
  { img: "/marriage/image48.png", title: "Peacock Theme", desc: "" },
  { img: "/marriage/image48.png", title: "Village Theme", desc: "" },
  { img: "/marriage/image48.png", title: "Vintage Theme", desc: "" },
  { img: "/marriage/image48.png", title: "Fairy Tale Theme", desc: "" },
]

const BabyShower = () => {





  const router = useRouter()
  const handleVenue = () => {
      const serviceValue = 'Babyshower'|| '';
      router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
  }
  const handleGame = () => {
      const serviceValue = 'Game'|| '';
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
    <div className="flex flex-col pt-8 bg-veryLightPurple">

      <div className='bg-[url("/babyshower/hero.png")] bg-cover bg-center bg-no-repeat text-black flex flex-col
                            justify-center items-start py-8 xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[20rem] md:h-[30rem]
                            lg:h-[30rem] w-full'>
        <h1 className="xsm:text-3xl justify-start pl-[10vw] sm:text-4xl md:text-4xl font-semibold lg:text-4xl
                        xl:text-5xl">Celebrate the Arrival of your child with a Perfect Baby Shower</h1>
        <p className="xsm:text-2xl max-w-[70vw] justify-start pl-[10vw] sm:text-3xl md:text-3xl lg:text-4xl
                        xl:text-5xl text-sm">
          Experience the joy of a perfectly planned baby shower with Evego Event
        </p>
      </div>

      <div className=" flex items-center w-full justify-center h-fit">

        <div className="w-full bg-pink-100 p-6 rounded-lg flex flex-col lg:flex-row ">
          <div className="lg:w-1/2 p-4">
            <h1 className="lg:text-3xl xsm:text-2xl font-bold mb-4 text-gray-800">How We Plan Your Baby Shower</h1>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4"></p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">1. Personalized Consultation</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">We start by understanding your vision and creating a tailored plan just for you.</p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">2. Creative Themes and Decor</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">Choose from our charming themes or let us design a unique concept that reflects your style.</p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">3. Delicious Menu</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">Enjoy a curated menu with mouth-watering options to delight your guests.</p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">4. Fun Activities</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">We organize engaging games and activities to make the celebration lively and interactive.</p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">5. Seamless Setup</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">Whether at home or a venue, we manage all setup and logistics to ensure everything is perfect.</p>

            <h4 className="lg:text-2xl xsm:text-1xl text-grey-800">6. On-the-Day Coordination</h4>
            <p className="text-gray-700 mb-6 xlg:w-full sm:w-3/4">Relax and enjoy the day while we handle all the details and coordination.</p>


            {/* <button className="bg-transparent ml-[20vw] text-black px-6 py-3 border border-black rounded-full hover:bg-gray-100 cursor-not-allowed">Book Now !!</button> */}
          </div>
          <div className="lg:w-1/2 py-4 flex items-center justify-center relative">
            <img loading="lazy" src="/babyshower/cele1.png" alt="Baby Image" className="lg:w-[30rem] lg:h-[30rem]
                        sm:w-[20rem] sm:h-[20rem] xsm:w-[13rem] xsm:h-[13rem] rounded-lg"></img>
            <div className="bg-[#D086AB] absolute lg:w-[16rem] lg:h-[21rem]
                          sm:w-[10rem] sm:h-[15.5rem] xsm:w-[7rem] xsm:h-[10rem] rounded-t-full lg:right-[30vw] lg:bottom-7 sm:right-[55vw] xsm:right-[53vw] xsm:bottom-7">
              <img loading="lazy" className="absolute lg:w-56 lg:h-72 sm:w-36 sm:h-56 xsm:w-[6rem] xsm:h-40 pb-5 lg:right-4 sm:right-2 xsm:right-2 lg:bottom-8 sm:bottom-4 xsm:mt-2
                          rounded-t-full border-pink-300 ml-28" src="/babyshower/cele2.png" alt="Baby Image" ></img>
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
              id='slider1'
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

      {/* POPULAR VENUE */}
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
              <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider2')} />
              <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider2')} />
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
                  className={`border bg-white border-black rounded-full
                              lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider2 === i ? 'bg-yellow-500' : ''
                    }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GAMES  */}
      <div className="w-full h-fit px-10 flex lg:flex-row xsm:flex-col">

        <div className="lg:w-[50vw] xsm:w-full h-fit flex flex-col lg:justify-start xsm:justify-center
                    xsm:items-center lg:items-start space-y-6" onClick={()=>handleGame()}>

          <div className="pt-14 w-full py-10">
            <h1 className="flex flex-row items-center justify-center
                        text-4xl font-semibold xsm:pt-0">Games-</h1>
          </div>

          <div className="flex flex-row justify-around w-full items-start lg:pr-10">

            <div className="lg:w-[14vw] xsm:w-[28vw] flex flex-col cursor-pointer">
              <img loading="lazy" className="xlg:w-[14rem] xsm:w-[20rem] rounded-[10px] outline outline-[1px]
                        xlg:h-[10rem] lg:h-[8rem] xsm:h-[10rem]" src="/aboutus/about12.png">
              </img>
              <h1 className="self-center px-2 ">
                Guess the Baby Food
              </h1>
            </div>

            <div className="lg:w-[14vw] xsm:w-[28vw] flex flex-col cursor-pointer">
              <img loading="lazy" className="xlg:w-[14rem] xsm:w-[15rem] rounded-[10px] outline outline-[1px]
                        xlg:h-[10rem] lg:h-[8rem] xsm:h-[10rem]" src="/aboutus/about12.png">
              </img>
              <h1 className="self-center px-2 ">
                Diaper Raffle
              </h1>
            </div>

          </div>

          <div className="flex flex-row justify-around w-full items-start lg:pr-10 lg:pb-10 ">

            <div className="lg:w-[14vw] xsm:w-[28vw] flex flex-col cursor-pointer">
              <img loading="lazy" className="xlg:w-[14rem] xsm:w-[15rem] rounded-[10px] outline outline-[1px]
                        xlg:h-[10rem] lg:h-[8rem] xsm:h-[10rem]" src="/aboutus/about12.png">
              </img>
              <h1 className="self-center px-2 ">
                Baby Bingo

              </h1>
            </div>

            <div className="lg:w-[14vw] xsm:w-[28vw] flex flex-col cursor-pointer">
              <img loading="lazy" className="xlg:w-[14rem] xsm:w-[15rem] rounded-[10px] outline outline-[1px]
                        xlg:h-[10rem] lg:h-[8rem] xsm:h-[10rem]" src="/aboutus/about12.png">
              </img>
              <h1 className="self-center px-2 ">
                Baby Name Game
              </h1>
            </div>

          </div>

        </div>

        <div className="lg:w-[50vw] xsm:w-full h-fit lg:p-10">
          <div className="w-full">
            <h1 className="p-10 lg:w-full xsm:min-w-full">Baby shower games are a delightful way to add some fun and
              interacton to a celebration honoring  motherhood and the imp-
              -ending arrival of a new baby. They provide a welcome break
              from formalities,allowing the mom-to-be to relax and enjoy the
              company of loved ones. Games can also encourage interaction
              between guests, fostering a sense of community and support
              for the new parents.
            </h1>
          </div>

          <div className="w-full lg:h-[25vw] xsm:[40vw] bg-[#8e8bb4] p-8 rounded-3xl">
            <img loading="lazy" className="w-full bg-white h-full rounded-3xl" src="/babyshower/g1.PNG">

            </img>
          </div>
        </div>
      </div>

      {/* VENDER CATEGORIES */}
      <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
        <div className='mb-8 lg:mb-12'>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div>
              <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                Vendor categories <FaArrowRight className='ml-3' />
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
              onClick={()=>handleVenue()}
            >
              {vendor.map((vendor, index) => (
                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                  <Image loading="lazy" className='select-none' src={vendor.img} height={300} width={300} />
                  <p className='mt-3 font-semibold text-sm m-0'>{vendor.title}</p>
                  <p className='text-xs m-0'>{vendor.desc}</p>
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


      {/* FEATURED VIDEOS 3 */}
      {/*
      <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
        <div className='mb-8 lg:mb-12'>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div>
              <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                Featured Video <FaArrowRight className='ml-3' />
              </h1>
              <p className='max-w-xl lg:max-w-2xl mt-3'>
                Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
              </p>
            </div>
            <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
              <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider4')} />
              <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider4')} />
            </div>
          </div>
          <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
            <div
              id='slider2'
              className={`flex w-full absolute transition-all top-10`}
              style={{ left: `${sliderPositions.slider4}rem` }}
            >
              {feature.map((feature, index) => (
                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                  <Image loading="lazy" className='select-none' src={feature.img} height={300} width={300} />
                  <p className='mt-3 font-semibold text-sm m-0'>{feature.title}</p>
                  <p className='text-xs m-0'>{feature.desc}</p>
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
                      slider4: newPos
                    }));
                    setDotIndices((prev) => ({
                      ...prev,
                      slider4: i
                    }));
                  }}
                  className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider4 === i ? 'bg-yellow-500' : ''
                    }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>*/}

      {/* BABY SHOWER THEME */}
     {/*  <div className="w-full h-fit bg-lightPink">
        <div className="px-10 h-full mx-auto flex flex-col p-8">

          <div>
            <h1 className="flex flex-col lg:pt-0 xsm:pt-12 lg:items-start xsm:items-center justify-center
                        text-4xl font-semibold lg:py-8 xsm:py-0 lg:pl-16 xsm:pl-0">
              Baby Shower Theme-
            </h1>
          </div>

          <div className='px-4 sm:px-8 lg:px-12'>
            <div className=''>
              <div className='flex flex-col lg:flex-row justify-between'>
              </div>
              <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
                <div
                  id='slider2'
                  className={`flex w-full absolute transition-all top-0`}
                  style={{ left: `${sliderPositions.slider1}rem` }}            >
                  {theme.map((theme, index) => (
                    <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                      <Image loading="lazy" className='select-none h-96 w-80' src={theme.img} height={250} width={250} />
                      <p className='mt-3 font-semibold text-sm m-0'>{theme.title}</p>
                      <p className='text-xs m-0'>{theme.desc}</p>
                    </div>
                  ))}
                </div>
                <div className='h-[10em] xsm:h-[28em] lg:h-[28em]'></div>
              </div>
            </div>
          </div>

        </div>
      </div> */}



    </div>
  )
}

export default BabyShower
