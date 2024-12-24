'use client'
import React, { useState, useEffect, useRef } from 'react';
// import DashboardLayout from '../components/DashboardLayout';
import Revenue from '../analytics/revenue';
import Visit from '../analytics/Visit';
import Vendor from '../analytics/Vendor';
import Event from '../analytics/Event';
import Meter from '../analytics/Meter';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { HiCurrencyRupee } from "react-icons/hi2";
import { Bar, Pie } from 'react-chartjs-2';
import { FaTrophy } from "react-icons/fa";
import { BiCalendarCheck } from "react-icons/bi";
import { TbUsersGroup } from "react-icons/tb";
import { BsBookmarkStar } from "react-icons/bs";
import { MdStars } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Axios from '@/utils/axios';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


const Analytics = () => {
    const [monthlyBooking,setMonthlyBooking]=useState(null);
    const[completeEvents,setCompleteEvents]=useState(null)
    const[inCompleteEvents,setinCompleteEvents]=useState(null)
    const[events,setEvents]=useState(null);
    const[ngo,setNgo]=useState(null);
    const[totalUsers,setTotalUsers]=useState(0);
    const[totalVendors,setTotalVendors]=useState(0);
    const[totalNgos,setTotalNgos]=useState(0);
    const[total,setTotal]=useState(0)
    const router = useRouter()
    const [admin, setAdmin] = useState("false")
    const [allowed, setAllowed] = useState(false)

    // useEffect(() => {
    //     const handleSendRequest = async () => {
    //         if (Cookies.get('access') == 'aadmi') {
    //             console.log("triggered")
    //             setAllowed(true)
    //         }
    //         else {
    //             // toast.info("Login as user first")
    //             router.push("/")
    //         }
    //     }
    //     handleSendRequest();
    // }, [])
    // // Add router as a dependency

    // // If admin is valid, render the admin page content

    // useEffect(()=>{
    //     const fetchBookingDataMonthly=async ()=>{
    //         const resp=await Axios.get("/admin/eventbookingbymonth");
    //         setMonthlyBooking(resp.data.bookingCount);
    //     }
    //     fetchBookingDataMonthly();
    // },[])
    // useEffect(()=>{
    //     const fetchBookingData=async ()=>{
    //         const resp=await Axios.get("/admin/getbookings");
    //         setCompleteEvents(resp.data.completeStatus);
    //         setinCompleteEvents(resp.data.inCompleteStatus);
    //     }
    //     fetchBookingData();
    // },[])

    // useEffect(() => {
    //   const ngoVsEvents=async () => {
    //     const resp=await Axios.get('/admin/ngovseventgraph');
    //    console.log(resp.data.events)
    //    console.log(resp.data.ngoserved)
    //     setEvents(resp.data.events);
    //     setNgo(resp.data.ngoserved);
    //   }
    //   ngoVsEvents();
    // }, [])

    // useEffect(() => {
    //     const fetchPieData=async ()=>{
    //         const resp=await Axios.get('/admin/userpiechart');
    //         const sum=resp.data.data[0].totalUsers+resp.data.data[0].totalVendors+resp.data.data[0].totalNgos;
    //         setTotalUsers(resp.data.data[0].totalUsers);
    //         setTotalVendors(resp.data.data[0].totalVendors);
    //         setTotalNgos(resp.data.data[0].totalNgos);
    //         setTotal(sum);
    //     }
    //     fetchPieData();
    // },[])


    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data:monthlyBooking?monthlyBooking:[],
                backgroundColor: 'rgba(254, 100, 66, 1)',
                borderColor: 'rgba(254, 100, 66, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Pie chart data for users
    const pieDataUsers = {
        labels: ['Users', 'Vendors','NGOs'],
        datasets: [
            {
                label: '# of Votes',
                data: [totalUsers?totalUsers:0, totalVendors?totalVendors:0,totalNgos?totalNgos:0],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(54, 162, 235, 0.2)','rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)','rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Pie chart data for subscriptions
    const pieDataSubscriptions = {
        labels: ['NGO Served', 'NGO Not Served'],
        datasets: [
            {
                label: '# of Votes',
                data: [events?events:0, ngo?ngo:0],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="msm:px-10 xsm:px-5 py-20 bg-[#ffe7da] gap-6">
    <div className="flex flex-wrap xsm:space-y-3 items-center justify-between pt-4 rounded-md dark:bg-darker">

        <div>
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
                Total Earnings
            </h6>
            <span className="sm:text-5xl xsm:text-[2.5rem] font-semibold">₹3,50,000</span>
            <span className="float-end px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                <span className="float-start pr-1 py-px text-xs text-green-500 bg-green-100 rounded-md">
                    <FaRegArrowAltCircleUp />
                </span>+5.2%
            </span>
        </div>
    </div>

    <div className="p-4 md:pt-8 msm:mt-8">
        <div className="mb-8 drop-shadow-2xl">
            <div className="h-64">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6">
            <div className="text-2xl font-bold">Quick Insights</div>
        </div>

        <div className="grid xmd:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 gap-4 mb-8">
            <div className="grid grid-cols-1 gap-4 h-auto">
                <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                    <div className="text-xl font-bold">Total Projects
                        <FaTrophy className="float-right w-12 h-12 text-red-600 rounded-full" />
                    </div>
                    {/* <div className="text-2xl text-green-500 font-bold">{completedProjects ? completedProjects + ongoingProjects : ""}</div> */}
                    <div className="text-sm text-gray-500">Projects Completed and Ongoing</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 h-auto">
                <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                    <div className="text-xl font-bold">Completed Projects
                        <BiCalendarCheck className="float-right w-12 h-12 text-green-400 rounded-full" />
                    </div>
                    {/* <div className="text-2xl text-green-500 font-bold">{completedProjects ? completedProjects : ""}</div> */}
                    <div className="text-sm text-gray-500">Total Completed Projects</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                    <div className="text-xl font-bold">Active Users
                        <TbUsersGroup className="float-right w-12 h-12 text-yellow-400 rounded-full" />
                    </div>
                    {/* <div className="text-2xl text-yellow-500 font-bold">{activeUsers ? activeUsers : ""}</div> */}
                    <div className="text-sm text-gray-500">Total Active Users</div>

                    <div className="h-40">
                        <Pie data={pieDataUsers} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                    <div className="text-xl font-bold">Partnerships
                        <BsBookmarkStar className="float-right w-12 h-12 text-blue-400" />
                    </div>
                    {/* <div className="text-2xl text-blue-500 font-bold">{partnerships ? partnerships : ""}</div> */}
                    <div className="text-sm text-gray-500">Total Partnerships</div>

                    <div className="h-40">
                        {/* <Pie data={pieDataPartnerships} options={{ maintainAspectRatio: false }} /> */}
                    </div>
                </div>
            </div>
        </div>

        <div className="md:absolute xsm:block md:top-40 xsm:top-64 bg-white p-2 rounded-2xl shadow-md shadow-orange-600">
            <div className="text-xl font-bold">Average Profit</div>
            <div className="text-2xl flex items-center">Rs. 55,000 <HiCurrencyRupee className="text-yellow-500" /></div>
        </div>
    </div>

    <div className="h-fit p-5">
        <div className="flex lg:flex-row xsm:flex-col gap-4">
            <Revenue />
            {/* <Visit monthlyBookings={monthlyBookings} /> */}
        </div>
    </div>

    <div className="h-fit p-5">
        <div className="flex md:flex-row xsm:flex-col gap-4">
            <div className="space-y-4">
                <Event />
                <Vendor />
            </div>
            <div className="w-full">
                <Meter />
            </div>
        </div>
    </div>
</div>

    )
}

export default Analytics
