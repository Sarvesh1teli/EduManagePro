import { StatsCard } from "@/components/StatsCard";
import { FinancialSummary } from "@/components/FinancialSummary";
import { RecentActivity } from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";
import { Users, GraduationCap, DollarSign, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const statsData = [
    { title: "Total Students", value: "1,234", icon: GraduationCap, trend: { value: "12% from last month", isPositive: true } },
    { title: "Total Staff", value: "86", icon: Users, trend: { value: "3 new hires", isPositive: true } },
    { title: "Monthly Revenue", value: "$125,000", icon: DollarSign, trend: { value: "8% increase", isPositive: true } },
    { title: "Pending Fees", value: "$18,450", icon: AlertCircle, trend: { value: "5% decrease", isPositive: false } },
  ];

  const financialData = {
    income: 125000,
    expenses: 78500,
    balance: 46500,
    period: "January 2024",
  };

  const activities = [
    { id: "1", user: "John Doe", action: "added new student", target: "Alice Johnson", timestamp: new Date(Date.now() - 1000 * 60 * 5), type: "student" as const },
    { id: "2", user: "Jane Smith", action: "recorded payment from", target: "Bob Smith", timestamp: new Date(Date.now() - 1000 * 60 * 15), type: "financial" as const },
    { id: "3", user: "Admin", action: "updated staff member", target: "Carol Davis", timestamp: new Date(Date.now() - 1000 * 60 * 30), type: "staff" as const },
    { id: "4", user: "Accountant", action: "approved vendor", target: "ABC Supplies", timestamp: new Date(Date.now() - 1000 * 60 * 60), type: "vendor" as const },
    { id: "5", user: "Sarah Wilson", action: "generated report", target: "Monthly Financial Report", timestamp: new Date(Date.now() - 1000 * 60 * 90), type: "financial" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FinancialSummary data={financialData} />
          <RecentActivity activities={activities} />
        </div>
        <div>
          <QuickActions
            onAddStudent={() => console.log("Navigate to add student")}
            onRecordPayment={() => console.log("Open payment form")}
            onAddExpense={() => console.log("Open expense form")}
            onGenerateReport={() => console.log("Navigate to reports")}
          />
        </div>
      </div>
    </div>
  );
}
