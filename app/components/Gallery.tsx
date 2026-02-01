"use client";

import { useEffect, useRef, useState } from "react";

const galleryImages = [
  {
    id: 1,
   
    title: "Community Garden",
    category: "Outdoors",
    gradient: "from-[#c45c26] to-[#d4a574]",
  },
  {
    id: 2,
    title: "Building Exterior",
    category: "Architecture",
    gradient: "from-[#7a9e7e] to-[#9bb89e]",
    src: "/gallery/building-exterior.jpeg"
  },
  {
    id: 3,
    title: "Children's Play Area",
    category: "Recreation",
    gradient: "from-[#d4a574] to-[#e8c9a7]"
  },
  {
    id: 4,
    title: "Society Entrance",
    category: "Architecture",
    gradient: "from-[#8b7355] to-[#a68b6a]"
  },
  {
    id: 5,
    title: "Common Area",
    category: "Interior",
    gradient: "from-[#5c7a5f] to-[#7a9e7e]"
  },
  {
    id: 6,
    title: "Parking Space",
    category: "Facilities",
    gradient: "from-[#2d2a26] to-[#4a4540]"
  }
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f0e6d8] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#faf7f2] to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#c45c26]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7a9e7e]/10 rounded-full blur-3xl" />

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
              Photo Gallery
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2d2a26] leading-tight mb-6">
            A Glimpse of Our
            <span className="block text-[#c45c26]">Beautiful Community</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-[#8b7355]">
            Explore the various spaces and facilities that make Om Ganesh Housing 
            Society a wonderful place to call home.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${index === 0 || index === 3 ? "md:row-span-2 md:aspect-auto" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Image or gradient placeholder */}
              {"src" in image && image.src ? (
                <img
                  src={image.src}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`} />
                  <div className="absolute inset-0 opacity-20 pattern-dots" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                  {image.category}
                </span>
                <h3 className="text-white font-semibold text-lg">
                  {image.title}
                </h3>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[#8b7355]/70 text-sm italic">
            * Gallery images are placeholders. Actual photographs of the society will be updated soon.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-4xl w-full aspect-video rounded-2xl overflow-hidden">
            {galleryImages.find(img => img.id === selectedImage) && (() => {
              const selected = galleryImages.find(img => img.id === selectedImage)!;
              const hasImage = "src" in selected && selected.src;
              return hasImage ? (
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full h-full object-contain bg-black"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${selected.gradient} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <svg className="w-24 h-24 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-2xl font-serif font-bold">{selected.title}</h3>
                    <p className="text-white/60 mt-2">{selected.category}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}

