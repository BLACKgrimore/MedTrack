'use client';
import React, { useEffect, useState } from 'react';
import { PiGlobeHemisphereEastThin } from "react-icons/pi";
import { FaArrowDown, FaArrowUp, FaMapMarkedAlt } from "react-icons/fa";
import { IoPricetagsOutline, IoSearch } from "react-icons/io5";
import ServiceCard from './ServiceCard';
import Axios from '@/utils/axios.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

const Search = () => {
    const router = useRouter();

    const [location, setLocation] = useState('');
    const [service, setService] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [services, setServices] = useState([]);
    // const router = useRouter();
    const [tags, setTags] = useState(true);
    const minPrice = 0; // Default or parsed from priceRange
    const maxPrice = 5; // Default or parsed from priceRange
    const serviceArray = ["Dj", "Event Manager", "Car Rentals", "Banquet Hall", "Marriage Hall", "Restraunt", "Anchor", "Singer", "Dancer", "Decorator", "Game", "Photo Grapher", "Video Grapher", "Pandit", "Fashion Design", "Crockery", "Body Guard", "Jewellery", "Clothes Wedding", "Marriage", "Birthday", "Babyshower", "Fresher Party", "Fair Well", "Annual Function", "Ceremony", "Anniversary", "Pooja", "Designer ", "Photography"]

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const toggleFilter = () =>
        setIsFilterVisible(!isFilterVisible);

    const priceRanges = [
        [5000, 10000],
        [10000, 15000],
        [15000, 20000],
        [20000, 25000],
        [25000, 30000],
        [35000, 40000],
        [45000, 50000],
        [55000, 60000],
        // Add more ranges as needed
    ];


    const sortServicesByPrice = (order) => {
        const sorted = [...services].sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
        setServices(sorted);
    };



    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const plocation = searchParams.get('location');
        const pservice = searchParams.get('service');
        const pprice = searchParams.get('price');

        if (pservice && !plocation && !pprice) {
            setLocation("N/M");
            setService(pservice);
            setPriceRange("N/M");
            setSelectedPriceRange("N/M")
            // handleService(pservice)
        }


        if (plocation && pservice && pprice) {
            setLocation(plocation);
            setService(pservice);
            setPriceRange(pprice);
            setSelectedPriceRange("N/M")
            // Trigger the search when all params are present
            handleSearch();
        }
    }, []);

    const handletag = (e, item) => {
        e.preventDefault()
        console.log("clicked", item);
        handleSearch("N/M", item, "N/M");
    }

    // const handleService = async (serviceName) => {
    //     console.log("clicked service", serviceName)
    //     try {
    //         console.log("before api calling")
    //         const res = await Axios.post('/user/searchservice', serviceName);
    //         setServices(res.data);
    //         console.log(res)


    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    // Handle search when search button is clicked or when params are set
    const handleSearch = async (loc = location, srv = service, price = priceRange, minprice = selectedPriceRange) => {
        // console.log("search params", loc, srv, price, minprice);
        const data = {
            location: loc || 'N/M',
            serviceName: srv,
            minPrice: parseInt(minprice) || 0,
            maxPrice: parseInt(price)
        };
        console.log("This is the price", price)
        console.log("This is the data", data)
        try {
            const resp = await Axios.post("/user/search", data);
            console.log("This is the search data", resp.data);
            setServices(resp.data);
            /* setLocation("");
            setService("");
            setPriceRange(""); */
            // Assuming the API returns data in `resp.data`
        } catch (error) {
            toast.info("please login first")
            router.push("/signin")
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col font-serif bg-veryLightPurple">
            {/* Hero Section */}
            <div className='bg-[url("/search.png")] bg-cover bg-center bg-no-repeat text-white flex flex-col
                            justify-center items-center xxlg:h-[35rem] xxxl:h-[45rem] xsm:h-[20rem] md:h-[30rem]
                            lg:h-[30rem] w-full'>
                <h1 className="xsm:text-4xl sm:text-6xl md:text-8xl lg:text-9xl">Search</h1>
            </div>

            {/* Search Form */}
            <div className="h-fit w-[98vw] flex flex-col p-4">
                <div className="bg-white h-fit w-fit text-black rounded-xl p-2 text-sm self-center flex flex-col sm:flex-row
            text-center justify-around content-center space-y-2 sm:space-y-0 sm:space-x-4 shadow-xl xsm:ml-2
            xxxl:w-[45rem] xxlg:w-[40rem] lg:w-[38rem] md:w-[38rem] sm:w-[30rem] xsm:w-[20rem] 320:w-[15rem]">

                    {/* Search Input 1: Location */}
                    <div className="relative flex items-center focus-within:text-lightorange">
                        <PiGlobeHemisphereEastThin className="w-4 h-8 absolute ml-2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Location"
                            autoComplete="off"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-8 pr-2 w-full sm:max-w-[9rem] 320:max-w-[7rem] py-2 border-[1px] 
                           border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                        />
                    </div>

                    {/* Search Input 2: Service Category */}
                    <div className="relative flex items-center focus-within:text-lightorange">
                        <FaMapMarkedAlt className="w-4 h-8 absolute ml-2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Service Category"
                            autoComplete="off"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="pl-8 pr-2 w-full sm:max-w-[9rem] 320:max-w-[7rem] py-2 border-[1px]
                           border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                        />
                    </div>

                    {/* Search Input 3: Price Range */}
                    <div className="relative flex items-center focus-within:text-lightorange">
                        <IoPricetagsOutline className="w-4 h-8 absolute ml-2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Price Range"
                            autoComplete="off"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="pl-8 pr-2 w-full sm:max-w-[9rem] 320:max-w-[7rem] py-2 border-[1px]
                           border-veryLightGray rounded-full focus:outline-none focus:border-lightorange"
                        />
                    </div>

                    {/* Search Button */}
                    <div className="flex items-center bg-[#D086AB] px-3 py-2 rounded-full border-[1px] border-black 
                        justify-between space-x-2 sm:space-x-3 320:space-x-1">
                        <button
                            onClick={() => {
                                setSelectedPriceRange(0);
                                handleSearch(location, service, priceRange, selectedPriceRange);
                            }}
                            className="text-black text-[.8rem] sm:text-[1rem] 320:text-[.7rem]"
                        >
                            Search
                        </button>
                        <IoSearch className="h-5 w-5 sm:h-6 sm:w-6 320:h-4 320:w-4" />
                    </div>
                </div>
                {tags ? <h1 className="inline-block text-center m-5 text-3xl ">Popular Tags</h1> : ""}
                {tags ? <div className="flex flex-wrap gap-2 m-5 mx-auto h-20 cursor-pointer overflow-auto">
                    {serviceArray.map((item, index) => (
                        <span key={index} onClick={(e) => { setService(item); handletag(e, item) }} className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition duration-300 flex">
                            {item}
                        </span>
                    ))}
                </div> : ""}

                <div className="flex flex-col lg:gap-24 sm:flex-row">
                    {/* Sidebar */}
                    {services.length > 0 && (
                        <div className={`sm:w-64 xsm:w-10 p-4 rounded-lg`}>
                            {/* Price filtering menu */}
                            <div className="relative">
                                {/* Toggle button for small screens */}
                                <button
                                    onClick={toggleFilter}
                                    className="sm:hidden text-black bg-lightgray py-2 px-4 flex justify-between items-center"
                                >
                                    <span>Filters</span>
                                    <span>{isFilterVisible ? "-" : "+"}</span>
                                </button>

                                {/* Sidebar for price range filtering */}
                                <div
                                    className={`absolute sm:relative z-20 sm:z-auto left-0 sm:top-0 sm:block top-12 lg:w-[340px] rounded-lg mt-4 p-4 bg-white shadow-lg transition-transform duration-300 transform ${isFilterVisible ? "block" : "hidden sm:block"
                                        }`}
                                >
                                    <h3 className="text-lg font-bold mb-4">Filter by Price</h3>
                                    <ul>
                                        {priceRanges.map((range, index) => (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setSelectedPriceRange(range[0]);
                                                    setPriceRange(range[1]);
                                                    handleSearch(location, service, priceRange, selectedPriceRange); // Trigger search with selected price range
                                                }}
                                                className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                                            >
                                                ₹{range[0]} - ₹{range[1]}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Sort buttons */}
                                    <div className="flex space-x-2 mt-4">
                                        <button
                                            onClick={() => sortServicesByPrice("asc")}
                                            className="border border-black text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
                                        >
                                            <FaArrowUp className="mr-2" /> Ascending
                                        </button>
                                        <button
                                            onClick={() => sortServicesByPrice("desc")}
                                            className="border border-black text-black px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
                                        >
                                            <FaArrowDown className="mr-2" /> Descending
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Service Cards */}
                    <div className="flex gap-4">
                        <div className="h-fit w-full rounded-xl text-black text-sm self-center flex flex-col text-center justify-around content-center md:space-x-4 xsm:space-x-2">
                            <div className="m-6 h-[100vh] overflow-auto grid gap-4"> {/* Added grid and gap */}
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <ServiceCard key={service._id} service={service} />
                                    ))
                                ) : (
                                    <p className="text-4xl">No services found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Search;
