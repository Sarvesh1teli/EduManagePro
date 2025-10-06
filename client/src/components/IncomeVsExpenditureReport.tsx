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
import { Download, TrendingUp, TrendingDown } from "lucide-react";

interface MonthlyData {
  month: string;
  income: number;
  expenditure: number;
  balance: number;
}

interface IncomeVsExpenditureReportProps {
  data: MonthlyData[];
  totalIncome: number;
  totalExpenditure: number;
  netBalance: number;
  period: string;
}

export function IncomeVsExpenditureReport({ 
  data, 
  totalIncome, 
  totalExpenditure, 
  netBalance, 
  period 
}: IncomeVsExpenditureReportProps) {
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
          <h3 className="text-xl font-semibold">Income vs. Expenditure Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">{period}</p>
        </div>
        <Button variant="outline" data-testid="button-download-income-expense-report">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-chart-2/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-chart-2" />
            <p className="text-sm text-muted-foreground">Total Income</p>
          </div>
          <p className="text-2xl font-bold text-chart-2" data-testid="text-report-total-income">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="p-4 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <p className="text-sm text-muted-foreground">Total Expenditure</p>
          </div>
          <p className="text-2xl font-bold text-destructive" data-testid="text-report-total-expenditure">
            {formatCurrency(totalExpenditure)}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${netBalance >= 0 ? 'bg-chart-2/10' : 'bg-destructive/10'}`}>
          <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-chart-2' : 'text-destructive'}`} data-testid="text-report-net-balance">
            {formatCurrency(netBalance)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Month</TableHead>
              <TableHead className="font-semibold">Income</TableHead>
              <TableHead className="font-semibold">Expenditure</TableHead>
              <TableHead className="font-semibold">Balance</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} data-testid={`row-month-${index}`}>
                <TableCell className="font-medium">{row.month}</TableCell>
                <TableCell className="font-mono text-chart-2">{formatCurrency(row.income)}</TableCell>
                <TableCell className="font-mono text-destructive">{formatCurrency(row.expenditure)}</TableCell>
                <TableCell className={`font-mono font-semibold ${row.balance >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {formatCurrency(row.balance)}
                </TableCell>
                <TableCell>
                  {row.balance >= 0 ? (
                    <span className="text-chart-2 text-sm">Surplus</span>
                  ) : (
                    <span className="text-destructive text-sm">Deficit</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
