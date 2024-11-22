import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";

const teamMembers = [
  {
    profilePic: "/profile.png",
    name: "Dr. John Doe",
    position: "CEO & Founder",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "mailto:john.doe@medtrack.com",
    width: "220"
  },
  {
    profilePic: "/profile.png",
    name: "Jane Smith",
    position: "Chief Operations Officer",
    linkedin: "https://linkedin.com/in/janesmith",
    email: "mailto:jane.smith@medtrack.com",
    width: "250"
  },
  {
    profilePic: "/profile.png",
    name: "Mike Jones",
    position: "Chief Technology Officer",
    linkedin: "https://linkedin.com/in/mikejones",
    email: "mailto:mike.jones@medtrack.com",
    width: "250"
  },
  {
    profilePic: "/profile.png",
    name: "Susan Brown",
    position: "Chief Financial Officer",
    linkedin: "https://linkedin.com/in/susanbrown",
    email: "mailto:susan.brown@medtrack.com",
    width: "220"
  }
];

const Teams = () => {
  return (
    <div className='bg-pink-200'>
      {/* Header Section */}
      <div
        className="min-h-[5em] flex flex-col items-center justify-center pt-32"
        style={{ 
          background: "url(/backgrounds/pharma-bg.jpg)", 
          backgroundPosition: "center", 
          backgroundSize: "cover" 
        }}
      >
        <h1 className="md:text-6xl text-3xl font-bold">Our Leadership</h1>
      </div>

      {/* Introduction Section */}
      <div className="grid md:grid-cols-2 md:px-12 px-5 my-12">
        <h1 className="md:text-5xl text-3xl md:max-w-[7em] font-bold">
          Meet the Visionaries Behind Medtrack
        </h1>
        <p className="md:text-lg text-md mt-6">
          Our team of experts brings decades of experience in pharmaceutical supply chain management and technology. With a mission to revolutionize how pharmacies manage their inventory, our leadership ensures innovation and excellence at every step.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="flex items-center justify-center pb-20">
        <div className="flex flex-wrap gap-10 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-2xl flex flex-col items-center justify-center max-w-[19em] md:w-[19em] mt-12 p-7 relative"
            >
              <Image
                loading="lazy"
                src={member.profilePic}
                height={250}
                width={member.width}
                alt={member.name}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold mt-4">{member.name}</h1>
              <p>{member.position}</p>
              <div className="flex items-center justify-center absolute -bottom-4 bg-[#007bff] px-3 py-2 rounded-full gap-3">
                <Link target="_blank" href={member.linkedin}>
                  <FaLinkedin className="text-white hover:text-gray-300 text-lg" />
                </Link>
                <Link target="_blank" href={member.email}>
                  <AiOutlineMail className="text-white hover:text-gray-300 text-lg" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
