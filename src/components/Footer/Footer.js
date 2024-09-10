import React, { useContext } from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, UserRoundPen, Landmark, House } from 'lucide-react';
import { Link } from 'react-router-dom';
import  ThemeContext  from '../ThemeContext/ThemeContext';
import logo from '../../assets/AIDonation.jpeg'

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <footer className={`bottom-0 w-full 
                ${theme ? 'bg-gradient-to-r from-[#3B3530] to-[#B8860B] text-black py-8' 
                    : 'bg-gradient-to-r from-[#E9DDCF] to-[#D2691E] text-gray-900 py-8'}
                `}
                style={{
                    background: `url(${logo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                }}
                >
                    <div className='  '></div>
        <div className="max-w-6xl mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="space-y-4">
                <h3 className="text-2xl font-bold">Donation Pal</h3>
                <p className="text-sm">Making a difference, one donation at a time.</p>
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                <Heart className="text-red-400 animate-pulse" size={20} />
                <span>Join us in spreading kindness</span>
                </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-xl font-semibold">Contact Us</h4>
                <div className="space-y-2">
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <Mail size={16} />
                    <a href="mailto:info@donationpal.com" className="hover:underline">info@donationpal.com</a>
                </div>
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <Phone size={16} />
                    <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
                </div>
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <MapPin size={16} />
                    <span>123 Charity Lane, Giving City, 12345</span>
                </div>
                </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-xl font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                <a href="#" className="transform transition-transform hover:scale-110">
                    <Facebook size={24} />
                </a>
                <a href="#" className="transform transition-transform hover:scale-110">
                    <Twitter size={24} />
                </a>
                <a href="#" className="transform transition-transform hover:scale-110">
                    <Instagram size={24} />
                </a>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xl font-semibold">Links</h4>
                <div className="space-y-2">
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <House  size={16} />
                        <Link to='/'><a className="hover:underline">Home</a></Link>
                </div>
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <Landmark  size={16} />
                    <Link to='/AllCampaigns'><a className="hover:underline">All Campaigns</a></Link>
                </div>
                <div className="flex items-center space-x-2 transition-transform hover:translate-x-1">
                    <UserRoundPen  size={16} />
                    <Link to='/Profile'><a className="hover:underline">Profile</a></Link>
                </div>
                </div>
            </div>

            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-900/30 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Donation Pal. All rights reserved.</p><br/>
            <p className="text-sm">Made with ❤️ by Kariem Gerges.</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;