"use client";

import { useEffect, useRef, useState } from "react";

const newsItems = [
  {
    id: 1,
    title: "Second Special General Meeting",
    date: "February 01, 2026",
    category: "Meeting",
    excerpt:
      "The 2nd Special General Meeting of Om Ganesh Co-operative Housing Society Ltd. will be held on Sunday, February 01, 2026 at 3:00 PM at the society site, Building No. 02 parking area, 29 K/2, Tarabai Park, near Circuit House, Kolhapur. The agenda includes confirmation of the AGM proceedings held on September 28, 2025, discussion and approval of comparative statements of contractor quotations for redevelopment of Buildings No. 1, 2, and 3, and any other matters with the permission of the Chairman. All members are requested to attend.",
    important: true,
  },
  {
    id: 2,
    title: "Water Tank Cleaning Schedule",
    date: "January 10, 2026",
    category: "Maintenance",
    excerpt:
      "Water tank cleaning will be conducted on the last Sunday of every month. Please store water accordingly.",
    important: false,
  },
  {
    id: 3,
    title: "Republic Day Celebration",
    date: "January 8, 2026",
    category: "Event",
    excerpt:
      "Join us for Republic Day celebrations on January 26th at 8:00 AM at the society garden. Flag hoisting followed by cultural programs.",
    important: true,
  },
  {
    id: 4,
    title: "New Parking Guidelines",
    date: "December 28, 2025",
    category: "Notice",
    excerpt:
      "New parking allocation guidelines have been implemented. Please check the notice board for your assigned parking space.",
    important: false,
  },
  {
    id: 5,
    title: "Diwali Celebration Recap",
    date: "November 15, 2025",
    category: "Event",
    excerpt:
      "Thank you to all residents who participated in making our Diwali celebration a grand success. View the photo gallery on the society app.",
    important: false,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Meeting":
      return "bg-blue-100 text-blue-700";
    case "Maintenance":
      return "bg-yellow-100 text-yellow-700";
    case "Event":
      return "bg-green-100 text-green-700";
    case "Notice":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function News() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#faf7f2] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#f0e6d8]/50 to-transparent" />
      <div className="absolute -bottom-40 right-0 w-80 h-80 bg-[#c45c26]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c45c26]/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#c45c26] rounded-full animate-pulse" />
            <span className="text-[#c45c26] text-sm font-semibold tracking-wide uppercase">
              News & Announcements
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2d2a26] leading-tight mb-6">
            Stay Updated with
            <span className="block text-[#c45c26]">Society News</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-[#8b7355]">
            Keep yourself informed about the latest happenings, events, and
            important notices from Om Ganesh Housing Society.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured News (first item) */}
          <div
            className={`lg:row-span-2 group transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="h-full p-8 bg-gradient-to-br from-[#2d2a26] to-[#3d3833] rounded-3xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 pattern-grid" />

              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#c45c26]/30 rounded-full blur-3xl" />

              <div className="relative">
                {newsItems[0].important && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full mb-4">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    Important
                  </span>
                )}

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(newsItems[0].category)} mb-4 ml-2`}
                >
                  {newsItems[0].category}
                </span>

                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4 group-hover:text-[#d4a574] transition-colors">
                  {newsItems[0].title}
                </h3>

                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  {newsItems[0].excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#d4a574]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white/50">{newsItems[0].date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Other News Items */}
          <div className="space-y-4">
            {newsItems.slice(1).map((news, index) => (
              <div
                key={news.id}
                className={`group p-6 bg-white rounded-2xl shadow-lg shadow-[#2d2a26]/5 hover:shadow-xl hover:shadow-[#c45c26]/10 border border-[#f0e6d8] transition-all duration-500 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(news.category)}`}
                      >
                        {news.category}
                      </span>
                      {news.important && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          Important
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-[#2d2a26] mb-2 group-hover:text-[#c45c26] transition-colors">
                      {news.title}
                    </h3>

                    <p className="text-[#8b7355] text-sm leading-relaxed line-clamp-2">
                      {news.excerpt}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-[#8b7355]/60">{news.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div
          className={`mt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#c45c26] text-[#c45c26] rounded-full font-semibold hover:bg-[#c45c26] hover:text-white transition-all duration-300">
            View All Announcements
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
