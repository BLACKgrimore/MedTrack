'use client'
import Axios from "@/utils/axios";
import { useEffect, useState } from "react";

const Invitation = () => {
    const [card, setCard] = useState(null);
    const [details,setDetails]=useState(null);
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const bookingId = searchParams.get("bookingid")
        console.log(bookingId);
        const getCard = async () => {
            const resp = await Axios.post("/user/getCarddetails", {
                bookingId: bookingId
            });
            console.log(resp.data.resp.cards);
            const data = resp.data.resp.cards;
            setCard(data);
            setDetails(data.formData);

        }
        getCard();
    }, [])
    const keys=Object.keys(details?details:{});
    console.log("These are keys>>",keys);
    return (
        <div className="p-20 h-screen w-screen  flex items-center justify-center ">
            <div style={{
                backgroundImage: `url(${card?card.selectedCard:""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} className="h-screen w-[90%] flex items-center justify-center flex-col">
                {keys?keys.map((item,index)=>(<h1 key={index} className="text-5xl text-black">{details?details[item]:"Loading..."}</h1>)):""}
            </div>
        </div>
    )
}
export default Invitation;
