// components/ServiceCard.js
import Axios from '@/utils/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const ServiceCard = ({ service }) => {
    console.log("This is service", service)
    console.log(service.serviceName);
    console.log(service.serviceDescription);
    console.log(service.serviceCategory['hall booking']);
    console.log(service.serviceCategory['marriage']);
    console.log(service.price);
    const [popUp, setPopUp] = useState(null);
    const guests = useRef(null)
    const duration = useRef(null)
    const date = useRef(null)
    const time=useRef(null);
    const eventType = useRef(null)
    const [currentImage, setCurrentImage] = useState(0);

    // Function to handle image change
    const handleNextImage = () => {
        setCurrentImage((prev) => (prev + 1) % service.serviceImage.length);
    };

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev - 1 + service.serviceImage.length) % service.serviceImage.length);
    };

    const router = useRouter()

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    // }
    const handleInputs = async (e, id) => {
        e.preventDefault();
        try {
            const guestsResp = guests.current.value;
            const durationResp = duration.current.value;
            const dateResp = date.current.value;  // This is the date input from the user
            const timeResp = time.current.value;
    
            // Get today's date in 'YYYY-MM-DD' format
            const today = new Date().toISOString().split('T')[0];
    
            // Check if the selected date is greater than today
            if (dateResp <= today) {
                toast.error("Event date must be Greater or Equal to today.");
                return;  // Stop further execution if the date is invalid
            }
    
            console.log("This is the time>>>", timeResp);
    
            // Make the axios call here
            const resp = await Axios.post('/user/updatebooking', {
                guests: guestsResp,
                duration: durationResp,
                date: dateResp,
                time: timeResp,
                receiver: id,
                serviceName: service.serviceName,
                serviceId: service._id
            });
    
            const updateIconTrue = await Axios.post('/vendor/updateicontrue', {
                vendorId: service.vendor
            });
    
            if (resp.status === 200) {
                toast.success("Request Sent Successfully");
                setPopUp(false);  // Close the popup after success
            }
    
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleSendRequest = async () => {
        if (Cookies.get('type') == 'user') {
            console.log("triggered")
            setPopUp(true);
        }
        else {
            toast.info("Login as user first")
            router.push("/signin")
        }

    }
    console.log(service)

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        setCurrentDate(today);  // Set current date in state
    }, []);

    return (
        <div className='w-full'>
            {/* Service Card Wrapper */}
            <div className="w-full p-4 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0">

                {/* Image Gallery */}
                <div className="relative m-6 w-full lg:w-1/2">
                    <img
                        className="h-64 sm:h-80 w-full object-contain rounded-lg shadow-md"
                        src={service.serviceImage[currentImage]}
                        alt="Service"
                    />
                    {/* Previous and Next Buttons */}
                    <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full shadow-md"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full shadow-md"
                    >
                        &#8594;
                    </button>
                </div>

                {/* Service Details */}
                <div className="w-full lg:w-1/2 text-left md:space-y-6 xsm:space-y-2">
                    <h2 className="w-full text-center lg:font-bold lg:text-3xl truncate whitespace-nowrap overflow-hidden text-ellipsis">{service.serviceName}</h2>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {service.serviceDescription}
                    </p>
                    <div className="text-gray-500 text-sm">{service.vendorFirstName}</div>
                    <div className="text-gray-500 text-sm">{service.serviceCategory}</div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold text-blue-500">
                        Rs. {service.price}
                    </div>

                    {/* Equipment List */}
                    <h3 className="text-lg font-semibold text-gray-700">Equipment:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
                        {service.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    {/* Send Request Button */}
                    <button
                        onClick={() => handleSendRequest()}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
                    >
                        Send Request
                    </button>
                </div>

                {/* Pop-up Form */}
                {popUp && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[95%] sm:w-[39rem] flex flex-col">
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full bg-white shadow-md rounded-lg">
                                    <h2 className="text-2xl font-bold mb-4 text-center">Event Details</h2>
                                    <form onSubmit={(e) => handleInputs(e,service.vendor)} className="space-y-4">

                                        {/* Guest Expected */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Guest Expected</label>
                                            <input
                                                type="number"
                                                placeholder="Enter number of guests"
                                                required
                                                ref={guests}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        {/* Event Duration */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Duration of Event (hours)</label>
                                            <input
                                                type="number"
                                                placeholder="Enter event duration"
                                                required
                                                ref={duration}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        {/* Event Date */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Event Date</label>
                                            <input
                                                type="date"
                                                ref={date}
                                                required
                                                min={currentDate}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-700">Event Time</label>
                                            <input
                                                type="time"
                                                ref={time}
                                                required
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Close Button */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setPopUp(false)} className="bg-gray-400 text-white py-1 px-4 rounded">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ServiceCard;
