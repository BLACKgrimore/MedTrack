import axios from "axios";
import Cookies from "js-cookie";
const accessToken = Cookies.get("accessToken")
console.log(accessToken)
const Axios = axios.create({
     baseURL: "https://api.evego.in/api/v1",
//    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`,  // Sending token in Authorization header
    }

})

export default Axios


// import axios from "axios";
// import Cookies from "js-cookie";

// // Function to get the current access token from cookies
// const getAccessToken = () => Cookies.get("accessToken");

// Function to refresh the access token using the refresh token
// const refreshAccessToken = async () => {
//     try {
//         const refreshToken = Cookies.get("refreshToken"); // Assuming you store the refresh token in cookies
//         // const response = await axios.post("https://api.evego.in/api/v1/user/refresh", { token: refreshToken });
//         const response = await axios.post("https://localhost:8080/api/v1/user/refresh", { token: refreshToken });
        
//         if (response.status === 200) {
//             const newAccessToken = response.data.accessToken;
//             Cookies.set("accessToken", newAccessToken); // Update the cookie with the new access token
//             return newAccessToken;
//         } else {
//             throw new Error("Failed to refresh token");
//         }
//     } catch (error) {
//         console.error("Error refreshing token", error);
//         return null; // If token refresh fails, return null
//     }
// };

// Create the Axios instance with base configuration
// const Axios = axios.create({
//     // baseURL: "https://api.evego.in/api/v1",
//      baseURL: "http://localhost:8080/api/v1",
//     withCredentials: true, // This ensures cookies are sent with requests
// });

// Request Interceptor: Attach the access token to headers before each request
// Axios.interceptors.request.use(
//     (config) => {
//         const token = getAccessToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error); // Reject the promise if there's an error
//     }
// );

// Response Interceptor: Handle token expiration and refresh token if needed
// Axios.interceptors.response.use(
//     (response) => {
//         // If the response is successful, return the response
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         // Check if the error is due to an expired token (status 401)
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; // Prevent infinite loop

//             const newAccessToken = await refreshAccessToken();

//             if (newAccessToken) {
//                 // Update the Authorization header with the new token and retry the request
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return Axios(originalRequest); // Retry the original request with the new token
//             } else {
//                 // If token refresh fails, redirect to login or handle accordingly
//                 window.location.href = "/signin"; // Redirect to login page or handle it
//                 return Promise.reject(error);
//             }
//         }

//         return Promise.reject(error); // Return the error if it's not related to token expiration
//     }
// );

// export default Axios;
