"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { PiGlobeHemisphereEastThin } from "react-icons/pi";
import { IoMedicalOutline } from "react-icons/io5"; // Pharmaceutical icon
import { IoSearch } from "react-icons/io5";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoPricetagsOutline } from "react-icons/io5";

// Example pharmaceutical services, you can replace with actual ones.
const serviceArray = ["Pharmacy", "Consultation", "Medicine Delivery", "Health Checkups", "Lab Tests", "Telemedicine", "Prescription Refills", "Wellness", "Chronic Care", "Emergency Care", "Medical Supplies", "Vaccinations", "Mental Health", "Health Advice"];

const HeroSection = () => {
    const [carousel, setCarousel] = useState(0);
    const location = useRef(null);
    const service = useRef(null);
    const price = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setCarousel((prev) => (prev === 2 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault();
        const locationValue = location.current?.value || '';
        const serviceValue = service.current?.value || '';
        const priceValue = price.current?.value || '';
        router.push(`/search?location=${locationValue}&service=${serviceValue}&price=${priceValue}`)
    }

    // HERO SECTION
    return (
        <hero className="md:min-h-[36rem] xsm:min-h-[30rem] h-fit flex flex-col xsm:space-y-14 md:space-y-8">

            <div className="sm:h-[36rem] w-full xsm:h-[100vh] relative">
                <div className='absolute top-0 left-0 -z-10 w-full h-full blur-sm brightness-50'>
                    <Image
                        loading="lazy"
                        id='carousel-image-1'
                        style={{ opacity: (carousel === 0 ? 1 : 0), zIndex: (carousel === 0 ? 1 : 0) }}
                        className='absolute h-full w-full object-cover transition-opacity duration-1000'
                        src={"/medtrack/pic1.jpeg"} // Replace with pharmacy-related image
                        height={1000}
                        width={1000}
                        alt="Hero Section 1"
                    />
                    <Image
                        loading="lazy"
                        id='carousel-image-2'
                        style={{ opacity: (carousel === 1 ? 1 : 0), zIndex: (carousel === 1 ? 1 : 0) }}
                        className='absolute h-full w-full object-cover transition-opacity duration-1000'
                        src={"/medtrack/pic2.jpeg"} // Replace with pharmacy-related image
                        height={1000}
                        width={1000}
                        alt="Hero Section 2"
                    />
                    <Image
                        loading="lazy"
                        id='carousel-image-3'
                        style={{ opacity: (carousel === 2 ? 1 : 0), zIndex: (carousel === 2 ? 1 : 0) }}
                        className='absolute h-full w-full object-cover transition-opacity duration-1000'
                        src={'/medtrack/pic3.jpeg'} // Replace with pharmacy-related image
                        height={1000}
                        width={1000}
                        alt="Hero Section 3"
                    />
                </div>

                <div className="text-white flex flex-col text-center justify-center content-center sm:h-[35rem]
                     xsm:h-[100vh] min-w-28 space-y-5 xsm:mt-4 md:p-0 sm:mt-8 md:mt-4">
                    <p>Reliable Healthcare, Anytime, Anywhere</p>

                    <h1 className="md:text-4xl sm:text-2xl md:p-0 text-center xsm:text-5xl font-semibold">Your Health, Our Priority</h1>

                    <p className="md:max-w-[35rem] sm:max-w-[25rem] xsm:max-w-[15rem] text-sm self-center">Access trusted pharmacy services, consultations, and medicine delivery — all at your convenience. Let us help you stay healthy!"
                    </p>

                    <form onSubmit={handleSubmit} className="bg-white w-fit md:gap-0 xsm:gap-2 text-black md:rounded-xl xsm:rounded-full md:p-3 xsm:p-1 text-sm self-center flex md:flex-row
                        text-center justify-center content-center md:space-x-4 xsm:space-x-0 ">

                        {/* Search 1 */}
                        <div className="relative flex items-center focus-within:text-lightorange">
                            <PiGlobeHemisphereEastThin className="w-5 h-9 absolute md:ml-3 xsm:ml-1 pointer-events-none" />
                            <input type="text"
                                required
                                placeholder="Location"
                                ref={location}
                                className="pr-3 md:pl-10 xsm:pl-6 md:max-w-[9rem] sm:max-w-[7rem] xsm:max-w-[5rem] px-3 py-2 border-[1px]
                         border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                            >
                            </input>
                        </div>
                        {/* search 2 */}
                        <div className="relative flex items-center focus-within:text-lightorange">
                            <IoMedicalOutline className="w-5 h-9 absolute md:ml-3 xsm:ml-1 pointer-events-none" />
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
                                placeholder="Price Range"
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
    )
}

export default HeroSection
