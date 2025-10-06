import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, DollarSign, TrendingUp, Users, ShoppingBag } from "lucide-react";
import type { Payment, Expense, Student, Staff } from "@shared/schema";
import { format } from "date-fns";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("student-payments");

  const { data: payments = [], isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const { data: staff = [] } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const getStudentName = (studentId: number) => {
    const student = students.find((s) => s.id === studentId);
    return student?.name || `Student #${studentId}`;
  };

  const getStudentClass = (studentId: number) => {
    const student = students.find((s) => s.id === studentId);
    return student?.class || "-";
  };

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = { amount: 0, count: 0 };
    }
    acc[category].amount += parseFloat(expense.amount);
    acc[category].count += 1;
    return acc;
  }, {} as Record<string, { amount: number; count: number }>);

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, cat) => sum + cat.amount, 0);

  const expenseData = Object.entries(expensesByCategory).map(([category, data], index) => ({
    id: String(index + 1),
    category,
    amount: data.amount,
    percentage: totalExpenses > 0 ? (data.amount / totalExpenses) * 100 : 0,
    count: data.count,
  }));

  const totalIncome = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const totalPaidExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const isLoading = paymentsLoading || expensesLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Reports & Analytics</h1>
        <p className="text-muted-foreground">Comprehensive financial and operational reports</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading reports...</p>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <TabsList className="inline-flex">
              <TabsTrigger value="student-payments" data-testid="tab-student-payments">
                <DollarSign className="w-4 h-4 mr-2" />
                Student Payments
              </TabsTrigger>
              <TabsTrigger value="expense-breakdown" data-testid="tab-expense-breakdown">
                <TrendingUp className="w-4 h-4 mr-2" />
                Expense Breakdown
              </TabsTrigger>
              <TabsTrigger value="financial-summary" data-testid="tab-financial-summary">
                <FileText className="w-4 h-4 mr-2" />
                Financial Summary
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="student-payments" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Student Payment Report</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Student Name</TableHead>
                      <TableHead className="font-semibold">Class</TableHead>
                      <TableHead className="font-semibold">Payment Type</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No payment records available
                        </TableCell>
                      </TableRow>
                    ) : (
                      payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{getStudentName(payment.studentId)}</TableCell>
                          <TableCell>{getStudentClass(payment.studentId)}</TableCell>
                          <TableCell>{payment.paymentType}</TableCell>
                          <TableCell className="font-mono">${payment.amount}</TableCell>
                          <TableCell>{payment.paymentDate && format(new Date(payment.paymentDate), "MMM dd, yyyy")}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                payment.status === "completed"
                                  ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                                  : "bg-chart-3/10 text-chart-3 border-chart-3/20"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Payments Received:</span>
                  <span className="text-xl font-semibold font-mono">${totalIncome.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="expense-breakdown" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Expense Breakdown by Category</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Percentage</TableHead>
                      <TableHead className="font-semibold">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No expense records available
                        </TableCell>
                      </TableRow>
                    ) : (
                      expenseData.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell className="font-medium">{expense.category}</TableCell>
                          <TableCell className="font-mono">${expense.amount.toFixed(2)}</TableCell>
                          <TableCell>{expense.percentage.toFixed(1)}%</TableCell>
                          <TableCell>{expense.count}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Expenses:</span>
                  <span className="text-xl font-semibold font-mono">${totalPaidExpenses.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="financial-summary" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-chart-2/10 border border-chart-2/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                    <p className="text-2xl font-semibold font-mono text-chart-2">${totalIncome.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-chart-3/10 border border-chart-3/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                    <p className="text-2xl font-semibold font-mono text-chart-3">${totalPaidExpenses.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-semibold font-mono text-primary">${(totalIncome - totalPaidExpenses).toFixed(2)}</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Summary Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Students</p>
                      <p className="text-lg font-semibold">{students.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Staff</p>
                      <p className="text-lg font-semibold">{staff.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Payments</p>
                      <p className="text-lg font-semibold">{payments.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Expenses</p>
                      <p className="text-lg font-semibold">{expenses.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
