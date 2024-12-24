import Link from 'next/link'
import React from 'react'

const EventManagement = () => {
  return (
    // Main Pharmaceutical Supply Chain Container
    <section className="bg-veryLightPink h-fit py-4">
      
      {/* Pharmaceutical Supply Chain  */}
      <event className="min-w-[90%] flex flex-col md:flex-row items-center py-4 
                    mx-[5%] space-y-0 md:space-y-0">
        {/* Supply Chain-Head_Title */}
        <eventhead className="max-w-full flex  md:flex-row md:space-y-0
                        xsm:flex-col sm:flex-col md:1/2 sm:space-y-4 xsm:space-y-4">
          <h1 className="md:max-w-sm float-left md:text-3xl lg:mr-[5rem] xlg:mr-[17rem] xxlg:mr-[22rem] xl:mr-[26rem] 
                      xxl:mr-[36rem] lg:text-4xl font-semibold sm:text-2xl xsm:text-xl">Pharmaceutical Supply Chain Management System to streamline the management of suppliers, orders, and inventories.
          </h1>


          <div className="md:w-1/2 max-w-7xl float-right">
            {/* Supply Chain Bio */}
            <p className="max-w-md text-veryLightGray text-justify text-[.9rem]">Our Pharmaceutical Supply Chain Management System is designed to ensure efficient coordination and communication between suppliers, clients, and administrative staff. It streamlines procurement, order fulfillment, invoicing, and inventory management to improve operational efficiency and ensure the timely availability of medicines.<br/>Contact us today to optimize your pharmaceutical supply chain.</p><br></br>

            {/* Supply Chain Button */}
            <Link href="/contactus" className="text-sm font-bold p-3 px-8 pt-3 text-black bg-transparent rounded-full border-black border-[1px]">Contact</Link>
          </div>
        </eventhead>
      </event>

      {/* Supply Chain-Body_Pics */}
      <eventbody className="max-w-[90%] flex flex-col my-8 mx-auto space-y-16">
        {/* Plan Supply Chain 1 */}
        <planevent1 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover 
                         bg-[url('/medtrack/pic7.jpeg')] sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Efficient Supplier Management and Coordination</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">Our system simplifies managing relationships with suppliers by automating communications for stock replenishment, price updates, and addressing supply chain issues. It ensures seamless procurement and timely stock availability.</p>
            <Link href="/suppliers" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl  ">Manage Suppliers</Link>
          </div>
        </planevent1>

        {/* Plan Supply Chain 2 */}
        {/* <planevent2 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover
                         bg-[url('/medtrack/pic8.jpeg')] sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Automated Order Fulfillment & Delivery Tracking</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">With automated order processing and real-time tracking, our system ensures that clients can manage their orders efficiently. Whether managing bulk deliveries or urgent stock requests, our system streamlines the entire process.</p>
            <Link href="/orders" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl ">Track Orders</Link>
          </div>
        </planevent2> */}

        {/* Plan Supply Chain 3 */}
        <planevent3 className="md:min-h-[32rem] relative rounded-lg bg-no-repeat object-center object-fit bg-cover
                         bg-[url('/medtrack/pic9.jpeg')] bg-center sm:min-h-[22rem] xsm:min-h-[22rem]">
          <div className="md:pl-16 sm:pl-10 xsm:pl-5 md:py-20 sm:py-14 xsm:py-10 space-y-2 absolute bottom-0 left-0">
            <p className="md:text-4xl text-left text-white font-semibold sm:text-2xl xsm:text-xl">Automated Order Fulfillment & Delivery Tracking</p>
            <p className="max-w-sm pb-9 text-white text-[.8rem]">With automated order processing and real-time tracking, our system ensures that clients can manage their orders efficiently. Whether managing bulk deliveries or urgent stock requests, our system streamlines the entire process.</p>
            <Link href="/timesheets" className="mt-11 text-[1rem] p-3 px-7 pt-3 text-white bg-veryLightOrange rounded-xl ">Manage Timesheets</Link>
          </div>
        </planevent3>

      </eventbody>
    </section>
  )
}



export default EventManagement