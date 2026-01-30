"use client";

import { useEffect, useRef, useState } from "react";

interface NewsItem {
  _id: string;
  title: string;
  excerpt: string;
  category: "Meeting" | "Maintenance" | "Event" | "Notice" | "General";
  important: boolean;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function News() {
  const [isVisible, setIsVisible] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news?limit=5");
        const data = await res.json();

        if (data.success) {
          setNewsItems(data.news);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Fallback data if no news from API
  const fallbackNews: NewsItem[] = [
    {
      _id: "1",
      title: "Welcome to Om Ganesh Housing Society",
      excerpt: "Stay tuned for the latest announcements and updates from your society management committee.",
      category: "General",
      important: false,
      published: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const displayNews = newsItems.length > 0 ? newsItems : (isLoading ? [] : fallbackNews);

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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-[#8b7355]">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading news...
            </div>
          </div>
        )}

        {/* News Grid */}
        {!isLoading && displayNews.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Featured News (first item) */}
            <div
              className={`lg:row-span-2 group transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="h-full p-8 bg-gradient-to-br from-[#2d2a26] to-[#3d3833] rounded-3xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 pattern-grid" />
                
                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#c45c26]/30 rounded-full blur-3xl" />
                
                <div className="relative">
                  {displayNews[0].important && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full mb-4">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                      Important
                    </span>
                  )}
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(displayNews[0].category)} mb-4 ml-2`}>
                    {displayNews[0].category}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4 group-hover:text-[#d4a574] transition-colors">
                    {displayNews[0].title}
                  </h3>

                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    {displayNews[0].excerpt}
                  </p>

                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#d4a574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white/50">
                      {formatDate(displayNews[0].publishedAt || displayNews[0].createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Other News Items */}
            <div className="space-y-4">
              {displayNews.slice(1).map((news, index) => (
                <div
                  key={news._id}
                  className={`group p-6 bg-white rounded-2xl shadow-lg shadow-[#2d2a26]/5 hover:shadow-xl hover:shadow-[#c45c26]/10 border border-[#f0e6d8] transition-all duration-500 hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(news.category)}`}>
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
                      <p className="text-xs text-[#8b7355]/60">
                        {formatDate(news.publishedAt || news.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && displayNews.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-[#8b7355]/30 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-[#8b7355]">No announcements at this time. Check back later!</p>
          </div>
        )}

        {/* View All Button */}
        {displayNews.length > 0 && (
          <div
            className={`mt-12 text-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#c45c26] text-[#c45c26] rounded-full font-semibold hover:bg-[#c45c26] hover:text-white transition-all duration-300">
              View All Announcements
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
