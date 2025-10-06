import { useState } from "react";
import { VendorTable } from "@/components/VendorTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockVendors = [
    { id: "1", name: "ABC Supplies Co.", category: "Stationery", contactPerson: "John Smith", phone: "+1 234 567 8900", status: "active" as const, totalOrders: 45 },
    { id: "2", name: "Tech Solutions Inc.", category: "Electronics", contactPerson: "Jane Doe", phone: "+1 234 567 8901", status: "active" as const, totalOrders: 28 },
    { id: "3", name: "Green Catering", category: "Food & Beverage", contactPerson: "Bob Wilson", phone: "+1 234 567 8902", status: "inactive" as const, totalOrders: 12 },
    { id: "4", name: "Fix-It Services", category: "Maintenance", contactPerson: "Sarah Davis", phone: "+1 234 567 8903", status: "active" as const, totalOrders: 33 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Vendors</h1>
          <p className="text-muted-foreground">Manage vendor relationships and contracts</p>
        </div>
        <Button onClick={() => console.log("Add vendor")} data-testid="button-add-vendor">
          <Plus className="w-4 h-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      <VendorTable
        vendors={mockVendors}
        onView={(id) => console.log("View vendor:", id)}
        onEdit={(id) => console.log("Edit vendor:", id)}
        onDelete={(id) => console.log("Delete vendor:", id)}
      />
    </div>
  );
}
