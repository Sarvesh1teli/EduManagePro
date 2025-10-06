import { useState } from "react";
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

export default function Financial() {
  const [activeTab, setActiveTab] = useState("overview");

  const financialData = {
    income: 125000,
    expenses: 78500,
    balance: 46500,
    period: "January 2024",
  };

  const recentPayments = [
    { id: "1", student: "Alice Johnson", amount: 2500, date: "2024-01-15", type: "Tuition", status: "completed" },
    { id: "2", student: "Bob Smith", amount: 1500, date: "2024-01-14", type: "Exam Fee", status: "completed" },
    { id: "3", student: "Carol Davis", amount: 2500, date: "2024-01-13", type: "Tuition", status: "pending" },
  ];

  const recentExpenses = [
    { id: "1", category: "Utilities", amount: 1200, date: "2024-01-15", vendor: "Power Company" },
    { id: "2", category: "Supplies", amount: 450, date: "2024-01-14", vendor: "ABC Supplies" },
    { id: "3", category: "Maintenance", amount: 800, date: "2024-01-13", vendor: "Fix-It Services" },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FinancialSummary data={financialData} />
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Payments</h4>
                  <div className="space-y-2">
                    {recentPayments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{payment.student}</p>
                          <p className="text-xs text-muted-foreground">{payment.type} • {payment.date}</p>
                        </div>
                        <p className="font-mono font-semibold">${payment.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees" className="space-y-6">
          <FeePaymentForm
            onSubmit={(data) => console.log("Fee payment:", data)}
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
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.student}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell className="font-mono">${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={payment.status === "completed" ? "bg-chart-2/10 text-chart-2 border-chart-2/20" : "bg-chart-3/10 text-chart-3 border-chart-3/20"}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <ExpenseForm
            onSubmit={(data) => console.log("Expense:", data)}
            onCancel={() => setActiveTab("overview")}
          />
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Vendor</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.category}</TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell className="font-mono">${expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                    </TableRow>
                  ))}
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
