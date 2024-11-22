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

    useEffect(() => {
        const handleSendRequest = async () => {
            if (Cookies.get('access') == 'aadmi') {
                console.log("triggered")
                setAllowed(true)
            }
            else {
                // toast.info("Login as user first")
                router.push("/")
            }
        }
        handleSendRequest();
    }, [])
    // Add router as a dependency

    // If admin is valid, render the admin page content

    useEffect(()=>{
        const fetchBookingDataMonthly=async ()=>{
            const resp=await Axios.get("/admin/eventbookingbymonth");
            setMonthlyBooking(resp.data.bookingCount);
        }
        fetchBookingDataMonthly();
    },[])
    useEffect(()=>{
        const fetchBookingData=async ()=>{
            const resp=await Axios.get("/admin/getbookings");
            setCompleteEvents(resp.data.completeStatus);
            setinCompleteEvents(resp.data.inCompleteStatus);
        }
        fetchBookingData();
    },[])

    useEffect(() => {
      const ngoVsEvents=async () => {
        const resp=await Axios.get('/admin/ngovseventgraph');
       console.log(resp.data.events)
       console.log(resp.data.ngoserved)
        setEvents(resp.data.events);
        setNgo(resp.data.ngoserved);
      }
      ngoVsEvents();
    }, [])

    useEffect(() => {
        const fetchPieData=async ()=>{
            const resp=await Axios.get('/admin/userpiechart');
            const sum=resp.data.data[0].totalUsers+resp.data.data[0].totalVendors+resp.data.data[0].totalNgos;
            setTotalUsers(resp.data.data[0].totalUsers);
            setTotalVendors(resp.data.data[0].totalVendors);
            setTotalNgos(resp.data.data[0].totalNgos);
            setTotal(sum);
        }
        fetchPieData();
    },[])


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

    return ( allowed &&
        <div className="msm:px-10 xsm:px-5 py-20 bg-[#ffe7da] gap-6">

            {/* <div className="w-full flex msm:flex-row xsm:flex-col msm:justify-between xsm:justify-center items-center
                  rounded-full py-2 msm:px-5 xsm:px-2 outline outline-[#b5a39a]  outline-[1px] backdrop-brightness-90">
                <img src='userdash/logo.png'></img>
                <div className="msm:flex xsm:hidden flex-row pt-1 justify-center  items-center gap-4">
                    <IoMdNotifications className="text-blue-600 w-[2rem] h-[2rem] cursor-pointer sm:flex xsm:hidden" />
                    <IoSettings className="text-gray-700 w-[2rem] h-[2rem] cursor-pointer sm:flex xsm:hidden" />
                    <div className="flex flex-row p-1 outline outline-[1px] rounded-full gap-2">
                        <IoIosSearch className="w-8 h-8" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent text-black md:w-[12rem] sm:w-[10rem] xsm:w-[10rem] focus:outline-none text-lg"
                        />
                    </div>
                </div>
            </div> */}

            <div className="flex flex-wrap xsm:space-y-3 items-center justify-between pt-4 rounded-md dark:bg-darker">

                <div>
                    <h6
                        className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light"
                    >
                        Revenue amount
                    </h6>
                    <span className="sm:text-5xl xsm:text-[2.5rem] font-semibold">₹2,72,000</span>
                    <span className="float-end px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
                        <span className="float-start pr-1 py-px text-xs text-green-500 bg-green-100 rounded-md"><FaRegArrowAltCircleUp />
                        </span>+4.4%
                    </span>
                </div>

                {/* <div className="flex items-center flex-row justify-center gap-4">
                    <label htmlFor="sortBy" className="mr-2 md:p-0 font-semibold xsm;p-4">Sort by</label>
                    <select id="sortBy" className="border py-2 px-3 outline outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffba93] rounded-2xl border-gray-300">
                        <option value="date">Month</option>
                        <option value="status">Status</option>
                    </select>
                    <div className="border flex flex-row py-2 px-3 outline gap-2 outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffba93] rounded-2xl border-gray-300">
                        <h1>Filter</h1><RiMenuUnfold4Fill className="w-6 h-6" />
                    </div>
                </div> */}
            </div>

            <div className=" p-4 md:pt-8 msm:mt-8">
                <div className="mb-8 drop-shadow-2xl">
                    <div className="h-64">
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mb-6">
                    <div className="text-2xl font-bold">Quick Analytics</div>
                    {/* <div className="flex items-center flex-wrap">
                        <span className="mr-2">From</span>
                        <input
                            type="date"
                            className="border rounded px-2 py-1 mr-4"
                            defaultValue="2024-06-08"
                        />
                        <span className="mr-2">To</span>
                        <input
                            type="date"
                            className="border rounded px-2 py-1"
                            defaultValue="2024-06-10"
                        />
                    </div> */}
                </div>

                <div className="grid xmd:grid-cols-2 sm:grid-cols-2 xsm:grid-cols-1 gap-4 mb-8">
                    <div className="grid grid-cols-1 gap-4 h-auto">
                        <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">Total Events
                                <FaTrophy className="float-right w-12 h-12 text-red-600 rounded-full" /></div>
                            <div className="text-2xl text-green-500 font-bold">{completeEvents?completeEvents+inCompleteEvents:""}</div>
                            <div className="text-sm text-gray-500">Total Events Registered</div>
                        </div>

                        {/* <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">Avg Event Rating
                                <FaStar className="float-right w-12 h-12 text-yellow-400 rounded-full" /></div>
                            <div className="text-2xl text-yellow-500 font-bold">4.5</div>
                            <div className="text-sm text-gray-500">+2% Growth over month</div>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 gap-4 h-auto">
                        <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">Completed Events
                                <BiCalendarCheck className="float-right w-12 h-12 text-green-400 rounded-full" /></div>
                            <div className="text-2xl text-green-500 font-bold">{completeEvents?completeEvents:""}</div>
                            <div className="text-sm text-gray-500">Total Completed Events</div>
                        </div>

                        {/* <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">Total Reviews
                                <MdStars className="float-right w-12 h-12 text-red-600 rounded-full bg-yellow-300" /></div>
                            <div className="text-2xl text-red-500 font-bold">2000+</div>
                            <div className="text-sm text-gray-500">+56% Growth over month</div>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">Total Subscriber
                                <TbUsersGroup className="float-right w-12 h-12 text-yellow-400 rounded-full" /></div>
                            <div className="text-2xl text-yellow-500 font-bold">{total?total:""}</div>
                            <div className="text-sm text-gray-500">The total number of pople present on evego</div>

                            <div className="h-40">
                                <Pie data={pieDataUsers} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-4 rounded shadow-md shadow-orange-600">
                            <div className="text-xl font-bold">NGO Served
                                <BsBookmarkStar className="float-right w-12 h-12 text-blue-400 " /></div>
                            <div className="text-2xl text-blue-500 font-bold">{ngo?ngo:""}</div>
                            <div className="text-sm text-gray-500">Total NGO's Served</div>

                            <div className="h-40">
                                <Pie data={pieDataSubscriptions} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:absolute xsm:block md:top-40 xsm:top-64 bg-white p-2 rounded-2xl shadow-md shadow-orange-600">
                    <div className="text-xl font-bold">Average Revenue</div>
                    <div className="text-2xl flex items-center">Rs. 41250 <HiCurrencyRupee className="text-yellow-500" /></div>
                </div>
            </div>

            <div className="h-fit p-5">
                <div className="flex lg:flex-row xsm:flex-col gap-4">
                    <Revenue />
                    <Visit monthlyBooking={monthlyBooking} />
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
