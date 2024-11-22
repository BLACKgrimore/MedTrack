'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const weddingsections = [
    { img: "/marriage/image35.png", title: "Ceremony Management", desc: "Includes setting up the ceremony site, organizing the processional and recessional." },
    { img: "/marriage/image36.png", title: "Reception Coordination", desc: "Includes coordinating speeches, first dances, meal service, and any other scheduled activities." },
    { img: "/marriage/image37.png", title: "Guest Assistance", desc: "Ensures guests feel welcomed and cared for throughout the event." },
    { img: "/marriage/image38.png", title: "Emergency Kit", desc: "Includes items like safety pins, sewing kit, band-aids, pain relievers, stain remover, and more." },
    { img: "/marriage/image39.png", title: "Setup and Tear Down", desc: "Includes ensuring the venue is restored to its original condition if required." },
    { img: "/marriage/image40.png", title: "Bride and Groom Assistance", desc: "Includes helping with attire adjustments, managing personal items, and providing refreshments." },
    { img: "/marriage/image41.png", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
    { img: "/marriage/image41.png", title: "Décor and Floral Setup", desc: "Includes coordinating with florists and decorators to bring the vision to life." },
    // { img: "/marriage/image42.png", title: "Catering and Bar Management", desc: "Includes managing the serving schedule, dealing with any dietary needs, so all guests are served properly." },
    { img: "/marriage/image43.png", title: "End-of-Night Coordination", desc: "Managing the end of the event, including packing up gifts, personal items, and ensuring everyone has transportation." },
]

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ weight: '600', subsets: ["latin"] })

