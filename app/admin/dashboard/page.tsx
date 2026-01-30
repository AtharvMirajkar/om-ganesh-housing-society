"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface News {
  _id: string;
  title: string;
  category: string;
  published: boolean;
  createdAt: string;
}

interface Stats {
  totalContacts: number;
  newContacts: number;
  totalNews: number;
  publishedNews: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    newContacts: 0,
    totalNews: 0,
    publishedNews: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [recentNews, setRecentNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authData.success) {
          router.push("/admin");
          return;
        }

        setUser(authData.user);

        // Fetch contacts
        const contactsRes = await fetch("/api/contacts?limit=5");
        const contactsData = await contactsRes.json();

        if (contactsData.success) {
          setRecentContacts(contactsData.contacts);
          setStats((prev) => ({
            ...prev,
            totalContacts: contactsData.pagination.total,
            newContacts: contactsData.contacts.filter(
              (c: Contact) => c.status === "new"
            ).length,
          }));
        }

        // Fetch news
        const newsRes = await fetch("/api/news?admin=true&limit=5");
        const newsData = await newsRes.json();

        if (newsData.success) {
          setRecentNews(newsData.news);
          setStats((prev) => ({
            ...prev,
            totalNews: newsData.pagination.total,
            publishedNews: newsData.news.filter((n: News) => n.published).length,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#c45c26] to-[#d4a574] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl font-serif font-bold text-white">ॐ</span>
          </div>
          <p className="text-[#8b7355]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const contactColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject" },
    {
      key: "status",
      label: "Status",
      render: (item: Contact) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            item.status === "new"
              ? "bg-blue-100 text-blue-700"
              : item.status === "read"
              ? "bg-yellow-100 text-yellow-700"
              : item.status === "replied"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: Contact) =>
        new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  const newsColumns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    {
      key: "published",
      label: "Status",
      render: (item: News) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            item.published
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (item: News) =>
        new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="ml-64">
        <Header
          title="Dashboard"
          subtitle={`Welcome back, ${user.name}!`}
        />

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Contacts"
              value={stats.totalContacts}
              color="orange"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
            <StatsCard
              title="New Contacts"
              value={stats.newContacts}
              color="blue"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              }
            />
            <StatsCard
              title="Total News"
              value={stats.totalNews}
              color="green"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              }
            />
            <StatsCard
              title="Published News"
              value={stats.publishedNews}
              color="purple"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Recent Data */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Contacts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2d2a26]">Recent Contacts</h2>
                <a
                  href="/admin/contacts"
                  className="text-sm text-[#c45c26] hover:underline"
                >
                  View all →
                </a>
              </div>
              <DataTable
                columns={contactColumns}
                data={recentContacts}
                emptyMessage="No contacts yet"
                onRowClick={() => router.push("/admin/contacts")}
              />
            </div>

            {/* Recent News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2d2a26]">Recent News</h2>
                <a
                  href="/admin/news"
                  className="text-sm text-[#c45c26] hover:underline"
                >
                  View all →
                </a>
              </div>
              <DataTable
                columns={newsColumns}
                data={recentNews}
                emptyMessage="No news yet"
                onRowClick={() => router.push("/admin/news")}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

