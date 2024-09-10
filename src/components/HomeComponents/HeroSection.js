import img from "../../assets/DonationHands.jpeg";
import TextAnimation from "../Animation/TextAnimation/TextAnimation";

const HeroSection = () => (
    <section className="">
        <img src={img} alt="Hero Image" className=" w-full h-96 object-cover mb-8" 
            style={{backgroundAttachment: "fixed"}}
        />
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6"><TextAnimation text="Make a Difference Today"/></h1>
            <p className="text-xl mb-8">Join Donation Pal and help us create a better world, one donation at a time.</p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition duration-300">
            Start Donating
            </button>
        </div>
    </section>
    );

export default HeroSection;