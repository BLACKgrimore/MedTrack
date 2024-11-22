import React from 'react'
import { BsFillCameraFill } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";

const About = () => {
    return (
        <div className="flex flex-col font-serif bg-veryLightPink">
            <div className='bg-[url("/aboutus/aboutus.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[30rem] md:h-[30rem] lg:h-[30rem] w-full'>
                <h1 className="text-4xl xsm:text-4xl md:text-6xl lg:text-8xl">About Us</h1>
                <p className="text-sm md:text-lg lg:text-xl max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] text-center p-5 leading-loose">
                Welcome to Evego – Your Premier Event Management Partner
                Whether you're planning a dream wedding, a prestigious award ceremony, a
                memorable birthday celebration, or any other special event, Evego is here to
                transform your vision into reality
                </p>
            </div>

            <div className="w-full h-fit bg-veryLightPink flex flex-col justify-center items-center p-8 text-center
                      space-y-4">
                <p className="max-w-[80vw] text-xsm">Evego Events is here to make planning and booking your event easy and
                    stress-free. We offer everything you need for a great event, including
                    Venues,Photography,Decoration and security services.</p>
                <p className="max-w-[80vw] text-xsm">Why Choose Us?
                    Affordable Rates: Enjoy high-quality services without breaking the bank.
                    All-in-One Service: Manage all your event needs with just one platform.
                    Wide Range of Events: Whether it’s a small party or a large celebration, we handle
                    it all</p>
            </div>
            <div className="w-full min-w-80 flex md:flex-row md:h-fit xsm:max-h-[8remw] text-white bg-cover bg-center bg-no-repeat bg-[url('/aboutus/about1.png')] ">

                <div className="py-7 flex md:flex-row xsm:flex-col-reverse justify-center items-center">
                    <div className="md:w-[60vw] xsm:w-[100vw] p-4 flex flex-col md:justify-center xsm:items-center md:items-start md:pl-[7vw]
                                    xsm:space-y-4">
                        <div className="flex md:flex-col md:w-[60vw] xsm:w-[100vw] xsm:flex-col md:justify-start xsm:justify-around xsm:items-center text-darkorange">
                            <h1 className="md:text-4xl md:self-start md:py-5 xsm:py-0 md:max-w-[30vw] xsm:text-2xl font-semibold">“Crafting Unforgettable Moments”</h1>
                            <p className="md:py-6 text-white md:self-start md:max-w-[30vw] xsm:max-w-[60vw] md:text-xl xsm:text-sm md:leading-relaxed xsm:mt-4">Discover Unforgettable Experiences with Our All-in-One Event Booking Platform!</p>
                        </div>
                        <div className="flex md:flex-col xsm:flex-row pt-6 md:space-y-4 xsm:space-x-0">
                            <div className="flex flex-row space-x-4">
                                <BsFillCameraFill className="md:w-14 md:h-9 xsm:w-8 xsm:h-8" />
                                <div className="">
                                    <h1>Enjoy & Dine: </h1>
                                    <p className="text-[.8rem] max-w-[40vw] md:text-md xsm:text-smd">Easily book events and dining experiences all in one place.</p>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <TbCirclesRelation className="md:w-14 md:h-9 xsm:w-8 xsm:h-8" />
                                <div>
                                    <h1>Connect & Meet:</h1>
                                    <p className="text-[.8rem] max-w-[40vw]">Find new connections and opportunities effortlessly</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[40vw] flex xxlg:pb-5 md:flex-col xsm:flex-row justify-normal ">
                        <img loading="lazy" className="lg:w-[15rem] xxlg:ml-[3.5rem] xxlg:mb-[5rem] 
                                        lg:ml-[1.5rem] lg:mb-[5rem]
                                        md:mb-[5rem] sm:w-[12rem] sm:h-[12rem]
                                        sm:mb-[8rem]
                                        xsm:mb-[4rem]
                                        xsm:w-[8rem] xsm:h-[8rem]
                                        lg:h-[15rem] border-[.1rem]" src="/aboutus/about12.png">
                        </img>
                        <img loading="lazy" className="absolute xxlg:mt-[8rem] 
                                        lg:mt-[8rem]
                                        md:mt-[6.5rem] sm:w-[12rem] sm:h-[12rem]
                                        sm:mt-[6.5rem] sm:ml-[6rem]
                                        xsm:mt-[4rem] xsm:ml-[3rem]    xsm:w-[8rem] xsm:h-[8rem]
                                        lg:w-[15rem] lg:h-[15rem] border-[.1rem]  md:ml-[12vw]" src="/aboutus/about11.png">
                        </img>
                    </div>
                </div>
            </div>

            <div className="w-full h-fit bg-lightPurple py-8">
                <div className="flex flex-col w-full justify-center items-center space-y-4">
                    <h1 className="md:text-4xl xsm:text-2xl type font-semibold">"Life at Evego: Where Events Come Alive"</h1>
                    <p className="md:max-w-[45rem] sm:max-w-[25rem] xsm:max-w-[15rem] md:text-md xsm:text-sm text-center
                              self-center space-y-8 font-semibold">
                        At Evego Events, we celebrate creativity and teamwork. Our lively atmosphere
                        sparks innovation, making each event stand out. We embrace collaboration,
                        diversity, and personal growth, fostering a vibrant and exciting workplace. Join
                        our passionate team and help us create unforgettable experiences.
                    </p>
                </div>
                <div className="flex md:flex-row xsm:flex-col py-4 justify-evenly text-center items-center">
                    <div>
                        <img loading="lazy" className="rounded-[50%] md:w-32 md:h-32 xsm:w-60 xsm:h-60 my-6" src="/aboutus/about21.png"></img>
                        <p className="text-xl font-semibold">150+</p>
                        <p>cakes eaten</p>
                        <p>on the job</p>
                    </div>
                    <div>
                        <img loading="lazy" className="rounded-[50%] md:w-32 md:h-32 xsm:w-60 xsm:h-60 my-6" src="/aboutus/about22.png"></img>
                        <p className="text-xl font-semibold">650+</p>
                        <p>birthday candles</p>
                        <p>blown out</p>
                    </div>
                    <div>
                        <img loading="lazy" className="rounded-[50%] md:w-32 md:h-32 xsm:w-60 xsm:h-60 my-6" src="/aboutus/about23.png"></img>
                        <p className="text-xl font-semibold">50+</p>
                        <p>engagements</p>
                        <p>celebrated</p>
                    </div>
                    <div>
                        <img loading="lazy" className="rounded-[50%] md:w-32 md:h-32 xsm:w-60 xsm:h-60 my-6" src="/aboutus/about24.png"></img>
                        <p className="text-xl font-semibold">600+</p>
                        <p>total wedding</p>
                        <p>attended</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About