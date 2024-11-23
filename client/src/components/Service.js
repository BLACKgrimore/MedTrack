import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';

const Service = () => {
  return (
    <div>
      <div className='serheading'>
        <h1 className='servicesh1'>Services</h1>
        <h5 className='servicesh2'>Empowering Your Pharmaceutical Operations</h5>
      </div>
      <div className='sercards'>
        <div className='serrow1'>
          <div className='r1c1'>
            <div className='cardtxt'>
              <p className='sercardtxt'>Inventory Management</p>
              <p className='sercardtxt2'>Track stock levels, manage expiration dates, and optimize inventory efficiently.</p>
            </div>
            <div className='cardimg'>
              <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[17rem] md:h-[10rem]' src='./service-section/inventory.jpg' alt='Inventory Management' />
            </div>
          </div>
          <div className='r1c2'>
            <div className='cardtxt'>
              <p className='sercardtxt'>Vendor Coordination</p>
              <p className='sercardtxt2'>Seamlessly connect with vendors, negotiate deals, and streamline supply chain operations.</p>
            </div>
            <div className='cardimg'>
              <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[25rem] md:h-[10rem]' src='./service-section/vendor.jpg' alt='Vendor Coordination' />
            </div>
          </div>
        </div>
        <div className='serrow1'>
          <div className='r2c1'>
            <div className='cardtxt'>
              <p className='sercardtxt'>Order Tracking</p>
              <p className='sercardtxt2'>Monitor orders in real-time, ensure timely deliveries, and improve customer satisfaction.</p>
            </div>
            <div className='cardimg'>
              <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[21rem] md:h-[10rem]' src='./service-section/order.jpg' alt='Order Tracking' />
            </div>
          </div>
          <div className='r2c2'>
            <div className='cardtxt'>
              <p className='sercardtxt'>Analytics & Insights</p>
              <p className='sercardtxt2'>Gain actionable insights with advanced analytics to optimize business performance.</p>
            </div>
            <div className='cardimg'>
              <img loading="lazy" className='cardph xsm:w-[15rem] xsm:h-[7.5rem] md:w-[24rem] md:h-[10rem]' src='./service-section/analytics.jpg' alt='Analytics & Insights' />
            </div>
          </div>
        </div>
      </div>

      <div className='sersec2main'>
        <div className='sersec2 flex md:justify-around sm:flex sm:justify-center sm:items-center'>
          <div className='sersec2txt'>
            <h1>Steps to Optimize Your Pharmaceutical Supply Chain</h1>
          </div>
          <div className='sersec2txt2'>
            <h3>Our platform ensures smooth operations with tailored processes for your needs.</h3>
            <Link href='/services'><button><div className='seemore'>See more</div></button></Link>
          </div>
        </div>

        <div className='sersec2card sm:gap-10 sm:flex sm:justify-center sm:items-center'>
          <div className='sersec2card1'>
            <div className='card1a'>
              <div className='greendot'></div>
              <p style={{ color: "#878C91", fontSize: "14px" }}>5 min read</p>
            </div>
            <div className='card1b'>
              <p style={{ fontSize: "26px", fontWeight: "600" }}>Initial Setup</p>
            </div>
            <div className='card1c'>
              <p style={{ color: "#878C91", fontSize: "14px" }}>
                1. System Configuration<br />
                Set up user roles, permissions, and custom settings.<br />
                2. Vendor Onboarding<br />
                Add your suppliers and start collaborating.<br />
                3. Inventory Upload<br />
                Digitize your inventory with batch and expiry details.
              </p>
            </div>
          </div>

          <div className='sersec2card1'>
            <div className='card1a'>
              <div className='reddot'></div>
              <p style={{ color: "#878C91", fontSize: "14px" }}>5 min read</p>
            </div>
            <div className='card1b'>
              <p style={{ fontSize: "26px", fontWeight: "600" }}>Day-to-Day Operations</p>
            </div>
            <div className='card1c'>
              <p style={{ color: "#878C91", fontSize: "14px" }}>
                1. Real-Time Monitoring<br />
                Track stock, orders, and deliveries in real-time.<br />
                2. Automated Alerts<br />
                Receive notifications for low stock and upcoming expirations.<br />
                3. Easy Reordering<br />
                Restock with a few clicks to avoid shortages.
              </p>
            </div>
          </div>

          <div className='sersec2card1'>
            <div className='card1a'>
              <div className='purpledot'></div>
              <p style={{ color: "#878C91", fontSize: "14px" }}>5 min read</p>
            </div>
            <div className='card1b'>
              <p style={{ fontSize: "26px", fontWeight: "600" }}>Insights & Growth</p>
            </div>
            <div className='card1c'>
              <p style={{ color: "#878C91", fontSize: "14px" }}>
                1. Sales Analysis<br />
                Understand top-selling products and trends.<br />
                2. Vendor Performance<br />
                Evaluate supplier efficiency and reliability.<br />
                3. Business Optimization<br />
                Use insights to streamline operations and grow your business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
