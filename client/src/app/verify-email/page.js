// pages/verify-email.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';

const VerifyEmail = () => {
    const router = useRouter();
    // const [token, setToken] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            console.log("inside email verify front")
            const searchParams = new URLSearchParams(window.location.search)
            const token = searchParams.get("token");    // Get 'id' param from the URL
            
            console.log("tokenparams",token)
            if (token) {
                try {
                    console.log("calling verify email")
                    const respo = await axios.post(`/user/verify-email`, {token});
                    router.push('/signin'); // Redirect to sign-in page
                    alert("Email verified successfully!");
                } catch (error) {
                    alert("Verification failed. Please try again.");
                }
            }
        };

        verifyEmail();
    }, []);

    return <div className='pt-16 bg-pink-100 text-xl'>Verifying your email...</div>;
};

export default VerifyEmail;
