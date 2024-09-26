import React, { useContext } from 'react';
import img from "../../assets/DonationHands.jpeg";
import TextAnimation from "../Animation/TextAnimation/TextAnimation";
import { Link } from "react-router-dom";
import ThemeContext from '../../components/ThemeContext/ThemeContext';


const HeroSection = () => {

    const { theme } = useContext(ThemeContext);

    return (    
    <section className="">
        <img src={img} alt="Hero Image" className=" w-full h-96 object-cover mb-8" 
            style={{backgroundAttachment: "fixed"}}
        />
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6"><TextAnimation text="Make a Difference Today"/></h1>
            <p className="text-xl mb-8">Join Donation Pal and help us create a better world, one donation at a time.</p>
            <div className="flex justify-center">
                <Link to="/AllCampaigns" 
                    className={`${theme ? 'bg-white text-orange-400' : 'bg-orange-400 text-white'} 
                    px-6 py-4 rounded-xl font-bold text-3xl hover:bg-opacity-90 transition `}>
                    Start Donating 
                </Link>
            </div>
        </div>
    </section>
    );
}

export default HeroSection;