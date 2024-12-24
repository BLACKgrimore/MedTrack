'use client'

import { Router } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const StoreDashboard = () => {
    const router = useRouter()
    return (
        <div className="min-h-screen pt-12 bg-gray-100 flex flex-col">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {/* Card 1: Total Inventory */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Total Inventory</h2>
                    <p className="text-2xl font-semibold text-blue-600">1,200 Items</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        View Inventory
                    </button>
                </div>

                {/* Card 2: Pending Orders */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Pending Orders</h2>
                    <p className="text-2xl font-semibold text-orange-600">45 Orders</p>
                    <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        Manage Orders
                    </button>
                </div>

                {/* Card 3: Top Suppliers */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Top Suppliers</h2>
                    <p className="text-2xl font-semibold text-green-600">8 Active</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        View Suppliers
                    </button>
                </div>

                {/* Card 4: Monthly Revenue */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Monthly Revenue</h2>
                    <p className="text-2xl font-semibold text-purple-600">$12,300</p>
                    <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                        View Reports
                    </button>
                </div>

                {/* Card 5: Low Stock Alerts */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Low Stock Alerts</h2>
                    <p className="text-2xl font-semibold text-red-600">15 Items</p>
                    <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Check Stock
                    </button>
                </div>

                {/* Card 6: Notifications */}
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">New Notifications</h2>
                    <p className="text-2xl font-semibold text-gray-600">5 Messages</p>
                    <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        View Notifications
                    </button>
                </div>
            </div>


            {/* Main Content */}
            <main className="flex-grow mx-auto px-6 py-8">
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Inventory Management */}
                    <Card
                        title="Inventory Management"
                        description="Manage your store's inventory, update stock levels, and track low-stock items."
                        buttonText="View Inventory"
                        buttonAction={() => alert("Redirecting to Inventory Management...")}
                        bgColor="bg-green-500"
                    />

                    {/* Orders */}
                    <Card
                        title="Orders"
                        description="Track new orders, update order statuses, and manage delivery schedules."
                        buttonText="View Orders"
                        buttonAction={() => alert("Redirecting to Orders...")}
                        bgColor="bg-yellow-500"
                    />

                    {/* Suppliers */}
                    <Card
                        title="Suppliers"
                        description="Manage supplier details, view contracts, and reorder stock seamlessly."
                        buttonText="Manage Suppliers"
                        buttonAction={() => router.push("/supplierlist")} // Correctly push route
                        bgColor="bg-blue-500"
                    />

                    {/* Payments */}
                    <Card
                        title="Payments"
                        description="Monitor store payments, settle dues, and view payment history."
                        buttonText="View Payments"
                        buttonAction={() => alert("Redirecting to Payments...")}
                        bgColor="bg-purple-500"
                    />

                    {/* Reports */}
                    <Card
                        title="Reports"
                        description="Generate sales reports, view analytics, and track overall store performance."
                        buttonText="Generate Reports"
                        buttonAction={() => alert("Redirecting to Reports...")}
                        bgColor="bg-teal-500"
                    />

                    {/* Notifications */}
                    <Card
                        title="Notifications"
                        description="Stay updated with alerts on orders, inventory, and supplier updates."
                        buttonText="View Notifications"
                        buttonAction={() => alert("Redirecting to Notifications...")}
                        bgColor="bg-pink-500"
                    />

                    {/* Profile */}
                    <Card
                        title="Profile Management"
                        description="Update your store details, change settings, and manage user roles."
                        buttonText="Edit Profile"
                        buttonAction={() => alert("Redirecting to Profile Management...")}
                        bgColor="bg-indigo-500"
                    />
                </div>
            </main>
        </div>
    );
};

// Card Component
const Card = ({ title, description, buttonText, buttonAction, bgColor }) => (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <button
            className={`${bgColor} text-white px-4 py-2 rounded-md hover:opacity-90 mt-auto`}
            onClick={buttonAction}
        >
            {buttonText}
        </button>
    </div>
);

export default StoreDashboard;
