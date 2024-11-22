"use client";
import React, { useState, useEffect, useRef } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { ImStatsDots } from "react-icons/im";
import { RiMenuSearchLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { BsBank, BsGraphUp } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoPersonAddSharp, IoSettings } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { Line } from "react-chartjs-2";
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from "chart.js";
import Axios from "@/utils/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);


const FinanceData = {
    labels: ["10k", "20k", "30k", "40k", "50k", "60k", "70k"],
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3, 100],
            backgroundColor: "rgba(254, 100, 66, 1)",
            borderColor: "rgba(254, 100, 66, 1)",
            borderWidth: 1,
            cubicInterpolationMode: "monotone",
            label: "Finance",
        },
    ],
};

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notify, setNotify] = useState(false);
    const [notifytrasaction, setNotifyTransaction] = useState(false);
    const [notfications, setNotification] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [completeEvent, setCompleteEvent] = useState(null)
    const sidebarRef = useRef(null);
    const [activeClient, setActiveClient] = useState(null);
    const [calenderDates, setCalenderDates] = useState([
        new Date(2024, 6, 12),
        new Date(2024, 6, 15),
    ]);
    const [vendorFlag, setVendorFlag] = useState(false);
    const [vendors, setVendors] = useState(null);
    const [feedback, setfeedback] = useState();
    // Close sidebar when clicking outside of it
    const router = useRouter()
    const [adminprofile, setAdminProfile] = useState("false")
    const [adminnotify, setAdminProfileNotify] = useState(false)
    const [allowed, setAllowed] = useState(false)

    const [sos, setSos] = useState(false);

    const [sosShow, setSosShow] = useState();


    const handlerednotification = async () => {
        if (adminnotify) {
            try {
                const response = await Axios.get('/admin/rednotifications')
                console.log(response.data)
                setAdminProfileNotify(false)
            }
            catch (error) {
                console.log('error')
            }
        }
    }

    useEffect(() => {
        const adminProfile = async () => {
            try {
                const resp = await Axios.get("/user/fetchProfile");
                console.log(".........................", resp.data.data);
                setAdminProfile(resp.data.data)
                setAdminProfileNotify(resp.data.data.adminnotification)
            }
            catch (error) {
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    Cookies.remove("access")
                    window.location.href = '/signin';
                    toast.error("Login Token Expired")
                }
                console.log(error)
            }
        }
        adminProfile();
    }, [])
    console.log(adminprofile)
    console.log(adminnotify)


    useEffect(() => {
        const ShowSos = async () => {
            const resp = await Axios.get("/admin/sosshow");
            console.log(".........................", resp.data.data);

            setSosShow(resp.data.data);
        }
        ShowSos();
    }, [])
    console.log(sosShow)



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


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    // Close sidebar if screen size increases over md
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const getNotifications = async () => {
            const resp = await Axios.get("/admin/getnotification");
            console.log("This is the notification state::", resp.data.data);
            setNotification(resp.data.data);
        }
        getNotifications();
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            const resp = await Axios.get("/admin/admindash");
            setTotalUser(resp.data)
        }
        getUsers();
    }, [])
    useEffect(() => {
        const fetchBookingStatus = async () => {
            const resp = await Axios.get("/admin/fetchbookingsdetails");
            setBookings(resp.data.bookings)
        }
        fetchBookingStatus();
    }, [])
    useEffect(() => {
        const getActiveClient = async () => {
            const resp = await Axios.get("/admin/fetchactiveclient");
            console.log("This  is the active client data>>>", resp.data.data);
            setActiveClient(resp.data.data);
        }
        getActiveClient();
    }, [])

    const handleManageVendor = async () => {
        const resp = await Axios.get("/admin/fetchvendors");
        console.log("This  is the vendor list>>>", resp.data.resp)
        setVendors(resp.data.resp);
    }


    useEffect(() => {
        const handleFeedback = async () => {
            try {
                const res = await Axios.get("/admin/feedback");
                console.log(res.data.data);
                setfeedback(res.data.data);
            } catch (error) {
                console.error("Error fetching feedback:", error.response || error);  // Log the exact error
            }
        };
        handleFeedback();
    }, []);

    console.log(feedback);




    const CircularProgressBar = ({ percentage, text, colour }) => {
        const radius = 80;
        const strokeWidth = 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative flex items-center justify-center w-[12rem] h-[12rem] text-center">
                <svg className="absolute top-0 left-0" width="100%" height="100%">
                    <circle
                        className="text-gray-300"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                    />
                    <circle
                        className={colour}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="50%"
                        cy="50%"
                        style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                </svg>
                <span className="flex text-xl items-center justify-end w-[5em] break-words font-bold text-gray-700">
                    {text}
                </span>
            </div>
        );
    };

    function linearProgressBar(currentStatus) {
        if (currentStatus == "Pending") return 0;
        else if (currentStatus == "Confirmed") return 20;
        else if (currentStatus == "Deposit_Paid") return 40;
        else if (currentStatus == "Departed") return 60;
        else if (currentStatus == "Follow_Up") return 80;
        else if (currentStatus == "Completed") return 100;
        else return 0;
    }
    function getNextStatus(currentStatus) {
        if (currentStatus == "Pending") return "Confirmed";
        else if (currentStatus == "Confirmed") return "Deposit_Paid";
        else if (currentStatus == "Deposit_Paid") return "Departed";
        else if (currentStatus == "Departed") return "Follow_Up";
        else if (currentStatus == "Follow_Up") return "Completed";
        else return "Previous State was Invalid!!";
    }
    useEffect(() => {
        const getBookingData = async () => {
            const resp1 = await Axios.get('/vendor/booking');
            setCompleteEvent(resp1.data.completeStatus.length);
        }
        if (allowed) {
            getBookingData();
        }
    }, [])


    const handleAccept = async (bookingId, currentStatus) => {
        const nextStatus = getNextStatus(currentStatus);
        const resp = await Axios.post("/admin/acceptbooking", {
            bookingId: bookingId,
            nextStatus: nextStatus
        })
        toast.success("The Request was Accepted!!")
        window.location.reload();
    }


    const handleReject = async (bookingId) => {
        const resp = await Axios.post("/admin/rejectbooking", {
            bookingId: bookingId
        })
        toast.success("The Request was Rejected!!")
        window.location.reload();
    }


    const handleVendorDelete = async (id) => {

        let resp;
        if (window.confirm("Are you Sure To delete the vendor!!")) {
            resp = await Axios.post("/admin/deleteVendor", {
                vendorId: id
            });
        }
        else {
            toast.info("Vendor Not  Deleted!!");

            return;
        }
        const flag = resp.data.mssg;
        if (flag) {
            toast.success("Vendor Got Deleted!!")
            window.location.reload()
        }
        else {
            toast.error("Vendor Deletion Failed!!")
        }
        console.log(resp.data.mssg);
    }


    const handleTransaction = async () => {
        try {
            const resp = await Axios.get("/admin/gettransaction");
            console.log("This is the transaction state::", resp.data.data);
            setNotifyTransaction(resp.data.data);
            console.log("this is transaction", notifytrasaction)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (allowed &&
        <div className="py-16 w-full h-fit flex flex-row bg-[#ffe7da]">
            {/* Toggle button for sidebar */}
            <button
                className="md:hidden text-[#ff8e4f] fixed top-14 z-50"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isSidebarOpen ? (
                    <AiOutlineClose className="w-8 h-8 text-[#ff8e4f]" />
                ) : (
                    <AiOutlineMenu className="w-8 h-8" />
                )}
            </button>

            {/* LEFT SIDE BAR */}
            <div
                ref={sidebarRef}
                className={`fixed md:relative xsm:top-10 md:top-0 left-0 h-full z-40 md:z-auto md:transform-none bg-[#ffe7da] ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 ease-in-out xsm:w-[60vw] sm:w-[50vw] md:w-[30vw] overflow-y-auto md:overflow-y-visible no-scrollbar`}
            >
                <div className="relative">
                    {/* Close button for sidebar */}
                    {/* <button
                        className="md:hidden absolute text-black"
                        onClick={toggleSidebar}
                        aria-label="Close Sidebar"
                    >
                        <AiOutlineClose className="w-8 h-8" />
                    </button> */}
                    {/* <img
                        className="bg-[#e5cec2] w-full"
                        src="/userdash/logo.png"
                        alt="Logo"
                    ></img> */}
                </div>

                {/* Sidebar content */}
                <div className="flex flex-col justify-between h-[calc(100vh-12rem)]">
                    <div className="flex flex-col">
                        {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <LuLayoutDashboard className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">Dashboard</h1>
                        </div> */}

                        {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <ImStatsDots className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">Quick Stats</h1>
                        </div> */}

                        {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <RiMenuSearchLine className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">Browse Events</h1>
                        </div>

                        <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <SlCalender className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">My Events</h1>
                        </div> */}

                        <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 mt-12">
                            <BsBank className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">My Payments</h1>
                        </div>

                        <div className="bg-[#ff8e4f] cursor-pointer border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4" onClick={() => { setNotify(true); handlerednotification() }}>
                            <IoMdNotifications className="text-white w-[2rem] h-[2rem] cursor-pointer" />
                            <h1 className="text-xl font-medium">Status Notification</h1>
                        </div>
                        <div className="bg-[#ff8e4f] cursor-pointer border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4" onClick={() => setSos(true)}>
                            <MdNotificationAdd className="text-red-900 w-[2rem] h-[2rem] cursor-pointer" />
                            <h1 className="text-xl font-medium">Sos Notification</h1>
                        </div>
                        <Link href="/analytics" className="bg-[#ff8e4f] cursor-pointer border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4" >
                            {/* <IoMdNotifications className="text-white w-[2rem] h-[2rem] cursor-pointer" /> */}
                            <h1 className="text-xl font-medium">Analytic</h1>
                        </Link>
                        <div onClick={() => {
                            setVendorFlag(true)
                            handleManageVendor()
                        }} className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                            <IoMdNotifications className="text-white w-[2rem] h-[2rem] cursor-pointer" />
                            <h1 className="text-xl font-medium">Vendors</h1>
                        </div>

                        <div className="bg-[#ff8e4f] cursor-pointer border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4" onClick={() => { setNotifyTransaction(true); handleTransaction() }}>
                            <IoMdNotifications className="text-white w-[2rem] h-[2rem] cursor-pointer" />
                            <h1 className="text-xl font-medium">Transactions</h1>
                        </div>

                        {/*  <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <FiLogOut className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">Logout</h1>
                        </div>
 */}
                        {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                            <IoIosHelpCircle className="text-white w-8 h-8" />
                            <h1 className="text-xl font-medium">Help</h1>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div
                className="w-full md:w-[80vw] py-4 pl-4 md:pr-14 xsm:pr-4"
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
                <div className="flex msm:flex-row justify-between items-center xsm:flex-col">
                    <h1 className="font-bold lg:text-[4rem] self-start xsm:text-[3rem]">
                        Dashboard
                    </h1>
                    <div className="flex flex-row justify-center self-start items-center gap-4">
                        {adminnotify ? (
                            <MdNotificationsActive onClick={() => { setNotify(true); handlerednotification(); }} className="text-red-600 w-[2rem] h-[2rem] cursor-pointer" />) : (
                            <IoMdNotifications onClick={() => setNotify(true)} className="text-blue-600 w-[2rem] h-[2rem] cursor-pointer" />)}
                        {/* <IoSettings className="text-gray-700 w-[2rem] h-[2rem] cursor-pointer" />
                        <div className="flex flex-row p-1 outline outline-[1px] rounded-full gap-2">
                            <IoIosSearch className="w-8 h-8" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-transparent text-black md:w-[12rem] sm:w-[10rem] xsm:w-[8rem] focus:outline-none text-lg"
                            />
                        </div> */}
                    </div>
                </div>

                <div className="p-4 flex justify-start flex-wrap">
                    <div className="shadow-md m-4 md:w-fit w-full shadow-green-500 rounded-2xl bg-white p-4">
                        <FaUserGroup size={50} className=" cursor-pointer text-green-500" />
                        <h1 className="font-bold text-3xl mt-2">Total Users</h1>
                        <div className="flex justify-between mt-3">
                            {totalUser ? <p className="text-3xl m-0">{totalUser.totalUsers}</p> : ""}
                        </div>
                    </div>
                    <div className="shadow-md m-4 md:w-fit w-full shadow-blue-500 rounded-2xl bg-white p-4">
                        <IoPersonAddSharp
                            size={50}
                            className=" cursor-pointer text-blue-500"
                        />
                        <h1 className="font-bold text-3xl mt-2">Total Vendors</h1>
                        <div className="flex justify-between mt-3">
                            {totalUser ? <p className="text-3xl m-0">{totalUser.totalVendors}</p> : ""}
                        </div>
                    </div>
                    <div className="shadow-md m-4 md:w-fit w-full shadow-orange-500 rounded-2xl bg-white p-4">
                        <MdPendingActions
                            size={50}
                            className=" cursor-pointer text-orange-500"
                        />
                        <h1 className="font-bold text-3xl mt-2">Total NGOs</h1>
                        <div className="flex justify-between mt-3">
                            {totalUser ? <p className="text-3xl m-0">{totalUser.totalNgos}</p> : ""}
                        </div>
                    </div>
                </div>
                {/* My Events Section */}
                <div className="mb-8 flex flex-col mt-4">
                    <div className="flex md:flex-row xsm:flex-col justify-between w-full bg-white items-center shadow shadow-amber-900  overflow-auto px-4 p-2">
                        <div className="self-start min-w-[10rem]">
                            <h1 className="font-bold lg:text-[2rem] xsm:text-[2rem]">
                                On-Going Events
                            </h1>
                            <h1 className="text-black">See and manage all events here</h1>
                        </div>
                        {/* <select
                            id="sortBy"
                            className="border-none focus:border-none focus-within:border-none p-2 mt-4 self-start bg-veryLightPink rounded-2xl border-gray-300"
                        >
                            <option value="date">Showing upcoming</option>
                            <option value="status">Status</option>
                        </select> */}
                    </div>
                    <div className="mt-4">
                        {/* Table header */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow rounded-lg">
                                <thead>
                                    <tr className="text-left text-xl">
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Time</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Progress</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        {/* Table body */}
                        <div className="overflow-y-auto overflow-x-auto w-full" style={{ maxHeight: '400px' }}>
                            <table className="min-w-full bg-white shadow rounded-lg">
                                <tbody>
                                    {bookings ? bookings.map((item, index) => (!(item.status == 'Completed') &&
                                        <tr key={index} className="hover:bg-gray-100 transition">
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.bookingDate.slice(0, 10)}</td>
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.bookingTime}</td>
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.serviceId ? item.serviceId.serviceName : "N/A"}</td>
                                            <td className="p-4 w-full md:w-44 pr-10">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div
                                                        className={`bg-${item.status === "Completed" ? "green" : "pink"}-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                                                        style={{ width: `${linearProgressBar(item.serviceId ? item.status : "N/A")}%` }}
                                                    >
                                                        {linearProgressBar(item.serviceId ? item.status : "N/A")}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`self-center bg-${item.status === "Completed" ? "green" : "pink"}-500 text-yellow-300 text-xs outline outline-[1px] py-2 px-4 rounded-lg`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : ""}
                                    {bookings ? bookings.map((item, index) => ((item.status == 'Completed') &&
                                        <tr key={index} className="hover:bg-gray-100 transition">
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.bookingDate.slice(0, 10)}</td>
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.bookingTime}</td>
                                            <td className="p-4 text-sm md:text-base whitespace-nowrap">{item.serviceId ? item.serviceId.serviceName : "N/A"}</td>
                                            <td className="p-4 w-full md:w-44 pr-10">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div
                                                        className={`bg-${item.status === "Completed" ? "green" : "pink"}-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
                                                        style={{ width: `${linearProgressBar(item.serviceId ? item.status : "N/A")}%` }}
                                                    >
                                                        {linearProgressBar(item.serviceId ? item.status : "N/A")}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`self-center bg-${item.status === "Completed" ? "green" : "pink"}-500 text-yellow-300 text-xs outline outline-[1px] py-2 px-4 rounded-lg`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>



                    {/* <div className="flex mt-5">
                        <span className="p-2 px-3 bg-white shadow-md mx-1 cursor-pointer">
                            1
                        </span>
                        <span className="p-2 px-3 bg-white shadow-md mx-1 cursor-pointer">
                            2
                        </span>
                        <span className="p-2 px-3 bg-white shadow-md mx-1 cursor-pointer">
                            3
                        </span>
                        <span className="p-2 px-3">....</span>
                        <span className="p-2 px-3 bg-white shadow-md mx-1 cursor-pointer">
                            8
                        </span>
                        <span className="p-2 px-3 bg-white shadow-md mx-1 cursor-pointer">
                            9
                        </span>
                    </div> */}
                </div>
                {/* Quick status */}
                <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
                    Quick Stats
                </h1>

                <div className="flex items-center justify-around h-fit flex-wrap">
                    <div>
                        <CircularProgressBar
                            //TODO:Bring Dynamic data>>
                            percentage={completeEvent ? completeEvent : 0}
                            text="Total Events Managed"
                            colour="text-green-600"
                        />
                    </div>
                    <div>
                        <CircularProgressBar
                            percentage={activeClient ? activeClient : 0}
                            text="Active Clients"
                            colour="text-yellow-400"
                        />
                    </div>
                    <div>
                        <CircularProgressBar
                            percentage={40}
                            text="Pending Payments"
                            colour="text-red-400"
                        />
                    </div>
                    {/* <div>
                        <CircularProgressBar
                            percentage={50}
                            text="Number of Vendors Free"
                            colour="text-blue-400"
                        />
                    </div> */}
                </div>





                {feedback && (
                    <div className="w-full mx-auto rounded-lg border border-gray-200 shadow-md mt-8 p-6 bg-white">
                        <div className="px-6 py-4 max-h-96 overflow-y-auto flex flex-col gap-6"> {/* Scrollable container */}
                            {feedback.length > 0 ? (
                                feedback.map((item, index) => (
                                    <div key={index} className="bg-gray-50 shadow-sm rounded-lg p-5 flex flex-col space-y-4"> {/* Feedback card */}
                                        <div className="flex items-center space-x-4">
                                            {/* User Icon */}
                                            <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md">
                                                <span className="font-bold text-xl">
                                                    {item.user.username.charAt(0).toUpperCase()} {/* First letter of username */}
                                                </span>
                                            </div>
                                            {/* User Information */}
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">{item.user.username}</h2> {/* Full username */}
                                                <div className="flex items-center mt-1">
                                                    <span className="text-sm text-gray-600">Rating:</span>
                                                    <span className="text-yellow-400 ml-2">
                                                        {item.feedback ? "★".repeat(item.feedback) : "No rating"} {/* Rating as stars */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Feedback Message */}
                                        <p className="text-gray-700 text-sm leading-relaxed overflow-y-auto flex-grow">
                                            {item.message || "No feedback message provided"} {/* Feedback message */}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No feedback available.</p>
                            )}
                        </div>
                    </div>
                )}







                {/* <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem] mt-12">
                    Event Calendar
                </h1>
                <div className="bg-orange-300 rounded-3xl p-8 flex flex-wrap justify-center">
                    <div className=" md:w-[50%] w-full">
                        <h1 className="text-3xl font-bold mb-3">June 2024</h1>
                        <Calendar onChange={setCalenderDates} value={calenderDates} />
                    </div>
                    <div className="text-center  md:w-[50%] w-full mt-12">
                        <h1 className="text-3xl font-bold mb-3">Today</h1>
                        <div className="flex flex-col justify-between">
                            <h1 className="text-2xl font-semibold my-2 text-left">
                                4:00 PM | Setup
                            </h1>
                            <h1 className="text-2xl font-semibold my-2 text-left">
                                4:30 PM | Bhajan Starts
                            </h1>
                            <h1 className="text-2xl font-semibold my-2 text-left">
                                7:00 PM | Aarti
                            </h1>
                            <h1 className="text-2xl font-semibold my-2 text-left">
                                7:30 PM | Prashad
                            </h1>
                        </div>
                    </div>
                </div>

                <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem] mt-12">
                    Finance
                </h1>
                <div className="bg-[#FFF4FA] p-12 rounded-3xl">
                    <div className="w-full flex justify-between">
                        <h1 className="font-bold text-3xl">Growth</h1>
                        <select
                            id="sortBy"
                            className="border-none focus:border-none focus-within:border-none p-2 mt-4 self-start bg-veryLightPink rounded-2xl border-gray-300"
                        >
                            <option value="date">January</option>
                            <option value="date">February</option>
                            <option value="date">March</option>
                            <option value="date">April</option>
                            <option value="date">May</option>
                            <option value="date">June</option>
                            <option value="date">July</option>
                            <option value="date">August</option>
                            <option value="date">September</option>
                            <option value="date">October</option>
                            <option value="date">November</option>
                            <option value="date">December</option>
                        </select>
                    </div>
                    <div className=" min-h-[30em]">
                        <Line data={FinanceData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
                <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem] mt-12">
                    Feedback
                </h1>
                <div className="flex flex-wrap mt-2 justify-center">
                    <div className="m-2 md:w-[20em] w-full bg-[#F9E9E9] p-4 border border-black rounded-lg">
                        <Image src="/profile.png" height={80} width={80} />
                        <div>
                            <p className="mt-4">
                                It is a long established fact that a reader will be distracted
                                by the readable content of a page when looking at its layout
                            </p>
                            <h1 className="font-bold text-xl">Tanu</h1>
                            <h1>Intern 1</h1>
                        </div>
                    </div>
                    <div className="m-2 md:w-[20em] w-full bg-[#F9E9E9] p-4 border border-black rounded-lg">
                        <Image src="/profile.png" height={80} width={80} />
                        <div>
                            <p className="mt-4">
                                It is a long established fact that a reader will be distracted
                                by the readable content of a page when looking at its layout
                            </p>
                            <h1 className="font-bold text-xl">Tanu</h1>
                            <h1>Intern 1</h1>
                        </div>
                    </div>
                    <div className="m-2 md:w-[20em] w-full bg-[#F9E9E9] p-4 border border-black rounded-lg">
                        <Image src="/profile.png" height={80} width={80} />
                        <div>
                            <p className="mt-4">
                                It is a long established fact that a reader will be distracted
                                by the readable content of a page when looking at its layout
                            </p>
                            <h1 className="font-bold text-xl">Tanu</h1>
                            <h1>Intern 1</h1>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className=''>
                {notify && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose">
                                        <h1 className="text-center text-2xl font-bold mb-8">Vendor Requests</h1>
                                        <div className="p-4">
                                            {notfications ? notfications.map((notfication, index) => (
                                                <div key={index} className="shadow-2xl p-2 rounded-md m-5">
                                                    <div >
                                                        <h2 className="text-lg font-semibold">{notfication.serviceName}</h2>
                                                        <p className="text-sm text-gray-600">
                                                            Booking Date: {new Date(notfication.bookingDate).toLocaleString('en-GB', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                            })}
                                                        </p>
                                                        <p className="text-sm">
                                                            Status: <span className="font-bold">{notfication.currentBookingStatus}</span>
                                                        </p>
                                                        <div>
                                                            User details
                                                            <div>
                                                                <p>{notfication?.userName}</p>
                                                                <p>{notfication?.userPhone}</p>
                                                                <p>{notfication?.userEmail}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="font-bold">Please check with the user before Accepting</p>
                                                    <div className="flex space-x-4">
                                                        <button
                                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                            onClick={() => handleAccept(notfication.bookingData, notfication.currentBookingStatus)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                            onClick={() => handleReject(notfication.bookingData)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )) : "Loading..."}
                                        </div>
                                    </div>


                                </div>


                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setNotify(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=''>
                {vendorFlag && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    {vendors ? vendors.map((vendor, index) => (
                                        <div key={index} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center p-4">
                                                <div className="w-24 h-24">
                                                    {/* Render user's avatar */}
                                                    <img
                                                        src={vendor.avatar != "N/A" ? `${vendor.avatar}` : ""}
                                                        width={100}
                                                        height={100}
                                                        className="rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-6 flex-1">
                                                    <h2 className="text-lg font-semibold text-gray-800">{vendor.businessName}</h2>
                                                    <p className="text-sm text-gray-500 mt-1">{vendor.businessDescription}</p>
                                                    <div className="mt-3 text-gray-600">
                                                        <p>
                                                            <span className="font-semibold">Username:</span> {vendor.userName}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">Phone:</span> {vendor.phoneNumber}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">AccountName:</span> {vendor.accountName}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">AccountNumber:</span> {vendor.accountNumber}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">Ifsc:</span> {vendor.ifsc}
                                                        </p>
                                                        <p>
                                                            <a href={vendor.panImg} target="_blank" className="text-blue-600 cursor-pointer font-semibold">Pan Card</a>
                                                        </p>
                                                        <p>
                                                            <a href={vendor.licenseImg} target="_blank" className="text-blue-600 cursor-pointer font-semibold">License</a>
                                                        </p>
                                                        <p>
                                                            <a href={vendor.aadharImg} target="_blank" className="text-blue-600 cursor-pointer font-semibold">Aadhar</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delete Button */}
                                            <div className="bg-red-50 p-4 flex justify-end">
                                                <button
                                                    onClick={() => handleVendorDelete(vendor._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                >
                                                    Delete Vendor
                                                </button>
                                            </div>
                                        </div>
                                    )) : "Loading...."}
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setVendorFlag(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=''>
                {sos && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose">
                                        <h1 className="text-center text-2xl font-bold mb-8">SOS Information</h1>
                                        <div className="p-4">
                                            {sosShow && sosShow.length > 0 ? (
                                                sosShow.map((notification, index) => (
                                                    <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
                                                        <h2 className="text-xl font-semibold mb-2">SOS Entry {index + 1}</h2>

                                                        <p><strong>Date:Time:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
                                                        <p><strong>Purpose:</strong> {notification.purpose}</p>
                                                        <p><strong>Contact Info:</strong> {notification.contactInfo}</p>
                                                        <p><strong>Booking:</strong> {notification.booking}</p>

                                                        <h3 className="text-lg font-semibold mt-4">Vendor Details</h3>
                                                        <p><strong>Business Name:</strong> {notification.vendor?.businessName}</p>
                                                        <p><strong>Business Address:</strong> {notification.vendor?.businessAddress}</p>
                                                        <p><strong>Business Phone:</strong> {notification.vendor?.telephone}</p>
                                                        <p><strong>Business Email:</strong> {notification.vendor?.email}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setSos(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=''>
                {notifytrasaction && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose">
                                        <h1 className="text-center text-2xl font-bold mb-8">Transaction History</h1>
                                        <div className="p-4">
                                            {notifytrasaction && notifytrasaction.length > 0 ? (
                                                notifytrasaction.map((notification, index) => (
                                                    <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
                                                        <h2 className="text-xl font-semibold mb-2">Transaction Entry {index + 1}</h2>

                                                        <p><strong>Transaction ID:</strong> {notification.merchantTransactionId}</p>
                                                        <p><strong>Status:</strong> {notification.status}</p>
                                                        <p><strong>Amount:</strong> ₹{notification.amount}</p>
                                                        <p><strong>Date:Time:</strong> {new Date(notification.createdAt).toLocaleString()}</p>

                                                        <h3 className="text-lg font-semibold mt-4">Buyer Details</h3>
                                                        <p><strong>Name:</strong> {notification.buyername}</p>
                                                        <p><strong>Email:</strong> {notification.buyeremail}</p>
                                                        <p><strong>Mobile Number:</strong> {notification.mobileNumber}</p>

                                                        <h3 className="text-lg font-semibold mt-4">Service Details</h3>
                                                        <p><strong>Service Name:</strong> {notification.bookingId?.serviceId?.serviceName}</p>

                                                        <h3 className="text-lg font-semibold mt-4">Vendor Details</h3>
                                                        <p><strong>Vendor Name:</strong> {notification.bookingId?.vendorId?.firstName}</p>
                                                        <p><strong>Account Name:</strong> {notification.bookingId?.vendorId?.accountName}</p>
                                                        <p><strong>Account Number:</strong> {notification.bookingId?.vendorId?.accountNumber}</p>
                                                        <p><strong>IFSC Code:</strong> {notification.bookingId?.vendorId?.ifsc}</p>
                                                    </div>

                                                ))
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setNotifyTransaction(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminDashboard;
