import axios from "axios";
import Cookies from "js-cookie";
const accessToken = Cookies.get("accessToken")
console.log(accessToken)
const Axios = axios.create({
   baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`,  // Sending token in Authorization header
    }

})

export default Axios
