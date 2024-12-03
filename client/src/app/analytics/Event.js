// components/PharmaceuticalPerformance.js
import Axios from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { RiMenuUnfold4Fill } from "react-icons/ri";

const colors = [
    'border-red-500',     // Red
    'border-blue-500',    // Blue
    'border-green-500',   // Green
    'border-yellow-500',  // Yellow
    'border-purple-500',  // Purple
    'border-pink-500',    // Pink
    'border-orange-500',  // Orange
    'border-teal-500',    // Teal
    'border-indigo-500',  // Indigo
    'border-emerald-500'  // Emerald
];

const texts = [
    'text-red-500',     // Red
    'text-blue-500',    // Blue
    'text-green-500',   // Green
    'text-yellow-500',  // Yellow
    'text-purple-500',  // Purple
    'text-pink-500',    // Pink
    'text-orange-500',  // Orange
    'text-teal-500',    // Teal
    'text-indigo-500',  // Indigo
    'text-emerald-500'  // Emerald
];

const radnomIndexGenerator = () => {
    return Math.floor(Math.random() * 9);
}

const PharmaceuticalPerformance = () => {
    const [medicinesSold, setMedicinesSold] = useState(null);

    useEffect(() => {
        const getPharmaceuticalPerformance = async () => {
            // Fetch pharmaceutical performance data (e.g., sales and inventory)
            const resp = await Axios.get('/admin/pharmaceuticalperformance');
            console.log(resp.data);
            setMedicinesSold(resp.data.data);
        }
        getPharmaceuticalPerformance();
    }, []);

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md shadow-orange-600 md:w-[50vw] xsm:w-full">
            <h2 className="text-4xl font-bold mb-4">Pharmaceutical Performance</h2>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Top Performing Medicines</h3>
                {/* Optional: Add sorting/filtering options */}
                {/* <div className="flex items-center xsm:flex-row justify-center gap-4">
                    <select id="sortBy" className="border xsm:text-sm py-2 px-3 outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <option value="date">Month</option>
                        <option value="status">Status</option>
                    </select>
                    <div className="border flex flex-row py-2 px-3 text-sm gap-2 outline-[1px] border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <h1>Filter</h1><RiMenuUnfold4Fill className="md:w-6 md:h-6 xsm:w-4 xsm:h-5" />
                    </div>
                </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {medicinesSold ? medicinesSold.map((medicine, index) => (
                    <div key={index} className={`p-2 border-t-4 ${colors[radnomIndexGenerator()]} flex flex-col justify-between`}>
                        <div>
                            <h4 className={`text-lg font-semibold text-orange-400 ${texts[radnomIndexGenerator()]}`}>Rs. {medicine.totalSales}</h4>
                            <p>{medicine.medicineName}</p>
                        </div>
                    </div>
                )) : ""}
            </div>

            {medicinesSold &&
                <div className="flex flex-col items-center space-y-4">
                    {/* Optional: Display more details about the top-selling medicine */}
                    <div>
                        <p>"This product has been one of the best performers in terms of sales, and it continues to drive significant revenue for the company."</p>
                        <p className="font-bold">{medicinesSold ? medicinesSold[0].supplierName : ""}</p>
                        <p className="font-bold">{medicinesSold ? medicinesSold[0].medicineCategory : ""}</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default PharmaceuticalPerformance;
