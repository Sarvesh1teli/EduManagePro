import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/StatsCard";
import { FinancialSummary } from "@/components/FinancialSummary";
import { QuickActions } from "@/components/QuickActions";
import { Users, GraduationCap, DollarSign, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Payment, Expense, Student, Staff } from "@shared/schema";
import { format } from "date-fns";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const { data: payments = [], isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const { data: students = [], isLoading: studentsLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const { data: staff = [], isLoading: staffLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const totalIncome = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const totalExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const pendingPayments = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const statsData = [
    {
      title: "Total Students",
      value: students.length.toString(),
      icon: GraduationCap,
      trend: { value: `${students.length} enrolled`, isPositive: true },
    },
    {
      title: "Total Staff",
      value: staff.length.toString(),
      icon: Users,
      trend: { value: `${staff.filter((s) => s.status === "active").length} active`, isPositive: true },
    },
    {
      title: "Total Income",
      value: `$${totalIncome.toFixed(0)}`,
      icon: DollarSign,
      trend: { value: `${payments.filter((p) => p.status === "completed").length} payments`, isPositive: true },
    },
    {
      title: "Pending Payments",
      value: `$${pendingPayments.toFixed(0)}`,
      icon: AlertCircle,
      trend: { value: `${payments.filter((p) => p.status === "pending").length} pending`, isPositive: false },
    },
  ];

  const financialData = {
    income: totalIncome,
    expenses: totalExpenses,
    balance: totalIncome - totalExpenses,
    period: format(new Date(), "MMMM yyyy"),
  };

  const isLoading = paymentsLoading || expensesLoading || studentsLoading || staffLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <FinancialSummary data={financialData} />
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {payments.slice(0, 5).map((payment) => {
                    const student = students.find((s) => s.id === payment.studentId);
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Payment received from {student?.name || `Student #${payment.studentId}`}</p>
                          <p className="text-xs text-muted-foreground">
                            {payment.paymentType} • {payment.paymentDate && format(new Date(payment.paymentDate), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <p className="font-mono font-semibold">${payment.amount}</p>
                      </div>
                    );
                  })}
                  {payments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                  )}
                </div>
              </Card>
            </div>
            <div>
              <QuickActions
                onAddStudent={() => setLocation("/students")}
                onRecordPayment={() => setLocation("/financial")}
                onAddExpense={() => setLocation("/financial")}
                onGenerateReport={() => setLocation("/reports")}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
