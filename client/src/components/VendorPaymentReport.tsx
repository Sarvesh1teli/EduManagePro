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

interface VendorPayment {
  id: string;
  vendorName: string;
  category: string;
  invoiceNumber: string;
  amount: number;
  paymentDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface VendorPaymentReportProps {
  payments: VendorPayment[];
  totalPaid: number;
  totalPending: number;
  period: string;
}

export function VendorPaymentReport({ payments, totalPaid, totalPending, period }: VendorPaymentReportProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Vendor Payment Tracking</h3>
          <p className="text-sm text-muted-foreground mt-1">{period}</p>
        </div>
        <Button variant="outline" data-testid="button-download-vendor-report">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-chart-2/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Paid to Vendors</p>
          <p className="text-2xl font-bold text-chart-2" data-testid="text-vendor-paid">
            {formatCurrency(totalPaid)}
          </p>
        </div>
        <div className="p-4 bg-chart-3/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Pending</p>
          <p className="text-2xl font-bold text-chart-3" data-testid="text-vendor-pending">
            {formatCurrency(totalPending)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Vendor Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Invoice #</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="font-semibold">Payment Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} data-testid={`row-vendor-payment-${payment.id}`}>
                <TableCell className="font-medium">{payment.vendorName}</TableCell>
                <TableCell>{payment.category}</TableCell>
                <TableCell className="font-mono text-sm">{payment.invoiceNumber}</TableCell>
                <TableCell className="font-mono">{formatCurrency(payment.amount)}</TableCell>
                <TableCell>{payment.dueDate}</TableCell>
                <TableCell>{payment.paymentDate || "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
