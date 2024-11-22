"use client";
import React, { useState, useEffect, useRef } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { ImStatsDots } from "react-icons/im";
import { RiMenuSearchLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { BsBank } from "react-icons/bs";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut, FiMessageCircle, FiUser } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import Axios from "@/utils/axios";
import { Button } from "@headlessui/react";
import Card from "./Card";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FiUpload } from "react-icons/fi";
import { MdNotificationAdd, MdNotificationsActive, MdOutlineNotifications, MdOutlineSupportAgent, MdOutlineVolunteerActivism } from "react-icons/md";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
// import { useAuth } from '@/utils/useAuth';

const page = () => {

    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [profileData, setProfileData] = useState(null);
    const [completeBooking, setCompleteBooking] = useState([])
    const [inCompleteBooking, setInCompleteBooking] = useState([])
    const [searchHistory, setSearchHistory] = useState([])
    const [ngoProfile, setNgoProfile] = useState([]);
    const [completeEvent, setCompleteEvent] = useState(null);
    const [inCompleteEvent, setInCompleteEvent] = useState(null);
    const [isTnCOpen, setIsTnCOpen] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [isNgoOpen, setIsNgoOpen] = useState(false)
    const [isAddOpen, setOpen] = useState(false);
    // const { loading, isAuthenticated } = useAuth(); // Get loading and auth status
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);


    const [iconNotification, setIconNotification] = useState(false);
    const [iconNgoNotification, setIconNgoNotification] = useState(false);


    const [notification, setNotification] = useState(null);
    const [notificationNgo, setNotificationNgo] = useState(null);
    const [cardData, setCardData] = useState(null);
    const [formFields, setFormFields] = useState(null);
    const [cardForm, setCardForm] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedServiceId, setId] = useState(null);
    const [currentBookingId, setCurrentBookingId] = useState(null);

    const [editProfile, setEditProfile] = useState(false);
    const profileName = useRef(null);
    const profilePhone = useRef(null)
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);

    const [admin, setAdmin] = useState(false);

    const [purpose, setPurpose] = useState('');
    const [contactSos, setContactSos] = useState('');
    const [Sos, setSos] = useState(false);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // // If not authenticated, the user will be redirected, so no need to render the dashboard
    // if (!isAuthenticated) {
    //     return null; // Prevents rendering
    // }



    const handleNotification = async () => {

        setIsTnCOpen(true)
        setIconNotification(false);
        try {
            const res = Axios.get('/user/notificationchange')
        }
        catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        const getNotificationData = async () => {

            try {
                const resp = await Axios.get("/user/getbookingnotification")
                console.log("This is notification data>>>>", resp.data.data);
                setNotification(resp.data.data);
                setNotificationNgo(resp.data.data2);
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
                console.log("this is notification", error.response.data)
                console.log("message for notification", error + " " + error.message);
            }
        }


        getNotificationData();
    }, [])
    console.log("Notifiaction data for payment",notification)

    //Logout function not work
    const handlelogout = async (e) => {
        e.preventDefault();

        try {
            Cookies.remove("type")
            Cookies.remove("accessToken")
            Cookies.remove("refreshToken")
            // Cookies.remove("access")
            const response = await Axios.get('/user/logout');
            //  console.log(response.data);
            // Cookies.set("accessToken", response, { expires: 3, path: "/" });
            // Clear all items from localStorage
            // localStorage.clear();
            toast.success("Logout Successfully")
            setTimeout(() => {

                window.location.href = '/signin';
            }, 1000)

        } catch (error) {
            console.log(error);
        }


    }

    //FETCHPROFILE FUNCTION


    useEffect(() => {
        const handleProfile = async () => {

            try {
                const response = await Axios.get('/user/fetchProfile');
                // console.log(response.data.data);
                setProfileData(response.data.data);
                setAdmin(response.data.data.isAdmin)
                if (response.data.data.notification) {
                    setIconNotification(response.data.data.notification);
                }

            } catch (error) {

                console.log(error);

            }


        }

        if (profileData == null) handleProfile();
    }, [])


    //FETCHBOOKING FUNCTION


    useEffect(() => {
        const handleBooking = async () => {

            try {
                const response = await Axios.get('/user/fetchbooking');
                console.log('Response Data:', response.data.inCompleteStatus);
                // console.log('Full Response:', response);
                setCompleteBooking(response.data.completeStatus)
                setInCompleteBooking(response.data.inCompleteStatus)


            } catch (error) {
                console.log(error);

            }


        }

        if (completeBooking == 0 && inCompleteBooking == 0) handleBooking();
    }, [])



    //FETCHSEARCH FUNCTION


    useEffect(() => {
        const handleSearch = async () => {

            try {
                const response = await Axios.get('/user/fetchsearch');
                // console.log('Response Data:', response.data.searches.search);

                setSearchHistory(response.data.searches.search);

            } catch (error) {
                console.log('Error fetching search data:', error);
            }


        };


        if (searchHistory.length === 0) {
            handleSearch();
        }
    }, [searchHistory]);



    useEffect(() => {
        const getBookingData = async () => {

            try {
                const resp1 = await Axios.get('/user/bookingdata');
                console.log("%cThis is booking data", "color:pink;font-size:20px", resp1.data);
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
    // console.log(inCompleteEvent);


    //FETCH NGO FUNCTION

    useEffect(() => {
        const handleNgo = async () => {

            // console.log(inCompleteEvent);
            try {
                const response = await Axios.get('/user/fetchngo');
                /*   console.log(response.data.ngos); */
                // console.log(inCompleteEvent);

                if (inCompleteEvent.length > 0) {
                    setNgoProfile(response.data.ngos);
                }
            } catch (error) {
                console.log(error);
            }


        }
        handleNgo();
    }, [inCompleteEvent]);

    // console.log(inCompleteEvent);
    const handleNotificationNgo = async (id) => {

        console.log(id);

        const response = await Axios.post('/user/updatenotification', {
            id
        })



    }


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


    function linearProgressBar(currentStatus) {
        if (currentStatus == "Pending") return 0;
        else if (currentStatus == "Confirmed") return 20;
        else if (currentStatus == "Deposit_Paid") return 40;
        else if (currentStatus == "Departed") return 60;
        else if (currentStatus == "Follow_Up") return 80;
        else if (currentStatus == "Completed") return 100;
        else return 0;
    }






    //File Upload


    async function handleUploadFile(avatar) {

        const formData = new FormData();
        formData.append("avatar", avatar);
        const resp = await Axios.post("/user/updateavatar", formData, {
            'Content-Type': 'multipart/form-data'
        })
        console.log(resp.data);


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


    const NotificationNgo = () => {
        setIsNgoOpen(true);
        setIconNgoNotification(false);
    }
    async function getCards(serviceName, id, bookingId) {
        //TODO:Booking ID>

        // console.log("This is the serviceName>>>", serviceName)
        // console.log("This is the serviceId>>>", id)
        setId(id);
        const resp = await Axios.post("/user/getCard", {
            serviceName: serviceName,
            serviceId: id
        })
        // console.log("These are the Cards>>>", resp.data.resp[0].requiredFormFields)
        const cardData = resp.data.resp[0];

        if (!cardData) {
            return (
                <div>No Card </div>
            )
        }
        const requiredFormFields = cardData?.requiredFormFields;
        // console.log("These are the required Form Fields>>>", requiredFormFields);
        setCardData(cardData);

        const initialData = requiredFormFields.reduce((acc, curr) => {
            acc[curr] = "";
            return acc;
        }, {})
        console.log("This is initial data>>>", initialData);
        setFormFields(requiredFormFields);
        setFormData(initialData)
        setCurrentBookingId(bookingId);


    }








    const handleInputChange = (e) => {


        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });


    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log("This is  the selected card>>>>", selectedCard);
        console.log("This is the form Data>>>", formData);
        // console.log("This is the service Id>>>",selectedServiceId);
        console.log("This is the BookingId>>>", currentBookingId);
        const generatedLink = `https://evego.in/invitation/?bookingid=${currentBookingId}`
        const resp = await Axios.post("/user/addinvitationcard", {
            selectedCard: selectedCard,
            formData: formData,
            bookingId: currentBookingId,
            generatedLink
        })

        if (resp.status == 200) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }

        toast.success("Card details full successfully")
        console.log(resp.status);


    }

    const handleProfileSubmit = async (e) => {
        const userType = Cookies.get('type');
        if (userType == 'user') {
            e.preventDefault();

            // console.log(profileName.current.value)
            // console.log(profilePhone.current.value)


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


            const resp = await Axios.post("/user/updateprofile", {
                "fullname": profileName.current.value,
                "phone_no": profilePhone.current.value
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
    }


    const CircularProgressBar = ({ percentage, text, colour }) => {
        const radius = 80;
        const strokeWidth = 10;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative flex items-center justify-center w-[12rem] h-[12rem]">
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
                <span className="flex text-xl items-center justify-end pl-7 font-bold text-gray-700">
                    {text}
                </span>
            </div>
        );
    };





    // For toggling the form
    const [feedbackMessage, setFeedbackMessage] = useState(""); // To store the message input
    const [rating, setRating] = useState(null); // To store the selected rating

    // Handle feedback form submit
    const handleFeedbackSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if (!rating) {
            alert("Please provide a rating before submitting!");
            return;
        }

        // Creating the feedback data object

        console.log(feedbackMessage);
        console.log(rating);

        // Example of using feedback data
        const res = await Axios.post('/user/feedbackform', {
            message: feedbackMessage,
            feedback: rating

        })
        if (res.status == 200) {
            toast.success("FeedBack Successfully")
        }

        // You can make an API call here to submit the feedback
        // Example: axios.post('/api/feedback', feedbackData);

        // Reset the form after submission
        setFeedbackMessage("");
        setRating(null);

        // Close the form
        setShowFeedback(false);
    };

    // if(Cookies.get('type') !== 'user')
    //     return (<div className="text-3xl p-20">login please</div>)
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


    /* Sos */
    const [bookingId, setBookingId] = useState()
    const [vendorId, setVendorId] = useState()
    const handleSos = (booking, vendorId) => {
        setSos(true);
        setBookingId(booking);
        setVendorId(vendorId);
    }

    const handleSosSubmit = async (e) => {

        const isValidContact = /^\d{10}$/.test(contactSos);  // Regular expression to match exactly 10 digits

        if (!isValidContact) {
            toast.error('Contact number must be exactly 10 digits');
            return;
        }
        // Prepare the data to send to the API
        const sosData = {
            purpose,
            contactInfo: contactSos,
            vendorId,
            booking: bookingId
        };

        try {
            // Make API call to save the data

            const response = await Axios.post('/user/sos', sosData);
            console.log('Response:', response.data);

            // Optionally, handle successful submission (e.g., show a success message or close the modal)
            setSos(false);
            toast.success("Sos Send Successfully") // Close the form
        } catch (error) {
            console.error('Error saving SOS form data:', error);
            // Optionally, show an error message
        }
    };

    const handlePayment = async (price, bookingid) => {
        // console.log("handle payment func")
        setLoading(true)
        try {
          const bookingData = {
            totalAmount: price,
            callbackUrl: "https://www.evego.in/contactus", // Success URL,
            bookingId: bookingid,
            // name: notification.buyerName,
            // email: notification.buyerEmail,
            // phone: notification.buyerNumber,
            // buyerId: notification.buyerId,
          }
    
          console.log("befor calling api")
        //   const hey = await Axios.get("/user/fetchprofile")
        //   console.log("this is the fetch profile",hey)
          const response = await Axios.post("/user/initiate",
            bookingData
          )
    
          // console.log(response.data)
          // console.log(response.status)
          if (response.status == 200) {
            // Redirect to PhonePe payment page
            window.location.href = response.data
          } else {
            console.error("Payment initiation failed")
          }
        } catch (error) {
          console.error("Error initiating payment:", error)
        } finally {
          setLoading(false)
        }
      }


    return (
        <div className="pt-16 w-full h-fit flex flex-row bg-[#ffe7da]">
            {/* Toggle button for sidebar */}
            <button
                className="md:hidden text-[#ff8e4f] fixed top-[73px] z-50"
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
                className={`fixed md:relative top-0 mt-8 left-0 h-full overflow-y-visible z-40 md:z-auto md:transform-none bg-[#ffe7da]
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 transition-transform duration-300 ease-in-out
    w-full sm:w-[60vw] md:w-[30vw] h-full overflow-y-scroll no-scrollbar`}
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
                <div className="p-4 bg-[#fdb389] sm:block">
                    {profileData ? (<div className="shadow shadow-black rounded-lg bg-white p-4 mt-14">
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
                                FullName
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                                {profileData.fullname}
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                                Email
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                                {profileData.email}
                            </p>
                        </div>
                        {/*  <div className="flex gap-4">
              <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                Age
              </p>
              <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                {profileData.age}
              </p>
            </div> */}
                        <div className="flex gap-4">
                            <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                                PhoneNo
                            </p>
                            <p className="lg:text-[1rem] xsm:text-sm font-semibold">

                                {profileData.phone_no}
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
                        {/* <div className="flex gap-4">
              <p className="lg:text-[1.2rem] xsm:text-base font-bold">
                Birthday
              </p>
              <p className="lg:text-[1rem] xsm:text-sm font-semibold">
                +91 Mkrp Raj 234567890
              </p>
            </div> */}
                    </div>) : (<h1>Loding....</h1>)}
                </div>

                {/*
        <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <LuLayoutDashboard className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">Dashboard</h1>
        </div>
 */}
                {/*  <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <ImStatsDots className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">Quick Stats</h1>
        </div> */}

                {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <RiMenuSearchLine className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">Browse Events</h1>
        </div> */}

                {/*  <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <SlCalender className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">My Events</h1>
        </div> */}

                {/*  <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <BsBank className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">My Payments</h1>
        </div> */}

                {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
          <IoIosHelpCircle className="text-white w-8 h-8" />
          <h1 className="text-xl font-medium">Help</h1>
        </div> */}

                {admin && <Link href='/admindash' className="bg-[#ff8e4f] border-b-[#c4afaf]  border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">

                    <h1 className="text-xl font-medium">AdminDash</h1>
                </Link>}



                <div onClick={handlelogout} className="bg-[#ff8e4f] border-b-[#c4afaf]  border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                    <FiLogOut className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Logout</h1>
                </div>
                {/* <div className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4"> */}
                {/* <IoSettings className="text-white w-8 h-8" /> */}
                {/* <h1 className="text-xl font-medium">Notification</h1> */}
                {/* </div> */}

                <div onClick={() => handleNotification()} className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                    <div className="flex flex-row justify-center self-start items-center gap-4" onClick={() => handleNotification()}>
                        {
                            iconNotification ? (
                                <MdNotificationsActive className="text-red-600 w-[2rem] h-[2rem] cursor-pointer" />
                            ) : (
                                <MdOutlineNotifications className=" w-[2rem] h-[2rem] cursor-pointer" />
                            )
                        }
                    </div>
                    <h1 className="text-xl font-medium">Notification</h1>
                </div>

                <div onClick={() => NotificationNgo()} className="bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 cursor-pointer">
                    <div className="flex flex-row justify-center self-start items-center gap-4" >
                        {
                            iconNgoNotification ? (
                                <MdOutlineVolunteerActivism className="text-red-600 w-[2rem] h-[2rem] cursor-pointer" />
                            ) : (
                                <MdOutlineSupportAgent className=" w-[2rem] h-[2rem] cursor-pointer" />
                            )
                        }
                    </div>
                    <h1 className="text-xl font-medium">NotificationNgo</h1>
                </div>

                <div onClick={() => setEditProfile(true)} className="cursor-pointer bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4">
                    <FiUser className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Edit Profile</h1>
                </div>

                <div onClick={() => setShowFeedback(true)} className="cursor-pointer bg-[#ff8e4f] border-b-[#c4afaf] border-b-2 p-4 text-white flex items-center gap-4 mb-8">
                    <FiMessageCircle className="text-white w-8 h-8" />
                    <h1 className="text-xl font-medium">Feedback</h1>
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
                                        {notification && notification.length > 0 ? (
                                            notification.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full border border-gray-300 rounded-lg p-6 shadow-lg bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0 transition-all duration-300 hover:shadow-xl"
                                                >
                                                    <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
                                                        <div className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white text-2xl font-bold rounded-full">
                                                            {item.receiver ? item.receiver.firstName.charAt(0).toUpperCase() : "N/A"}
                                                        </div>
                                                        <div className="text-center sm:text-left">
                                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                                {item.receiver ? item.receiver.firstName : "N/A"}
                                                            </h2>
                                                            <p className="text-lg text-gray-700">Phone: {item.receiver ? item.receiver.phoneNumber : "N/A"}</p>
                                                            <p className="text-lg text-indigo-600 font-medium -mt-3">Email: {item.receiver ? item.receiver.email : "N/A"}</p>
                                                            <p className="text-lg text-indigo-500 font-bold -mt-3">Date: {item.basicInfo ? item.basicInfo[2] : "N/A"}</p>
                                                            <p className="text-lg text-indigo-500 font-bold -mt-3">Time: {item.basicInfo ? item.basicInfo[3] : "N/A"}</p>
                                                            <p className="text-lg text-gray-700 -mt-3">Location: {item.serviceId ? item.serviceId.location : "N/A"}</p>
                                                            <p className="text-lg text-gray-700 -mt-3">Category: {item.serviceId ? item.serviceId.serviceCategory : "N/A"}</p>
                                                            <p className="text-lg text-green-600 font-bold -mt-3">Price: {item.serviceId ? `₹${item.serviceId.price}` : "N/A"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-center sm:text-right">
                                                        {item.isAccept === "Accepted" ? (
                                                            <div className="flex justify-center sm:justify-end items-center flex-col space-y-2">
                                                                <p className="text-green-500 font-bold text-lg">Accepted</p>
                                                                <button onClick={() => handlePayment(item.serviceId.price, item.bookingId)} className="border border-solid p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 text-sm font-semibold shadow-md">
                                                                    Pay Now
                                                                </button>
                                                            </div>
                                                        ) : item.isAccept === "Rejected" ? (
                                                            <p className="text-red-500 font-bold text-lg">Rejected</p>
                                                        ) : (
                                                            <p className="text-yellow-500 font-bold text-lg">Pending</p>
                                                        )}
                                                    </div>
                                                </div>


                                            ))
                                        ) : (
                                            <div className="text-center text-gray-500">No Notifications</div>
                                        )}
                                    </div>


                                </div>


                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setIsTnCOpen(false)} className="bg-red-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>





            {/*       isNgoOpen */}
            <div className=''>
                {isNgoOpen && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-2 rounded-lg w-[100%] sm:w-[50rem] flex flex-col">
                            <div className="max-h-96 overflow-y-auto scrollbar-hide">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-4">
                                    <div className="prose">
                                        {notificationNgo && notificationNgo.length > 0 ? (
                                            notificationNgo
                                                .filter(item => (item.isAccept || item.isReject)) // Filter out items with Accept/Reject status
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full border border-gray-300 rounded-lg p-4 m-6 shadow-lg bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
                                                    >
                                                        <div className="flex items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                                                            <div className="flex items-center justify-center w-12 aspect-square h-12 bg-indigo-500 text-white rounded-full">
                                                                {item.reciever ? item.reciever.username.charAt(0).toUpperCase() : "N/A"}
                                                            </div>
                                                            <div className="text-center sm:text-left">
                                                                {/* Responsive text for small screens */}
                                                                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                                                                    {item.reciever ? item.reciever.username : "N/A"}
                                                                </h2>
                                                                <p>
                                                                    {item.isAccept ? (
                                                                        <span className="text-sm sm:text-green-400 text-green-500">Accepted</span>
                                                                    ) : (
                                                                        <span className="text-sm sm:text-red-500 text-red-600">Rejected</span>
                                                                    )}
                                                                </p>
                                                                <p className="text-xs sm:text-sm text-gray-600">Phone: {item.reciever ? item.reciever.phoneNumber : "N/A"}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">Email: {item.reciever ? item.reciever.email : "N/A"}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">LocationNgo: {item.reciever ? item.reciever.address : "N/A"}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">Location: {item ? item.location : "N/A"}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">QtyFood: {item ? item.qtyOfFood : "N/A"}</p>
                                                                <p className="text-xs sm:text-sm text-gray-600">Pin: {item ? item.pin : "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="text-center text-gray-500">No Notifications</div>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setIsNgoOpen(false)}
                                    className="bg-red-400 text-white py-1 px-4 rounded"
                                >
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
                    <h1 className="font-bold text-center lg:text-[3rem] xsm:text-[3rem]">
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

                        {/*  <IoSettings className="text-gray-700 w-[2rem] h-[2rem] cursor-pointer" />
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

                {/*  <div className="p-4">
          <div className="shadow-md shadow-green-500 rounded-2xl bg-white p-4">
            <div className="flex md:flex-row justify-between gap-4 items-center">
              <h1 className="text-3xl font-bold">Hello, Ramesh</h1>
              <CiMenuKebab className="w-7 h-7 text-black cursor-pointer" />
            </div>
            <h1 className="pt-2">
              Manage all your upcoming events, bookings, and services from one
              convenient dashboard. Explore, book, and customize your perfect
              event with ease.
            </h1>
          </div>
        </div> */}

                {/*  <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
          Quick Stats
        </h1>

        <div className="flex items-center justify-around h-fit flex-wrap">
          <div>
            <CircularProgressBar
              percentage={75}
              text="Current Event Completed"
              colour="text-green-600"
            />
          </div>
          <div>
            <CircularProgressBar
              percentage={0}
              text="Upcoming Events Plan"
              colour="text-gray-400"
            />
          </div>
          <div>
            <CircularProgressBar
              percentage={50}
              text="Payment of Current Event"
              colour="text-blue-400"
            />
          </div>
        </div> */}

                {/*   <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
          Browse Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
            <img
              src="/userdash/logo.png"
              alt="Popular Vendors"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">Popular Vendors</h2>
              <p className="text-gray-600">340+ vendors</p>
              <button className="mt-4 self-center text-red-500 text-xs outline outline-[1px] px-2 py-1 rounded-lg">
                Explore
              </button>
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
            <img
              src="/userdash/logo.png"
              alt="Popular Events"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">Popular Events</h2>
              <p className="text-gray-600">940+ successful Events</p>
              <button className="mt-4 self-center text-red-500 text-xs outline outline-[1px] px-2 py-1 rounded-lg">
                Explore
              </button>
            </div>
          </div>
        </div> */}

                {/* My Events Section */}
                <div className="mb-8 flex flex-col mt-4">
                    <div className="flex md:flex-row xsm:flex-col justify-between w-full bg-white items-center shadow shadow-amber-900  overflow-auto px-4 p-2">
                        <div className="self-start min-w-[10rem]">
                            <h1 className="font-bold lg:text-[2rem] xsm:text-[2rem]">My Events</h1>
                            <h1 className="text-black">See and manage all events here</h1>
                        </div>
                        {/* <select id="sortBy" className="border-none focus:border-none focus-within:border-none p-2 mt-4 self-start bg-veryLightPink rounded-2xl border-gray-300">
              <option value="date">Showing upcoming</option>
              <option value="status">Status</option>
            </select> */}
                    </div>
                    <div className="overflow-y-auto scrollbar-hide mt-4" style={{ maxHeight: '300px' }}>
                        <table className="w-full bg-white shadow rounded-lg">
                            <thead>
                                <tr className="text-left text-xl">
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Time</th>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Progress</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Card</th>
                                    <th className="p-4">CardUrl</th>
                                    <th className="p-4">Sos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inCompleteEvent && inCompleteEvent.map((ev, idx) => (


                                    ev.isPaid && (
                                        <tr key={idx}>

                                            <td className="p-4">{`${ev.bookingDate.slice(0, 10)}`}</td>
                                            <td className="p-4">{`${ev.bookingTime}`}</td>
                                            <td className="p-4">{`${ev.serviceId ? ev.serviceId.serviceName : "N/A"}`}</td>
                                            <td className="p-4">
                                                <div className="w-full bg-gray-200 rounded-full">
                                                    <div className="bg-pink-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${linearProgressBar(ev.serviceId ? ev.status : "N/A")}%` }}>


                                                        {linearProgressBar(ev.serviceId ? ev.status : "N/A")}


                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4"><span className="mt-4 self-center text-red-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">{ev.status}</span></td>
                                            <td className="p-4"><span onClick={() => {
                                                setOpen(true)
                                                getCards(ev.serviceId?.serviceCategory, ev.serviceId?._id, ev?._id)
                                            }} className="cursor-pointer mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">{ev.serviceId ? "Card" : "Id:NuLL"}</span></td>


                                            <a target="_blank" href={ev.cards?.generatedLink}> <td className="p-4"><span


                                                className={` mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg
                                                   ${ev.cards?.generatedLink ? `cursor-pointer` : `cursor-not-allowed`}
                                                `}>{ev.serviceId ? "CardUrl" : "Id:NuLL"}</span></td>
                                            </a>



                                            <td className="p-4"><span onClick={() => {
                                                handleSos(ev.serviceId.serviceName, ev.vendorId)
                                            }} className=" cursor-pointer mt-4 self-center text-red-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Sos</span></td>
                                        </tr>
                                    )

                                ))}
                                {/*  {completeEvent && completeEvent.map((ev, idx) => (
                  <tr key={idx}>

                    <td className="p-4">{`${ev.bookingDate.slice(0, 10)}`}</td>
                    <td className="p-4">{`${ev.bookingTime}`}</td>
                    <td className="p-4">Meena Party</td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '100%' }}> 100%
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Completed</span></td>
                    <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Invitation</span></td>
                  </tr>
                ))} */}
                            </tbody>
                        </table>
                    </div>
                    {/* <button className="mt-4 self-center text-green-700 outline outline-[1px] py-2 px-4 rounded-lg">No More Details</button> */}
                </div>

                <h1>NGO LIST</h1>
                <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: '400px' }}>
                    {!ngoProfile ? (
                        <h1>Loading...</h1>
                    ) : ngoProfile.length > 0 ? (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 overflow-x-auto">
                            {ngoProfile.map((profile, index) => {
                                return <Card key={index} profile={profile} />;
                            })}
                        </div>
                    ) : (
                        <h1>No Ngo</h1>
                    )}
                </div>













                {/* Transaction History Section */}
                <div class="flex flex-col w-full">
                    <div className="flex md:flex-row xsm:flex-col justify-between w-full bg-white items-center shadow shadow-amber-900  overflow-auto px-4 p-2 mt-8">
                        <div className="self-start min-w-[10rem]">
                            <h1 className="font-bold lg:text-[2rem] xsm:text-[2rem]">Booking History</h1>
                            <h1 className="text-black">See all your history here</h1>
                        </div>
                        {/* <select id="sortBy" className="border-none focus:border-none focus-within:border-none p-2 mt-4 self-start bg-veryLightPink rounded-2xl border-gray-300">
              <option value="date">Showing upcoming</option>
              <option value="status">Status</option>
            </select> */}
                    </div>
                    {/*  <div className="flex justify-between items-center min-w-[10rem] bg-white overflow--auto p-4 shadow shadow-amber-900">
            <h1>
              Total Found:{" "}
              <span className="font-bold md:p-0 xsm:p-2">2 Claims</span>
            </h1>
            <div className="flex items-center sm:flex-row xsm:flex-col gap-4">
              <label htmlFor="sortBy" className="mr-2 md:p-0 xsm;p-4">
                Sort by
              </label>
              <select
                id="sortBy"
                className="border p-2 border-none focus:border-none focus-visible:border-none bg-veryLightPink rounded-2xl border-gray-300"
              >
                <option value="date">Date</option>
                <option value="status">Status</option>
              </select>
              <select
                id="sortBy"
                className="border p-2 border-none focus:border-none focus-visible:border-none bg-veryLightPink rounded-2xl border-gray-300"
              >
                <option value="date">Status</option>
                <option value="status">Date</option>
              </select>
            </div>
          </div> */}
                    <div className="overflow-y-auto mt-4 scrollbar-hide " style={{ maxHeight: '300px' }}>
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
                            <tbody >
                                {completeEvent && completeEvent.map((ev, idx) => (
                                    <tr key={idx}>

                                        <td className="p-4">{`${ev.bookingDate.slice(0, 10)}`}</td>
                                        <td className="p-4">{`${ev.bookingTime}`}</td>
                                        <td className="p-4">{`${ev.serviceId ? ev.serviceId.serviceName : "N/A"}`}</td>
                                        <td className="p-4">
                                            <div className="w-full bg-gray-200 rounded-full">
                                                <div className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${linearProgressBar(ev.serviceId ? ev.status : "N/A")}%` }}>


                                                    {linearProgressBar(ev.serviceId ? ev.status : "N/A")}


                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">{ev.status}</span></td>

                                    </tr>
                                ))}
                                {/*  {completeEvent && completeEvent.map((ev, idx) => (
                  <tr key={idx}>

                    <td className="p-4">{`${ev.bookingDate.slice(0, 10)}`}</td>
                    <td className="p-4">{`${ev.bookingTime}`}</td>
                    <td className="p-4">Meena Party</td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '100%' }}> 100%
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Completed</span></td>
                    <td className="p-4"><span className="mt-4 self-center text-green-700 text-xs outline outline-[1px] py-2 px-4 rounded-lg">Invitation</span></td>
                  </tr>
                ))} */}
                            </tbody>
                        </table>
                    </div>




                    {/*  <button className="mt-4 self-center text-green-700 outline outline-[1px] py-2 px-4 rounded-lg">
            No More Details
          </button> */}
                </div>
                {/*    <div class="flex flex-col w-full">
                    <h1 className="font-bold lg:text-[4rem] xsm:text-[3rem]">
                        Search History
                    </h1> */}
                {/*  <div className="flex justify-between items-center min-w-[10rem] bg-white overflow--auto p-4 shadow shadow-amber-900">
            <h1>
              Total Found:{" "}
              <span className="font-bold md:p-0 xsm:p-2">2 Claims</span>
            </h1>
            <div className="flex items-center sm:flex-row xsm:flex-col gap-4">
              <label htmlFor="sortBy" className="mr-2 md:p-0 xsm;p-4">
                Sort by
              </label>
              <select
                id="sortBy"
                className="border p-2 border-none focus:border-none focus-visible:border-none bg-veryLightPink rounded-2xl border-gray-300"
              >
                <option value="date">Date</option>
                <option value="status">Status</option>
              </select>
              <select
                id="sortBy"
                className="border p-2 border-none focus:border-none focus-visible:border-none bg-veryLightPink rounded-2xl border-gray-300"
              >
                <option value="date">Status</option>
                <option value="status">Date</option>
              </select>
            </div>
          </div>  */}

                {/*  {!searchHistory ? (
                        <h1>Loading....</h1>
                    ) : searchHistory.length > 0 ? (
                        <div className="overflow-y-auto scrollbar-hide mt-3" style={{ maxHeight: '300px' }}>
                            <table className="w-full bg-white shadow rounded-lg">
                                <thead>
                                    <tr className="text-left text-xl">

                                        <th className="p-4">Location</th>
                                        <th className="p-4">PriceRange</th>
                                        <th className="p-4">ServiceType</th>

                                    </tr>
                                </thead>
                                <tbody className="min-w-[20rem]">
                                    {searchHistory.map((search, index) => (
                                        <tr key={index}>
                                            <td className="md:p-4 xsm:p-6">{search.location}</td>
                                            <td className="md:p-4 xsm:p-6">{search.priceRange}</td>
                                            <td className="md:p-4 xsm:p-6">{search.serviceType}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h1>No search </h1>
                    )}
 */}
                {/*  <button className="mt-4 self-center text-green-700 outline outline-[1px] py-2 px-4 rounded-lg">
            No More Details
          </button> */}
                {/* </div> */}
            </div>



            <div>
                {isAddOpen && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose  flex gap-2">
                                        {cardData ? cardData.image.map((item, index) => (
                                            <div style={{
                                                backgroundImage: `url(${item})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }} onClick={() => {
                                                setCardForm(true)
                                                setOpen(false)
                                                setSelectedCard(item)
                                            }} key={index} className={`w-20 h-20 cursor-pointer text-white`}></div>
                                        )) : "Loading...."}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setOpen(false)} className="bg-red-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>








            <div>
                {cardForm && (
                    <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto">
                                <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                    <div className="prose">
                                        <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                                            {formFields ? formFields.map((item, index) => (
                                                <div key={index} className="mb-4">
                                                    <label
                                                        className="block text-gray-700 font-bold mb-2 capitalize"
                                                        htmlFor={item}
                                                    >
                                                        {item.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                                    </label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder={`Enter ${item.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                                        type="text"
                                                        name={item}
                                                        value={formData[item] || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            )) : (
                                                <div className="text-center text-gray-500">Loading...</div>
                                            )}
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Submit
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setCardForm(false)} className="bg-red-400 text-white py-1 px-4 rounded">Close</button>
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

                                            </div>

                                            <div>
                                                <fieldset className='border  border-solid border-zinc-300 rounded-lg p-4' >
                                                    <legend className="text-lg font-medium mb-2 text-zinc-800">Personal Details</legend>
                                                    <label className="block text-gray-700">Full Name</label>
                                                    <input
                                                        type="text"
                                                        name="userName"
                                                        ref={profileName}
                                                        defaultValue={profileData ? profileData.fullname : "Not Available"}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                    <label className="block text-gray-700">Phone</label>
                                                    <input
                                                        type="text"
                                                        name="Phone"
                                                        ref={profilePhone}
                                                        defaultValue={profileData ? profileData.phone_no : "Not Available"}
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
                                <button onClick={() => setEditProfile(false)} className="bg-red-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>






            {showFeedback && (
                <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                        <div className="max-h-96 overflow-y-auto">
                            <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                <div className="prose">
                                    <form
                                        onSubmit={handleFeedbackSubmit}
                                        className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold mb-4 text-center">Feedback Form</h2>

                                        {/* Feedback Message */}
                                        <div>
                                            <label className="block text-gray-700">Message</label>
                                            <textarea
                                                name="feedbackMessage"
                                                rows="4"
                                                placeholder="Enter your feedback here..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                value={feedbackMessage}  // Bind the state variable `message` to the textarea
                                                onChange={(e) => setFeedbackMessage(e.target.value)}  // Update the state on input
                                                required
                                            ></textarea>
                                        </div>
                                        {/* Rating System */}
                                        <div>
                                            <fieldset className="border border-solid border-zinc-300 rounded-lg p-4">
                                                <legend className="text-lg font-medium mb-2 text-zinc-800">Rating (Out of 5)</legend>
                                                <div className="flex justify-center space-x-2 text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <div key={num}>
                                                            <input
                                                                type="radio"
                                                                id={`star${num}`}
                                                                name="rating"
                                                                value={num}
                                                                className="hidden"
                                                                onChange={(e) => setRating(Number(e.target.value))}  // Update rating state on change
                                                                checked={rating === num} // Ensure that the selected rating is checked
                                                            />
                                                            <label
                                                                htmlFor={`star${num}`}
                                                                className={`cursor-pointer text-3xl ${num <= rating ? "text-yellow-500" : "text-gray-300"
                                                                    }`} // Darken stars up to the selected rating
                                                            >
                                                                ★
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>



                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        >
                                            Submit Feedback
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setShowFeedback(false)} className="bg-red-400 text-white py-1 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {Sos && (
                <div className="fixed w-screen inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-[100%] sm:w-[39rem] flex flex-col">
                        <div className="max-h-96 overflow-y-auto">
                            <div className="w-full mx-auto bg-white shadow-md rounded-lg p-8">
                                <div className="prose">
                                    <form
                                        onSubmit={handleSosSubmit}
                                        className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold mb-4 text-center">Sos Form</h2>

                                        {/* Feedback Message */}
                                        <div>
                                            <label className="block text-gray-700">Purpose</label>
                                            <textarea
                                                name="purpose"
                                                rows="4"
                                                placeholder="Enter your feedback here..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                value={purpose}  // Bind the state variable `message` to the textarea
                                                onChange={(e) => setPurpose(e.target.value)}  // Update the state on input
                                                required
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700">Contact Info</label>
                                            <input
                                                name="contactSos"

                                                placeholder="Enter your feedback here..."
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                                value={contactSos}  // Bind the state variable `message` to the textarea
                                                onChange={(e) => setContactSos(e.target.value)}  // Update the state on input
                                                required
                                                type="number"
                                            ></input>
                                        </div>





                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        >
                                            Submit Feedback
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setSos(false)} className="bg-red-400 text-white py-1 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}





        </div >
    );
};

export default page;
