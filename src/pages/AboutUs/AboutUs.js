import React, { useContext } from 'react';
import ThemeContext from '../../components/ThemeContext/ThemeContext';

const AboutUs = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen p-8 ${theme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <h1 className={`text-4xl font-bold mb-8 ${theme ? 'text-blue-300' : 'text-blue-600'}`}>About DonationPal</h1>

                <section className="mb-12">
                <h2 className={`text-2xl font-semibold mb-4 ${theme ? 'text-blue-200' : 'text-blue-500'}`}>Our Mission</h2>
                <p className="mb-4">
                    At DonationPal, we believe in the power of collective giving. Our mission is to connect generous donors with impactful causes, making the world a better place one donation at a time.
                </p>
                <p>
                    We strive to create a transparent, efficient, and user-friendly platform that empowers both donors and charitable organizations to maximize their positive impact on society.
                </p>
                </section>

                <section className="mb-12">
                <h2 className={`text-2xl font-semibold mb-4 ${theme ? 'text-blue-200' : 'text-blue-500'}`}>Our Story</h2>
                <p className="mb-4">
                    Founded in 2023, DonationPal emerged from a simple idea: to make charitable giving as easy and accessible as possible. Our founders, a group of tech enthusiasts and philanthropists, recognized the need for a platform that could bridge the gap between donors and causes they care about.
                </p>
                <p>
                    Since our inception, we've helped facilitate thousands of donations, supporting causes ranging from local community projects to global humanitarian efforts.
                </p>
                </section>

                <section className="mb-12">
                <h2 className={`text-2xl font-semibold mb-4 ${theme ? 'text-blue-200' : 'text-blue-500'}`}>Our Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className={`p-4 rounded-lg ${theme ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-3xl font-bold mb-2 ${theme ? 'text-blue-300' : 'text-blue-600'}`}>10,000+</p>
                    <p>Donations Facilitated</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-3xl font-bold mb-2 ${theme ? 'text-blue-300' : 'text-blue-600'}`}>$5M+</p>
                    <p>Total Funds Raised</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className={`text-3xl font-bold mb-2 ${theme ? 'text-blue-300' : 'text-blue-600'}`}>500+</p>
                    <p>Charitable Organizations Supported</p>
                    </div>
                </div>
                </section>

                <section>
                <h2 className={`text-2xl font-semibold mb-4 ${theme ? 'text-blue-200' : 'text-blue-500'}`}>Join Us</h2>
                <p className="mb-4">
                    Whether you're looking to make a donation, start a fundraising campaign, or partner with us as a charitable organization, we welcome you to join the DonationPal community.
                </p>
                <p>
                    Together, we can make a lasting positive impact on the world. Start your journey with DonationPal today!
                </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;