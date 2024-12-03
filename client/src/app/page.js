import BestService from '@/components/BestService'
import EventManagement from '@/components/EventManagement'
import Faq from '@/components/Faq'
import HeroSection from '@/components/HeroSection'
import Location from '@/components/Location'
import Review from '@/components/Review'
import Service from '@/components/Service'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeroSection/>
        <Location/>
        <EventManagement/>
        {/* <BestService/> */}
        <Review/>
        <Service/>
        <Faq/>
    </div>
  )
}

export default page