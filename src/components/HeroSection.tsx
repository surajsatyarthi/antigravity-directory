'use client';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 flex items-center justify-center overflow-hidden bg-white border-b border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(37,99,235,0.05),transparent_60%)]" />

      <div className="container mx-auto px-6 sm:px-8 relative z-10 text-center max-w-4xl">
        <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">
          The #1 resource hub for Google Antigravity IDE
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
          Every Antigravity resource.<br />
          <span className="text-blue-600">One place.</span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Rules, Skills, MCP configs, and Boilerplates — curated, searchable, and free.
        </p>
      </div>
    </section>
  );
}
