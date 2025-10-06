import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  count: number;
}

interface ExpenseBreakdownReportProps {
  expenses: ExpenseItem[];
  totalExpenses: number;
  period: string;
}

export function ExpenseBreakdownReport({ expenses, totalExpenses, period }: ExpenseBreakdownReportProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Expense Breakdown Report</h3>
          <p className="text-sm text-muted-foreground mt-1">{period}</p>
        </div>
        <Button variant="outline" data-testid="button-download-expense-report">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="mb-6 p-4 bg-destructive/10 rounded-lg">
        <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
        <p className="text-3xl font-bold text-destructive" data-testid="text-total-expenses">
          {formatCurrency(totalExpenses)}
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Number of Transactions</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Percentage</TableHead>
              <TableHead className="font-semibold w-48">Distribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} data-testid={`row-expense-${expense.id}`}>
                <TableCell className="font-medium">{expense.category}</TableCell>
                <TableCell>{expense.count}</TableCell>
                <TableCell className="font-mono">{formatCurrency(expense.amount)}</TableCell>
                <TableCell>{expense.percentage.toFixed(1)}%</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-destructive rounded-full"
                        style={{ width: `${expense.percentage}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
