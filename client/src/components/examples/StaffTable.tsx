import { StaffTable } from "../StaffTable";

export default function StaffTableExample() {
  const mockStaff = [
    { id: "1", name: "Dr. Sarah Johnson", employeeId: "EMP001", department: "Science", designation: "Head Teacher", email: "sarah.j@school.com", phone: "+1 234 567 8900", status: "active" as const },
    { id: "2", name: "Michael Brown", employeeId: "EMP002", department: "Mathematics", designation: "Teacher", email: "michael.b@school.com", phone: "+1 234 567 8901", status: "active" as const },
    { id: "3", name: "Emily Davis", employeeId: "EMP003", department: "English", designation: "Teacher", email: "emily.d@school.com", phone: "+1 234 567 8902", status: "on-leave" as const },
    { id: "4", name: "Robert Wilson", employeeId: "EMP004", department: "Administration", designation: "Clerk", email: "robert.w@school.com", phone: "+1 234 567 8903", status: "active" as const },
  ];

  return (
    <div className="p-6">
      <StaffTable
        staff={mockStaff}
        onView={(id) => console.log("View staff:", id)}
        onEdit={(id) => console.log("Edit staff:", id)}
        onDelete={(id) => console.log("Delete staff:", id)}
      />
    </div>
  );
}
