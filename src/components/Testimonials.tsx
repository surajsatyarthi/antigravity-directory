'use client';

import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Senior AI Engineer",
    text: "The best directory for Antigravity resources. The live GitHub metrics make it so easy to find high-quality MCP servers.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Fullstack Developer",
    text: "The comparison engine saved me hours of research. Seeing how blocks vs other MCPs perform head-to-head is a game changer.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Product Designer",
    text: "Clean, fast, and extremely high-fidelity. Finally a place that treats AI prompts and rules as first-class assets.",
    avatar: "MT"
  },
  {
    name: "Priya Patel",
    role: "ML Research Lead",
    text: "This directory has become our team's go-to resource. The verified badges and AEO focus make discovery incredibly efficient.",
    avatar: "PP"
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    text: "Impressive curation quality. Every tool I've found here actually works and solves real problems. The do-follow backlinks are a nice bonus.",
    avatar: "DK"
  },
  {
    name: "Elena Volkov",
    role: "Startup Founder",
    text: "Listed our tool here and saw immediate traction. The 24-48 hour turnaround for featured listings is incredibly fast.",
    avatar: "EV"
  },
  {
    name: "James Murphy",
    role: "Tech Lead",
    text: "Finally, a directory that doesn't feel like a link dump. The head-to-head comparisons help us make informed decisions quickly.",
    avatar: "JM"
  },
  {
    name: "Nina Santos",
    role: "AI Product Manager",
    text: "The categorization and filtering system is top-notch. I can find exactly what I need in seconds instead of browsing endlessly.",
    avatar: "NS"
  },
  {
    name: "Tom Anderson",
    role: "CTO",
    text: "Best ROI we've seen from any directory listing. The quality of traffic and the permanent backlink make this a no-brainer for any AI tool.",
    avatar: "TA"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const itemsPerPage = 3;
  const totalSlides = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  const nextSlide = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, totalSlides]);

  const prevSlide = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, totalSlides]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, nextSlide]);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-gray-300 uppercase tracking-[0.2em]">Community Feedback</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center hover:border-white/20 transition-all disabled:opacity-50"
            aria-label="Previous testimonials"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-8 h-8 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center hover:border-white/20 transition-all disabled:opacity-50"
            aria-label="Next testimonials"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TESTIMONIALS.slice(slideIdx * itemsPerPage, (slideIdx + 1) * itemsPerPage).map((t, i) => (
                  <div key={i} className="bg-[#050505] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-yellow-500/90 text-yellow-500/90" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-300 italic mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] font-black text-gray-400">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t.name}</div>
                        <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                  setTimeout(() => setIsTransitioning(false), 600);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-gray-400 w-6'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
