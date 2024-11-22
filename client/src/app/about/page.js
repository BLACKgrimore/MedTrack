import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { TbCirclesRelation } from "react-icons/tb";

const About = () => {
  return (
    <div className="flex flex-col font-serif bg-veryLightPink">
      {/* Hero Section */}
      <div className="bg-[url('/aboutus/aboutus.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center h-[30rem] lg:h-[35rem] w-full">
        <h1 className="text-4xl md:text-6xl lg:text-8xl">About Us</h1>
        <p className="text-sm md:text-lg lg:text-xl max-w-[80vw] lg:max-w-[50vw] text-center px-4 leading-loose mt-4">
          Welcome to the Pharmaceutical Supply Chain System (PSCS) – Your Trusted Partner for Efficient Medicine Inventory Management. We help pharmacy owners streamline their operations, manage inventories, and connect with trusted suppliers.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full bg-veryLightPink flex flex-col justify-center items-center py-8 space-y-6 text-center">
        <p className="max-w-[80vw] text-base md:text-lg">
          The Pharmaceutical Supply Chain System (PSCS) makes managing your pharmacy’s inventory easier and more efficient. Our platform connects you to reliable suppliers, manages stock, tracks deliveries, and automates procurement, making your workflow seamless and stress-free.
        </p>
        <p className="max-w-[80vw] text-base md:text-lg">
          <strong>Why Choose PSCS?</strong><br />
          Seamless Supplier Connections: Connect easily with suppliers and manage stock efficiently.<br />
          Inventory Tracking: Stay on top of your stock and never run out of essential medicines.<br />
          Timely Deliveries: Ensure that orders arrive on time, so your pharmacy operations run smoothly.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full flex flex-col lg:flex-row bg-[url('/aboutus/about1.png')] bg-cover bg-center bg-no-repeat text-white">
        <div className="p-8 flex flex-col items-center lg:items-start space-y-6 lg:w-[60%]">
          <h2 className="text-3xl md:text-4xl font-semibold text-darkorange">
            “Streamlining Pharmacy Operations with PSCS”
          </h2>
          <p className="text-base lg:text-lg max-w-[80%] text-center lg:text-left">
            Discover how PSCS makes pharmaceutical supply chain management more efficient, allowing you to focus on what matters – providing quality healthcare to your customers.
          </p>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="flex items-center space-x-4">
              <BsFillCameraFill className="w-8 h-8 lg:w-10 lg:h-10" />
              <div>
                <h3 className="text-lg font-semibold">Efficient Inventory Management:</h3>
                <p className="text-sm lg:text-base">Track inventory levels and automate reordering to ensure you never run out of essential medications.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <TbCirclesRelation className="w-8 h-8 lg:w-10 lg:h-10" />
              <div>
                <h3 className="text-lg font-semibold">Reliable Supplier Connections:</h3>
                <p className="text-sm lg:text-base">Build long-term relationships with trusted suppliers for consistent product availability.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] flex justify-center items-center relative p-8">
          <img
            src="/aboutus/about12.png"
            alt="Pharmacy Example 1"
            className="w-32 h-32 lg:w-48 lg:h-48 border border-white rounded-lg"
          />
          <img
            src="/aboutus/about11.png"
            alt="Pharmacy Example 2"
            className="absolute top-1/2 left-1/2 w-28 h-28 lg:w-44 lg:h-44 border border-white rounded-lg transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Life at PSCS Section */}
      <div className="w-full bg-lightPurple py-12 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-6">
          "Life at PSCS: Revolutionizing Pharmaceutical Operations"
        </h2>
        <p className="max-w-[45rem] mx-auto text-base md:text-lg">
          At PSCS, we value innovation, efficiency, and collaboration. We work tirelessly to ensure that your pharmacy operations are smooth, your inventory is well-managed, and your suppliers are reliable. Join us in revolutionizing the pharmaceutical supply chain!
        </p>
        <div className="flex flex-wrap justify-center items-center mt-8 space-x-8">
          {[
            { img: "/aboutus/about21.png", count: "300+", text: "pharmacies served" },
            { img: "/aboutus/about22.png", count: "1500+", text: "suppliers connected" },
            { img: "/aboutus/about23.png", count: "5M+", text: "medications supplied" },
            { img: "/aboutus/about24.png", count: "20+", text: "years in pharmaceutical industry" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <img src={item.img} alt={item.text} className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto" />
              <p className="text-xl font-semibold mt-4">{item.count}</p>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
