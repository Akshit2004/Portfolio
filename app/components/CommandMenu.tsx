"use client";

import * as React from "react";
import { Command } from "cmdk";
import { 
  Laptop, 
  User, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal,
  Zap
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [matrixMode, setMatrixMode] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const scrollToSection = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element);
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleMatrixMode = () => {
    const html = document.documentElement;
    if (matrixMode) {
      html.classList.remove('matrix-mode');
      document.body.style.textShadow = 'none';
    } else {
      html.classList.add('matrix-mode');
      // Simple matrix effect via class
    }
    setMatrixMode(!matrixMode);
  };

  // Manage Lenis state when menu opens/closes
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
    return () => {
      // Ensure we restart on unmount or close
      if (lenis) lenis.start();
    };
  }, [open]);

  return (
    <>
       {/* Matrix Styles (Injected here or we can put in globals.css) */}
      <style jsx global>{`
        .matrix-mode {
          filter: contrast(1.2) brightness(1.1) hue-rotate(90deg);
        }
        .matrix-mode body * {
            color: #00ff00 !important;
            border-color: #004400 !important;
            fill: #00ff00 !important;
            stroke: #00ff00 !important;
            text-shadow: 0 0 5px #00ff00;
        }
        .matrix-mode .hover\:bg-white\/10:hover {
            background-color: rgba(0, 255, 0, 0.2) !important;
        }
        
        /* Command Menu Styles */
        [cmdk-root] {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 640px;
          padding: 8px;
          z-index: 9999;
        }

        [cmdk-overlay] {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          z-index: 9998;
        }

        [cmdk-input] {
          font-family: inherit;
          border: none;
          width: 100%;
          font-size: 18px;
          padding: 20px;
          background: transparent;
          color: white;
          outline: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 8px;
        }

        [cmdk-input]::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        [cmdk-item] {
          content-visibility: auto;
          cursor: pointer;
          height: 48px;
          border-radius: 12px;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          color: #a1a1aa;
          user-select: none;
          transition: all 0.2s ease;
        }

        [cmdk-item][data-selected="true"] {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        [cmdk-group-heading] {
          user-select: none;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          padding: 8px 16px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>
    
      {/* Custom Modal Overlay instead of Command.Dialog to avoid Radix accessibility error without installing full Radix stack */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-[20vh] animate-in fade-in duration-200">
           {/* Backdrop */}
           <div 
             className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
             onClick={() => setOpen(false)}
           />
           
           {/* Modal Content */}
           <div className="relative w-full max-w-[640px] z-50">
            <Command 
                className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                loop
            >
                <div className="flex items-center px-4 border-b border-white/10">
                <Terminal className="w-5 h-5 text-neutral-500 mr-2" />
                <Command.Input 
                    autoFocus
                    placeholder="Type a command or search..." 
                    className="w-full bg-transparent border-none text-white p-4 outline-none placeholder:text-neutral-500 text-lg"
                />
                </div>
                
                <Command.List 
                  className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-hide"
                  data-lenis-prevent
                >
                <Command.Empty className="py-6 text-center text-neutral-500">No results found.</Command.Empty>

                <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}>
                    <User className="w-4 h-4" />
                    <span>Home</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => scrollToSection("about"))}>
                    <User className="w-4 h-4" />
                    <span>About Me</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => scrollToSection("work"))}>
                    <Laptop className="w-4 h-4" />
                    <span>Projects</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => scrollToSection("experience"))}>
                    <Briefcase className="w-4 h-4" />
                    <span>Experience</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => scrollToSection("contact"))}>
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Socials">
                    <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/Akshit2004', '_blank'))}>
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    </Command.Item>
                    <Command.Item onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/akshit-mahajan-3b6070251/', '_blank'))}>
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="System">
                    <Command.Item onSelect={() => runCommand(toggleMatrixMode)}>
                    <Zap className="w-4 h-4 text-green-500" />
                    <span className={matrixMode ? "text-green-500" : ""}>
                        {matrixMode ? "Disable Matrix Mode" : "Enable Matrix Mode"}
                    </span>
                    </Command.Item>
                </Command.Group>

                </Command.List>
                
                <div className="border-t border-white/10 p-2 px-4 flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                <span>Flow OS v1.0</span>
                <div className="flex gap-2">
                    <span>Cmd+K to open</span>
                    <span>Esc to close</span>
                </div>
                </div>
            </Command>
           </div>
        </div>
      )}
    </>
  );
}
