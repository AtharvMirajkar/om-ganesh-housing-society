interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "orange" | "green" | "blue" | "purple";
}

const colorClasses = {
  orange: "from-[#c45c26] to-[#e07b47]",
  green: "from-[#7a9e7e] to-[#5c7a5f]",
  blue: "from-[#4a90a4] to-[#357a8f]",
  purple: "from-[#8b5a8b] to-[#6b4a6b]",
};

export default function StatsCard({ title, value, icon, trend, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-[#2d2a26]/5 border border-[#f0e6d8]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#8b7355] text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-[#2d2a26] mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-[#8b7355] text-xs">from last month</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

