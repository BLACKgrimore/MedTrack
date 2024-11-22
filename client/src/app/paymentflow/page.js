import React from 'react'
import { MdArrowRightAlt } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa";


const PaymentFlow = () => {
    return (
        <>
            <div className="pt-20 w-full bg-veryLightPink ">
                <div className="h-fit flex  flex-row justify-center w-full  border-b-slate-300 border ">
                    <div className="h-fit flex flex-row justify-center w-[80%] md: pl-52 xsm:pl-0">
                        <div className="flex flex-row items-center">
                            <h1 className="text-center text-green-500 underline decoration-solid">Book</h1><MdArrowRightAlt className="w-10 h-12" />
                        </div >
                        <div className="flex flex-row items-center ">
                            <h1 className="text-center">Address</h1><MdArrowRightAlt className="w-10 h-12" />
                        </div>
                        <div className="items-center flex flex-row  ">
                            <h1 className="text-center ">Payment</h1>
                        </div>
                    </div>
                    <div className="w-[20%] md:flex xsm:hidden justify-end" >
                        <img src="/paymentflow/secure.png" />
                        <div className="items-center">100% secure</div>
                    </div>
                </div>

            </div>
            <div className="flex md:flex-row xsm:flex-col-reverse md:gap-0 xsm:gap-16 bg-veryLightPink ">
                <div className="bg-veryLightPink md:w-[70vw] xsm:w-full">
                    <div className="space-y-24">
                        <div className="w-full h-20 bg-veryLightPink flex md:flex-row xsm:flex-col item-center justify-between p-6  md:space-y-0 xsm:space-y-4 border-b-slate-300 border ">

                            <h1 className="font-semibold text-2xl  ">1. Check Availability</h1>

                            <div className="">
                                <input type="date" className="text-2xl rounded-xl p-2" />
                            </div>

                            <div className="text-green-500 text-2xl  ">
                                change
                            </div>
                        </div>

                        <div className="w-full h-20 bg-veryLightPink flex md:flex-row xsm:flex-col item-center justify-between p-6 py-4 md:space-y-0 xsm:space-y-4 border-b-slate-300 border ">

                            <h1 className="font-semibold text-2xl  ">1. Check your Services and Cart</h1>

                            <div className="">
                                <button className="text-xl rounded-xl p-2 border-[#FFD600] bg-orange-200 border drop-shadow-md text-grey">
                                    View Cart
                                </button>
                            </div>

                            <div className="text-green-500 text-2xl  ">
                                change
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-fit  bg-veryLightPink xsm:mt-24 md:mt-0  flex flex-row border-black p-6">
                        <ol>
                            <li className=" text-2xl  text-red-600 font-semibold ">3. Choose Payment Mode</li>

                        </ol>
                    </div>
                    <div className="w-[80%] bg-pink-50 flex flex-col ml-10 p-6 rounded-xl drop-shadow-lg">
                        <div className="w-[90%] h-fit border-solid border-2  border-pink-200  p-7 rounded-lg">
                            <label>
                                <input type="radio" name="option" value="Option 1" className="form-radio h-5 w-5 text-blue-600" />
                                <span className="font-semibold md:text-2xl p-2 xsm:text-lg " >Credit or Debit card</span>

                                <div className="flex flex-row space-x-9 p-5">
                                    <div>
                                        <img src="/paymentflow/visa.png"></img>
                                    </div>
                                    <div >
                                        <img src="/paymentflow/rupay.png"></img>
                                    </div>

                                    <div>
                                        <img src="/paymentflow/paypal.png" className="w-9"></img>
                                    </div>

                                    <div >
                                        <img src="/paymentflow/master.png"></img>
                                    </div>

                                    <div>
                                        <img src="/paymentflow/discover.png"></img>
                                    </div>
                                    <div>
                                        <img src="/paymentflow/diners.png"></img>
                                    </div>
                                    <div>
                                        <img src="/paymentflow/american.png"></img>
                                    </div>
                                </div>
                            </label>
                            <div className="flex flex-row p-1">
                                <div className="text-green-500 md:text-xl xsm:text-sm m-2">
                                    Enter Card Details-
                                </div>
                                < div className="  md:text-xl xsm:text-sm">Evego Event accepts all credits and cards</div>
                            </div>
                        </div>
                        <div className="w-full h-fit border-solid border-0 border-grey  p-7">
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="option" value="Option 2" className="form-radio h-5 w-5 text-blue-600" />
                                <span className="font-semibold md:text-2xl xsm:text-lg p-2">Net Banking</span>
                            </label>
                            <div className="text-black border-solid border-2 border-black w-40  p-1 h-8 rounded-md "><p>Choose an Option:</p>
                            </div>
                        </div>
                        <div>
                            <div className="w-[90%] h-fit border-solid border-2 border-pink-200  p-7 rounded-lg">
                                <label className="flex items-center space-x-3">
                                    <input type="radio" name="option" value="Option 2" className="form-radio h-5 w-5 text-blue-600" />
                                    <span className="font-semibold  md:text-2xl xsm:text-lg ">Other UPI Apps</span>
                                </label>
                                < div className="md:text-xl xsm:text-sm">Please Enter your UPI ID</div>
                                <div className="flex md:flex-row xsm:flex-col space-x-3">
                                    <input type="text" className=" border-solid border-2  rounded-md p-2 w-40 text-gray-400 text-wrap bg-white" placeholder="Enter UPI ID" />
                                    <div >
                                        <input type="text" className=" border-solid border-2 rounded-md p-2 w-16 text-gray-400 text-wrap bg-orange-200 " placeholder="Verify" />
                                    </div>
                                </div>
                                <div className="md:text-xl xsm:text-sm">
                                    The UPI ID is in the format of name/phone number@bankname
                                </div>


                            </div>
                        </div>
                        <div className="w-[50%] h-fit border-solid border-0 border-pink-200 p-7 rounded-lg">
                            <label className="flex items-center space-x-3">
                                <input type="radio" name="option" value="Option 2" className="form-radio h-5 w-5 text-blue-600" />
                                <span className="font-semibold  md:text-2xl xsm:text-lg ">EMI</span>
                            </label>
                            <div className="text-black border-solid border-2 border-black w-40  p-1 h-8 rounded-md"><p>Choose an Option:</p>
                            </div>
                        </div>
                        <div>
                            <div className="w-full h-fit border-solid border-0 border-grey  p-7">
                                <label className="flex items-center space-x-3">
                                    <input type="radio" name="option" value="Option 2" className="form-radio h-5 w-5 text-blue-600" />
                                    <span className="font-semibold  md:text-2xl xsm:text-lg ">Cash on Delivery/Pay on Delivery</span>
                                </label>
                                <div className="flex flex-row flex-wrap ">
                                    <div className="mx-7 md:text-xl xsm:text-sm">Cash, UPI and Cards accepted.</div>
                                    <div className="text-green-500 md:text-xl xsm:text-sm pl-7">
                                        Know more
                                    </div>
                                </div>
                                <div className="flex md:flex-row xsm:flex">
                                    <input type="button" className=" border-solid border-2 rounded-md p-2  w-[28%] text-gray-400 text-wrap bg-orange-200 " placeholder="Use this Payment Method" />
                                </div>
                            </div>
                        </div>
                        <hr className="h-1px w-[60%]  bg-slate-600"></hr>
                    </div>

                    <div className="w-full h-fit flex flex-row space-x-32 border-black">
                        <ol>
                            <li className="font-semibold text-2xl ">4. Offers</li>
                        </ol>
                    </div>
                    <hr className="h-8px w-[60%] mx-14 bg-slate-600"></hr>
                    <div className="w-full h-fit  flex flex-row space-x-32 border-black">
                        <ol>
                            <li className="font-semibold text-2xl">5. Terms and Conditions</li>
                        </ol>
                    </div>
                    <hr className="h-1px w-[60%]  bg-slate-600"></hr>
                    <div className="w-[90%] bg-verylightpink  p-2 rounded-xl">
                        <div className="flex flex-row">
                            <div>
                                Need help? Check our
                            </div>
                            <div className="text-green-400 ">
                                help page
                            </div>
                            <div  >or</div>
                            <div className="text-green-400 " >
                                contact us
                            </div>
                        </div>
                        <h1 className="font-bold">Fee Policy</h1>
                        To bridge the gap between you and your chosen vendor, we will be charging a nominal fee which will vary on the services you require.
                        In order to get your booking confirmed, you are required to pay a booking amount as per the estimated total cost.

                        <h1 className="font-bold">Booking Cancellation Policy</h1>
                        All users must be responsible for their bookings made by them on this platform. Bookings that are cancelled before our confirmation will not be charged. Furthermore, if any user consistently books and cancels their booking repetitively, they may be permanently prohibited to use the platform.
                        However, if you cancel the booking after ** minutes or after confirmation, you will be charged **% on your booking amount.

                        <h1 className="font-bold">Booking Rejection Policy</h1>
                        Our team holds the right to reject a booking if you:
                        <ul className="list-disc list-inside">
                            <li>Use inappropriate or vulgar words while stating your requirement</li>
                            <li>Offend, abuse or discriminate against anyone in terms of age, sex, nationality, caste or religion as stated above, in this case, your account will also be blocked from further usage</li>
                        </ul>
                        <h1 className="font-bold">E-cash</h1>
                        E-cash are the reward points that can be collected by a customer in the wallet of their Event Baja profile. You can redeem their e-cash while booking an order which is eligible for e-cash usage on the platform.
                        However, there is a cap to redeem the e-cash while booking. You can redeem the number of e-cash which is equal to the discount amount (if applicable) on a particular booking irrespective of the e-cash you have in excess in your wallet.
                        For an instance, if an order price is Rs 10,000 with a vendor offer discount of 10% on it and is also eligible to redeem e-cash, you can redeem 1000 e-cash (which is equal to the discount amount) on this order. Hence, your effective price for this particular order after availing 10% vendor offer discount and redeeming the e-cash comes at Rs 8000.
                    </div>

                </div>

                <div className="bg bg-pink-50 w-[25%] h-fit p-8  drop-shadow-xl ">
                    <h1 className="p-6 font-bold">COUPONS</h1>
                    <div className="flex flex-row  space-x-16">
                        <div>
                            Apply Coupons
                        </div>
                        <div className="border-red-500 rounded-lg border-2 text-red-500 font-bold w-14 px-1">
                            Apply
                        </div>
                    </div>
                    <hr className="h-1px w-full my-4 mx-4 bg-slate-600"></hr>
                    <h1 className="text-xs font-bold">
                        SUPPORT TRANSFORMATIVE SOCIAL
                        WORK IN INDIA</h1>
                    <div className="flex flex-row">
                        <input type="checkbox" /><p className="text-xs m-2">Donate and make a Difference</p>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div className="border-2 border-solid border-black rounded-xl w-16 px-1">RS 10
                        </div>
                        <div className="border-2 border-solid border-black rounded-xl w-16 px-1">RS 20
                        </div>
                        <div className="border-2 border-solid border-black rounded-xl w-16 px-1">RS 50
                        </div>
                        <div className="border-2 border-solid border-black rounded-xl w-16 px-1">RS 100
                        </div>
                    </div>
                    <p className="text-red-600 p-4">Know more</p>
                    <hr className="h-1px w-[90%] mx-3 mr-8 bg-slate-600"></hr>
                    <h1 className="font-bold text-xl">Price Details</h1>

                    <div className="flex flex-row space-x-40">
                        <div>
                            Total MRP:
                        </div>
                        <div>
                            Rs. 1800
                        </div>
                    </div>
                    <div className="flex flex-row space-x-6 w-full justify-around items-center">
                        <div className="w-full my-1">
                            Discount on MRP:
                        </div>
                        <div className="text-red-600 text-xs -mx-7 w-56">
                            know more
                        </div>
                        <div className="text-green-600 w-full">
                            Rs. -1000
                        </div>
                    </div>
                    <div className="flex flex-row space-x-20 my-1">
                        <div>
                            Coupan Discount
                        </div>
                        <div className="text-red-600">
                            Apply Coupan
                        </div>
                    </div>
                    <div className="flex flex-row space-x-6 w-full justify-around items-center my-3">
                        <div className="w-full my-1">
                            Platform Fee:<span className="text-red-600 p-2">know more</span>
                        </div>
                        <div>
                            Rs.20
                        </div>
                    </div>
                    <hr className="h-1px w-[90%] mx-3 mr-8 my-4 bg-slate-600"></hr>
                    <div className="flex flex-row space-x-32">
                        <div className="text-red-600 font-bold text-xl">
                            Order Total:
                        </div>
                        <div>
                            Rs.1720
                        </div>
                    </div>
                    <hr className="h-1px w-[90%] mx-3 mr-8 my-4 bg-slate-600"></hr>

                </div>

            </div>

        </>
    )
}

export default PaymentFlow;
