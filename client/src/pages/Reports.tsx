import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentPaymentReport } from "@/components/StudentPaymentReport";
import { StaffSalaryReport } from "@/components/StaffSalaryReport";
import { ExpenseBreakdownReport } from "@/components/ExpenseBreakdownReport";
import { IncomeVsExpenditureReport } from "@/components/IncomeVsExpenditureReport";
import { VendorPaymentReport } from "@/components/VendorPaymentReport";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, TrendingUp, Users, ShoppingBag } from "lucide-react";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("student-payments");

  const studentPaymentData = [
    { id: "1", studentName: "Alice Johnson", rollNumber: "2024001", class: "10-A", feeType: "Tuition Fee", amount: 2500, paymentDate: "2024-01-15", status: "paid" as const, balance: 0 },
    { id: "2", studentName: "Bob Smith", rollNumber: "2024002", class: "10-A", feeType: "Tuition Fee", amount: 2500, paymentDate: "", status: "pending" as const, balance: 2500 },
    { id: "3", studentName: "Carol Davis", rollNumber: "2024003", class: "10-B", feeType: "Tuition Fee", amount: 2500, paymentDate: "", status: "overdue" as const, balance: 2500 },
    { id: "4", studentName: "David Wilson", rollNumber: "2024004", class: "9-A", feeType: "Exam Fee", amount: 500, paymentDate: "2024-01-14", status: "paid" as const, balance: 0 },
    { id: "5", studentName: "Emma Brown", rollNumber: "2024005", class: "9-B", feeType: "Tuition Fee", amount: 2500, paymentDate: "2024-01-13", status: "paid" as const, balance: 0 },
  ];

  const salaryData = [
    { id: "1", employeeName: "Dr. Sarah Johnson", employeeId: "EMP001", department: "Science", designation: "Head Teacher", basicSalary: 5000, allowances: 1000, deductions: 500, netSalary: 5500, paymentDate: "2024-01-31", status: "paid" as const },
    { id: "2", employeeName: "Michael Brown", employeeId: "EMP002", department: "Mathematics", designation: "Teacher", basicSalary: 4000, allowances: 800, deductions: 400, netSalary: 4400, paymentDate: "2024-01-31", status: "paid" as const },
    { id: "3", employeeName: "Emily Davis", employeeId: "EMP003", department: "English", designation: "Teacher", basicSalary: 4000, allowances: 800, deductions: 400, netSalary: 4400, paymentDate: "", status: "pending" as const },
    { id: "4", employeeName: "Robert Wilson", employeeId: "EMP004", department: "Administration", designation: "Clerk", basicSalary: 3000, allowances: 500, deductions: 300, netSalary: 3200, paymentDate: "2024-01-31", status: "paid" as const },
  ];

  const expenseData = [
    { id: "1", category: "Salaries", amount: 17500, percentage: 45.2, count: 4 },
    { id: "2", category: "Utilities", amount: 8500, percentage: 21.9, count: 12 },
    { id: "3", category: "Supplies", amount: 5200, percentage: 13.4, count: 18 },
    { id: "4", category: "Maintenance", amount: 4300, percentage: 11.1, count: 8 },
    { id: "5", category: "Transport", amount: 2100, percentage: 5.4, count: 6 },
    { id: "6", category: "Other", amount: 1150, percentage: 3.0, count: 5 },
  ];

  const incomeExpenseData = [
    { month: "September 2023", income: 125000, expenditure: 78500, balance: 46500 },
    { month: "October 2023", income: 128000, expenditure: 82000, balance: 46000 },
    { month: "November 2023", income: 130000, expenditure: 79000, balance: 51000 },
    { month: "December 2023", income: 135000, expenditure: 85000, balance: 50000 },
    { month: "January 2024", income: 138000, expenditure: 87500, balance: 50500 },
  ];

  const vendorPaymentData = [
    { id: "1", vendorName: "ABC Supplies Co.", category: "Stationery", invoiceNumber: "INV-2024-001", amount: 1200, paymentDate: "2024-01-15", dueDate: "2024-01-20", status: "paid" as const },
    { id: "2", vendorName: "Tech Solutions Inc.", category: "Electronics", invoiceNumber: "INV-2024-002", amount: 3500, paymentDate: "", dueDate: "2024-01-25", status: "pending" as const },
    { id: "3", vendorName: "Green Catering", category: "Food & Beverage", invoiceNumber: "INV-2024-003", amount: 850, paymentDate: "2024-01-10", dueDate: "2024-01-15", status: "paid" as const },
    { id: "4", vendorName: "Fix-It Services", category: "Maintenance", invoiceNumber: "INV-2024-004", amount: 2200, paymentDate: "", dueDate: "2024-01-18", status: "overdue" as const },
  ];

  const reportCards = [
    {
      id: "student-payments",
      title: "Student Payment Reports",
      description: "Individual and collective payment tracking",
      icon: DollarSign,
      color: "primary"
    },
    {
      id: "staff-salaries",
      title: "Staff Salary Reports",
      description: "Salary disbursement and summaries",
      icon: Users,
      color: "chart-2"
    },
    {
      id: "expense-breakdown",
      title: "Expense Breakdown",
      description: "Category-wise expense analysis",
      icon: TrendingUp,
      color: "chart-3"
    },
    {
      id: "income-expenditure",
      title: "Income vs. Expenditure",
      description: "Financial comparison and trends",
      icon: FileText,
      color: "chart-4"
    },
    {
      id: "vendor-payments",
      title: "Vendor Payment Tracking",
      description: "Vendor payment status monitoring",
      icon: ShoppingBag,
      color: "chart-5"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive financial and operational reports</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <TabsList className="inline-flex">
            <TabsTrigger value="student-payments" data-testid="tab-student-payments">
              <DollarSign className="w-4 h-4 mr-2" />
              Student Payments
            </TabsTrigger>
            <TabsTrigger value="staff-salaries" data-testid="tab-staff-salaries">
              <Users className="w-4 h-4 mr-2" />
              Staff Salaries
            </TabsTrigger>
            <TabsTrigger value="expense-breakdown" data-testid="tab-expense-breakdown">
              <TrendingUp className="w-4 h-4 mr-2" />
              Expense Breakdown
            </TabsTrigger>
            <TabsTrigger value="income-expenditure" data-testid="tab-income-expenditure">
              <FileText className="w-4 h-4 mr-2" />
              Income vs. Expenditure
            </TabsTrigger>
            <TabsTrigger value="vendor-payments" data-testid="tab-vendor-payments">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Vendor Payments
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="student-payments" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
            <p className="text-muted-foreground">
              Track student fee payments, outstanding balances, and payment history. Generate individual student reports
              or collective summaries by class, section, or academic period.
            </p>
          </Card>
          <StudentPaymentReport
            payments={studentPaymentData}
            reportType="collective"
            totalPaid={5500}
            totalPending={2500}
            totalOverdue={2500}
          />
        </TabsContent>

        <TabsContent value="staff-salaries" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
            <p className="text-muted-foreground">
              Monitor staff salary disbursements, track pending payments, and analyze salary structure including basic salary,
              allowances, and deductions for all staff members.
            </p>
          </Card>
          <StaffSalaryReport
            salaries={salaryData}
            totalPaid={13100}
            totalPending={4400}
            period="January 2024"
          />
        </TabsContent>

        <TabsContent value="expense-breakdown" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
            <p className="text-muted-foreground">
              Analyze expenses by category to understand spending patterns. View distribution percentages, transaction counts,
              and identify areas for cost optimization.
            </p>
          </Card>
          <ExpenseBreakdownReport
            expenses={expenseData}
            totalExpenses={38750}
            period="January 2024"
          />
        </TabsContent>

        <TabsContent value="income-expenditure" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
            <p className="text-muted-foreground">
              Compare income against expenditure across months to track financial health. Monitor surplus or deficit trends
              and make informed budgeting decisions.
            </p>
          </Card>
          <IncomeVsExpenditureReport
            data={incomeExpenseData}
            totalIncome={656000}
            totalExpenditure={412000}
            netBalance={244000}
            period="September 2023 - January 2024"
          />
        </TabsContent>

        <TabsContent value="vendor-payments" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
            <p className="text-muted-foreground">
              Track payments to vendors, monitor due dates, and manage outstanding invoices. Ensure timely payments
              and maintain healthy vendor relationships.
            </p>
          </Card>
          <VendorPaymentReport
            payments={vendorPaymentData}
            totalPaid={2050}
            totalPending={5700}
            period="January 2024"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
