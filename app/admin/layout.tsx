import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Om Ganesh Housing Society",
  description: "Admin dashboard for Om Ganesh Co-operative Housing Society Ltd.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

