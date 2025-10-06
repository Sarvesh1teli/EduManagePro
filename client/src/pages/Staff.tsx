import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { StaffTable } from "@/components/StaffTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Staff } from "@shared/schema";

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: staff = [], isLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/staff/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Success",
        description: "Staff member deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete staff member",
        variant: "destructive",
      });
    },
  });

  const filteredStaff = staff.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.employeeId.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading staff...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Staff</h1>
          <p className="text-muted-foreground">Manage staff members and employee records</p>
        </div>
        <Button onClick={() => console.log("Add staff")} data-testid="button-add-staff">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search staff by name or employee ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <StaffTable
        staff={filteredStaff}
        onView={(id) => console.log("View staff:", id)}
        onEdit={(id) => console.log("Edit staff:", id)}
        onDelete={(id) => deleteStaffMutation.mutate(id)}
      />
    </div>
  );
}
