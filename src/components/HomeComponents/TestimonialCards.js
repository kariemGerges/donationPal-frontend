import { Star } from "lucide-react";
import logo from '../../assets/AIDonation.jpeg'


const TestimonialCard = ({ name, text }) => (
    <div className=" p-4 rounded-lg border border-yellow-300  w-64 flex-shrink-0 mx-3 my-2">
      <p className=" mb-2 text-sm h-20 overflow-hidden">{text}</p>
      <p className="font-semibold text-sm">{name}</p>
      <div className="flex text-yellow-400 mt-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={12} fill="currentColor" />
        ))}
      </div>
    </div>
  );
  
  const TestimonialsRow = ({ testimonials, direction }) => (
    <div className="flex mb-4 overflow-hidden">
      <div className={`flex animate-scroll-${direction}`}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
  
  const TestimonialsSection = () => {
    const allTestimonials = [
      { name: "John Doe", text: "Donation Pal made it so easy for me to contribute to causes I care about." },
      { name: "Jane Smith", text: "I love how transparent and user-friendly the platform is. Highly recommended!" },
      { name: "Mike Johnson", text: "Thanks to Donation Pal, I've been able to make a real impact in my community." },
      { name: "Sarah Lee", text: "The variety of causes available on Donation Pal is impressive. I always find meaningful projects to support." },
      { name: "Alex Chen", text: "Donation Pal's platform is intuitive and secure. I feel confident donating through their system." },
      { name: "Emily Wong", text: "I appreciate how Donation Pal connects me with local charities. It's made giving back so much easier." },
      { name: "Carlos Rodriguez", text: "The regular updates on how my donations are used keep me motivated to give more." },
      { name: "Aisha Patel", text: "Donation Pal's customer service is excellent. They're always ready to help with any questions." },
      { name: "Tom Wilson", text: "I've discovered so many worthy causes through Donation Pal. It's expanded my perspective on giving." },
      { name: "Luna Kim", text: "The ability to set up recurring donations has made my charitable giving much more consistent." },
      { name: "Hassan Ali", text: "Donation Pal's impact reports are thorough and inspiring. I can see the real difference we're making." },
      { name: "Olivia Brown", text: "I love how easy it is to share causes with friends through Donation Pal. It amplifies our collective impact." },
      { name: "Liam O'Connor", text: "The platform's transparency gives me peace of mind about where my donations are going." },
      { name: "Sofia Gonzalez", text: "Donation Pal has turned my occasional giving into a regular habit. It feels great to contribute consistently." },
      { name: "Yuki Tanaka", text: "I appreciate the diverse range of causes available. There's something for every passion and interest." },
    ];
  
    // Shuffle and split testimonials into three groups
    const shuffled = allTestimonials.sort(() => 0.5 - Math.random());
    const testimonialGroups = [
      shuffled.slice(0, 5),
      shuffled.slice(5, 10),
      shuffled.slice(10, 15)
    ];
  
    return (
      <section className="py-16 px-4 overflow-hidden"
    //   style={{
    //     background: `url(${logo})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover',
    //     backgroundAttachment: 'fixed',
    // }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <TestimonialsRow testimonials={testimonialGroups[0]} direction="left" />
          <TestimonialsRow testimonials={testimonialGroups[1]} direction="right" />
          <TestimonialsRow testimonials={testimonialGroups[2]} direction="left" />
        </div>
      </section>
    );
  };

export default TestimonialsSection;