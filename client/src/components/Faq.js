"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const serv = [{
  desc: "Our event planning process starts with an initial consultation to understand your vision and requirements. We then create a detailed plan, including budgeting, venue selection, and event design. Throughout the planning phase, we provide regular updates and handle all logistics. On the event day, our team ensures everything runs smoothly, allowing you to enjoy the event stress-free."
}]

const faqs = [{
  title: "What types of events does Evego Event specialize in?",
  desc: "Evego Event specializes in a wide range of events, including weddings, corporate functions, fashion shows, social gatherings, and more. Whether you’re planning a grand wedding, an elegant corporate gala, or a fun birthday party, our team is equipped to handle all types of events with creativity and professionalism."

}, {
  title: "How does the event planning process work with Evego Event?",
  desc: `${serv.map((ser, index) => {
    return `${ser.desc} `
  })}`

}, {
  title: "Can Evego Event work within a specific budget?",
  desc: "Yes, absolutely! At Evego Event, we tailor our services to fit your budget while delivering high-quality results. During the planning process, we discuss your budgetary constraints and provide options that align with your financial plans. Our goal is to create a memorable event without compromising on quality"

}, {
  title: "How far in advance should I book Evego Event for my event?",
  desc: "We recommend booking Evego Event as early as possible to secure your preferred date and allow ample time for planning. While we can accommodate events on shorter notice, early booking ensures that we have enough time to perfect every detail and provide the best possible service for your event."

}]

const Faq = () => {

  const [selectedFaq, setSelectedFaq] = useState(-1)
  return (
    <div className='grid md:grid-cols-2 md:px-12 px-5 gap-12 my-12'>
      <div className='flex flex-col '>
        <h1 className='text-3xl font-bold mb-3'>Events Planning FAQs</h1>
        <p className='text-sm my-3'>As a premier event planning agency, Evego Event is committed to offering detailed resources and answering frequently asked questions to support and guide our clients through every step of their event journey.</p>
        <div className=' my-3 flex items-center'>
          <button className='py-3 px-5 border rounded-full me-7 border-black hover:bg-black hover:text-white transition-all'>More Options</button>
         <Link href='/contactus'> <button  className='py-3 px-5 border rounded-full me-7 border-black hover:bg-black hover:text-white transition-all'>Contact Us</button> </Link>
        </div>
      </div>
      <div>
        {faqs.map((faq, index) => {
          return <div className='flex flex-col  border-b border-t border-black  transition-all overflow-hidden' onClick={() => { setSelectedFaq((selectedFaq == index) ? -1 : index) }}>
            <div className='py-7 cursor-pointer font-semibold md:text-2xl text-lg flex items-center justify-between select-none'>
              <span className='me-4'>{faq.title}</span>
              {index != selectedFaq ? <FaPlus /> : <FaMinus />}
            </div>
            <div className={`mb-4 mt-5 text-lg ${(index == selectedFaq) ? "inline" : "hidden"}`}>{faq.desc}</div>
          </div>
        })}
        
      </div>
    </div>
  )
}

export default Faq