const cinematographySectionOptions = [
    { img: "/marriage/image30.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image31.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image32.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image33.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image34.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image35.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image30.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
    { img: "/marriage/image31.png", title: "The White Wings, Hauz Khas", desc: "Green Park - Hauz Khas, South Delhi", price: "1 Day Wedding Package ₹80,000" },
]

const vendors = [
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
    { img: "/marriage/image10.png", title: "Event Planners" },
]

const venues = [
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
    { img: "/marriage/image48.png", title: "4Star+ Wedding at Destination", desc: "Incredible Udaipur Wedding That Was A Perfect Blend Of Tradition & Modernity..." },
]


const slides = [
    {
        image: '/awardCeremony/playimg.jpg',
        alt: 'Award Ceremony Image',
    },
    {
        image: '/awardCeremony/redr1.jpg',
        alt: 'Award Category Image',
    },
    {
        image: '/awardCeremony/vanueimg1.jpg',
        alt: 'Venue Image',
    },
    {
        image: '/awardCeremony/nominationemg.jpg',
        alt: 'Nomination Image',
    },
];

const awardsData = [
    {
        name: 'Jennifer Lawrence',
        achievement: 'Lifetime Achievement',
        year: 2024,
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Leonardo DiCaprio',
        achievement: 'Special Achievement',
        year: 2024,
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Viola Davis',
        achievement: 'Best Actress Achievement',
        year: 2024,
        image: 'https://via.placeholder.com/150',
    },
    {
        name: 'Denzel Washington',
        achievement: 'Advocate Achievement',
        year: 2024,
        image: 'https://via.placeholder.com/150',
    },
];

const AwardCeremony = () => {


    const router = useRouter()
    const handleVenue = () => {
        const serviceValue = 'Ceremony' || '';
        router.push(`/search?location=N/M&service=${serviceValue}&price=N/M`)
    }
    const [sliderPositions, setSliderPositions] = useState({
        slider1: 0,
        slider2: 0,
        slider3: 0,
        slider4: 0,
        slider5: 0
    });

    const [dotIndices, setDotIndices] = useState({
        slider1: 0,
        slider2: 0,
        slider3: 0,
        slider4: 0,
        slider5: 0
    });

    const imageWidth = 20; // Width of each image in rem, adjust as needed
    const maxDots = 5; // Maximum number of dots to display
    const visibleImages = 5; // Number of visible images based on screen width
    const maxSliderPos = -(imageWidth * (venues.length - visibleImages));

    const handleLeftClick = (sliderName) => {
        if (dotIndices[sliderName] > 0) {
            setSliderPositions((prev) => ({
                ...prev,
                [sliderName]: prev[sliderName] + imageWidth
            }));
            setDotIndices((prev) => ({
                ...prev,
                [sliderName]: prev[sliderName] - 1
            }));
        } else {
            setSliderPositions((prev) => ({
                ...prev,
                [sliderName]: maxSliderPos
            }));
            setDotIndices((prev) => ({
                ...prev,
                [sliderName]: venues.length - visibleImages
            }));
        }
    };

    const handleRightClick = (sliderName) => {
        if (dotIndices[sliderName] < venues.length - visibleImages) {
            setSliderPositions((prev) => ({
                ...prev,
                [sliderName]: prev[sliderName] - imageWidth
            }));
            setDotIndices((prev) => ({
                ...prev,
                [sliderName]: prev[sliderName] + 1
            }));
        } else {
            setSliderPositions((prev) => ({
                ...prev,
                [sliderName]: 0
            }));
            setDotIndices((prev) => ({
                ...prev,
                [sliderName]: 0
            }));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleRightClick('slider1');
        }, 3000); // Automatically move the first slider every 3 seconds

        return () => clearInterval(interval);
    }, [sliderPositions.slider1, dotIndices.slider1]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleRightClick('slider2');
        }, 2000); // Automatically move the first slider every 3 seconds

        return () => clearInterval(interval);
    }, [sliderPositions.slider2, dotIndices.slider2]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleRightClick('slider3');
        }, 2000); // Automatically move the first slider every 3 seconds

        return () => clearInterval(interval);
    }, [sliderPositions.slider3, dotIndices.slider3]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleRightClick('slider4');
        }, 2000); // Automatically move the first slider every 3 seconds

        return () => clearInterval(interval);
    }, [sliderPositions.slider4, dotIndices.slider4]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleRightClick('slider5');
        }, 2000); // Automatically move the first slider every 3 seconds

        return () => clearInterval(interval);
    }, [sliderPositions.slider5, dotIndices.slider5]);

    const displayedDots = Math.min(maxDots, venues.length);

    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div>
            <div className='awardCcontainer'>
                <div style={{ backgroundImage: "url(/awardCeremony/awardmainimg.jpg)", backgroundPosition: "center", backgroundSize: "cover", }} className='mainimgdiv '>
                    <h1 className='mainimgtxt'>Be part of Award Ceremony</h1>
                </div>
                <div className='playimgcenter'>
                    <div className='playimgcon'>
                        <img loading="lazy" playimg src='/awardCeremony/playimg.jpg' />
                        <div className='playimgtxt'>
                            <h1>About Our Award Ceremony Event Planning</h1>
                            <p>At Evego Event, we recognize the significance of award ceremonies in celebrating
                                achievements, honoring excellence, and inspiring continued success. Our expert team is
                                dedicated to crafting an elegant and memorable event that reflects the prestige and importance
                                of your awards. Here’s why we’re the perfect choice for your next award ceremony:<br />
                                Comprehensive Services<br />
                                Our full-service approach ensures every aspect of your award ceremony is expertly managed:<br />
                                Venue Selection and Decoration<br />
                                Custom Invitations and Programs<br />
                                and Beverage Services<br />
                                Audiovisual and Stage Production<br />
                                On-Site Event Coordination</p>
                            <button>PHOTO GALLERY</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* circle slider */}
            <div className='px-4 sm:px-8 lg:px-12'>
                <div className=''>
                    <div className='flex flex-col lg:flex-row justify-between'>
                    </div>
                    <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
                        <div
                            id='slider2'
                            className={`flex w-full absolute transition-all top-2`}
                            style={{ left: `${sliderPositions.slider1}rem` }}            >
                            {venues.map((venue, index) => (
                                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3'>
                                    <Image loading="lazy" className='select-none rounded-[50%] h-48 w-48' src={venue.img} height={250} width={250} />
                                    <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className='h-[10em] xsm:h-[17em] lg:h-[17em]'></div>
                    </div>
                </div>
            </div>


            <div className='px-4 sm:px-8 lg:px-12 my-6 lg:my-12'>
                <div className='mb-8 lg:mb-12'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div>
                            <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                Venue Categories <FaArrowRight className='ml-3' />
                            </h1>
                            <p className='max-w-xl lg:max-w-2xl mt-3'>
                                Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
                            </p>
                        </div>
                        <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                            <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider2')} />
                            <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider2')} />
                        </div>
                    </div>
                    <div className='relative overflow-hidden px-8 sm:px-16 lg:px-24'>
                        <div
                            id='slider2'
                            className={`flex w-full absolute transition-all top-10`}
                            style={{ left: `${sliderPositions.slider2}rem` }}
                            onClick={() => handleVenue()}

                        >
                            {venues.map((venue, index) => (
                                <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                                    <Image loading="lazy" className='select-none' src={venue.img} height={300} width={300} />
                                    <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                                    <p className='text-xs m-0'>{venue.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className='md:h-[20em] sm:h-[17em] h-[17em]'></div>
                        <div className='flex w-full justify-center'>
                            {Array.from({ length: displayedDots }, (_, i) => (
                                <span
                                    key={i}
                                    onClick={() => {
                                        const newPos = -imageWidth * i;
                                        setSliderPositions((prev) => ({
                                            ...prev,
                                            slider2: newPos
                                        }));
                                        setDotIndices((prev) => ({
                                            ...prev,
                                            slider2: i
                                        }));
                                    }}
                                    className={`border bg-white border-black rounded-full md:mt-0 sm:mt-10 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider2 === i ? 'bg-yellow-500' : ''
                                        }`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='vanuecontainerwh'>
                {/*  <div className='md:px-12 px-5'>
                    <div className='mb-8 lg:mb-12'>
                        <div className='flex flex-col lg:flex-row justify-between'>
                            <div>
                                <h1 className='text-2xl lg:text-4xl font-semibold flex items-center select-none'>
                                    Venue Categories <FaArrowRight className='ml-3' />
                                </h1>
                                <p className='max-w-xl lg:max-w-2xl mt-3'>
                                    Browse, shortlist and get best prices and packages from venues available to host your upcoming wedding reception, pre-wedding and post-wedding functions.
                                </p>
                            </div>
                            <div className='text-3xl lg:text-4xl flex items-center mt-4 lg:mt-0'>
                                <FiArrowLeftCircle className='mr-4 cursor-pointer' onClick={() => handleLeftClick('slider3')} />
                                <FiArrowRightCircle className='cursor-pointer' onClick={() => handleRightClick('slider3')} />
                            </div>
                        </div>
                        <div className='relative overflow-hidden'>
                            <div
                                id='slider2'
                                className={`flex w-full absolute transition-all top-10`}
                                style={{ left: `${sliderPositions.slider3}rem` }}
                            >
                                {venues.map((venue, index) => (
                                    <div key={index} className='flex min-w-[200px] sm:min-w-[250px] lg:min-w-[300px] flex-col m-2 lg:m-3 p-2 lg:p-3 cursor-pointer'>
                                        <Image loading="lazy" className='select-none' src={venue.img} height={300} width={300} />
                                        <p className='mt-3 font-semibold text-sm m-0'>{venue.title}</p>
                                        <p className='text-xs m-0'>{venue.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='md:h-[20em] sm:h-[17em] h-[17em]'></div>
                            <div className='flex w-full justify-center'>
                                {Array.from({ length: displayedDots }, (_, i) => (
                                    <span
                                        key={i}
                                        onClick={() => {
                                            const newPos = -imageWidth * i;
                                            setSliderPositions((prev) => ({
                                                ...prev,
                                                slider3: newPos
                                            }));
                                            setDotIndices((prev) => ({
                                                ...prev,
                                                slider3: i
                                            }));
                                        }}
                                        className={`border bg-white border-black rounded-full lg:mt-0 sm:mt-12 xsm:mt-32 block h-[10px] w-[10px] xsm:h-[15px] xsm:w-[15px] lg:h-[20px] lg:w-[20px] m-2 cursor-pointer ${dotIndices.slider3 === i ? 'bg-yellow-500' : ''
                                            }`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className='grid md:grid-cols-3 grid-cols-1 gap-4  mt-12'>
                    <div className='md:col-span-2 h-56 rounded-lg relative bg-meet group bg-cover bg-center flex justify-center items-center cursor-pointer'>
                        <span className='text-white font-extrabold z-10 sm:text-4xl text-xl'>HOW WE WORK</span>
                        <span className='h-full w-full  opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0'></span>
                    </div>
                    <div className='md:col-span-1  p-6 bg-[#01020533] rounded-lg h-56 w-full flex flex-col justify-between' style={{ background: "url(/service-section/image1.png)", backgroundPosition: "center", backgroundSize: "cover" }}>
                        <div className='flex flex-col'>
                            <span className='text-4xl font-extrabold text-slate-50'>20<span className='text-green-500'>+</span></span>
                            <span className='font-light text-sm'>Project finish with superbly</span>
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
                </div>
            </div>

            {/*    <div className='nominatedsec'>
                <h1>2024  NOMINATED SHOWS</h1>
                <div className='nomiwhite'>
                    <div className='nomicardmain'>
                        <div className='nomicards'>
                            <img loading="lazy" src='/awardCeremony/nominationemg.jpg' />
                            <div className='nominame'>
                                2  Nomination
                            </div>
                        </div>
                        <p className='nomihorse'>The War Horse</p>
                    </div>
                    <div className='nomicardmain'>
                        <div className='nomicards'>
                            <img loading="lazy" src='/awardCeremony/nominationemg.jpg' />
                            <div className='nominame'>
                                2  Nomination
                            </div>
                        </div>
                        <p className='nomihorse'>The War Horse</p>
                    </div>
                    <div className='nomicardmain'>
                        <div className='nomicards'>
                            <img loading="lazy" src='/awardCeremony/nominationemg.jpg' />
                            <div className='nominame'>
                                2  Nomination
                            </div>
                        </div>
                        <p className='nomihorse'>The War Horse</p>
                    </div>
                    <div className='nomicardmain'>
                        <div className='nomicards'>
                            <img loading="lazy" src='/awardCeremony/nominationemg.jpg' />
                            <div className='nominame'>
                                2  Nomination
                            </div>
                        </div>
                        <p className='nomihorse'>The War Horse</p>
                    </div>
                    <div className='nomicardmain'>
                        <div className='nomicards'>
                            <img loading="lazy" src='/awardCeremony/nominationemg.jpg' />
                            <div className='nominame'>
                                2  Nomination
                            </div>
                        </div>
                        <p className='nomihorse'>The War Horse</p>
                    </div>
                </div>
            </div>
 */}
            {/*  <div className="h-fit bg-[#fbe7e8] py-8">
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Explore the Award Ceremony</h2>
                            <p className="text-gray-700 mb-4">
                                The Grammy Awards, often simply called the Grammys, are presented by the Recording Academy to recognize outstanding
                                achievement in the music industry. Established in 1959, the
                            </p>
                        </div>
                        <hr className="bg-black h-[2px]"></hr>
                        <div>
                            <h3 className="text-xl font-bold mb-2">How it Works</h3>
                            <p className="text-gray-700 mb-6">
                                The Grammy Awards operate through a voting process conducted by the Recording Academy's members, who are music industry professionals. Nominations
                            </p>
                            <Link href='/about'><button className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700">
                                LEARN MORE
                            </button></Link>
                        </div>
                    </div>
                    <div className="px-6">
                        <h2 className="text-2xl font-bold mb-4">67th ANNUAL CEREMONY AWARDS: KEY DATES</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li>
                                <span className="block font-bold">September 16, 03 - August 30, 2024</span>
                                <span className="block">Product Eligibility period for entries</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                            <li>
                                <span className="block font-bold">July 8, 2024 - August 23, 2024</span>
                                <span className="block">Media Company Registration</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                            <li>
                                <span className="block font-bold">October 16, 03 - August 30, 2024</span>
                                <span className="block">First round Voting</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                            <li>
                                <span className="block font-bold">September 16, 03 - August 30, 2024</span>
                                <span className="block">67th Annual award ceremony</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                            <li>
                                <span className="block font-bold">November - June 30, 2024</span>
                                <span className="block">Product Eligibility period for entries</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                            <li>
                                <span className="block font-bold">December 16, 03 - October 30, 2024</span>
                                <span className="block">Nominee Announced for the 67th Annual</span>
                                <hr className="bg-black h-[2px]"></hr>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}

            <div className="h-fit w-full bg-gray-100 py-8">
                <div className="w-full px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 " onClick={()=>handleVenue()}>
                        {awardsData.map((award, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                                <div className="relative">
                                    <img loading="lazy" src={award.image} alt={award.name} className="w-full h-64 object-cover border-b-8 border-red-600" />
                                    <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm">SPECIAL ACHIEVEMENT</div>
                                </div>
                                <div className="p-4">
                                    <h2 className="font-bold text-xl">{award.name}</h2>
                                    <p className="text-gray-700 text-xl font-bold">{award.achievement}</p>
                                    <p className="mt-2 text-xl text-gray-500">Special Achievement {award.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*  <div className="w-full h-fit md:p-8 xsm:p-3 bg-[#c51921]">
                <h1 className="md:text-6xl xsm:text-4xl font-semibold py-4 text-white">Awards Time Capsule</h1>
                <h1 className="text-4xl text-white font-bold ">The Spectable Of A Celebration Of Acheivement</h1>
                <p className="text-4xl text-white">Let the awards ceremony commence!"</p>
                <div className="grid grid-cols-4 md:space-x-8 xsm:space-x-3 py-4">
                    <div className="grid grid-cols-1 bg-pop-ven md:h-[80vh] xsm:h-[60vh]">

                    </div>
                    <div className="grid grid-cols-1 bg-pop-ven md:h-[80vh] xsm:h-[60vh]">

                    </div>
                    <div className="grid grid-cols-1 bg-pop-ven md:h-[80vh] xsm:h-[60vh]">

                    </div>
                    <div className="grid grid-cols-1 bg-pop-ven md:h-[80vh] xsm:h-[60vh]">

                    </div>
                </div>

            </div> */}


        </div>
    )
}

export default AwardCeremony
