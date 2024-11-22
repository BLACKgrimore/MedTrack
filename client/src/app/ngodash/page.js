"use client";
import React, { useState, useEffect, useRef } from "react";
import { SlCalender } from "react-icons/sl";
import { FiLogOut, FiUserPlus } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Axios from "@/utils/axios";
import { useRouter } from "next/navigation";
import { MdNotificationAdd } from "react-icons/md";

import { FiUpload } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";
import Cookies from "js-cookie";



const NgoDash = () => {

    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [profileData, setProfileData] = useState(null);
    const [flag, setFlag] = useState(false)

    const [editProfile, setEditProfile] = useState(false);
    const profilePhone = useRef(null)


    const [isTnCOpen, setIsTnCOpen] = useState(false)

    const [iconNotification, setIconNotification] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const [notification, setNotification] = useState(null);
    const [notificationHistory, setNotificationHistory] = useState(null);
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);



    const handleNotification = async () => {
        setIsTnCOpen(true)
        setIconNotification(false);
        try {
            const res = Axios.get('/ngo/notificationchange')
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getNotificationData = async () => {
            try{const resp = await Axios.get("/ngo/getbookingnotification")
            console.log("This is notification data>>>>", resp.data.data);
            setNotification(resp.data.data);
            setNotificationHistory(resp.data.data);}
            catch(error){
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    window.location.href = '/signin';
                    // toast.error("Login Token Expired")

                }
                console.log(error)
            }
        }
        getNotificationData();
    }, [])

    //Logout function not work
    const handlelogout = async () => {
        // e.preventDefault()

        try {
            Cookies.remove("type")
            Cookies.remove("accessToken")
            Cookies.remove("refreshToken")
            const response = await Axios.get('/ngo/logout');
            // console.log(response.data);
            // Cookies.set("accessToken", response, { expires: 3, path: "/" });
            // Clear all items from localStorage
            // localStorage.clear();

            if (response.status == 200) {
                toast.success("Logout Successfully")

                setTimeout(() => {
                    window.location.href = '/signinngo';
                }, 1000)
            }


        } catch (error) {
            console.log(error);

        }


    }



    //FETCHPROFILE FUNCTION


    useEffect(() => {
        const handleProfile = async () => {
            try {
                const response = await Axios.get('/ngo/fetchprofile');
                // console.log(response.data);
                setProfileData(response.data.data);
                if (response.data.data.notification) {
                    setIconNotification(response.data.data.notification);
                }

            } catch (error) {
                console.log(error);

            }
        }

        if (profileData == null) handleProfile();
    })

    // Close sidebar when clicking outside of it
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

    //File Upload

    async function handleUploadFile(avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const resp = await Axios.post("/ngo/updateavatar", formData, {
            'Content-Type': 'multipart/form-data'
        })
        // console.log(resp.data);
    }

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            if (window.confirm("Do you want to update the profile?")) {
                handleUploadFile(file);
            }
            toast.success("Profile updated successfully!")
            setTimeout(() => {
                window.location.reload(); // Refresh the page
            }, 3000);
        }
    }



    const handleAccept = async (_id) => {
        console.log(_id);

        try {
            // console.log(senderId);
            const res = await Axios.post('/ngo/acceptbook', { _id });
            if (res.status == 200) {
                toast.success("Request Accept")
            }
            setTimeout(() => {
                window.location.reload()
            }, 1000)

            setIsTnCOpen(false);


            // console.log(res);
        } catch (error) {
            console.error("Error accepting the booking:", error);
        }

    }

    const handleReject = async (_id) => {
        console.log(_id);

        try {
            // console.log(senderId);
            const res = await Axios.post('/ngo/rejectbook', { _id });
            if (res.status == 200) {
                toast.success("Request Reject")
            }
            setTimeout(() => {
                window.location.reload()
            }, 1000)

            setIsTnCOpen(false)



            // console.log(res);
        } catch (error) {
            console.error("Error accepting the booking:", error);
        }
    }


    const handleProfileSubmit = async (e) => {

        e.preventDefault();

        //TODO:Uncomment the code
        // const currentDate= Date.now();
        // const currentDate= Date.now();
        // if(otpPhoneDataContainer.data.otpExpires<currentDate ){
        //     alert("OTP duration Expired Please try again!!");
        //     return;
        // }
        // if(otpPhoneDataContainer.data.otp!=inputPhoneOtp){
        //     alert("Registration Failed Wrong Phone OTP Entered!!");
        //     return;
        // }

        const resp = await Axios.post("/ngo/updateprofile", {

            "phoneNumber": profilePhone.current.value
        })
        if (resp.data.status == 200) {
            toast.success("update Profile successfully ")
            setTimeout(() => {

                window.location.reload()
            }, 1000)
        } else {
            toast.error("update Profile failed ")
        }
        // console.log(resp.data);

    }

    const handlePhoneVerification = async (e) => {
        e.preventDefault();
        setPhonePopupFlag(true);
        console.log("Got Hit!!")
        try {

            if (!phoneNumber.current.value) {
                alert("Phone Number Fields should not be empty!!");
                return;
            }
            if (!phoneNumber.current.value || !/^\S+@\S+\.\S+$/.test(phoneNumber.current.value)) {
                alert("Enter a valid Phone Number")
                return;
            }
            const resp = await Axios.post('/user/sendotpnumber', {
                phoneNumber: phoneNumber.current.value
            })
            console.log("This is the total data>>>>", resp.data)
            setPhoneOtpDataContainer(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="py-16 w-full h-fit flex flex-row bg-[#ffe7da]">
            {/* Toggle button for sidebar */}
            <button
                className="md:hidden text-orange-900 fixed top-14 z-50"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isSidebarOpen ? (
                    <AiOutlineClose className="w-8 h-8 text-orange-900" />
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
                    {/*  <img
            className="bg-[#e5cec2] w-full"
            src="/userdash/logo.png"
            alt="Logo"
          ></img> */}
                </div>

                {/* Sidebar content */}
                <div className="p-4 bg-[#fdb389]">
                    {profileData ? (<div className="shadow shadow-black rounded-lg bg-white p-4 mt-10 lg:mt-0">
                        <div className="flex md:flex-row xsm:flex-col justify-center gap-4 items-center relative">
                            <div className='group'>
                                <form action="" className='absolute top-10'>
                                    <label className="cursor-pointer px-4 py-2 text-xs text-zinc-500 hidden rounded-md opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 ">
                                        <span className='flex gap-1 '>
                                            <FiUpload />
                                            Upload File
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden h-20 w-20 cursor-pointer"
                                            accept="image/*"
                                            onChange={handleFileChange}

                                        />
                                    </label>
                                </form>
                                <img className="bg-[#e5cec2] rounded-full md:w-28 lg:h-28 xsm:w-20 xsm:h-20" src={`${profileData ? profileData.avatar : ""}`}></img>
                            </div>
                            <h1 className="lg:text-[1.2rem] xsm:text-base font-bold">
                                {profileData.username}
                            </h1>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                                Email
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                                {profileData.email}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                                PhoneNo
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">

                                {profileData.phoneNumber}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                                Address
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                                {profileData.address}
                            </p>
                        </div>

                    </div>) : (<h1>Loding....</h1>)}
                </div>




                <div onClick={() => handlelogout()} className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                    <FiLogOut className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Logout</h1>
                </div>


                <div onClick={() => handleNotification()} className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                    <SlCalender className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Notification</h1>
                </div>
                <div onClick={() => setEditProfile(true)} className="cursor-pointer bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                    <FiUserPlus className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Edit Profile</h1>
                </div>
            </div>







            <div className=''>
                {isTnCOpen && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto scrollbar-hide">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose">
                                        {notification && notification.filter(item => !(item.isAccept || item.isReject)).length > 0 ? (
                                            notification
                                                .filter(item => !(item.isAccept || item.isReject))
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full border border-gray-300 rounded-lg p-4 mb-4 shadow-lg flex items-center justify-between bg-white"
                                                    >
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full">
                                                                {item.sender ? item.sender.username.charAt(0).toUpperCase() : "N/A"}
                                                            </div>
                                                            <div>
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.sender ? item.sender.username : "N/A"}
                                                                </h2>
                                                                <p className="text-sm text-gray-500">{item ? item.message : ""}</p>
                                                                <p>Phone: {item.sender ? item.phone : "N/A"}</p>
                                                                <p>Email: {item.sender ? item.sender.email : "N/A"}</p>
                                                                <p>Address: {item.sender ? item.location : "N/A"}</p>
                                                                <p>Pin: {item.sender ? item.pin : "N/A"}</p>
                                                                <p>Quantity: {item.sender ? item.qtyOfFood : "N/A"}</p>
                                                                <div className="flex gap-5">

                                                                    <button
                                                                        className="bg-green-400 cursor-pointer rounded-xl p-2"
                                                                        onClick={() => handleAccept(item._id)}
                                                                    >
                                                                        Accept
                                                                    </button>


                                                                    <button
                                                                        className="bg-red-400 cursor-pointer rounded-xl p-2"
                                                                        onClick={() => handleReject(item._id)}
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="text-center text-gray-500">No More Notifications</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setIsTnCOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            {/* RIGHT SIDE */}
            <div
                className="w-full md:w-[80vw] py-4 pl-4 md:pr-14 xsm:pr-4"
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
                <div className="flex msm:flex-row justify-between items-center xsm:flex-col">
                    <h1 className="font-bold lg:text-[4rem] self-start xsm:text-[3rem]">
                        My Account
                    </h1>
                    <div className="flex flex-row justify-center self-start items-center gap-4" onClick={() => handleNotification()}>
                        {
                            iconNotification ? (
                                <MdNotificationAdd className="text-red-600 w-[2rem] h-[2rem] cursor-pointer" />
                            ) : (
                                <IoMdNotifications className="text-blue-600 w-[2rem] h-[2rem] cursor-pointer" />
                            )
                        }


                    </div>
                </div>


                {/* My Events Section */}
                <div className="mb-8 flex flex-col mt-4">
                    <div className="flex md:flex-row xsm:flex-col justify-between w-full bg-white items-center shadow shadow-amber-900  overflow-auto px-4 p-2">
                        <div className="self-start min-w-[10rem]">
                            <h1 className="font-bold lg:text-[2rem] xsm:text-[2rem]">My Events</h1>
                            <h1 className="text-black">See and manage all events here</h1>
                        </div>

                    </div>


                </div>




                {/* Transaction History Section */}
                <div className="flex flex-col w-full">
                    <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
                        Booking Accepted History
                    </h1>

                    {notificationHistory === null ? (
                        <h1>Loading.....</h1>
                    ) : notificationHistory.length > 0 ? (
                        <div className="overflow-y-auto scrollbar-hide max-h-80 mt-3">
                            <table className="w-full bg-white shadow rounded-lg table-auto">
                                <thead>
                                    <tr className="text-left text-xl">
                                        <th className="p-4">Username</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Quantity of Food</th>
                                        <th className="p-4">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="min-w-[20rem]">
                                    {notificationHistory.map((booking, index) => (
                                        booking.isAccept ? (
                                            <tr key={index}>
                                                <td className="md:p-4 xsm:p-6">{booking.sender.username}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.sender.email}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.phone}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.qtyOfFood}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.location}</td>
                                            </tr>
                                        ) : null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>No Booking Completed</h1>
                    )}
                </div>




                {/* Transaction History Section */}
                <div className="flex flex-col w-full">
                    <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
                        Booking Rejected History
                    </h1>

                    {notificationHistory === null ? (
                        <h1>Loading.....</h1>
                    ) : notificationHistory.length > 0 ? (
                        <div className="overflow-y-auto scrollbar-hide max-h-80 mt-3">
                            <table className="w-full bg-white shadow rounded-lg table-auto">
                                <thead>
                                    <tr className="text-left text-xl">
                                        <th className="p-4">Username</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Quantity of Food</th>
                                        <th className="p-4">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="min-w-[20rem]">
                                    {notificationHistory.map((booking, index) => (
                                        booking.isReject ? (
                                            <tr key={index}>
                                                <td className="md:p-4 xsm:p-6">{booking.sender.username}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.sender.email}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.phone}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.qtyOfFood}</td>
                                                <td className="md:p-4 xsm:p-6">{booking.location}</td>
                                            </tr>
                                        ) : null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>No Booking Completed</h1>
                    )}
                </div>



                <div>
                    {editProfile && (
                        <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                                {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                        <div className="prose">
                                            <form
                                                onSubmit={handleProfileSubmit}

                                                className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6"
                                            >
                                                <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>


                                                <div>
                                                    <fieldset className='border  border-solid border-zinc-300 rounded-lg p-4' >
                                                        <legend className="text-lg font-medium mb-2 text-zinc-800">Personal Details</legend>

                                                        <label className="block text-gray-700">Phone</label>
                                                        <input
                                                            type="text"
                                                            name="Phone"
                                                            ref={profilePhone}
                                                            defaultValue={profileData ? profileData.phoneNumber : "Not Available"}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                        <button onClick={handlePhoneVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-pointer my-5">Verify Phone</button>
                                                        {phonePopupFlag && <div className="fllex">
                                                            <input onChange={(e) => {
                                                                setInputPhoneOtp(e.target.value);
                                                                console.log(e.target.value)
                                                            }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Phone OTP" />
                                                            {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                                                        </div>}
                                                    </fieldset>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Edit Profile
                                                </button>
                                            </form>
                                        </div>


                                    </div>


                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button onClick={() => setEditProfile(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>



            </div>

        </div >
    );
};


export default NgoDash
