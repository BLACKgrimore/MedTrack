'use client'
import { useState } from 'react';
import Axios from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function NGORegistration() {
    const [formData, setFormData] = useState({
        username: '',
        registrationNumber: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        description: '',
        agreedToTerms: false,
    });
    const router = useRouter()

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showTnc, setShowTnc] = useState(false);  // password to control T&C modal visibility
    const [isMailVerified, setMailVerified] = useState(false)
    const [isPhoneVerified, setPhoneVerified] = useState(false)
    const [mailPopupFlag, setMailPopupFlag] = useState(false)
    const [phonePopupFlag, setPhonePopupFlag] = useState(false)
    const [otpPhoneDataContainer, setPhoneOtpDataContainer] = useState(null);
    const [otpMailContainer, setOtpMailContainer] = useState(null);
    const [inputPhoneOtp, setInputPhoneOtp] = useState(null);
    const [inputMailOtp, setInputMailOtp] = useState(null);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = 'NGO Name is required';
        if (!formData.registrationNumber) formErrors.registrationNumber = 'Registration Number is required';
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
            formErrors.email = 'Valid email is required';
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
            formErrors.phoneNumber = 'phoneNumber number must be 10 digits';
        if (!formData.address) formErrors.address = 'Address is required';
        // if (!formData.password) formErrors.password = 'password is required';
        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
            formErrors.password = "Password must include at least one uppercase letter, one number, and one special character";
        }
        if (!formData.description || formData.description.length < 20)
            formErrors.description = 'Description must be at least 20 characters';
        if (!formData.agreedToTerms)
            formErrors.agreedToTerms = 'You must agree to the Terms and Conditions';

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                
                const currentDate= Date.now();
                if(otpMailContainer.data.otpExpires<currentDate ){
                    toast.info("OTP duration Expired Please try again!!");
                    return;
                }
                if(otpMailContainer.data.otp!=inputMailOtp){
                    toast.info("Registration Failed Wrong Email OTP Entered!!");
                    return;
                }
                // const currentDate= Date.now();
                if(otpPhoneDataContainer.data.otpExpires<currentDate ){
                    toast.info("OTP duration Expired Please try again!!");
                    return;
                }
                if(otpPhoneDataContainer.data.otp!=inputPhoneOtp){
                    toast.info("Registration Failed Wrong Phone OTP Entered!!");
                    return;
                }
                
                const resp = await Axios.post('/ngo/register', formData);
                setSuccessMessage('Registration successful!');
                toast.success("Successfully registerd")
                router.push('/signinngo')
                setFormData({
                    username: '',
                    registrationNumber: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    password: '',
                    description: '',
                    agreedToTerms: false,
                });
                setErrors({});
            } catch (error) {
                setSuccessMessage('Registration failed. Please try again.');
            }
        } else {
            setErrors(formErrors);
            setSuccessMessage('');
        }
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
        <div className="flex justify-center items-center min-h-screen bg-pink-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full my-20">
                <h1 className="text-2xl font-semibold mb-6 text-center">NGO Registration</h1>
                <form onSubmit={handleSubmit}>
                    {/* NGO Name */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">NGO Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    {/* Registration Number */}
                    <div className="mb-4">
                        <label htmlFor="registrationNumber" className="block text-gray-700">Registration Number</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        <button onClick={handleEmailVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-not-allowed">Verify Email</button>
                        {mailPopupFlag && <div className="fllex">
                            <input onChange={(e) => {
                                console.log(e.target.value)
                                setInputMailOtp(e.target.value)
                            }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Email OTP" />
                            {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                        </div>}
                    </div>

                    {/* password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* phoneNumber */}
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        <button onClick={handlePhoneVerification} className="px-3 py-2 bg-green-400 w-fit rounded-lg  text-white cursor-pointer">Verify Phone</button>
                        {phonePopupFlag && <div className="fllex">
                            <input onChange={(e) => {
                                setInputPhoneOtp(e.target.value);
                                console.log(e.target.value)
                            }} className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring`} type="number" placeholder="Phone OTP" />
                            {/* <button className={`border px-3 py-2 rounded-lg bg-orange-400 text-white mt-4`}>Submit</button> */}
                        </div>}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-indigo-600"
                            />
                            <span className="ml-2 text-gray-700">
                                I agree to the <span className="text-indigo-600 underline cursor-pointer" onClick={() => setShowTnc(true)}>Terms and Conditions</span>
                            </span>
                        </label>
                        {errors.agreedToTerms && <p className="text-red-500 text-sm">{errors.agreedToTerms}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 flex justify-center text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 text-center"
                    >
                        Register NGO
                    </button>
                </form>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                {/* Already have an account */}
                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Already have an account? <a href="/signinngo" className="text-indigo-600 underline">Sign in here</a>.
                    </p>
                </div>
            </div>



            {/* Terms and Conditions Popup */}
            {showTnc && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl relative max-h-screen overflow-y-auto">
                        {/* <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2> */}
                        <div className="px-4 py-8">
                            <section className="rounded-lg"><h1 class="text-3xl font-bold mb-6 text-center">NGO Terms and Conditions - Evego Event</h1>

                                <p class="mb-4">
                                    This document outlines the Terms and Conditions for NGOs creating a profile on the Evego Event platform to accept food donations. These terms are designed to ensure that all parties understand their rights and responsibilities in order to facilitate safe and effective food donation practices.
                                </p>

                                <h2 class="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                                <p class="mb-4">
                                    By creating an NGO profile on the Evego Event platform, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, you should not register or accept food donations through our platform. Your acceptance of these terms constitutes a legal agreement between your NGO and Evego Event.
                                </p>
                                <h3 class="font-semibold mb-2">Notification of Changes:</h3>
                                <p class="mb-4">
                                    Evego Event reserves the right to update these terms. Notification of any amendments will be communicated via email or through the platform, ensuring you are aware of your rights and obligations. Continued participation will indicate acceptance of the updated terms.
                                </p>

                                <h2 class="text-2xl font-semibold mb-4">2. Eligibility Requirements</h2>
                                <h3 class="font-semibold mb-2">Registered Non-Profit Status:</h3>
                                <p class="mb-4">
                                    Your organization must be a legally registered non-profit or charitable organization, recognized by relevant governmental authorities. This includes providing your registration number and a copy of your non-profit certification during the registration process.
                                </p>
                                <h3 class="font-semibold mb-2">Food Safety Compliance:</h3>
                                <p class="mb-4">
                                    Your NGO must adhere to all local, state, and national food safety regulations. This includes:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Health Inspections: Regular health inspections must be conducted by local health authorities to ensure compliance with food safety laws.</li>
                                    <li>Training: Staff must undergo mandatory training in food handling and safety procedures, which could be organized through certified organizations.</li>
                                </ul>
                                <h3 class="font-semibold mb-2">Facility Standards:</h3>
                                <p class="mb-4">
                                    Your organization must maintain facilities that comply with food safety regulations, which include:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Storage: Adequate refrigeration and freezer facilities must be in place to handle perishable items.</li>
                                    <li>Sanitation: Regular cleaning protocols should be established to ensure all areas involved in food handling meet hygiene standards.</li>
                                </ul>
                                <h3 class="font-semibold mb-2">Training and Education:</h3>
                                <p class="mb-4">
                                    Volunteers and staff members involved in food handling must receive proper training, including but not limited to:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Food safety best practices</li>
                                    <li>Emergency procedures for food recalls</li>
                                    <li>Training on how to conduct proper food inspections</li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">3. Registration Process</h2>
                                <h3 class="font-semibold mb-2">Profile Creation:</h3>
                                <p class="mb-4">
                                    To receive food donations, your NGO must provide comprehensive and accurate details during the registration process. Required information includes:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Legal Name and Registration Number: Accurate identification of your organization.</li>
                                    <li>Mission Statement: A brief description of your NGO’s mission and objectives, helping potential donors understand your goals.</li>
                                    <li>Contact Information: Up-to-date phone numbers and email addresses to facilitate communication.</li>
                                </ul>
                                <h3 class="font-semibold mb-2">Verification:</h3>
                                <p class="mb-4">
                                    Evego Event reserves the right to verify your NGO's credentials prior to approving the profile. This process may involve:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Documentation Review: Examination of documents proving non-profit status and compliance with food safety regulations.</li>
                                    <li>Site Visits: In some cases, Evego Event may conduct a site visit to evaluate your facilities and ensure they meet the required standards.</li>
                                </ul>
                                <h3 class="font-semibold mb-2">Updates and Accuracy:</h3>
                                <p class="mb-4">
                                    NGOs are responsible for keeping their profile information current. This includes:
                                </p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li>Reporting Changes: Timely notification of any changes in contact details or operational capacity to Evego Event.</li>
                                    <li>Regular Reviews: NGOs should conduct periodic reviews of their profiles to ensure all information remains accurate.</li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">4. Responsibilities of the NGO</h2>
                                <p class="mb-4">
                                    By registering to accept food donations, your NGO agrees to fulfill the following responsibilities:
                                </p>

                                <h2 class="text-2xl font-semibold mb-4">● Food Handling:</h2>
                                <p class="mb-4">Ensure all donated food is handled in compliance with food safety laws. This includes:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Proper Storage:</strong> Store food at appropriate temperatures to prevent spoilage.
                                    </li>
                                    <li>
                                        <strong>Hygiene Practices:</strong> Implement strict hygiene practices among staff and volunteers, such as handwashing protocols and the use of gloves during food handling.
                                    </li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">● Inspection of Donations:</h2>
                                <p class="mb-4">Upon collection, inspect all donated food to ensure it is safe for consumption. This includes:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Visual Inspection:</strong> Check for signs of spoilage, contamination, or damage.
                                    </li>
                                    <li>
                                        <strong>Rejection of Unsafe Food:</strong> Any food items that do not meet safety standards must be rejected, and the reason for rejection should be documented and reported to Evego Event.
                                    </li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">● Transparency in Distribution:</h2>
                                <p class="mb-4">Maintain transparency in food distribution, including:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Record Keeping:</strong> Maintain accurate records of the food received, its condition, and the distribution process.
                                    </li>
                                    <li>
                                        <strong>Beneficiary Reporting:</strong> Ensure that food is distributed to verified beneficiaries, and consider providing reports on the impact of your efforts.
                                    </li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">● Community Engagement:</h2>
                                <p class="mb-4">Actively engage with the community to assess their needs and improve your distribution strategies. This can involve:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Surveys and Feedback:</strong> Conducting surveys or obtaining feedback from beneficiaries to enhance service delivery.
                                    </li>
                                    <li>
                                        <strong>Partnerships:</strong> Collaborating with other local organizations to better meet the needs of those you serve.
                                    </li>
                                </ul>

                                <h2 class="text-2xl font-semibold mb-4">5. Food Donation Process</h2>
                                {/* <h1 class="text-3xl font-bold mb-6 text-center">NGO Responsibilities - Food Donations</h1> */}

                                {/* <!-- Existing Responsibilities --> */}
                                <h2 class="text-xl font-semibold mb-4">● Notification of Donations:</h2>
                                <p class="mb-4">When events generate leftover food, Evego Event will notify your NGO through the platform. The notification will include:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Type and Quantity of Food:</strong> Detailed information about the food available for donation, allowing NGOs to assess their ability to collect and distribute it.
                                    </li>
                                </ul>

                                <h2 class="text-xl font-semibold mb-4">● Timely Collection:</h2>
                                <p class="mb-4">NGOs are responsible for collecting donated food within a specified timeframe. This includes:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Schedule Coordination:</strong> Arranging pick-up times that align with the event organizers’ availability.
                                    </li>
                                    <li>
                                        <strong>Handling Missed Opportunities:</strong> Establishing a plan for what to do if collection cannot occur within the designated timeframe.
                                    </li>
                                </ul>

                                <h2 class="text-xl font-semibold mb-4">● Safe Transportation:</h2>
                                <p class="mb-4">Ensure that transportation for collected food adheres to safety standards. This involves:</p>

                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Temperature Control:</strong> Using insulated containers for perishable items to maintain required temperatures during transport.
                                    </li>
                                    <li>
                                        <strong>Cleanliness:</strong> Ensuring that vehicles used for food transportation are clean and suitable for food transport.
                                    </li>
                                </ul>
                                {/* <ul class="list-disc pl-5 mb-4">
                                    <li>Type and Quantity of Food: Detailed information about the food available for donation, allowing NGOs to assess their ability to collect and distribute it.</li>
                                    <li>Timely Collection: NGOs are responsible for collecting donated food within a specified timeframe.</li>
                                    <li>Safe Transportation: Ensure that transportation for collected food adheres to safety standards.</li>
                                </ul> */}

                                <h2 class="text-2xl font-semibold mb-4">6. Liability and Indemnification</h2>
                                <h2 class="text-2xl font-semibold mb-4">● NGO Liability:</h2>
                                <p class="mb-4">Your organization acknowledges that Evego Event is not liable for the condition or quality of the food once it is donated. Your NGO assumes full responsibility for the food from the time of collection, which includes:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Safety Assurance:</strong> Ensuring that food distributed is safe and suitable for consumption.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Monitoring Consumption Feedback:</strong> Keeping track of any feedback or complaints regarding food safety from recipients.
                                    </li>
                                </ul>

                                {/* <!-- Indemnification Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">● Indemnification:</h2>
                                <p class="mb-4">Your NGO agrees to indemnify and hold harmless Evego Event Pvt Ltd from any claims or damages arising from the distribution or consumption of the donated food, which encompasses:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Legal Fees:</strong> Covering any legal fees incurred by Evego Event in relation to such claims.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Insurance Requirements:</strong> NGOs should maintain appropriate insurance coverage to mitigate potential liabilities.
                                    </li>
                                </ul>

                                {/* <!-- Donor Liability Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">● Donor Liability:</h2>
                                <p class="mb-4">The food donor (event organizer) is responsible for the safety and quality of the food at the time of donation. Your organization agrees that:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>No Claims Against Donors:</strong> Once food is handed over, your NGO will not hold the donor liable for its condition.
                                    </li>
                                </ul>
                                <h3 class="font-semibold mb-2">Indemnification:</h3>
                                <p class="mb-4">
                                    Your NGO agrees to indemnify Evego Event from any claims, damages, or liabilities arising from the handling, storage, or distribution of donated food.
                                </p>

                                <h2 class="text-2xl font-semibold mb-4">7. Use of Donations </h2>
                                {/* <h1 class="text-3xl font-bold mb-6 text-center">NGO Responsibilities - Charitable Purposes & Recipients</h1> */}

                                {/* <!-- Charitable Purposes Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">● Charitable Purposes Only:</h2>
                                <p class="mb-4">Your NGO agrees that all donated food will be used exclusively for charitable purposes. This includes:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Distribution to Beneficiaries:</strong> Ensuring that food reaches individuals or families in need without any form of compensation.
                                    </li>
                                </ul>

                                {/* <!-- Eligible Recipients Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">● Eligible Recipients:</h2>
                                <p class="mb-4">Your organization must ensure that donated food is distributed in alignment with your mission. This involves:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Targeted Outreach:</strong> Identifying communities or groups that align with your mission and effectively reaching them.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Prioritization:</strong> Giving priority to vulnerable populations, such as low-income families, the elderly, or homeless individuals.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Awareness and Education:</strong> Providing resources to recipients about food safety and nutrition can enhance the overall impact of your work. This includes:
                                        <ul><li>○ Workshops or Seminars: Hosting events that educate recipients on nutritional value and safe food handling.
                                        </li><li> ○ Resource Distribution: Sharing pamphlets or materials that provide information about available community resources.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>


                                <h2 class="text-2xl font-semibold mb-4">8. Reporting and Transparency</h2>
                                <p class="mb-4">Your NGO may be required to maintain detailed records of food donations, which include:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Quantity and Type of Food:</strong> Documenting all received food, including its condition and safety assessments.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Beneficiary Information:</strong> Tracking the number of beneficiaries served while maintaining confidentiality of their information.
                                    </li>
                                </ul>
                                <p class="mb-4">Evego Event may request periodic reports on the impact of food donations. Your organization agrees to provide:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Impact Assessments:</strong> Evaluations that outline how donations have benefited the community, including statistical data.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Storytelling:</strong> Sharing success stories or testimonials from beneficiaries to illustrate the effectiveness of your efforts.
                                    </li>
                                </ul>

                                {/* <!-- Termination of Profile Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">9. Termination of Profile</h2>
                                <p class="mb-4"><strong>Termination by Evego Event:</strong> Evego Event reserves the right to suspend or terminate your NGO's profile for non-compliance with these terms, including:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Notification Process:</strong> A formal notification will be provided, along with the reasons for termination and an opportunity to rectify any issues.
                                    </li>
                                </ul>
                                <p class="mb-4"><strong>Voluntary Termination:</strong> Your NGO may terminate its profile by providing written notice to Evego Event. However, you must:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Fulfill Pending Donations:</strong> Complete any ongoing distributions before account closure to ensure beneficiaries receive their food.
                                    </li>
                                </ul>

                                {/* <!-- Data Privacy and Confidentiality Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">10. Data Privacy and Confidentiality</h2>
                                <p class="mb-4"><strong>Personal Information:</strong> All personal and operational information provided during registration will be securely stored. This information is only used for food donation coordination and is protected by data privacy laws.</p>
                                <p class="mb-4"><strong>Confidentiality:</strong> Sensitive information shared between your NGO and Evego Event will be treated as confidential, ensuring that:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>No Unauthorized Access:</strong> Only authorized personnel will have access to sensitive data.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Data Sharing Protocols:</strong> Clear protocols will be established for any necessary sharing of information with third parties.
                                    </li>
                                </ul>
                                <p class="mb-4"><strong>Data Retention:</strong> Your organization’s data will be retained only for as long as necessary to fulfill the purposes outlined in these terms, with secure deletion protocols in place afterward.</p>

                                {/* <!-- Amendments to Terms Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">11. Amendments to Terms</h2>
                                <p class="mb-4"><strong>Changes to Terms:</strong> Evego Event reserves the right to amend or update these terms and conditions at any time. Notification of any changes will be communicated to your NGO through:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Email Alerts:</strong> Sending notifications directly to the registered email addresses.
                                    </li>
                                    <li class="mb-2">
                                        <strong>Platform Updates:</strong> Posting updates in a dedicated section on the platform for easy access.
                                    </li>
                                </ul>

                                {/* <!-- Dispute Resolution Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">12. Dispute Resolution</h2>
                                <p class="mb-4"><strong>Dispute Handling:</strong> Any disputes related to food donations should be resolved directly between your NGO and Evego Event. If a resolution cannot be reached:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Mediation Services:</strong> Evego Event may offer mediation services to facilitate a resolution.
                                    </li>
                                </ul>
                                <p class="mb-4"><strong>Final Decision:</strong> Evego Event’s decision in any dispute related to food donations will be final and binding, ensuring that:</p>
                                <ul class="list-disc pl-5 mb-4">
                                    <li class="mb-2">
                                        <strong>Adherence to Decisions:</strong> Both parties must comply with the outcomes determined through the mediation process.
                                    </li>
                                </ul>

                                {/* <!-- Governing Law Section --> */}
                                <h2 class="text-2xl font-semibold mb-4">13. Governing Law</h2>
                                <p class="mb-4">These terms and conditions are governed by the laws of the jurisdiction in which Evego Event Pvt Ltd operates. Any disputes arising under these terms will be resolved according to these laws, which provide a framework for enforcement and compliance.</p>
                            </section>
                        </div>

                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            aria-label="Close Terms and Conditions"
                            onClick={() => setShowTnc(false)}
                        >
                            &times;
                        </button>
                    </div>

                    <button
                            className="absolute bottom-2  bg-gray-400 p-2 rounded-lg text-gray-600 hover:text-gray-900"
                            aria-label="Close Terms and Conditions"
                            onClick={() => setShowTnc(false)}
                        >
                            Close
                        </button>

                </div>


            )}
        </div>
    );
}
