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
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { FeeRenewal, Student } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Renewals() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    studentId: "",
    academicYear: "2024-2025",
    term: "Q1",
    feeAmount: "",
    dueDate: "",
  });
  const { toast } = useToast();

  const { data: renewals = [], isLoading: renewalsLoading } = useQuery<FeeRenewal[]>({
    queryKey: ["/api/renewals"],
  });

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const createRenewalMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/renewals", "POST", {
        ...data,
        feeAmount: parseFloat(data.feeAmount),
        paidAmount: 0,
        status: "pending",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/renewals"] });
      setShowAddDialog(false);
      setFormData({
        studentId: "",
        academicYear: "2024-2025",
        term: "Q1",
        feeAmount: "",
        dueDate: "",
      });
      toast({
        title: "Success",
        description: "Fee renewal created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create renewal",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!formData.studentId || !formData.feeAmount || !formData.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    createRenewalMutation.mutate({
      studentId: parseInt(formData.studentId),
      academicYear: formData.academicYear,
      term: formData.term,
      feeAmount: formData.feeAmount,
      dueDate: formData.dueDate,
    });
  };

  const filteredRenewals = renewals.filter((renewal) => {
    const student = students.find((s) => s.id === renewal.studentId);
    const studentName = student ? `${student.firstName} ${student.lastName}` : "";
    const rollNumber = student?.rollNumber || "";
    return (
      studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
          <p className="text-2xl font-bold">{renewals.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Paid</p>
          <p className="text-2xl font-bold text-chart-2">
            {renewals.filter((r) => r.status === "paid").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-chart-3">
            {renewals.filter((r) => r.status === "pending" || r.status === "partial").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Overdue</p>
          <p className="text-2xl font-bold text-destructive">
            {renewals.filter((r) => r.status === "overdue").length}
          </p>
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
        {renewalsLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading renewals...</div>
        ) : filteredRenewals.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No renewals found. Create your first renewal to get started.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Roll Number</TableHead>
                <TableHead className="font-semibold">Student Name</TableHead>
                <TableHead className="font-semibold">Academic Year</TableHead>
                <TableHead className="font-semibold">Term</TableHead>
                <TableHead className="font-semibold">Fee Amount</TableHead>
                <TableHead className="font-semibold">Paid Amount</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRenewals.map((renewal) => {
                const student = students.find((s) => s.id === renewal.studentId);
                return (
                  <TableRow key={renewal.id} data-testid={`row-renewal-${renewal.id}`}>
                    <TableCell className="font-mono text-sm">{student?.rollNumber || "-"}</TableCell>
                    <TableCell className="font-medium">
                      {student ? `${student.firstName} ${student.lastName}` : "Unknown"}
                    </TableCell>
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
                );
              })}
            </TableBody>
          </Table>
        )}
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
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger className="mt-2" id="student" data-testid="select-student">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.firstName} {student.lastName} ({student.rollNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input 
                  id="academicYear" 
                  value={formData.academicYear} 
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="mt-2" 
                  data-testid="input-academic-year" 
                />
              </div>
              <div>
                <Label htmlFor="term">Term</Label>
                <Select value={formData.term} onValueChange={(value) => setFormData({ ...formData, term: value })}>
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
                <Input 
                  type="number" 
                  id="feeAmount" 
                  value={formData.feeAmount}
                  onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })}
                  placeholder="0.00" 
                  className="mt-2" 
                  data-testid="input-fee-amount" 
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  type="date" 
                  id="dueDate" 
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="mt-2" 
                  data-testid="input-due-date" 
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={createRenewalMutation.isPending}
                data-testid="button-save-renewal"
              >
                {createRenewalMutation.isPending ? "Saving..." : "Save Renewal"}
              </Button>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
