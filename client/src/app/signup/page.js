"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import axios from '@/utils/axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Axios from '@/utils/axios'

const SignUp = () => {
    const router = useRouter()
    const username = useRef(null)
    const fullname = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const address = useRef(null)
    const phoneNumber = useRef(null)
    const [emailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isTnCOpen, setIsTnCOpen] = useState(false) // For T&C modal

    //TODO:States
    const [isMailVerified, setMailVerified] = useState(false)
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [mailPopupFlag, setMailPopupFlag] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [otpMailContainer, setOtpMailContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);
    const [inputMailOtp, setInputMailOtp] = useState(null);

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email address')
        } else {
            setEmailError('')
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Send registration request
            //TODO:Uncomment the code
            const currentDate= Date.now();
            // if(otpMailContainer.data.otpExpires<currentDate ){
            //     toast.info("OTP duration Expired Please try again!!");
            //     return;
            // }
            // if(otpMailContainer.data.otp!=inputMailOtp){
            //     toast.info("Registration Failed Wrong Email OTP Entered!!");
            //     return;
            // }
            // const currentDate= Date.now();
            if(otpPhoneDataContainer.data.otpExpires<currentDate ){
                toast.info("OTP duration Expired Please try again!!");
                return;
            }
            if(otpPhoneDataContainer.data.otp!=inputPhoneOtp){
                toast.info("Registration Failed Wrong Phone OTP Entered!!");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.current.value)) {
                toast.error("Please enter a valid email address.");
                setLoading(false);
                return;
            }

            // Validate phone number format (exactly 10 digits)
            const phoneRegex = /^\d{10}$/;
            
            if (!phoneRegex.test(phoneNumber.current.value)) {
                toast.error("Please enter a valid phone number (10 digits).");
                setLoading(false);
                return;
            }

            const response = await Axios.post("/user/register", {
                username: fullname.current.value,
                fullname: fullname.current.value,
                email: email.current.value,
                password: password.current.value,
                address: address.current.value,
                phone_no: phoneNumber.current.value,
            });

            // After successful registration, inform user to check email for verification
            toast.success("Registration successful!");

            // Optionally, redirect to the sign-in page
            router.push('/signin');
        } catch (error) {
            if (error.response) {
                // Handle specific error statuses
                if (error.response.status === 409) {
                    toast.error("User with this email or username already exists. Please try another.");
                } else {
                    toast.error("Signup error: " + (error.response.data.message || "Something went wrong"));
                }
            } else {
                toast.error("Signup error: " + error.message);
            }
            console.error("Signup error", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEmailVerification = async (e) => {
        setMailPopupFlag(true);
        //TODO:Update the url
        try {
            if (!email.current.value) {
                alert("Email Fields should not be empty!!");
                return;
            }
            if (!email.current.value || !/^\S+@\S+\.\S+$/.test(email.current.value)) {
                alert("Enter a valid Email")
                return;
            }
            const resp = await Axios.post('/user/sendotpemail', {
                email: email.current.value
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
            console.log(phoneNumber.current.value)
            if (!phoneNumber.current.value) {
                alert("Phone Number Fields should not be empty!!");
                return;
            }
            if (!phoneNumber.current.value || !/^\d{10}$/.test(phoneNumber.current.value)) {
                alert("Enter a valid Phone Number (10 digits)");
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

    return (
        <div className='bg-[#E9D1EC] min-h-screen'>
            <div className='h-[18rem] sm:h-[25rem] xl:h-[33rem] xxl:h-[38rem] flex'>
                <Image
                    alt='signup'
                    loading="lazy"
                    className='h-full w-full object-cover'
                    src='/login.png'
                    height={1500}
                    width={1500}
                />
            </div>
            <div className='flex justify-center items-center pb-16 mx-3 mt-20'>
                <form onSubmit={handleSignup} className='-mt-48 bg-white px-5 flex flex-col justify-center items-center rounded-2xl pb-10 shadow-lg border border-gray-200 w-full max-w-lg'>
                    <h1 className='font-serif font-bold text-2xl pt-12 pb-10'>Sign Up User</h1>
                    <div className='flex flex-col justify-center gap-6 w-full'>
                        {/*  <div className='flex flex-col gap-2'>
                            <label htmlFor="username">Username</label>
                            <input
                                ref={username}
                                id="username"
                                required
                                className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                placeholder='Username'
                            />
                        </div> */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                ref={fullname}
                                id="fullname"
                                required
                                className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                placeholder='Full Name'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input
                                ref={email}
                                id="email"
                                required
                                onBlur={(e) => validateEmail(e.target.value)}
                                className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring ${emailError ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500`}
                                placeholder='Email'
                            />
                            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                            <button onClick={handleEmailVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-not-allowed">Verify Email</button>
                            {mailPopupFlag && <div className="fllex">
                                <input onChange={(e) => {
                                    console.log(e.target.value)
                                    setInputMailOtp(e.target.value)
                                }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Email OTP" />
                                {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                            </div>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password">Password</label>
                            <input
                                ref={password}
                                id="password"
                                required
                                type="password"
                                className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                placeholder='Enter a strong password'
                            />
                        </div>



                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password">Address</label>
                            <input
                                ref={address}
                                id="address"
                                required
                                type="text"
                                className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                placeholder='Enter address'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="password">PhoneNumber</label>
                            <input
                                ref={phoneNumber}
                                id="phoneNumber"
                                required
                                type="number"
                                className='border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                placeholder='Enter a phone number'
                            />
                            <button onClick={handlePhoneVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-pointer">Verify Phone</button>
                            {phonePopupFlag && <div className="fllex">
                                <input onChange={(e) => {
                                    setInputPhoneOtp(e.target.value);
                                    console.log(e.target.value)
                                }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Phone OTP" />
                                {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                            </div>}
                        </div>





                        <div className='flex items-center gap-2'>
                            <input type="checkbox" name='terms' id="terms" required />
                            <label className='flex gap-2' htmlFor="terms">
                                I accept <button type='button' onClick={() => setIsTnCOpen(true)} className='font-bold text-[#FF5900E5] underline'>Terms & Conditions</button>
                            </label>
                        </div>
                        <button
                            disabled={loading}
                            className={`text-white bg-[#3771C8] w-full py-3 flex justify-center items-center text-center rounded-lg transition-transform hover:scale-105 ${loading && 'opacity-50'}`}
                            type='submit'
                        >
                            {loading ? 'Signing up...' : 'SIGN UP'}
                        </button>
                        <p className='text-center'>
                            Already have an account? <Link href={"/signin"} className='font-bold text-[#FF5900E5]'>SIGN IN HERE</Link>
                        </p>
                    </div>
                </form>
            </div>

            {/* Terms & Conditions Modal */}
            {isTnCOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-3 rounded-lg flex flex-col">
                        {/* <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2> */}
                        <div className="max-h-96 overflow-y-auto">
                            <div class="bg-white shadow-md rounded-lg py-3">

                                <h1 class="text-3xl font-bold text-gray-800 mb-6 pl-4">Terms and Services</h1>

                                <div class="prose">

                                    <div class="max-w-5xl px-4">
                                        <h1 class="text-xl md:text-3xl font-bold mb-6">Evego Event Pvt Ltd - User Terms and Conditions</h1>
                                        <p class="text-lg md:text-md mb-6">
                                            Welcome to Evego Event Pvt Ltd. By registering as a vendor on our platform and offering your services,
                                            you agree to the following terms and conditions. Please read them carefully to ensure mutual understanding
                                            and compliance.
                                        </p>

                                        <div class="">
                                            <h2 class="text-2xl md:text-3xl font-semibold mb-4">1. Acceptance of Terms</h2>
                                            <p class="text-base md:text-lg leading-relaxed">
                                                By registering as a vendor on the Evego Event platform, you agree to comply with and be bound by these
                                                terms and conditions. If you disagree with any part of these terms, do not register or offer services
                                                through our platform. Evego Event reserves the right to amend these terms at any time. You will be
                                                notified of significant changes via email or through a notification on the platform. Your continued use
                                                of the platform after any amendments signifies your acceptance of the updated terms.
                                            </p>
                                        </div>

                                        <div class="">
                                            <h2 class="text-2xl md:text-3xl font-semibold mb-4">2. Vendor Listing and Profile Information</h2>
                                            <div class="max-w-5xl px-4">

                                                <h2 class="text-2xl md:text-3xl font-bold mb-6">Accurate Information</h2>
                                                <p class="text-base md:text-lg mb-4">
                                                    Vendors must provide complete, truthful, and up-to-date information when creating their profile, including:
                                                </p>


                                                <ul class="list-disc list-inside ">
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
                                                            <li>If your services require specific certifications or licenses (e.g., licenses, safety permits), this information must be accurately provided and kept current.</li>
                                                            <li>Vendors may be required to submit copies of these documents during the registration process.</li>
                                                        </ul>
                                                    </li>
                                                </ul>


                                                <h2 class="text-2xl md:text-3xl font-bold mt-8 mb-6">Profile Updates</h2>
                                                <p class="text-base md:text-lg mb-4">Vendors are responsible for regularly updating their profiles to reflect any changes, including:</p>

                                                <ul class="list-disc list-inside ">
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

                                                <ul class="list-disc list-inside ">
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
                                        </div>

                                        <div class="max-w-5xl px-4">
                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">3. Vendor Eligibility</h2>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Legal Registration and Authorization:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                To provide services on Evego Event, vendors must be legally registered businesses, including:
                                            </p>

                                            <ul class="list-disc list-inside  mb-4">
                                                <li class="mb-4">
                                                    <strong>Business Registration:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors must have valid registration or licensing to operate in their specific region or country. This ensures that all vendors are legitimate and can deliver services professionally.</li>
                                                    </ul>
                                                </li>

                                                <li class="mb-4">
                                                    <strong>Authorization to Provide Services:</strong>
                                                    <ul class="list-none pl-4">
                                                        <li>Vendors should possess the necessary permits or certifications to offer the specific services they list on the platform. This may include licenses for entertainment permits, safety certifications, and other legal authorizations as required by local regulations.</li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Accurate Business and Personal Information:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors must submit up-to-date information about their business and may be required to provide personal identification documents for verification purposes. This includes:
                                            </p>

                                            <ul class="list-disc list-inside  mb-4">
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
                                            <ul class="list-disc list-inside  mb-4">
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
                                        </div>

                                        <div class="max-w-5xl px-4">
                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">4. Vendor Responsibilities</h2>

                                            <h3 class="text-xl md:text-2xl font-semibold mb-4">Service Quality:</h3>
                                            <p class="text-base md:text-lg mb-4">
                                                Vendors must deliver high-quality services as promised in their listings. This includes:
                                            </p>

                                            <ul class="list-disc list-inside  mb-4">
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

                                            <ul class="list-disc list-inside  mb-4">
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

                                            <ul class="list-disc list-inside  mb-4">
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

                                            <ul class="list-disc list-inside  mb-4">
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
                                        </div>

                                        <div class="max-w-5xl px-4">
                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">5. Cancellation and Refund Policy</h2>

                                            <ul class="list-disc list-inside  mb-4">
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
                                        </div>

                                        <div class="max-w-5xl px-4">

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">6. Dispute Resolution</h2>
                                            <p class="mb-4">
                                                In the event of a disagreement between a vendor and a customer, both parties are encouraged to resolve the issue directly through open communication. If the issue remains unresolved, the vendor must notify Evego Event for mediation. The platform will step in to facilitate a resolution. The final decision regarding any unresolved dispute will be made by Evego Event, which reserves the right to consider all evidence presented by both parties to ensure a fair and efficient resolution process.
                                            </p>

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">7. Intellectual Property and Trademarks</h2>
                                            <ul class="list-disc list-inside  mb-4">
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
                                            <ul class="list-disc list-inside  mb-4">
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

                                        </div>

                                        <div class="max-w-5xl px-4">

                                            <h2 class="text-2xl md:text-3xl font-bold mb-6">9. Termination of Services</h2>
                                            <ul class="list-disc list-inside  mb-4">
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
                                            <ul class="list-disc list-inside  mb-4">
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


                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsTnCOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default SignUp




