"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Prime Location",
    description: "Strategically located in Tarabai Park, near Circuit House, offering easy access to essential services."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Strong Community",
    description: "A vibrant community of families who share values of mutual respect, cooperation, and togetherness."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Safe & Secure",
    description: "Round-the-clock security with modern surveillance systems ensuring peace of mind for all residents."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Quality Living",
    description: "Well-maintained infrastructure and modern amenities that ensure comfortable living for every family."
  }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#faf7f2] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#f0e6d8]/50 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#c45c26]/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-[#7a9e7e]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Section label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c45c26]/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#c45c26] rounded-full" />
              <span className="text-[#c45c26] text-sm font-semibold tracking-wide uppercase">
                About Us
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2d2a26] leading-tight mb-6">
              Building Dreams,
              <span className="block text-[#c45c26]">Creating Homes</span>
            </h2>

            <div className="section-divider mb-8" />

            <p className="text-lg text-[#8b7355] leading-relaxed mb-6">
              Established in 1984, Om Ganesh Co-operative Housing Society Ltd. has been 
              a cornerstone of community living in Kolhapur. Located in the prestigious 
              Tarabai Park area, near Circuit House, we have grown into a thriving 
              residential community that values tradition while embracing modernity.
            </p>

            <p className="text-lg text-[#8b7355] leading-relaxed mb-8">
              Our society is more than just a place to live—it&apos;s a family of over 35 
              households who share common values of harmony, cooperation, and mutual 
              respect. We take pride in maintaining high standards of living while 
              fostering a sense of belonging among all residents.
            </p>

            {/* Reference number */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#f0e6d8] rounded-xl">
              <svg className="w-5 h-5 text-[#c45c26]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="text-xs text-[#8b7355]">Registration Reference</p>
                <p className="text-sm font-semibold text-[#2d2a26]">KPRKVHR/HSG/TC/311/1984-85</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-2xl shadow-lg shadow-[#2d2a26]/5 hover:shadow-xl hover:shadow-[#c45c26]/10 transition-all duration-500 hover:-translate-y-2 border border-[#f0e6d8]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#c45c26] to-[#d4a574] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#2d2a26] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#8b7355] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-[#2d2a26] to-[#3d3833] rounded-2xl">
            <div className="text-left">
              <h3 className="text-white font-semibold text-lg">Interested in our community?</h3>
              <p className="text-white/70 text-sm">Get in touch with us to learn more about available units.</p>
            </div>
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-[#c45c26] to-[#e07b47] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#c45c26]/30 transition-all duration-300 whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

