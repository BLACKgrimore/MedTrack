"use client";
import Link from 'next/link';
import { React, useState } from 'react';
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from 'react-toastify';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: '',
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => { // Mark as async
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        const dataToSend = {
            fullname: formData.fullname,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
        }

        try {
            console.log(dataToSend);
            // Uncomment when ready to use axios
            /* 
            const response = await axios.post("/user/contactus",
                dataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (response.status === 200) {
                console.log("Form submitted successfully:", response.data);

                // Show success message
                toast.success("Thanks for contacting us!");

                // Clear the form fields
                setFormData({
                   fullname: "",
                   phone: "",
                   email: "",
                   message: "",
                });
            } else {
                toast.error("Form submission failed");
            }
            */
        } catch (error) {
            console.error("An error occurred while submitting the form:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="bg-[#e9d1ec] py-8 md:space-y-[-20rem] xsm:space-y-[-10rem]">
            <div className='bg-[url("/contactus.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col
                        justify-center items-start py-8 xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[20rem] md:h-[30rem]
                        lg:h-[30rem] gap-8 '>
            </div>

            <div className="md:w-[55vw] xsm:w-[80vw] drop-shadow-2xl py-6 text-black mx-auto bg-white px-2 rounded-3xl outline outline-[1px]">
                <form className='flex flex-col justify-center items-center h-fit space-y-5 lg:px-6 xsm:px-2' onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center justify-center space-y-1">
                        <h1 className="md:text-4xl xsm:text-3xl font-bold">Contact MedTrack</h1>
                        <p>Drop Your Queries & We'd Love To Help</p>
                    </div>

                    <input value={formData.fullname} onChange={handleInputChange} className="w-full p-2 text-black bg-[#f9eaea] focus:outline-double" type="text" name="fullname" placeholder="Fullname" />
                    <input value={formData.email} onChange={handleInputChange} className="w-full p-2 text-black bg-[#f9eaea] focus:outline-double" type="email" name="email" placeholder="Email address" />
                    <input value={formData.phone} onChange={handleInputChange} className="w-full p-2 text-black bg-[#f9eaea] focus:outline-double" type="number" name="phone" placeholder="Phone" />
                    <textarea value={formData.message} onChange={handleInputChange} className="w-full p-2 text-black bg-[#f9eaea] focus:outline-double" name="message" rows="5" placeholder="Message"></textarea>

                    <button className="bg-[#ff8f50] p-2 text-white px-6 rounded-lg " type="submit">Get in Touch</button>
                </form>

                <div className="flex lg:flex-row xsm:flex-col w-full justify-between items-center gap-4 pt-4 px-4">
                    <div className="flex flex-row gap-5">
                        <Link href="https://wa.me/+918102692900" target='_blank' className='flex flex-row'>
                            <FaWhatsapp className='w-10 text-green-500 h-10' />
                            <div className="self-center">+91 9389247597</div>
                        </Link>
                        
                    </div>
                    <Link href="mailto:evegoevent@gmail.com" className="flex flex-row  ">
                        <BiLogoGmail className='w-10 text-red-500 h-10' />
                        <div className="self-center">medtrack@gmail.com</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
