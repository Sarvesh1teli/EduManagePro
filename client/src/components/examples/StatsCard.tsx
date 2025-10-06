import { StatsCard } from "../StatsCard";
import { Users, GraduationCap, DollarSign, AlertCircle } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <StatsCard
        title="Total Students"
        value="1,234"
        icon={GraduationCap}
        trend={{ value: "12% from last month", isPositive: true }}
      />
      <StatsCard
        title="Total Staff"
        value="86"
        icon={Users}
        trend={{ value: "3 new hires", isPositive: true }}
      />
      <StatsCard
        title="Revenue"
        value="$45,231"
        icon={DollarSign}
        trend={{ value: "8% from last month", isPositive: true }}
      />
      <StatsCard
        title="Pending Fees"
        value="$12,450"
        icon={AlertCircle}
        trend={{ value: "5% decrease", isPositive: false }}
      />
    </div>
  );
}
