"use client";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "We were struggling with inventory management for our retail chain. This solution not only simplified stock tracking but also helped us reduce wastage by 20%. The local support team is very responsive.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
    name: "Rajesh Kumar",
    role: "Operations Head",
  },
  {
    text: "Integration with our existing legacy systems was my biggest worry. The team handled the migration perfectly. It's rare to find such clean code and documentation in enterprise software these days.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop",
    name: "Amit Patel",
    role: "IT Director",
  },
  {
    text: "The dashboard is incredibly intuitive. My team didn't need weeks of training to get started. It just works, and the analytics help us understand our client needs much better.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop",
    name: "Priya Sharma",
    role: "Customer Success Lead",
  },
  {
    text: "As a startup founder, I need tools that scale. We started small, but as we expanded to three cities, the software adapted seamlessly. Highly recommended for growing businesses.",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=100&auto=format&fit=crop",
    name: "Anjali Gupta",
    role: "Founder & CEO",
  },
  {
    text: "Finally, a tool that actually helps with workflow instead of complicating it. The automated reporting feature saves me at least 5 hours every week. A game changer for our productivity.",
    image: "https://images.unsplash.com/photo-1598550832205-d41f4286cf6e?q=80&w=100&auto=format&fit=crop",
    name: "Meera Reddy",
    role: "Project Manager",
  },
  {
    text: "The data visualization capabilities are top-notch. I can generate detailed insights for our quarterly reviews in minutes. It has made decision-making so much faster for the leadership team.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=100&auto=format&fit=crop",
    name: "Sneha Kapoor",
    role: "Business Analyst",
  },
  {
    text: "We saw a 40% increase in lead conversion after implementing the CRM module. The ability to track customer interactions in real-time gives us a massive edge over competitors.",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=100&auto=format&fit=crop",
    name: "Vikram Singh",
    role: "Marketing Director",
  },
  {
    text: "The mobile app is a lifesaver for my field sales team. They can update orders on the go, and I get real-time visibility into sales performance across regions.",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=100&auto=format&fit=crop",
    name: "Neha Verma",
    role: "Sales Manager",
  },
  {
    text: "Managing orders from multiple marketplaces was a nightmare before. Now everything is centralized. The inventory sync is flawless, and we haven't had a single overselling issue since launch.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop",
    name: "Arjun Mehta",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
