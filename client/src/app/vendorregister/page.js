"use client";
import Axios from '@/utils/axios.js';
import { error } from 'jquery';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Link from 'next/link';
import Loading from '../loading.js'




const serviceArray = ["DJ", "Event Manager", "Car Rentals", "Banquet Hall", "Marriage Hall", "Restraunt", "Anchor", "Singer", "Dancer", "Decorator", "Game", "Photo Grapher", "Video Grapher", "Pandit", "Fashion Design", "Crockery", "Body Guard", "Jewellery", "Clothes Wedding", "Marriage", "Birthday", "Baby Shower", "Fresher Party", "Fair Well", "Annual Function", "Award Ceremony",  "Anniversary", "Pooja"]

const VendorLogin = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        phoneNumber: '',
        email: '',
        password: '',
        businessAddress: '',
        gst: '',
        city: '',
        state: '',
        businessStructure: '',
        businessDescription: 'Select',
    });
    const [uploadedFile1, setUploadedFile1] = useState(null);
    const [uploadedFile2, setUploadedFile2] = useState(null);
    const [uploadedFile3, setUploadedFile3] = useState(null);
    const [errors, setErrors] = useState({});
    const [isMailVerified, setMailVerified] = useState(false)
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [mailPopupFlag, setMailPopupFlag] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [otpMailContainer, setOtpMailContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);
    const [inputMailOtp, setInputMailOtp] = useState(null);
    const [isTnCOpen, setIsTnCOpen] = useState(false) // For T&C modal
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [businessPin, setBusinessPin] = useState("")
    const [businessLandmark, setBusinessLandmark] = useState("")



    const fetchGSTINData = async (gst) => {       // GST verification API
        try {
            const response = await Axios.get(`https://api.gstn.org/gst/${gst}`,
                //   {
                //   // method: 'GET',
                //   // headers: {
                //   //   'Content-Type': 'application/json',
                //   //   // Include any required headers, like API keys if necessary
                //   // },
                // }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch gst data');
            }
            const data = await response.json();
            toast.info(`${data}`)
            return data; // Adjust based on the API response structure
        } catch (error) {
            console.error('Error fetching gst data:', error);
            return null;
        }
    };


    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change

        // if (name === 'gst' && value.length === 15) { // Storing gst data in formdata Assuming gst is 15 characters long
        //   const gstinData = await fetchGSTINData(value);
        //   if (gstinData) {
        //     setFormData(prev => ({
        //       ...prev,
        //       businessName: gstinData.business_name, // Adjust based on the API response
        //       // You can also populate other fields based on the response if needed
        //     }));
        //   }
        // }


    };



    // Optional: Add file size/type validation
    const validateFile = (file) => {
        const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg",];
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (!allowedTypes.includes(file.type)) {
            return "Invalid file type. Only PDF, PNG, JPG and JPEG are allowed.";
        }
        if (file.size > maxSize) {
            return "File size exceeds 2MB.";
        }
        return null;
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if required fields are empty
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.businessName) newErrors.businessName = "Business Name is required";

        // Phone number validation (ensure it's not empty and valid)
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be 10 digits";
        }

        // Email validation (ensure it's not empty and valid)
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.gst) {
            newErrors.gst = "GST Number is required";
        } else if (!/^[0-9A-Z]{15}$/.test(formData.gst)) {
            newErrors.gst = "Invalid GST Number format";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
            newErrors.password = "Password must include at least one uppercase letter, one number, and one special character";
        }
        console.log("This is the form Business Description>>>>", formData.businessDescription);
        if (!formData.businessAddress) newErrors.businessAddress = "Business Address is required";
        if (!businessPin) newErrors.businessAddressPin = "Business Address Pin is required";
        if (!/^\d{6}$/.test(businessPin)) {
            newErrors.businessAddressPin = "Business Address Pin must be 6 digits";
        }
        if (!businessLandmark) newErrors.businessAddressLandmark = "Business Address Landmark is required";
        if (!formData.businessStructure) newErrors.businessStructure = "Business Structure is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.businessDescription) newErrors.businessDescription = "Business Description is required";

        // File validation (optional improvement)
        if (uploadedFile1) {
            const fileError = validateFile(uploadedFile1);
            if (fileError) newErrors.uploadedFile1 = fileError;
        }
        else if (!uploadedFile1) {
            newErrors.uploadedFile1 = "Aadhar is required";
        }

        if (uploadedFile2) {
            const fileError = validateFile(uploadedFile2);
            if (fileError) newErrors.uploadedFile2 = fileError;
        }
        else if (!uploadedFile2) {
            newErrors.uploadedFile2 = "Pan Card is required";
        }

        if (uploadedFile3) {
            const fileError = validateFile(uploadedFile3);
            if (fileError) newErrors.uploadedFile3 = fileError;
        }
        else if (!uploadedFile3) {
            newErrors.uploadedFile3 = "License is required";
        }

        console.log("new Errors are", newErrors)
        setErrors(newErrors);

        // if (newErrors) {
        //   alert("Some fields may be Empty or may be in Wrong format input")
        // }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (validateForm()) {
            try {

                const fullAddress = `${formData.businessAddress}, ${businessLandmark}, ${businessPin}`.replace(/,\s*,/g, ', ').trim(); // Clean up extra commas
                // console.log("Full Address:", fullAddress);
                formData.businessName = fullAddress

                const formDataToSubmit = new FormData(); // Create a new FormData object
                // console.log(formData)
                // Append text fields
                Object.entries(formData).forEach(([key, value]) => {
                    formDataToSubmit.append(key, value);
                });

                console.log("form befor adding files", formDataToSubmit)
                // Append file uploads
                if (uploadedFile1) formDataToSubmit.append('aadhar', uploadedFile1);
                if (uploadedFile2) formDataToSubmit.append('panCard', uploadedFile2);
                if (uploadedFile3) formDataToSubmit.append('license', uploadedFile3);
                console.log("form data is:", formDataToSubmit)
                
                const currentDate= Date.now();
                if(otpMailContainer.data.otpExpires<currentDate ){
                    alert("OTP duration Expired Please try again!!");
                    return;
                }
                if(otpMailContainer.data.otp!=inputMailOtp){
                    alert("Registration Failed Wrong Email OTP Entered!!");
                    return;
                }
                // const currentDate= Date.now();
                if(otpPhoneDataContainer.data.otpExpires<currentDate ){
                    alert("OTP duration Expired Please try again!!");
                    return;
                }
                if(otpPhoneDataContainer.data.otp!=inputPhoneOtp){
                    alert("Registration Failed Wrong Phone OTP Entered!!");
                    return;
                }

                // Make the API request using Axios
                setLoading(true)
                const response = await Axios.post('/vendor/register', formDataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file upload
                    },
                });

                // // Handle success response
                // console.log("Server Response:", response.data);
                toast.success("Vendor registered successfully!");

                router.push("/signinvendor")
                // Clear form after successful submission (if necessary)
                setFormData({
                    firstName: '',
                    lastName: '',
                    businessName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    businessAddress: '',
                    gst: '',
                    city: '',
                    state: '',
                    businessStructure: '',
                    businessDescription: '',
                });
                setUploadedFile1(null);
                setUploadedFile2(null);
                setUploadedFile3(null);
            } catch (error) {
                // Handle error response from the server
                console.error("Error submitting form:", error);
                toast.error("There was an error submitting the form. Please try again.");
            }
            finally {
                setLoading(false);
            }
        } else {
            // Form validation failed
            toast.error("Some fields may be empty or contain invalid input. Please check the fields and try again.");
        }
    };


    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };
    const handleEmailVerification = async (e) => {
        setMailPopupFlag(true);
        try {
            if (!(formData.email.length > 0)) {
                alert("Phone Number Fields should not be empty!!");
                return;
            }
            if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
                alert("Enter a valid Email")
                return;
            }

            const resp = await Axios.post('/user/sendotpemail', {
                email: formData.email
            })
            console.log(resp.data);
            setOtpMailContainer(resp.data);
        } catch (error) {
            console.log(error)
        }
    }
    const handlePhoneVerification = async (e) => {
        e.preventDefault();
        setPhonePopupFlag(true);
        console.log("Got Hit!!")
        try {
            if (formData.phoneNumber.length < 0) {
                alert("Phone Number Fields should not be empty!!");
                return;
            }
            if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
                alert("Enter a valid Phone Number")
                return;
            }
            const resp = await Axios.post('/user/sendotpnumber', {
                phoneNumber: formData.phoneNumber
            })
            console.log("This is the total data>>>>", resp.data)
            setPhoneOtpDataContainer(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="py-24">
                <div className="grid md:px-12 px-[.4rem] gap-8">
                    <div>
                        <div className="flex flex-col lg:text-7xl md:text-6xl xsm:text-5xl font-bold">
                            <span className="text-red-500 md:text-left text-center">WELCOME</span>
                            <span className="md:text-end text-center text-white drop-shadow-[0px_0px_2px_rgba(239,68,68)]">VENDORS</span>
                        </div>

                    </div>
                    <div className='flex justify-between'>
                        <Image
                            src={"/vandorlogin/image.png"}
                            height={100}
                            width={1000}
                            className="xsm:w-full md:w-[50vw] md:h-[80vh] xsm:h-[50vh] hidden lg:block"
                        />
                        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-3 pr-4">
                            {step === 1 && (
                                <>
                                    <div className="space-y-6">
                                        {/* First Name Field */}
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter First Name"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.firstName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.firstName && (
                                                <span className="text-red-500 text-sm">{errors.firstName}</span>
                                            )}
                                        </div>

                                        {/* Last Name Field */}
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Enter Last Name"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.lastName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.lastName && (
                                                <span className="text-red-500 text-sm">{errors.lastName}</span>
                                            )}
                                        </div>

                                        {/* Business Name Field */}
                                        <div className="flex flex-col space-y-2">
                                            <label className="text-sm font-medium">Business Name</label>
                                            <input
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                placeholder="Enter Business Name"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.businessName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.businessName && (
                                                <span className="text-red-500 text-sm">{errors.businessName}</span>
                                            )}
                                        </div>

                                        {/* Next Button */}
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-center'>
                                        Already have an account? <Link href={"/signinvendor"} className='font-bold text-[#FF5900E5]'>SIGN IN HERE</Link>
                                    </p>
                                </>

                            )}

                            {step === 2 && (
                                <>
                                    <div className="space-y-6">
                                        <div className="flex flex-col space-y-4">
                                            {/* Password Field */}
                                            <label className="text-sm font-medium">Password</label>
                                            <input
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter Password"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.password && (
                                                <span className="text-red-500 text-sm">{errors.password}</span>
                                            )}

                                            {/* Business Address */}
                                            <label className="text-sm font-medium">Business Address</label>
                                            <input
                                                name="businessAddress"
                                                value={formData.businessAddress}
                                                onChange={handleChange}
                                                placeholder="Enter Address"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.businessAddress && (
                                                <span className="text-red-500 text-sm">{errors.businessAddress}</span>
                                            )}

                                            {/* Business Address Pincode*/}
                                            <label className="text-sm font-medium">Business Address Pincode</label>
                                            <input
                                                type='number'
                                                name="Business Address Pincode"
                                                value={businessPin}
                                                onChange={(e) => setBusinessPin(e.target.value)} // Update the state correctly
                                                placeholder="Enter Pin"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.businessAddressPin && (
                                                <span className="text-red-500 text-sm">{errors.businessAddressPin}</span>
                                            )}

                                            {/* Business Address Landmark*/}
                                            <label className="text-sm font-medium">Business Address Landmark</label>
                                            <input
                                                name="Business Address Landmark"
                                                value={businessLandmark}
                                                onChange={(e) => setBusinessLandmark(e.target.value)} // Update the state correctly
                                                placeholder="Enter Landmark"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.businessAddressLandmark && (
                                                <span className="text-red-500 text-sm">{errors.businessAddressLandmark}</span>
                                            )}

                                            {/* Business Structure */}
                                            <label className="text-sm font-medium">Business Structure</label>
                                            <input
                                                name="businessStructure"
                                                value={formData.businessStructure}
                                                onChange={handleChange}
                                                placeholder="Enter Business Structure"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.businessStructure && (
                                                <span className="text-red-500 text-sm">{errors.businessStructure}</span>
                                            )}

                                            {/* GST Number */}
                                            <label className="text-sm font-medium">GST Number</label>
                                            <input
                                                name="gst"
                                                value={formData.gst}
                                                onChange={handleChange}
                                                placeholder="Enter GST Number"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.gst && (
                                                <span className="text-red-500 text-sm">{errors.gst}</span>
                                            )}
                                            {/* City */}
                                            <label className="text-sm font-medium">City</label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="City"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.city && (
                                                <span className="text-red-500 text-sm">{errors.city}</span>
                                            )}

                                            {/* State */}
                                            <label className="text-sm font-medium">State</label>
                                            <input
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="State"
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            />
                                            {errors.state && (
                                                <span className="text-red-500 text-sm">{errors.state}</span>
                                            )}

                                            {/* Business Description */}
                                            <label className="text-sm font-medium">Business Description</label>
                                            <select
                                                name="businessDescription"
                                                value={formData.businessDescription}
                                                onChange={handleChange}
                                                className={`border py-3 px-4 rounded-md focus:outline-none ${errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                            >
                                                {serviceArray.map((item, index) => (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Error Message */}
                                            {errors.businessDescription && (
                                                <span className="text-red-500 text-sm">{errors.businessDescription}</span>
                                            )}
                                        </div>

                                        {/* Navigation Buttons */}
                                        <div className="flex space-x-3">
                                            <button
                                                type="button"
                                                onClick={handlePrevious}
                                                className="bg-gray-500 text-white py-3 px-4 rounded-md flex justify-center items-center hover:bg-gray-600 transition-colors"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="bg-blue-500 text-white py-3 px-4 rounded-md flex justify-center items-center hover:bg-blue-600 transition-colors"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-center'>
                                        Already have an account? <Link href={"/signinvendor"} className='font-bold text-[#FF5900E5]'>SIGN IN HERE</Link>
                                    </p>
                                </>

                            )}

                            {step === 3 && (
                                <>
                                    {/* Step 3 fields */}
                                    <div className="space-y-6">
                                        <label className="block text-lg font-medium mb-2">
                                            Upload Business Related Documents
                                        </label>

                                        {/* Upload Aadhar */}
                                        <div className="space-y-1">
                                            <input
                                                type="file"
                                                id="file1"
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    setUploadedFile1(e.target.files[0]);
                                                }}
                                            />
                                            <label
                                                htmlFor="file1"
                                                className="border border-gray-300 py-3 px-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="mr-2 text-gray-700">Upload Aadhar</span>
                                                <span className="text-sm text-gray-500">
                                                    {uploadedFile1 ? uploadedFile1.name : "Click to upload file"}
                                                </span>
                                            </label>
                                            {errors.uploadedFile1 && (
                                                <span className="text-red-500 text-sm">{errors.uploadedFile1}</span>
                                            )}
                                        </div>

                                        {/* Upload Pan Card */}
                                        <div className="space-y-1">
                                            <input
                                                type="file"
                                                id="file2"
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    setUploadedFile2(e.target.files[0]);
                                                }}
                                            />
                                            <label
                                                htmlFor="file2"
                                                className="border border-gray-300 py-3 px-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="mr-2 text-gray-700">Upload Pan Card</span>
                                                <span className="text-sm text-gray-500">
                                                    {uploadedFile2 ? uploadedFile2.name : "Click to upload file"}
                                                </span>
                                            </label>
                                            {errors.uploadedFile2 && (
                                                <span className="text-red-500 text-sm">{errors.uploadedFile2}</span>
                                            )}
                                        </div>

                                        {/* Upload License */}
                                        <div className="space-y-1">
                                            <input
                                                type="file"
                                                id="file3"
                                                style={{ display: "none" }}
                                                onChange={(e) => {
                                                    setUploadedFile3(e.target.files[0]);
                                                }}
                                            />
                                            <label
                                                htmlFor="file3"
                                                className="border border-gray-300 py-3 px-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="mr-2 text-gray-700">Upload License</span>
                                                <span className="text-sm text-gray-500">
                                                    {uploadedFile3 ? uploadedFile3.name : "Click to upload file"}
                                                </span>
                                            </label>
                                            {errors.uploadedFile3 && (
                                                <span className="text-red-500 text-sm">{errors.uploadedFile3}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label>Phone Number</label>
                                        <input
                                            name="phoneNumber"
                                            type='number'
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Phone Number"
                                            className={`border py-3 px-3 rounded ${errors.phoneNumber ? 'border-red-500' : 'border-black'}`}
                                        />
                                        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                                        <button onClick={handlePhoneVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg mt-2 text-white cursor-pointer">Verify Phone</button>
                                        {phonePopupFlag && <div className="fllex">
                                            <input onChange={(e) => {
                                                setInputPhoneOtp(e.target.value);
                                                console.log(e.target.value)
                                            }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Phone OTP" />
                                            {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                                        </div>}
                                    </div>
                                    <label>Email</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        className={`border py-3 px-3 rounded ${errors.email ? 'border-red-500' : 'border-black'}`}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">{errors.email}</span>
                                    )}
                                    <button onClick={handleEmailVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-not-allowed">Verify Email</button>
                                    {mailPopupFlag && <div className="fllex">
                                        <input onChange={(e) => {
                                            console.log(e.target.value)
                                            setInputMailOtp(e.target.value)
                                        }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Email OTP" />
                                        {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                                    </div>}
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" name='terms' id="terms" required />
                                        <label className='flex gap-2' htmlFor="terms">
                                            I accept <button type='button' onClick={() => setIsTnCOpen(true)} className='font-bold text-[#FF5900E5] underline'>Terms & Conditions</button>
                                        </label>
                                    </div>
                                    <div className="flex space-x-3">

                                        <button
                                            type="button"
                                            onClick={handlePrevious}
                                            className="bg-gray-500 text-white p-3 flex justify-center items-center rounded hover:bg-gray-600 transition"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white p-3 flex justify-center items-center rounded hover:bg-green-600 transition"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <p className='text-center'>
                                        Already have an account? <Link href={"/signinvendor"} className='font-bold text-[#FF5900E5]'>SIGN IN HERE</Link>
                                    </p>
                                </>
                            )}
                        </form>
                    </div>
                </div>

                {/* Terms & Conditions Modal */}
                {isTnCOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white md:p-8 xsm:p-3 rounded-lg flex flex-col">
                            {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                            <div className="max-h-96 overflow-y-auto">
                                <div class="max-w-3xl bg-white shadow-md rounded-lg p-2">

                                    <h1 class="text-3xl font-bold text-gray-800 mb-6">Terms and Services</h1>

                                    <div class="prose">

                                        <div class="px-3 ">
                                            <h1 class="text-xl md:text-3xl font-bold mb-6">Evego Event Pvt Ltd - Vendor Terms and Conditions</h1>
                                            <p class="text-lg md:text-md mb-6">
                                                Welcome to Evego Event Pvt Ltd. By registering as a vendor on our platform and offering your services,
                                                you agree to the following terms and conditions. Please read them carefully to ensure mutual understanding
                                                and compliance.
                                            </p>


                                            <h2 class="text-2xl md:text-3xl font-semibold mb-4">1. Acceptance of Terms</h2>
                                            <p class="text-base md:text-lg leading-relaxed">
                                                By registering as a vendor on the Evego Event platform, you agree to comply with and be bound by these
                                                terms and conditions. If you disagree with any part of these terms, do not register or offer services
                                                through our platform. Evego Event reserves the right to amend these terms at any time. You will be
                                                notified of significant changes via email or through a notification on the platform. Your continued use
                                                of the platform after any amendments signifies your acceptance of the updated terms.
                                            </p>


                                            <h2 class="text-2xl md:text-3xl font-semibold mb-4">2. Vendor Listing and Profile Information</h2>
                                            <div class=" px-3 ">

                                                <h2 class="text-2xl md:text-3xl font-bold mb-6">Accurate Information</h2>
                                                <p class="text-base md:text-lg mb-4">
                                                    Vendors must provide complete, truthful, and up-to-date information when creating their profile, including:
                                                </p>


                                                <ul class="list-disc list-inside pl-6">
                                                    <li class="mb-4">
                                                        <strong>Business Information:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li><strong>Company Name:</strong> Ensure that the name used matches your legal business name.</li>
                                                            <li><strong>Registration Status:</strong> Provide details on your business registration status and type (e.g., LLC, Corporation).</li>
                                                            <li><strong>Contact Details:</strong> Include a valid phone number and email address for communication.</li>
                                                            <li><strong>Business Address:</strong> Ensure that your business address is accurate for verification and invoicing purposes.</li>
                                                        </ul>
                                                    </li>


                                                    <li class="mb-4">
                                                        <strong>Service Details:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>Clearly describe the services offered, including all components of the service package, any customization options, and specific features.</li>
                                                            <li>Pricing information should include any additional fees or charges, such as travel expenses or service surcharges.</li>
                                                        </ul>
                                                    </li>


                                                    <li class="mb-4">
                                                        <strong>Credentials and Certifications:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>If your services require specific certifications or licenses (e.g.,licenses, safety permits), this information must be accurately provided and kept current.</li>
                                                            <li>Vendors may be required to submit copies of these documents during the registration process.</li>
                                                        </ul>
                                                    </li>
                                                </ul>


                                                <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-6">Profile Updates</h2>
                                                <p class="text-base md:text-lg mb-4">Vendors are responsible for regularly updating their profiles to reflect any changes, including:</p>

                                                <ul class="list-disc list-inside pl-6">
                                                    <li class="mb-4">
                                                        <strong>Service Changes:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>Notify customers of new service offerings, package adjustments, or any modifications to existing services.</li>
                                                        </ul>
                                                    </li>

                                                    <li class="mb-4">
                                                        <strong>Availability Updates:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>Maintain an updated calendar of availability to prevent double bookings and customer dissatisfaction. Ensure that any changes to your schedule are promptly reflected.</li>
                                                        </ul>
                                                    </li>

                                                    <li class="mb-4">
                                                        <strong>Price Adjustments:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>Communicate any changes to service pricing immediately to ensure transparency. Price updates must be implemented on the platform as soon as they are effective.</li>
                                                        </ul>
                                                    </li>
                                                </ul>


                                                <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-6">Misleading Information</h2>
                                                <p class="text-base md:text-lg mb-4">
                                                    Providing inaccurate or misleading information can lead to severe penalties. Evego Event reserves the right to suspend or permanently remove vendors who consistently provide deceptive information. This includes:
                                                </p>

                                                <ul class="list-disc list-inside pl-6">
                                                    <li class="mb-4">
                                                        <strong>False Advertising:</strong>
                                                        <ul class="list-none pl-4">
                                                            <li>Any exaggerated claims about services, qualifications, or customer outcomes will be considered a breach of these terms.</li>
                                                        </ul>
                                                    </li>
                                                </ul>


                                                <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-6">Consistency with Service Delivery</h2>
                                                <p class="text-base md:text-lg mb-4">
                                                    Your profile must accurately reflect what customers can expect to receive. Discrepancies may lead to customer complaints, refund requests, or disputes, and can damage your reputation on the platform. Maintaining consistency is key to customer trust and satisfaction.
                                                </p>


                                                <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-6">Vendor Review System</h2>
                                                <p class="text-base md:text-lg mb-4">
                                                    Customer reviews will reflect the accuracy and quality of your profile information. Clear, detailed listings will lead to better customer experiences, positive reviews, and ultimately, more bookings. You are encouraged to solicit feedback from customers post-service to enhance your profile and service offerings.
                                                </p>
                                            </div>


                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">3. Vendor Eligibility</h2>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Legal Registration and Authorization:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                To provide services on Evego Event, vendors must be legally registered businesses, including:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Business Registration:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must have valid registration or licensing to operate in their specific region or country. This ensures that all vendors are legitimate and can deliver services professionally.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Authorization to Provide Services:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors should possess the necessary permits or certifications to offer the specific services they list on the platform. This may include licenses for  entertainment permits, safety certifications, and other legal authorizations as required by local regulations.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Accurate Business and Personal Information:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors must submit up-to-date information about their business and may be required to provide personal identification documents for verification purposes. This includes:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Tax Identification Numbers:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must provide relevant tax identification numbers as part of the registration process to facilitate compliance with tax regulations.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Identification Documents:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Depending on local laws, you may be required to submit copies of personal identification documents (e.g., driver’s license, passport) to verify your identity and legitimacy.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Compliance with Laws:</h3>
                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Tax Compliance:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors are responsible for managing their tax obligations, including the collection and remittance of sales tax where applicable. It is advisable to consult with a tax professional to ensure compliance.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Licensing and Permits:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must ensure they hold any necessary licenses or permits required to operate legally in their specific location, such as health permits for food service, alcohol licenses for and event permits for public gatherings.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Regulatory Compliance:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must adhere to all regulations related to safety, labor laws, and environmental requirements as applicable to their services. This includes compliance with industry standards and best practices to ensure customer safety and satisfaction.</li>
                                                    </ul>
                                                </li>
                                            </ul>


                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">4. Vendor Responsibilities</h2>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Service Quality:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors must deliver high-quality services as promised in their listings. This includes:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Accuracy in Services Offered:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Ensure that the services provided match exactly what was described and agreed upon with the customer during the booking process.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Maintaining High Standards:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>The quality of the service provided must meet or exceed customer expectations and comply with relevant industry standards. Vendors are encouraged to engage in ongoing professional development and training to enhance service quality.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Professionalism:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Conduct yourself professionally at all times, ensuring a positive customer experience. This includes appropriate behavior, attire, and communication during event execution.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Timeliness:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors are required to deliver their services punctually and adhere to the agreed-upon schedule. This includes:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Meeting Deadlines:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Whether it’s setting up for an event, delivering products, or performing services, vendors must ensure timely execution to avoid disruptions.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Prompt Communication:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>In the event of unforeseen circumstances that may cause delays, vendors must inform both the customer and Evego Event as early as possible to minimize disruption and manage expectations.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Communication:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Clear and consistent communication is vital for customer satisfaction and operational success. Vendors are expected to:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Stay Responsive:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors should respond to customer inquiries and messages promptly, ideally within 24 hours, to address any concerns or questions about the services they will provide.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Issue Reporting:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must inform both the customer and Evego Event immediately if any issues arise regarding bookings, event execution, or payments. Transparent communication helps prevent misunderstandings and disputes.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Follow-Up:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>After an event, vendors should follow up with customers to gather feedback, resolve any outstanding matters, and reinforce customer relationships.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Compliance:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors are required to comply with all relevant laws and regulations related to their services, including:
                                            </p>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Safety Standards:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Adhere to all safety protocols and guidelines applicable to their services, ensuring a safe environment for customers and attendees.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Legal Compliance:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Ensure that your services do not infringe on any intellectual property rights (e.g., copyrighted music or materials) and comply with all local, state, and national laws governing your industry.</li>
                                                    </ul>
                                                </li>
                                            </ul>


                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">5. Cancellation and Refund Policy</h2>

                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Vendor Cancellations:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>If a vendor must cancel a confirmed booking, they are required to inform both the customer and Evego Event immediately. Vendors must provide a valid reason for the cancellation and work with the customer to find an alternative solution if possible. Excessive cancellations may lead to penalties, including suspension or permanent removal from the platform.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Refunds to Customers:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>If a vendor cancels or fails to deliver the agreed-upon services, customers are eligible for a full or partial refund, depending on the situation. In such cases, the vendor may be responsible for covering the refund amount. It is the vendor's responsibility to process the refund in a timely manner, typically within a specified timeframe set by Evego Event.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Customer Cancellations:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>If a customer cancels a booking, vendors must adhere to the cancellation policy that was agreed upon at the time of booking. Evego Event will manage the refund process based on the stated cancellation terms, which may include varying refund percentages depending on the timing of the cancellation.</li>
                                                    </ul>
                                                </li>
                                            </ul>



                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">6. Dispute Resolution</h2>
                                            <p class="mb-4">
                                                In the event of a disagreement between a vendor and a customer, both parties are encouraged to resolve the issue directly through open communication. If the issue remains unresolved, the vendor must notify Evego Event for mediation. The platform will step in to facilitate a resolution. The final decision regarding any unresolved dispute will be made by Evego Event, which reserves the right to consider all evidence presented by both parties to ensure a fair and efficient resolution process.
                                            </p>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">7. Intellectual Property and Trademarks</h2>
                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Vendor Content:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Any content (such as images, descriptions, or logos) uploaded by vendors remains their intellectual property. By submitting content to the platform, vendors grant Evego Event a non-exclusive, royalty-free right to use this material for marketing, promotion, and advertising purposes across various channels, including social media, newsletters, and website promotions.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Trademarks and Logos:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors are not permitted to use Evego Event’s name, logo, or associated trademarks in their marketing materials or external communications without prior written permission from Evego Event. Unauthorized use of trademarks may result in legal action to protect the brand integrity.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">8. Data Privacy and Security</h2>
                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Customer Data:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must handle any personal data received from customers in accordance with applicable data protection laws, such as GDPR or CCPA, as applicable. Misusing or mishandling customer data can lead to serious consequences, including removal from the platform and legal action.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Confidentiality:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors agree to maintain the confidentiality of any non-public information accessed through the Evego Event platform, including sensitive business details, internal processes, and customer information. Breaches of confidentiality may result in legal consequences and removal from the platform.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Data Security:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must take reasonable steps to protect customer data from unauthorized access, including implementing secure data storage practices and ensuring that any third-party service providers used also comply with data security standards.</li>
                                                    </ul>
                                                </li>
                                            </ul>




                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">9. Termination of Services</h2>
                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Termination by Evego Event:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>The platform reserves the right to suspend or terminate a vendor’s account if they violate the terms and conditions, deliver poor-quality service, or engage in fraudulent activities. Termination may occur immediately or after repeated offenses, depending on the severity of the violations. Vendors will be notified of termination and provided with reasons for the decision.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Vendor Termination:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors may choose to terminate their registration on the platform by providing written notice to Evego Event. However, they must fulfill any pending bookings to ensure customers are not negatively impacted by the vendor’s departure. Any outstanding obligations must be settled before account closure.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">10. Liability and Indemnification</h2>
                                            <ul class="list-disc list-inside pl-6 mb-4">
                                                <li class="mb-4">
                                                    <strong>Vendor Liability:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors are liable for any damages, losses, or issues that arise from the services they provide. This includes liability for property damage, personal injury, or any claims made against them as a result of their services. Vendors are required to maintain appropriate insurance coverage to protect against potential liabilities.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Indemnification:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors agree to indemnify and hold harmless Evego Event Pvt Ltd from any claims, legal fees, or damages arising from their services or breaches of these terms. This means that if a vendor’s actions result in a lawsuit or legal dispute, the vendor is responsible for covering any resulting costs or penalties, protecting Evego Event from liability.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">11. Amendments to Terms</h2>
                                            <p class="mb-4">
                                                Evego Event Pvt Ltd reserves the right to modify or update these terms and conditions at any time. Vendors will be informed of any changes via email or through notifications on the platform. Continued use of the platform after changes are made will imply the vendor’s acceptance of the updated terms. Vendors are encouraged to periodically review the terms to stay informed of any updates.
                                            </p>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">12. Governing Law</h2>
                                            <p class="mb-4">
                                                These terms and conditions are governed by the laws of the jurisdiction in which Evego Event Pvt Ltd operates. Any disputes arising under these terms will be resolved in accordance with the laws of that jurisdiction, without regard to its conflict of law principles.
                                            </p>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">13. Severability</h2>
                                            <p class="mb-4">
                                                If any provision of these terms is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be deemed modified to reflect the original intent of the parties as closely as possible in accordance with applicable law, and the remaining provisions of these terms shall remain in full force and effect.
                                            </p>


                                        </div>

                                    </div>

                                </div>


                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setIsTnCOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {loading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <Loading /> {/* Your loading spinner component */}
                </div>
            )}
        </>
    );
};

export default VendorLogin;
