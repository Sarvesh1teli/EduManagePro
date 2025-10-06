import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate comprehensive reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Financial Reports</h3>
              <p className="text-sm text-muted-foreground">Income, expenses, and fee collection reports</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="financial-type">Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2" id="financial-type" data-testid="select-financial-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income-expense">Income vs Expense</SelectItem>
                  <SelectItem value="fee-collection">Fee Collection Summary</SelectItem>
                  <SelectItem value="outstanding">Outstanding Payments</SelectItem>
                  <SelectItem value="monthly">Monthly Financial Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input type="date" id="start-date" className="mt-2" data-testid="input-start-date" />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input type="date" id="end-date" className="mt-2" data-testid="input-end-date" />
              </div>
            </div>
            <Button className="w-full" data-testid="button-generate-financial">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-chart-2/10 rounded-lg">
              <FileText className="w-6 h-6 text-chart-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Student Reports</h3>
              <p className="text-sm text-muted-foreground">Academic performance and attendance reports</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="student-type">Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2" id="student-type" data-testid="select-student-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="performance">Performance Summary</SelectItem>
                  <SelectItem value="class-wise">Class-wise Statistics</SelectItem>
                  <SelectItem value="student-list">Student List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class-filter">Class (Optional)</Label>
              <Select>
                <SelectTrigger className="mt-2" id="class-filter" data-testid="select-class-filter">
                  <SelectValue placeholder="All classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" data-testid="button-generate-student">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-chart-3/10 rounded-lg">
              <FileText className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Staff Reports</h3>
              <p className="text-sm text-muted-foreground">Employee and salary reports</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="staff-type">Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2" id="staff-type" data-testid="select-staff-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff-list">Staff List</SelectItem>
                  <SelectItem value="department">Department-wise</SelectItem>
                  <SelectItem value="attendance">Staff Attendance</SelectItem>
                  <SelectItem value="salary">Salary Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department-filter">Department (Optional)</Label>
              <Select>
                <SelectTrigger className="mt-2" id="department-filter" data-testid="select-department-filter">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" data-testid="button-generate-staff">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-3 bg-chart-4/10 rounded-lg">
              <FileText className="w-6 h-6 text-chart-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Vendor Reports</h3>
              <p className="text-sm text-muted-foreground">Vendor and procurement reports</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="vendor-type">Report Type</Label>
              <Select>
                <SelectTrigger className="mt-2" id="vendor-type" data-testid="select-vendor-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendor-list">Vendor List</SelectItem>
                  <SelectItem value="orders">Order Summary</SelectItem>
                  <SelectItem value="payments">Payment History</SelectItem>
                  <SelectItem value="category">Category-wise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vendor-start-date">Start Date</Label>
                <Input type="date" id="vendor-start-date" className="mt-2" data-testid="input-vendor-start-date" />
              </div>
              <div>
                <Label htmlFor="vendor-end-date">End Date</Label>
                <Input type="date" id="vendor-end-date" className="mt-2" data-testid="input-vendor-end-date" />
              </div>
            </div>
            <Button className="w-full" data-testid="button-generate-vendor">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
