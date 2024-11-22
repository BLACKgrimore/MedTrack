"use client"
import React, { useState } from 'react'

import { FiArrowRightCircle, FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

const reviews = [
    {
        review: "Evego Event made our wedding day unforgettable! Their meticulous planning and creative touches turned our vision into a stunning reality. Everything was perfect, and our guests were impressed. We couldn’t have asked for a better experience!",
        name: "Wedding Review:",
        from: "— Riya & Arjun Patel"
    }, {
        review: "Evego Event delivered an exceptional corporate gala for us. Their attention to detail and innovative ideas ensured a seamless and impressive event. We were thrilled with the results and will definitely work with them again!",
        name: "Corporate Event Review:",
        from: "— Sanjay Mehra, CEO of TechNova Solutions"
    }, {
        review: "Evego Event organized a fantastic birthday party for my daughter. The creative themes and smooth execution made it a memorable day for everyone. I enjoyed the event stress-free, thanks to their expert planning!",
        name: "Birthday Party Review:",
        from: "— Maya Sharma"
    },
]

const Review = () => {
    const [activeReview, setActiveReview] = useState(0)
    return (
        <div className='flex flex-col md:px-12 px-5'>
            <div className='flex sm:flex-row flex-col w-full justify-between mt-24'>
                <div className='w-full grid md:grid-cols-4 gap-12'>
                    <div>
                        <h1>REVIEWS</h1>
                        <p className='md:text-sm text-xs'>Shop with confidence by exploring reviews from customers who have experienced Evego Events.</p>
                        <div className='flex items-center mt-2'>
                            {Array.from(Array(5).keys()).map(() => <FaStar className='text-yellow-300 me-1' />)}
                            <p className='font-bold'>5/5</p>
                        </div>Lake Forest, CA
                        <div className='text-sm mt-3'>
                            2.479 <br />reviews
                        </div>
                    </div>
                    <div className='w-full md:col-span-3 flex flex-col justify-between md:px-12'>
                        <div className='flex'>
                            {reviews.map((data, index) => {
                                return (
                                    <div className={`${(index == activeReview) ? "flex flex-col" : "hidden"}`}>
                                        <p className='md:text-3xl sm:text-2xl text-xl '>{data.name}</p>
                                        <p className='flex flex-col'>
                                            <span>{data.review}</span>
                                            <span className='text-sm'>{data.from}</span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <FiArrowLeftCircle size={30} className='mx-1 cursor-pointer select-none' onClick={(() => { (activeReview == 0) ? setActiveReview(reviews.length - 1) : setActiveReview(activeReview - 1) })} />
                    <FiArrowRightCircle size={30} className='mx-1 cursor-pointer select-none' onClick={(() => { (activeReview == reviews.length - 1) ? setActiveReview(0) : setActiveReview(activeReview + 1) })} />
                </div>
            </div>
            <div className='grid grid-rows-2 md:gap-5 gap-2  mt-12'>
                <div className='grid grid-cols-3 md:gap-5 gap-2' >
                    <div className='md:min-h-[80vh] min-h-[50vh] bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                    <div className='md:min-h-[80vh] min-h-[50vh] col-span-2 bg-red-500 rounded-lg' style={{ background: "url(/reviewsImgs/image2.png)", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                </div>
                <div className='w-full min-h-[50vh] cursor-pointer bg-red-500 rounded-lg relative group' style={{ background: "url(/reviewsImgs/image3.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
                    <span className='h-full w-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
                    <div className='z-8 absolute md:top-10 top-4 md:left-10 left-4'>
                        <div className='relative'>
                            <h1 className='text-white font-serif md:text-4xl text-2xl'>Get inspired from <br />
                                our Instagram<span className='absolute md:bottom-2 bottom-1 md:right-6 right-14 bg-[#FF8F50] h-5 w-5 rounded-full flex items-center justify-center text-white'><FiArrowRight /></span></h1>
                        </div>
                        <p className='font-sans text-white md:text-sm text-xs font-light'><br/>If you use hashtag #evegoevent you will spotlight us.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review