"use client";

import { motion } from "motion/react";
import { TestimonialCard } from "./ui/testimonial-card";
import { BackgroundBlobs } from "./ui/background-blobs";

const testimonials = [
  {
    text: "Akshit modernized the Aaradhya Trust platform, integrating Razorpay and building a secure admin dashboard. His work boosted our donation conversions by 25% and delivered a world-class digital presence.",
    name: "Balachandiran",
    role: "Founder, TenSketch",
  },
  {
    text: "The ServiceBridge ticketing system Akshit built has been a game-changer for Eon Infotech. By centralizing communication and automating triage, he helped us reduce our response times by 40%.",
    name: "Amit Khanna",
    role: "Director, Eon Infotech",
  },
  {
    text: "Flowcept's high-performance Kanban board is incredibly fast. The real-time synchronization across our team's devices has streamlined our sprint planning, saving us hours every week.",
    name: "Sarah Chen",
    role: "Product Lead, TechFlow",
  },
  {
    text: "As a developer, I appreciate tools that don't get in the way. Flowcept's drag-and-drop handles hundreds of items without a hitch, and the dark-mode UI is perfect for deep focus work.",
    name: "David Miller",
    role: "Engineering Manager",
  },
  {
    text: "We switched to Flowcept and saw a 30% reduction in our team's task management overhead. The clarity and speed it provides for agile teams is unmatched in the project management space.",
    name: "Emily Rodriguez",
    role: "Full-Stack Dev @ Pulse",
  },
  {
    text: "The real-time collaboration on Flowcept is seamless. Seeing task updates happen instantly across the board has improved our coordination and eliminated status update meetings.",
    name: "Michael Park",
    role: "Senior Developer",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <BackgroundBlobs />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-primary/20 bg-primary/5 rounded-full text-primary"
          >
            Social Proof
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            What our users say
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 leading-relaxed">
            Don't just take our word for it. Discover how we've helped hundreds of businesses scale their operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={index % 4 === 1 || index % 4 === 2 ? "lg:mt-12" : ""}>
              <TestimonialCard
                {...testimonial}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
