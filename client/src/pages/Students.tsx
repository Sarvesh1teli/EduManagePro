import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Student } from "@shared/schema";

export default function Students() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const createStudentMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/students", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      setShowAddDialog(false);
      toast({
        title: "Success",
        description: "Student added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/students/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      });
    },
  });

  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.rollNumber.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading students...</p>
      </div>
    );
  }

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
        students={filteredStudents}
        onView={(id) => console.log("View student:", id)}
        onEdit={(id) => console.log("Edit student:", id)}
        onDelete={(id) => deleteStudentMutation.mutate(id)}
      />

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <StudentForm
            onSubmit={(data) => createStudentMutation.mutate(data)}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
