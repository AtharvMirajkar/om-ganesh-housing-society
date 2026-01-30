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

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  adminNotes?: string;
  createdAt: string;
}

export default function ContactsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState("all");
  const [isUpdating, setIsUpdating] = useState(false);

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
        await fetchContacts();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const fetchContacts = async (status?: string) => {
    try {
      const url = status && status !== "all" 
        ? `/api/contacts?status=${status}&limit=50` 
        : "/api/contacts?limit=50";
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    fetchContacts(newFilter);
  };

  const handleStatusUpdate = async (contactId: string, newStatus: string, adminNotes?: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      const data = await res.json();

      if (data.success) {
        setContacts((prev) =>
          prev.map((c) =>
            c._id === contactId ? { ...c, status: newStatus as Contact["status"], adminNotes } : c
          )
        );
        if (selectedContact?._id === contactId) {
          setSelectedContact({ ...selectedContact, status: newStatus as Contact["status"], adminNotes });
        }
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (contactId: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const res = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setContacts((prev) => prev.filter((c) => c._id !== contactId));
        if (selectedContact?._id === contactId) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
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
          <p className="text-[#8b7355]">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const statusColors = {
    new: "bg-blue-100 text-blue-700",
    read: "bg-yellow-100 text-yellow-700",
    replied: "bg-green-100 text-green-700",
    archived: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="ml-64">
        <Header
          title="Contact Submissions"
          subtitle="Manage contact form submissions from visitors"
        >
          {/* Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-[#f0e6d8]">
            {["all", "new", "read", "replied", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  filter === status
                    ? "bg-[#c45c26] text-white"
                    : "text-[#8b7355] hover:bg-[#f0e6d8]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </Header>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#f0e6d8] overflow-hidden">
                {contacts.length === 0 ? (
                  <div className="p-8 text-center">
                    <svg
                      className="w-12 h-12 text-[#8b7355]/30 mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-[#8b7355]">No contacts found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#f0e6d8]">
                    {contacts.map((contact) => (
                      <div
                        key={contact._id}
                        onClick={() => setSelectedContact(contact)}
                        className={`p-4 cursor-pointer transition-all hover:bg-[#faf7f2] ${
                          selectedContact?._id === contact._id
                            ? "bg-[#faf7f2] border-l-4 border-l-[#c45c26]"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-[#2d2a26] truncate">
                                {contact.name}
                              </h3>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  statusColors[contact.status]
                                }`}
                              >
                                {contact.status}
                              </span>
                            </div>
                            <p className="text-sm text-[#8b7355] truncate">
                              {contact.subject}
                            </p>
                            <p className="text-xs text-[#8b7355]/60 mt-1">
                              {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {contact.status === "new" && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Detail */}
            <div className="lg:col-span-1">
              {selectedContact ? (
                <div className="bg-white rounded-2xl border border-[#f0e6d8] p-6 sticky top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-[#2d2a26]">Contact Details</h3>
                    <button
                      onClick={() => handleDelete(selectedContact._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider">Name</label>
                      <p className="text-[#2d2a26] font-medium">{selectedContact.name}</p>
                    </div>

                    <div>
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider">Email</label>
                      <a href={`mailto:${selectedContact.email}`} className="text-[#c45c26] hover:underline block">
                        {selectedContact.email}
                      </a>
                    </div>

                    <div>
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider">Phone</label>
                      <a href={`tel:${selectedContact.phone}`} className="text-[#c45c26] hover:underline block">
                        {selectedContact.phone}
                      </a>
                    </div>

                    <div>
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider">Subject</label>
                      <p className="text-[#2d2a26]">{selectedContact.subject}</p>
                    </div>

                    <div>
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider">Message</label>
                      <p className="text-[#2d2a26] whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>

                    <div className="pt-4 border-t border-[#f0e6d8]">
                      <label className="text-xs text-[#8b7355] uppercase tracking-wider mb-2 block">
                        Update Status
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["new", "read", "replied", "archived"] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusUpdate(selectedContact._id, status)}
                            disabled={isUpdating || selectedContact.status === status}
                            className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                              selectedContact.status === status
                                ? statusColors[status]
                                : "bg-[#f0e6d8] text-[#8b7355] hover:bg-[#e8dccb]"
                            } disabled:opacity-50`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#f0e6d8] p-8 text-center">
                  <svg
                    className="w-12 h-12 text-[#8b7355]/30 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                  <p className="text-[#8b7355]">Select a contact to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

