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

interface SalaryRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  designation: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  status: "paid" | "pending";
}

interface StaffSalaryReportProps {
  salaries: SalaryRecord[];
  totalPaid: number;
  totalPending: number;
  period: string;
}

export function StaffSalaryReport({ salaries, totalPaid, totalPending, period }: StaffSalaryReportProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    return status === "paid" 
      ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
      : "bg-chart-3/10 text-chart-3 border-chart-3/20";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Staff Salary Report</h3>
          <p className="text-sm text-muted-foreground mt-1">{period}</p>
        </div>
        <Button variant="outline" data-testid="button-download-salary-report">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-chart-2/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-chart-2" data-testid="text-salary-paid">
            {formatCurrency(totalPaid)}
          </p>
        </div>
        <div className="p-4 bg-chart-3/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Total Pending</p>
          <p className="text-2xl font-bold text-chart-3" data-testid="text-salary-pending">
            {formatCurrency(totalPending)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Employee ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Designation</TableHead>
              <TableHead className="font-semibold">Basic Salary</TableHead>
              <TableHead className="font-semibold">Allowances</TableHead>
              <TableHead className="font-semibold">Deductions</TableHead>
              <TableHead className="font-semibold">Net Salary</TableHead>
              <TableHead className="font-semibold">Payment Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.id} data-testid={`row-salary-${salary.id}`}>
                <TableCell className="font-mono text-sm">{salary.employeeId}</TableCell>
                <TableCell className="font-medium">{salary.employeeName}</TableCell>
                <TableCell>{salary.department}</TableCell>
                <TableCell>{salary.designation}</TableCell>
                <TableCell className="font-mono">{formatCurrency(salary.basicSalary)}</TableCell>
                <TableCell className="font-mono text-chart-2">{formatCurrency(salary.allowances)}</TableCell>
                <TableCell className="font-mono text-destructive">{formatCurrency(salary.deductions)}</TableCell>
                <TableCell className="font-mono font-semibold">{formatCurrency(salary.netSalary)}</TableCell>
                <TableCell>{salary.paymentDate || "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(salary.status)}>
                    {salary.status}
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
