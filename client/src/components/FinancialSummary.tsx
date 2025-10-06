import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface FinancialData {
  income: number;
  expenses: number;
  balance: number;
  period: string;
}

interface FinancialSummaryProps {
  data: FinancialData;
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Financial Summary</h3>
        <p className="text-sm text-muted-foreground">{data.period}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-chart-2/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-chart-2/20 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-chart-2" data-testid="text-total-income">
                {formatCurrency(data.income)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/20 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-destructive" data-testid="text-total-expenses">
                {formatCurrency(data.expenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Net Balance</p>
            <p className={`text-xl font-bold ${data.balance >= 0 ? "text-chart-2" : "text-destructive"}`} data-testid="text-net-balance">
              {formatCurrency(data.balance)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
