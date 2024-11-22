// components/RevenueOverTime.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { RiMenuUnfold4Fill } from "react-icons/ri";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueOverTime = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Highest',
                data: [50, 60, 70, 60, 50, 70, 80, 90, 60, 50],
                backgroundColor: 'rgba(0, 0, 0, 1)',
            },
            {
                label: 'Average',
                data: [40, 50, 60, 50, 40, 60, 70, 80, 50, 40],
                backgroundColor: 'rgba(128, 128, 128, 1)',
            },
            {
                label: 'Lowest',
                data: [20, 30, 40, 30, 20, 40, 50, 60, 30, 20],
                backgroundColor: 'rgba(255, 0, 0, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md shadow-orange-600 lg:w-1/2 xsm:w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Revenue Over Time</h3>
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
            <Bar data={data} options={options} className="" />
        </div>
    );
};

export default RevenueOverTime;
