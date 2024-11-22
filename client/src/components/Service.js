import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from 'next/link';

const Service = () => {
  return (
    <div>
      <div className='serheading'>
        <h1 className='servicesh1'>Services</h1>
        <h5 className='servicesh2'>that you will remember forever</h5>
      </div>
      <div className='sercards  '>
        <div className='serrow1'>
            <div className='r1c1'>
                <div className='cardtxt'>
                <p className='sercardtxt'>Venues</p>
                <p className='sercardtxt2'>Banquet Halls, Lawns / Farmhouses, Wedd</p>

                </div>
                <div className='cardimg'>
                <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem]  md:w-[17rem] md:h-[10rem]' src='./service-section/Venues.jpg'/>
                </div>
                
            </div>
            <div className='r1c2'>
            <div className='cardtxt'>
                <p className='sercardtxt'>Photograph</p>
                <p className='sercardtxt2'>Family portraits, Individual portraits, Event Photography, Boudoir Photography</p>
                </div>
                <div className='cardimg'>
                <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[25rem] md:h-[10rem]' src='./service-section/Photographs.jpg'/>
                </div>
            </div>
        </div>
        <div className='serrow1'>
            <div className='r2c1'>
            <div className='cardtxt'>
                <p className='sercardtxt'>Bridal View</p>
                <p className='sercardtxt2'>Wedding Dress Sales, Accessories, Dress Preservation</p>
                </div>
                <div className='cardimg'>
                <img className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[21rem] md:h-[10rem]' src='./service-section/Bridal.jpg'/>
                </div>
            </div>
            <div className='r2c2'>
            <div className='cardtxt'>
                <p className='sercardtxt'>Planning & Decor</p>
                <p className='sercardtxt2 '>Full-Service Planning, Partial Planning, Venue Decoration, Lighting Design</p>
                </div>
                <div className='cardimg'>
                <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[24rem] md:h-[10rem]' src='./service-section/Planning.jpg'/>
                </div>
            </div>
        </div>
        {/* <div className='explore'>
     <Link href='/services'> <button>Explore All -<div className='rcticon'><MdKeyboardArrowRight/></div></button> </Link> 
      </div> */}
      </div>

    <div className='sersec2main'>
      <div className='sersec2 flex md:justify-around sm:flex sm:justify-center sm:items-center'>
        <div className='sersec2txt'>
          <h1>Steps Involved in <br/> Event Planning</h1>
        </div>
        <div className='sersec2txt2 '>
          <h3>With Evego Event, every step is expertly managed <br></br>to ensure your event is memorable and successful.</h3>
       <Link href='/services'><button><div className='seemore'>
            See more
          </div></button></Link>
        </div>
      </div>

          <div className='sersec2card sm:gap-10 sm:flex sm:justify-center sm:items-center'>
            <div className='sersec2card1'>
                <div className='card1a'>
                  <div className='greendot'></div>
                  <p style={{color: "#878C91",fontSize:"14px"}}>5 min read</p>
                </div>
                <div className='card1b'>
                  <p style={{fontSize:"26px",fontWeight:"600",}}>Initial Planning</p>
                </div>
                <div className='card1c'>
                  <p style={{color:"#878C91",fontSize:"14px"}}>1. Initial Consultation <br/> Discuss your vision, goals, and preferences to tailor our services to your needs.<br/>2. Concept Development<br/>Create a unique theme and design that aligns with your vision.<br/>3. Budget Planning<br/>Establish a budget and explore options to maximize value</p>
                 {/*  <div className='cardarrow'>
                        <FaArrowRightLong/>
                  </div> */}
                </div>
            </div>

            <div className='sersec2card1'>
                <div className='card1a'>
                  <div className='reddot'></div>
                  <p style={{color: "#878C91",fontSize:"14px"}}>5 min read</p>
                </div>
                <div className='card1b'>
                  <p style={{fontSize:"26px",fontWeight:"600",}}>Logistics & Coordination</p>
                </div>
                <div className='card1c'>
                  <p style={{color:"#878C91",fontSize:"14px"}}>1. Venue Selection <br/>
                  Find and book the perfect venue, handling all related details. 
                  <br/>2. Vendor Coordination<br/>Manage relationships with caterers, 
                  photographers, and other vendors.<br/>3. Detailed Planning<br/>Develop 
                  a comprehensive plan, including timelines and schedules</p>
                  {/* <div className='cardarrow'>
                        <FaArrowRightLong/>
                  </div> */}
                </div>
            </div>


            <div className='sersec2card1'>
                <div className='card1a'>
                  <div className='purpledot'></div>
                  <p style={{color: "#878C91",fontSize:"14px"}}>5 min read</p>
                </div>
                <div className='card1b'>
                  <p style={{fontSize:"26px",fontWeight:"600",}}>Execution & Follow-Up</p>
                </div>
                <div className='card1c'>
                  <p style={{color:"#878C91",fontSize:"14px"}}>1. Final Preparations<br/>
                  Confirm details, conduct walkthroughs, and handle adjustments.<br/>2. 
                  Event Execution<br/>Oversee operations on the day of the event, ensuring 
                  a seamless experience.<br/>3. Post-Event Follow-Up<br/>Review the event, 
                  gather feedback, and address any final tasks.</p>
                 {/*  <div className='cardarrow'>
                        <FaArrowRightLong/>
                  </div> */}
                </div>
            </div>


          </div>

    </div>


    </div>
  )
}

export default Service