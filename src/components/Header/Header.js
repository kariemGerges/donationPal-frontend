import React, { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import  ThemeToggleBtn  from '../ThemeToggleBtn/ThemeToggleBtn';
import  ThemeContext  from '../ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';

const NavLink = ({ href, children }) => (
    <button 
        className=" px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
        id='navLinks'
    >
            <Link to={href}>
                {children}
            </Link>
    </button>
);

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const {theme} = useContext(ThemeContext);

    return (
        <nav className={`fixed w-full z-10 transition duration-300 ease-in-out 
            ${isScrolled ? `${theme ? 'bg-gray-900' : 'bg-gray-300'}` : 'bg-transparent'}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink href="/"><a href="/" className="flex-shrink-0">
                            <img className="h-8 w-auto rounded-md" src={logo} alt="Logo" />
                        </a>
                        </NavLink>
                            <div className="hidden md:block ml-10">
                                <div className="flex items-baseline space-x-4">
                                    <NavLink href="/">Home</NavLink>
                                        <NavLink href="/AllCampaigns">All Campaigns</NavLink>
                                            <NavLink href="/Profile">Profile</NavLink>
                                        <NavLink href="/AboutUs">About Us</NavLink>
                                </div>
                            </div>
                    </div>
                <div className="hidden md:block ">
                    <NavLink href="/Login">
                        <button className="bg-yellow-400 hover:bg-red-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                            Login
                        </button>
                    </NavLink>
                    <button className="ml-4 transition duration-150 ease-in-out">
                        <ThemeToggleBtn />
                    </button>
                    

                </div>
                
                <div className="md:hidden">
                    <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                    </button>
                </div>
                </div>
            </div>

        {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink href="/">Home</NavLink>
                        <NavLink href="/AllCampaigns">All Campaigns</NavLink>
                            <NavLink href="/Profile">Profile</NavLink>
                        <NavLink href="/AboutUs">AboutUs</NavLink>
                    <ThemeToggleBtn />
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                <NavLink href="/Login">
                        <button className="bg-yellow-400 hover:bg-red-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                            Login
                        </button>
                    </NavLink>
                </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import ThemeToggleBtn from "../ThemeToggleBtn/ThemeToggleBtn";
// import { Logs, CopyMinus  } from 'lucide-react'
// import  themeContext  from "../../components/ThemeContext/ThemeContext";

// const Header = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const {theme} = useContext(themeContext);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
        
//     };

//     return (
//     <nav 
//         className={`p-6 fixed w-full z-10 top-0`}>
        
//         <div className={`p-6 ${theme ? `bg-gray-700 opacity-75` : `bg-gray-300 opacity-75`}
//             rounded-3xl`}>

//         <div className="hidden md:flex flex-row items-center justify-between">
//             <div className="font-bold text-xl" id="navLinks">
//                 <Link to="/" className="font-bold text-xl"> 
//                     Home
//                 </Link>
//             </div>
//             {/* flex flex-col items-end space-y-2 */}
//                 <div className="space-x-4" id="navLinks">
//                     <Link to="/AllCampaigns" >All Campaigns</Link>
//                         <Link to="/Profile" >Profile</Link>
//                     <Link to="/Login" >Login</Link> 
//                 </div>
//                 <div className="flex flex-row items-center pr-9 space-x-2">
//                     < ThemeToggleBtn />
//                 </div>
//         </div>
//         </div>

//                 <div className="md:hidden fixed top-9 left-2">
//                     <button
//                         onClick={toggleMenu}
//                         className="font-bold py-2 px-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
//                         id="humburgerMenu"
//                     >
//                         {isMenuOpen ? <CopyMinus /> : <Logs />}
//                     </button>
//                 </div>
                
//                 {isMenuOpen && (
//                 <div className={`md:hidden fixed top-16 left-4 m-2 rounded-lg shadow-lg ${theme ? 'bg-gray-200 text-gray-900' : 'bg-gray-700 text-white' }`}>
//                     <div className="p-4 flex flex-col space-y-4 items-center justify-center">
//                         <Link to="/"  id="navLinks" onClick={() => setIsMenuOpen(false)} >Home</Link>
//                             <Link to="/AllCampaigns"  id="navLinks" onClick={() => setIsMenuOpen(false)}>All Campaigns</Link>
//                                 <Link to="/Profile" id="navLinks" onClick={() => setIsMenuOpen(false)}>Profile</Link>
//                                     <Link to="/Login"  id="navLinks" onClick={() => setIsMenuOpen(false)}>Login</Link> 
//                             < ThemeToggleBtn className="items-center" id='navLinks' />
//                     </div>
//                 </div>
//                 )}
//         </nav>
//     );
// }; 

// export default Header;