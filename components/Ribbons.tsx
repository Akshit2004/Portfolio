const words = ["Available for work", "Full-stack dev", "Design brain", "Engineer hands", "Based in India"];

function Band({ className, reverse }: { className: string; reverse?: boolean }) {
  return (
    <div className={`border-y-[3px] border-ink py-3 ${className}`}>
      <div className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[0, 1, 2, 3].map((n) => (
          <span key={n} className="flex shrink-0 items-center font-display text-2xl font-extrabold uppercase md:text-4xl">
            {words.map((w) => (
              <span key={w} className="flex items-center">
                {w}
                <span className="mx-6">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

// Two crossing marquee ribbons
export default function Ribbons() {
  return (
    <div aria-hidden className="relative z-10 -my-8 overflow-hidden py-16">
      <Band className="-rotate-3 bg-pink" />
      <Band className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 bg-yellow" reverse />
    </div>
  );
}
