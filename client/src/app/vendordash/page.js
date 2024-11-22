'use client'
import React, { useState, useEffect, useRef } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { ImStatsDots } from "react-icons/im";
import { RiMenuSearchLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { BsBank } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut, FiUser } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import Axios from '@/utils/axios';
import { MdNotificationsActive } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Loading from '../loading'

const UserDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profile, setProfile] = useState(null)
    const [completeEvent, setCompleteEvent] = useState(null);
    const [inCompleteEvent, setInCompleteEvent] = useState(null);
    const [notification, setNotification] = useState(null);
    const sidebarRef = useRef(null);
    const [isTnCOpen, setIsTnCOpen] = useState(false)
    const [isAddOpen, setOpen] = useState(false);
    const [isDelOpen, setDel] = useState(false);
    const serviceName = useRef(null);
    const serviceDescription = useRef(null);
    const serviceCategory = useRef(null);
    const price = useRef(null);
    const equipment = useRef(null);
    const serviceImage1 = useRef(null);
    const serviceImage2 = useRef(null);
    const serviceImage3 = useRef(null);
    const serviceImage4 = useRef(null);
    const serviceImage5 = useRef(null);
    const [services, setServices] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [notify, setNotify] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [flag, setFlag] = useState(true);
    const [targetServiceId, setTarget] = useState(null);
    const [isNotified, setIsNotified] = useState(null);
    const router = useRouter();
    const accountNumber = useRef(null);
    const accountName = useRef(null);
    const ifsc = useRef(null);
    const profileName = useRef(null);
    const profilePhone = useRef(null)
    const venueLocation = useRef(null)
    const serviceArray = ["Dj", "Event Manager", "Car Rentals", "Banquet Hall", "Marriage Hall", "Restraunt", "Anchor", "Singer", "Dancer", "Decorator", "Game", "Photo Grapher", "Video Grapher", "Pandit", "Fashion Design", "Crockery", "Body Guard", "Jewellery", "Clothes Wedding", "Marriage", "Birthday", "Babyshower", "Fresher Party", "Fair Well", "Annual Function", "Ceremony",  "Anniversary", "Pooja", "Designer ", "Photography"]
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);


    const [accountname, setAccountname] = useState('N/A')
    const [accountnumber, setAccountnumber] = useState('N/A')
    const [accountifsc, setAccountifsc] = useState('N/A')


    // Function to handle image change
    const handleNextImage = () => {
        setCurrentImage((prev) => (prev + 1) % service.serviceImage.length);
    };

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev - 1 + service.serviceImage.length) % service.serviceImage.length);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    // Close sidebar if screen size increases over md
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();




        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const resp = await Axios.get("/vendor/profile");
                // console.log("This is the profile", resp.data.user);
                setProfile(resp.data.user);
                setAccountifsc(resp.data.user.ifsc)
                setAccountname(resp.data.user.accountName)
                setAccountnumber(resp.data.user.accountNumber)
            }
            catch (error) {
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    window.location.href = '/signin';
                    toast.error("Login Token Expired")

                }
                console.log(error)
            }
        }

        getData();
    }, [])


    useEffect(() => {
        const getBookingData = async () => {
            try {
                const resp1 = await Axios.get('/vendor/booking');
                // console.log("%cThis is booking data", "color:pink;font-size:20px", resp1.data);
                setCompleteEvent(resp1.data.completeStatus);
                setInCompleteEvent(resp1.data.inCompleteStatus);
            }
            catch (error) {
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    window.location.href = '/signin';
                    toast.error("Login Token Expired")

                }
                console.log(error)
            }
        }
        getBookingData();
    }, [])

    useEffect(() => {
        const getNotificationData = async () => {
            try{const resp = await Axios.get("/vendor/getbookingnotification")
            // console.log("This is notification data>>>>", resp);
            setNotification(resp.data.data);}
            catch(error){
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    window.location.href = '/signin';
                    toast.error("Login Token Expired")

                }
                console.log(error)
            }
        }
        getNotificationData();
    }, [])

    useEffect(() => {
        const getServiceData = async () => {
            try{const response = await Axios.get("/vendor/getservices");
            // console.log("this is services data>>>", response.data);
            setServices(response.data.resp);}
            catch (error){
                if (error.response.data.message == "Invalid or expired access token") {
                    console.log("this is router")
                    // router.push("/signin")
                    Cookies.remove("type")
                    Cookies.remove("accessToken")
                    Cookies.remove("refreshToken")
                    // window.location.href = '/signin';
                    toast.error("Login Token Expired")

                }
            }
        }
        getServiceData();
    }, [])
    // Handle sidebar toggle
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    async function vedorAcceptOrReject(flag, bookingId, receiver, sender, serviceId, basicInfo) {
        // console.log("this is the basic Info>>>", basicInfo)
        const date = basicInfo[2];
        const time = basicInfo[3];
        // console.log("This is to be sent data>>>", date)
        const resp = await Axios.post("/vendor/acceptorreject", { flag: flag, bookingId: bookingId, receiver: receiver, sender: sender, serviceId, date: date, time: time })
        toast.success("Updated Successfully!!")
        // console.log("This is  the receiver:",receiver);
        // console.log("This is  the sender:",sender);
        // console.log("This is Notification>>>",notification)
        setTimeout(() => {

            window.location.reload();
        })
    }
    const validateFile = (file) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg",];
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (!allowedTypes.includes(file.type)) {
            return "Invalid file type. Only PDF, PNG, JPG and JPEG are allowed.";
        }
        if (file.size > maxSize) {
            return "File size exceeds 2MB.";
        }
        return 1;
    };

    async function handleAddService(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("serviceName", serviceName.current.value,);
            formData.append("serviceDescription", serviceDescription.current.value,);
            formData.append("serviceCategory", serviceCategory.current.value,);
            formData.append("price", price.current.value,);
            formData.append("equipment", equipment.current.value,);
            formData.append("location", venueLocation.current.value,);
            if (serviceImage1 && serviceImage2 && serviceImage3 && serviceImage3 && serviceImage4 && serviceImage5) {
                if (validateFile(serviceImage1.current.files[0]) && validateFile(serviceImage2.current.files[0]) && validateFile(serviceImage3.current.files[0]) && validateFile(serviceImage4.current.files[0]) && validateFile(serviceImage5.current.files[0])) {
                    formData.append("serviceImage1", serviceImage1.current.files[0]);
                    formData.append("serviceImage2", serviceImage2.current.files[0]);
                    formData.append("serviceImage3", serviceImage3.current.files[0]);
                    formData.append("serviceImage4", serviceImage4.current.files[0]);
                    formData.append("serviceImage5", serviceImage5.current.files[0]);
                }
            }
            for (let pair of formData.entries()) {
                /* console.log(pair[0] + ': ' + pair[1]); */  // pair[0] is the field name, pair[1] is the value
            }
            const resp = await Axios.post("/vendor/addservice", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },

            });
            // console.log(resp.data);
            if (resp.data.status == 200) {
                toast.success("Service added successfully!!");
                setOpen(false);

            }
        } catch (error) {
            console.log("Error in addService Route>>", error)
        }
        finally {
            setLoading(false);
        }
    }



    async function handleRemoveService(id) {
        const resp = await Axios.post('/vendor/deleteservice', {
            id
        })
        // console.log("This is the on delete Data>>>", resp.data);
        if (resp.data.isServiceGoingOn.length > 0) {
            toast.error("Please First Finish the on going  bookings");
            setDel(false)
            return;
        }
        toast.success("Service Deleted successfully!!")
        setDel(false);
        setTimeout(() => {

            window.location.reload();
        }, 1000)
    }

    async function handleUploadFile(avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const resp = await Axios.post("/vendor/updateavatar", formData, {
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
                toast.success("Profile updated successfully!");
                setTimeout(() => {
                    window.location.reload(); // Refresh the page
                }, 3000);
            }

        }
    }

    const CircularProgressBar = ({ percentage, text, colour, relative }) => {
        const radius = 80;
        const strokeWidth = 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / relative) * circumference;

        return (
            <div className="relative flex items-center justify-center w-[12rem] h-[12rem]">
                <svg className="absolute top-0 left-0" width="100%" height="100%">
                    <circle
                        className="text-gray-300"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="55%"
                        cy="50%"
                    />
                    <circle
                        className={colour}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset.toString()}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="55%"
                        cy="50%"
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                </svg>
                <span className="flex text-xl items-center justify-end pl-8 font-bold text-gray-700">{text}</span>
            </div>
        );
    };

    if (!completeEvent || !inCompleteEvent) {

        return <div>Loading...</div>
    }

    async function handleNextState(serviceId, bookingId, isRequested) {
        if (isRequested) {
            toast.info("Already Requested!!")
            return;
        }
        // console.log("This is ServiceId and BookingId>>>", serviceId?._id, bookingId)
        setTarget(serviceId?._id);
        const resp = await Axios.post("/vendor/createnewadminnotification", {
            serviceId: serviceId._id,
            bookingId: bookingId
        })
        const Id = bookingId
        // console.log(Id);
        const resp2 = await Axios.post("/vendor/updateisrequested", { Id });
        const resp3 = await Axios.get("/vendor/adminnotify")
        // console.log("This is the user Detail required>>>>", resp2.data);
        toast.success("Request Admin for Updating to Next State!!")
        window.location.reload();
    }

    function linearProgressBar(currentStatus) {
        if (currentStatus == "Pending") return 0;
        else if (currentStatus == "Confirmed") return 20;
        else if (currentStatus == "Deposit_Paid") return 40;
        else if (currentStatus == "Departed") return 60;
        else if (currentStatus == "Follow_Up") return 80;
        else if (currentStatus == "Completed") return 100;
        else return 0;
    }

    const handlelogout = async (e) => {
        e.preventDefault()
        try {
            // Cookies.set("accessToken", response, { expires: 3, path: "/" });
            Cookies.remove("type")
            Cookies.remove("accessToken")
            Cookies.remove("refreshToken")
            const response = await Axios.get('/vendor/logout');
            //  console.log(response.data);
            // Cookies.set("accessToken", response, { expires: 3, path: "/" });
            // Clear all items from localStorage
            // localStorage.clear();
            toast.success("Logout Successfully")
            setTimeout(() => {

                window.location.href = '/signinvendor';
            }, 1000)

        } catch (error) {
            console.log(error);

        }

    }
    const updateIcon = async () => {
        const resp = await Axios.get("/vendor/updateicon");
    }
    const handleProfileSubmit = async (e) => {






        //TODO:Complete the function :)
        e.preventDefault();

        const ifscRegex = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;
        const accountNumberRegex = /^\d{9,18}$/; // Matches between 9 to 18 digits
        const phoneRegex = /^\d{10}$/;

        // Validation checks










        /* console.log(accountName.current.value)
        console.log(accountNumber.current.value)
        console.log(ifsc.current.value)
        console.log(profileName.current.value)
        console.log(profilePhone.current.value) */
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
        if (!accountNumberRegex.test(accountNumber.current.value)) {
            toast.error('Invalid Account Number. It should be between 9 to 18 digits.');
            return false;
        }

        if (!ifscRegex.test(ifsc.current.value)) {
            toast.error('Invalid IFSC Code. Please enter a valid IFSC.');
            return false;
        }

        if (!phoneRegex.test(profilePhone.current.value)) {
            toast.error('Invalid Phone Number. Please enter a valid 10-digit phone number.');
            return false;
        }

        const resp = await Axios.post("/vendor/updateprofile", {
            "accountNumber": accountNumber.current.value,
            "accountName": accountName.current.value,
            "ifsc": ifsc.current.value,
            "profileName": profileName.current.value,
            "phoneNumber": profilePhone.current.value,
            "userName": profileName.current.value,
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
        // console.log("Got Hit!!")
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
            // console.log("This is the total data>>>>", resp.data)
            setPhoneOtpDataContainer(resp.data)
        } catch (error) {
            console.log(error)
        }
    }




    const handleaddService = () => {

        if (accountifsc == 'N/A' || accountname == 'N/A' || accountnumber == 'N/A') {

            toast.info('Please add bank account details first')
        }
        else {
            // console.log("222222222222");
            setOpen(true)
        }
    }

    return (
        <>

            <div className="py-16 w-full h-fit flex flex-row bg-[#ffe7da]">

                {/* Toggle button for sidebar */}
                <button
                    className="md:hidden text-[#ff8e4f] fixed top-[77px] z-50"
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    {isSidebarOpen ? <AiOutlineClose className="w-8 h-8 text-[#ff8e4f]" /> : <AiOutlineMenu className="w-8 h-8" />}
                </button>

                {/* LEFT SIDE BAR */}
                <div
                    ref={sidebarRef}
                    className={`fixed md:relative top-0 mt-8 left-0 h-full z-40 md:z-auto md:transform-none bg-[#ffe7da]
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 transition-transform duration-300 ease-in-out
    w-full sm:w-[60vw] md:w-[30vw] overflow-y-auto md:overflow-y-visible no-scrollbar`}
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
                        {/* <img className="bg-[#e5cec2] w-full" src="/userdash/logo.png" alt="Logo"></img> */}
                    </div>

                    {/* Sidebar content */}
                    <div className="p-2 bg-[#fdb389] mt-20 sm:mt-6 lg:mt-0">
                        <div className="shadow-md rounded-lg bg-white p-4">
                            {/* Profile Picture and Name */}
                            <div className="flex md:flex-row flex-col justify-center gap-2 items-center">
                                <div className="group relative">
                                    <form action="" className="absolute top-8">
                                        <label className="cursor-pointer px-2 py-1 text-xs text-zinc-500 hidden rounded-md opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 bg-gray-100 shadow-md">
                                            <span className="flex items-center gap-1">
                                                <FiUpload />
                                                Upload
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </form>
                                    <img
                                        className="bg-[#e5cec2] rounded-full w-20 h-20 sm:w-16 sm:h-16"
                                        src={`${profile ? profile.avatar : ''}`}
                                        alt="Profile"
                                    />
                                </div>
                                <h1 className="lg:text-[1rem] text-sm font-bold text-center">
                                    {profile ? profile.firstName : 'User Name'}
                                </h1>
                            </div>

                            {/* Sidebar Info Fields */}
                            <div className="flex flex-col gap- pt-2">
                                {/* Email */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Email:</p>
                                    <p className="text-sm">{profile ? profile.email : 'user@example.com'}</p>
                                </div>

                                {/* Business Description */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Business Description:</p>
                                    <p className="text-sm">{profile ? profile.businessDescription : 'N/A'}</p>
                                </div>

                                {/* Address */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Address:</p>
                                    <p className="text-sm">{profile ? profile.businessAddress : 'No address'}</p>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Phone:</p>
                                    <p className="text-sm">{profile ? profile.phoneNumber : 'N/A'}</p>
                                </div>

                                {/* Account Name */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Account Name:</p>
                                    <p className="text-sm">{profile ? profile.accountName : 'N/A'}</p>
                                </div>

                                {/* Account Number */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">Account Number:</p>
                                    <p className="text-sm">{profile ? profile.accountNumber : 'N/A'}</p>
                                </div>

                                {/* IFSC */}
                                <div className="flex gap-2 items-center">
                                    <p className="text-sm font-semibold">IFSC:</p>
                                    <p className="text-sm">{profile ? profile.ifsc : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Sidebar Action Buttons */}
                    <div
                        onClick={() => handleaddService()}
                        className="cursor-pointer bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4"
                    >
                        <RiMenuSearchLine className="text-white w-8 h-8" />
                        <h1 className="text-xl font-medium">Add Service</h1>
                    </div>

                    <div
                        onClick={() => setDel(true)}
                        className="cursor-pointer bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4"
                    >
                        <IoSettings className="text-white w-8 h-8" />
                        <h1 className="text-xl font-medium">View or Remove Service</h1>
                    </div>

                    <div
                        onClick={() => {
                            updateIcon()
                            setNotify(true)
                            setFlag(false)
                        }}
                        className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer"
                    >
                        <SlCalender className="text-white w-8 h-8" />
                        <h1 className="text-xl font-medium">Notification</h1>
                    </div>

                    <div
                        onClick={handlelogout}
                        className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer"
                    >
                        <FiLogOut className="text-white w-8 h-8" />
                        <h1 className="text-xl font-medium">Logout</h1>
                    </div>

                    <div
                        onClick={() => setEditProfile(true)}
                        className="cursor-pointer bg-[#ff8e4f] mb-20 border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4"
                    >
                        <FiUser className="text-white w-8 h-8" />
                        <h1 className="text-xl font-medium">Edit Profile</h1>
                    </div>
                </div>


                {/* RIGHT SIDE */}
                <div
                    className="w-full md:w-[80vw] py-4 pl-4 md:pr-14 xsm:pr-4"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
                >
                    <div className="flex msm:flex-row justify-between items-center xsm:flex-col">
                        <h1 className="font-bold lg:text-[4rem] text-start xsm:text-[3rem]">My Account</h1>
                        <div className="flex flex-row justify-center self-start items-center gap-4">
                            {(profile && profile.notification && flag) ? <MdNotificationsActive onClick={() => {
                                updateIcon()
                                setNotify(true)
                                setFlag(false)
                            }} className="text-red-600 w-[2rem] h-[2rem] cursor-pointer" /> : <IoMdNotifications className="text-blue-600 w-[2rem] h-[2rem] cursor-pointer" onClick={() => {
                                setFlag(true)
                                setNotify(true)
                            }
                            } />}
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="shadow-md shadow-green-500 rounded-2xl bg-white p-4">
                            <div className="flex md:flex-row justify-between gap-4 items-center">
                                <h1 className="text-3xl font-bold">Hello, {profile ? profile.userName : ""}</h1>
                            </div>
                            <h1 className="pt-2">
                                Manage all your upcoming events, bookings, and services from one convenient dashboard.
                                Explore, book, and customize your perfect event with ease.
                            </h1>
                        </div>
                    </div>


                    <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">Quick Stats</h1>

                    <div className="flex items-center justify-around h-fit flex-wrap">
                        <div >
                            <CircularProgressBar percentage={profile ? profile.totalbooking : 0} relative={100} text="Total Booking" colour="text-green-600" />
                        </div>
                        <div >
                            <CircularProgressBar percentage={profile ? profile.ongoingbooking : 0} relative={100} text="On Booking" colour="text-gray-400" />
                        </div>
                        <div >
                            <CircularProgressBar percentage={profile ? profile.totalearning : 0} relative={profile ? profile.totalearning * 11 : 0} text="Earning" colour="text-blue-400" />
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
                        <div className="overflow-auto mt-4">
                            <table className="w-full bg-white shadow rounded-lg">
                                <thead>
                                    <tr className="text-left text-xl">
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Time</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Progress</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inCompleteEvent.map((ev, idx) => (
                                        <tr key={idx} className={`${ev._doc.isPaid ? "" : "hidden"}`}>
                                            <td className="p-4">{`${ev.bookingDateFormatted}`}</td>
                                            <td className="p-4">{`${ev._doc.bookingTime}`}</td>
                                            <td className="p-4">{`${ev._doc.serviceId ? ev._doc.serviceId.serviceName : "N/A"}`}</td>
                                            <td className="p-4">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div className="bg-pink-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${linearProgressBar(ev._doc.serviceId ? ev._doc.status : "N/A")}%` }}>
                                                        {linearProgressBar(ev._doc.serviceId ? ev._doc.status : "N/A")}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4"><span className="mt-4 self-center text-red-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">{ev._doc.serviceId ? ev._doc.status : "N/A"}</span></td>
                                            <td onClick={() => handleNextState(ev._doc?.serviceId, ev._doc?._id, ev._doc.isRequested)} className={`p-4 ${ev && ev._doc.isRequested ? "cursor-not-allowed" : "cursor-pointer"}`}><span className={`${ev && ev._doc.isRequested ? "cursor-not-allowed" : "cursor-pointer"} mt-4 self-center text-red-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg`}>{ev && ev._doc.isRequested ? "Requested" : "Next State"}</span></td>
                                        </tr>
                                    ))}
                                    {completeEvent.map((ev, idx) => (
                                        <tr key={idx}>

                                            <td className="p-4">{`${ev.bookingDateFormatted}`}</td>
                                            <td className="p-4">{`${ev._doc.bookingTime}`}</td>
                                            <td className="p-4">{`${ev._doc.serviceId ? ev._doc.serviceId.serviceName : "N/A"}`}</td>
                                            <td className="p-4">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '100%' }}> 100%
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Completed</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className=''>
                    {isTnCOpen && (
                        <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-4 sm:p-8 rounded-lg w-[90%] sm:w-[39rem] max-w-[39rem] flex flex-col">
                                <div className="max-h-96 overflow-y-auto w-full">
                                    <div className="w-full bg-white shadow-md rounded-lg p-4 sm:p-8">
                                        <div className="prose">
                                            {notification ? (
                                                notification.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full border border-gray-300 rounded-lg p-4 mb-4 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4"
                                                    >
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full">
                                                                {item.sender ? item.sender.username.charAt(0).toUpperCase() : "N/A"}
                                                            </div>
                                                            <div className="text-center sm:text-left">
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.sender ? item.sender.username : "N/A"}
                                                                </h2>
                                                                <p className="text-sm text-gray-500">{item ? item.message : ""}</p>
                                                                <p className="text-sm text-gray-600">Phone: {item.sender ? item.sender.phone_no : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Email: {item.sender ? item.sender.email : "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center sm:justify-end space-x-2">
                                                            {item.isAccept === "Pending" ? (
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => vedorAcceptOrReject("Accepted", item._id)}
                                                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => vedorAcceptOrReject("Rejected", item._id)}
                                                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            ) : item.isAccept === "Accepted" ? (
                                                                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                                                    Accepted
                                                                </button>
                                                            ) : (
                                                                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                                                    Rejected
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center text-gray-500">Loading....</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        onClick={() => setIsTnCOpen(false)}
                                        className="bg-gray-400 text-white py-1 px-4 rounded hover:bg-gray-500 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
                <div>
                    {isAddOpen && (
                        <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                                {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="w-full mx-auto bg-white shadow-md rounded-lg">
                                        <div className="prose">
                                            <form

                                                className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6"
                                                onSubmit={handleAddService}
                                            >
                                                <h2 className="text-2xl font-bold mb-4 text-center">Add New Service</h2>

                                                <div>
                                                    <label className="block text-gray-700">Service Name</label>
                                                    <input
                                                        type="text"
                                                        name="serviceName"
                                                        ref={serviceName}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700">Service Description</label>
                                                    <textarea
                                                        name="serviceDescription"
                                                        ref={serviceDescription}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    ></textarea>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700">Service Category</label>
                                                    <select
                                                        type="text"
                                                        name="serviceCategory"
                                                        ref={serviceCategory}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    >
                                                        {serviceArray.map((item, index) => (
                                                            <option key={index} value={`${item}`}>{`${item}`}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700">Price</label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        ref={price}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700">Equipment</label>
                                                    <input
                                                        type="text"
                                                        name="equipment"
                                                        ref={equipment}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700">Service Image 1</label>
                                                    <input
                                                        type="file"
                                                        name="serviceImage"
                                                        accept="image/*"
                                                        ref={serviceImage1}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Service Image 2</label>
                                                    <input
                                                        type="file"
                                                        name="serviceImage"
                                                        accept="image/*"
                                                        ref={serviceImage2}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Service Image 3</label>
                                                    <input
                                                        type="file"
                                                        name="serviceImage"
                                                        accept="image/*"
                                                        ref={serviceImage3}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Service Image 4</label>
                                                    <input
                                                        type="file"
                                                        name="serviceImage"
                                                        accept="image/*"
                                                        ref={serviceImage4}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Service Image 5</label>
                                                    <input
                                                        type="file"
                                                        name="serviceImage"
                                                        accept="image/*"
                                                        ref={serviceImage5}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700">Location</label>
                                                    <input
                                                        type="text"
                                                        name="equipment"
                                                        ref={venueLocation}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                    <h1 className='text-red-400 text-sm'>*Please Enter a Relavant Location (<strong>Preferably City Name</strong>) which users can easily Search.</h1>
                                                </div>
                                                <button
                                                    type="submit"
                                                    onClick={handleAddService}
                                                    className="bg-green-500 text-white  font-semibold mx-auto w-full max-w-xs px-4 py-2 rounded-md hover:bg-green-600 flex items-center justify-center"
                                                >
                                                    Add Service
                                                </button>

                                            </form>
                                        </div>


                                    </div>


                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button onClick={() => setOpen(false)} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">Close</button>
                                </div>
                            </div>

                        </div>
                    )}

                </div>
                <div>
                    {isDelOpen && (
                        <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-4 sm:p-8 rounded-lg w-[95%] sm:w-[55rem] flex flex-col">
                                <div className="max-h-96 overflow-y-auto w-full">
                                    <div className="w-full bg-white shadow-md rounded-lg p-4 sm:p-8">
                                        <div className="prose">
                                            {services ? services.map((service, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white shadow-md rounded-lg flex flex-col sm:flex-row m-5 overflow-hidden"
                                                >
                                                    {/* Image Section */}
                                                    <div className="relative w-full sm:w-1/2">
                                                        <img
                                                            className="h-[30vh] sm:h-[50vh] w-full object-contain"
                                                            src={service.serviceImage[currentImage]}
                                                            alt="Service"
                                                        />
                                                        {/* Optional buttons for image navigation */}
                                                        {/* <button
                                                onClick={handlePrevImage}
                                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                                              >
                                                &#8592;
                                              </button>
                                              <button
                                                onClick={handleNextImage}
                                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                                              >
                                                &#8594;
                                              </button> */}
                                                    </div>

                                                    {/* Service Details Section */}
                                                    <div className="flex flex-col justify-between p-4 w-full sm:w-1/2">
                                                        <div className="space-y-4 text-center sm:text-left">
                                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                                                {service.serviceName}
                                                            </h2>
                                                            <p className="text-gray-500">{service.serviceDescription}</p>
                                                            <div className="text-gray-600 font-semibold">{service.serviceCategory}</div>
                                                            <div className="text-lg font-semibold text-blue-600">
                                                                Rs. {service.price}
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-700">Equipment:</h3>
                                                            <ul className="list-disc list-inside text-gray-600">
                                                                {service.equipment.map((item, index) => (
                                                                    <li key={index}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Action Button Section */}
                                                        <div className="mt-4 flex justify-center sm:justify-start">
                                                            <button
                                                                onClick={() => handleRemoveService(service._id)}
                                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            )) : "Loading...."}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        onClick={() => setDel(false)}
                                        className="bg-gray-400 text-white py-1 px-4 rounded hover:bg-gray-500 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
                <div className=''>
                    {notify && (
                        <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-4 sm:p-8 rounded-lg w-[95%] sm:w-[39rem] flex flex-col">
                                <div className="max-h-96 overflow-y-auto w-full">
                                    <div className="w-full bg-white shadow-md rounded-lg p-4 sm:p-8">
                                        <div className="prose">
                                            {notification ? (
                                                notification.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full border border-gray-300 rounded-lg p-4 mb-4 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white space-y-4 sm:space-y-0 sm:space-x-4"
                                                    >
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 text-white rounded-full">
                                                                {item.sender ? item.sender.username.charAt(0).toUpperCase() : "N/A"}
                                                            </div>
                                                            <div className="text-center sm:text-left">
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.sender ? item.sender.username : "N/A"}
                                                                </h2>
                                                                <p className="text-sm text-gray-500">{item ? item.message : ""}</p>
                                                                <p className="text-sm text-gray-600">Phone: {item.sender ? item.sender.phone_no : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Email: {item.sender ? item.sender.email : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Guest Count: {item.sender ? item.basicInfo[0] : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Duration: {item.sender ? `${item.basicInfo[1]} hrs` : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Date: {item.sender ? item.basicInfo[2] : "N/A"}</p>
                                                                <p className="text-sm text-gray-600">Time: {item.sender ? item.basicInfo[3] : "N/A"}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center sm:justify-end space-x-2">
                                                            {item.isAccept === "Pending" ? (
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => vedorAcceptOrReject("Accepted", item._id, item.receiver, item.sender?._id, item?.serviceId, item?.basicInfo)}
                                                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        onClick={() => vedorAcceptOrReject("Rejected", item._id, item.receiver, item.sender?._id, item?.serviceId, item?.basicInfo)}
                                                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            ) : item.isAccept === "Accepted" ? (
                                                                item.isPaid ? (
                                                                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                                                        Accepted
                                                                    </button>
                                                                ) : (
                                                                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                                                                        Requested Payment
                                                                    </button>
                                                                )
                                                            ) : (
                                                                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                                                    Rejected
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center text-gray-500">Loading....</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        onClick={() => setNotify(false)}
                                        className="bg-gray-400 text-white py-1 px-4 rounded hover:bg-gray-500 transition"
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>

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
                                                    <fieldset className='border  border-solid border-zinc-300 rounded-lg p-4'>
                                                        <legend className="text-lg font-medium mb-2 text-zinc-800">Bank Details</legend>
                                                        <label className="block text-gray-700">Account Number</label>
                                                        <input
                                                            type="text"
                                                            name="accountNumber"
                                                            ref={accountNumber}
                                                            defaultValue={profile ? profile.accountNumber : "Not Available"}
                                                            placeholder='XXX XXXX XXX'
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                        <label className="block text-gray-700">IFSC Code</label>
                                                        <input
                                                            type="text"
                                                            name="ifsc"
                                                            ref={ifsc}
                                                            defaultValue={profile ? profile.ifsc : "Not Available"}
                                                            placeholder='XXX XXXX XXX'
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                        <label className="block text-gray-700">Account Holder Name</label>
                                                        <input
                                                            type="text"
                                                            name="accountName"
                                                            defaultValue={profile ? profile.accountName : "Not Available"}
                                                            ref={accountName}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                    </fieldset>
                                                </div>

                                                <div>
                                                    <fieldset className='border  border-solid border-zinc-300 rounded-lg p-4' >
                                                        <legend className="text-lg font-medium mb-2 text-zinc-800">Personal Details</legend>
                                                        <label className="block text-gray-700">User Name</label>
                                                        <input
                                                            type="text"
                                                            name="userName"
                                                            ref={profileName}
                                                            defaultValue={profile ? profile.userName : "Not Available"}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                        <label className="block text-gray-700">Phone</label>
                                                        <input
                                                            type="text"
                                                            name="Phone"
                                                            ref={profilePhone}
                                                            defaultValue={profile ? profile.phoneNumber : "Not Available"}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                            required
                                                        />
                                                        <button onClick={handlePhoneVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-pointer my-5">Verify Phone</button>
                                                        {phonePopupFlag && <div className="fllex">
                                                            <input onChange={(e) => {
                                                                setInputPhoneOtp(e.target.value);
                                                                // console.log(e.target.value)
                                                            }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Phone OTP" />
                                                            {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                                                        </div>}
                                                    </fieldset>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Save Profile
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

            {loading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <Loading /> {/* Your loading spinner component */}
                </div>
            )}

        </>
    );
};

export default UserDashboard;
