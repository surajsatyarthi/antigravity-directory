'use client';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 sm:px-8 relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-[1.1]">
          Contribute. Connect. <span className="text-blue-400">Collect$</span>
        </h1>
      </div>
    </section>
  );
}
