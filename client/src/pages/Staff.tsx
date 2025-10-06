import { useState } from "react";
import { StaffTable } from "@/components/StaffTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockStaff = [
    { id: "1", name: "Dr. Sarah Johnson", employeeId: "EMP001", department: "Science", designation: "Head Teacher", email: "sarah.j@school.com", phone: "+1 234 567 8900", status: "active" as const },
    { id: "2", name: "Michael Brown", employeeId: "EMP002", department: "Mathematics", designation: "Teacher", email: "michael.b@school.com", phone: "+1 234 567 8901", status: "active" as const },
    { id: "3", name: "Emily Davis", employeeId: "EMP003", department: "English", designation: "Teacher", email: "emily.d@school.com", phone: "+1 234 567 8902", status: "on-leave" as const },
    { id: "4", name: "Robert Wilson", employeeId: "EMP004", department: "Administration", designation: "Clerk", email: "robert.w@school.com", phone: "+1 234 567 8903", status: "active" as const },
    { id: "5", name: "Linda Martinez", employeeId: "EMP005", department: "History", designation: "Teacher", email: "linda.m@school.com", phone: "+1 234 567 8904", status: "active" as const },
  ];

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
        staff={mockStaff}
        onView={(id) => console.log("View staff:", id)}
        onEdit={(id) => console.log("Edit staff:", id)}
        onDelete={(id) => console.log("Delete staff:", id)}
      />
    </div>
  );
}
