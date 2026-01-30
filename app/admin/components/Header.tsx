"use client";

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#f0e6d8] px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2d2a26]">{title}</h1>
          {subtitle && <p className="text-[#8b7355] mt-1">{subtitle}</p>}
        </div>
        {children && <div className="flex items-center gap-4">{children}</div>}
      </div>
    </header>
  );
}

