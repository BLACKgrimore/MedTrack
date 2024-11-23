"use client";
import React, { useState } from "react";
import { FiArrowRightCircle, FiArrowLeftCircle, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

const reviews = [
  {
    review: "The Pharmaceutical Supply Chain System (PSCS) has revolutionized the way I manage inventory in my pharmacy. Tracking stock and reordering medicines has never been easier. Highly recommended!",
    name: "Pharmacy Owner Review:",
    from: "— Rajesh Kumar, HealthPlus Pharmacy",
  },
  {
    review: "Using PSCS has streamlined communication with wholesalers and suppliers. I save so much time, and the automated features ensure my stock is always up-to-date.",
    name: "Supplier Experience:",
    from: "— Sneha Gupta, MedSupply Co.",
  },
  {
    review: "PSCS helped us avoid stockouts during peak demand. The analytics dashboard provides actionable insights, making business decisions faster and smarter!",
    name: "Business Analytics Review:",
    from: "— Arvind Mehta, Sunrise Pharmaceuticals",
  },
];

const Review = () => {
  const [activeReview, setActiveReview] = useState(0);

  const handlePrevReview = () => {
    setActiveReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setActiveReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col md:px-12 px-5">
      <div className="flex flex-col items-center w-full justify-between mt-12">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">User Reviews</h1>
          <p className="text-sm text-gray-600">
            See how PSCS is transforming businesses for pharmacies and suppliers.
          </p>
          <div className="flex items-center justify-center mt-2">
            {Array.from(Array(5).keys()).map((_, idx) => (
              <FaStar key={idx} className="text-yellow-500 mx-1" />
            ))}
            <p className="font-bold ml-2">5/5</p>
          </div>
        </div>

        {/* Review Cards */}
        <div className="w-full md:flex md:items-center md:justify-center">
          <div className="md:w-2/3 text-center px-4">
            {reviews.map((data, index) => (
              <div key={index} className={`${index === activeReview ? "block" : "hidden"}`}>
                <p className="text-xl font-semibold mb-2">{data.name}</p>
                <p className="text-base text-gray-700 italic mb-2">"{data.review}"</p>
                <p className="text-sm text-gray-500">{data.from}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center my-6">
          <FiArrowLeftCircle
            size={30}
            className="mx-3 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={handlePrevReview}
          />
          <FiArrowRightCircle
            size={30}
            className="mx-3 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={handleNextReview}
          />
        </div>
      </div>

      {/* Image Section */}
      {/* <div className="grid grid-rows-2 md:gap-5 gap-2 mt-12">
        <div className="grid grid-cols-3 md:gap-5 gap-2">
          <div
            className="md:min-h-[50vh] min-h-[30vh] bg-gray-200 rounded-lg"
            style={{
              background: "url(/reviewsImgs/pharmacy1.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="md:min-h-[50vh] min-h-[30vh] col-span-2 bg-gray-200 rounded-lg"
            style={{
              background: "url(/reviewsImgs/pharmacy2.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        <div
          className="w-full min-h-[30vh] cursor-pointer bg-gray-200 rounded-lg relative group"
          style={{
            background: "url(/reviewsImgs/suppliers.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <span className="h-full w-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm bg-black/30 absolute top-0 left-0"></span>
          <div className="z-8 absolute md:top-10 top-4 md:left-10 left-4">
            <div className="relative">
              <h1 className="text-white font-serif md:text-4xl text-2xl">
                Join our <br />
                PSCS Community
                <span className="absolute md:bottom-2 bottom-1 md:right-6 right-14 bg-[#FF8F50] h-5 w-5 rounded-full flex items-center justify-center text-white">
                  <FiArrowRight />
                </span>
              </h1>
            </div>
            <p className="font-sans text-white md:text-sm text-xs font-light">
              <br />
              Use #PSCSPharma to share your experience with our platform.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Review;
