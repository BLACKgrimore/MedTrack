'use client'

import React from "react";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen pt-12 bg-gray-100">

      

      {/* Main Content */}
      <main className="flex-grow mx-auto px-6 py-8">
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inventory Management */}
          <Card
            title="Inventory Management"
            description="View and update your inventory, add new medicines, and monitor stock levels."
            buttonText="Manage Inventory"
            buttonAction={() => alert("Redirecting to Inventory Management...")}
            bgColor="bg-green-500"
          />

          {/* Orders */}
          <Card
            title="Orders"
            description="Track incoming orders, update statuses, and generate invoices."
            buttonText="View Orders"
            buttonAction={() => alert("Redirecting to Orders...")}
            bgColor="bg-blue-500"
          />

          {/* Notifications */}
          <Card
            title="Notifications"
            description="Stay informed about new orders, updates, and important reminders."
            buttonText="View Notifications"
            buttonAction={() => alert("Viewing Notifications...")}
            bgColor="bg-yellow-500"
          />

          {/* Profile Management */}
          <Card
            title="Profile Management"
            description="Update your personal details and account settings."
            buttonText="Manage Profile"
            buttonAction={() => alert("Redirecting to Profile Management...")}
            bgColor="bg-purple-500"
          />

          {/* Payments */}
          <Card
            title="Payments"
            description="Manage transactions, view payment history, and download receipts."
            buttonText="Manage Payments"
            buttonAction={() => alert("Redirecting to Payments...")}
            bgColor="bg-indigo-500"
          />

          {/* Reports */}
          <Card
            title="Reports"
            description="Generate and view sales reports, inventory reports, and order summaries."
            buttonText="Generate Reports"
            buttonAction={() => alert("Redirecting to Reports...")}
            bgColor="bg-orange-500"
          />

          {/* Support */}
          <Card
            title="Support"
            description="Raise support tickets or check existing tickets for assistance."
            buttonText="Contact Support"
            buttonAction={() => alert("Contacting Support...")}
            bgColor="bg-pink-500"
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

export default VendorDashboard;
