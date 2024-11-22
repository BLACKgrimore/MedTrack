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
    // const type = localStorage.getItem('userType');
    const type = Cookies.get("type");
    // console.log("User Type from Cookie:", type);
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

  const typ1e = Cookies.get("type");
  // console.log("User Type from Cookie:", typ1e);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-veryLightPink fixed w-[100vw] z-50 py-2 h-fit">
        <nav className="flex justify-between bg-veryLightPink items-center w-[92%] mx-auto">
          <div>
            <Link href="/"><img loading="lazy" className="xsm:w-36 xsm:h-10 md:w-44 md:h-12" src='evegologo2.png' alt="Logo" /></Link>
          </div>

          <div className="w-[50vw] hidden lg:flex items-end justify-end text-black">
            <ul className="flex flex-row items-baseline gap-[5vh]">
              <li className="hover:text-lightorange hover:underline"><Link href="/">Home</Link></li>

              <li
                className="relative"
                ref={dropdownServicesRef}
                onMouseEnter={() => setDropdownOpenServices(true)}
                onMouseLeave={() => setDropdownOpenServices(false)}
              >
                <div className="flex items-center hover:text-lightorange hover:underline cursor-pointer">
                  <span>Services</span>
                  <RiArrowDropDownLine className="h-7 w-7 gap-0" />
                </div>
                {dropdownOpenServices && (
                  <div className="absolute top-5 left-0 mt-1 w-48 bg-veryLightPink shadow-lg p-6 transition duration-300 ease-in-out z-20">
                    {/* <div className="flex gap-10">
                      <div>
                        <ul>
                          <li className="hover:text-lightorange">
                            <Link href="../babyshower">Baby Shower</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../marriage">Marriage</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../awardceremony">Award Ceremony</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../birthday">Birthday</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../pooja">Pooja</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../services">Our Services</Link>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>
                )}
              </li>

              <li
                className="relative"
                ref={dropdownAboutRef}
                onMouseEnter={() => setDropdownOpenAbout(true)}
                onMouseLeave={() => setDropdownOpenAbout(false)}
              >
                <div className="flex items-center hover:text-lightorange hover:underline cursor-pointer">
                  <span>About us</span>
                  <RiArrowDropDownLine className="h-7 w-7 gap-0" />
                </div>
                {dropdownOpenAbout && (
                  <div className="absolute top-5 left-0 mt-1 w-50 bg-veryLightPink shadow-lg p-6 transition duration-300 ease-in-out z-30">
                    <div className="flex gap-10">
                      <div>
                        <ul>
                          <li className="hover:text-lightorange">
                            <Link href="../contactus">Contact Us</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../teams">Teams</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../testimonial">Testimonials</Link>
                          </li>
                          <li className="hover:text-lightorange">
                            <Link href="../about">About</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              <li className="hover:text-lightorange hover:underline"><Link href="/vendorregister">Vendor</Link></li>
              <li className="hover:text-lightorange hover:underline"><Link href="/signup">User</Link></li>
              {/* <li className="hover:text-lightorange hover:underline"><Link href="#">E-Invites</Link></li> */}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            {/* gap-[4vh] */}
            {/* <Link href="../signin" className="text-[1rem] text-black px-4 py-1  rounded-sm hover:text-lightorange">Login</Link> */}
            <ul>
              {!userType ? (
                <li><Link className="md:text-[1rem] xsm:text-[.8rem] text-black px-4 py-1  rounded-sm hover:text-lightorange" href="/signin">Signin</Link></li>
              ) : userType === 'user' ? (
                <li><Link className="md:text-[1rem] xsm:text-[.8rem] text-black px-4 py-1  rounded-sm hover:text-lightorange" href="/userdash">Profile</Link></li>
              ) : userType === 'vendor' ? (
                <li><Link className="md:text-[1rem] xsm:text-[.8rem] text-black px-4 py-1  rounded-sm hover:text-lightorange" href="/vendordash">Profile</Link></li>
              ) : userType === 'ngo' ? (
                <li><Link className="md:text-[1rem] xsm:text-[.8rem] text-black px-4 py-1  rounded-sm hover:text-lightorange" href="/ngodash">Profile</Link></li>
              ) : null}
            </ul>
            <Link href="../search" className="md:text-[1rem] xsm:text-[.8rem] xmd:flex px-3 py-[.3rem] text-black  hover:text-lightorange rounded-sm hover:bg-sm">Book Service</Link>
            {menuOpen ? (
              <FaTimes onClick={handleToggleMenu} className="text-black hover:text-veryLightOrange mr-4 w-5 h-7 lg:hidden cursor-pointer" />
            ) : (
              <FaBars onClick={handleToggleMenu} className="text-black hover:text-veryLightOrange mr-4 w-5 h-7 lg:hidden cursor-pointer" />
            )}
          </div>
        </nav>
      </div>

      {/* Whatsapp logo */}



      <logo className="top-[47vh] fixed z-20 right-2 bg-green-300 rounded-full h-16 w-16 flex justify-center items-center">
        <Link href="https://wa.me/+918102692900">
          <FaWhatsapp className="h-12 w-12 text-green-900" />
        </Link>
      </logo>


      {/* Mobile Hover Controls */}
      {menuOpen && (
        <div className="bg-veryLightPink py-2 z-10 text-black fixed w-[100vw] top-14 left-0 h-fit flex flex-col items-center justify-center lg:hidden transition duration-300 ease-in-out" ref={menuRef}>
          <ul className="flex flex-col text-justify gap-4">
            <li className="hover:text-lightorange hover:underline mt-6 lg:mt-0"><Link href="/" onClick={closeMenu}>Home</Link></li>

            <li className="relative" ref={dropdownServicesRef}>
              <button onClick={handleToggleDropdownServices} className="hover:text-lightorange hover:underline outline-none focus:outline-none">
                Services <RiArrowDropDownLine className="h-7 w-7 gap-0" />
              </button>
              {dropdownOpenServices && (
                <div className="absolute top-full p-10 mr-[20vw] md:w-36 xsm:w-[38vw] bg-veryLightPink shadow-lg md:p-4 xsm:p-3 transition duration-300 ease-in-out z-20">
                  <div className="flex gap-4">
                    <div>
                      <ul>
                        <li className="hover:text-lightorange text-sm">
                          <Link href="../babyshower" onClick={closeMenu}>Baby Shower</Link>
                        </li>
                        <li className="hover:text-lightorange text-sm">
                          <Link href="../marriage" onClick={closeMenu}>Marriage</Link>
                        </li>
                        <li className="hover:text-lightorange text-sm">
                          <Link href="../awardceremony" onClick={closeMenu}>Award Ceremony</Link>
                        </li>
                        <li className="hover:text-lightorange text-sm">
                          <Link href="../birthday" onClick={closeMenu}>Birthday</Link>
                        </li>
                        <li className="hover:text-lightorange text-sm">
                          <Link href="../pooja" onClick={closeMenu}>Pooja</Link>
                        </li>
                        {/* <li className="hover:text-lightorange text-sm">
                          <Link href="../services" onClick={closeMenu}>Our Services</Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            <li className="relative" ref={dropdownAboutRef}>
              <button onClick={handleToggleDropdownAbout} className="bg-transparent hover:text-lightorange hover:underline outline-none focus:outline-none z-0">
                About us <RiArrowDropDownLine className="h-7 w-7 gap-0" />
              </button>
              {dropdownOpenAbout && (
                <div className="absolute top-full mt-2 mr-[20vw] md:w-36 xsm:w-[38vw] bg-veryLightPink shadow-lg md:p-4 xsm:p-3 transition duration-300 ease-in-out z-20">
                  <div className="flex gap-4">
                    <div>
                      <ul>
                        <li className="hover:text-lightorange">
                          <Link href="../contactus" onClick={closeMenu}>Contact Us</Link>
                        </li>
                        <li className="hover:text-lightorange">
                          <Link href="../teams" onClick={closeMenu}>Teams</Link>
                        </li>
                        <li className="hover:text-lightorange">
                          <Link href="../testimonial" onClick={closeMenu}>Testimonials</Link>
                        </li>
                        <li className="hover:text-lightorange">
                          <Link href="../about" onClick={closeMenu}>About</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="hover:text-lightorange hover:underline"><Link href="/vendorregister" onClick={closeMenu}>Vendor</Link></li>
            <li className="hover:text-lightorange hover:underline"><Link href="/signup" onClick={closeMenu}>User</Link></li>
            {/* <li className="hover:text-lightorange hover:underline"><Link href="/" onClick={closeMenu}>E-Invites</Link></li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
