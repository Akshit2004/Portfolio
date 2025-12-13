"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

// --- Icons ---
const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const Copy = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- Components ---

const TimeDisplay = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata" // Assuming India based on context
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-neutral-200">
      {time}
    </div>
  );
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "akshumahajan2004@gmail.com";
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <section ref={containerRef} className="min-h-screen w-full bg-black text-white py-20 px-4 md:px-10 flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Noise/Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">
            Contact
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
            Let's build something <span className="text-neutral-500">legendary.</span>
          </h3>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* Main Email Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 md:row-span-2 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between group hover:border-white/20 transition-colors duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Mail className="text-neutral-300" />
              </div>
              <h4 className="text-2xl md:text-4xl font-bold max-w-md leading-tight mb-4">
                Have a project in mind? Let's create something meaningful.
              </h4>
              <p className="text-neutral-400 text-lg max-w-sm">
                I'm currently available for freelance work and open to full-time opportunities.
              </p>
            </div>

            <div className="relative z-10 mt-10">
              <div className="flex items-center gap-4 flex-wrap">
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors active:scale-95 duration-200"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Send Message
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-6 font-mono text-neutral-500 text-sm break-all">
                {email}
              </p>
            </div>
          </motion.div>

          {/* Location & Time Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors duration-500"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/5 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Location</span>
            </div>
            
            <div>
              <TimeDisplay />
              <div className="mt-2 flex items-center gap-2 text-neutral-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm">Solan, India</p>
              </div>
            </div>
          </motion.div>

          {/* Socials Card */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors duration-500"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/5 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Socials</span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/akshit0mahajan/" },
                { name: "GitHub", icon: Github, url: "https://github.com/Akshit2004" },
                { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/_akshitmahajan" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <social.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">{social.name}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        <motion.footer 
          className="mt-20 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          
          <p className="text-xs normal-case">
            &copy; {new Date().getFullYear()} Akshit Mahajan. Crafted with passion & code.
          </p>

        </motion.footer>
      </div>
    </section>
  );
}
