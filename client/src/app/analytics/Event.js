// components/EventPerformance.js
import Axios from '@/utils/axios';
import { event } from 'jquery';
import React, { useEffect, useState } from 'react';
import { RiMenuUnfold4Fill } from "react-icons/ri";

// const eventsData = [
//     { name: 'Sanju & Dhruvi Wedding', revenue: 'Rs. 67,000', color: 'text-blue-500', borderColor: 'border-blue-500' },
//     { name: 'Tanmay’s Birthday', revenue: 'Rs. 67,000', color: 'text-green-500', borderColor: 'border-green-500' },
//     { name: 'Bhajan', revenue: 'Rs. 67,000', color: 'text-red-500', borderColor: 'border-red-500' },
//     { name: 'Raj & Manu Wedding', revenue: 'Rs. 67,000', color: 'text-pink-500', borderColor: 'border-pink-500' },
// ];
const colors = [
    'border-red-500',     // Red
    'border-blue-500',    // Blue
    'border-green-500',   // Green
    'border-yellow-500',  // Yellow
    'border-purple-500',  // Purple
    'border-pink-500',    // Pink
    'border-orange-500',  // Orange
    'border-teal-500',    // Teal
    'border-indigo-500',  // Indigo
    'border-emerald-500'  // Emerald
];
const texts = [
    'text-red-500',     // Red
    'text-blue-500',    // Blue
    'text-green-500',   // Green
    'text-yellow-500',  // Yellow
    'text-purple-500',  // Purple
    'text-pink-500',    // Pink
    'text-orange-500',  // Orange
    'text-teal-500',    // Teal
    'text-indigo-500',  // Indigo
    'text-emerald-500'  // Emerald
];
const radnomIndexGenerator = () => {
    return Math.floor(Math.random() * 9);
}

const EventPerformance = () => {
    const [amountPaid, setAmount] = useState(null);
    useEffect(() => {
        const getEventPerformance = async () => {
            //TODO: There is no data of the user so populate the user in the backend controller and update it accordingly.
            const resp = await Axios.get('/admin/eventperformance');
            console.log(resp.data)
            setAmount(resp.data.data);
        }
        getEventPerformance();
    }, [])

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md shadow-orange-600 md:w-[50vw] xsm:w-full">
            <h2 className="text-4xl font-bold mb-4">Event Performance</h2>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Top Events</h3>
                {/* <div className="flex items-center xsm:flex-row justify-center gap-4">
                    <select id="sortBy" className="border xsm:text-sm py-2 px-3 outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <option value="date">Month</option>
                        <option value="status">Status</option>
                    </select>
                    <div className="border flex flex-row py-2 px-3 text-sm gap-2 outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <h1>Filter</h1><RiMenuUnfold4Fill className="md:w-6 md:h-6 xsm:w-4 xsm:h-5" />
                    </div>
                </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {amountPaid ? amountPaid.map((event, index) => (
                    <div key={index} className={`p-2 border-t-4 ${colors[radnomIndexGenerator()]} flex flex-col justify-between`}>
                        <div>
                            <h4 className={`text-lg font-semibold text-orange-400 ${texts[radnomIndexGenerator()]}`}>Rs. {event.amount_paid}</h4>
                            <p>{event ? event.username : "N/A"}</p>
                        </div>
                    </div>
                )) : ""}
            </div>
            {amountPaid &&
                <div className="flex flex-col items-center space-y-4">
                    {/* <img src={`${amountPaid ? amountPaid[0].avatar : ""}`} alt="N/A" className="w-16 h-16 rounded-full" /> */}
                    <div>
                        <p>"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"</p>
                        <p className="font-bold">{amountPaid ? amountPaid[0].fullname : ""}</p>
                        <p className="font-bold">{amountPaid ? amountPaid[0].email : ""}</p>
                        <p className="font-bold">{amountPaid ? amountPaid[0].phone_no : ""}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default EventPerformance;
