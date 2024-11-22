'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import Cookies from 'js-cookie';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpenServices, setDropdownOpenServices] = useState(false);
  const [dropdownOpenAbout, setDropdownOpenAbout] = useState(false);
  const dropdownServicesRef = useRef(null);
  const dropdownAboutRef = useRef(null);
  const menuRef = useRef(null);
  const [userType, setUserType] = useState(); // Store user type from cookie

  useEffect(() => {
    const type = Cookies.get("type");
    setUserType(type);
  }, []);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setDropdownOpenServices(false);
      setDropdownOpenAbout(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpenServices(false);
    setDropdownOpenAbout(false);
  };

  const handleToggleDropdownServices = () => {
    setDropdownOpenServices(!dropdownOpenServices);
    setDropdownOpenAbout(false);
  };

  const handleToggleDropdownAbout = () => {
    setDropdownOpenAbout(!dropdownOpenAbout);
    setDropdownOpenServices(false);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownServicesRef.current && !dropdownServicesRef.current.contains(event.target)) &&
      (dropdownAboutRef.current && !dropdownAboutRef.current.contains(event.target)) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setDropdownOpenServices(false);
      setDropdownOpenAbout(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-pink-300 fixed w-full z-50 py-2 h-fit">
        <nav className="flex justify-between bg-lightBlue items-center w-[92%] mx-auto">
          <div>
            <Link href="/"><img loading="lazy" className="xsm:w-36 xsm:h-10 md:w-44 md:h-12" src='pharma-logo.png' alt="Pharmaceutical Logo" /></Link>
          </div>

          <div className="w-[50vw] hidden lg:flex items-end justify-end text-black">
            <ul className="flex flex-row items-baseline gap-[5vh]">
              <li className="hover:text-darkBlue hover:underline"><Link href="/">Home</Link></li>

              <li
                className="relative"
                ref={dropdownServicesRef}
                onMouseEnter={() => setDropdownOpenServices(true)}
                onMouseLeave={() => setDropdownOpenServices(false)}
              >
                <div className="flex items-center hover:text-darkBlue hover:underline cursor-pointer">
                  <span>Our Services</span>
                  <RiArrowDropDownLine className="h-7 w-7 gap-0" />
                </div>
                {dropdownOpenServices && (
                  <div className="absolute top-5 left-0 mt-1 w-48 bg-lightBlue shadow-lg p-6 transition duration-300 ease-in-out z-20">
                    <ul>
                      <li className="hover:text-darkBlue">
                        <Link href="/medicine-supply">Medicine Supply</Link>
                      </li>
                      <li className="hover:text-darkBlue">
                        <Link href="/consultation">Consultation Services</Link>
                      </li>
                      <li className="hover:text-darkBlue">
                        <Link href="/pharmacy">Pharmacy Services</Link>
                      </li>
                      <li className="hover:text-darkBlue">
                        <Link href="/delivery">Delivery Services</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <li
                className="relative"
                ref={dropdownAboutRef}
                onMouseEnter={() => setDropdownOpenAbout(true)}
                onMouseLeave={() => setDropdownOpenAbout(false)}
              >
                <div className="flex items-center hover:text-darkBlue hover:underline cursor-pointer">
                  <span>About Us</span>
                  <RiArrowDropDownLine className="h-7 w-7 gap-0" />
                </div>
                {dropdownOpenAbout && (
                  <div className="absolute top-5 left-0 mt-1 w-50 bg-lightBlue shadow-lg p-6 transition duration-300 ease-in-out z-30">
                    <ul>
                      <li className="hover:text-darkBlue">
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li className="hover:text-darkBlue">
                        <Link href="/about">Our Story</Link>
                      </li>
                      <li className="hover:text-darkBlue">
                        <Link href="/faq">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <li className="hover:text-darkBlue hover:underline"><Link href="/vendor-register">Register as Vendor</Link></li>
              <li className="hover:text-darkBlue hover:underline"><Link href="/signup">Sign Up</Link></li>
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <ul>
              {!userType ? (
                <li><Link className="text-[1rem] text-black px-4 py-1 rounded-sm hover:text-darkBlue" href="/signin">Sign In</Link></li>
              ) : userType === 'user' ? (
                <li><Link className="text-[1rem] text-black px-4 py-1 rounded-sm hover:text-darkBlue" href="/user-dashboard">Dashboard</Link></li>
              ) : userType === 'vendor' ? (
                <li><Link className="text-[1rem] text-black px-4 py-1 rounded-sm hover:text-darkBlue" href="/vendor-dashboard">Dashboard</Link></li>
              ) : null}
            </ul>
            <Link href="/book-service" className="text-[1rem] px-3 py-[.3rem] text-black hover:text-darkBlue rounded-sm hover:bg-lightGray">Book Service</Link>
            {menuOpen ? (
              <FaTimes onClick={handleToggleMenu} className="text-black hover:text-darkBlue mr-4 w-5 h-7 lg:hidden cursor-pointer" />
            ) : (
              <FaBars onClick={handleToggleMenu} className="text-black hover:text-darkBlue mr-4 w-5 h-7 lg:hidden cursor-pointer" />
            )}
          </div>
        </nav>
      </div>

      {/* WhatsApp Logo */}
      <div className="top-[47vh] fixed z-20 right-2 bg-green-300 rounded-full h-16 w-16 flex justify-center items-center">
        <Link href="https://wa.me/+918102692900">
          <FaWhatsapp className="h-12 w-12 text-green-900" />
        </Link>
      </div>

      {/* Mobile Hover Controls */}
      {menuOpen && (
        <div className="bg-lightBlue py-2 z-10 text-black fixed w-full top-14 left-0 h-fit flex flex-col items-center justify-center lg:hidden transition duration-300 ease-in-out" ref={menuRef}>
          <ul className="flex flex-col text-justify gap-4">
            <li className="hover:text-darkBlue hover:underline mt-6 lg:mt-0"><Link href="/" onClick={closeMenu}>Home</Link></li>

            <li className="relative" ref={dropdownServicesRef}>
              <button onClick={handleToggleDropdownServices} className="hover:text-darkBlue hover:underline outline-none focus:outline-none">
                Services <RiArrowDropDownLine className="h-7 w-7 gap-0" />
              </button>
              {dropdownOpenServices && (
                <div className="absolute top-full p-10 mr-[20vw] md:w-36 xsm:w-[38vw] bg-lightBlue shadow-lg md:p-4 xsm:p-3 transition duration-300 ease-in-out z-20">
                  <div className="flex gap-4">
                    <div>
                      <ul>
                        <li className="hover:text-darkBlue text-sm">
                          <Link href="/medicine-supply" onClick={closeMenu}>Medicine Supply</Link>
                        </li>
                        <li className="hover:text-darkBlue text-sm">
                          <Link href="/consultation" onClick={closeMenu}>Consultation Services</Link>
                        </li>
                        <li className="hover:text-darkBlue text-sm">
                          <Link href="/pharmacy" onClick={closeMenu}>Pharmacy Services</Link>
                        </li>
                        <li className="hover:text-darkBlue text-sm">
                          <Link href="/delivery" onClick={closeMenu}>Delivery Services</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li className="relative" ref={dropdownAboutRef}>
              <button onClick={handleToggleDropdownAbout} className="hover:text-darkBlue hover:underline outline-none focus:outline-none">
                About Us <RiArrowDropDownLine className="h-7 w-7 gap-0" />
              </button>
              {dropdownOpenAbout && (
                <div className="absolute top-full p-10 mr-[20vw] md:w-36 xsm:w-[38vw] bg-lightBlue shadow-lg md:p-4 xsm:p-3 transition duration-300 ease-in-out z-20">
                  <ul>
                    <li className="hover:text-darkBlue">
                      <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
                    </li>
                    <li className="hover:text-darkBlue">
                      <Link href="/about" onClick={closeMenu}>Our Story</Link>
                    </li>
                    <li className="hover:text-darkBlue">
                      <Link href="/faq" onClick={closeMenu}>FAQ</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="hover:text-darkBlue hover:underline"><Link href="/signup" onClick={closeMenu}>Sign Up</Link></li>
            <li className="hover:text-darkBlue hover:underline"><Link href="/vendor-register" onClick={closeMenu}>Register as Vendor</Link></li>
            <li><Link href="/signin" className="text-[1rem] text-black px-4 py-1 rounded-sm hover:text-darkBlue" onClick={closeMenu}>Sign In</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
