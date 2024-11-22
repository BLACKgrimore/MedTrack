'use client'
import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { Menu } from '@headlessui/react';

const UserHistory = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="bg-pink-100 pt-10 w-full flex items-center justify-center">

            <div className="bg-pink-100 p-8 w-full">
                <h1 className="text-3xl font-semibold mb-4">Activity Log</h1>
                <div className="flex xsm:flex-row flex-wrap items-center mb-4 md:space-y-0 xsm:space-y-4 xsm:space-x-4">
                    <div className="relative xsm:w-[80vw] sm:w-[65vw] ">
                        <input
                            type="text"
                            placeholder="Search History"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border-2 border-gray-300 rounded-full indent-2  focus:outline-none focus:border-gray-500"
                        />
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="p-2 border-2 border-black  rounded flex items-center space-x-2 focus:outline-none">
                            <span className="text-black">Cases</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z" clipRule="evenodd" />
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-100' : 'text-gray-700'
                                            } group flex items-center w-full px-4 py-2 text-sm`}>
                                            Option 1
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-100' : 'text-gray-700'
                                            } group flex items-center w-full px-4 py-2 text-sm`}>
                                            Option 2
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="p-2 border-2 border-black rounded flex items-center space-x-2 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1zm2 4a1 1 0 000 2h8a1 1 0 100-2H5zm-2 4a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4z" clipRule="evenodd" />
                            </svg>
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-100' : 'text-gray-700'
                                            } group flex items-center w-full px-4 py-2 text-sm`}>
                                            Filter 1
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button className={`${active ? 'bg-gray-100' : 'text-gray-700'
                                            } group flex items-center w-full px-4 py-2 text-sm`}>
                                            Filter 2
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Menu>
                </div>

                <hr className=" border-black my-4 border-[1px]"></hr>

                <div className="overflow-x-auto">
                    <table className="overflow-x-auto w-full border rounded">
                        <tbody className="">
                            <tr className="bg-transparent border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 text-lg font-bold">Name</td>
                                <td className="py-2 px-4 text-lg font-bold">SearchType</td>
                                <td className="py-2 px-4 text-lg font-bold">Date Added</td>
                                <td className="py-2 px-4 text-lg font-bold">Actions</td>
                            </tr>
                        </tbody>
                        <tbody className="bg-white">
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-2 px-4"><input type="checkbox" /></td>
                                <td className="py-2 px-4 flex items-center">
                                    <div className="w-10 h-10 bg-meet md:flex xsm:hidden rounded-full text-white items-center justify-center mr-2"></div>
                                    <div className="font-semibold">Anish Dubey</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div>
                                        <div className="font-semibold">Birthday</div>
                                        <div className="text-sm text-gray-600">4Star+ Wedding at Destination</div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">58 min. Ago</td>
                                <td className="py-2 px-4 flex items-center space-x-2">
                                    <button className="flex items-center space-x-1">
                                        <FaRegEye className="h-5 w-5" />
                                    </button>
                                    <button className="">UNDO</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserHistory
