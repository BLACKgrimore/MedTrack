import { useState, useEffect } from 'react';
import axios from './axios.js'; // Custom Axios instance with interceptors
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authenticated state
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            const accessToken = Cookies.get('accessToken');
            if (!accessToken) {
                // No token, redirect to login
                setLoading(false);
                router.push('/signin');
                return;
            }

            try {
                // Verify token by calling the backend API (or interceptors will refresh it)
                await axios.get('/user/verifytoken'); // Example API endpoint
                setIsAuthenticated(true);
            } catch (error) {
                // Token is invalid or expired, redirect to login
                setIsAuthenticated(false);
                Cookies.remove("type")
                Cookies.remove("access")
                Cookies.remove("accessToken")
                Cookies.remove("refreshToken")
                window.location.href = '/signin';
                // router.push('/signin');
            } finally {
                setLoading(false); // Stop loading when the process completes
            }
        };

        verifyToken();
    }, [router]);

    return { loading, isAuthenticated };
};
