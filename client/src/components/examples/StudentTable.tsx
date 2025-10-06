import { StudentTable } from "../StudentTable";

export default function StudentTableExample() {
  const mockStudents = [
    { id: "1", name: "Alice Johnson", rollNumber: "2024001", class: "10", section: "A", feeStatus: "paid" as const, attendance: 95 },
    { id: "2", name: "Bob Smith", rollNumber: "2024002", class: "10", section: "A", feeStatus: "pending" as const, attendance: 88 },
    { id: "3", name: "Carol Davis", rollNumber: "2024003", class: "10", section: "B", feeStatus: "overdue" as const, attendance: 76 },
    { id: "4", name: "David Wilson", rollNumber: "2024004", class: "9", section: "A", feeStatus: "paid" as const, attendance: 92 },
  ];

  return (
    <div className="p-6">
      <StudentTable
        students={mockStudents}
        onView={(id) => console.log("View student:", id)}
        onEdit={(id) => console.log("Edit student:", id)}
        onDelete={(id) => console.log("Delete student:", id)}
      />
    </div>
  );
}
