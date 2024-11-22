// components/VisitStatistics.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { RiMenuUnfold4Fill } from "react-icons/ri";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const VisitStatistics = ({monthlyBooking}) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Visitors',
                data: monthlyBooking?monthlyBooking:[],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Events',
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
                <h3 className="text-xl font-semibold">Events</h3>
                {/* <div className="flex items-center flex-row justify-center gap-4">
                    <select id="sortBy" className="border py-2 px-3 outline-[1px] text-sm border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <option value="date">Month</option>
                        <option value="status">Status</option>
                    </select>
                    <div className="border flex flex-row py-2 px-3 gap-2 outline-[1px] text-sm border-none focus:border-none focus-visible:border-none bg-[#ffe7da] rounded-2xl border-gray-300">
                        <h1>Filter</h1><RiMenuUnfold4Fill className="md:w-6 md:h-6 xsm:w-4 xsm:h-5" />
                    </div>
                </div> */}
            </div>
            <Line data={data} options={options} />
            {/* <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold">Visitors 56K</div>
                    <div className="text-green-500 text-sm">+24%</div>
                </div>
                <div className="text-xl text-white md:p-4 xsm:p-2 rounded-2xl font-semibold bg-red-500">Rate +58%</div>
            </div> */}
        </div>
    );
};

export default VisitStatistics;
