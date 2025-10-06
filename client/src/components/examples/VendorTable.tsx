import { VendorTable } from "../VendorTable";

export default function VendorTableExample() {
  const mockVendors = [
    { id: "1", name: "ABC Supplies Co.", category: "Stationery", contactPerson: "John Smith", phone: "+1 234 567 8900", status: "active" as const, totalOrders: 45 },
    { id: "2", name: "Tech Solutions Inc.", category: "Electronics", contactPerson: "Jane Doe", phone: "+1 234 567 8901", status: "active" as const, totalOrders: 28 },
    { id: "3", name: "Green Catering", category: "Food & Beverage", contactPerson: "Bob Wilson", phone: "+1 234 567 8902", status: "inactive" as const, totalOrders: 12 },
  ];

  return (
    <div className="p-6">
      <VendorTable
        vendors={mockVendors}
        onView={(id) => console.log("View vendor:", id)}
        onEdit={(id) => console.log("Edit vendor:", id)}
        onDelete={(id) => console.log("Delete vendor:", id)}
      />
    </div>
  );
}
