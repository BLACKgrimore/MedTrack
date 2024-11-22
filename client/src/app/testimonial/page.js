import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const testimonials = [
    {
        name: 'Dr. Aarti Singh',
        img: '/profile.png',
        text: '"MedTrack has transformed how we manage our pharmacy inventory. The real-time stock updates and supplier integration have saved us so much time and effort!"',
        designation: 'Owner, LifeCare Pharmacy'
    },
    {
        name: 'Rajesh Mehta',
        img: '/profile.png',
        text: '"As a supplier, MedTrack has streamlined communication with our clients. Managing orders and tracking delivery statuses has never been easier!"',
        designation: 'Regional Manager, HealthLine Suppliers'
    },
    {
        name: 'Sana Kapoor',
        img: '/profile.png',
        text: '"We used to face constant stockouts and overstock issues. MedTrack’s smart analytics have optimized our ordering process, improving customer satisfaction."',
        designation: 'Manager, WellCare Pharmacy'
    },
    {
        name: 'Amit Sharma',
        img: '/profile.png',
        text: '"The integration of invoicing and timesheets has made MedTrack indispensable for our business. It’s a complete solution for modern pharmacy needs."',
        designation: 'Finance Lead, MediSupply Co.'
    },
];

const Testimonial = () => {
    return (
        <div className="bg-[#97d8f9]">
            {/* Header Section */}
            <div
                className="bg-[url('/backgrounds/testimonial-bg.jpg')] bg-cover md:pt-20 xsm:pt-28 bg-center bg-no-repeat text-white flex justify-center items-center font-serif"
                style={{
                    height: 'clamp(6rem, 10vw, 12rem)', // Responsive height: 6rem for small screens, scales up to 12rem for larger screens
                }}
            >
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-4 text-center leading-tight"
                >
                    What Our Users Are Saying
                </h1>
            </div>


            {/* Testimonials Section */}
            <div className="flex justify-center items-center gap-10 flex-wrap mt-14 md:mt-28 px-4">
                {testimonials.map((item, index) => (
                    <div
                        key={index}
                        className="h-96 bg-[#FFFFFF] w-full sm:w-64 p-4 border border-gray-200 shadow-lg mt-10 rounded-2xl flex flex-col items-center"
                    >
                        <img
                            loading="lazy"
                            className="w-20 h-20 rounded-full -mt-14"
                            src={item.img}
                            alt={item.name}
                        />
                        <div className="overflow-y-auto scrollbar-hide w-full h-full flex flex-col items-center">
                            <p className="text-lg md:text-xl text-center mt-4">{item.text}</p>
                            <h3 className="font-bold text-center text-xl md:text-2xl pt-5">
                                {item.name}
                            </h3>
                            <p className="text-sm md:text-base">{item.designation}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call-to-Action Button */}
            <div className="flex justify-center items-center mt-10 pb-10">
                <Link href="/about">
                    <button className="text-xl md:text-2xl bg-[#4CAF50] text-white p-2 rounded-full flex justify-center items-center gap-3 px-6 md:px-10 py-2 md:py-3 shadow-md">
                        Know More <FaArrowRight />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Testimonial;
