import React from 'react'

const Location = () => {
  return (
    <location className="h-fit py-16 p-3 px-10 bg-veryLightPink flex flex-col space-y-14">
      {/* Location Heading */}
      <lhead className="text-center space-y-1">
        <h1 className="sm:text-2xl font-bold xsm:text-xl">Event Destinations</h1>
        <p className="text-xs text-center">At Evego Event, we bring our exceptional event planning services to various locations across Bihar</p>
      </lhead>

      {/* Loacations Images */}
      <div className="flex md:flex-row justify-between self-center
                  xsm:flex-col md:space-y-0 xsm:space-y-3 
                  xsm:min-w-full "> 
        {/* Location 1 */}
        <div className="md:max-w-[30%] space-y-2 ">
            <img loading="lazy" src='/location/patna.jpg' className="rounded-2xl sm:w-[32rem] sm:h-[20rem]"></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Patna</h1>
            <p className="text-sm">Experience the vibrant and historical heart of Bihar with events that blend tradition and modernity in perfect
            harmony </p>
        </div>
        {/* Location 2 */}
        <div className="md:max-w-[30%] space-y-2">
            <img loading="lazy" src='/location/gaya.jpg' className="rounded-2xl w-[32rem] h-[20rem]"></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Gaya</h1>
            <p className="text-sm">Host your events in the spiritual city of Gaya, where serenity and heritage come together to create a peaceful
            and memorable celebration. </p>
        </div>
        {/* Location 3 */}
        <div className="md:max-w-[30%] space-y-2">
            <img loading="lazy" src='/location/Nalanda.jpg' className="rounded-2xl w-[32rem] h-[20rem] "></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Nalanda</h1>
            <p className="text-sm">Embrace the historical and educational significance of Nalanda with events that are intellectually stimulating
            and beautifully organized. </p>
        </div>
       
      </div>
    </location>
  )
}

export default Location