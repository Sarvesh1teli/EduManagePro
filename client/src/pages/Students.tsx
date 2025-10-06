import { useState } from "react";
import { StudentTable } from "@/components/StudentTable";
import { StudentForm } from "@/components/StudentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Students() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mockStudents = [
    { id: "1", name: "Alice Johnson", rollNumber: "2024001", class: "10", section: "A", feeStatus: "paid" as const, attendance: 95 },
    { id: "2", name: "Bob Smith", rollNumber: "2024002", class: "10", section: "A", feeStatus: "pending" as const, attendance: 88 },
    { id: "3", name: "Carol Davis", rollNumber: "2024003", class: "10", section: "B", feeStatus: "overdue" as const, attendance: 76 },
    { id: "4", name: "David Wilson", rollNumber: "2024004", class: "9", section: "A", feeStatus: "paid" as const, attendance: 92 },
    { id: "5", name: "Emma Brown", rollNumber: "2024005", class: "9", section: "B", feeStatus: "paid" as const, attendance: 91 },
    { id: "6", name: "Frank Miller", rollNumber: "2024006", class: "11", section: "A", feeStatus: "pending" as const, attendance: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Students</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} data-testid="button-add-student">
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <StudentTable
        students={mockStudents}
        onView={(id) => console.log("View student:", id)}
        onEdit={(id) => console.log("Edit student:", id)}
        onDelete={(id) => console.log("Delete student:", id)}
      />

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <StudentForm
            onSubmit={(data) => {
              console.log("Student added:", data);
              setShowAddDialog(false);
            }}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
