"use client"
import React from 'react'
import Image from 'next/image'
// Fonts
import { Plus_Jakarta_Sans } from 'next/font/google'
// icons
import { FaPlay } from "react-icons/fa";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })

const BestService = () => {
  return (
    <div className={`${plus_Jakarta_Sans.className} md:px-12 px-5 mt-12`}>
      <div className='grid md:grid-cols-3 gap-4'>
        <h1 className='md:text-4xl text-2xl col-span-2 max-w-96'>Start Your Journey with Evego Event and Discover the Perfect Planner to Realize Your
        Vision!</h1>
        <p className='md:text-sm text-xs font-light'>Start Your Journey Today with an Evego Event and Find the Perfect Event Planner to Bring Your Vision to Life!<br></br>
            At Evego Event, we understand that planning an event can be overwhelming. That’s why we are here to help you every step of the way. With our expert team of event planners, you can relax and enjoy the process, knowing that
            your event will be executed flawlessly and within your budget.</p>
      </div>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-4  mt-12'>
        <div className='md:col-span-1 p-6 bg-[#01020533] rounded-lg h-56 w-full flex flex-col justify-between'  style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
          <div className='flex flex-col'>
            <span className='text-4xl font-extrabold'>20+</span>
            <span className='font-light text-sm'>Projects finished superbly</span>
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
        <div className='md:col-span-2 h-56 rounded-lg relative bg-meet group bg-cover bg-center flex justify-center items-center cursor-pointer'>
          <span className='text-white font-extrabold z-8 sm:text-4xl text-xl'>HOW WE WORK</span>
          <span className='h-full w-full  opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
          <span className='absolute -bottom-3 -right-3 bg-[#99EA48] p-7 rounded-full border-4 border-white'>
            <FaPlay />
          </span>
        </div>
      </div>
    </div>
  )
}

export default BestService