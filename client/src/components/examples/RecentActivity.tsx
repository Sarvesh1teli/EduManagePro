import { RecentActivity } from "../RecentActivity";

export default function RecentActivityExample() {
  const mockActivities = [
    { id: "1", user: "John Doe", action: "added new student", target: "Alice Johnson", timestamp: new Date(Date.now() - 1000 * 60 * 5), type: "student" as const },
    { id: "2", user: "Jane Smith", action: "recorded payment from", target: "Bob Smith", timestamp: new Date(Date.now() - 1000 * 60 * 15), type: "financial" as const },
    { id: "3", user: "Admin", action: "updated staff member", target: "Carol Davis", timestamp: new Date(Date.now() - 1000 * 60 * 30), type: "staff" as const },
    { id: "4", user: "Accountant", action: "approved vendor", target: "ABC Supplies", timestamp: new Date(Date.now() - 1000 * 60 * 60), type: "vendor" as const },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <RecentActivity activities={mockActivities} />
    </div>
  );
}
