"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface News {
  _id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: "Meeting" | "Maintenance" | "Event" | "Notice" | "General";
  important: boolean;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

const categories = ["Meeting", "Maintenance", "Event", "Notice", "General"] as const;

export default function NewsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "General" as News["category"],
    important: false,
    published: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authData.success) {
          router.push("/admin");
          return;
        }

        setUser(authData.user);
        await fetchNews();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?admin=true&limit=50");
      const data = await res.json();

      if (data.success) {
        setNewsList(data.news);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleOpenModal = (news?: News) => {
    if (news) {
      setEditingNews(news);
      setFormData({
        title: news.title,
        excerpt: news.excerpt,
        content: news.content || "",
        category: news.category,
        important: news.important,
        published: news.published,
      });
    } else {
      setEditingNews(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category: "General",
        important: false,
        published: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "General",
      important: false,
      published: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingNews ? `/api/news/${editingNews._id}` : "/api/news";
      const method = editingNews ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        await fetchNews();
        handleCloseModal();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save news");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (newsId: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      const res = await fetch(`/api/news/${newsId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setNewsList((prev) => prev.filter((n) => n._id !== newsId));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTogglePublish = async (news: News) => {
    try {
      const res = await fetch(`/api/news/${news._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !news.published }),
      });

      const data = await res.json();

      if (data.success) {
        setNewsList((prev) =>
          prev.map((n) =>
            n._id === news._id ? { ...n, published: !news.published } : n
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c45c26] to-[#d4a574] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-serif font-bold text-white">ॐ</span>
          </div>
          <p className="text-[#8b7355]">Loading news...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const categoryColors = {
    Meeting: "bg-blue-100 text-blue-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
    Event: "bg-green-100 text-green-700",
    Notice: "bg-purple-100 text-purple-700",
    General: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="ml-64">
        <Header
          title="News & Announcements"
          subtitle="Create and manage society news and announcements"
        >
          <button
            onClick={() => handleOpenModal()}
            className="px-5 py-2.5 bg-gradient-to-r from-[#c45c26] to-[#e07b47] text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#c45c26]/30 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add News
          </button>
        </Header>

        <div className="p-8">
          {newsList.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#f0e6d8] p-12 text-center">
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
              <h3 className="text-lg font-semibold text-[#2d2a26] mb-2">No news yet</h3>
              <p className="text-[#8b7355] mb-4">Create your first news announcement</p>
              <button
                onClick={() => handleOpenModal()}
                className="px-5 py-2.5 bg-gradient-to-r from-[#c45c26] to-[#e07b47] text-white rounded-xl font-semibold inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add News
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {newsList.map((news) => (
                <div
                  key={news._id}
                  className="bg-white rounded-2xl border border-[#f0e6d8] p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[news.category]}`}>
                          {news.category}
                        </span>
                        {news.important && (
                          <span className="px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Important
                          </span>
                        )}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            news.published
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {news.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#2d2a26] mb-1">{news.title}</h3>
                      <p className="text-[#8b7355] text-sm line-clamp-2">{news.excerpt}</p>
                      <p className="text-xs text-[#8b7355]/60 mt-2">
                        Created: {new Date(news.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        {news.publishedAt && (
                          <> · Published: {new Date(news.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}</>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(news)}
                        className={`p-2 rounded-lg transition-colors ${
                          news.published
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={news.published ? "Unpublish" : "Publish"}
                      >
                        {news.published ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleOpenModal(news)}
                        className="p-2 text-[#c45c26] hover:bg-[#faf7f2] rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(news._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#f0e6d8]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-[#2d2a26]">
                  {editingNews ? "Edit News" : "Add New News"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-[#f0e6d8] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2d2a26] mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#f0e6d8] rounded-xl focus:outline-none focus:border-[#c45c26] focus:ring-1 focus:ring-[#c45c26] transition-all"
                  placeholder="Enter news title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d2a26] mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#f0e6d8] rounded-xl focus:outline-none focus:border-[#c45c26] focus:ring-1 focus:ring-[#c45c26] transition-all resize-none"
                  placeholder="Brief summary (20-500 characters)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d2a26] mb-2">
                  Full Content (Optional)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#faf7f2] border border-[#f0e6d8] rounded-xl focus:outline-none focus:border-[#c45c26] focus:ring-1 focus:ring-[#c45c26] transition-all resize-none"
                  placeholder="Detailed content..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d2a26] mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as News["category"] })}
                    className="w-full px-4 py-3 bg-[#faf7f2] border border-[#f0e6d8] rounded-xl focus:outline-none focus:border-[#c45c26] focus:ring-1 focus:ring-[#c45c26] transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.important}
                      onChange={(e) => setFormData({ ...formData, important: e.target.checked })}
                      className="w-5 h-5 rounded border-[#f0e6d8] text-[#c45c26] focus:ring-[#c45c26]"
                    />
                    <span className="text-sm text-[#2d2a26]">Mark as Important</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 rounded border-[#f0e6d8] text-[#c45c26] focus:ring-[#c45c26]"
                    />
                    <span className="text-sm text-[#2d2a26]">Publish immediately</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-5 py-3 border border-[#f0e6d8] text-[#8b7355] rounded-xl font-semibold hover:bg-[#f0e6d8] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-3 bg-gradient-to-r from-[#c45c26] to-[#e07b47] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#c45c26]/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>{editingNews ? "Update News" : "Create News"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

