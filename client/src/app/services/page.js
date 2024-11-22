import React from 'react'
import { FaArrowRight, FaCheck } from "react-icons/fa";


const services = [
  {
    url: "url('/reviewsImgs/image3.png')",
    title: "Venue Selection and Booking",
    desc: "Assistance in finding and booking the perfect venue"
  }, {
    url: "url('/service-section/image4.png')",
    title: "Entertainment and Performances",
    desc: "Entertainment arrangement to enhance event atmosphere."
  }, {
    url: "url('/service-section/image5.png')",
    title: "Decor and Theming",
    desc: "Professional decor services to transform the venue"
  }, {
  }, {
    url: "url('/service-section/image5.png')",
    title: "Decor and Theming",
    desc: "Professional decor services to transform the venue"
  }, {
  // {
  //   url: "url('/service-section/image6.png')",
  //   title: "Catering and Menu Planning",
  //   desc: "Comprehensive catering services with customizable menu options"
  // },
   
    url: "url('/service-section/image7.png')",
    title: "Photography and Videography",
    desc: "Capturing moments through professional photography and videography services."
  }, {
    url: "url('/service-section/image8.png')",
    title: "Event Coordination and Management",
    desc: "Full event management services to oversee everything from planning to execution."
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

const Services = () => {
  return (
    <>
      <div className=' min-h-[20em] pt-24 text-white flex flex-col items-center bg-red-500 py-12' style={{ background: "url(/service-section/image3.png)", backgroundPosition: "bottom", backgroundSize: "cover" }}>
        <h1 className='md:text-6xl text-3xl font-bold '>Our Services</h1>
        <p className='md:text-xl text-lg md:max-w-[60%] px-5 text-center mt-8 md:font-bold'>At Evego Event, we create unforgettable experiences for every occasion. From meticulous planning to
          flawless execution, our expert team ensures your event stands out. Explore our services and let us turn your
          next event into something truly extraordinary.</p>
      </div>
      <div className='md:px-12 px-5'>
        <div className='flex flex-col justify-center my-12'>
          <div>
            <h1 className='md:text-5xl text-3xl font-bold'>Need Help Planning Your Wedding?</h1>
            <p className='md:text-3xl text-xl my-3'>We Are Here To Help! We have everything,
              <br /> for your events</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-around lg:flex-nowrap flex-wrap'>
              {services.slice(0, 3).map((service, index) => {
                return
                <div key={index}  className='border border-yellow-400 rounded p-3 lg:m-12 m-5 cursor-pointer md:max-w-[20em] md:w-[20em] w-full'>
                  <div className='h-52 relative group' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                    <span className='z-5 h-full w-full opacity-75 group-hover:opacity-50 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
                    <span className='w-full ps-3 pb-3 absolute bottom-0 left-0 font-bold text-white text-xl'>{service.title}</span>
                  </div>
                  <p className='text-sm mt-3 mx-2'>{service.desc}</p>
                </div>
              })}
            </div>
            <div className='flex justify-around lg:flex-nowrap flex-wrap'>
              {services.slice(3, 6).map((service, index) => {
                return
                <div key={index} className='border border-yellow-400 rounded p-3 lg:m-12 m-5 cursor-pointer md:max-w-[20em] md:w-[20em] w-full'>
                  <div className='h-52 relative group' style={{ background: service.url, backgroundPosition: "center", backgroundSize: "cover" }}>
                    <span className='z-5 h-full w-full opacity-75 group-hover:opacity-50 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
                    <span className='w-full ps-3 pb-3 absolute bottom-0 left-0 font-bold text-white text-xl'>{service.title}</span>
                  </div>
                  <p className='text-sm mt-3 mx-2'>{service.desc}</p>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center my-12'>
          <div>
            <h1 className='text-3xl font-bold text-center'>Our Pricing Plans</h1>
            <p className='text-center md:font-bold text-sm my-4 md:max-w-[70%] mx-auto'>At Evego Event, we believe in transparency and flexibility to suit your event needs. Our pricing plans are
              designed to offer exceptional value while to various budgets and event sizes. Here’s a glimpse into
              how we structure our pricing:</p>
          </div>
          <div className='flex lg:flex-nowrap flex-wrap justify-center'>
            {plans.map((plan, index) => {
              return <div key={index} className={`md:max-w-[18em] md:w-[16em] w-full ${plan.scale ? "lg:scale-110" : ""} flex flex-col p-5 rounded-lg border border-black md:m-12 m-5`}>
                <div className='flex flex-col items-center mb-5'>
                  <span className='font-bold'>{plan.title}</span>
                  <span className='font-bold text-xl'>{plan.price}</span>
                  <span>{plan.desc}</span>
                </div>
                <div>
                  <div className='flex flex-col'>
                    {plan.benefits.map((benefit, index) => <span key={index} className='flex items-center'><FaCheck className='me-3' />{benefit}</span>)}

                  </div>
                </div>
                <button className='mt-4 bg-black text-white rounded-full px-5 py-1 cursor-not-allowed'>Purchase Now</button>
              </div>
            })}
          </div>
        </div>
        <div className=' text-white bg-red-500 p-12 rounded-3xl relative group cursor-pointer' style={{ background: "url('/service-section/image2.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}>
          <h1 className='md:text-5xl text-3xl z-10 relative font-bold'>We are for making  the wedding a joy</h1>
          <p className='mt-6 z-10 relative  md:text-2xl text-sm max-w-[27em]'>Streamline your event planning by scheduling appointments with clients and vendors in your calendar and
            managing your event budget all in one place.</p>
          <button className='mt-4 z-10 relative  bg-[#FF8F50] text-white rounded px-5 py-2'>Purchase Now</button>
          <span className='h-full  rounded-3xl w-full backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
        </div>
      </div>
    </>
  )
}

export default Services