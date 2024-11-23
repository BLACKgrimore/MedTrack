"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

// Service description (you can add more details or extend it as needed)
const serv = [
  {
    desc: "Our platform simplifies pharmaceutical inventory management by connecting medicine shop owners with trusted wholesale vendors. From inventory tracking to ordering supplies, our system ensures efficiency and accuracy. It also provides real-time updates and order tracking for hassle-free operations.",
  },
];

// FAQs for Pharmaceutical Supply Chain System
const faqs = [
  {
    title: "What services does the Pharmaceutical Supply Chain System (PSCS) offer?",
    desc: "PSCS provides a wide range of services, including inventory management, vendor connection, order tracking, real-time updates on stock levels, and secure payment processing. It streamlines operations for both shop owners and suppliers, ensuring a seamless supply chain.",
  },
  {
    title: "How does PSCS help with inventory management?",
    desc: `${serv.map((ser, index) => {
      return `${ser.desc} `;
    })}`,
  },
  {
    title: "Can PSCS work for small-scale pharmacy businesses?",
    desc: "Yes, PSCS is designed to cater to businesses of all sizes. Whether you’re managing a single pharmacy or a chain of stores, the platform provides customizable tools to fit your specific needs and budget.",
  },
  {
    title: "How secure is the payment system on PSCS?",
    desc: "PSCS uses industry-standard encryption and secure payment gateways to ensure that all transactions are safe. Our platform is compliant with healthcare and financial regulations to protect sensitive data.",
  },
  {
    title: "What are the benefits of connecting with verified vendors on PSCS?",
    desc: "By connecting with verified vendors on PSCS, you can access a reliable network of wholesale suppliers. This ensures the authenticity of medicines, competitive pricing, and timely delivery of orders.",
  },
  {
    title: "How can I get started with PSCS?",
    desc: "Getting started with PSCS is simple. You can register as a pharmacy owner or supplier on our platform. After registration, you can set up your account, access training resources, and start using our tools for efficient inventory and supply management.",
  },
];

const Faq = () => {
  const [selectedFaq, setSelectedFaq] = useState(-1);

  return (
    <div className="grid md:grid-cols-2 md:px-12 px-5 gap-12 my-12">
      {/* FAQ Introduction */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Pharmaceutical FAQs</h1>
        <p className="text-sm my-3">
          Our Pharmaceutical Supply Chain System (PSCS) is here to address your
          most pressing questions. Whether you're a pharmacy owner or supplier,
          we’re dedicated to ensuring a seamless experience through our
          platform.
        </p>
        <div className="my-3 flex items-center">
          <button className="py-3 px-5 border rounded-full me-7 border-black hover:bg-black hover:text-white transition-all">
            Learn More
          </button>
          <Link href="/contactus">
            <button className="py-3 px-5 border rounded-full me-7 border-black hover:bg-black hover:text-white transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col border-b border-t border-black transition-all overflow-hidden"
            onClick={() =>
              setSelectedFaq(selectedFaq === index ? -1 : index)
            }
          >
            {/* FAQ Title */}
            <div className="py-7 cursor-pointer font-semibold md:text-2xl text-lg flex items-center justify-between select-none">
              <span className="me-4">{faq.title}</span>
              {index !== selectedFaq ? <FaPlus /> : <FaMinus />}
            </div>
            {/* FAQ Description */}
            <div
              className={`mb-4 mt-5 text-lg ${
                index === selectedFaq ? "inline" : "hidden"
              }`}
            >
              {faq.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
