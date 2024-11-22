import React from 'react'

const Location = () => {
  return (
    <section className="h-fit py-16 p-3 px-10 bg-veryLightPink flex flex-col space-y-14">
      {/* Location Heading */}
      <header className="text-center space-y-1">
        <h1 className="sm:text-2xl font-bold xsm:text-xl">Pharmaceutical Service Locations</h1>
        <p className="text-xs text-center">At MedTrack Pharma, we ensure high-quality pharmaceutical services across key locations, bringing reliable medical supplies to your doorstep.</p>
      </header>

      {/* Locations Images */}
      <div className="flex md:flex-row justify-between self-center
                  xsm:flex-col md:space-y-0 xsm:space-y-3 
                  xsm:min-w-full "> 
        {/* Location 1 */}
        <div className="md:max-w-[30%] space-y-2">
            <img loading="lazy" src='/location/patna.jpg' className="rounded-2xl sm:w-[32rem] sm:h-[20rem]" alt="Patna Pharmacy Services"></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Patna</h1>
            <p className="text-sm">Providing top-tier pharmaceutical services, ensuring patients in Patna receive timely access to essential medicines and healthcare products.</p>
        </div>
        {/* Location 2 */}
        <div className="md:max-w-[30%] space-y-2">
            <img loading="lazy" src='/location/gaya.jpg' className="rounded-2xl w-[32rem] h-[20rem]" alt="Gaya Pharmacy Services"></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Gaya</h1>
            <p className="text-sm">Serving Gaya with a wide range of pharmaceutical solutions, from prescription medicines to over-the-counter health products, delivered with care.</p>
        </div>
        {/* Location 3 */}
        <div className="md:max-w-[30%] space-y-2">
            <img loading="lazy" src='/location/Nalanda.jpg' className="rounded-2xl w-[32rem] h-[20rem]" alt="Nalanda Pharmacy Services"></img>
            <h1 className="md:text-lg font-semibold sm:text-md">Nalanda</h1>
            <p className="text-sm">Our pharmaceutical services in Nalanda combine quality, convenience, and patient-centered care to support your health needs effectively.</p>
        </div>
       
      </div>
    </section>
  )
}

export default Location
