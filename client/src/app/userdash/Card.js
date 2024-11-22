import Axios from '@/utils/axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Card({ profile }) {
    const router = useRouter();
    const [isTnCOpen, setIsTnCOpen] = useState(false)
    /* console.log(profile); */

    const [formData, setFormData] = useState({

        phone: '',
        address: '',
        pin: '',
        qtyOfFood: '',

    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTnCOpen(false)
    }

    const handleNotificationNgo = async (e) => {

        const phoneRegex = /^[6-9]\d{9}$/;  // Valid Indian phone numbers start with 6-9 and have 10 digits

        if (!phoneRegex.test(formData.phone)) {
            toast.error("Invalid phone number. Please enter a valid 10-digit phone number.");
            return;
        }
        // Optional: Validate PIN (e.g., check if it's a 6-digit number)
        const pinRegex = /^[1-9][0-9]{5}$/;
        if (!pinRegex.test(formData.pin)) {
            toast.error("Invalid PIN code. Please enter a valid 6-digit PIN.");
            return;
        }

        try {
            const response = await Axios.post('/user/requestngo', {
                phone: formData.phone,
                location: formData.address,
                pin: formData.pin,
                qtyOfFood: formData.qtyOfFood,
                ngo_id: e
            });

            // Optionally reset the form after successful submission
            setFormData({
                phone: '',
                address: '',
                qtyOfFood: '',
                pin: '',
            });

            // Redirect user to dashboard after form submission
            toast.success("Request sent!")
            window.location.reload('/userdash')
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <>
            <div className="relative drop-shadow-xl w-full min-h-12 overflow-hidden rounded-xl bg-white p-5">
                <div className="flex space-x-5 items-center justify-start">
                    <img
                        className="rounded-full"
                        src={
                            "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"
                        }
                        height={100}
                        width={100}
                    />
                    <span className="font-bold text-lg uppercase">{profile.username}</span>
                </div>
                <div className="text-lg mt-3">
                    <div className="flex space-x-4">
                        <span className="font-bold">Email:</span>
                        <span>{profile.email}</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="font-bold">Phone Number:</span>
                        <span>{profile.phoneNumber}</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="font-bold">Location:</span>
                        <span>{profile.location}</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="font-bold">Is Veg:</span>
                        <span>{profile.isVeg ? "Yes" : "No"}</span>
                    </div>
                </div>


                <div className={`mt-5 cursor-pointer`} onClick={() => setIsTnCOpen(true)} /* onClick={() => handleNotificationNgo(profile._id)} */>
                    <button className={`w-24 bg-gray-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded transition-all duration-300  `}>
                        Request
                    </button>
                </div>



            </div>











            {isTnCOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 overflow-y-auto">
                    <div className="max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                            Food Order Form
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username */}


                            {/* Phone */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Address:</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Pin Code:</label>
                                <input
                                    type="number"
                                    name="pin"
                                    value={formData.pin}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Quantity of Food */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Quantity of Food:</label>
                                <input
                                    type="number"
                                    name="qtyOfFood"
                                    value={formData.qtyOfFood}
                                    onChange={handleChange}
                                    required

                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}


                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    onClick={() => handleNotificationNgo(profile._id)}
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                >
                                    <p className="text-center my-auto mx-auto">Submit Now</p>
                                </button>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setIsTnCOpen(false)} className="bg-gray-400 text-white py-1 px-4 rounded">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </>
    )
}

export default Card