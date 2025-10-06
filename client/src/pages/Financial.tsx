import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FeePaymentForm } from "@/components/FeePaymentForm";
import { ExpenseForm } from "@/components/ExpenseForm";
import { FinancialSummary } from "@/components/FinancialSummary";
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
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Payment, Expense, Student } from "@shared/schema";
import { format } from "date-fns";

export default function Financial() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const { data: payments = [], isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: expenses = [], isLoading: expensesLoading } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const createPaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/payments", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payments"] });
      toast({
        title: "Success",
        description: "Payment recorded successfully",
      });
      setActiveTab("overview");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record payment",
        variant: "destructive",
      });
    },
  });

  const createExpenseMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/expenses", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      toast({
        title: "Success",
        description: "Expense recorded successfully",
      });
      setActiveTab("overview");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to record expense",
        variant: "destructive",
      });
    },
  });

  const totalIncome = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const totalExpenses = expenses
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const financialData = {
    income: totalIncome,
    expenses: totalExpenses,
    balance: totalIncome - totalExpenses,
    period: format(new Date(), "MMMM yyyy"),
  };

  const getStudentName = (studentId: number) => {
    const student = students.find((s) => s.id === studentId);
    return student?.name || `Student #${studentId}`;
  };

  const isLoading = paymentsLoading || expensesLoading;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Financial Management</h1>
        <p className="text-muted-foreground">Track income, expenses, and fee payments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="fees" data-testid="tab-fees">Fee Payments</TabsTrigger>
          <TabsTrigger value="expenses" data-testid="tab-expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income" data-testid="tab-income">Income</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading financial data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FinancialSummary data={financialData} />
              <Card className="lg:col-span-2 p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Payments</h4>
                    <div className="space-y-2">
                      {payments.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{getStudentName(payment.studentId)}</p>
                            <p className="text-xs text-muted-foreground">{payment.paymentType} • {payment.paymentDate && format(new Date(payment.paymentDate), "MMM dd, yyyy")}</p>
                          </div>
                          <p className="font-mono font-semibold">${payment.amount}</p>
                        </div>
                      ))}
                      {payments.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No payments recorded yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <FeePaymentForm
            onSubmit={(data) => createPaymentMutation.mutate(data)}
            onCancel={() => setActiveTab("overview")}
          />
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Fee Payments</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Student</TableHead>
                    <TableHead className="font-semibold">Fee Type</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No payments recorded yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{getStudentName(payment.studentId)}</TableCell>
                        <TableCell>{payment.paymentType}</TableCell>
                        <TableCell className="font-mono">${payment.amount}</TableCell>
                        <TableCell>{payment.paymentDate && format(new Date(payment.paymentDate), "MMM dd, yyyy")}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={payment.status === "completed" ? "bg-chart-2/10 text-chart-2 border-chart-2/20" : "bg-chart-3/10 text-chart-3 border-chart-3/20"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <ExpenseForm
            onSubmit={(data) => createExpenseMutation.mutate(data)}
            onCancel={() => setActiveTab("overview")}
          />
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Description</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No expenses recorded yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.category}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="font-mono">${expense.amount}</TableCell>
                        <TableCell>{expense.expenseDate && format(new Date(expense.expenseDate), "MMM dd, yyyy")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Income Sources</h3>
            <p className="text-muted-foreground">Income tracking and reporting features will be available here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
