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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PaymentRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  feeType: string;
  amount: number;
  paymentDate: string;
  status: "paid" | "pending" | "overdue";
  balance: number;
}

interface StudentPaymentReportProps {
  payments: PaymentRecord[];
  reportType: "individual" | "collective";
  totalPaid?: number;
  totalPending?: number;
  totalOverdue?: number;
}

export function StudentPaymentReport({ 
  payments, 
  reportType,
  totalPaid = 0,
  totalPending = 0,
  totalOverdue = 0
}: StudentPaymentReportProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "pending":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

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
          <h3 className="text-xl font-semibold">
            {reportType === "individual" ? "Individual Student Payment Report" : "Collective Payment Report"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Payment records and status overview
          </p>
        </div>
        <Button variant="outline" data-testid="button-download-report">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {reportType === "collective" && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-chart-2/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-chart-2" data-testid="text-total-paid">
              {formatCurrency(totalPaid)}
            </p>
          </div>
          <div className="p-4 bg-chart-3/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Pending</p>
            <p className="text-2xl font-bold text-chart-3" data-testid="text-total-pending">
              {formatCurrency(totalPending)}
            </p>
          </div>
          <div className="p-4 bg-destructive/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Overdue</p>
            <p className="text-2xl font-bold text-destructive" data-testid="text-total-overdue">
              {formatCurrency(totalOverdue)}
            </p>
          </div>
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Roll Number</TableHead>
              <TableHead className="font-semibold">Student Name</TableHead>
              <TableHead className="font-semibold">Class</TableHead>
              <TableHead className="font-semibold">Fee Type</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Payment Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} data-testid={`row-payment-${payment.id}`}>
                <TableCell className="font-mono text-sm">{payment.rollNumber}</TableCell>
                <TableCell className="font-medium">{payment.studentName}</TableCell>
                <TableCell>{payment.class}</TableCell>
                <TableCell>{payment.feeType}</TableCell>
                <TableCell className="font-mono">{formatCurrency(payment.amount)}</TableCell>
                <TableCell>{payment.paymentDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{formatCurrency(payment.balance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No payment records found for the selected criteria.
        </div>
      )}
    </Card>
  );
}
