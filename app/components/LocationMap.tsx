"use client";

import { useEffect, useRef, useState } from "react";

export default function LocationMap() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nearbyPlaces = [
    { name: "Circuit House", distance: "100m", icon: "🏛️" },
    { name: "Tarabai Park", distance: "50m", icon: "🌳" },
    { name: "Railway Station", distance: "2.5km", icon: "🚉" },
    { name: "Bus Stand", distance: "1.8km", icon: "🚌" },
    { name: "CPR Hospital", distance: "1.2km", icon: "🏥" },
    { name: "DY Patil School", distance: "800m", icon: "🏫" }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#f0e6d8] to-[#2d2a26] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c45c26]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#c45c26] rounded-full" />
            <span className="text-[#c45c26] text-sm font-semibold tracking-wide uppercase">
              Our Location
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2d2a26] leading-tight mb-6">
            Find Us in the Heart of
            <span className="block text-[#c45c26]">Kolhapur</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-[#8b7355]">
            Strategically located in Tarabai Park, our society enjoys excellent 
            connectivity to all major landmarks and essential services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.2876!2d74.2388!3d16.7050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQyJzE4LjAiTiA3NMKwMTQnMTkuNyJF!5e0!3m2!1sen!2sin!4v1705800000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              
              {/* Map overlay gradient */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#2d2a26]/20 to-transparent" />
              
              {/* Location pin card */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm">
                <div className="bg-white rounded-2xl shadow-xl p-4 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c45c26] to-[#d4a574] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2a26]">Om Ganesh Housing Society</h3>
                    <p className="text-sm text-[#8b7355]">29 K / 2, Tarabai Park, near Circuit House, Kolhapur</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Om+Ganesh+Housing+Society+Tarabai+Park+Kolhapur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[#c45c26] font-medium mt-2 hover:underline"
                    >
                      Get Directions
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Places */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <h3 className="text-xl font-serif font-bold text-[#2d2a26] mb-6">
                Nearby Landmarks
              </h3>
              
              <div className="space-y-4">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-[#faf7f2] rounded-xl hover:bg-[#f0e6d8] transition-colors"
                  >
                    <span className="text-2xl">{place.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#2d2a26]">{place.name}</h4>
                    </div>
                    <span className="text-sm text-[#8b7355] bg-white px-3 py-1 rounded-full">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-[#f0e6d8]">
                <h4 className="text-sm font-medium text-[#8b7355] mb-4 uppercase tracking-wide">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Om+Ganesh+Housing+Society+Tarabai+Park+Kolhapur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 bg-[#c45c26] text-white rounded-xl font-medium hover:bg-[#9a4a1e] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Maps
                  </a>
                  <a
                    href="tel:+912312650000"
                    className="flex items-center justify-center gap-2 p-3 bg-[#7a9e7e] text-white rounded-xl font-medium hover:bg-[#5c7a5f] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

