"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiGlobeHemisphereEastThin } from "react-icons/pi";
import { BsBusFront } from "react-icons/bs";
import { IoPricetagsOutline, IoSearch } from "react-icons/io5";
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'

// Fonts
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from 'next/navigation';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })
const serviceArray = ["Dj", "Event Manager", "Car Rentals", "Banquet Hall", "Marriage Hall", "Restraunt", "Anchor", "Singer", "Dancer", "Decorator", "Game", "Photo Grapher", "Video Grapher", "Pandit", "Fashion Design", "Crockery", "Body Guard", "Jewellery", "Clothes Wedding", "Marriage", "Birthday", "Babyshower", "Fresher Party", "Fair Well", "Annual Function", "Ceremony",  "Anniversary", "Pooja", "Designer ", "Photography"]

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

const SearchResult = () => {

    const handleVenue = () => {
        const serviceValue = 'Babyshower' || '';
        router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
    }
    const handleBirthday = () => {
        const serviceValue = 'Birthday' || '';
        router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
    }
    const handlePooja = () => {
        const serviceValue = 'Pooja' || '';
        router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
    }
    const handleCeremony = () => {
        const serviceValue = 'Ceremony' || '';
        router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
    }
    const handleMarriage = () => {
        const serviceValue = 'Marriage' || '';
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
    const location = useRef(null);
    const service = useRef(null);
    const price = useRef(null);


    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault();
        const locationValue = location.current?.value || '';
        const serviceValue = service.current?.value || '';
        const priceValue = price.current?.value || '';
        router.push(`/search?location=${locationValue}&service=${serviceValue}&price=${priceValue}`)
    }
    return (
        <div className="flex flex-col pt-8 bg-veryLightPurple">

            <hero className="md:min-h-[36rem] sm:min-h-[30rem] h-fit bg-veryLightPink flex flex-col sm:space-y-14 md:space-y-8">

                <div className="bg-[url('/search_result/hero.png')] bg-cover bg-center bg-no-repeat md:h-[36rem] w-full sm:h-[30rem]">

                    <div className="text-white flex flex-col text-center justify-center content-center md:h-[35rem]
               xsm:h-[28rem] min-w-28 space-y-5 xsm:mt-4 sm:mt-8 md:mt-4">

                        <h1 className="md:text-4xl sm:text-2xl xsm:text-4xl font-semibold py-8">India’s Largest Event Service Marketplace</h1>

                        <form onSubmit={handleSubmit} className="bg-white w-fit md:gap-0 xsm:gap-2 text-black md:rounded-xl xsm:rounded-full md:p-3 xsm:p-1 text-sm self-center flex md:flex-row
                        text-center justify-center content-center md:space-x-4 xsm:space-x-0 ">

                            {/* Search 1 */}
                            <div className="relative flex items-center focus-within:text-lightorange">
                                <PiGlobeHemisphereEastThin className="w-5 h-9 absolute md:ml-3 xsm:ml-1 pointer-events-none" />
                                <input type="text"
                                    placeholder="Location"
                                    required
                                    ref={location}
                                    className="pr-3 md:pl-10 xsm:pl-6 md:max-w-[9rem] sm:max-w-[7rem] xsm:max-w-[5rem] px-3 py-2 border-[1px]
                         border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                                >
                                </input>
                            </div>
                            {/* search 2 */}
                            <div className="relative flex items-center focus-within:text-lightorange">
                                <BsBusFront className="w-5 h-9 absolute md:ml-3 xsm:ml-1 pointer-events-none" />
                                <select
                                    type="text"
                                    name="serviceCategory"
                                    ref={service}
                                    className="pr-3 md:pl-10 xsm:pl-6 md:max-w-[9rem] sm:max-w-[7rem] xsm:max-w-[5rem] px-3 py-2 border-[1px]
                         border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                                    required
                                >
                                    {serviceArray.map((item, index) => (
                                        <option key={index} value={`${item}`}>{`${item}`}</option>
                                    ))}
                                </select>
                            </div>

                            {/* search 3 */}
                            <div className="relative flex items-center focus-within:text-lightorange">
                                <IoPricetagsOutline className="w-5 h-9 absolute md:ml-3 xsm:ml-1 pointer-events-none" />
                                <input type="text"
                                    placeholder="Price"
                                    required
                                    ref={price}
                                    className="pr-3 md:pl-10 xsm:pl-7 md:max-w-[9rem] sm:max-w-[7rem] xsm:max-w-[5rem] px-3 py-2 border-[1px]
                         border-veryLightGray rounded-full focus:outline-none focus:border-lightorange">
                                </input>
                            </div>

                            <button type='submit' className=" flex flex-row md:text-[.8rem] xsm:text-[.8rem] h-full px-3 gap-1
                              font-semibold text-black bg-veryLightOrange rounded-full justify-between items-center">
                                <span className="md:flex xsm:hidden">Search</span>
                                <span className=""><IoSearch className="md:h-8 md:w-5 xsm:h-10 xsm:w-5" /></span>
                            </button>

                        </form>
                    </div>

                </div>

            </hero>

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
                                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                                    <Image loading="lazy" className='select-none rounded-[50%] h-48 w-48' src={venue.img} height={250} width={250} />
                                    <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className='h-[10em] xsm:h-[17em] lg:h-[17em]'></div>
                    </div>
                </div>
            </div>

            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Babyshower <FaArrowRight className='ml-3' />
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


            <div className="w-full h-fit bg-veryLightPink">
                <div className="px-10 h-full mx-auto flex flex-col py-10">
                    <div className={`${plus_Jakarta_Sans.className}`}>

                        <div className='grid md:grid-cols-3 grid-cols-1 gap-9'>

                            <div className='md:col-span-2 h-56 rounded-lg relative bg-book gap-8 group bg-cover bg-center flex flex-col justify-center items-center'>
                                <div className='text-white flex justify-center items-end font-extrabold z-10 sm:text-4xl w-full h-full text-xl'>Book a vendor in simple steps :</div>
                                <div className='text-white flex justify-center items-start font-extrabold z-10 w-full h-full'>
                                    <h1 className="md:text-6xl xsm:text-5xl">1</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                                    <h1 className="md:text-6xl xsm:text-5xl">2</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                                    <h1 className="md:text-6xl xsm:text-5xl">3</h1><span className="md:text-sm xsm:text-[.6rem] max-w-48 sm:p-3 xsm:p-0">Send your requirements to Multiple Vendors</span>
                                </div>
                            </div>

                            <div className='md:col-span-1 p-6 bg-[#01020533] rounded-lg h-56 w-full flex flex-col justify-between' style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
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


            {/* Venue  */}
            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Marriage Categories <FaArrowRight className='ml-3' />
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
                            id='slider3'
                            className={`flex w-full absolute transition-all top-10`}
                            style={{ left: `${sliderPositions.slider3}rem` }}
                            onClick={() => handleMarriage()}
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

            {/* Bridal Makeup Artists */}
            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Pooja Categories <FaArrowRight className='ml-3' />
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
                            id='slider4'
                            className={`flex w-full absolute transition-all top-10`}
                            style={{ left: `${sliderPositions.slider4}rem` }}
                            onClick={() => handlePooja()}
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
            </div>

            {/* The Best Wedding Caterers */}
            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Award Ceremony Categories <FaArrowRight className='ml-3' />
                            </h1>
                            <p className='max-w-xl lg:max-w-2xl mt-3'>
                                Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
                            </p>
                        </div>
                        <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                            <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider5')} />
                            <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider5')} />
                        </div>
                    </div>
                    <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
                        <div
                            id='slider5'
                            className={`flex w-full absolute transition-all top-10`}
                            style={{ left: `${sliderPositions.slider5}rem` }}
                            onClick={() => handleCeremony()}
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
                                            slider5: newPos
                                        }));
                                        setDotIndices((prev) => ({
                                            ...prev,
                                            slider5: i
                                        }));
                                    }}
                                    className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider5 === i ? 'bg-yellow-500' : ''
                                        }`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Birthday Categories <FaArrowRight className='ml-3' />
                            </h1>
                            <p className='max-w-xl lg:max-w-2xl mt-3'>
                                Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
                            </p>
                        </div>
                        <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                            <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider5')} />
                            <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider5')} />
                        </div>
                    </div>
                    <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
                        <div
                            id='slider5'
                            className={`flex w-full absolute transition-all top-10`}
                            style={{ left: `${sliderPositions.slider5}rem` }}
                            onClick={() => handleBirthday()}
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
                                            slider5: newPos
                                        }));
                                        setDotIndices((prev) => ({
                                            ...prev,
                                            slider5: i
                                        }));
                                    }}
                                    className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider5 === i ? 'bg-yellow-500' : ''
                                        }`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchResult
