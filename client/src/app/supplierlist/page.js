import React from "react";

const SuppliersPage = () => {
  const suppliers = [
    {
      id: 1,
      name: "Medico India Pvt Ltd",
      contact: "Amit Sharma",
      phone: "+91 9876543210",
      email: "amit.sharma@medicoindia.com",
      status: "Active",
      registered: "2021-03-15",
    },
    {
      id: 2,
      name: "Sai Medical Supplies",
      contact: "Neha Singh",
      phone: "+91 9999888777",
      email: "neha.singh@saimedical.com",
      status: "Inactive",
      registered: "2020-07-25",
    },
    {
      id: 3,
      name: "Pharma Express",
      contact: "Rajesh Kumar",
      phone: "+91 8800334455",
      email: "rajesh.kumar@pharmaexpress.in",
      status: "Active",
      registered: "2022-02-10",
    },
    {
      id: 4,
      name: "MedLife Solutions",
      contact: "Priya Verma",
      phone: "+91 9100112233",
      email: "priya.verma@medlifesolutions.com",
      status: "Active",
      registered: "2023-01-22",
    },
    {
      id: 5,
      name: "Hindustan Pharmaceuticals",
      contact: "Vikram Patel",
      phone: "+91 9500123456",
      email: "vikram.patel@hindustanpharma.com",
      status: "Inactive",
      registered: "2019-08-14",
    },
    {
      id: 6,
      name: "Indian Health Supplies",
      contact: "Sonal Gupta",
      phone: "+91 9445566777",
      email: "sonal.gupta@indianhealthsupplies.in",
      status: "Active",
      registered: "2021-05-30",
    },
    {
      id: 7,
      name: "Sushila Medical Traders",
      contact: "Ravi Yadav",
      phone: "+91 9842334455",
      email: "ravi.yadav@sushilamedicals.com",
      status: "Active",
      registered: "2022-09-05",
    },
    {
      id: 8,
      name: "Jeevan Health Care",
      contact: "Pooja Shah",
      phone: "+91 9081726354",
      email: "pooja.shah@jeevanhealthcare.in",
      status: "Active",
      registered: "2020-06-11",
    },
    {
      id: 9,
      name: "Global Pharma Solutions",
      contact: "Manish Singh",
      phone: "+91 7838495032",
      email: "manish.singh@globalpharma.com",
      status: "Inactive",
      registered: "2021-11-29",
    },
    {
      id: 10,
      name: "Vishal Medical Co.",
      contact: "Deepa Rao",
      phone: "+91 9001122334",
      email: "deepa.rao@vishalmedico.com",
      status: "Active",
      registered: "2022-04-18",
    },
  ];

  return (
    <div className="pt-24 mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6">Suppliers List</h1>

      {/* Table to display the list of suppliers */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">#</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Supplier Name</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Contact Person</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Phone</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Registered On</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-sm text-gray-600">{index + 1}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{supplier.name}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{supplier.contact}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{supplier.phone}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{supplier.email}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      supplier.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">{supplier.registered}</td>
                <td className="py-3 px-4 border-b text-sm text-gray-600">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs">
                    View Details
                  </button>
                  {/* <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-xs ml-2">
                    Edit
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuppliersPage;
