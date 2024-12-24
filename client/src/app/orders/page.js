'use client'

import React, { useState, useEffect } from "react";

const OrdersPage = () => {
    // Sample orders data (can be replaced with an API fetch)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Simulating API call
        const fetchOrders = async () => {
            const data = [
                {
                    orderId: "ORD12345",
                    storeName: "Apollo Pharmacy",
                    productName: "Paracetamol 500mg",
                    quantity: 100,
                    status: "Pending",
                    orderDate: "2024-12-01",
                },
                {
                    orderId: "ORD12346",
                    storeName: "MedPlus",
                    productName: "Cough Syrup",
                    quantity: 50,
                    status: "Shipped",
                    orderDate: "2024-12-02",
                },
                {
                    orderId: "ORD12347",
                    storeName: "Netmeds",
                    productName: "Insulin Injection",
                    quantity: 25,
                    status: "Delivered",
                    orderDate: "2024-12-03",
                },
                {
                    orderId: "ORD12346",
                    storeName: "MedPlus",
                    productName: "Cough Syrup",
                    quantity: 50,
                    status: "Shipped",
                    orderDate: "2024-12-02",
                },
                {
                    orderId: "ORD12346",
                    storeName: "MedPlus",
                    productName: "Cough Syrup",
                    quantity: 50,
                    status: "Shipped",
                    orderDate: "2024-12-02",
                },
                {
                    orderId: "ORD12346",
                    storeName: "MedPlus",
                    productName: "Cough Syrup",
                    quantity: 50,
                    status: "Shipped",
                    orderDate: "2024-12-02",
                },
            ];
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Orders Placed by Stores</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 shadow-lg">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                <th className="border border-gray-300 px-4 py-2">Store Name</th>
                                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white hover:bg-gray-100 text-center"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.storeName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.productName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                                        <td
                                            className={`border border-gray-300 px-4 py-2 font-semibold ${
                                                order.status === "Pending"
                                                    ? "text-yellow-500"
                                                    : order.status === "Shipped"
                                                    ? "text-blue-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {order.status}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{order.orderDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                                    >
                                        No orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
