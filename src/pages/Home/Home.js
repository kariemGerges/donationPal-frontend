// components
import HeroSection from "../../components/HomeComponents/HeroSection";
import CompaniesSection from "../../components/HomeComponents/CompaniesSection";
import TestimonialsSection from "../../components/HomeComponents/TestimonialCards";

const Home = () => {
    return (
        <div className="min-h-screen">
            <style jsx global>{`
                        @keyframes scrollLeft {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        @keyframes scrollRight {
                            0% { transform: translateX(-50%); }
                            100% { transform: translateX(0); }
                        }
                        .animate-scroll-left {
                            animation: scrollLeft 40s linear infinite;
                        }
                        .animate-scroll-right {
                            animation: scrollRight 40s linear infinite;
                        }
                `}
            </style>
            <HeroSection />
            <CompaniesSection />
            <TestimonialsSection />
        </div>
        );
    };

export default Home;