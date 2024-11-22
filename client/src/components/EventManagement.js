import Link from 'next/link'
import React from 'react'

const EventManagement = () => {
  return (
    // Main Event Container
    <section className="bg-veryLightPink h-fit py-4">
      
      {/* Event  */}
      <event className="min-w-[90%] flex flex-col md:flex-row items-center py-4 
                    mx-[5%] space-y-0 md:space-y-0">
        {/* Event-Head_Title */}
        <eventhead className="max-w-full flex  md:flex-row md:space-y-0
                        xsm:flex-col sm:flex-col md:1/2 sm:space-y-4 xsm:space-y-4 ">
          <h1 className="md:max-w-sm float-left md:text-3xl lg:mr-[5rem] xlg:mr-[17rem] xxlg:mr-[22rem] xl:mr-[26rem] 
                      xxl:mr-[36rem] lg:text-4xl font-semibold sm:text-2xl xsm:text-xl">Events Management & Planning Services that turns family functions into unforgettable festival.
          </h1>


          <div className="md:w-1/2 max-w-7xl float-right">
            {/* Event Bio */}
            <p className="max-w-md text-veryLightGray text-justify text-[.9rem]">At Evego Event, we are dedicated to crafting extraordinary and memorable experiences.
            From the initial concept to the final execution, we are with you every step of the way.<br/>Contact us today to embark on your journey of planning a dream event with unbeatable
            prices and unforgettable moments.</p><br></br>

            {/* Event Button */}
            <Link href="/contactus" className="text-sm font-bold p-3 px-8 pt-3 text-black bg-transparent rounded-full border-black border-[1px]">Contact</Link>
          </div>
        </eventhead>
      </event>

      {/* Event-Body_Pics */}
      <eventbody className="max-w-[90%] flex flex-col my-8 mx-auto space-y-16">
        {/* Plan Event 1 */}
        <planevent1 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover
                         bg-[url('/aboutus/about1.png')] sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Gift your loved one’s a Memorable Birthday Party</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">At Evego Event, we specialize in effortless birthday planning, with a devoted team dedicated to
perfecting every detail. Our goal is to ensure your celebration is not just memorable but truly
extraordinary. Let us handle the stress while you enjoy an unforgettable birthday experience.</p>
            <Link href="/birthday" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl  ">Plan an Event</Link>
          </div>
        </planevent1>

        {/* Plan Event 2 */}
        <planevent2 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover
                         bg-[url('/herosec.png')] sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Celebrate Your Love with a Magical Wedding</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">Plan an extraordinary wedding with Evego Event and let us transform your vision into an unforgettable
celebration.<br/>Your dream day awaits—elegantly designed and impeccably realized.</p>
            <Link href="/marriage" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl ">Plan an Event</Link>
          </div>
        </planevent2>

        {/* Plan Event 3 */}
        <planevent3 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover
                         bg-[url('/location/event.png')] bg-center sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Host an Elegant and Joyous Affair</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">Plan your next event with Evego Event and let us transform your ideas into an unforgettable
celebration. Whether it’s a stylish fashion show, a joyful wedding, or a corporate milestone, we deliver
excellence and make every moment truly memorable.</p>
            <Link href="/awardceremony" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl ">Plan an Event</Link>
          </div>
        </planevent3>

      </eventbody>
    </section>
  )
}



export default EventManagement