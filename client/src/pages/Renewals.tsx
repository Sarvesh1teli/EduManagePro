import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Renewals() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mockRenewals = [
    {
      id: 1,
      studentName: "Alice Johnson",
      rollNumber: "2024001",
      class: "10-A",
      academicYear: "2024-2025",
      term: "Q1",
      feeAmount: 2500,
      paidAmount: 2500,
      dueDate: "2024-04-30",
      status: "paid",
    },
    {
      id: 2,
      studentName: "Bob Smith",
      rollNumber: "2024002",
      class: "10-A",
      academicYear: "2024-2025",
      term: "Q1",
      feeAmount: 2500,
      paidAmount: 1000,
      dueDate: "2024-04-30",
      status: "partial",
    },
    {
      id: 3,
      studentName: "Carol Davis",
      rollNumber: "2024003",
      class: "10-B",
      academicYear: "2024-2025",
      term: "Q1",
      feeAmount: 2500,
      paidAmount: 0,
      dueDate: "2024-03-15",
      status: "overdue",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "partial":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "pending":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20";
      case "overdue":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Fee Renewals</h1>
          <p className="text-muted-foreground">Manage student fee renewals and payment tracking</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} data-testid="button-add-renewal">
          <Plus className="w-4 h-4 mr-2" />
          Add Renewal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Renewals</p>
          <p className="text-2xl font-bold">128</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Paid</p>
          <p className="text-2xl font-bold text-chart-2">84</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-chart-3">32</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Overdue</p>
          <p className="text-2xl font-bold text-destructive">12</p>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Roll Number</TableHead>
              <TableHead className="font-semibold">Student Name</TableHead>
              <TableHead className="font-semibold">Class</TableHead>
              <TableHead className="font-semibold">Academic Year</TableHead>
              <TableHead className="font-semibold">Term</TableHead>
              <TableHead className="font-semibold">Fee Amount</TableHead>
              <TableHead className="font-semibold">Paid Amount</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRenewals.map((renewal) => (
              <TableRow key={renewal.id} data-testid={`row-renewal-${renewal.id}`}>
                <TableCell className="font-mono text-sm">{renewal.rollNumber}</TableCell>
                <TableCell className="font-medium">{renewal.studentName}</TableCell>
                <TableCell>{renewal.class}</TableCell>
                <TableCell>{renewal.academicYear}</TableCell>
                <TableCell>{renewal.term}</TableCell>
                <TableCell className="font-mono">${renewal.feeAmount}</TableCell>
                <TableCell className="font-mono">${renewal.paidAmount}</TableCell>
                <TableCell>{renewal.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(renewal.status)}>
                    {renewal.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Fee Renewal</DialogTitle>
          </DialogHeader>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="student">Student</Label>
                <Select>
                  <SelectTrigger className="mt-2" id="student" data-testid="select-student">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Alice Johnson (2024001)</SelectItem>
                    <SelectItem value="2">Bob Smith (2024002)</SelectItem>
                    <SelectItem value="3">Carol Davis (2024003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input id="academicYear" defaultValue="2024-2025" className="mt-2" data-testid="input-academic-year" />
              </div>
              <div>
                <Label htmlFor="term">Term</Label>
                <Select>
                  <SelectTrigger className="mt-2" id="term" data-testid="select-term">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1">Quarter 1</SelectItem>
                    <SelectItem value="Q2">Quarter 2</SelectItem>
                    <SelectItem value="Q3">Quarter 3</SelectItem>
                    <SelectItem value="Q4">Quarter 4</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="feeAmount">Fee Amount</Label>
                <Input type="number" id="feeAmount" placeholder="0.00" className="mt-2" data-testid="input-fee-amount" />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input type="date" id="dueDate" className="mt-2" data-testid="input-due-date" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)} data-testid="button-save-renewal">
                Save Renewal
              </Button>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
